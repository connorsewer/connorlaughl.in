import { ActDivider } from "./ActDivider";
import { ChapterSection } from "./ChapterSection";
import { CheckerBand } from "@/components/manual";
import { Fig015OperatingCadence } from "@/components/figures";
import { ACTS, softSkills, type ActSlug } from "@/content/soft-skills";

const ACT_ORDER: ActSlug[] = ["move", "make-sense", "build-systems"];

/**
 * The three-act body of the operator chapter.
 *
 * Act I heads chapters 01 to 03, Act II 04 to 07, Act III 08 to 11. The sheet
 * supplies the measure, so this is a single linear column: no inner grid and
 * no second sidebar. The in-page contents rail comes from `ChapterLayout` in
 * anchors mode, which spies on the ids `ChapterSection` renders.
 *
 * Rhythm (audit #16). The page ran 9,113px and eleven identical units with no
 * figure and no break, so the tinted principle box became its only texture.
 * Three things changed, none of them touching the copy: a checker band divides
 * the acts the way it divides movements everywhere else, the principle and
 * signature pair alternates between the tinted box and a left-ruled
 * pull-quote so the eye gets a change every other chapter, and Act III opens
 * on FIG_015.
 *
 * FIG_015 is registered against a leadership and team operating system: the
 * standing cadence artifacts and who owns each one. Act III is the act about
 * scaling judgment past one head, by delegation and by cadence, so the plate
 * depicts the act's own subject rather than illustrating it. It is the only
 * honest fit in the registry for this page; nothing was placed at the other
 * two act boundaries because nothing there depicts those acts.
 */
export function EdgeChapters() {
  return (
    <div className="mt-12 flex flex-col gap-16">
      {ACT_ORDER.map((actSlug, actIndex) => (
        <div key={actSlug} className="flex flex-col gap-14">
          {actIndex > 0 ? <CheckerBand /> : null}

          <ActDivider act={ACTS[actSlug]} />

          {actSlug === "build-systems" ? (
            <div className="max-w-[38rem]">
              <Fig015OperatingCadence />
            </div>
          ) : null}

          {softSkills
            .filter((skill) => skill.act === actSlug)
            .map((skill, index) => (
              <ChapterSection
                key={skill.slug}
                skill={skill}
                language={index % 2 === 0 ? "box" : "quote"}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
