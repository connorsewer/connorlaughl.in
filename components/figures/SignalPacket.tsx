"use client";

import { useEffect, useRef } from "react";

import { useFigureScale } from "@/components/figures/FigureScale";
import { FIG_STROKE } from "@/components/figures/IsoBox";
import { PLATE_DRAWN_ATTR, PLATE_DRAWN_EVENT } from "@/components/figures/plate-signal";
import { signalPacket, signalPacketSpec, type PacketPoint } from "@/lib/motion-manual";

/**
 * The mark that travels a chain: one small drawn square running node to node
 * on a slow loop, so the plate depicts a system that is operating rather than
 * one that has been switched off.
 *
 * It is drawn the way everything else on a plate is drawn — blueprint stroke
 * at 1.25, no fill, non-scaling — because a filled or glowing dot would be a
 * dashboard particle rather than a mark on a drawing. At `sizePx` it reads as
 * a tick that moves, which is the whole intent: the machine hums.
 *
 * Timing, opacity and phase all come from `signalPacketSpec`.
 *
 * Two things gate it. It never starts before its plate has finished drawing —
 * `Figure` stamps the plate and fires `PLATE_DRAWN_EVENT`, and neither happens
 * under reduced motion, so the reduced-motion plate is a complete static
 * drawing with nothing moving on it. And the mark renders at opacity 0, which
 * is also its server-rendered state, so a plate that never releases it never
 * shows a stray square parked on a node.
 */

export type SignalPacketProps = {
  /** Node centres in plate user units, in the order the signal travels. */
  points: readonly PacketPoint[];
  /**
   * Phase index. Plates on the same page pass different values so their
   * packets do not beat in unison, which would read as choreography.
   */
  phase?: number;
};

export function SignalPacket({ points, phase = 0 }: SignalPacketProps) {
  const ref = useRef<SVGGElement | null>(null);
  const { unitsPerCssPx } = useFigureScale();

  /* Serialized so the effect re-runs when a plate's geometry actually changes
     rather than on every parent render, which would restart the loop. */
  const key = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join("|");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const svg = el.ownerSVGElement;
    if (!svg) return;

    const track = points;
    let stop: (() => void) | null = null;

    const start = () => {
      stop?.();
      stop = signalPacket(el, track, {
        phase: (phase % signalPacketSpec.phaseCount) * signalPacketSpec.phase,
      });
    };

    if (svg.hasAttribute(PLATE_DRAWN_ATTR)) {
      start();
    } else {
      svg.addEventListener(PLATE_DRAWN_EVENT, start, { once: true });
    }

    return () => {
      svg.removeEventListener(PLATE_DRAWN_EVENT, start);
      stop?.();
    };
    // `key` stands in for `points`, which is a new array on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, phase]);

  const size = signalPacketSpec.sizePx * unitsPerCssPx;

  return (
    <g ref={ref} data-signal-packet opacity={0} aria-hidden="true">
      <rect
        data-no-draw
        x={-size / 2}
        y={-size / 2}
        width={size}
        height={size}
        fill="none"
        stroke="var(--blueprint)"
        strokeWidth={FIG_STROKE}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}
