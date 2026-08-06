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
 * docs/archive/2026-08-05-overnight-log.md (renderers are deleted, retired,
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

/**
 * Register rows that may never render an exact value on a public route.
 *
 * Sourced from `Portfolio Claims Register - 2026-05-11.md` (REG) and the
 * "Deliberately excluded" section of `Portfolio Story Spine - 2026-08-05.md`:
 *
 *  - every REG row with an `internal-only` classification,
 *  - every REG `target` and `projected` row (the spine drops them entirely),
 *  - the `do-not-use-as-connor-achievement` row,
 *  - CJL-CLAIM-035, which the spine excludes by name because it is directional
 *    in REG and appears in no SUBSET table.
 *
 * CJL-CLAIM-050 is deliberately absent: REG classifies it company-level, but
 * BUILDER corrected and approved the count and SCOPE-006 approved the exact
 * value with the required context (spine P15/P18). Approval overlays beat the
 * REG default, which is why this is an explicit list rather than a derivation.
 */
const EXCLUDED_REGISTER_ROWS = new Map([
  ["CJL-CLAIM-003", "internal-only in REG (marketing-sourced closed-won)"],
  ["CJL-CLAIM-017", "internal-only in REG, Red in SUBSET (cross-sell economics)"],
  ["CJL-CLAIM-027", "target row in REG (90-day meeting and SQL targets)"],
  ["CJL-CLAIM-028", "internal-only in REG (first-90-day pipeline)"],
  ["CJL-CLAIM-031", "internal-only in REG (conference meeting counts)"],
  ["CJL-CLAIM-034", "internal-only in REG (artifact line and word counts)"],
  ["CJL-CLAIM-035", "spine excluded set (stakeholder interview and gate counts)"],
  ["CJL-CLAIM-036", "do-not-use-as-connor-achievement in REG"],
  ["CJL-CLAIM-039", "projected row in REG (page-count programme)"],
  ["CJL-CLAIM-042", "target row in REG (brief-to-ship SLA and output floor)"],
  ["CJL-CLAIM-047", "projected row in REG (go/no-go framework costs)"],
  ["CJL-CLAIM-049", "target row in REG (SME ARR target)"],
  ["CJL-CLAIM-052", "internal-only in REG (deck production figures)"],
  ["CJL-CLAIM-055", "internal-only in REG (April 2026 demand report)"],
  ["CJL-CLAIM-056", "internal-only in REG (visitor identification counts)"],
  ["CJL-CLAIM-057", "internal-only in REG (routing architecture detail)"],
]);

/**
 * Postures that describe a claim the public routes may never render as-is.
 * `target` and `projected` have their own sanctioned render (`label-as-target`),
 * so `show` is the only forbidden pairing for them too.
 */
const NON_SHOWABLE_POSTURES = new Map([
  ["internal-only", "internal-only claims are not softenable; they do not render"],
  ["company-level", "company-level outcomes are not personal achievement claims"],
  [
    "do-not-use-as-personal-achievement",
    "the row is marked not-a-personal-achievement",
  ],
  ["target", "targets render only through publicUse 'label-as-target'"],
  ["projected", "projections render only through publicUse 'label-as-target'"],
]);

/** sourceNote wording that marks a row as held back from public routes. */
const INTERNAL_SOURCE_NOTE =
  /internal[- ]only|red in subset|red tier|private packet|withheld from public|held from public|not for public/i;

/**
 * Extracts every `ProofMetric` object literal from a claims module.
 *
 * Anchors on `posture:` because the type makes it required, then walks braces
 * outward to recover the whole literal. Regex over the file would mis-pair
 * fields across adjacent metrics.
 */
function extractProofMetricLiterals(source, rel) {
  const literals = [];
  const postureRe = /\bposture:\s*"([a-z-]+)"/g;
  let match;
  while ((match = postureRe.exec(source)) !== null) {
    let start = source.lastIndexOf("{", match.index);
    let depth = 0;
    let end = -1;
    for (let i = start; i < source.length; i += 1) {
      if (source[i] === "{") depth += 1;
      else if (source[i] === "}") {
        depth -= 1;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) continue;
    const body = source.slice(start, end + 1);
    const line = source.slice(0, match.index).split("\n").length;
    literals.push({
      rel,
      line,
      posture: match[1],
      publicUse: body.match(/\bpublicUse:\s*"([a-z-]+)"/)?.[1] ?? "",
      claimId: body.match(/\bclaimId:\s*"([^"]+)"/)?.[1] ?? "",
      sourceNote: body.match(/\bsourceNote:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? "",
      label: body.match(/\blabel:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? "",
    });
  }
  return literals;
}

/**
 * The failure mode this encodes, recorded 2026-08-06: a chapter proof block
 * shipped `CJL-CLAIM-017` (Red, internal-only) on `publicUse: "show"` with a
 * drifted claim ID and an `approved-exact-with-context` posture, and every
 * existing check passed it. Posture, claim ID, and sourceNote are each enough
 * on their own to fail a `show` now.
 */
const CLAIM_MODULES = ["content/proof-metrics.ts", "content/case-studies.ts"];

for (const rel of CLAIM_MODULES) {
  if (!exists(rel)) {
    notes.push(`skipped claim-scope check for ${rel} (file no longer exists)`);
    continue;
  }
  for (const metric of extractProofMetricLiterals(read(rel), rel)) {
    if (metric.publicUse !== "show") continue;
    const where = `${metric.rel}:${metric.line} (${metric.label || "unlabelled metric"})`;

    const postureReason = NON_SHOWABLE_POSTURES.get(metric.posture);
    if (postureReason) {
      failures.push(
        `${where} renders on publicUse "show" with posture "${metric.posture}": ${postureReason}`,
      );
    }

    const registerReason = EXCLUDED_REGISTER_ROWS.get(metric.claimId);
    if (registerReason) {
      failures.push(
        `${where} renders on publicUse "show" but ${metric.claimId} is ${registerReason}`,
      );
    }

    if (INTERNAL_SOURCE_NOTE.test(metric.sourceNote)) {
      failures.push(
        `${where} renders on publicUse "show" but its sourceNote marks it as held back from public routes`,
      );
    }
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
