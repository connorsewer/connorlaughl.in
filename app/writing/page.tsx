import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  CoverTOC,
  Masthead,
  Sheet,
  type CoverTocGroup,
} from "@/components/manual";
import { cta, tocSections } from "@/content/cover";
import { chapterWords } from "@/lib/word-counts";

/**
 * Section 3 index (re-story design, decision 5: WRITING is a standing nav
 * item, so the section gets a landing route of its own).
 *
 * Introduces no claims. Entries, deks, and order come from the cover
 * contents, so this index and the cover can never disagree; word counts are
 * build-computed from the rendered public projection.
 */

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Long-form pieces on the systems in this manual, written while they were being built.",
};

const section3 = tocSections.find((section) => section.num === 3);

const sections: CoverTocGroup[] = section3
  ? [
      {
        num: section3.num,
        title: section3.title,
        entries: section3.entries.map((entry) => ({
          num: entry.num,
          title: entry.title,
          href: entry.href,
          dek: entry.dek,
          words: entry.countKey ? chapterWords(entry.countKey) : undefined,
        })),
      },
    ]
  : [];

export default function WritingIndex() {
  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />
      <CheckerBand />

      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet id="main-content" as="article" className="px-5 py-10 sm:px-10 lg:px-16 lg:py-12">
          <header className="border-b border-rule-hair pb-6">
            <p className="font-pixel text-[0.8125rem] uppercase tracking-[0.1em] text-blueprint">
              Section 3
            </p>
            <h1 className="mt-3 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.5rem]">
              Writing.
            </h1>
            <p className="manual-body mt-4 max-w-[62ch]">
              The long versions. Each piece was written while its system was
              still being built, which is why they read like field notes rather
              than retrospectives.
            </p>
          </header>

          <div className="mt-10">
            <CoverTOC sections={sections} showSectionHeaders={false} />
          </div>

          <div className="mt-12">
            <ChapterFootNav
              items={[
                { kicker: "Contents", title: "The full table of contents", href: "/#contents" },
                { kicker: "Work", title: "The systems these pieces document", href: "/work" },
                { kicker: "Contact", title: "Email Connor", href: cta.href },
              ]}
            />
          </div>
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
