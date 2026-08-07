import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  Masthead,
  Sheet,
} from "@/components/manual";
import { cta } from "@/content/cover";

/**
 * Builds section, reserved page (re-story design, phase 3).
 *
 * The nav ships before the section so the chrome is honest about where the
 * manual is going; a manual marks a reserved page rather than hiding one.
 * Phase 3 replaces this file with the full section. No claims render here.
 */

export const metadata: Metadata = {
  title: "Builds",
  description:
    "The software Connor J. Laughlin ships, named and dated. This section is at the printer.",
  robots: { index: false, follow: true },
};

export default function BuildsReserved() {
  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />
      <CheckerBand />

      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet id="main-content" as="article" className="px-5 py-10 sm:px-10 lg:px-16 lg:py-12">
          <header className="border-b border-rule-hair pb-6">
            <p className="font-pixel text-[0.8125rem] uppercase tracking-[0.1em] text-blueprint">
              Builds
            </p>
            <h1 className="mt-3 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.5rem]">
              This section is at the printer.
            </h1>
          </header>

          <p className="manual-body mt-6 max-w-[62ch]">
            The software I ship, named and dated, is being typeset now. Until
            it arrives, the work chapters describe the systems these builds run
            underneath.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/50">
            [ Reserved · re-story phase 3 ]
          </p>

          <div className="mt-12">
            <ChapterFootNav
              items={[
                { kicker: "Work", title: "The systems, one chapter each", href: "/work" },
                { kicker: "Story", title: "The person behind them", href: "/story" },
                { kicker: "Contact", title: "Email Connor", href: cta.href },
              ]}
            />
          </div>
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
