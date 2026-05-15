import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { formatDate, listJournal, type JournalEntry } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal | Connor J. Laughlin",
  description:
    "Essays on GTM systems, AI, marketing leadership, and the parts of Chicago worth defending. Written and published by Connor J. Laughlin.",
};

type Year = { year: string; entries: JournalEntry[] };

function groupByYear(entries: JournalEntry[]): Year[] {
  const map = new Map<string, JournalEntry[]>();
  for (const e of entries) {
    const y = e.date.slice(0, 4);
    const list = map.get(y);
    if (list) list.push(e);
    else map.set(y, [e]);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, list]) => ({ year, entries: list }));
}

export default function JournalIndex() {
  const entries = listJournal();
  const years = groupByYear(entries);

  return (
    <div className="selection:bg-accent selection:text-ink">
      <Header />

      <main id="main-content" className="min-h-screen pt-32 px-6">
        <div className="mx-auto max-w-6xl">
          <span className="font-mono text-[10px] tracking-[0.4em] text-accent mb-6 uppercase block">
            Journal
          </span>
          <h1 className="font-display text-[clamp(2.75rem,7.5vw,4.75rem)] leading-[0.95] tracking-tight mb-8 text-balance">
            Notes from a working{" "}
            <span className="text-accent italic">life.</span>
          </h1>
          <p className="text-xl text-paper/70 max-w-3xl mb-6 leading-relaxed text-balance">
            Essays on GTM systems, AI, marketing leadership, and the parts of Chicago worth defending. Published roughly every six weeks since November 2024.
          </p>
        </div>

        <div className="mx-auto max-w-6xl mt-20">
          {years.map(({ year, entries }) => (
            <section key={year} aria-labelledby={`journal-year-${year}`}>
              <div className="pt-10 border-t border-rule flex items-baseline justify-between gap-4">
                <h2
                  id={`journal-year-${year}`}
                  className="font-display text-5xl md:text-6xl tracking-tight text-paper/30"
                >
                  {year}
                </h2>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/45">
                  {entries.length} {entries.length === 1 ? "entry" : "entries"}
                </span>
              </div>

              <ol className="mt-2">
                {entries.map((entry) => {
                  const d = formatDate(entry.date);
                  return (
                    <li key={entry.slug}>
                      <Link
                        href={`/journal/${entry.slug}`}
                        className="group block py-8 md:py-10 border-t border-rule first:border-t-0"
                      >
                        <div className="grid md:grid-cols-[1fr_auto] items-baseline gap-3 md:gap-8">
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/55 mb-3 flex items-center gap-2 flex-wrap">
                              <span className="text-accent">{entry.theme}</span>
                              <span aria-hidden="true" className="text-paper/25">
                                ·
                              </span>
                              <span>
                                {d.month} {parseInt(d.day, 10)}
                              </span>
                              <span aria-hidden="true" className="text-paper/25">
                                ·
                              </span>
                              <span>{entry.readTime}</span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tight text-balance text-paper group-hover:text-accent transition-colors">
                              {entry.title}
                            </h3>
                            <p className="mt-3 text-paper/65 text-base md:text-lg leading-relaxed max-w-[60ch] italic">
                              {entry.dek}
                            </p>
                          </div>
                          <span
                            aria-hidden="true"
                            className="hidden md:inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-paper/35 self-end pb-1.5 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
                          >
                            Read
                            <span>→</span>
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t border-rule px-6 mt-32">
        <div className="mx-auto max-w-6xl flex justify-between items-center opacity-50 font-mono text-[9px] tracking-[0.3em] uppercase">
          <span>© 2026 Connor J. Laughlin</span>
          <span>Chicago</span>
        </div>
      </footer>
    </div>
  );
}
