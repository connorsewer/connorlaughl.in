import Link from "next/link";
import type { Metadata } from "next";

import { ChapterLayout, type TocSection } from "@/components/manual";
import { caseStudies } from "@/content/case-studies";
import { cta, tocSections } from "@/content/cover";

/**
 * Strategy memo (deck section 4). Last chapter of Section 1.
 *
 * Text-only by design: spec §5 permits a chapter with no figure where no
 * honest one exists, and the method behind this page has no diagram that is
 * true rather than decorative. No claims are asserted here, so the page reads
 * nothing from `content/proof-metrics.ts`.
 */

const CHAPTER_TITLE = "Strategy memo: how I think before I build";
const DEK = "The questions I answer before writing a line of a plan.";

const INTRO = [
  "Before I build anything I write the memo. Who the buyer is. What they already believe. Which claim we can defend if someone pushes on it. What has to be true for the plan to work, and what we'd do if it isn't.",
  "If those answers don't survive one page, the system built on top of them won't survive contact with a real quarter.",
];

/** Chapter order, straight from `content/case-studies.ts`. The memo runs last. */
const lastCaseStudy = caseStudies[caseStudies.length - 1];

const manualSections: TocSection[] = tocSections.map((section) => ({
  num: section.num,
  title: section.title,
  entries: section.entries.map((entry) => ({
    num: entry.num,
    title: entry.title,
    href: entry.href,
    dek: entry.dek,
  })),
}));

export const metadata: Metadata = {
  title: `${CHAPTER_TITLE}`,
  description: DEK,
};

export default function StrategyMemo() {
  return (
    <ChapterLayout
      section="Revenue systems"
      sectionHref="/case-studies"
      chapter={CHAPTER_TITLE}
      prev={{
        title: lastCaseStudy.title,
        href: `/case-studies/${lastCaseStudy.slug}`,
      }}
      sections={manualSections}
      activeHref="/case-studies/strategy-memo"
    >
      <header className="max-w-[68ch]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Memo
        </p>
        <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
          {CHAPTER_TITLE}
        </h1>
        <p className="mt-5 font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
          {DEK}
        </p>
      </header>

      <section aria-label="Opening" className="mt-10 max-w-[68ch]">
        {INTRO.map((paragraph, index) => (
          <p
            key={index}
            className={index === 0 ? "manual-body manual-dropcap" : "manual-body mt-5"}
          >
            {paragraph}
          </p>
        ))}
      </section>

      <hr className="mt-12 border-grid-line" />

      <section aria-label="Contact" className="mt-10 flex flex-col items-start gap-5">
        <a
          href={cta.href}
          className="inline-flex items-center border border-body-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-body-ink transition-colors hover:bg-body-ink hover:text-sheet"
        >
          {cta.label}
        </a>
        <p className="max-w-[62ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/75">
          {cta.secondary}
        </p>
        <Link
          href="/case-studies"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Back to Section 1
        </Link>
      </section>
    </ChapterLayout>
  );
}
