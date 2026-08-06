/**
 * Mono stat table.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png` at y≈3550 —
 * a bordered block of label/value pairs, mono throughout, values right-set.
 *
 * Purely presentational. This component never imports `content/proof-metrics`:
 * the caller resolves every gated value through `renderableProofMetrics()` (or
 * `lib/word-counts.ts` for build-computed counts) and passes strings in. The
 * claim gate follows the caller, not this file.
 *
 * Rows are marked `data-stat-row` so `statFill()` from lib/motion-manual.ts
 * can stagger them, and each visible value is marked `data-stat-value` so
 * `statTick()` can count it up, both without needing a selector from the
 * caller. Neither attribute has a visual effect, and neither runner is wired
 * from here: `StatTableMotion` is the client wrapper that runs them, and this
 * component stays server-rendered inside it.
 */

export type StatRow = {
  /** Mono uppercase label, left column. */
  label: string;
  /** Display value, right column. Terse by design. */
  value: string;
  /** Spoken form of the value when the display string is an abbreviation. */
  srText?: string;
};

export type StatTableProps = {
  rows: StatRow[];
  /** Mono heading above the rows, with a rule under it. */
  caption?: string;
  className?: string;
};

export function StatTable({ rows, caption, className }: StatTableProps) {
  return (
    <div className={`w-full font-mono ${className ?? ""}`}>
      {caption ? (
        <p className="border-b border-grid-line pb-2 text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
          {caption}
        </p>
      ) : null}
      <dl className="m-0">
        {rows.map((row) => (
          <div
            key={row.label}
            data-stat-row
            className="flex items-baseline justify-between gap-8 border-b border-grid-line py-3.5"
          >
            <dt className="text-[11px] uppercase tracking-[0.16em] text-label-muted">
              {row.label}
            </dt>
            <dd className="m-0 text-right text-body-ink">
              <span
                data-stat-value
                aria-hidden={row.srText ? "true" : undefined}
                className="inline-block text-[1.25rem] leading-none tracking-[0.01em] [font-variant-numeric:lining-nums_tabular-nums] sm:text-[1.375rem]"
              >
                {row.value}
              </span>
              {row.srText ? <span className="sr-only">{row.srText}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
