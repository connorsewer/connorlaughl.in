/**
 * Types for `scripts/word-counts.mjs` so `lib/word-counts.ts` can import the
 * same counting functions the CLI uses. The script stays plain ESM because it
 * has to run under bare `node` without a bundler.
 */

export type WordCountResult = Record<string, number> & {
  edgeTotal: number;
  caseStudyTotalWords: number;
  longformTotalWords: number;
  siteTotalWords: number;
  chaptersPublished: number;
};

export type EdgeCountInput = {
  heroThesis: { display: string; portfolio: string; stake: string; moat: string };
  acts: Record<string, { title: string; subtitle: string }>;
  softSkills: readonly {
    name: string;
    definition: string;
    whyNow: string;
    connorRead: string;
    language: { principle: string; signature: string };
    proof: readonly unknown[];
  }[];
  renderProofAnchor: (anchor: never) => { text: string } | null;
};

export type CaseStudyCountInput = {
  slug: string;
  title: string;
  hook: string;
  businessProblem: string;
  whatIBuilt: string;
  whatChanged: string;
  whyItMattered: string;
  whatItProves: string;
  systemsBuilt: readonly string[];
  interviewLine: string;
};

export function countWords(text: string): number;
export function longformWordCount(markdown: string): number;
export function caseStudyWordCount(cs: CaseStudyCountInput): number;
export function edgeWordCount(edge: EdgeCountInput): number;
export function wordCounts(data: {
  caseStudies: readonly CaseStudyCountInput[];
  longformSources: Record<string, string>;
  edge: EdgeCountInput;
}): WordCountResult;
