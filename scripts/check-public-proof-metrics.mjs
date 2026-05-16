#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const rendererFiles = [
  "app/page.tsx",
  "app/case-studies/[slug]/page.tsx",
  "app/case-studies/[slug]/opengraph-image.tsx",
  "components/CaseStudyArchive.tsx",
  "components/ImpactLedger.tsx",
];

const failures = [];

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

for (const rel of rendererFiles) {
  const source = read(rel);
  if (!source.includes("renderableProofMetrics")) {
    failures.push(`${rel} must render ProofMetric data through renderableProofMetrics()`);
  }
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

if (failures.length > 0) {
  console.error("Public proof metric guardrail failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public proof metric guardrail passed.");
