/* eslint-disable react/no-unescaped-entities */
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

  const story = [
    ["Business problem", cs.businessProblem],
    ["What I built", cs.whatIBuilt],
    ["What changed", cs.whatChanged],
    ["Why it mattered", cs.whyItMattered],
    ["What it proves", cs.whatItProves],
  ] as const;

  const details = [
    ["Scope", cs.scope],
    ["Stack", cs.stack],
    ["Governance", cs.governance],
  ] as const;

  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="mx-auto max-w-5xl px-6 pt-32 md:pt-36 pb-20">
        <article className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <header className="flex items-center justify-between gap-6 flex-wrap">
            <Link
              className="text-sm text-paper/70 hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
              href="/case-studies"
            >
              ← Back to archive
            </Link>
            <span className="meta-label-muted">
              Case study
            </span>
          </header>

          <div className="mt-8 max-w-3xl">
            <span className="meta-label-muted">
              {cs.label}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{cs.title}</h1>
            <p className="mt-4 text-lg text-paper-muted leading-relaxed">{cs.deck}</p>
          </div>

          <div className="rule mt-8" role="separator" />

          <section aria-labelledby="story-heading" className="mt-8">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-8">
              <div>
                <span className="meta-label-accent">
                  Case logic
                </span>
                <h2 id="story-heading" className="mt-3 font-display text-3xl md:text-4xl leading-tight">
                  Problem, build, change, proof.
                </h2>
                <p className="mt-4 text-paper-muted leading-relaxed">
                  Each case follows the same pattern: what was broken, what I built, what moved, why it mattered, and what the work says about how I operate.
                </p>
              </div>

              <div className="grid gap-4">
                {story.map(([label, value], index) => (
                  <section
                    key={label}
                    aria-labelledby={`story-${index}`}
                    className="rounded-2xl border border-rule bg-ink/55 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 meta-label-accent" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 id={`story-${index}`} className="meta-label-muted">
                          {label}
                        </h3>
                        <p className="mt-2 text-paper/82 leading-relaxed">{value}</p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="details-heading" className="mt-8">
            <h2 id="details-heading" className="meta-label-muted">
              System details
            </h2>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {details.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-rule bg-ink/55 p-5">
                  <h3 className="meta-label-muted">
                    {k}
                  </h3>
                  <p className="mt-2 text-sm text-paper/80 leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="build-notes-heading" className="mt-8">
            <h2 id="build-notes-heading" className="meta-label-muted">
              Build notes
            </h2>
            <ul className="mt-4 space-y-3 text-paper/80" role="list">
              {cs.bullets.map((b, index) => (
                <li key={index} className="leading-relaxed">
                  <span className="meta-label-muted" aria-hidden="true">•</span> {b}
                </li>
              ))}
            </ul>
          </section>

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="interview-heading" className="mt-8">
            <h2 id="interview-heading" className="meta-label-muted">
              Interview line
            </h2>
            <blockquote className="mt-3 text-paper/85 leading-relaxed">
              <span aria-hidden="true">"</span>{cs.interviewLine}<span aria-hidden="true">"</span>
            </blockquote>
          </section>

          {cs.longformHref ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section aria-labelledby="longform-heading" className="mt-8">
                <h2 id="longform-heading" className="meta-label-muted">
                  Longform draft
                </h2>
                <p className="mt-3 text-paper-muted leading-relaxed">
                  A longer markdown version is available for this case.
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
            <h2 id="deep-dive-heading" className="meta-label-muted">
              Live walkthrough
            </h2>
            <p className="mt-3 text-paper-muted leading-relaxed">
              In a live walkthrough I can share redacted artifacts: process maps, KPI dictionaries, reporting packs, QA checklists, and automation logs.
            </p>
            <div className="mt-5">
              <RedactionReveal>
                Example artifacts: routing decision tree; KPI dictionary excerpt; QA checklist; weekly "what changed?" narrative page.
              </RedactionReveal>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
