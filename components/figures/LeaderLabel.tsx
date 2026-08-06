"use client";

import { useFigureScale } from "@/components/figures/FigureScale";
import { FIG_STROKE } from "@/components/figures/IsoBox";

/**
 * Mono leader label with a leader line and arrowhead.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, FIG_001
 * callouts — labels are always horizontal, always mono uppercase, always in
 * blueprint, and the leader runs straight from the label to an arrowhead on
 * the part it names. Nothing is set on an angle; rotated type is reserved for
 * the two side captions on the plate.
 *
 * `x`/`y` place the label text. `dx`/`dy` are the offset from there to the
 * point being named, so the label reads first and the eye follows the line.
 *
 * Sizes are authored in plate units and resolved into the reader's units by
 * `FigureScale`: `size`, `GAP` and `HEAD` are one lockup and scale together,
 * so the gap the leader holds off the text stays proportional to the type
 * rather than collapsing into it. The arrow target never moves, so the label
 * grows away from the part it names and not over it.
 */

export type LeaderLabelProps = {
  /** Label anchor, plate coordinates. */
  x: number;
  y: number;
  /** Offset from the label to the point being named. */
  dx: number;
  dy: number;
  text: string;
  /** Dashed leader, for construction ties rather than callouts. */
  dashed?: boolean;
  /** Set false for a plain tie with no arrowhead. */
  arrow?: boolean;
  /** Type size in plate units, before the plate's scale is applied. */
  size?: number;
  className?: string;
};

/** Distance held between the end of the text and the start of the leader. */
const GAP = 10;
const HEAD = 7;

/**
 * Rendered label size, CSS pixels.
 *
 * Mono uppercase at 11px with 0.1em tracking is the size the manual sets
 * every other caption and rail at, so a callout that matches it reads as the
 * same voice rather than as a different one shrunk to fit.
 */
const TARGET_PX = 11;

export function LeaderLabel({
  x,
  y,
  dx,
  dy,
  text,
  dashed = false,
  arrow = true,
  size = 11,
  className,
}: LeaderLabelProps) {
  const { unitsPerCssPx, labelScaleCap, labelsVisible } = useFigureScale();

  if (!labelsVisible) return null;

  /* Growing is what clips; shrinking never can, so the cap only binds one
     way. A plate whose cap holds it under the target is a plate with no room
     left, which is a composition fact and not something to force. */
  const wanted = (TARGET_PX * unitsPerCssPx) / size;
  const scale = wanted <= 1 ? wanted : Math.min(wanted, labelScaleCap);

  const type = size * scale;
  const gap = GAP * scale;
  const head = HEAD * scale;

  const toRight = dx >= 0;
  const startX = x + (toRight ? gap : -gap);
  const targetX = x + dx;
  const targetY = y + dy;
  /* Rounded because it is computed on both sides of hydration and `atan2` is
     only specified to the last ulp, so Node and the browser disagree in the
     fifteenth decimal and React reports the attribute as a mismatch. */
  const angle = ((Math.atan2(targetY - y, targetX - startX) * 180) / Math.PI).toFixed(4);

  return (
    /* `data-leader-group` is the selector `labelSettle()` in
       lib/motion-manual.ts settles the plate's labels by. No visual effect. */
    <g data-leader-group className={className}>
      <text
        x={x}
        y={y}
        textAnchor={toRight ? "end" : "start"}
        dominantBaseline="middle"
        fill="var(--blueprint)"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fontSize={type}
        letterSpacing="0.1em"
      >
        {text.toUpperCase()}
      </text>

      <line
        x1={startX}
        y1={y}
        x2={targetX}
        y2={targetY}
        stroke="var(--blueprint)"
        strokeWidth={FIG_STROKE}
        strokeDasharray={dashed ? "4 4" : undefined}
        vectorEffect="non-scaling-stroke"
      />

      {arrow ? (
        <path
          d={`M ${-head} ${-head * 0.55} L 0 0 L ${-head} ${head * 0.55}`}
          fill="none"
          stroke="var(--blueprint)"
          strokeWidth={FIG_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          transform={`translate(${targetX} ${targetY}) rotate(${angle})`}
        />
      ) : null}
    </g>
  );
}
