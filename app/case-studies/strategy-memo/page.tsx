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
            <div className="font-mono text-[11px] tracking-[0.32em] text-paper/65">HOW TRUST GETS BUILT</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">How I build GTM systems people can trust</h1>
            <p className="mt-4 text-lg text-paper-muted leading-relaxed max-w-2xl">
              A public version of how I think about GTM systems: clear definitions, useful instrumentation, safer automation, and language buyers can believe.
            </p>
          </div>

          <div className="rule mt-8" />

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              ["THESIS", "Trust has to show up in the work."],
              ["METHOD", "Define KPIs → build routing → add automation → add review gates."],
              ["PROMISE", "Speed the business can defend."],
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
                GTM teams often treat bad reporting as a performance problem. I treat it as a trust problem. Definitions drift. Attribution becomes politics. When the reporting layer can&apos;t be believed, leaders stop making clean decisions.
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
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">3) THE MOVE</div>
              <p className="mt-4">
                I treat compliance and customer experience as product features. First, reduce risk in the operation. Then make that operating truth legible to the buyer.
              </p>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">4) THE AI LAYER</div>
              <p className="mt-4">
                AI can scale output. Trust comes from the controls around it: an owner, a log, a threshold for human review, and an escalation path.
              </p>
              <div className="mt-5 rounded-2xl border border-rule bg-ink/55 p-6">
                <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">GOVERNANCE CHECKLIST</div>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/62">•</span> What data does it touch? Who approved that access?</li>
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/62">•</span> Where does it write? Who owns the side effects?</li>
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/62">•</span> What gets logged? What&apos;s auditable?</li>
                  <li><span className="font-mono text-[11px] tracking-[0.32em] text-paper/62">•</span> When does it stop and ask for a human?</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/60">5) THE OPERATING SYSTEM</div>
              <p className="mt-4">
                Instrumentation comes before dashboards. Routing comes before automation. Review gates come before scale. The goal is an org that ships faster over time and forecasts with more confidence.
              </p>
            </section>
          </div>

          <div className="rule mt-10" />

          <div className="mt-8 text-sm text-paper/65">
            Public version. In a deep dive I can share redacted artifacts and walk through the operating blueprint.
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
