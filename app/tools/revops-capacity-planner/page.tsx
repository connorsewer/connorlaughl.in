import type { Metadata } from "next";

import { ChapterLayout, type TocSection } from "@/components/manual";
import { RevOpsPlanner } from "@/components/RevOpsPlanner";
import { tocSections } from "@/content/cover";

/**
 * RevOps capacity planner (spec §3: appendix chapter, interactivity preserved).
 *
 * Chapter chrome with no word-count meta, since the page is bespoke TSX. Copy
 * is the approved deck's section 9, verbatim. The calculator itself is
 * untouched: same fields, same math, same defaults, which stay round numbers
 * picked to be legible rather than anybody's operating figures.
 */

export const metadata: Metadata = {
  title: "RevOps capacity planner | Connor J. Laughlin",
  description:
    "Reverse-funnel math, in the open. Turn a revenue target into the volume each funnel stage would have to carry.",
};

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

export default function RevOpsPlannerPage() {
  return (
    <ChapterLayout
      section="Appendix"
      chapter="RevOps capacity planner"
      sections={manualSections}
      activeHref="/tools/revops-capacity-planner"
    >
      <header className="max-w-[68ch]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Appendix
        </p>
        <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
          RevOps capacity planner
        </h1>
        <p className="mt-5 font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
          Reverse-funnel math, in the open.
        </p>
        <p className="manual-body mt-6">
          Put in a revenue target and your real conversion rates. It works
          backward to the deal, opportunity, SQL, MQL, and lead volume you&apos;d
          need to hit it, plus the pipeline coverage that implies. The defaults
          are round numbers picked to be legible, not anybody&apos;s operating
          figures.
        </p>
      </header>

      <div className="mt-10 border-t border-grid-line pt-8">
        <RevOpsPlanner />
      </div>
    </ChapterLayout>
  );
}
