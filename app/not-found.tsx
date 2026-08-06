import type { Metadata } from "next";

import { ChapterFootNav, ColophonFooter, Masthead, Sheet } from "@/components/manual";
import { cta } from "@/content/cover";

/**
 * 404, set as an erratum (audit #38).
 *
 * The old page was a 200px sheet floating in 600px of ground carrying one
 * link, and that link was the only display-serif underlined link on the site —
 * a style that existed nowhere else. This one keeps the voice and gives it a
 * composition: mono eyebrow, a one-row errata table naming what is missing,
 * and the exits as mono rows, centred in the viewport.
 *
 * The errata row is the page's joke, told straight. Nothing on it is a claim.
 */

export const metadata: Metadata = {
  title: "Page not in this manual",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="manual-root flex min-h-screen flex-col bg-ground-grid">
      <Masthead compact />

      <main className="mx-auto flex w-full max-w-[53rem] flex-1 items-center px-0 py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet id="main-content" as="section" className="w-full px-5 py-12 sm:px-10 lg:px-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-blueprint">
            Section not printed
          </p>

          <h1 className="mt-5 max-w-[46ch] font-display text-[1.75rem] leading-tight text-body-ink sm:text-[2.25rem]">
            Page not in this manual.
          </h1>

          <section aria-labelledby="errata" className="mt-9">
            <h2
              id="errata"
              className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
            >
              Errata
            </h2>
            <dl className="m-0">
              <div className="grid gap-x-8 gap-y-1 border-b border-grid-line py-3.5 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-label-muted">
                  The page you wanted
                </dt>
                <dd className="m-0 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
                  Typeset, proofed, then lost at the bindery. It is not coming
                  back in this edition.
                </dd>
              </div>
              <div className="grid gap-x-8 gap-y-1 border-b border-grid-line py-3.5 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-label-muted">
                  What to do
                </dt>
                <dd className="m-0 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
                  Take one of the exits below. They all lead somewhere that got
                  printed.
                </dd>
              </div>
            </dl>
          </section>

          <ChapterFootNav
            className="mt-10"
            label="Exits"
            items={[
              { kicker: "Contents", title: "The full table of contents", href: "/#contents" },
              { kicker: "Chapters", title: "Section 1, the revenue systems", href: "/case-studies" },
              { kicker: "Resume", title: "Connor J. Laughlin, in one page", href: "/resume" },
              { kicker: "Contact", title: "Email Connor", href: cta.href, external: true },
            ]}
          />
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
