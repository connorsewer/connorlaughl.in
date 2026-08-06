"use client";

import { useEffect, useRef, type RefObject } from "react";

import type { FigureScale } from "@/components/figures/FigureScale";
import { plateCrosshairSpec } from "@/lib/motion-manual";

/**
 * The drafting cursor a plate wears under a fine pointer.
 *
 * Two hairlines spanning the plate, tracking the pointer, plus a mono chip
 * reading the pointer's position in the plate's own unit space. It is the
 * drawing's own instrument: a reader moving across a figure gets the same
 * readout a draftsman would get off a rule, which is what makes a static
 * diagram feel like a document you can measure.
 *
 * The readout is structural, not a claim. It reports the plate's coordinate
 * grid, the same class of numeral as `FIG_003` or a step ordinal, and it is
 * computed at runtime from pointer position, so it never touches the claim
 * gate in content/proof-metrics.ts.
 *
 * It follows input rather than running on a clock, so it is NOT cut under
 * reduced motion: suppressing it would take away a cursor, not an animation,
 * and nothing about it moves on its own. It is cut on coarse pointers, where
 * there is no cursor to draft with, and on plates that have dropped their
 * callouts, where there is no room for a chip.
 *
 * Performance contract: the only geometry read is one `getBoundingClientRect`
 * on the `<svg>`, taken on pointer enter and re-taken on the first move after
 * a scroll or resize marks it stale. The scroll and resize handlers set a flag
 * and read nothing. Every move writes attributes and one inline opacity, and
 * React never re-renders — the component mounts once and the effect owns the
 * DOM from then on.
 */

export type PlateCrosshairProps = {
  /** The element the pointer is tracked over. Catches moves over empty paper. */
  plateRef: RefObject<HTMLElement | null>;
  /** The plate itself, for its rect and its unit space. */
  svgRef: RefObject<SVGSVGElement | null>;
  /** Plate scale, for sizing the chip in CSS pixels. Null before first measure. */
  scale: FigureScale | null;
};

/** Chip padding as a share of its type size. */
const CHIP_PAD_X = 0.6;
const CHIP_PAD_Y = 0.5;
/** Mono advance width as a share of type size. Geist Mono is 0.6em. */
const MONO_ADVANCE = 0.6;

