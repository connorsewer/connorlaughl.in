import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getCaseStudy } from "@/content/case-studies";
import { RedactionReveal } from "@/components/RedactionReveal";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="mx-auto max-w-4xl px-6 pt-10 md:pt-14 pb-20">
        <article className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <header className="flex items-center justify-between gap-6 flex-wrap">
            <Link 
              className="text-sm text-paper/70 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded" 
              href="/proof"
            >
              ← Back to proof
            </Link>
            <span className="font-mono text-[11px] tracking-[0.32em] text-paper/60 uppercase">
              Case Study
            </span>
          </header>

          <div className="mt-8">
            <span className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              {cs.label}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{cs.title}</h1>
            <p className="mt-4 text-lg text-paper-muted leading-relaxed">{cs.deck}</p>
          </div>

          <div className="rule mt-8" role="separator" />

          <section aria-labelledby="details-heading" className="mt-8">
            <h2 id="details-heading" className="sr-only">Project Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {([
                ["Outcome", cs.outcome],
                ["Scope", cs.scope],
                ["Stack", cs.stack],
                ["Governance", cs.governance],
              ] as const).map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-rule bg-ink/55 p-5">
                  <h3 className="font-mono text-[11px] tracking-[0.32em] text-paper/60 uppercase">
                    {k}
                  </h3>
                  <p className="mt-2 text-sm text-paper/80 leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="shipped-heading" className="mt-8">
            <h2 id="shipped-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              What I Shipped
            </h2>
            <ul className="mt-4 space-y-3 text-paper/80" role="list">
              {cs.bullets.map((b, index) => (
                <li key={index} className="leading-relaxed">
                  <span className="font-mono text-[11px] tracking-[0.32em] text-paper/45" aria-hidden="true">—</span> {b}
                </li>
              ))}
            </ul>
          </section>

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="interview-heading" className="mt-8">
            <h2 id="interview-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              Interview Line
            </h2>
            <blockquote className="mt-3 text-paper/85 leading-relaxed">
              <span aria-hidden="true">"</span>{cs.interviewLine}<span aria-hidden="true">"</span>
            </blockquote>
          </section>

          {cs.longformHref ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section aria-labelledby="longform-heading" className="mt-8">
                <h2 id="longform-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
                  Longform Draft
                </h2>
                <p className="mt-3 text-paper-muted leading-relaxed">
                  Longform draft available (markdown).
                </p>
                <div className="mt-4">
                  <Link 
                    className="text-sm text-paper/80 hover:text-paper underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded" 
                    href={cs.longformHref}
                  >
                    Open longform draft →
                  </Link>
                </div>
              </section>
            </>
          ) : null}

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="deep-dive-heading" className="mt-8">
            <h2 id="deep-dive-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              Deep Dive
            </h2>
            <p className="mt-3 text-paper-muted leading-relaxed">
              In a live walkthrough I can share redacted artifacts (process maps, KPI dictionaries, example reporting packs, and automation logs).
            </p>
            <div className="mt-5">
              <RedactionReveal>
                Example artifacts: routing decision tree; KPI dictionary excerpt; QA checklist; a "what changed?" weekly narrative page.
              </RedactionReveal>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
