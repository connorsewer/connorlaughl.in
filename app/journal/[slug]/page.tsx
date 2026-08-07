import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ChapterHeader, ChapterLayout, type TocSection } from "@/components/manual";
import { tocSections } from "@/content/cover";
import { journalSlugs, neighbours, readJournal } from "@/lib/journal";
import { renderMarkdown } from "@/lib/markdown";

/**
 * Journal entry (re-story port, bank A8 decision D1).
 *
 * The essay bodies are Connor's own published writing and render verbatim:
 * decision D2 exempts them from the banned-word scan (the exemption lives in
 * scripts/voice-scan.mjs), and the port-time claim review found no ungated
 * business numeral in any of the sixteen. Chrome, titles, and this file stay
 * under the ordinary voice rules. URLs match the previous site, so every
 * existing link survives.
 */

const SECTION_TITLE = "Journal";

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

export async function generateStaticParams() {
  return journalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = readJournal(slug);
  if (!post) return { title: "Entry not found" };
  return { title: post.title, description: post.dek };
}

export default async function JournalEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = readJournal(slug);
  if (!post) return notFound();

  const { older, newer } = neighbours(slug);

  return (
    <ChapterLayout
      section={SECTION_TITLE}
      sectionHref="/journal"
      chapter={post.title}
      prev={newer ? { title: newer.title, href: `/journal/${newer.slug}` } : undefined}
      next={older ? { title: older.title, href: `/journal/${older.slug}` } : undefined}
      sections={manualSections}
      activeHref={`/journal/${slug}`}
    >
      <ChapterHeader
        eyebrow={`Journal / ${post.theme}`}
        title={post.title}
        dek={post.dek}
      />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-body-ink/50">
        {post.date} · {post.readTime}
      </p>

      <div className="mt-2">{renderMarkdown(post.body)}</div>
    </ChapterLayout>
  );
}