export function PlateCrosshair({ plateRef, svgRef, scale }: PlateCrosshairProps) {
  const rootRef = useRef<SVGGElement | null>(null);
  const vRef = useRef<SVGLineElement | null>(null);
  const hRef = useRef<SVGLineElement | null>(null);
  const chipRef = useRef<SVGGElement | null>(null);
  const chipBoxRef = useRef<SVGRectElement | null>(null);
  const chipTextRef = useRef<SVGTextElement | null>(null);

  const unitsPerCssPx = scale?.unitsPerCssPx ?? 1;
  const visible = scale?.labelsVisible ?? false;

  useEffect(() => {
    const plate = plateRef.current;
    const svg = svgRef.current;
    const root = rootRef.current;
    const vline = vRef.current;
    const hline = hRef.current;
    const chip = chipRef.current;
    const chipBox = chipBoxRef.current;
    const chipText = chipTextRef.current;

    if (!plate || !svg || !root || !vline || !hline || !chip || !chipBox || !chipText) return;
    if (!visible) return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (!window.matchMedia(plateCrosshairSpec.pointerQuery).matches) return;

    const box = svg.viewBox?.baseVal;
    if (!box || box.width <= 0 || box.height <= 0) return;

    const type = plateCrosshairSpec.chipPx * unitsPerCssPx;
    const gap = plateCrosshairSpec.chipGap * unitsPerCssPx;
    const padX = type * CHIP_PAD_X;
    const padY = type * CHIP_PAD_Y;

    /* Hairlines are authored across the whole viewBox and only ever
       translated, so nothing about them is re-laid out on a move. */
    vline.setAttribute("x1", `${box.x}`);
    vline.setAttribute("x2", `${box.x}`);
    vline.setAttribute("y1", `${box.y}`);
    vline.setAttribute("y2", `${box.y + box.height}`);
    hline.setAttribute("x1", `${box.x}`);
    hline.setAttribute("x2", `${box.x + box.width}`);
    hline.setAttribute("y1", `${box.y}`);
    hline.setAttribute("y2", `${box.y}`);

    let rect: DOMRect | null = null;
    let stale = true;
    let shown = false;

    const markStale = () => {
      stale = true;
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!rect || stale) {
        rect = svg.getBoundingClientRect();
        stale = false;
      }
      if (rect.width <= 0 || rect.height <= 0) return;

      /* Plates are `xMidYMid meet`, so the drawing is uniformly scaled and
         centred inside the element box; both letterbox bands have to come off
         before the pointer can be read in plate units. */
      const fit = Math.min(rect.width / box.width, rect.height / box.height);
      const padLeft = (rect.width - box.width * fit) / 2;
      const padTop = (rect.height - box.height * fit) / 2;

      const ux = box.x + (event.clientX - rect.left - padLeft) / fit;
      const uy = box.y + (event.clientY - rect.top - padTop) / fit;

      if (
        ux < box.x ||
        ux > box.x + box.width ||
        uy < box.y ||
        uy > box.y + box.height
      ) {
        if (shown) {
          shown = false;
          root.style.opacity = "0";
        }
        return;
      }

      if (!shown) {
        shown = true;
        root.style.opacity = "1";
      }

      vline.setAttribute("transform", `translate(${(ux - box.x).toFixed(2)} 0)`);
      hline.setAttribute("transform", `translate(0 ${(uy - box.y).toFixed(2)})`);

      /* Plate units, read from the plate's own top-left rather than from the
         viewBox origin: plates pan their viewBox to frame their callouts, so
         raw user coordinates run negative and a rule that reads negative is a
         rule nobody would draft with. Structural numerals throughout — the
         plate's grid, never a claim. */
      const readout = `X ${Math.round(ux - box.x)}  Y ${Math.round(uy - box.y)}`;
      if (chipText.textContent !== readout) {
        chipText.textContent = readout;
        chipBox.setAttribute(
          "width",
          `${(readout.length * MONO_ADVANCE * type + padX * 2).toFixed(2)}`,
        );
      }

      /* Flipped near the far edges so the chip is always on the paper. */
      const chipW = readout.length * MONO_ADVANCE * type + padX * 2;
      const chipH = type + padY * 2;
      const right = ux + gap + chipW <= box.x + box.width;
      const below = uy + gap + chipH <= box.y + box.height;
      const cx = right ? ux + gap : ux - gap - chipW;
      const cy = below ? uy + gap : uy - gap - chipH;
      chip.setAttribute("transform", `translate(${cx.toFixed(2)} ${cy.toFixed(2)})`);
    };

    const leave = () => {
      shown = false;
      root.style.opacity = "0";
      stale = true;
    };

    const enter = () => {
      rect = svg.getBoundingClientRect();
      stale = false;
    };

    plate.addEventListener("pointerenter", enter);
    plate.addEventListener("pointermove", move);
    plate.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", markStale, { passive: true });
    window.addEventListener("resize", markStale, { passive: true });

    return () => {
      plate.removeEventListener("pointerenter", enter);
      plate.removeEventListener("pointermove", move);
      plate.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", markStale);
      window.removeEventListener("resize", markStale);
      root.style.opacity = "0";
    };
  }, [plateRef, svgRef, unitsPerCssPx, visible]);

  if (!visible) return null;

  const type = plateCrosshairSpec.chipPx * unitsPerCssPx;

  return (
    <g
      ref={rootRef}
      data-plate-crosshair
      aria-hidden="true"
      opacity={0}
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <line
        ref={vRef}
        data-no-draw
        stroke="var(--blueprint)"
        strokeOpacity={plateCrosshairSpec.hairOpacity}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <line
        ref={hRef}
        data-no-draw
        stroke="var(--blueprint)"
        strokeOpacity={plateCrosshairSpec.hairOpacity}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <g ref={chipRef}>
        {/* Chrome, not drawing: the chip sits on the plate surface so the
            readout stays legible over ink, which is why it fills with
            `--sheet` rather than with a `--fig-*` token. */}
        <rect
          ref={chipBoxRef}
          data-no-draw
          x={0}
          y={0}
          width={0}
          height={type + type * CHIP_PAD_Y * 2}
          fill="var(--sheet)"
          stroke="var(--blueprint)"
          strokeOpacity={0.35}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <text
          ref={chipTextRef}
          x={type * CHIP_PAD_X}
          y={type * CHIP_PAD_Y + type * 0.5}
          dominantBaseline="middle"
          fill="var(--blueprint)"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          fontSize={type}
          letterSpacing="0.08em"
        />
      </g>
    </g>
  );
}
