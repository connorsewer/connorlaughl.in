import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { RevOpsPlanner } from "@/components/RevOpsPlanner";

export const metadata: Metadata = {
  title: "RevOps capacity planner | Connor J. Laughlin",
  description:
    "Reverse-funnel capacity planner. Translate a revenue target into the leads, MQLs, SQLs, opportunities, and pipeline coverage required to hit it.",
};

export default function RevOpsPlannerPage() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content" className="min-h-screen pt-32 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 mb-12">
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent block mb-5">
                Tool · Reverse funnel
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[0.95] tracking-tight text-balance">
                RevOps capacity planner.
              </h1>
              <p className="text-paper/70 text-lg leading-relaxed mt-6 max-w-2xl">
                Type in a revenue target and the funnel conversion rates from
                your CRM. The planner walks the math backward and shows what
                volume each stage needs to carry. Same engine I used to size
                the team and demand mix at TSI.
              </p>
              <ul className="flex flex-wrap gap-2 mt-6">
                {[
                  "RevOps",
                  "Demand planning",
                  "Capacity sizing",
                  "Board-readable",
                ].map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/70 border border-rule px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9 self-end">
              <div className="border border-rule rounded-2xl p-5 bg-ink/55">
                <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">
                  How to use it
                </h2>
                <ol className="mt-3 space-y-2 text-paper/75 text-sm leading-relaxed list-decimal pl-4 marker:text-accent marker:font-mono">
                  <li>Set the target you owe the board.</li>
                  <li>
                    Enter the conversion rates from your CRM, not the
                    pitch-deck version.
                  </li>
                  <li>
                    Read the required volumes top-down. If a stage looks
                    unreasonable, that is the bottleneck.
                  </li>
                </ol>
                <p className="text-paper/55 text-xs leading-relaxed mt-3">
                  Numbers stay in your browser. Nothing is sent anywhere.
                </p>
              </div>
            </aside>
          </div>

          <div className="rule mb-10" role="separator" />

          <RevOpsPlanner />

          <div className="rule mt-16" role="separator" />

          <section className="mt-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl md:text-4xl leading-snug text-balance">
                Why a planner like this matters.
              </h2>
              <p className="text-paper/75 text-lg leading-relaxed mt-4">
                Most marketing plans get sized by working forward from a budget.
                I size them by working backward from a quota. The math is the
                same. The conversation it forces with sales, finance, and the
                CEO is the part that changes the year.
              </p>
              <p className="text-paper/75 text-lg leading-relaxed mt-4">
                If the implied lead volume looks impossible, the team has a
                story to tell about win rate, average deal size, or sales-cycle
                compression. More activity is usually the wrong fix.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Link
                href="/case-studies/revenue-operations-signal-to-revenue"
                className="block border border-rule rounded-2xl p-5 hover:border-accent transition-colors"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent">
                  Related case
                </span>
                <h3 className="font-display text-xl leading-snug mt-2">
                  Revenue Operating System from Zero
                </h3>
                <p className="text-paper/65 text-sm leading-relaxed mt-2">
                  The 35+ KPI framework that wrapped this planner into a
                  weekly operating cadence at a roughly $460M PE-backed
                  enterprise.
                </p>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent mt-3 block">
                  Open <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
