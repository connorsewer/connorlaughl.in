import { Header } from "@/components/Header";
import { caseStudies } from "@/content/case-studies";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Connor J. Laughlin",
  description:
    "Files on GTM systems, revenue operations, and governed AI workflows. Each one shipped, ran, and was measured.",
};

export default function CaseStudiesIndex() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content" className="min-h-screen pt-32 px-6">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
            Index of work
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-[0.9] tracking-tight mb-8 text-balance">
            Files on systems I built and{" "}
            <span className="text-accent italic">ran.</span>
          </h1>
          <p className="text-xl text-paper/65 max-w-2xl mb-16 leading-relaxed text-balance">
            Each one shipped under SLA. Each one carried governance, metrics, and an audit trail. Pick a file. The shape of the work is on the page.
          </p>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {caseStudies.map((study, i) => (
              <li key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex flex-col gap-4 p-7 border border-rule hover:border-accent transition-colors h-full"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="status-pill pixel-flicker">
                      {study.label}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl group-hover:text-accent transition-colors text-balance">
                    {study.title}
                  </h2>
                  <p className="text-paper/60 text-sm line-clamp-3 leading-relaxed">
                    {study.deck}
                  </p>
                  <div className="mt-auto pt-4 border-t border-rule/60 flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-paper/45 uppercase">
                      {study.outcome}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                      Open <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>

      <footer className="py-12 border-t border-rule px-6 mt-32">
        <div className="mx-auto max-w-6xl flex justify-between items-center opacity-50 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>© 2026 Connor J. Laughlin</span>
          <span>Chicago</span>
        </div>
      </footer>
    </div>
  );
}
