import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { renderableProofMetrics } from "@/content/proof-metrics";
import { RedactionReveal } from "@/components/RedactionReveal";
import { FigureReveal } from "@/components/FigureReveal";
import { ReadingPathJump } from "@/components/ReadingPathJump";
import { CaseStudyTOC } from "@/components/CaseStudyTOC";
import {
  JsonLd,
  breadcrumbSchema,
  caseStudyArticleSchema,
} from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) {
    return {
      title: "Case study not found | Connor J. Laughlin",
    };
  }
  return {
    title: `${cs.title} | Connor J. Laughlin`,
    description: cs.hook,
  };
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

type Figure = { src: string; alt: string; caption: string; ratio?: string; fig: number };
type SlugFigures = { hero?: Figure; body?: Figure[] };

// Actual webp pixel dimensions per source. Frames size to match exactly.
const DIMS: Record<string, [number, number]> = {
  "/case-studies/tracking-pixel.webp": [1600, 901],
  "/case-studies/tracking-pixel-alt.webp": [1600, 901],
  "/case-studies/ga4-taxonomy.webp": [1600, 901],
  "/case-studies/utm-spec.webp": [1600, 930],
  "/case-studies/messaging-pillars.webp": [1600, 901],
  "/case-studies/claims-register.webp": [1600, 901],
  "/case-studies/kpi-dictionary.webp": [1600, 901],
  "/case-studies/crm-lifecycle.webp": [1600, 901],
  "/case-studies/reverse-funnel.webp": [1600, 901],
  "/case-studies/org-chart.webp": [1600, 901],
  "/case-studies/cadence-wall.webp": [1600, 901],
  "/case-studies/mainframe.webp": [1600, 901],
  "/case-studies/rag-index.webp": [1600, 901],
  "/case-studies/ai-audit-log.webp": [1600, 878],
  "/case-studies/rfp-gate.webp": [1600, 878],
  "/case-studies/signal-routing.webp": [1600, 901],
  "/case-studies/bdr-logbook.webp": [1600, 901],
  "/case-studies/outcome-first.webp": [1600, 901],
  "/case-studies/intake-board.webp": [1600, 901],
  "/case-studies/content-calendar.webp": [1600, 961],
  "/case-studies/recovery-ledger.webp": [1600, 928],
  "/case-studies/ia-map.webp": [1600, 961],
  "/case-studies/cross-sell-matrix.webp": [1600, 901],
  "/case-studies/ghost-pipeline.svg": [1600, 900],
};

