"use client";

import { createContext, useContext } from "react";

/**
 * The bridge between a plate's user space and the reader's screen.
 *
 * `LeaderLabel`'s constants are absolute — 11-unit type, a 10-unit gap, a
 * 7-unit arrowhead — and `PlateLabels.tsx` records the rule they depend on:
 * they read correctly only when one unit is about one CSS pixel. The numbered
 * plates do not honour that. Their viewBoxes run from 467 to 1092 units wide
 * into the same rendered column, so the same authored 11 rendered anywhere
 * from 13px to 6px. `Figure` measures the ratio and publishes it here so a
 * label can size itself in the reader's space rather than the plate's.
 *
 * Server default is a scale of 1, which reproduces the authored geometry
 * exactly; `Figure` corrects it in a layout effect, before the first paint.
 */
export type FigureScale = {
  /** Plate user units per CSS pixel. 1 means one unit draws one pixel. */
  unitsPerCssPx: number;
  /**
   * Ceiling on how far a label may grow before it runs off the plate.
   *
   * Wide plates were drawn with their viewBox pulled tight around the longest
   * label, so there is often under 10% of slack beyond it. Growing past that
   * clips the text against the viewBox edge, which is worse than small type.
   * Measured once per plate from the authored geometry, so it is a constant.
   */
  labelScaleCap: number;
  /**
   * False when the plate renders too narrow to carry a legible label at all.
   * The visible caption states the figure's claim in words either way, so
   * dropping the callouts costs the reader nothing a phone could have read.
   */
  labelsVisible: boolean;
};

/** The plate exactly as drawn: one unit, one pixel, nothing scaled. */
export const AUTHORED_SCALE: FigureScale = {
  unitsPerCssPx: 1,
  labelScaleCap: 1,
  labelsVisible: true,
};

export const FigureScaleContext = createContext<FigureScale>(AUTHORED_SCALE);

export function useFigureScale(): FigureScale {
  return useContext(FigureScaleContext);
}
