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
 * can stagger them without needing a selector from the caller.
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
    <div className={`w-full font-mono text-[11px] uppercase tracking-[0.16em] ${className ?? ""}`}>
      {caption ? (
        <p className="border-b border-grid-line pb-2 text-[10px] tracking-[0.28em] text-body-ink/60">
          {caption}
        </p>
      ) : null}
      <dl className="m-0">
        {rows.map((row) => (
          <div
            key={row.label}
            data-stat-row
            className="flex items-baseline justify-between gap-6 py-2.5"
          >
            <dt className="text-label-muted">{row.label}:</dt>
            <dd className="m-0 text-right text-body-ink">
              {row.srText ? (
                <>
                  <span aria-hidden="true">{row.value}</span>
                  <span className="sr-only">{row.srText}</span>
                </>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
