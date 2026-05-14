import { Suspense } from "react";
import { Header } from "@/components/Header";
import { CaseStudyArchive } from "@/components/CaseStudyArchive";
import { audienceTags, caseStudies } from "@/content/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies | Connor J. Laughlin",
  description:
    "Case studies in GTM systems Connor J. Laughlin built and ran: revenue infrastructure, RevOps reporting, governed AI workflows, signal-based demand, and post-acquisition GTM.",
};

export default function CaseStudiesIndex() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content" className="min-h-screen pt-32 px-6">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
            Case studies
          </span>
          <h1 className="font-display text-[clamp(2.75rem,7.5vw,4.75rem)] leading-[0.95] tracking-tight mb-8 text-balance">
            Case studies in GTM systems I built and{" "}
            <span className="text-accent italic">ran.</span>
          </h1>
          <p className="text-xl text-paper/70 max-w-3xl mb-12 leading-relaxed text-balance">
            These are not campaign recaps. Each case shows the business problem, the system I built, what changed, and what it proves about how I operate.
          </p>

          <Suspense
            fallback={
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/45">
                Loading filters…
              </p>
            }
          >
            <CaseStudyArchive studies={caseStudies} audienceTags={audienceTags} />
          </Suspense>
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
