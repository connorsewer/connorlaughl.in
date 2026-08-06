import {
  FIG_STROKE,
  IsoBox,
  isoPoint,
  type FigFill,
} from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * Exploded isometric stack.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, FIG_001 — slabs
 * pulled apart along the vertical, dashed construction lines running through
 * the outer corners to show how they seat, one mono leader label per layer.
 *
 * `layers` is ordered top of the stack first, the way the reader takes the
 * thing apart. Every layer must name a real component of the system being
 * drawn: the ground-truth rule in spec §5 applies to labels, not just to
 * captions.
 */

export type StackLayer = {
  /** Mono leader label. Must name a real part of the system. */
  label: string;
  fill?: FigFill;
  /** Slab thickness, when this layer is thicker or thinner than the rest. */
  h?: number;
};

export type ExplodedStackProps = {
  /** Top of the stack first. */
  layers: StackLayer[];
  /** Screen-space distance between layers. */
  gap?: number;
  /** Slab footprint in figure-space units. */
  w?: number;
  d?: number;
  /** Default slab thickness. */
  thickness?: number;
  /** Screen-space offset of the plate origin. */
  x?: number;
  y?: number;
  labelSide?: "left" | "right";
  className?: string;
};

/** Horizontal run of the leader from the plate edge out to the label. */
const LEADER = 56;

export function ExplodedStack({
  layers,
  gap = 112,
  w = 150,
  d = 110,
  thickness = 12,
  x = 0,
  y = 0,
  labelSide = "left",
  className,
}: ExplodedStackProps) {
  const heights = layers.map((layer) => layer.h ?? thickness);
  const offsets = layers.map((_, i) => i * gap);

  // Silhouette extremes: the plate's left corner is (0, d), the right is (w, 0).
  const [leftX] = isoPoint(0, d, 0);
  const [rightX] = isoPoint(w, 0, 0);

  const connectorCorners: Array<[number, number]> = [
    [0, d],
    [w, 0],
  ];

  return (
    <g transform={`translate(${x} ${y})`} className={className}>
      {/* Dashed construction ties between consecutive layers. */}
      {connectorCorners.map(([cx, cy]) =>
        layers.slice(0, -1).map((_, i) => {
          const [px, topOfNext] = isoPoint(cx, cy, heights[i + 1]);
          const [, bottomOfThis] = isoPoint(cx, cy, 0);
          return (
            <line
              key={`tie-${cx}-${cy}-${i}`}
              data-no-draw
              x1={px}
              y1={offsets[i] + bottomOfThis}
              x2={px}
              y2={offsets[i + 1] + topOfNext}
              stroke="var(--blueprint)"
              strokeWidth={FIG_STROKE}
              strokeDasharray="5 6"
              strokeOpacity={0.7}
              vectorEffect="non-scaling-stroke"
            />
          );
        }),
      )}

      {layers.map((layer, i) => (
        <IsoBox
          key={`slab-${layer.label}`}
          w={w}
          d={d}
          h={heights[i]}
          fill={layer.fill ?? "none"}
          y={offsets[i]}
        />
      ))}

      {layers.map((layer, i) => {
        const anchorCorner = labelSide === "left" ? ([0, d] as const) : ([w, 0] as const);
        const [, topY] = isoPoint(anchorCorner[0], anchorCorner[1], heights[i]);
        const [, bottomY] = isoPoint(anchorCorner[0], anchorCorner[1], 0);
        const targetY = offsets[i] + (topY + bottomY) / 2;
        const edgeX = labelSide === "left" ? leftX : rightX;
        const labelX = labelSide === "left" ? edgeX - LEADER : edgeX + LEADER;

        return (
          <LeaderLabel
            key={`label-${layer.label}`}
            x={labelX}
            y={targetY}
            dx={labelSide === "left" ? LEADER : -LEADER}
            dy={0}
            text={layer.label}
          />
        );
      })}
    </g>
  );
}
