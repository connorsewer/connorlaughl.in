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
  /** Type size in plate units. */
  size?: number;
  className?: string;
};

/** Distance held between the end of the text and the start of the leader. */
const GAP = 10;
const HEAD = 7;

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
  const toRight = dx >= 0;
  const startX = x + (toRight ? GAP : -GAP);
  const targetX = x + dx;
  const targetY = y + dy;
  const angle = (Math.atan2(targetY - y, targetX - startX) * 180) / Math.PI;

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
        fontSize={size}
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
          d={`M ${-HEAD} ${-HEAD * 0.55} L 0 0 L ${-HEAD} ${HEAD * 0.55}`}
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