const FIGS: Record<string, SlugFigures> = {
  "revenue-operations-pipeline-truth": {
    hero: {
      src: "/case-studies/ghost-pipeline.svg",
      alt: "Ghost pipeline detection plate, MOV-12-2026. Stages bar across discovery to closed-won, close-date movement rows showing on-track deals, pushed deals, ghost deals stalled past 30 days, pulled-forward deals, and a split opportunity. Stage aging whisker chart showing 8 to 41 days median per stage. Weekly operating cadence ribbon for Mon, Tue, Thu, and Fri.",
      caption: "Ghost pipeline detection · MOV-12-2026",
      ratio: "16/9",
      fig: 50,
    },
    body: [
      {
        src: "/case-studies/kpi-dictionary.webp",
        alt: "Revenue funnel KPI dictionary used for the ghost-pipeline inspection package.",
        caption: "Revenue funnel KPI dictionary · REV-KPI-17",
        ratio: "16/9",
        fig: 51,
      },
      {
        src: "/case-studies/crm-lifecycle.webp",
        alt: "CRM lead lifecycle map used to track stage aging and movement across the funnel.",
        caption: "CRM lifecycle · LC-13-DFN",
        ratio: "16/9",
        fig: 52,
      },
    ],
  },
  "marketing-analytics-architecture": {
    hero: {
      src: "/case-studies/tracking-pixel.webp",
      alt: "Exploded view of a tracking pixel showing layered grid components, dimension callouts, and a QR plate.",
      caption: "Tracking pixel · Plate 07 · TKPX-01",
      ratio: "16/9",
      fig: 25,
    },
    body: [
      {
        src: "/case-studies/ga4-taxonomy.webp",
        alt: "GA4 event taxonomy worksheet with event names, triggers, parameters, and CRM mappings.",
        caption: "GA4 event taxonomy · Plate GA-EV-TAX-01",
        ratio: "16/9",
        fig: 26,
      },
      {
        src: "/case-studies/utm-spec.webp",
        alt: "UTM and hidden-field capture specification document with parameter definitions, form schematic, and CRM mappings.",
        caption: "UTM capture spec · Plate UTM-SPEC-27",
        ratio: "16/9",
        fig: 27,
      },
    ],
  },
  "gtm-strategy-positioning": {
    hero: {
      src: "/case-studies/messaging-pillars.webp",
      alt: "Messaging pillar architecture map with five vertical lanes covering strategy, systems, demand, data, and enablement.",
      caption: "Messaging pillar architecture · MSG-ARCH-01",
      ratio: "16/9",
      fig: 28,
    },
    body: [
      {
        src: "/case-studies/claims-register.webp",
        alt: "A redacted claims register tracking marketing claim status, evidence, and approvals.",
        caption: "Claims register · Plate MK-CR-18",
        ratio: "16/9",
        fig: 29,
      },
    ],
  },
  "revenue-operations-signal-to-revenue": {
    hero: {
      src: "/case-studies/kpi-dictionary.webp",
      alt: "Revenue funnel KPI dictionary with four stages: awareness, qualification, pipeline, revenue.",
      caption: "Revenue funnel KPI dictionary · REV-KPI-17",
      ratio: "16/9",
      fig: 30,
    },
    body: [
      {
        src: "/case-studies/crm-lifecycle.webp",
        alt: "CRM lead lifecycle definitions map from visitor through closed-won, with stage owners and required fields.",
        caption: "CRM lead lifecycle · LC-13-DFN",
        ratio: "16/9",
        fig: 31,
      },
      {
        src: "/case-studies/reverse-funnel.webp",
        alt: "Reverse funnel capacity planner with quota, conversion-rate inputs, and required volumes back-calculated.",
        caption: "Reverse funnel capacity planner · Fig. 16",
        ratio: "16/9",
        fig: 32,
      },
    ],
  },
  "leadership-team-development": {
    hero: {
      src: "/case-studies/org-chart.webp",
      alt: "Architectural blueprint of an organizational chart with hierarchy, dimension marks, and a symbol legend.",
      caption: "Org chart blueprint · Plate 06",
      ratio: "16/9",
      fig: 33,
    },
    body: [
      {
        src: "/case-studies/cadence-wall.webp",
        alt: "Two-lane marketing operating cadence wall showing weekly demand-gen and sales-enablement rhythm.",
        caption: "Two-lane cadence wall · Fig. 25",
        ratio: "16/9",
        fig: 34,
      },
    ],
  },
  "ai-native-gtm": {
    hero: {
      src: "/case-studies/mainframe.webp",
      alt: "1970s mainframe terminal with code on the CRT and a continuous-form printer extruding a log.",
      caption: "AI operating system · Terminal under load",
      ratio: "16/9",
      fig: 35,
    },
    body: [
      {
        src: "/case-studies/rag-index.webp",
        alt: "Library card catalog as a RAG knowledge base index with retrieval paths and a vintage retrieval console.",
        caption: "RAG knowledge base index · KB-INDEX",
        ratio: "16/9",
        fig: 36,
      },
      {
        src: "/case-studies/ai-audit-log.webp",
        alt: "AI workflow audit log tracking run IDs, prompt versions, exceptions, and model drift.",
        caption: "AI workflow audit log · Fig. 22",
        ratio: "16/9",
        fig: 37,
      },
      {
        src: "/case-studies/rfp-gate.webp",
        alt: "Governed RFP approval gate checklist with audit trail and approval-required stamp.",
        caption: "RFP approval gate · Fig. 20",
        ratio: "16/9",
        fig: 38,
      },
    ],
  },
  "bdr-pod-signal-to-meeting": {
    hero: {
      src: "/case-studies/signal-routing.webp",
      alt: "Signal-to-meeting routing flowchart with website signal scoring, enrichment, tier gating, and SDR queue.",
      caption: "Signal-to-meeting routing · Fig. 14",
      ratio: "16/9",
      fig: 39,
    },
    body: [
      {
        src: "/case-studies/bdr-logbook.webp",
        alt: "BDR signal-to-touch SLA logbook tracking time received, signal type, tier, and SLA status by row.",
        caption: "Signal-to-touch SLA logbook",
        ratio: "16/9",
        fig: 40,
      },
    ],
  },
  "outcome-first-repositioning": {
    hero: {
      src: "/case-studies/outcome-first.webp",
      alt: "Before-and-after typographic spread reading OUTCOMES OVER OUTPUT on the right and dense small type on the left.",
      caption: "Outcome-first repositioning · Fig. 05",
      ratio: "16/9",
      fig: 41,
    },
    body: [
      {
        src: "/case-studies/claims-register.webp",
        alt: "Claims register with redacted rows showing claim category, evidence sources, and approval status.",
        caption: "Claims register · Plate MK-CR-18",
        ratio: "16/9",
        fig: 42,
      },
    ],
  },
  "marketing-org-design-governance": {
    hero: {
      src: "/case-studies/intake-board.webp",
      alt: "Brief-to-ship intake board across seven days from request through ship and archive.",
      caption: "Brief-to-ship intake board · MKT-INT-01",
      ratio: "16/9",
      fig: 43,
    },
    body: [
      {
        src: "/case-studies/content-calendar.webp",
        alt: "Content governance calendar and asset queue with content workflow lanes and library access controls.",
        caption: "Content governance calendar · CGC-24-RE",
        ratio: "16/9",
        fig: 44,
      },
      {
        src: "/case-studies/cadence-wall.webp",
        alt: "Two-lane marketing operating cadence wall with weekly rhythm and SLA windows.",
        caption: "Operating cadence wall · Fig. 25",
        ratio: "16/9",
        fig: 45,
      },
    ],
  },
  "debtnext-integration": {
    hero: {
      src: "/case-studies/recovery-ledger.webp",
      alt: "Recovery performance ledger field-mapping sheet across API input, SQL normalization, CRM ledger, and BI output.",
      caption: "Recovery performance ledger · RPL-FLD-MAP-01",
      ratio: "16/9",
      fig: 46,
    },
    body: [
      {
        src: "/case-studies/crm-lifecycle.webp",
        alt: "CRM lead lifecycle map showing stage gates and required fields for the recovery operations cycle.",
        caption: "Lifecycle definitions · LC-13-DFN",
        ratio: "16/9",
        fig: 47,
      },
    ],
  },
  "enterprise-site-overhaul": {
    hero: {
      src: "/case-studies/ia-map.webp",
      alt: "Enterprise website conversion information-architecture map with global elements, solutions, and conversion routes.",
      caption: "Website conversion IA · IA-MAP-26",
      ratio: "16/9",
      fig: 48,
    },
    body: [
      {
        src: "/case-studies/cross-sell-matrix.webp",
        alt: "SaaS-services cross-sell trigger matrix with service offerings against revenue ops, AI ops, and training lanes.",
        caption: "Cross-sell trigger matrix · GTM-XM-28",
        ratio: "16/9",
        fig: 49,
      },
    ],
  },
};

