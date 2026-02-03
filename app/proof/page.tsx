import { Header } from "@/components/Header";
import { ProofExplorer } from "@/components/ProofExplorer";
import { caseStudies } from "@/content/case-studies";

export default function ProofPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pt-10 md:pt-14 pb-20">
        <div className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="font-mono text-[11px] tracking-[0.32em] text-paper/70">
                QUANTIFIED PROOF
              </div>
              <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
                A proof index (built for exec review)
              </h1>
              <p className="mt-4 max-w-2xl text-paper-muted leading-relaxed">
                Hover to preview. Open to read. Public-safe by default; deeper artifacts available in a live walkthrough.
              </p>
            </div>
          </div>

          <div className="rule mt-8" />

          <div className="mt-8">
            <ProofExplorer items={caseStudies} />
          </div>
        </div>
      </main>
    </div>
  );
}
