import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd, personSchema } from "@/components/JsonLd";
import {
  CheckerBand,
  ColophonFooter,
  CoverTOC,
  Masthead,
  Sheet,
  StatTable,
  TerminalFAQ,
  type CoverTocGroup,
  type StatRow,
} from "@/components/manual";
import {
  Fig001RevenueOperatingLayers,
  Fig002SignalToTouch,
  Fig003LifecycleStages,
  Fig004AttributionJoin,
  Fig005ApprovalGatePath,
  Fig006ClaimToPublish,
  Fig007ThisSite,
} from "@/components/figures";
import {
  coverMeta,
  cta,
  faqEntries,
  introChronology,
  introInherited,
  introLede,
  masthead,
  statsCaption,
  statsLabels,
  statsPreamble,
  tocSections,
} from "@/content/cover";
import {
  coverProofLede,
  coverStats,
  proseProofClaims,
  renderableProofMetrics,
} from "@/content/proof-metrics";
import { chaptersPublished, chapterWords, siteWordsPublished } from "@/lib/word-counts";

/**
 * Cover (spec §3 cover anatomy).
 *
 * Order, top to bottom: masthead, dither band, proof-first intro with the
 * page's single drop cap, cover figures, contents, stats, questions, contact,
 * colophon. Copy is the approved deck's, verbatim; see `content/cover.ts`.
 *
 * Claim discipline: every gated numeral on this page resolves through
 * `renderableProofMetrics()`, and the two counts resolve from the rendered
 * public projection via `lib/word-counts.ts`. Nothing is typed as a literal.
 */

export const metadata: Metadata = {
  title: coverMeta.title,
  description: coverMeta.description,
};

export const revalidate = 60;

export default function Cover() {
  /* P5. Cover route only: this value travels to no other page or image. */
  const [pipeline] = renderableProofMetrics(coverProofLede);
  /* S1, S2, S3, in deck order. */
  const [years, verticals, acquisitions] = renderableProofMetrics(coverStats);
  /* S6. Rendered as its whole progression sentence pair, never split. */
  const [progression] = renderableProofMetrics(proseProofClaims);

  /* The stats row has to survive a reader counting the contents by hand, so
     it reports the chapters the contents actually lists (sections 1 and 3).
     One of them is set in code rather than markdown and so carries no word
     count; the screen-reader text says so. */
  const listedChapters = tocSections
    .filter((section) => section.num === 1 || section.num === 3)
    .reduce((total, section) => total + section.entries.length, 0);
  const uncountedChapters = listedChapters - chaptersPublished();

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
    {
      label: statsLabels.chapters,
      value: String(listedChapters),
      srText: `${listedChapters} chapters. ${uncountedChapters} of the ${listedChapters} is written in code rather than markdown, so it carries no word count.`,
    },
    { label: statsLabels.words, value: siteWordsPublished().toLocaleString("en-US") },
  ];

  const sections: CoverTocGroup[] = tocSections.map((section) => ({
    num: section.num,
    title: section.title,
    entries: section.entries.map((entry) => ({
      num: entry.num,
      title: entry.title,
      href: entry.href,
      dek: entry.dek,
      words: entry.countKey ? chapterWords(entry.countKey) : undefined,
    })),
  }));

  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <JsonLd data={personSchema} />

      <Masthead
        tagline={
          <>
            <span className="block font-display text-[1.15rem] leading-snug text-body-ink">
              {masthead.tagline}
            </span>
            <span className="mt-1.5 block font-serif-body text-[0.9375rem] leading-snug text-body-ink/75">
              {masthead.identity}
            </span>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/60">
              {masthead.role}
            </span>
          </>
        }
      />

      <CheckerBand />

      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet id="main-content" as="article" className="px-5 py-10 sm:px-10 lg:px-16 lg:py-12">
          {/* Intro (anatomy slot 3). Proof first, then chronology, then scope. */}
          <section aria-label="Opening" className="max-w-[68ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blueprint">
              {introLede(pipeline.value)}
            </p>

            <p className="manual-body manual-dropcap mt-6">{introInherited}</p>

            <p className="manual-body mt-5">
              {introChronology(years.value, verticals.value)}
            </p>

            <p className="manual-body mt-5">
              {progression.value} {progression.label}. {progression.context}.
            </p>
          </section>

          <div className="mt-10 max-w-[40rem]">
            <Fig002SignalToTouch />
          </div>

        </Sheet>

        {/* Contents (anatomy slot 5). */}
        <div className="mt-12 sm:mt-16">
          <CheckerBand label="Contents" />
        </div>

        <Sheet
          id="contents"
          as="section"
          className="mt-8 scroll-mt-8 px-5 py-10 sm:px-10 lg:px-16 lg:py-16"
        >
          <h2 className="border-b border-rule-hair pb-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.5rem]">
            Contents.
          </h2>
          <div className="mt-10">
            <CoverTOC sections={sections} />
          </div>
        </Sheet>

        {/* Cover figures (anatomy slot 4). Plates run at one width. */}
        <Sheet as="section" className="mt-8 px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
          <h2 className="font-serif-body text-[1.0625rem] font-semibold leading-snug text-body-ink">
            The systems, drawn.
          </h2>
          <div className="mt-10 flex max-w-[40rem] flex-col gap-16">
            <Fig001RevenueOperatingLayers />
            <Fig003LifecycleStages />
            <Fig004AttributionJoin />
            <Fig005ApprovalGatePath />
            <Fig006ClaimToPublish />
            <Fig007ThisSite />
          </div>
        </Sheet>

        {/* Stats (anatomy slot 6). */}
        <Sheet as="section" className="mt-8 px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
          <h2 className="font-serif-body text-[1.0625rem] font-semibold leading-snug text-body-ink">
            Site figures.
          </h2>
          <p className="mt-4 max-w-[60ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
            {statsPreamble}
          </p>
          <div className="mt-8 max-w-[26rem]">
            <StatTable rows={statRows} caption={statsCaption} />
          </div>
        </Sheet>

        {/* Questions (anatomy slot 7). */}
        <Sheet as="section" className="mt-8 px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
          <h2 className="font-display text-[1.75rem] leading-tight text-body-ink sm:text-[2rem]">
            Questions I get asked.
          </h2>
          <div className="mt-8">
            <TerminalFAQ entries={faqEntries} />
          </div>
        </Sheet>

        {/* Contact (anatomy slot 8). */}
        <Sheet as="section" className="mt-8 px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
          <h2 className="sr-only">Contact</h2>
          <div className="flex flex-col items-start gap-5">
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
              href="/resume"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Read the resume
            </Link>
          </div>
        </Sheet>
      </main>

      {/* Colophon (anatomy slot 9). */}
      <div id="colophon" className="scroll-mt-8">
        <ColophonFooter />
      </div>
    </div>
  );
}
