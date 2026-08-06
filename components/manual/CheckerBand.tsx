/**
 * Dither checker divider.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png` at y≈1720 —
 * a full-bleed halftone rule between major cover sections, occasionally
 * broken by a centred mono label. Pure CSS: the checker lives in
 * `.manual-checker` in app/globals.css (repeating-conic-gradient, 3px cells,
 * blueprint at low alpha over the ground). No raster plate, no SVG.
 *
 * The band is decoration, so it is hidden from assistive tech. A `label`,
 * when given, is real text and stays readable.
 */

export type CheckerBandProps = {
  /** Optional mono label set into a gap at the centre of the band. */
  label?: string;
  className?: string;
};

export function CheckerBand({ label, className }: CheckerBandProps) {
  if (!label) {
    return (
      <div
        aria-hidden="true"
        className={`manual-checker w-full ${className ?? ""}`}
      />
    );
  }

  return (
    <div className={`flex w-full items-center gap-4 ${className ?? ""}`}>
      <span aria-hidden="true" className="manual-checker min-w-6 flex-1" />
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
        {label}
      </span>
      <span aria-hidden="true" className="manual-checker min-w-6 flex-1" />
    </div>
  );
}
