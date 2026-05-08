import Link from "next/link";
import { Header } from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy memo — Connor J. Laughlin",
  description:
    "A public-safe memo on how modern GTM gets built. Governance, instrumentation, narrative discipline.",
};

export default function StrategyMemo() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="mx-auto max-w-4xl px-6 pt-10 md:pt-14 pb-20">
        <article className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <Link
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/70 hover:text-paper transition-colors"
              href="/"
            >
              <span aria-hidden="true">←</span> Home
            </Link>
            <span className="status-pill pixel-flicker">Memo · 2024</span>
          </div>

          <div className="mt-8">
            <span className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">
              Public-safe memo
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-balance">
              How I think about GTM right now.
            </h1>
            <p className="mt-4 text-lg text-paper-muted leading-relaxed max-w-2xl">
              Governance. Instrumentation. Narrative discipline. The dashboard isn't the system. The system is the system.
            </p>
          </div>

          <div className="rule mt-8" />

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              ["THESIS", "Trust runs as infrastructure, not a brand campaign."],
              ["METHOD", "Define KPIs. Build routing. Add automation. Enforce governance."],
              ["PROMISE", "Speed without trust debt."],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-rule bg-ink/55 p-5">
                <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60 uppercase">{k}</div>
                <div className="mt-2 text-sm text-paper/80 leading-relaxed">{v}</div>
              </div>
            ))}
          </div>

          <div className="rule mt-10" />

          <div className="mt-8 space-y-10 text-paper/80 leading-relaxed text-lg">
            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">01. The problem</div>
              <p className="mt-4 drop-cap">
                Most GTM teams don't have a performance problem. They have a trust problem. Definitions drift. Attribution becomes politics. The reporting layer turns into theater. When numbers can't be believed, decisions can't be made.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">02. The category trap</div>
              <p className="mt-4">
                Legacy industries inherit language they didn't write. One word can sink a whole cycle: risk, compliance, collections, outsourcing. If the narrative is wrong, even excellent execution stays invisible.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">03. The pivot</div>
              <p className="mt-4">
                Treat compliance and customer experience as product features. Don't market around risk. Operationalize the reduction of it, then make the operational truth legible to the buyer.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">04. The engine</div>
              <p className="mt-4">
                AI scales output. Only governance scales trust. Every automation needs an owner, a log, a threshold for human review, and an escalation path.
              </p>
              <div className="mt-5 rounded-2xl border border-rule bg-ink/55 p-6">
                <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60 uppercase">Governance checklist</div>
                <ul className="mt-4 space-y-3 text-sm" role="list">
                  {[
                    "What data does it touch. Who approved that access.",
                    "Where does it write. Who owns the side effects.",
                    "What gets logged. What's auditable.",
                    "When does it stop and ask for a human.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-pixel text-[10px] tracking-[0.2em] text-accent shrink-0 mt-1" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">05. The operating system</div>
              <p className="mt-4">
                Instrumentation before dashboards. Routing before automation. Governance before scale. The goal is an org that ships faster over time and forecasts with confidence.
              </p>
            </section>
          </div>

          <div className="rule mt-10" />

          <div className="mt-8 text-sm text-paper/65">
            Public-safe. In a walkthrough I can share redacted artifacts and the operating blueprint underneath this memo.
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent hover:text-paper transition-colors"
              href="/case-studies"
            >
              Open the index <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/65 hover:text-paper transition-colors"
              href="/#contact"
            >
              Email me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
