import type { Metadata } from "next";

import { JsonLd, personSchema } from "@/components/JsonLd";
import {
  Breadcrumb,
  ChapterFootNav,
  ColophonFooter,
  Masthead,
  RulerRail,
  Sheet,
  StatTable,
  StatTableMotion,
  type StatRow,
} from "@/components/manual";
import { PrintButton } from "@/components/PrintButton";
import { cta, statsLabels } from "@/content/cover";
import {
  coverStats,
  heroProofStrip,
  proseProofClaims,
  renderableProofMetrics,
} from "@/content/proof-metrics";

/**
 * Resume (spec §3: Section 4, not appendix).
 *
 * Chrome (audit #26). The page used to drop every piece of manual furniture,
 * so the most-visited recruiter route did not read as part of the document. It
 * now carries the breadcrumb rail and the ruler, and it closes on the
 * continues band. The chrome is replicated here rather than composed from
 * `ChapterLayout`, which hardcodes its own sheet padding and wraps nothing in
 * `print:hidden`: composing it would have printed the masthead, the ruler and
 * the colophon onto a printed resume, and `ChapterLayout` is not this wave's
 * file to change. The widths below match its column so the two agree.
 *
 * No site-wide sidebar and no word-count meta: direct-link entry is the
 * primary case, so the header block stays short enough that at 1440x900 the
 * name, title, current state, contact, and lane summary all sit above the
 * fold.
 *
 * Copy is the approved deck's section 6, verbatim. Claim discipline: every
 * gated numeral resolves through `renderableProofMetrics()`; the cover's exact
 * pipeline figure does not travel here, only the softened magnitude word the
 * deck cleared for this route.
 */

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Connor J. Laughlin, VP of Marketing and GTM (acting CMO) and GTM systems engineer.",
};

const CONTACT_EMAIL = "connor.laughlin@gmail.com";

/** Deck 6, "WHAT I RUN". */
const LANES = [
  "Revenue operations and GTM systems. Funnel definitions, lifecycle stages, routing, attribution, SLA logic, and the pipeline inspection layer leaders run the business from.",
  "Marketing leadership. Positioning, demand, proof governance, org design, and the quarterly reporting a PE sponsor reads.",
  "GTM engineering. Self-taught coding, then governed AI workflows with human approval gates and audit trails.",
];

/**
 * Deck 6, "SELECTED PROOF". The final row is the `{S6}` token and resolves at
 * render, so it is not in this array.
 */
const proofRows = (
  pipelineSoftened: string,
  responseRule: string,
  kpiFramework: string,
) => [
  `Built the GTM infrastructure behind a ${pipelineSoftened}.`,
  `Designed a ${kpiFramework} funnel architecture from awareness through revenue and unit economics.`,
  `Built tiered signal-to-touch SLAs, including a ${responseRule}.`,
  "Built a multi-business-unit messaging architecture with proof governance and outcome-first positioning.",
  "Led marketing integration across multiple acquisitions, acquired brands, web properties, and Canadian regulatory jurisdictions.",
  "Material organic growth from SEO and content infrastructure.",
];

/**
 * Deck 6, "EXPERIENCE". `{S2}` in the first row resolves at render.
 *
 * `scope` is mono chrome for the rows that carry no description, so a short
 * row reads as deliberate rather than as a gap against the empty right column
 * (audit #26). Every tag is the role's own remit, restated in one or two
 * words. No tag carries a numeral, a magnitude or an outcome, so none of them
 * is a claim and none needs the gate.
 */
const EXPERIENCE: {
  period: string;
  title: string;
  detail?: string;
  scope?: string;
}[] = [
  {
    period: "Feb 2022 to present",
    title: "VP of Marketing & GTM (acting CMO)",
  },
  {
    period: "Aug 2017 to Jan 2022",
    title: "Director of Marketing",
    detail:
      "Built the first structured inbound demand program and led marketing integration for the first wave of acquisitions.",
  },
  { period: "Jun 2017 to Aug 2017", title: "Senior Marketing Manager", scope: "Marketing" },
  {
    period: "May 2015 to Jun 2017",
    title: "Digital Marketing Manager",
    detail:
      "The company's first dedicated digital marketing hire. No analytics, SEO, paid, email, or attribution existed before this.",
  },
  {
    period: "2013 to 2015",
    title: "Writer and content creator, consumer deals platform",
    scope: "Editorial",
  },
  {
    period: "2012 to 2013",
    title: "Executive search associate, retained search firm",
    scope: "Executive search",
  },
  {
    period: "2009 to 2012",
    title: "Business development and marketing intern, arts patrons nonprofit",
    scope: "Business development",
  },
];

/** Deck 6, "EDUCATION". Never write any school other than these two. */
const EDUCATION = [
  "Santa Clara University, Leavey School of Business. B.S. Finance, 2006 to 2009.",
  "Northwestern University, journalism coursework.",
];

const HEADING_CLASS =
  "font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint";

