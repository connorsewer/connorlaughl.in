import Link from "next/link";
import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  CoverTOC,
  Masthead,
  Sheet,
  StatTable,
  StatTableMotion,
  type CoverTocGroup,
  type StatRow,
  withPeriod,
} from "@/components/manual";
import { Fig001RevenueOperatingLayers } from "@/components/figures";
import { cta, statsLabels, tocSections } from "@/content/cover";
import { coverStats, renderableProofMetrics } from "@/content/proof-metrics";
import { chapterWords } from "@/lib/word-counts";

/**
 * Section 1 index (spec §3: kept as a route, rendered in manual chrome).
 *
 * Introduces no claims of its own. Entries, deks, and order come from the
 * cover contents, so the index and the cover can never disagree; word counts
 * are build-computed from the rendered public projection. Copy is the approved
 * deck's section 2, verbatim.
 */

export const metadata: Metadata = {
  title: "Revenue systems",
  description:
    "One chapter per system. Each opens on the problem and ends on what the work proves.",
};

const section1 = tocSections.find((section) => section.num === 1);

const sections: CoverTocGroup[] = section1
  ? [
      {
        num: section1.num,
        title: section1.title,
        entries: section1.entries.map((entry) => ({
          num: entry.num,
          title: entry.title,
          href: entry.href,
          dek: entry.dek,
          words: entry.countKey ? chapterWords(entry.countKey) : undefined,
        })),
      },
    ]
  : [];

/**
 * Recommended entry points (audit #21).
 *
 * Mono chrome, not a claim: the flag names a reading order, and every row's
 * words come from the contents entry it links to. Three chapters, chosen for
 * the three different things a reader might be checking — the system, the
 * governance, and the instrumentation.
 */
const START_HERE: { href: string; title: string }[] = [
  {
    href: "/case-studies/revenue-operations-signal-to-revenue",
    title: "Revenue operating system from zero",
  },
  { href: "/case-studies/ai-native-gtm", title: "Governed AI operating layer" },
  {
    href: "/case-studies/marketing-analytics-architecture",
    title: "Marketing analytics architecture",
  },
];

export default function CaseStudiesIndex() {
  /* S1, S2, S3 in deck order. Every numeral on this route resolves through the
     gate or through the build-computed contents count below it. */
  const [years, verticals, acquisitions] = renderableProofMetrics(coverStats);
  const listedChapters = section1?.entries.length ?? 0;

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
      label: statsLabels.acquisitions,
      value: acquisitions.value,
      srText: `${acquisitions.value}. ${acquisitions.context}.`,
    },
    { label: statsLabels.chapters, value: String(listedChapters) },
  ];

  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />
      <CheckerBand />

      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet
          id="main-content"
          as="section"
          className="px-5 py-10 sm:px-10 lg:px-16 lg:py-14"
        >
          <header className="max-w-[68ch]">
            <p
              aria-hidden="true"
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint"
            >
              Section 1 / Revenue systems
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
              {withPeriod("Revenue systems")}
            </h1>
            <p className="mt-5 max-w-[46ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
              One chapter per system. Each opens on the problem and ends on what
              the work proves.
            </p>
          </header>

          {/* Audit #21: the index used to be twelve undifferentiated text rows
              on the second most likely recruiter landing page, showing none of
              the manual's own differentiators. It now opens on the layer stack
              at reduced scale and the site figures, then names three entry
              points before the full contents. */}
          <div className="mt-10 max-w-[34rem]">
            <Fig001RevenueOperatingLayers />
          </div>
          <div className="mt-10">
            <StatTableMotion>
              <StatTable rows={statRows} caption="Site figures" />
            </StatTableMotion>
          </div>

          <section aria-labelledby="start-here" className="mt-12">
            <h2
              id="start-here"
              className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
            >
              Where to start
            </h2>
            <ul>
              {START_HERE.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-grid-line py-3.5 transition-colors hover:bg-blueprint/[0.04]"
                  >
                    <span className="font-serif-body text-[1.0625rem] leading-snug text-body-ink transition-colors group-hover:text-blueprint">
                      {entry.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
                      Start here
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <CoverTOC sections={sections} showSectionHeaders={false} />
          </div>

          <ChapterFootNav
            className="mt-12"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Contents", title: "The full table of contents", href: "/#contents" },
              { kicker: "Resume", title: "Connor J. Laughlin, in one page", href: "/resume" },
              {
                kicker: "Contact",
                title: "Email Connor",
                href: cta.href,
                external: true,
              },
            ]}
          />
        </Sheet>
      </main>

      <ColophonFooter />
    </div>
  );
}
