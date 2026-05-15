import Link from "next/link";
import {
  HERO_THESIS,
  HOMEPAGE_TEASER_SLUGS,
  softSkills,
} from "@/content/soft-skills";

/**
 * Homepage echo for /edge.
 *
 * Single full-bleed editorial band: eyebrow with the [Fig. 12] claim
 * and a reading-time marker, the umbrella thesis as H2, the
 * portfolio-version paragraph as the lede, and four numbered chapter
 * teasers deep-linked to /edge anchors. Inside the same 12-col grid
 * as the rest of the homepage so the layout doesn't fight the
 * surrounding sections.
 */
export function EdgeEcho() {
  const teasers = HOMEPAGE_TEASER_SLUGS.map((slug) =>
    softSkills.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section
      id="edge-echo"
      aria-labelledby="edge-echo-heading"
      className="px-6 py-24 md:py-28 border-y border-rule"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex flex-wrap items-baseline gap-x-3 font-mono text-[10px] tracking-[0.32em] uppercase">
              <span className="text-accent fig-num">[Fig. 12] · Edge</span>
              <span aria-hidden="true" className="text-paper/30">
                ·
              </span>
              <span className="text-paper/55">+1,400 words</span>
            </div>
            <h2
              id="edge-echo-heading"
              className="font-display text-4xl md:text-5xl leading-[1.05] text-balance"
            >
              {HERO_THESIS.display}
            </h2>
          </div>

          <p className="lg:col-span-6 lg:col-start-7 font-display text-paper/80 text-lg md:text-xl leading-[1.55] self-end max-w-[68ch]">
            {HERO_THESIS.portfolio}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <ol className="lg:col-span-7 lg:col-start-1 flex flex-col gap-2">
            {teasers.map((skill) => (
              <li key={skill.slug} className="list-none">
                <Link
                  href={`/edge#${skill.number}-${skill.slug}`}
                  data-cursor="read"
                  className="group flex items-baseline gap-4 py-2 border-b border-rule/60 hover:border-accent transition-colors"
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] text-accent shrink-0 w-8">
                    {skill.number}
                  </span>
                  <span className="font-display text-lg md:text-xl text-paper/85 group-hover:text-accent transition-colors text-balance">
                    {skill.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto font-mono text-[10px] tracking-[0.2em] text-paper/40 group-hover:text-accent transition-colors"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-4 lg:col-start-9 self-end flex justify-start lg:justify-end">
            <Link
              href="/edge"
              data-cursor="read"
              className="cta-scan font-mono text-[11px] tracking-[0.22em] uppercase text-accent hover:text-paper transition-colors inline-flex items-center gap-2 link-editorial"
            >
              Read the edge <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