function FigureBlock({ figure, priority = false }: { figure: Figure; priority?: boolean }) {
  const figLabel = `Fig. ${figure.fig.toString().padStart(2, "0")}`;
  const [w, h] = DIMS[figure.src] ?? [1600, 900];
  return (
    <figure className="flex flex-col gap-3">
      <FigureReveal>
        <div className="dither-frame w-full">
          <div className="frame-well relative w-full">
            <Image
              src={figure.src}
              alt={figure.alt}
              width={w}
              height={h}
              sizes="(min-width: 1024px) 56rem, 100vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className="block w-full h-auto"
            />
          </div>
        </div>
      </FigureReveal>
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55">
        <span className="fig-num">{figLabel}</span>
        <span aria-hidden="true">·</span>
        <span className="normal-case tracking-wide text-paper/65">{figure.caption}</span>
      </figcaption>
    </figure>
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
  const proofMetrics = renderableProofMetrics(cs.proofMetrics);

  const figs = FIGS[slug];

  return (
    <div className="min-h-screen">
      <JsonLd data={caseStudyArticleSchema({ title: cs.title, hook: cs.hook, slug: cs.slug })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Case studies", href: "/case-studies" },
          { name: cs.title, href: `/case-studies/${cs.slug}` },
        ])}
      />
      <Header />
      <CaseStudyTOC />
      <main id="main-content" className="mx-auto max-w-4xl px-6 pt-10 md:pt-14 pb-20">
        <article className="rounded-3xl border border-rule bg-ink/35 px-6 md:px-10 py-10 md:py-12">
          <header className="flex items-center justify-between gap-6 flex-wrap">
            <Link
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/60 hover:text-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
              href="/case-studies"
            >
              <span aria-hidden="true">←</span> Index
            </Link>
            <span className="status-pill pixel-flicker">File</span>
          </header>

          <div className="mt-8">
            <span className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              {cs.label}
            </span>
            <h1
              className="mt-4 font-display text-4xl md:text-5xl leading-tight text-balance"
              style={{ viewTransitionName: `case-title-${slug}` }}
            >
              {cs.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-paper/80 leading-relaxed italic">
              {cs.hook}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {cs.audienceFit.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-paper/65 border border-rule px-2.5 py-1 rounded-full"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {figs?.hero ? (
            <div className="mt-10">
              <FigureBlock figure={figs.hero} priority />
            </div>
          ) : null}

          <div className="rule mt-10" role="separator" />

          {/* TLDR + READING PATH JUMP ======================== */}
          <ReadingPathJump
            tldrId="reading-tldr-summary"
            fivePartId="case-logic-heading"
            longformHref={cs.longformHref}
          />

          <section
            id="reading-tldr-summary"
            aria-labelledby="tldr-heading"
            className="mt-8"
          >
            <h2
              id="tldr-heading"
              className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase"
            >
              TLDR · 90 seconds
            </h2>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {proofMetrics.slice(0, 3).map((m) => (
                <div
                  key={`tldr-${cs.slug}-${m.label}`}
                  className="rounded-2xl border border-rule bg-ink/55 p-4"
                >
                  <div className="font-display text-2xl leading-tight">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/65 mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-rule bg-ink/45 p-5">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-accent">
                What it proves
              </div>
              <p className="text-paper/85 text-base md:text-lg leading-relaxed mt-2">
                {cs.whatItProves}
              </p>
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          {/* 5-PART CASE LOGIC ============================== */}
          <section aria-labelledby="case-logic-heading" className="mt-8">
            <h2 id="case-logic-heading" className="sr-only">
              The case
            </h2>
            <ol className="space-y-6">
              {(
                [
                  ["01", "The problem", cs.businessProblem],
                  ["02", "What I built", cs.whatIBuilt],
                  ["03", "What changed", cs.whatChanged],
                  ["04", "Why it mattered", cs.whyItMattered],
                  ["05", "What it proves", cs.whatItProves],
                ] as const
              ).map(([num, label, body]) => (
                <li key={num} className="grid md:grid-cols-[6rem_1fr] gap-3 md:gap-6">
                  <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-2">
                    <span className="font-pixel text-[11px] tracking-[0.2em] text-accent">
                      {num}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/55 md:text-paper/70">
                      {label}
                    </span>
                  </div>
                  <p className="text-paper/85 text-base md:text-lg leading-relaxed">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <div className="rule mt-10" role="separator" />

          {/* PROOF METRICS ================================== */}
          <section aria-labelledby="proof-heading" className="mt-8">
            <h2
              id="proof-heading"
              className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
            >
              Proof
            </h2>
            <ul className="mt-5 grid sm:grid-cols-2 gap-3">
              {proofMetrics.map((m) => (
                <li
                  key={`${cs.slug}-proof-${m.label}`}
                  className="rounded-2xl border border-rule bg-ink/55 p-5 flex flex-col gap-2"
                >
                  <span className="font-display text-2xl leading-tight">
                    {m.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/65 leading-snug">
                    {m.label}
                  </span>
                  <span className="text-paper/55 text-xs leading-relaxed">
                    {m.context}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="rule mt-10" role="separator" />

          {/* SYSTEMS BUILT ================================== */}
          <section aria-labelledby="systems-heading" className="mt-8">
            <h2
              id="systems-heading"
              className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
            >
              Systems built
            </h2>
            <ul className="mt-4 space-y-3 text-paper/85" role="list">
              {cs.systemsBuilt.map((item, index) => (
                <li key={index} className="leading-relaxed flex gap-3">
                  <span
                    className="font-pixel text-[10px] tracking-[0.2em] text-accent shrink-0 mt-1.5"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="rule mt-10" role="separator" />

          {/* QUICK META ================================== */}
          <section aria-labelledby="meta-heading" className="mt-8">
            <h2 id="meta-heading" className="sr-only">
              Quick details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {(
                [
                  ["Scope", cs.scope],
                  ["Stack", cs.stack],
                  ["Governance", cs.governance],
                ] as const
              ).map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl border border-rule bg-ink/55 p-5"
                >
                  <h3 className="font-mono text-[11px] tracking-[0.32em] text-paper/60 uppercase">
                    {k}
                  </h3>
                  <p className="mt-2 text-sm text-paper/80 leading-relaxed">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {figs?.body && figs.body.length > 0 ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section aria-labelledby="artifacts-heading" className="mt-8">
                <h2
                  id="artifacts-heading"
                  className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
                >
                  Artifacts
                </h2>
                <p className="mt-3 text-paper-muted leading-relaxed text-sm">
                  Pages from the work. Redacted where it has to be.
                </p>
                <div className="mt-6 grid gap-8">
                  {figs.body.map((f) => (
                    <FigureBlock key={f.src} figure={f} />
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {cs.governanceNotes.length > 0 ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section
                aria-labelledby="governance-heading"
                className="mt-8"
              >
                <h2
                  id="governance-heading"
                  className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
                >
                  Governance notes
                </h2>
                <ul className="mt-4 space-y-2 text-paper/70 text-sm leading-relaxed">
                  {cs.governanceNotes.map((note, index) => (
                    <li key={index} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent shrink-0">
                        ·
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : null}

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="interview-heading" className="mt-8">
            <h2
              id="interview-heading"
              className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
            >
              In the interview
            </h2>
            <blockquote className="mt-3 text-paper/85 leading-relaxed text-lg italic">
              <span aria-hidden="true">&ldquo;</span>
              {cs.interviewLine}
              <span aria-hidden="true">&rdquo;</span>
            </blockquote>
          </section>

          {cs.longformHref ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section
                aria-labelledby="longform-heading"
                className="mt-8"
              >
                <h2
                  id="longform-heading"
                  className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
                >
                  Long form
                </h2>
                <p className="mt-3 text-paper-muted leading-relaxed">
                  A written walk-through of this one, in full.
                </p>
                <div className="mt-4">
                  <Link
                    className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/80 hover:text-accent underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
                    href={cs.longformHref}
                  >
                    Read it <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>
            </>
          ) : null}

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="deep-dive-heading" className="mt-8">
            <h2
              id="deep-dive-heading"
              className="font-mono text-[11px] tracking-[0.32em] text-paper/70 uppercase"
            >
              In a working session
            </h2>
            <p className="mt-3 text-paper-muted leading-relaxed">
              A walk-through is the better unit. I will show redacted artifacts: process maps, KPI dictionaries, reporting packs, automation logs.
            </p>
            <div className="mt-5">
              <RedactionReveal>
                Routing decision tree. KPI dictionary excerpt. QA checklist. The weekly executive narrative page.
              </RedactionReveal>
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          <section className="mt-8 flex flex-col md:flex-row gap-4">
            <Link
              href="#contact"
              className="cta-scan font-mono text-[11px] tracking-[0.2em] uppercase bg-accent text-ink px-7 py-3.5 rounded-full hover:bg-paper transition-colors text-center"
            >
              Talk about a role
            </Link>
            <Link
              href="/case-studies"
              className="font-mono text-[11px] tracking-[0.2em] uppercase border border-paper/30 px-7 py-3.5 rounded-full hover:border-accent hover:text-accent transition-colors text-center text-paper/85"
            >
              Back to case studies
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}
