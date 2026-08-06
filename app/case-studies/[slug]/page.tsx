import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ChapterHeader,
  ChapterLayout,
  StatTable,
  type StatRow,
  type TocSection,
} from "@/components/manual";
import {
  JsonLd,
  breadcrumbSchema,
  caseStudyArticleSchema,
} from "@/components/JsonLd";
import {
  Fig008RevenueOperatingLayers,
  Fig009ApprovalGatePath,
  Fig010PipelineDecaySignals,
  Fig011SignalToTouch,
  Fig012PillarToProof,
  Fig013IntegrationSequence,
  Fig014PerformanceLedgerJoin,
  Fig015OperatingCadence,
  Fig016ClaimToApproval,
  Fig017TwoFunctionModel,
  Fig018SchemaToPage,
} from "@/components/figures";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { cta } from "@/content/cover";
import { tocSections } from "@/content/cover";
import {
  proseClaimTokens,
  renderableProofMetric,
  renderableProofMetrics,
  type RenderableProofMetric,
} from "@/content/proof-metrics";
import { caseStudyWords } from "@/lib/word-counts";

/**
 * Case-study chapter (spec §3, manual chapter anatomy).
 *
 * Frame comes from `<ChapterLayout>`: compact masthead, Section 1 sidebar,
 * breadcrumb with prev/next, white sheet, ruler rail, colophon. Copy is the
 * approved deck's, verbatim, carried on `content/case-studies.ts`.
 *
 * Claim discipline: every gated numeral resolves through
 * `renderableProofMetrics()`. The `{S6}` token in a chapter intro resolves the
 * same way; nothing on this page is typed as a literal claim.
 */

/**
 * Chapter plates. Keyed by the `figureSlug` on the case study, so the content
 * module names a figure without importing a component. A chapter with no entry
 * here renders text-only, which spec §5 allows where no honest figure exists.
 */
const chapterFigures: Record<string, React.ComponentType> = {
  "fig-008": Fig008RevenueOperatingLayers,
  "fig-009": Fig009ApprovalGatePath,
  "fig-010": Fig010PipelineDecaySignals,
  "fig-011": Fig011SignalToTouch,
  "fig-012": Fig012PillarToProof,
  "fig-013": Fig013IntegrationSequence,
  "fig-014": Fig014PerformanceLedgerJoin,
  "fig-015": Fig015OperatingCadence,
  "fig-016": Fig016ClaimToApproval,
  "fig-017": Fig017TwoFunctionModel,
  "fig-018": Fig018SchemaToPage,
};

/**
 * Prose claim tokens.
 *
 * Copy in `content/case-studies.ts` never types a magnitude. It writes a token
 * and the route resolves it through the claim gate, so a claim that loses its
 * approval disappears from the page instead of going stale in a string. Each
 * entry says how that claim reads in a sentence.
 */
const TOKEN_TEXT: Record<string, (metric: RenderableProofMetric) => string> = {
  S6: (m) => `${m.value} ${m.label}. ${m.context}.`,
  V5: (m) => `${m.value} ${m.label}`,
  P6: (m) => m.value,
  P2: (m) => m.value,
};

const TOKEN_PATTERN = /\{([A-Z][0-9]+)\}/g;

/**
 * Resolves claim tokens in a copy string. A sentence carrying a token that no
 * longer resolves is dropped whole, because a half-sentence is worse than a
 * missing one.
 */
function resolveClaims(text: string): string {
  return text
    .split(/(?<=\.)\s+/)
    .map((sentence) => {
      let dropped = false;
      const resolved = sentence.replace(TOKEN_PATTERN, (_match, token: string) => {
        const metric = proseClaimTokens[token];
        const renderable = metric ? renderableProofMetric(metric) : null;
        const render = TOKEN_TEXT[token];
        if (!renderable || !render) {
          dropped = true;
          return "";
        }
        return render(renderable);
      });
      return dropped ? "" : resolved;
    })
    .filter(Boolean)
    .join(" ")
    .trim();
}

