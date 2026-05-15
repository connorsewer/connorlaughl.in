import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { JsonLd, personSchema } from "@/components/JsonLd";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Resume | Connor J. Laughlin",
  description:
    "Resume of Connor J. Laughlin, VP of Marketing & GTM (acting CMO) and GTM Engineer.",
};

const ROLES = [
  {
    company: "TSI (PE-backed enterprise, roughly $460M)",
    title: "VP, Marketing & GTM (acting CMO)",
    period: "2024 to present",
    points: [
      "Built revenue infrastructure behind $159.4M in marketing-influenced pipeline and $52.5M net-new revenue contribution.",
      "Designed a 22-agent AI GTM operating system with governed workflows, audit logs, and approval gates.",
      "Authored the 35+ KPI revenue funnel framework, board-ready reporting cadence, and ghost-pipeline inspection.",
      "Led the marketing function from near-$0 budget and 2 offshore resources to a 4-direct-report core team and 16-person international model.",
      "Managed GTM through 7 acquisitions, 8 acquired brands, 3 web properties, 5 regulated verticals, and a Canadian business unit across 13 provincial jurisdictions.",
    ],
  },
  {
    company: "TSI",
    title: "Director of Marketing, then Senior Director",
    period: "2018 to 2024",
    points: [
      "Built signal-based BDR pod from existing resources. $2.5M+ first-90-day pipeline, 2-hour high-priority signal-to-touch SLA.",
      "Authored 774-line messaging architecture across 5 regulated business lines plus a 10,900-word master GTM brief.",
      "Rebuilt tsico.com twice for enterprise conversion. Clean B2B routing, GA4 and GTM instrumentation, +28% organic clicks.",
      "Designed the post-acquisition GTM bridge, identified $254M cross-sell whitespace from 2,676 clients, supported 73% CAC reduction and 112% NRR at the company level.",
    ],
  },
  {
    company: "TSI",
    title: "Marketing Manager, then Digital Marketing Manager",
    period: "2015 to 2018",
    points: [
      "First digital marketing hire. Built web, analytics, content, demand, attribution, CRM, and sales-enablement layers from scratch.",
      "Stood up the marketing data foundation that later carried the RevOps and AI layers.",
    ],
  },
  {
    company: "Brad's Deals",
    title: "Content Creator",
    period: "2013 to 2015",
    points: [
      "Wrote and produced content for a consumer site running 10 million monthly visitors.",
    ],
  },
  {
    company: "Reilly Partners",
    title: "Executive Search Associate",
    period: "2012 to 2014",
    points: [
      "Researched, sourced, and assessed executive candidates across enterprise software and services.",
    ],
  },
  {
    company: "Vatican Museums",
    title: "BD & Marketing",
    period: "2009 to 2012",
    points: [
      "Business development and marketing roles starting from a college internship in Rome.",
    ],
  },
];

