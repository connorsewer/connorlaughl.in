#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

/**
 * Regenerates `content/builds-metadata.json`, the status-and-era record the
 * `/builds` cards render from (deck 17.5: "Statuses and years read from repo
 * metadata at build time").
 *
 * The deploy environment cannot see the build repositories, so "build time"
 * is implemented the same way the plate ground truths are: measured here, on
 * the machine that has the repos, and committed. Eras come from `git log`
 * where a repository exists locally; systems that are not local git repos
 * (the agent-orchestration workspace, hosted tooling) carry a recorded window
 * with its source named, and the JSON records which kind each entry is.
 *
 * Run it from the repo root whenever a build's era should refresh:
 *
 *   node scripts/builds-metadata.mjs
 *
 * No numeral in the output is a claim: eras are year marks, which the claim
 * gate exempts. The build COUNT on the /builds headline does not come from
 * here; it resolves through `content/proof-metrics.ts` (bank A7).
 */

const root = process.cwd();
const home = os.homedir();

/** yyyy-mm of a repo's first and last commit, or null if unreadable. */
function gitWindow(repoDir) {
  try {
    const args = ["-C", repoDir, "log", "--format=%as"];
    const dates = execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .filter(Boolean);
    if (dates.length === 0) return null;
    const month = (d) => d.slice(0, 7);
    return { from: month(dates[dates.length - 1]), to: month(dates[0]) };
  } catch {
    return null;
  }
}

/**
 * One entry per card in `content/builds.ts`, keyed by card id.
 *
 * `paths` are tried in order; the first that yields a git window wins.
 * `recorded` is the fallback era with its source, for systems with no local
 * repository to measure.
 */
const BUILDS = [
  {
    id: "jobos",
    paths: [path.join(home, "Desktop/Coding/jobos")],
  },
  {
    id: "tsi-marketing-machine",
    paths: [],
    recorded: {
      era: "2026-04 → 2026-08",
      source:
        "Agent session store, active period per AI-Native Build Evidence - 2026-08-04.md; the workspace is not a git repository",
    },
  },
  {
    id: "tsi-marketing-analytics",
    paths: [path.join(home, "projects/tsi-marketing-analytics")],
  },
  {
    id: "tsi-video-studio",
    paths: [path.join(home, "projects/tsi-video-remotion")],
    recorded: { era: "2026", source: "Delivery year; no measurable git history" },
  },
  {
    id: "tsi-interactive-tools",
    paths: [],
    recorded: { era: "2026", source: "Delivery year; shipped inside employer properties" },
  },
  {
    id: "debtnext-rebuild",
    paths: [path.join(home, "Desktop/Coding/DebtNext.com Redesign")],
  },
  {
    id: "mcos",
    paths: [path.join(home, "projects/mcOS")],
  },
  {
    id: "hermes-agent",
    paths: [],
    recorded: { era: "2026", source: "Experiment year; runs off-repo against a hosted agent" },
  },
  {
    id: "this-site",
    paths: [root],
  },
];

const builds = {};
for (const build of BUILDS) {
  let entry = null;
  for (const repoDir of build.paths) {
    const window = gitWindow(repoDir);
    if (!window) continue;
    entry = {
      era: window.from === window.to ? window.from : `${window.from} → ${window.to}`,
      source: "git",
    };
    break;
  }
  if (!entry && build.recorded) entry = build.recorded;
  if (!entry) {
    console.error(`builds-metadata: no git window and no recorded era for ${build.id}`);
    process.exit(1);
  }
  builds[build.id] = entry;
}

const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  builds,
};

const dest = path.join(root, "content", "builds-metadata.json");
fs.writeFileSync(dest, `${JSON.stringify(out, null, 2)}\n`);
console.log(`builds-metadata: wrote ${path.relative(root, dest)}`);
for (const [id, { era, source }] of Object.entries(builds)) {
  console.log(`  ${id}: ${era} (${source})`);
}
