/**
 * Build-time word counts for chapter meta lines, the cover TOC, and the
 * site-wide stats rows.
 *
 * The counting logic and the counted-field lists live in
 * `scripts/word-counts.mjs` so the CLI (`npm run words`) and the rendered site
 * can never drift apart. This module only supplies the typed content modules
 * and caches the result for the build.
 *
 * Server-only by construction: it reads markdown from disk, so it must only be
 * imported from server components and metadata routes.
 */
import { caseStudies } from "@/content/case-studies";
import { longformMap, readLongform } from "@/content/longform-map";
import {
  ACTS,
  HERO_THESIS,
  renderProofAnchor,
  softSkills,
} from "@/content/soft-skills";
import { wordCounts, type WordCountResult } from "@/scripts/word-counts.mjs";

let cached: WordCountResult | null = null;

function compute(): WordCountResult {
  const longformSources: Record<string, string> = {};
  for (const slug of Object.keys(longformMap)) {
    const source = readLongform(slug);
    if (source) longformSources[slug] = source;
  }

  return wordCounts({
    caseStudies,
    longformSources,
    edge: {
      heroThesis: HERO_THESIS,
      acts: ACTS,
      softSkills,
      renderProofAnchor,
    },
  } as Parameters<typeof wordCounts>[0]);
}

/** Every count, keyed as in `npm run words -- --json`. */
export function allWordCounts(): WordCountResult {
  cached ??= compute();
  return cached;
}

/** Words in one chapter, keyed `case-studies/<slug>` or `longform/<slug>`. */
export function chapterWords(key: string): number | undefined {
  const value = allWordCounts()[key];
  return typeof value === "number" ? value : undefined;
}

export function caseStudyWords(slug: string): number | undefined {
  return chapterWords(`case-studies/${slug}`);
}

export function longformWords(slug: string): number | undefined {
  return chapterWords(`longform/${slug}`);
}

/** Words rendered by the /edge essay. */
export function edgeWords(): number {
  return allWordCounts().edgeTotal;
}

/** Stats row S4: published case-study plus longform chapters. */
export function chaptersPublished(): number {
  return allWordCounts().chaptersPublished;
}

/** Stats row S5: site-wide published words. */
export function siteWordsPublished(): number {
  return allWordCounts().siteTotalWords;
}
