import type { Metadata } from "next";

import { ChapterFootNav, ChapterHeader, ChapterLayout } from "@/components/manual";
import { EdgeChapters } from "@/components/edge/EdgeChapters";
import { cta } from "@/content/cover";
import { softSkills } from "@/content/soft-skills";
import { edgeWords } from "@/lib/word-counts";

/**
 * The operator (re-story: Section 3, one scroll document).
 *
 * Single page by design, so it stands alone on a direct link. Chapter chrome
 * runs in-page: `ChapterLayout` takes the eleven chapter ids `ChapterSection`
 * already renders and drives its sidebar scroll-spy from them, so there is one
 * contents rail, one meta line, and one ruler on the route.
 *
 * Copy is the approved deck's section 5: this page intro, plus the three act
 * framings carried on `ACTS[*].subtitle`. Acts and skills keep their existing
 * names and bodies.
 */

export const metadata: Metadata = {
  title: "The operator",
  description:
    "How I work when the problem isn't defined yet. Eleven operating chapters in three acts.",
};

export const revalidate = 60;

/** Anchors are the existing `NN-slug` section ids, in reading order. */
const anchors = softSkills.map((skill) => ({
  id: `${skill.number}-${skill.slug}`,
  label: skill.name,
}));

export default function EdgePage() {
  return (
    <ChapterLayout
      section="Section 3"
      sectionHref="/#contents"
      chapter="The operator"
      words={edgeWords()}
      anchors={anchors}
    >
      <ChapterHeader
        eyebrow="Section 3 / The operator"
        title="The operator"
        dek="How I work when the problem isn&rsquo;t defined yet."
      />

      <EdgeChapters />

      {/* Audit #2: the page ran 9,113px and terminated in a grey box. */}
      <ChapterFootNav
        className="mt-16"
        label="Elsewhere in the manual"
        items={[
          { kicker: "Contents", title: "The full table of contents", href: "/#contents" },
          { kicker: "Chapters", title: "Section 1, the revenue systems", href: "/case-studies" },
          { kicker: "Resume", title: "Connor J. Laughlin, in one page", href: "/resume" },
          { kicker: "Contact", title: "Email Connor", href: cta.href, external: true },
        ]}
      />
    </ChapterLayout>
  );
}
