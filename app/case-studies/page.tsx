import type { Metadata } from "next";

import {
  CheckerBand,
  ColophonFooter,
  CoverTOC,
  Masthead,
  Sheet,
  type CoverTocGroup,
  withPeriod,
} from "@/components/manual";
import { tocSections } from "@/content/cover";
import { chapterWords } from "@/lib/word-counts";

/**
 * Section 1 index (spec §3: kept as a route, rendered in manual chrome).
 *
 * Introduces no claims of its own. Entries, deks, and order come from the
 * cover contents, so the index and the cover can never disagree; word counts
 * are build-computed from the rendered public projection. Copy is the approved
 * deck's section 2, verbatim.
 */

export const metadata: Metadata = {
  title: "Revenue systems | Connor J. Laughlin",
  description:
    "One chapter per system. Each one starts with the problem, then what I built, then what changed.",
};

const section1 = tocSections.find((section) => section.num === 1);

const sections: CoverTocGroup[] = section1
  ? [
      {
        num: section1.num,
        title: section1.title,
        entries: section1.entries.map((entry) => ({
          num: entry.num,
          title: entry.title,
          href: entry.href,
          dek: entry.dek,
          words: entry.countKey ? chapterWords(entry.countKey) : undefined,
        })),
      },
    ]
  : [];

export default function CaseStudiesIndex() {
  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />
      <CheckerBand />

      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet
          id="main-content"
          as="section"
          className="px-5 py-10 sm:px-10 lg:px-16 lg:py-14"
        >
          <header className="max-w-[68ch]">
            <p
              aria-hidden="true"
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint"
            >
              Section 1 / Revenue systems
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
              {withPeriod("Revenue systems")}
            </h1>
            <p className="mt-5 font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
              One chapter per system. Each one starts with the problem, then
              what I built, then what changed.
            </p>
          </header>

          <div className="mt-10">
            <CoverTOC sections={sections} showSectionHeaders={false} />
          </div>
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