const SKILLS = [
  {
    title: "Executive marketing leadership",
    items: [
      "Budget cases and board-ready reporting",
      "Team design and operating cadence",
      "Agency and vendor leadership",
    ],
  },
  {
    title: "Revenue operations",
    items: [
      "Lifecycle definitions and attribution",
      "Funnel KPI framework, unit economics, ghost-pipeline inspection",
      "CRM architecture and data governance",
    ],
  },
  {
    title: "AI GTM systems",
    items: [
      "Agentic workflow design, RAG, n8n, MCP-style tooling",
      "Governance: approval gates, audit logs, regression checks",
      "Python, TypeScript, prompt engineering",
    ],
  },
  {
    title: "Narrative and proof architecture",
    items: [
      "ICP, positioning, competitive intelligence",
      "Claims governance and proof libraries",
      "Sales enablement and executive POV",
    ],
  },
  {
    title: "Digital growth systems",
    items: [
      "Programmatic SEO and GEO, schema",
      "Analytics instrumentation",
      "Conversion paths and technical web governance",
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="selection:bg-accent selection:text-ink">
      <JsonLd data={personSchema} />
      <Header />

      <main
        id="main-content"
        className="min-h-screen pt-32 pb-24 px-6 print:pt-8 print:pb-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start justify-between flex-wrap gap-4 print:gap-2">
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-accent">
                Resume
              </span>
              <h1 className="font-display text-4xl md:text-5xl leading-tight mt-3 text-balance">
                Connor J. Laughlin
              </h1>
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper/70 mt-3">
                VP of Marketing & GTM (acting CMO), GTM Engineer · Chicago
              </p>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55 mt-2">
                <a
                  className="hover:text-accent transition-colors"
                  href="mailto:connor.laughlin@gmail.com"
                >
                  connor.laughlin@gmail.com
                </a>
                <span aria-hidden="true"> · </span>
                <a
                  className="hover:text-accent transition-colors"
                  href="https://linkedin.com/in/connorlaughlin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/connorlaughlin
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-2 print:hidden">
              <PrintButton />
              <Link
                href="/case-studies"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/65 hover:text-accent transition-colors text-right"
              >
                Case studies <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="rule mt-8" role="separator" />

          <section
            aria-labelledby="summary-heading"
            className="mt-8 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-8"
          >
            <h2
              id="summary-heading"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent self-start"
            >
              Summary
            </h2>
            <p className="text-paper/85 text-base leading-relaxed">
              VP of Marketing & GTM (acting CMO) and GTM Engineer. Built the
              revenue infrastructure behind $159.4M in marketing-influenced
              pipeline at a roughly $460M PE-backed enterprise. Designed a
              governed 22-agent AI GTM operating system, a 35+ KPI RevOps
              framework, and the cadence that made marketing legible to the
              board. Senior judgment plus enough technical depth to build the
              operating layer myself.
            </p>
          </section>

          <div className="rule mt-8" role="separator" />

          <section
            aria-labelledby="impact-heading"
            className="mt-8 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-8"
          >
            <h2
              id="impact-heading"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent self-start"
            >
              Headline impact
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-rule">
              {[
                { v: "$159.4M", l: "influenced pipeline" },
                { v: "$52.5M", l: "net-new revenue" },
                { v: "22-agent", l: "AI GTM OS" },
                { v: "35+", l: "RevOps KPIs" },
                { v: "7", l: "acquisitions" },
                { v: "near $0", l: "to board-backed" },
              ].map((s) => (
                <li key={s.l} className="bg-ink p-3">
                  <div className="font-display text-lg leading-tight">
                    {s.v}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-paper/55 mt-1">
                    {s.l}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="rule mt-10" role="separator" />

          <section
            aria-labelledby="experience-heading"
            className="mt-8 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-8"
          >
            <h2
              id="experience-heading"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent self-start"
            >
              Experience
            </h2>
            <div className="space-y-8">
              {ROLES.map((r) => (
                <div key={`${r.company}-${r.title}`}>
                  <div className="flex items-baseline justify-between flex-wrap gap-1">
                    <h3 className="font-display text-xl leading-snug">
                      {r.title}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55">
                      {r.period}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper/70 mt-1">
                    {r.company}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {r.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-paper/80 text-sm md:text-base leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="text-accent shrink-0 mt-1"
                        >
                          ·
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          <section
            aria-labelledby="skills-heading"
            className="mt-8 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-8"
          >
            <h2
              id="skills-heading"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent self-start"
            >
              Capabilities
            </h2>
            <ul className="grid md:grid-cols-2 gap-px bg-rule">
              {SKILLS.map((s) => (
                <li key={s.title} className="bg-ink p-5">
                  <h3 className="font-display text-base leading-snug">
                    {s.title}
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-paper/70 text-sm leading-relaxed">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="text-accent shrink-0"
                        >
                          ·
                        </span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <div className="rule mt-10" role="separator" />

          <section
            aria-labelledby="how-i-work-heading"
            className="mt-8 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-8"
          >
            <h2
              id="how-i-work-heading"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent self-start"
            >
              How I work
            </h2>
            <div className="space-y-3">
              <p className="text-paper/85 text-base leading-relaxed">
                The soft-skill edge a resume can&apos;t carry: taste applied at
                velocity, specification clarity, trust calibration, and the
                operating discipline that comes from delegating real work to
                AI agents.
              </p>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-accent">
                <Link
                  href="/edge"
                  className="link-editorial hover:text-paper transition-colors"
                >
                  Operating edge <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </section>

          <div className="rule mt-10" role="separator" />

          <section
            aria-labelledby="education-heading"
            className="mt-8 grid md:grid-cols-[10rem_1fr] gap-4 md:gap-8"
          >
            <h2
              id="education-heading"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent self-start"
            >
              Education
            </h2>
            <ul className="space-y-3">
              <li>
                <p className="font-display text-base">Santa Clara University</p>
                <p className="text-paper/70 text-sm">
                  B.S., Finance · Leavey School of Business
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/50">
                  2006 to 2009
                </p>
              </li>
              <li>
                <p className="font-display text-base">
                  Northwestern University
                </p>
                <p className="text-paper/70 text-sm">
                  Medill School of Journalism, coursework
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
