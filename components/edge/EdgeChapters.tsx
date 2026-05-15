import { ChapterSection } from "./ChapterSection";
import { ActDivider } from "./ActDivider";
import { EdgeStickyTOC } from "./EdgeStickyTOC";
import { ACTS, softSkills, type ActSlug } from "@/content/soft-skills";

const ACT_ORDER: ActSlug[] = ["move", "make-sense", "build-systems"];

/**
 * /edge chapters block. Renders the three-act structure:
 *
 *   Act I divider -> chapters 01..03
 *   Act II divider -> chapters 04..07
 *   Act III divider -> chapters 08..11
 *
 * Sits inside a 12-column grid; the chapters lane takes 9 cols and
 * leaves 3 cols on the right for the sticky chapter index (added in
 * a subsequent commit). At <lg the lane spans full width.
 */
export function EdgeChapters() {
  return (
    <section
      aria-label="Eleven operating-edge chapters"
      className="px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-9 flex flex-col gap-20 md:gap-28">
            {ACT_ORDER.map((actSlug) => {
              const act = ACTS[actSlug];
              const skillsInAct = softSkills.filter((s) => s.act === actSlug);
              return (
                <div
                  key={actSlug}
                  className="flex flex-col gap-20 md:gap-28"
                >
                  <ActDivider act={act} />
                  {skillsInAct.map((skill) => (
                    <ChapterSection key={skill.slug} skill={skill} />
                  ))}
                </div>
              );
            })}
          </div>

          <aside className="hidden lg:block lg:col-span-3">
            <EdgeStickyTOC />
          </aside>
        </div>
      </div>
    </section>
  );
}
