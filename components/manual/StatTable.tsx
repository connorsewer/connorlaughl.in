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
  /** Table caption. Visually hidden; required for a labelled table. */
  caption?: string;
  className?: string;
};

export function StatTable({ rows, caption, className }: StatTableProps) {
  return (
    <table
      className={`w-full border-collapse border border-grid-line font-mono text-[11px] uppercase tracking-[0.16em] ${
        className ?? ""
      }`}
    >
      {caption ? <caption className="sr-only">{caption}</caption> : null}
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} data-stat-row className="border-b border-grid-line last:border-b-0">
            <th
              scope="row"
              className="w-1/2 px-4 py-3 text-left font-normal text-body-ink/60"
            >
              {row.label}
            </th>
            <td className="px-4 py-3 text-right text-body-ink">
              {row.srText ? (
                <>
                  <span aria-hidden="true">{row.value}</span>
                  <span className="sr-only">{row.srText}</span>
                </>
              ) : (
                row.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
