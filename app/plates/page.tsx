import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  DevelopPlate,
  Masthead,
  Sheet,
  withPeriod,
} from "@/components/manual";
import { cta } from "@/content/cover";
import { photoPlates } from "@/content/plates";

/**
 * Plates: the photographic appendix (re-story port, bank A8 decision D5).
 *
 * Eleven photographs, screened to the blueprint duotone and developing to
 * color on press. Copy is the previous site's, near-verbatim; the plates and
 * captions come from content/plates.ts and the series is registered in
 * FIGURES.md. Bespoke TSX, so no word-count meta.
 */

export const metadata: Metadata = {
  title: "Plates",
  description:
    "A few rolls of film: wedding, family, football, the road. Photographic plates that develop to color when pressed.",
};

export default function PlatesPage() {
  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />
      <CheckerBand />

      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet
          id="main-content"
          as="section"
          className="px-5 py-10 sm:px-10 lg:px-16 lg:py-14"
        >
          <header className="max-w-[68ch]">
            <p
              aria-hidden="true"
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint"
            >
              Appendix / Plates
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
              {withPeriod("A few rolls of film")}
            </h1>
            <p className="mt-5 max-w-[52ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
              Wedding, family, football, the road. Mostly recent, mostly Rome,
              mostly the people in the story made into pictures.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/50">
              [ Press a plate to develop it ]
            </p>
          </header>

          <div className="mt-10 gap-8 sm:columns-2">
            {photoPlates.map((plate) => (
              <DevelopPlate key={plate.num} plate={plate} />
            ))}
          </div>

          <ChapterFootNav
            className="mt-10"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Story", title: "The person in the pictures", href: "/story" },
              { kicker: "Now", title: "A snapshot of right now", href: "/now" },
              {
                kicker: "Contact",
                title: "Email Connor",
                href: cta.href,
                external: true,
              },
            ]}
          />
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
