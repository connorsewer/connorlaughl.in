#!/usr/bin/env node
/**
 * Build-computed word counts for the manual's chapter meta lines, TOC, and the
 * site-wide stats rows (S4 chapters published, S5 words published).
 *
 * These counts are the ONLY numerals on the site exempt from the claim gate, so
 * they must be computed from the public rendered projection and nothing else.
 *
 * WHAT IS COUNTED
 *
 * 1. Longform chapters: the markdown bodies named in `content/longform-map.ts`,
 *    i.e. exactly the files `lib/markdown.tsx` renders. Markdown syntax is
 *    stripped before counting; link text and table cell text count, fence
 *    markers and HTML comments do not.
 *
 * 2. Case-study chapters: the prose fields that `app/case-studies/[slug]/page.tsx`
 *    actually renders as narrative. Enumerated from that file on 2026-08-05,
 *    re-enumerated after the manual chapter conversion:
 *      title, hook, chapterIntro[], outcome, businessProblem, whatIBuilt,
 *      whatChanged, whyItMattered, whatItProves, systemsBuilt[], interviewLine
 *    `chapterIntro` may carry a `{S6}` placeholder the page resolves through
 *    `content/proof-metrics.ts`; `proseTokens` expands it for counting.
 *    Deliberately NOT counted, though some are rendered: label, scope, stack,
 *    governance, audienceFit (metadata chrome, not prose), governanceNotes and
 *    sourceCrossrefs (internal governance record), proofMetrics (gated claim
 *    values, which carry their own posture model).
 *
 * 3. `/edge`: the rendered text of `content/soft-skills.ts`:
 *      HERO_THESIS.display, .portfolio, .stake, .moat
 *      ACTS[*].title, .subtitle
 *      softSkills[*].name, .definition, .whyNow, .connorRead,
 *                    .language.principle, .language.signature
 *      softSkills[*].proof[*] through `renderProofAnchor`, which drops
 *                    publicUse "hide" anchors and returns the categorical
 *                    phrase for anything not cleared as "show".
 *    Act numbers, skill numbers, and figure labels are structural chrome.
 *
 * Drafts and stubs are never read: `content/case-studies/stubs/` and
 * `content/blog-drafts/` are not referenced by any counted source.
 *
 * USAGE
 *   node scripts/word-counts.mjs --json
 *
 * The pure functions below are also imported by `lib/word-counts.ts`, which
 * feeds the same numbers to the TOC and chapter meta at build time. Keep the
 * field lists here and nowhere else.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/** Whitespace-delimited token count over already-plain text. */
export function countWords(text) {
  if (!text) return 0;
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

function countFields(values) {
  return values.reduce((total, value) => total + countWords(value ?? ""), 0);
}

/** Markdown body -> plain prose, then counted. */
export function longformWordCount(markdown) {
  const plain = markdown
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[^\n]*/g, " "))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*[-|: ]{3,}\s*$/gm, " ")
    .replace(/[|`*_~]/g, " ");
  return countWords(plain);
}

/**
 * Rendered narrative fields of one case study.
 *
 * `proseTokens` expands `{TOKEN}` placeholders that the page resolves through
 * `content/proof-metrics.ts` at render time, so the count matches the rendered
 * HTML rather than the 1-word placeholder. Callers that cannot resolve them
 * (the CLI) pass nothing and undercount those chapters by the token's length.
 */
export function caseStudyWordCount(cs, proseTokens = {}) {
  const expand = (value) =>
    typeof value === "string"
      ? value.replace(/\{([A-Z][A-Z0-9]*)\}/g, (match, key) => proseTokens[key] ?? match)
      : value;

  return countFields([
    cs.title,
    cs.hook,
    ...(cs.chapterIntro ?? []).map(expand),
    cs.outcome,
    cs.businessProblem,
    cs.whatIBuilt,
    cs.whatChanged,
    cs.whyItMattered,
    cs.whatItProves,
    ...(cs.systemsBuilt ?? []),
    cs.interviewLine,
  ]);
}

/** Rendered text of the /edge essay. */
export function edgeWordCount({ heroThesis, acts, softSkills, renderProofAnchor }) {
  let total = countFields([
    heroThesis.display,
    heroThesis.portfolio,
    heroThesis.stake,
    heroThesis.moat,
  ]);

  for (const act of Object.values(acts)) {
    total += countFields([act.title, act.subtitle]);
  }

  for (const skill of softSkills) {
    total += countFields([
      skill.name,
      skill.definition,
      skill.whyNow,
      skill.connorRead,
      skill.language?.principle,
      skill.language?.signature,
    ]);
    for (const anchor of skill.proof ?? []) {
      const rendered = renderProofAnchor(anchor);
      if (rendered) total += countWords(rendered.text);
    }
  }

  return total;
}

/**
 * Pure computation over already-loaded content.
 *
 * @param {{
 *   caseStudies: any[],
 *   longformSources: Record<string, string>,
 *   edge: Parameters<typeof edgeWordCount>[0],
 *   proseTokens?: Record<string, string>,
 * }} data
 */
export function wordCounts({ caseStudies, longformSources, edge, proseTokens }) {
  /** @type {Record<string, number>} */
  const counts = {};

  let caseStudyTotalWords = 0;
  let caseStudyChapters = 0;
  for (const cs of caseStudies) {
    const words = caseStudyWordCount(cs, proseTokens);
    counts[`case-studies/${cs.slug}`] = words;
    caseStudyTotalWords += words;
    caseStudyChapters += 1;
  }

  let longformTotalWords = 0;
  let longformChapters = 0;
  for (const [slug, markdown] of Object.entries(longformSources)) {
    const words = longformWordCount(markdown);
    counts[`longform/${slug}`] = words;
    longformTotalWords += words;
    longformChapters += 1;
  }

  const edgeTotal = edgeWordCount(edge);

  return {
    ...counts,
    edgeTotal,
    caseStudyTotalWords,
    longformTotalWords,
    /** S5: site-wide published words (case studies + longform + /edge). */
    siteTotalWords: caseStudyTotalWords + longformTotalWords + edgeTotal,
    /** S4: published chapters. Bespoke TSX pages are not chapters. */
    chaptersPublished: caseStudyChapters + longformChapters,
  };
}

/** CLI data loading. Node strips the TS types; the content modules' only
 *  cross-module imports are type-only, so nothing needs a bundler. */
async function loadContent() {
  const root = process.cwd();
  const load = (rel) => import(pathToFileURL(path.join(root, rel)).href);

  const [caseStudiesModule, longformModule, softSkillsModule] = await Promise.all([
    load("content/case-studies.ts"),
    load("content/longform-map.ts"),
    load("content/soft-skills.ts"),
  ]);

  /** @type {Record<string, string>} */
  const longformSources = {};
  for (const [slug, file] of Object.entries(longformModule.longformMap)) {
    longformSources[slug] = fs.readFileSync(
      path.join(root, "content", "case-studies", file),
      "utf8",
    );
  }

  return {
    caseStudies: caseStudiesModule.caseStudies,
    longformSources,
    edge: {
      heroThesis: softSkillsModule.HERO_THESIS,
      acts: softSkillsModule.ACTS,
      softSkills: softSkillsModule.softSkills,
      renderProofAnchor: softSkillsModule.renderProofAnchor,
    },
  };
}

const invokedDirectly =
  process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;

if (invokedDirectly) {
  const result = wordCounts(await loadContent());
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    for (const [key, value] of Object.entries(result)) {
      console.log(`${String(value).padStart(7)}  ${key}`);
    }
  }
}
