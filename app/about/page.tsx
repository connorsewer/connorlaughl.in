import type { Metadata } from "next";
import Image from "next/image";

import { JsonLd, personSchema } from "@/components/JsonLd";
import {
  ChapterFootNav,
  ChapterHeader,
  ChapterLayout,
  type TocSection,
} from "@/components/manual";
import { cta, tocSections } from "@/content/cover";
import { coverStats, proseProofClaims, renderableProofMetrics } from "@/content/proof-metrics";

/**
 * About (spec §3: appendix chapter, and the portrait plate's home).
 *
 * Chapter chrome with no word-count meta: the page is bespoke TSX, which spec
 * §3 excludes from the count. Copy is the approved deck's section 7, verbatim
 * apart from one word noted in the overnight log.
 *
 * The portrait is the halftone plate: the desk illustration re-screened as a
 * blueprint-on-paper duotone so it belongs to the same drawing system as the
 * figures, in a plain `next/image` inside a blueprint border.
 */

export const metadata: Metadata = {
  title: "About",
  description:
    "Writer, then marketer, then the person who builds the systems. The short version of how the work got here.",
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

export default function AboutPage() {
  /* S1 and S3, in the order `coverStats` declares them. */
  const [years, , acquisitions] = renderableProofMetrics(coverStats);
  /* S6. Rendered as its whole progression sentence pair, never split. */
  const [progression] = renderableProofMetrics(proseProofClaims);

  return (
    <>
      <JsonLd data={personSchema} />
      <ChapterLayout
        section="Appendix"
        chapter="About"
        sections={manualSections}
        activeHref="/about"
      >
        {/* No dek, so no ornament: audit #32 suppresses it rather than let it
            sit directly under the title looking like an artifact. */}
        <ChapterHeader eyebrow="Appendix" title="About" />

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

        <section aria-label="Opening" className="mt-10 max-w-[68ch]">
          <p className="manual-body manual-dropcap">
            I started as a writer. High-volume consumer editorial, testing
            headlines against traffic, learning that a sentence either earns
            attention or it doesn&apos;t. Before that I packaged executive
            candidates for boards, which is where I learned to build a case
            somebody else has to defend in a room I&apos;m not in.
          </p>

          <p className="manual-body mt-5">
            I came into marketing through the search and content door in 2015,
            as the first dedicated digital hire at a company with no analytics,
            no attribution, and no demand program. {years.value} years later I
            run marketing and GTM as VP and acting CMO.
          </p>

          <p className="manual-body mt-5">
            The middle of that is the part I&apos;d rather talk about.{" "}
            {progression.value} {progression.label}. {progression.context}.
          </p>

          <p className="manual-body mt-5">
            Along the way I ran marketing integration for {acquisitions.value}{" "}
            acquisitions, including a regulated Canadian business unit where I
            learned the compliance and market requirements and then
            operationalized them.
          </p>

          <p className="manual-body mt-5">
            Somewhere in there I taught myself to code, which turned out to be
            the thing that changed the job. Now I build governed AI workflows
            with human approval gates and audit trails instead of writing a
            requirements doc and waiting two quarters.
          </p>

          <p className="manual-body mt-5">
            Marketing executive. GTM systems engineer. Both halves are real, and
            I like the days that need both.
          </p>
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
