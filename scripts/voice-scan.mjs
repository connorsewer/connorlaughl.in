#!/usr/bin/env node
/**
 * Voice scan over the rendered site.
 *
 * Fetches every route in the sitemap plus a few that are not in it, strips
 * tags, and looks for the banned-phrase set from CLAUDE.md plus em-dashes
 * outside `[Fig ...]` labels.
 *
 * USAGE
 *   node scripts/voice-scan.mjs [--base http://localhost:3000] [--write-baseline]
 *
 * BASELINE
 *
 * The pre-redesign site is not clean, so the first run records what is already
 * there in `scripts/voice-scan-baseline.json` and each route-conversion task
 * deletes its own routes' entries as part of its gate. Final QA requires the
 * file to be empty.
 *
 * The baseline stores route + matched token ONLY. It never stores surrounding
 * text: the file is repo JSON inside proof:guard's repo-wide token scan, and
 * captured context could carry a gated numeral.
 */
import fs from "node:fs";
import path from "node:path";

const BASELINE_PATH = path.join(process.cwd(), "scripts", "voice-scan-baseline.json");

/** Routes that are not in the sitemap but still need scanning. */
const EXTRA_ROUTES = [
  "/edge",
  "/case-studies/strategy-memo",
  "/proof",
  "/this-page-does-not-exist",
];

/**
 * Banned phrases: CLAUDE.md "Voice non-negotiables" plus the route-copy scan
 * list in the same file. Matched case-insensitively on word boundaries.
 */
const BANNED_PHRASES = [
  "actually",
  "architecture of trust",
  "beacon",
  "bustling",
  "consequently",
  "culminating",
  "cutting-edge",
  "delve",
  "dossier",
  "elevate",
  "elucidating",
  "embark",
  "enduring",
  "foster",
  "furthermore",
  "future-proof",
  "game-changer",
  "harness",
  "interplay",
  "intricate",
  "leverage",
  "meticulous",
  "multifaceted",
  "nestled",
  "not just",
  "not only",
  "notably",
  "operating proof",
  "outperform",
  "pivotal",
  "revolutionize",
  "robust",
  "supercharge",
  "swiftly",
  "tapestry",
  "testament",
  "unleash",
];

const EM_DASH = "—";

function parseArgs(argv) {
  let base = "http://localhost:3000";
  let writeBaseline = false;
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--base") base = argv[i + 1] ?? base;
    else if (argv[i].startsWith("--base=")) base = argv[i].slice("--base=".length);
    else if (argv[i] === "--write-baseline") writeBaseline = true;
  }
  return { base: base.replace(/\/$/, ""), writeBaseline };
}

/**
 * Sitemap `<loc>` values are absolute production URLs. Take the path only and
 * re-base it onto whatever server we were pointed at.
 */
async function sitemapRoutes(base) {
  const response = await fetch(`${base}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`sitemap.xml returned ${response.status} from ${base}`);
  }
  const xml = await response.text();
  const routes = [];
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const raw = match[1].trim();
    try {
      routes.push(new URL(raw).pathname);
    } catch {
      routes.push(raw.startsWith("/") ? raw : `/${raw}`);
    }
  }
  return routes;
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ");
}

/** Index ranges of `[Fig ...]` labels, where em-dashes are allowed. */
function figureSpans(text) {
  const spans = [];
  for (const match of text.matchAll(/\[Fig[^\]]*\]/gi)) {
    spans.push([match.index, match.index + match[0].length]);
  }
  return spans;
}

function findTokens(text) {
  const tokens = new Set();

  for (const phrase of BANNED_PHRASES) {
    const pattern = new RegExp(
      `(^|[^\\p{L}\\p{N}])${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\p{L}\\p{N}]|$)`,
      "iu",
    );
    if (pattern.test(text)) tokens.add(phrase);
  }

  const spans = figureSpans(text);
  let index = text.indexOf(EM_DASH);
  while (index !== -1) {
    const inFigureLabel = spans.some(([start, end]) => index >= start && index < end);
    if (!inFigureLabel) {
      tokens.add(EM_DASH);
      break;
    }
    index = text.indexOf(EM_DASH, index + 1);
  }

  return [...tokens].sort();
}

function readBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return null;
  const parsed = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  return parsed && typeof parsed === "object" ? parsed : {};
}

function writeBaselineFile(findings) {
  const sorted = {};
  for (const route of Object.keys(findings).sort()) {
    sorted[route] = findings[route];
  }
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

const { base, writeBaseline } = parseArgs(process.argv.slice(2));

/**
 * Personal-register exemption (story bank A8, decision D2, 2026-08-06):
 * journal entries are Connor's own published essays and render verbatim, so
 * the banned-phrase and em-dash checks do not apply to their routes. The
 * claim gate still does, and the port-time review found no ungated business
 * numeral in them. The /journal index stays scanned: its chrome is manual
 * copy, and the deks and titles it repeats were checked clean.
 */
const JOURNAL_ENTRY = /^\/journal\/./;

const routes = [...new Set([...(await sitemapRoutes(base)), ...EXTRA_ROUTES])]
  .filter((route) => !JOURNAL_ENTRY.test(route))
  .sort();

/** @type {Record<string, string[]>} */
const findings = {};
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  const text = htmlToText(await response.text());
  const tokens = findTokens(text);
  if (tokens.length > 0) findings[route] = tokens;
}

const baseline = readBaseline();

if (baseline === null || writeBaseline) {
  writeBaselineFile(findings);
  const total = Object.values(findings).reduce((sum, list) => sum + list.length, 0);
  console.log(
    `Voice scan baseline written: ${Object.keys(findings).length} route(s), ${total} route+token pair(s) across ${routes.length} scanned route(s).`,
  );
  console.log("Route-conversion tasks must delete their routes' entries as part of their gate.");
  process.exit(0);
}

const newFindings = [];
for (const [route, tokens] of Object.entries(findings)) {
  const allowed = new Set(baseline[route] ?? []);
  for (const token of tokens) {
    if (!allowed.has(token)) newFindings.push([route, token]);
  }
}

const staleBaseline = [];
for (const [route, tokens] of Object.entries(baseline)) {
  const present = new Set(findings[route] ?? []);
  for (const token of tokens) {
    if (!present.has(token)) staleBaseline.push([route, token]);
  }
}

for (const [route, token] of staleBaseline) {
  console.log(`clean now (stale baseline entry): ${route} :: ${JSON.stringify(token)}`);
}

if (newFindings.length > 0) {
  console.error(`Voice scan failed across ${routes.length} route(s):`);
  for (const [route, token] of newFindings) {
    console.error(`- ${route} :: ${JSON.stringify(token)}`);
  }
  process.exit(1);
}

console.log(
  `Voice scan passed: ${routes.length} route(s) scanned, ${Object.keys(baseline).length} route(s) still on the baseline.`,
);
