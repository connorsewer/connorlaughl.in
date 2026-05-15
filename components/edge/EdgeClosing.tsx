import { FigureReveal } from "@/components/FigureReveal";
import { HERO_THESIS } from "@/content/soft-skills";

/**
 * Closing pull-quote for /edge. The one-line moat from the compendium,
 * sat between two walnut rules and capped at ~50ch so the line breaks
 * read editorially. FigureReveal handles the viewport-entry fade.
 */
export function EdgeClosing() {
  return (
    <FigureReveal>
      <section
        aria-label="Closing"
        className="px-6 py-20 md:py-28 border-y border-rule"
      >
        <figure className="mx-auto max-w-3xl flex flex-col items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-paper/55 fig-num">
            [Fig. 40.12] · One-line moat
          </span>
          <blockquote className="font-display text-[1.75rem] md:text-[2.25rem] leading-[1.2] tracking-tight text-balance text-paper text-center max-w-[28ch] md:max-w-[34ch]">
            {HERO_THESIS.moat}
          </blockquote>
        </figure>
      </section>
    </FigureReveal>
  );
}
