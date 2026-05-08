import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getCaseStudy } from "@/content/case-studies";
import { RedactionReveal } from "@/components/RedactionReveal";

type Figure = { src: string; alt: string; caption: string; ratio: string; fig: number };
type SlugFigures = { hero?: Figure; body?: Figure[] };

const FIGS: Record<string, SlugFigures> = {
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
        ratio: "3/2",
        fig: 26,
      },
      {
        src: "/case-studies/utm-spec.webp",
        alt: "UTM and hidden-field capture specification document with parameter definitions, form schematic, and CRM mappings.",
        caption: "UTM capture spec · Plate UTM-SPEC-27",
        ratio: "16/10",
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
        ratio: "3/2",
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
        ratio: "3/2",
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
        ratio: "3/2",
        fig: 38,
      },
    ],
  },
  "bdr-pod-signal-to-meeting": {
    hero: {
      src: "/case-studies/signal-routing.webp",
      alt: "Signal-to-meeting routing flowchart with website signal scoring, enrichment, tier gating, and SDR queue.",
      caption: "Signal-to-meeting routing · Fig. 14",
      ratio: "3/2",
      fig: 39,
    },
    body: [
      {
        src: "/case-studies/bdr-logbook.webp",
        alt: "BDR signal-to-touch SLA logbook tracking time received, signal type, tier, and SLA status by row.",
        caption: "Signal-to-touch SLA logbook",
        ratio: "3/2",
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
        ratio: "3/2",
        fig: 42,
      },
    ],
  },
  "marketing-org-design-governance": {
    hero: {
      src: "/case-studies/intake-board.webp",
      alt: "Brief-to-ship intake board across seven days from request through ship and archive.",
      caption: "Brief-to-ship intake board · MKT-INT-01",
      ratio: "3/2",
      fig: 43,
    },
    body: [
      {
        src: "/case-studies/content-calendar.webp",
        alt: "Content governance calendar and asset queue with content workflow lanes and library access controls.",
        caption: "Content governance calendar · CGC-24-RE",
        ratio: "3/2",
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
      ratio: "3/2",
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

function FigureBlock({ figure }: { figure: Figure }) {
  const figLabel = `Fig. ${figure.fig.toString().padStart(2, "0")}`;
  return (
    <figure className="flex flex-col gap-3">
      <div className="dither-frame w-full">
        <div
          className="frame-well relative w-full overflow-hidden bg-ink"
          style={{ aspectRatio: figure.ratio }}
        >
          <Image
            src={figure.src}
            alt={figure.alt}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>
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

  const figs = FIGS[slug];

  return (
    <div className="min-h-screen">
      <Header />
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

          {figs?.hero ? (
            <div className="mt-8">
              <FigureBlock figure={figs.hero} />
            </div>
          ) : null}

          <div className="mt-10">
            <span className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              {cs.label}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight">{cs.title}</h1>
            <p className="mt-4 text-lg text-paper-muted leading-relaxed">{cs.deck}</p>
          </div>

          <div className="rule mt-8" role="separator" />

          <section aria-labelledby="details-heading" className="mt-8">
            <h2 id="details-heading" className="sr-only">File details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {([
                ["What it produced", cs.outcome],
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
              What I built
            </h2>
            <ul className="mt-4 space-y-3 text-paper/80" role="list">
              {cs.bullets.map((b, index) => (
                <li key={index} className="leading-relaxed flex gap-3">
                  <span className="font-pixel text-[10px] tracking-[0.2em] text-accent shrink-0 mt-1.5" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {figs?.body && figs.body.length > 0 ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section aria-labelledby="artifacts-heading" className="mt-8">
                <h2 id="artifacts-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
                  Artifacts
                </h2>
                <p className="mt-3 text-paper-muted leading-relaxed text-sm">
                  Pages from the file. Redacted where it has to be.
                </p>
                <div className="mt-6 grid gap-8">
                  {figs.body.map((f) => (
                    <FigureBlock key={f.src} figure={f} />
                  ))}
                </div>
              </section>
            </>
          ) : null}

          <div className="rule mt-10" role="separator" />

          <section aria-labelledby="interview-heading" className="mt-8">
            <h2 id="interview-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              From the file
            </h2>
            <blockquote className="mt-3 text-paper/85 leading-relaxed text-lg italic">
              <span aria-hidden="true">"</span>{cs.interviewLine}<span aria-hidden="true">"</span>
            </blockquote>
          </section>

          {cs.longformHref ? (
            <>
              <div className="rule mt-10" role="separator" />
              <section aria-labelledby="longform-heading" className="mt-8">
                <h2 id="longform-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
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
            <h2 id="deep-dive-heading" className="font-mono text-[11px] tracking-[0.32em] text-paper/65 uppercase">
              In the room
            </h2>
            <p className="mt-3 text-paper-muted leading-relaxed">
              A walkthrough is the better unit. I'll show redacted artifacts: process maps, KPI dictionaries, reporting packs, automation logs.
            </p>
            <div className="mt-5">
              <RedactionReveal>
                Routing decision tree. KPI dictionary excerpt. QA checklist. The "what changed?" weekly narrative page.
              </RedactionReveal>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
