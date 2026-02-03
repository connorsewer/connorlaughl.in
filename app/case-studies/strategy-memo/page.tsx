import Link from "next/link";
import { Header } from "@/components/Header";

export default function StrategyMemo() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pt-10 md:pt-14 pb-20">
        <article className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <Link className="text-sm text-paper/70 hover:text-paper" href="/">
              ← Back
            </Link>
            <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">STRATEGY MEMO</div>
          </div>

          <div className="mt-8">
            <div className="font-mono text-[11px] tracking-[0.32em] text-paper/65">THE ARCHITECTURE OF TRUST</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">Trust-first, AI-native GTM</h1>
            <p className="mt-4 text-lg text-paper-muted leading-relaxed max-w-2xl">
              A public-safe memo on how modern GTM gets built: governance, instrumentation, and narrative discipline — not dashboard theater.
            </p>
          </div>

          <div className="rule mt-8" />

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              ["THESIS", "Trust isn’t brand. It’s infrastructure."],
              ["METHOD", "Define KPIs → build routing → add automation → enforce governance."],
              ["PROMISE", "Speed without trust debt."],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-rule bg-ink/55 p-5">
                <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">{k}</div>
                <div className="mt-2 text-sm text-paper/80 leading-relaxed">{v}</div>
              </div>
            ))}
          </div>

          <div className="rule mt-10" />

          <div className="mt-8 space-y-10 text-paper/80 leading-relaxed">
            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">1) THE PROBLEM</div>
              <p className="mt-4">
                Most GTM teams don’t have a performance problem — they have a <span className="text-paper font-display">trust problem</span>.
                Definitions drift. Attribution becomes politics. Dashboards turn into theater.
                When the reporting layer can’t be believed, the organization stops making clean decisions.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">2) THE CATEGORY TRAP</div>
              <p className="mt-4">
                Legacy industries get trapped by inherited language. One word can collapse a whole sales cycle: risk, compliance, collections, outsourcing.
                If the narrative is wrong, even excellent execution becomes invisible.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">3) THE PIVOT</div>
              <p className="mt-4">
                The pivot is to treat compliance and customer experience as <span className="text-paper font-display">product features</span>.
                You don’t “market around” risk — you operationalize the reduction of it, then make that operational truth legible to the buyer.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">4) THE ENGINE</div>
              <p className="mt-4">
                AI can scale output. Only governance can scale trust.
                Every automation needs an owner, a log, a threshold for human review, and an escalation path.
              </p>
              <div className="mt-5 rounded-2xl border border-rule bg-ink/55 p-6">
                <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">GOVERNANCE CHECKLIST</div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/45">—</span> What data does it touch? Who approved that access?</li>
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/45">—</span> Where does it write? Who owns the side-effects?</li>
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/45">—</span> What gets logged? What’s auditable?</li>
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/45">—</span> When does it stop and ask for a human?</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">5) THE OPERATING SYSTEM</div>
              <p className="mt-4">
                Instrumentation before dashboards; routing before automation; governance before scale.
                The goal is an org that ships faster over time — and forecasts with confidence.
              </p>
            </section>
          </div>

          <div className="rule mt-10" />

          <div className="mt-8 text-sm text-paper/65">
            Public-safe. In a deep dive I can share redacted artifacts and walk through the operating blueprint.
          </div>

          <div className="mt-6">
            <Link className="text-sm text-paper/75 hover:text-paper" href="/proof">
              Open the proof index →
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
