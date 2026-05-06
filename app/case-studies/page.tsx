import { Header } from "@/components/Header";
import { ProofExplorer } from "@/components/ProofExplorer";
import { caseStudies } from "@/content/case-studies";
import Link from "next/link";

export default function CaseStudiesIndex() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />
      
      <main id="main-content" className="min-h-screen pt-32 px-6">
        <div className="mx-auto max-w-6xl">
          <span className="meta-label-accent mb-6 block">
            Work proof
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-[0.9] tracking-tight mb-8">
            Case study<br />
            <span className="text-accent italic">Archive.</span>
          </h1>
          <p className="text-xl text-paper/72 max-w-2xl mb-16 leading-relaxed">
            Each case shows the mess I walked into, what I changed, and what the business could do afterward.
          </p>

          <section
            id="proof-index"
            aria-labelledby="proof-index-heading"
            className="mb-16 rounded-3xl border border-rule bg-ink/35 px-6 py-8 md:px-10 md:py-10"
          >
            <div className="mb-8 max-w-2xl">
              <span className="meta-label-accent mb-4 block">Proof index</span>
              <h2 id="proof-index-heading" className="font-display text-3xl md:text-4xl leading-tight">
                Scan the work before you open a case.
              </h2>
              <p className="mt-4 text-paper/72 leading-relaxed">
                Start here for a faster read on the work. Hover or focus a case to preview the problem, the build, and what changed before opening the full case study.
              </p>
            </div>
            <ProofExplorer items={caseStudies} />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group block p-8 border border-rule hover:border-accent transition-colors"
              >
                <span className="meta-label-accent block mb-4">
                  {study.label}
                </span>
                <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                  {study.title}
                </h2>
                <p className="text-paper/72 text-sm mb-4 leading-relaxed">
                  {study.businessProblem}
                </p>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-paper/72 text-sm leading-relaxed">
                    {study.whatChanged}
                  </span>
                  <span className="text-accent text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-rule px-6 mt-32">
        <div className="mx-auto max-w-6xl flex justify-between items-center opacity-55 meta-label-subtle">
          <span>© 2026 CJL</span>
          <span>Built by CJL</span>
        </div>
      </footer>
    </div>
  );
}