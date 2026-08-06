import Link from "next/link";
import { withPeriod } from "@/components/manual/ChapterHeader";

/**
 * Cover table of contents.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, the contents
 * block — a numbered mono section header over a rule, then one row per
 * chapter: serif title with a trailing period on the left, a mono word count
 * on the right, and a one-line serif dek underneath. Rows that are not
 * markdown-backed carry no count (spec §3, "Word counts").
 *
 * A row with no count still terminates its leader: it prints a mono kind token
 * instead, so the dotted rule always runs to something. The token is chrome
 * describing how the page is made, never a claim.
 *
 * Counted rows carry a hairline bar sized against the longest chapter in their
 * own section, which turns a column of numbers into a column the eye can read
 * as a scale without doing arithmetic.
 *
 * Presentational only. Counts arrive already resolved from
 * `lib/word-counts.ts` and claim values never reach this component.
 */

export type CoverTocLink = {
  /** Entry number inside its section. */
  num: string;
  title: string;
  href: string;
  dek: string;
  /** Build-computed word count. Omitted for bespoke TSX pages. */
  words?: number;
};

export type CoverTocGroup = {
  num: number;
  title: string;
  entries: CoverTocLink[];
};

export type CoverTOCProps = {
  sections: CoverTocGroup[];
  className?: string;
  /**
   * Section headers are the cover's own furniture. A single-section index that
   * already names the section in its page header passes `false` so the label
   * does not print twice.
   */
  showSectionHeaders?: boolean;
};


/**
 * What an uncounted row is, in one mono word.
 *
 * A count answers "how long"; these rows have no prose to measure, so they
 * answer "what kind" instead. Read off the href because that is where the
 * answer already lives: an in-page or in-chapter anchor is an index entry, a
 * page under /tools is a working tool, and everything else is a page set in
 * TSX rather than in markdown.
 */
function kindToken(href: string): string {
  if (href.includes("#")) return "index";
  if (href.startsWith("/tools/")) return "tool";
  return "tsx";
}

/** Longest counted chapter in a section, or 0 when the section has none. */
function sectionPeak(entries: CoverTocLink[]): number {
  return entries.reduce(
    (peak, entry) => (typeof entry.words === "number" ? Math.max(peak, entry.words) : peak),
    0,
  );
}

export function CoverTOC({
  sections,
  className,
  showSectionHeaders = true,
}: CoverTOCProps) {
  return (
    <nav aria-label="Contents" className={`w-full ${className ?? ""}`}>
      <ol className="m-0 flex list-none flex-col gap-14 p-0">
        {sections.map((section) => {
          const peak = sectionPeak(section.entries);
          return (
          <li key={section.num}>
            {showSectionHeaders ? (
            /* `.font-pixel` carries the same stack and the tracking with it;
               the inline style this replaced silently dropped the tracking. */
            <h3 className="font-pixel flex items-baseline gap-3 border-b border-rule-hair pb-2 text-[0.8125rem] uppercase tracking-[0.1em] text-body-ink">
              <span>Section {section.num}</span>
              <span aria-hidden="true" className="text-body-ink/50">
                /
              </span>
              <span>{section.title}</span>
            </h3>
            ) : null}

            <ol className="m-0 flex list-none flex-col p-0">
              {section.entries.map((entry) => (
                /* The whole row is the target. In a printed contents the leader
                   IS the row, and a pointer resting on the dek or the count
                   used to get no feedback and no click. The link keeps its own
                   accessible name: an overlaid ::before claims the row's box
                   rather than wrapping the dek inside the label. */
                <li key={entry.href} className="group relative py-3.5">
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="w-7 shrink-0 font-mono text-[10px] tracking-[0.18em] text-body-ink/60 transition-colors group-hover:text-blueprint group-focus-within:text-blueprint"
                    >
                      {entry.num}
                    </span>

                    <Link
                      href={entry.href}
                      className="font-display text-[1.35rem] leading-tight text-body-ink underline decoration-transparent underline-offset-4 transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-blueprint group-hover:decoration-blueprint group-focus-within:text-blueprint sm:text-[1.5rem]"
                    >
                      {withPeriod(entry.title)}
                    </Link>

                    <span
                      aria-hidden="true"
                      className="mx-2 hidden h-px flex-1 self-center border-b border-dotted border-rule-hair transition-colors group-hover:border-blueprint/50 group-focus-within:border-blueprint/50 sm:block"
                    />

                    {typeof entry.words === "number" ? (
                      <span className="flex shrink-0 items-center gap-2">
                        {/* The scale, not a second readout: no ticks, no
                            endpoints, and it is hidden from assistive tech
                            because the count beside it already says the
                            number. Width is written once at render and is
                            never animated. */}
                        <span
                          aria-hidden="true"
                          className="hidden h-[3px] w-12 bg-rule-hair sm:block"
                        >
                          <span
                            className="block h-full bg-blueprint/50 transition-colors group-hover:bg-blueprint"
                            style={{
                              width: `${Math.round(
                                (entry.words / Math.max(peak, entry.words)) * 100,
                              )}%`,
                            }}
                          />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-body-ink/60 transition-colors group-hover:text-blueprint/80 group-focus-within:text-blueprint/80">
                          {entry.words.toLocaleString("en-US")} words
                        </span>
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-body-ink/40 transition-colors group-hover:text-blueprint/70 group-focus-within:text-blueprint/70"
                      >
                        [ {kindToken(entry.href)} ]
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 max-w-[62ch] pl-0 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/70 transition-colors group-hover:text-body-ink sm:pl-11">
                    {entry.dek}
                  </p>
                </li>
              ))}
            </ol>
          </li>
          );
        })}
      </ol>
    </nav>
  );
}