const SECTION_TITLE = "Revenue systems";
const STRATEGY_MEMO = {
  title: "Strategy memo: how I think before I build",
  href: "/case-studies/strategy-memo",
};

/** Chapter order, straight from `content/case-studies.ts`, memo last. */
const chapterOrder: { title: string; href: string }[] = [
  ...caseStudies.map((cs) => ({ title: cs.title, href: `/case-studies/${cs.slug}` })),
  STRATEGY_MEMO,
];

function chapterNeighbours(href: string) {
  const index = chapterOrder.findIndex((entry) => entry.href === href);
  return {
    prev: index > 0 ? chapterOrder[index - 1] : undefined,
    next: index >= 0 && index < chapterOrder.length - 1 ? chapterOrder[index + 1] : undefined,
  };
}

/** Section 1 only. The sidebar carries the chapter's own section, not the manual. */
const manualSections: TocSection[] = tocSections.map((section) => ({
  num: section.num,
  title: section.title,
  entries: section.entries.map((entry) => ({
    num: entry.num,
    title: entry.title,
    href: entry.href,
    dek: entry.dek,
  })),
}));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) {
    return { title: "Chapter not in this manual | Connor J. Laughlin" };
  }
  return {
    title: `${cs.title} | Connor J. Laughlin`,
    description: cs.hook,
  };
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
      {children}
    </h2>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return notFound();

  const href = `/case-studies/${slug}`;
  const { prev, next } = chapterNeighbours(href);
  const proofMetrics = renderableProofMetrics(cs.proofMetrics);

  const statRows: StatRow[] = proofMetrics.map((metric) => ({
    label: metric.label,
    value: metric.value,
    srText: `${metric.value}. ${metric.label}. ${metric.context}.`,
  }));

  /* Drop the eyebrow when it only repeats the chapter title. */
  const eyebrow =
    cs.label.trim().toLowerCase() === cs.title.trim().toLowerCase() ? undefined : cs.label;

  const ChapterFigure = cs.figureSlug ? chapterFigures[cs.figureSlug] : undefined;

  const caseLogic = [
    ["01", "The problem", resolveClaims(cs.businessProblem)],
    ["02", "What I built", resolveClaims(cs.whatIBuilt)],
    ["03", "What changed", resolveClaims(cs.whatChanged)],
    ["04", "Why it mattered", resolveClaims(cs.whyItMattered)],
    ["05", "What it proves", resolveClaims(cs.whatItProves)],
  ] as const;

  return (
    <>
      <JsonLd data={caseStudyArticleSchema({ title: cs.title, hook: cs.hook, slug: cs.slug })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Case studies", href: "/case-studies" },
          { name: cs.title, href },
        ])}
      />

      <ChapterLayout
        section={SECTION_TITLE}
        sectionHref="/case-studies"
        chapter={cs.title}
        prev={prev}
        next={next}
        words={caseStudyWords(slug)}
        sections={manualSections}
        activeHref={href}
      >
        <ChapterHeader
          eyebrow={eyebrow}
          title={cs.title}
          dek={cs.hook}
          titleStyle={{ viewTransitionName: `case-title-${slug}` }}
        />

        {/* The chapter plate runs ahead of the body, as on the reference
            chapter: the reader sees the system before the prose about it. */}
        {ChapterFigure ? (
          <div className="mt-10">
            <ChapterFigure />
          </div>
        ) : null}

        <section aria-label="Opening" className="mt-10 max-w-[68ch]">
          {cs.chapterIntro.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0 ? "manual-body manual-dropcap" : "manual-body mt-5"
              }
            >
              {resolveClaims(paragraph)}
            </p>
          ))}
        </section>

        {resolveClaims(cs.outcome) ? (
          <section
            aria-label="Outcome"
            className="mt-10 max-w-[68ch] border-l-2 border-blueprint pl-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
              Outcome
            </p>
            <p className="mt-2 font-serif-body text-[1.0625rem] leading-relaxed text-body-ink">
              {resolveClaims(cs.outcome)}
            </p>
          </section>
        ) : null}

        <hr className="mt-12 border-grid-line" />

        <section aria-labelledby="case-logic-heading" className="mt-10">
          <h2 id="case-logic-heading" className="sr-only">
            The case
          </h2>
          <ol className="space-y-8">
            {caseLogic.map(([num, label, body]) => (
              <li key={num} className="grid gap-2 md:grid-cols-[7rem_1fr] md:gap-6">
                <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-blueprint">
                    {num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/60">
                    {label}
                  </span>
                </div>
                <p className="manual-body max-w-[68ch]">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {statRows.length > 0 ? (
          <>
            <hr className="mt-12 border-grid-line" />
            <section aria-labelledby="proof-heading" className="mt-10">
              <h2
                id="proof-heading"
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
              >
                Proof
              </h2>
              <div className="mt-6">
                <StatTable rows={statRows} caption="Chapter figures" />
              </div>
            </section>
          </>
        ) : null}

        <hr className="mt-12 border-grid-line" />

        <section aria-labelledby="systems-heading" className="mt-10">
          <SectionLabel>
            <span id="systems-heading">Systems built</span>
          </SectionLabel>
          <ol className="mt-5 space-y-3">
            {cs.systemsBuilt.map((item, index) => (
              <li key={index} className="flex gap-4">
                <span
                  className="mt-1 shrink-0 font-mono text-[10px] tracking-[0.2em] text-blueprint"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="manual-body max-w-[64ch]">{resolveClaims(item)}</span>
              </li>
            ))}
          </ol>
        </section>

        <hr className="mt-12 border-grid-line" />

        <section aria-labelledby="meta-heading" className="mt-10">
          <h2 id="meta-heading" className="sr-only">
            Chapter details
          </h2>
          <dl className="grid gap-px border border-grid-line bg-grid-line sm:grid-cols-3">
            {(
              [
                ["Scope", cs.scope],
                ["Stack", cs.stack],
                ["Governance", cs.governance],
              ] as const
            ).map(([term, value]) => (
              <div key={term} className="bg-sheet p-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-body-ink/55">
                  {term}
                </dt>
                <dd className="mt-2 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {cs.governanceNotes.length > 0 ? (
          <>
            <hr className="mt-12 border-grid-line" />
            <section aria-labelledby="governance-heading" className="mt-10">
              <SectionLabel>
                <span id="governance-heading">Governance notes</span>
              </SectionLabel>
              <ul className="mt-5 space-y-3">
                {cs.governanceNotes.map((note, index) => (
                  <li key={index} className="flex gap-4">
                    <span aria-hidden="true" className="mt-1 shrink-0 text-blueprint">
                      ·
                    </span>
                    <span className="font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/75">
                      {note}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        <hr className="mt-12 border-grid-line" />

        <section aria-labelledby="interview-heading" className="mt-10">
          <SectionLabel>
            <span id="interview-heading">In the interview</span>
          </SectionLabel>
          <blockquote className="mt-4 max-w-[62ch] border-l-2 border-blueprint pl-5 font-serif-body text-[1.0625rem] italic leading-relaxed text-body-ink/85">
            {cs.interviewLine}
          </blockquote>
        </section>

        {cs.longformHref ? (
          <>
            <hr className="mt-12 border-grid-line" />
            <section aria-labelledby="longform-heading" className="mt-10">
              <SectionLabel>
                <span id="longform-heading">Long form</span>
              </SectionLabel>
              <p className="mt-4 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/75">
                A written walk-through of this one, in full.
              </p>
              <Link
                href={cs.longformHref}
                className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Read it <span aria-hidden="true">→</span>
              </Link>
            </section>
          </>
        ) : null}

        <hr className="mt-12 border-grid-line" />

        <section aria-label="Contact" className="mt-10 flex flex-col items-start gap-5">
          <a
            href={cta.href}
            className="inline-flex items-center border border-body-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-body-ink transition-colors hover:bg-body-ink hover:text-sheet"
          >
            {cta.label}
          </a>
          <p className="max-w-[62ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/75">
            {cta.secondary}
          </p>
          <Link
            href="/case-studies"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Back to Section 1
          </Link>
        </section>
      </ChapterLayout>
    </>
  );
}
