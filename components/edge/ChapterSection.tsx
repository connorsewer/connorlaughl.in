import { FigureReveal } from "@/components/FigureReveal";
import { ChapterPlate } from "./ChapterPlate";
import { ProofBlock } from "./ProofBlock";
import { LanguageAside } from "./LanguageAside";
import { NotFooter } from "./NotFooter";
import type { SoftSkill } from "@/content/soft-skills";

type Props = {
  skill: SoftSkill;
};

/**
 * One chapter. Renders a six-component editorial unit: the chapter
 * plate (giant number + name), a lead paragraph weaving definition
 * and why-it-matters, the Connor-specific read, the proof block,
 * the fig-captioned language aside, and the NOT footer.
 *
 * Layout: 9-column inner grid (sits inside the 9-of-12 chapters
 * lane). Plate hangs in cols 1-3, body in cols 4-9. Stacks at <lg.
 */
export function ChapterSection({ skill }: Props) {
  const headingId = `heading-${skill.slug}`;
  const figNum = `Fig. 12.${skill.number}`;
  const sectionId = `${skill.number}-${skill.slug}`;
  const cursorLabel = `read-chapter-${skill.number}`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      data-cursor={cursorLabel}
      className="scroll-mt-24"
    >
      <div className="grid lg:grid-cols-9 gap-8 lg:gap-10">
        <div className="lg:col-span-3">
          <ChapterPlate
            number={skill.number}
            name={skill.name}
            headingId={headingId}
          />
        </div>

        <div className="lg:col-span-6 flex flex-col gap-9 md:gap-11">
          <p className="font-display text-lg md:text-xl leading-[1.55] text-paper/85 max-w-[68ch]">
            {skill.definition} {skill.whyNow}
          </p>

          <p className="font-display text-base md:text-lg leading-[1.55] text-paper/70 max-w-[68ch]">
            {skill.connorRead}
          </p>

          <ProofBlock proof={skill.proof} />

          <FigureReveal>
            <LanguageAside
              fig={figNum}
              resume={skill.language.resume}
              recruiter={skill.language.recruiter}
              interview={skill.language.interview}
            />
          </FigureReveal>

          <NotFooter items={skill.not} />
        </div>
      </div>
    </section>
  );
}
