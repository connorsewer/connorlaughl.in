import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  Masthead,
  Sheet,
  withPeriod,
} from "@/components/manual";
import { cta } from "@/content/cover";
import {
  nowBuilding,
  nowFilms,
  nowLede,
  nowPlaying,
  nowReading,
  nowTv,
  nowUpdated,
} from "@/content/now";

/**
 * Now: the status board (re-story port, bank A8 decision D3).
 *
 * The previous site's "Currently" block in manual dress: four mono-labelled
 * cells in one bordered board, stamped with the date the module was last
 * touched. All copy is Connor's, verbatim, from content/now.ts. Bespoke TSX,
 * so no word-count meta.
 */

export const metadata: Metadata = {
  title: "Now",
  description:
    "A snapshot of right now: what Connor J. Laughlin is reading, watching, playing, and building when nobody's billing for it.",
};

const CELL_LABEL =
  "flex items-baseline justify-between border-b border-rule-hair pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint";
const SUB_LABEL =
  "mb-1.5 mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-body-ink/45 first:mt-0";

export default function NowPage() {
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
              Appendix / Now
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
              {withPeriod("A snapshot of right now")}
            </h1>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/50">
              Updated when something changes · Last touched {nowUpdated}
            </p>
            <p className="mt-5 max-w-[52ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
              {nowLede}
            </p>
          </header>

          <div className="mt-10 grid gap-x-10 gap-y-10 border-t border-rule-hair pt-8 sm:grid-cols-2">
            <section aria-labelledby="now-reading">
              <h2 id="now-reading" className={CELL_LABEL}>
                <span>[ Reading ]</span>
                <span aria-hidden="true">01</span>
              </h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {nowReading.map((book) => (
                  <li key={book.title} className="leading-snug">
                    <span className="font-serif-body text-[1rem] text-body-ink">
                      {book.title}
                      {book.subtitle ? (
                        <span className="text-body-ink/55">: {book.subtitle}</span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-body-ink/50">
                      {book.author}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="now-watching">
              <h2 id="now-watching" className={CELL_LABEL}>
                <span>[ Watching ]</span>
                <span aria-hidden="true">02</span>
              </h2>
              <div className="mt-3">
                <p className={SUB_LABEL}>Films</p>
                <ul className="flex flex-col gap-1 font-serif-body text-[0.9375rem] leading-snug text-body-ink/85">
                  {nowFilms.map((film) => (
                    <li key={film}>{film}</li>
                  ))}
                </ul>
                <p className={SUB_LABEL}>TV</p>
                <ul className="flex flex-col gap-1 font-serif-body text-[0.9375rem] leading-snug text-body-ink/85">
                  {nowTv.map((show) => (
                    <li key={show}>{show}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="now-playing">
              <h2 id="now-playing" className={CELL_LABEL}>
                <span>[ Playing ]</span>
                <span aria-hidden="true">03</span>
              </h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {nowPlaying.titles.map((title) => (
                  <li key={title} className="font-display text-[1.125rem] text-body-ink">
                    {title}
                  </li>
                ))}
              </ul>
              <p className="mt-3 max-w-[38ch] font-serif-body text-[0.875rem] leading-relaxed text-body-ink/60">
                {nowPlaying.note}
              </p>
            </section>

            <section aria-labelledby="now-building">
              <h2 id="now-building" className={CELL_LABEL}>
                <span>[ Building ]</span>
                <span aria-hidden="true">04</span>
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {nowBuilding.map((item) => (
                  <li key={item} className="flex gap-2 font-serif-body text-[0.9375rem] leading-snug text-body-ink/85">
                    <span aria-hidden="true" className="shrink-0 text-blueprint">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <ChapterFootNav
            className="mt-14"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Builds", title: "The software I ship, named and dated", href: "/builds" },
              { kicker: "Journal", title: "Notes from a working life", href: "/journal" },
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
