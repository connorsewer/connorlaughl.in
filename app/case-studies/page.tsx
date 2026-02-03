import { Header } from "@/components/Header";
import { caseStudies } from "@/content/case-studies";
import Link from "next/link";

export default function CaseStudiesIndex() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />
      
      <main id="main-content" className="min-h-screen pt-32 px-6">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
            Operating Proof
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-[0.9] tracking-tight mb-8">
            Case Study<br />
            <span className="text-accent italic">Archive.</span>
          </h1>
          <p className="text-xl text-paper/60 max-w-2xl mb-16 leading-relaxed">
            Deep dives into GTM systems, revenue operations, and AI-native architectures. 
            Each case includes outcome metrics, system design, and governance frameworks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group block p-8 border border-rule hover:border-accent transition-colors"
              >
                <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase block mb-4">
                  {study.label}
                </span>
                <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">
                  {study.title}
                </h2>
                <p className="text-paper/60 text-sm mb-4 line-clamp-2">
                  {study.deck}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-paper/40 uppercase">
                    {study.outcome}
                  </span>
                  <span className="text-accent text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-rule px-6 mt-32">
        <div className="mx-auto max-w-6xl flex justify-between items-center opacity-30 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>© 2026 CJL</span>
          <span>Built on Trust</span>
        </div>
      </footer>
    </div>
  );
}