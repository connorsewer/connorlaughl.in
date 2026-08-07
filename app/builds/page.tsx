import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  Masthead,
  Sheet,
  withPeriod,
} from "@/components/manual";
import { Fig023BuildFleet } from "@/components/figures";
import { buildCards, buildEra, buildStatusChips } from "@/content/builds";
import { cta } from "@/content/cover";
import { buildsHeadline, renderableProofMetrics } from "@/content/proof-metrics";

/**
 * Section 2: Builds (re-story design, phase 3).
 *
 * The headline is the one gated numeral on the route: the bank-A7 build
 * count, resolved through the gate and composed from the metric's own value
 * and label so the headline can never say more than the register does. The
 * nine cards are deck 17.5 verbatim and carry no gated numeral; their eras
 * are year marks read from `content/builds-metadata.json`.
 */

export const metadata: Metadata = {
  title: "Builds",
  description:
    "The software Connor J. Laughlin ships, named and dated: a job-search operating system, governed marketing AI, analytics and video pipelines, and open-source agent tooling.",
};

export default function Builds() {
  /* A7. This route only; no card renders it. */
  const [count] = renderableProofMetrics(buildsHeadline);

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
              Section 2 / Builds
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
              {withPeriod(`${count.value} ${count.label}`)}
            </h1>
            {/* The metric's context travels with the numeral, per the gate. */}
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label-muted">
              {count.context}
            </p>
            <p className="mt-5 max-w-[52ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
              The software I ship, named and dated. Each card says what the
              thing is and what it proves; the ones with a public repository
              link straight to it.
            </p>
          </header>

          <div className="mt-10 max-w-[36rem]">
            <Fig023BuildFleet />
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {buildCards.map((card) => (
              <li key={card.id} className="flex flex-col border-t border-rule-hair pt-4">
                <div className="flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className="text-blueprint">[ {buildStatusChips[card.status]} ]</span>
                  <span className="text-label-muted">{buildEra(card.id)}</span>
                </div>
                <h2 className="mt-3 font-display text-[1.375rem] leading-snug text-body-ink">
                  {card.name}
                </h2>
                <p className="mt-2 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
                  {card.body}
                </p>
                <p className="mt-auto pt-4 font-mono text-[11px] leading-relaxed">
                  <span className="uppercase tracking-[0.2em] text-blueprint">Proves:</span>{" "}
                  <span className="text-body-ink/70">{card.proves}</span>
                </p>
                {card.href ? (
                  <p className="mt-2">
                    <a
                      href={card.href}
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint underline-offset-4 hover:underline"
                    >
                      {card.hrefLabel} ↗
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          <ChapterFootNav
            className="mt-14"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Work", title: "The systems these builds run underneath", href: "/work" },
              { kicker: "Story", title: "The person behind them", href: "/story" },
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
