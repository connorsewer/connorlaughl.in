import { SplitText } from "@/components/SplitText";
import { EdgeThesisDiagram } from "./EdgeThesisDiagram";
import { HERO_THESIS } from "@/content/soft-skills";

/**
 * /edge hero block.
 *
 * Three stacked elements inside a max-w-6xl container:
 *   1. Mono eyebrow with the fig-12 claim.
 *   2. Weight-laddered H1 — "Taste" Black, "applied at" Light Italic,
 *      "velocity." Black. Each chunk reveals word-by-word with a
 *      compounding delay.
 *   3. Lede paragraph at GT Sectra 22-28px, capped at 68ch.
 *   4. Thesis diagram (typeset SVG) full width below the lede.
 */
export function EdgeHero() {
  return (
    <section
      aria-labelledby="edge-hero-heading"
      className="px-6 pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-14 md:gap-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase">
            [Fig. 12] · Edge · 2026
          </span>

          <h1
            id="edge-hero-heading"
            className="font-display text-[clamp(3rem,8.5vw,6.75rem)] leading-[0.95] tracking-tight text-balance"
          >
            <SplitText
              as="span"
              granularity="word"
              className="font-display font-black"
            >
              Taste
            </SplitText>{" "}
            <SplitText
              as="span"
              granularity="word"
              delay={0.3}
              className="font-display font-light italic text-paper/80"
            >
              applied at
            </SplitText>{" "}
            <SplitText
              as="span"
              granularity="word"
              delay={0.6}
              className="font-display font-black"
            >
              velocity.
            </SplitText>
          </h1>

          <p className="font-display text-xl md:text-[1.625rem] leading-[1.45] text-paper/85 max-w-[68ch]">
            {HERO_THESIS.portfolio}
          </p>
        </div>

        <EdgeThesisDiagram />
      </div>
    </section>
  );
}
