/**
 * FAQ, set as a terminal exchange.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, the questions
 * block — mono `IN:` and `OUT:` prefixes down a hairline gutter, each answer
 * folded away until asked for. The chrome is the only thing borrowed: the
 * questions come from real hiring screens and the answers are written, not
 * generated (spec §3.7, §4).
 *
 * Built on `<details>`/`<summary>` so keyboard and screen-reader behaviour is
 * the platform's, not ours. No JavaScript, so it works before hydration and
 * with scripting off.
 */

export type TerminalFAQEntry = {
  question: string;
  answer: string;
};

export type TerminalFAQProps = {
  entries: TerminalFAQEntry[];
  className?: string;
};

export function TerminalFAQ({ entries, className }: TerminalFAQProps) {
  return (
    <div className={`w-full ${className ?? ""}`}>
      {entries.map((entry) => (
        <details
          key={entry.question}
          className="group border-b border-grid-line last:border-b-0"
        >
          <summary className="flex cursor-pointer list-none items-baseline gap-3 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-blueprint"
            >
              In:
            </span>

            <span className="flex-1 font-serif-body text-[1rem] leading-snug text-body-ink transition-colors group-hover:text-blueprint">
              {entry.question}
            </span>

            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-[11px] leading-none text-body-ink/40 transition-transform group-open:rotate-90"
            >
              &rsaquo;
            </span>
          </summary>

          <div className="flex items-start gap-3 pb-5 pl-0">
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/45"
            >
              Out:
            </span>
            <p className="max-w-[68ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
              {entry.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
