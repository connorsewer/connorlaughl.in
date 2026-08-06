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


export function CoverTOC({
  sections,
  className,
  showSectionHeaders = true,
}: CoverTOCProps) {
  return (
    <nav aria-label="Contents" className={`w-full ${className ?? ""}`}>
      <ol className="m-0 flex list-none flex-col gap-14 p-0">
        {sections.map((section) => (
          <li key={section.num}>
            {showSectionHeaders ? (
            <h3
              style={{
                fontFamily:
                  "var(--font-geist-pixel-square), var(--font-geist-mono), ui-monospace, monospace",
              }}
              className="flex items-baseline gap-3 border-b border-rule-hair pb-2 text-[0.8125rem] uppercase tracking-[0.1em] text-body-ink"
            >
              <span>Section {section.num}</span>
              <span aria-hidden="true" className="text-body-ink/50">
                /
              </span>
              <span>{section.title}</span>
            </h3>
            ) : null}

            <ol className="m-0 flex list-none flex-col p-0">
              {section.entries.map((entry) => (
                <li
                  key={entry.href}
                  className="py-3.5"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="w-7 shrink-0 font-mono text-[10px] tracking-[0.18em] text-body-ink/60"
                    >
                      {entry.num}
                    </span>

                    <Link
                      href={entry.href}
                      className="font-display text-[1.35rem] leading-tight text-body-ink underline decoration-transparent underline-offset-4 transition-colors hover:text-blueprint hover:decoration-blueprint focus-visible:text-blueprint sm:text-[1.5rem]"
                    >
                      {withPeriod(entry.title)}
                    </Link>

                    <span
                      aria-hidden="true"
                      className="mx-2 hidden h-px flex-1 self-center border-b border-dotted border-rule-hair sm:block"
                    />

                    {typeof entry.words === "number" ? (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-body-ink/60">
                        {entry.words.toLocaleString("en-US")} words
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1.5 max-w-[62ch] pl-0 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/70 sm:pl-11">
                    {entry.dek}
                  </p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  );
}
