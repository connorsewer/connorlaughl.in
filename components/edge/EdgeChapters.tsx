import { ActDivider } from "./ActDivider";
import { ChapterSection } from "./ChapterSection";
import { ACTS, softSkills, type ActSlug } from "@/content/soft-skills";

const ACT_ORDER: ActSlug[] = ["move", "make-sense", "build-systems"];

/**
 * The three-act body of the operator chapter.
 *
 * Act I heads chapters 01 to 03, Act II 04 to 07, Act III 08 to 11. The sheet
 * supplies the measure, so this is a single linear column: no inner grid and
 * no second sidebar. The in-page contents rail comes from `ChapterLayout` in
 * anchors mode, which spies on the ids `ChapterSection` renders.
 */
export function EdgeChapters() {
  return (
    <div className="mt-12 flex flex-col gap-16">
      {ACT_ORDER.map((actSlug) => (
        <div key={actSlug} className="flex flex-col gap-14">
          <ActDivider act={ACTS[actSlug]} />
          {softSkills
            .filter((skill) => skill.act === actSlug)
            .map((skill) => (
              <ChapterSection key={skill.slug} skill={skill} />
            ))}
        </div>
      ))}
    </div>
  );
}
