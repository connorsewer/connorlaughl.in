import type { Metadata } from "next";
import Image from "next/image";

import Link from "next/link";

import { JsonLd, personSchema } from "@/components/JsonLd";
import {
  ChapterFootNav,
  ChapterHeader,
  ChapterLayout,
  TerminalFAQ,
  type TocSection,
} from "@/components/manual";
import { cta, storyFaqEntries, tocSections } from "@/content/cover";
import { coverStats, proseProofClaims, renderableProofMetrics } from "@/content/proof-metrics";

/**
 * Story (deck 17.3, re-story phase 4).
 *
 * Structure per the deck: origins, the writer years, Mr. B, the operator now,
 * a pointer to /edge as "how I work", then the asked-and-answered block that
 * moved off the cover. The opening, Mr. B, and operator-now blocks are deck
 * copy verbatim (the four-sentence operator block renders as two paragraphs
 * for the three-sentence rule; no word changed). The writer years are the
 * deck's DRAFT-AT-BUILD slot, written here from the old /about paragraphs
 * with the same facts in a warmer register. Claims resolve through the gate.
 *
 * Chapter chrome with no word-count meta: the page is bespoke TSX, which spec
 * §3 excludes from the count. The portrait is the halftone plate: the desk
 * illustration re-screened as a blueprint-on-paper duotone so it belongs to
 * the same drawing system as the figures.
 */

export const metadata: Metadata = {
  title: "Story",
  description:
    "The story: a comic-book kid, a Palm Pilot, the founder of AKQA, and the operator the three of them made.",
};

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

const PORTRAIT = {
  src: "/about/portrait-plate.webp",
  width: 848,
  height: 1264,
  alt: "Halftone plate of Connor J. Laughlin standing at his desk in Chicago, screens and notepad in front of him and his dog on the rug beside him.",
};

export default function StoryPage() {
  /* S3, in the order `coverStats` declares them. */
  const [, , acquisitions] = renderableProofMetrics(coverStats);
  /* S6. Rendered as its whole progression sentence pair, never split. */
  const [progression] = renderableProofMetrics(proseProofClaims);

  return (
    <>
      <JsonLd data={personSchema} />
      <ChapterLayout
        section="Appendix"
        chapter="Story"
        sections={manualSections}
        activeHref="/story"
      >
        {/* No dek, so no ornament: audit #32 suppresses it rather than let it
            sit directly under the title looking like an artifact. */}
        <ChapterHeader eyebrow="The person" title="Story" />

        {/* Audit #37: FIG_020 is the manual's only duotone plate, its only
            human presence and its only portrait proportion, and it used to sit
            roughly a thousand pixels down this page. It now heads the chapter,
            which is where a portrait belongs. It is still the only place it
            renders; putting it on the cover is a masthead decision and sits
            with the chrome owner, not here. */}
        <figure className="mt-9 max-w-[22rem]">
          <div className="border border-blueprint/40 p-2">
            <Image
              src={PORTRAIT.src}
              alt={PORTRAIT.alt}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              sizes="(min-width: 768px) 22rem, 100vw"
              priority
              className="plate-duotone block h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
              FIG_020 [ PORTRAIT ]
            </span>
            <span className="max-w-[46ch] font-serif-body text-[0.875rem] leading-snug text-body-ink/70">
              Connor J. Laughlin, at the desk in Chicago where most of this was
              built.
            </span>
          </figcaption>
        </figure>

        {/* Deck 17.3 opening, verbatim. */}
        <section aria-label="Origins" className="mt-10 max-w-[68ch]">
          <p className="manual-body manual-dropcap">
            I was the kid who fixed the neighborhood&apos;s computers. Ten
            years old, deep in Macworld and Wired, weirdly obsessed with Palm
            Pilots. The other half of me lived in comic books and Dylan
            records, learning how a story holds a person still.
          </p>

          <p className="manual-body mt-5">
            Marketing turned out to be the job where both halves count.
          </p>
        </section>

        {/* Deck 17.3 DRAFT-AT-BUILD slot: the old /about facts, told warmer. */}
        <section aria-labelledby="writer-years" className="mt-12 max-w-[68ch]">
          <h2
            id="writer-years"
            className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
          >
            The writer years
          </h2>

          <p className="manual-body mt-6">
            The writing came first, professionally. I packaged executive
            candidates for boards, which meant building a case somebody else
            had to defend in a room I wasn&apos;t in. A story with evidence
            attached, or it didn&apos;t work.
          </p>

          <p className="manual-body mt-5">
            Then high-volume consumer editorial: headlines tested against live
            traffic, all day, every day. A sentence either earns attention or
            it doesn&apos;t, and the numbers are never polite about which.
          </p>

          <p className="manual-body mt-5">
            In 2015 I came through the search-and-content door as the first
            dedicated digital marketing hire, into a company that had no
            analytics to argue with yet. The middle of what followed is the
            part I like telling. {progression.value} {progression.label}.{" "}
            {progression.context}.
          </p>

          <p className="manual-body mt-5">
            Along the way I ran marketing integration for {acquisitions.value}{" "}
            acquisitions, including a regulated Canadian business unit whose
            compliance requirements I learned and then operationalized.
            Somewhere in the middle I taught myself to code, which changed the
            job more than any promotion did. Where I once wrote a requirements
            doc and waited two quarters, I now build the workflow myself, with
            human approval gates and audit trails attached.
          </p>
        </section>

        {/* Deck 17.3 Mr. B block, verbatim. */}
        <section aria-labelledby="mr-b" className="mt-12 max-w-[68ch]">
          <h2
            id="mr-b"
            className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
          >
            Mr. B
          </h2>

          <p className="manual-body mt-6">
            Tom Bedecarre, the founder of AKQA, was my mentor and something
            like a second father. He wrote radio spots and print ads that ran
            in The New York Times, then turned around and built digital
            campaigns for Nike and the Halo games. I watched him and understood
            the job I wanted: tell great stories, and build the machinery that
            carries them.
          </p>
        </section>

        {/* Deck 17.3 closing, verbatim; split at the sentence pair for the
            three-sentence rule. It restates the thesis, so the page ends on
            the tagline the cover opens with. */}
        <section aria-labelledby="operator-now" className="mt-12 max-w-[68ch]">
          <h2
            id="operator-now"
            className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
          >
            The operator now
          </h2>

          <p className="manual-body mt-6">
            The latest chapter is the one this site documents. I run marketing
            and GTM for TSI as acting CMO, and I build the AI operating layer
            underneath it with my own hands.
          </p>

          <p className="manual-body mt-5">
            I still tell stories people remember. The systems are how I make
            them true.
          </p>

          <p className="manual-body mt-5">
            The mechanics have their own chapter:{" "}
            <Link href="/edge" className="text-blueprint underline-offset-4 hover:underline">
              how I work
            </Link>
            , in eleven operating chapters.
          </p>
        </section>

        {/* Deck 17.6: the three FAQ entries that moved off the cover. */}
        <section aria-labelledby="asked-and-answered" className="mt-12 max-w-[68ch]">
          <h2
            id="asked-and-answered"
            className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
          >
            Asked and answered
          </h2>
          <TerminalFAQ className="mt-6" entries={storyFaqEntries} />
        </section>

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
      </ChapterLayout>
    </>
  );
}
