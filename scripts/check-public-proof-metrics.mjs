#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));

/**
 * Minimum number of proof-metric renderers the tree must still contain.
 *
 * Measured 2026-08-05 after Task 9 retired ImpactLedger (4 files):
 *   app/page.tsx
 *   app/case-studies/[slug]/page.tsx
 *   app/case-studies/[slug]/opengraph-image.tsx
 *   components/CaseStudyArchive.tsx
 *
 * Recounted 2026-08-06 after Task 15 retired CaseStudyArchive and added two
 * renderers (5 files): app/page.tsx, app/case-studies/[slug]/page.tsx and its
 * OG route, app/resume/page.tsx, app/about/page.tsx. The floor stays at 4
 * because the count rose, not fell; it is never lowered.
 *
 * Recounted again 2026-08-06 by Task 17 (4 files): the case-study OG route no
 * longer resolves metrics, because spec section 4 forbids a claim numeral on
 * any OG surface, so that card now prints its chapter title and section line
 * only. The floor is unchanged at 4 and was not lowered; the count sits on it.
 *
 * A later task may change this number ONLY with a one-line justification in
 * docs/superpowers/2026-08-05-overnight-log.md (renderers are deleted, retired,
 * or added by the redesign). Never lower it silently.
 */
const PROOF_RENDERER_FLOOR = 4;

/** Directories searched for renderers. */
const RENDERER_SCAN_ROOTS = ["app", "components"];
const RENDERER_EXTENSIONS = new Set([".ts", ".tsx"]);

/**
 * A file is a proof-metric renderer if its code (comments removed) either calls
 * the sanctioned projection or imports the claims module at all.
 */
const RENDERER_DISCOVERY = /renderableProofMetrics|from\s+["']@?\/?content\/proof-metrics/;

/**
 * Comments are documentation, not rendering. Stripping them keeps purely
 * presentational components that merely *describe* the rule (for example
 * components/manual/StatTable.tsx) out of the renderer set.
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:\\])\/\/.*$/gm, "$1");
}

function walkSourceFiles(relDir) {
  const abs = path.join(root, relDir);
  if (!fs.existsSync(abs)) return [];
  const found = [];
  const stack = [abs];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
        stack.push(full);
        continue;
      }
      if (!RENDERER_EXTENSIONS.has(path.extname(entry.name))) continue;
      found.push(path.relative(root, full));
    }
  }
  return found;
}

const failures = [];
const notes = [];

const proofSource = read("content/proof-metrics.ts");
for (const expected of [
  "publicValue?: string",
  "publicLabel?: string",
  "publicContext?: string",
  "export function renderableProofMetric",
  "export function renderableProofMetrics",
]) {
  if (!proofSource.includes(expected)) {
    failures.push(`content/proof-metrics.ts is missing ${expected}`);
  }
}

const rendererFiles = [];
for (const relDir of RENDERER_SCAN_ROOTS) {
  for (const rel of walkSourceFiles(relDir)) {
    const code = stripComments(read(rel));
    if (!RENDERER_DISCOVERY.test(code)) continue;
    rendererFiles.push(rel);
    if (!code.includes("renderableProofMetrics")) {
      failures.push(
        `${rel} reads content/proof-metrics but must resolve gated values through renderableProofMetrics()`,
      );
    }
  }
}
rendererFiles.sort();

if (rendererFiles.length < PROOF_RENDERER_FLOOR) {
  failures.push(
    `only ${rendererFiles.length} proof-metric renderer(s) found; floor is ${PROOF_RENDERER_FLOOR}. ` +
      "If a task legitimately retired a renderer, change PROOF_RENDERER_FLOOR and log a one-line justification in the overnight log.",
  );
}

const forbiddenDirectAccess = [
  ["app/page.tsx", "heroProofStrip.map"],
  ["app/page.tsx", "cs.proofMetrics.slice"],
  ["components/CaseStudyArchive.tsx", "study.proofMetrics.slice"],
  ["app/case-studies/[slug]/page.tsx", "cs.proofMetrics.slice"],
  ["app/case-studies/[slug]/page.tsx", "cs.proofMetrics.map"],
  ["app/case-studies/[slug]/opengraph-image.tsx", "const topMetrics = (cs?.proofMetrics ?? []).slice"],
];

for (const [rel, needle] of forbiddenDirectAccess) {
  // Skip-if-missing: the redesign deletes renderers, and a deleted file is a
  // satisfied check, not an ENOENT crash.
  if (!exists(rel)) {
    notes.push(`skipped direct-access check for ${rel} (file no longer exists)`);
    continue;
  }
  if (read(rel).includes(needle)) {
    failures.push(`${rel} still directly renders raw ProofMetric collection via ${needle}`);
  }
}

const forbiddenPrivateTokens = [
  "$2.5M",
  "$8.5M",
  "40% held",
  "held-meeting-to-SQL (directional)",
  "12,500",
  "WebSights",
  "ZoomInfo",
];

const sourceFileExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".tsx",
  ".ts",
  ".txt",
]);

const publicSourceFiles = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { cwd: root, encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean)
  .filter((rel) => rel !== "scripts/check-public-proof-metrics.mjs")
  .filter((rel) => !rel.startsWith(".next/") && !rel.startsWith("node_modules/"))
  .filter((rel) => sourceFileExtensions.has(path.extname(rel)));

for (const rel of publicSourceFiles) {
  const source = read(rel);
  for (const token of forbiddenPrivateTokens) {
    if (source.includes(token)) {
      failures.push(`${rel} contains private A5 token ${JSON.stringify(token)} in public portfolio source`);
    }
  }
}

const builtDirs = [".next"];
for (const dir of builtDirs) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) continue;
  const stack = [abs];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (!/\.(html|js|json|txt|rsc|body)$/.test(entry.name)) continue;
      const source = fs.readFileSync(full, "utf8");
      for (const token of forbiddenPrivateTokens) {
        if (source.includes(token)) {
          failures.push(`${path.relative(root, full)} contains private A5 token ${JSON.stringify(token)} in built output`);
        }
      }
    }
  }
}

for (const note of notes) console.log(`note: ${note}`);

if (failures.length > 0) {
  console.error("Public proof metric guardrail failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Public proof metric guardrail passed. ${rendererFiles.length} renderer(s) (floor ${PROOF_RENDERER_FLOOR}):`,
);
for (const rel of rendererFiles) console.log(`  ${rel}`);
