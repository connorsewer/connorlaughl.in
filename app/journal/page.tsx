import Link from "next/link";
import type { Metadata } from "next";

import {
  ChapterFootNav,
  CheckerBand,
  ColophonFooter,
  Masthead,
  Sheet,
  withPeriod,
} from "@/components/manual";
import { cta } from "@/content/cover";
import { listJournal, type JournalEntry } from "@/lib/journal";

/**
 * Section 5 index: Journal (re-story port, bank A8 decision D1).
 *
 * Sixteen personal essays from the previous site, verbatim, at their
 * original URLs. The index groups by year, newest first, and renders each
 * entry's own frontmatter (date, theme, read time, dek). No word-count meta:
 * the essays sit outside the published-words definition, and their own
 * read-time lines do the job the counts do elsewhere.
 */

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from a working life. Personal essays on work, Chicago, dogs, football, and what AI is doing to all of it.",
};

/** The page intro is the previous site's own line, ported verbatim. */
const INTRO = "Because I'm not a writer if I don't write.";

function byYear(entries: JournalEntry[]): Array<[string, JournalEntry[]]> {
  const groups = new Map<string, JournalEntry[]>();
  for (const entry of entries) {
    const year = entry.date.slice(0, 4);
    const group = groups.get(year) ?? [];
    group.push(entry);
    groups.set(year, group);
  }
  return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

function monthLabel(date: string): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[Number(date.slice(5, 7)) - 1]} ${Number(date.slice(8, 10))}`;
}

export default function JournalIndex() {
  const years = byYear(listJournal());

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
              Section 5 / Journal
            </p>
            <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem]">
              {withPeriod("Notes from a working life")}
            </h1>
            <p className="mt-5 max-w-[46ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
              {INTRO}
            </p>
          </header>

          {years.map(([year, entries]) => (
            <section key={year} aria-labelledby={`year-${year}`} className="mt-12">
              <h2
                id={`year-${year}`}
                className="flex items-baseline justify-between border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60"
              >
                <span>{year}</span>
                <span aria-hidden="true">{entries.length} entries</span>
              </h2>
              <ul>
                {entries.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="group flex flex-col gap-1 border-b border-grid-line py-4 transition-colors hover:bg-blueprint/[0.04]"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-blueprint">
                        {monthLabel(entry.date)} · {entry.theme} · {entry.readTime}
                      </span>
                      <span className="font-display text-[1.25rem] leading-snug text-body-ink transition-colors group-hover:text-blueprint">
                        {entry.title}
                      </span>
                      <span className="max-w-[62ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/70">
                        {entry.dek}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <ChapterFootNav
            className="mt-12"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Writing", title: "The long-form work chapters", href: "/writing" },
              { kicker: "Story", title: "The person doing the writing", href: "/story" },
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
