/**
 * FAQ, set as a terminal exchange.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, the questions
 * block — a bordered box, each exchange a header row and a body row split by
 * a hairline, `IN:` and `OUT:` sitting in a neutral gutter down the left. The
 * chrome is the only thing borrowed: the questions come from real hiring
 * screens and the answers are written, not generated (spec §3.7, §4).
 *
 * Answers render open. A `<details open>` still collapses on click for
 * readers who want the list, but nothing is hidden from a static reader, a
 * printer, or a page fetched without JavaScript. No chevrons: the `IN:` and
 * `OUT:` rows carry the affordance, with a `[ − ]` / `[ + ]` mark at the right
 * edge stating which way the row is set. The box height is not animated — a
 * `<details>` can only be transitioned by animating a layout property, which
 * this system does not do, so the row snaps and the mark does the talking.
 */

export type TerminalFAQEntry = {
  question: string;
  answer: string;
};

export type TerminalFAQProps = {
  entries: TerminalFAQEntry[];
  className?: string;
};

const GUTTER =
  "w-11 shrink-0 select-none font-mono text-[10px] uppercase tracking-[0.16em] text-label-muted";

export function TerminalFAQ({ entries, className }: TerminalFAQProps) {
  return (
    <div className={`w-full border border-body-ink ${className ?? ""}`}>
      {entries.map((entry, i) => (
        <details
          key={entry.question}
          open
          className={i > 0 ? "border-t border-body-ink" : undefined}
        >
          {/* The row had no hover, no focus and no open indicator, so nothing
              said it was operable. It now lights the way the shell below it
              does, and the mark is swapped in CSS off the `open` attribute so
              the server render carries no state. */}
          <summary className="group flex cursor-pointer list-none items-baseline gap-3 px-4 py-3 transition-colors marker:hidden hover:bg-blueprint/[0.04] focus-visible:bg-blueprint/[0.04] [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className={`${GUTTER} transition-colors group-hover:text-blueprint`}
            >
              In:
            </span>
            <span className="flex-1 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-body-ink">
              {entry.question}
            </span>
            <span
              aria-hidden="true"
              className="faq-mark shrink-0 select-none font-mono text-[10px] leading-none text-label-muted transition-colors group-hover:text-blueprint"
            />
          </summary>

          <div className="flex items-start gap-3 border-t border-grid-line px-4 py-4">
            <span aria-hidden="true" className={GUTTER}>
              Out:
            </span>
            <p className="max-w-[68ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
              {entry.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
