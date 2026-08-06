import type { Metadata } from "next";

import { ChapterHeader, ChapterLayout, type TocSection } from "@/components/manual";
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
  title: "RevOps capacity planner",
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
      <ChapterHeader
        eyebrow="Appendix"
        title="RevOps capacity planner"
        dek="Reverse-funnel math, in the open."
      />

      <p className="manual-body mx-auto mt-8 max-w-[68ch]">
        Put in a revenue target and your real conversion rates. It works
        backward to the deal, opportunity, SQL, MQL, and lead volume you&rsquo;d
        need to hit it, plus the pipeline coverage that implies. The defaults
        are round numbers picked to be legible, not anybody&rsquo;s operating
        figures.
      </p>

      <div className="mt-10 border-t border-grid-line pt-8">
        <RevOpsPlanner />
      </div>
    </ChapterLayout>
  );
}
