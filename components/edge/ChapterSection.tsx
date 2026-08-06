import { ProofBlock } from "./ProofBlock";
import type { SoftSkill } from "@/content/soft-skills";

type Props = {
  skill: SoftSkill;
};

/**
 * One operator chapter.
 *
 * The anchor id is unchanged (`NN-slug`), because the cover contents and the
 * in-page sidebar both link to it. Manual treatment: mono chapter number,
 * display name, serif body, proof list, then the principle and signature pair
 * as a bordered aside. Skill copy is the content module's, unchanged.
 */
export function ChapterSection({ skill }: Props) {
  const headingId = `heading-${skill.slug}`;
  const sectionId = `${skill.number}-${skill.slug}`;

  const language = [
    { label: "Principle", text: skill.language.principle },
    { label: "Signature", text: skill.language.signature },
  ];

  return (
    <section id={sectionId} aria-labelledby={headingId} className="scroll-mt-24">
      <p
        aria-hidden="true"
        className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/45"
      >
        Chapter {skill.number}
      </p>
      <h3
        id={headingId}
        className="mt-2 font-display text-[1.375rem] leading-snug text-body-ink sm:text-[1.5rem]"
      >
        <span className="sr-only">Chapter {skill.number}. </span>
        {skill.name}
      </h3>

      <p className="manual-body mt-5 max-w-[68ch]">
        {skill.definition} {skill.whyNow}
      </p>
      <p className="manual-body mt-4 max-w-[68ch]">{skill.connorRead}</p>

      <ProofBlock proof={skill.proof} />

      <aside className="mt-6 border border-grid-line bg-ground px-5 py-4">
        <dl className="flex flex-col gap-3">
          {language.map((row) => (
            <div key={row.label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-blueprint">
                {row.label}
              </dt>
              <dd className="font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
                {row.text}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
