import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ChapterLayout, type TocSection } from "@/components/manual";
import { tocSections } from "@/content/cover";
import { longformSlugs, readLongform } from "@/content/longform-map";
import { renderMarkdown } from "@/lib/markdown";
import { longformWords } from "@/lib/word-counts";

/**
 * Longform chapter (spec §3: Section 3).
 *
 * Chapter chrome from `ChapterLayout`, with prev/next drawn from the Section 3
 * order in `content/cover.ts` so the contents and the chapter rail can never
 * disagree. Titles and deks are the approved deck's section 8, verbatim; the
 * bodies stay in markdown and render through `lib/markdown.tsx`.
 */

const SECTION_TITLE = "Writing";

/** Section 3, in contents order. */
const section3 = tocSections.find((section) => section.num === 3);

const chapterOrder = (section3?.entries ?? []).map((entry) => ({
  title: entry.title,
  href: entry.href,
  dek: entry.dek,
  slug: entry.href.replace("/longform/", ""),
}));

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

function chapterAt(slug: string) {
  const index = chapterOrder.findIndex((entry) => entry.slug === slug);
  if (index < 0) return null;
  return {
    entry: chapterOrder[index],
    prev: index > 0 ? chapterOrder[index - 1] : undefined,
    next: index < chapterOrder.length - 1 ? chapterOrder[index + 1] : undefined,
  };
}

export async function generateStaticParams() {
  return longformSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapterAt(slug);
  if (!chapter) return { title: "Chapter not found | Connor J. Laughlin" };
  return {
    title: `${chapter.entry.title} | Connor J. Laughlin`,
    description: chapter.entry.dek,
  };
}

export default async function LongformPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const md = readLongform(slug);
  const chapter = chapterAt(slug);
  if (!md || !chapter) return notFound();

  const { entry, prev, next } = chapter;

  return (
    <ChapterLayout
      section={SECTION_TITLE}
      sectionHref="/#contents"
      chapter={entry.title}
      prev={prev ? { title: prev.title, href: prev.href } : undefined}
      next={next ? { title: next.title, href: next.href } : undefined}
      words={longformWords(slug)}
      sections={manualSections}
      activeHref={entry.href}
    >
      <header className="max-w-[68ch]">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
          Section 3 / Writing
        </p>
        <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
          {entry.title}
        </h1>
        {entry.dek ? (
          <p className="mt-5 font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
            {entry.dek}
          </p>
        ) : null}
      </header>

      <div className="mt-10">{renderMarkdown(md)}</div>
    </ChapterLayout>
  );
}