export default function ResumePage() {
  /* S1, S2 in deck order. S3 is not used on this route. */
  const [years, verticals] = renderableProofMetrics(coverStats);
  /* S6, S7, S8 in deck order; P6 + P2 appended by the phase 4 claim registration. */
  const [progression, architecture, promotions, pipelineSoftened, responseRule] =
    renderableProofMetrics(proseProofClaims);
  /* The funnel KPI framework, resolved by label rather than by position so a
     reordered registry cannot silently swap the value. */
  const [kpiFramework] = renderableProofMetrics(
    heroProofStrip.filter((metric) => metric.label === "RevOps reporting framework"),
  );
  const PROOF = proofRows(
    pipelineSoftened.value,
    responseRule.value,
    kpiFramework.value,
  );

  /* Audit #26: the resume carried no stat object at all. Same gate, same
     component, same three metrics as the cover. */
  const statRows: StatRow[] = [
    {
      label: statsLabels.years,
      value: years.value,
      srText: `${years.value}. ${years.context}.`,
    },
    {
      label: statsLabels.verticals,
      value: verticals.value,
      srText: `${verticals.value}. ${verticals.context}.`,
    },
    {
      /* The metric's own registered label, not a new one. */
      label: promotions.label,
      value: promotions.value,
      srText: `${promotions.value} ${promotions.label}. ${promotions.context}.`,
    },
  ];

  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <JsonLd data={personSchema} />

      <div className="print:hidden">
        <Masthead compact />
      </div>

      <main className="mx-auto w-full max-w-[53rem] px-0 pb-16 md:px-6 lg:px-10">
        <div className="px-4 py-3 md:px-0 md:py-4 print:hidden">
          <Breadcrumb section="Section 4" sectionHref="/#contents" chapter="Resume" />
        </div>

        <Sheet
          id="main-content"
          as="article"
          className="px-5 py-8 sm:px-10 lg:px-14 lg:py-10 print:px-0 print:py-0"
        >
          <header>
            <h1 className="font-display text-[2.25rem] leading-[1.05] text-body-ink sm:text-[2.75rem]">
              Connor J. Laughlin
            </h1>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-body-ink/75">
              VP of Marketing &amp; GTM (acting CMO). Chicago, IL.
            </p>
            <p className="mt-1.5 font-serif-body text-[0.9375rem] leading-snug text-body-ink/80">
              Marketing executive. GTM systems engineer.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-mono text-[11px] tracking-[0.12em] text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {CONTACT_EMAIL}
              </a>
              <PrintButton
                label="Print this page"
                className="border border-body-ink/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink transition-colors hover:border-blueprint hover:text-blueprint print:hidden"
              />
            </div>

            <p className="manual-body mt-6 max-w-[68ch]">
              I build the revenue systems that make GTM strategy real. First
              digital marketing hire to VP across {years.value} years and{" "}
              {promotions.value} promotions at a PE-backed enterprise, running
              marketing and GTM across {verticals.value} regulated verticals,{" "}
              {architecture.value}.
            </p>
          </header>

          <section aria-labelledby="what-i-run" className="mt-10 max-w-[68ch]">
            <h2 id="what-i-run" className={HEADING_CLASS}>
              What I run
            </h2>
            <ul className="mt-4 space-y-3">
              {LANES.map((lane) => (
                <li
                  key={lane}
                  className="border-l-2 border-grid-line pl-4 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85"
                >
                  {lane}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="site-figures" className="mt-10">
            <h2 id="site-figures" className={HEADING_CLASS}>
              By the numbers
            </h2>
            <div className="mt-4">
              <StatTableMotion>
                <StatTable rows={statRows} />
              </StatTableMotion>
            </div>
          </section>

          <section aria-labelledby="selected-proof" className="mt-10 max-w-[68ch]">
            <h2 id="selected-proof" className={HEADING_CLASS}>
              Selected proof
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PROOF.map((row) => (
                <li
                  key={row}
                  className="flex gap-3 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85"
                >
                  <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-blueprint" />
                  <span>{row}</span>
                </li>
              ))}
              <li className="flex gap-3 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
                <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-blueprint" />
                <span>
                  {progression.value} {progression.label}. {progression.context}.
                </span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="experience" className="mt-10">
            <h2 id="experience" className={HEADING_CLASS}>
              Experience
            </h2>
            <ol className="mt-4 divide-y divide-grid-line">
              {EXPERIENCE.map((role) => (
                <li
                  key={role.period}
                  className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-body-ink/60">
                    {role.period}
                  </span>
                  <div className="max-w-[68ch]">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="font-serif-body text-[0.9375rem] font-semibold leading-snug text-body-ink">
                        {role.title}
                      </p>
                      {role.scope ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-body-ink/45">
                          {role.scope}
                        </span>
                      ) : null}
                    </div>
                    {role.period === "Feb 2022 to present" ? (
                      <p className="mt-1 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
                        Full marketing and GTM ownership across {verticals.value}{" "}
                        regulated verticals at a PE-backed enterprise.
                      </p>
                    ) : null}
                    {role.detail ? (
                      <p className="mt-1 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
                        {role.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="education" className="mt-10 max-w-[68ch]">
            <h2 id="education" className={HEADING_CLASS}>
              Education
            </h2>
            <ul className="mt-4 space-y-2">
              {EDUCATION.map((row) => (
                <li
                  key={row}
                  className="font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85"
                >
                  {row}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="contact" className="mt-10">
            <h2 id="contact" className={HEADING_CLASS}>
              Contact
            </h2>
            <div className="mt-4 flex flex-col items-start gap-4">
              <a
                href={cta.href}
                className="inline-flex items-center border border-body-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-body-ink transition-colors hover:bg-body-ink hover:text-sheet print:hidden"
              >
                {cta.label}
              </a>
              <p className="max-w-[46ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/75">
                {cta.secondary}
              </p>
            </div>
          </section>

          <ChapterFootNav
            className="mt-12 print:hidden"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Contents", title: "The full table of contents", href: "/#contents" },
              { kicker: "Chapters", title: "Section 1, the revenue systems", href: "/case-studies" },
              { kicker: "Story", title: "How the work got here", href: "/story" },
            ]}
          />
        </Sheet>
      </main>

      <div className="print:hidden">
        <ColophonFooter />
        <RulerRail />
      </div>
    </div>
  );
}
