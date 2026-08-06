import {
  FIG_STROKE,
  IsoBox,
  isoPoint,
  type FigFill,
} from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";
import { SignalPacket } from "@/components/figures/SignalPacket";

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
  /**
   * Set false on a chain that depicts a structure rather than a flow, where a
   * travelling packet would claim movement the system does not have.
   */
  signal?: boolean;
  /** Phase index for the packet, so plates on one page do not beat together. */
  phase?: number;
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
  signal = true,
  phase = 0,
  className,
}: IsoChainProps) {
  const [sx, sy] = isoPoint(step, 0);
  const [cx, cy] = isoPoint(w / 2, d / 2, h);

  const origin = (i: number): [number, number] => [i * sx, i * sy];

  /* The run the packet travels: slab centres, in order. Same points the ties
     are struck between, so the mark rides the drawn line rather than a
     parallel one of its own. */
  const centres = nodes.map((_, i): [number, number] => {
    const [ox, oy] = origin(i);
    return [ox + cx, oy + cy];
  });

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
          /* `data-fig-node` is the hover unit: the slab, its gate outline and
             its callout are one part of the machine, so they light and lift
             together. Styled in the LIVING FIGURES block of app/globals.css
             off `nodeLiftSpec`. Pointer-only and it adds no tab stop — the
             effect only dims the peers, so the default state already carries
             everything a reader could learn by hovering. */
          <g data-fig-node key={node.label}>
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
          </g>
        );
      })}

      {/* Last, so the mark stays on top as it crosses a slab. */}
      {signal ? <SignalPacket points={centres} phase={phase} /> : null}
    </g>
  );
}
