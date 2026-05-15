import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { renderMarkdown } from "@/lib/markdown";
import {
  formatDate,
  journalSlugs,
  neighbours,
  readJournal,
} from "@/lib/journal";

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
  if (!post) return { title: "Entry not found | Connor J. Laughlin" };
  return {
    title: `${post.title} | Journal | Connor J. Laughlin`,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      authors: ["Connor J. Laughlin"],
    },
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = readJournal(slug);
  if (!post) return notFound();

  const d = formatDate(post.date);
  const { older, newer } = neighbours(slug);

  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main
        id="main-content"
        className="min-h-screen pt-28 md:pt-32 pb-24 px-6"
      >
        <article className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-6 flex-wrap mb-12">
            <Link
              href="/journal"
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper/70 hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span aria-hidden="true">←</span> Journal
            </Link>
            <time
              dateTime={post.date}
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper/55"
            >
              {d.long}
            </time>
          </div>

          <header>
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-accent mb-5">
              {post.theme}
              <span aria-hidden="true" className="text-paper/25 mx-2">
                ·
              </span>
              <span className="text-paper/55">{post.readTime}</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.25rem)] leading-[0.98] tracking-tight text-balance">
              {post.title}
            </h1>
            <p className="mt-6 text-xl md:text-2xl leading-snug text-paper/70 italic max-w-[36ch]">
              {post.dek}
            </p>
          </header>

          <div className="rule mt-12" role="separator" />

          <div className="mt-12 journal-prose">{renderMarkdown(post.body)}</div>

          <div className="rule mt-16" role="separator" />

          <nav
            aria-label="More journal entries"
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {older ? (
              <Link
                href={`/journal/${older.slug}`}
                className="group block border border-rule p-6 rounded-lg hover:border-accent transition-colors"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/45 mb-3 block">
                  <span aria-hidden="true" className="mr-1.5">
                    ←
                  </span>
                  Older
                </span>
                <span className="font-display text-xl leading-snug text-paper group-hover:text-accent transition-colors">
                  {older.title}
                </span>
              </Link>
            ) : (
              <div aria-hidden="true" />
            )}
            {newer ? (
              <Link
                href={`/journal/${newer.slug}`}
                className="group block border border-rule p-6 rounded-lg hover:border-accent transition-colors md:text-right"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/45 mb-3 block">
                  Newer
                  <span aria-hidden="true" className="ml-1.5">
                    →
                  </span>
                </span>
                <span className="font-display text-xl leading-snug text-paper group-hover:text-accent transition-colors">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <div aria-hidden="true" />
            )}
          </nav>

          <div className="mt-10 text-center">
            <Link
              href="/journal"
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-paper/65 hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span aria-hidden="true">←</span> All journal entries
            </Link>
          </div>
        </article>
      </main>

      <footer className="py-12 border-t border-rule px-6">
        <div className="mx-auto max-w-6xl flex justify-between items-center opacity-50 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>© 2026 Connor J. Laughlin</span>
          <span>Chicago</span>
        </div>
      </footer>
    </div>
  );
}
