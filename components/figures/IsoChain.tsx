import { Fragment } from "react";

import {
  FIG_STROKE,
  IsoBox,
  isoPoint,
  type FigFill,
} from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * Sequence primitive: slabs marching along the isometric x axis, tied by
 * dashed construction lines, each named by a mono leader label hanging off the
 * left of the run.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, the pipeline
 * plates — where `ExplodedStack` says "these layers sit on each other", this
 * says "this happens, then this". Same ink, same fills, same label voice.
 *
 * A stage marked `gate` is drawn twice: a second outline offset above the
 * slab, which is how the plate shows a step that holds work rather than
 * passing it through.
 */

export type ChainNode = {
  /** Mono leader label. Must name a real stage of the system. */
  label: string;
  fill?: FigFill;
  /** Draws the double outline used for a hold-and-approve step. */
  gate?: boolean;
};

export type IsoChainProps = {
  nodes: ChainNode[];
  /** Figure-space distance between consecutive slabs along the x axis. */
  step?: number;
  /** Slab footprint and thickness. */
  w?: number;
  d?: number;
  h?: number;
  /** Screen-space offset of the run's origin. */
  x?: number;
  y?: number;
  /** Screen-space distance from a slab's origin out to its label. */
  labelRun?: number;
  className?: string;
};

export function IsoChain({
  nodes,
  step = 150,
  w = 110,
  d = 80,
  h = 14,
  x = 0,
  y = 0,
  labelRun = 128,
  className,
}: IsoChainProps) {
  const [sx, sy] = isoPoint(step, 0);
  const [cx, cy] = isoPoint(w / 2, d / 2, h);

  const origin = (i: number): [number, number] => [i * sx, i * sy];

  return (
    <g transform={`translate(${x} ${y})`} className={className}>
      {/* Ties first, so the slabs sit on top of them. */}
      {nodes.slice(0, -1).map((node, i) => {
        const [ax, ay] = origin(i);
        const [bx, by] = origin(i + 1);
        return (
          <line
            key={`tie-${node.label}`}
            data-no-draw
            x1={ax + cx}
            y1={ay + cy}
            x2={bx + cx}
            y2={by + cy}
            stroke="var(--blueprint)"
            strokeWidth={FIG_STROKE}
            strokeDasharray="5 6"
            strokeOpacity={0.7}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {nodes.map((node, i) => {
        const [ox, oy] = origin(i);
        return (
          <Fragment key={node.label}>
            <IsoBox w={w} d={d} h={h} fill={node.fill ?? "none"} x={ox} y={oy} />

            {node.gate ? (
              <IsoBox w={w} d={d} h={h * 0.55} fill="none" x={ox} y={oy - h - 16} />
            ) : null}

            <LeaderLabel
              x={ox - labelRun}
              y={oy + 62}
              dx={labelRun + cx}
              dy={cy - 62}
              text={node.label}
            />
          </Fragment>
        );
      })}
    </g>
  );
}
