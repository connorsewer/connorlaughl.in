"use client";

import { useRef, useState, type ReactNode } from "react";

import {
  AUTHORED_SCALE,
  FigureScaleContext,
  type FigureScale,
} from "@/components/figures/FigureScale";
import { PlateCrosshair } from "@/components/figures/PlateCrosshair";
import { PLATE_DRAWN_ATTR, PLATE_DRAWN_EVENT } from "@/components/figures/plate-signal";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { DURATION } from "@/lib/motion";
import { drawOn, drawOnProgress, drawOnProgressSpec, labelSettle } from "@/lib/motion-manual";

/**
 * Figure plate: the frame every diagram on the site sits in.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, FIG_001 — the
 * plate carries two rotated mono side captions, `FIG_00N` reading up the left
 * edge and `[ SUBJECT ]` reading down the right, with the drawing between
 * them. The source stamps a `© year` in the corner; we do not (spec §1b:
 * fabricated patina).
 *
 * Accessibility contract (spec §5): the drawing is `role="img"` with a
 * `<title>` naming it and a `<desc>` naming the real artifact it depicts, and
 * the visible caption states the figure's claim in words. Recruiters paste
 * URLs into language models and screen-reader users get the same claim as
 * everyone else, so the claim never lives only in the picture.
 *
 * The rotated rails carry the figure id and its subject and are furniture;
 * they collapse below `lg`, where the caption under the plate says the same
 * thing in reading order.
 *
 * This is a client component so the plate can draw itself in. SVG children
 * passed in from a server page stay server-rendered.
 *
 * Which draw it gets is decided at mount, not authored per plate. A plate
 * that starts below the fold binds its strokes to scroll and settles its
 * leader labels when that draw is nearly done; a plate the reader is already
 * looking at has no scroll distance to draw across, so it takes the one-shot
 * draw and settles its labels on viewport enter. Strokes are the only thing
 * bound to scroll anywhere on the site, and nothing un-animates on scroll-up.
 *
 * Reduced motion: neither runner registers anything, the strokes stand as
 * authored, and the labels are written to their final state.
 */

export type FigureProps = {
  /** Registry number. `1` and `"001"` both render as FIG_001. */
  num: number | string;
  /** Short subject name. Renders as the `[ SUBJECT ]` side caption. */
  title: string;
  /** The real artifact or system this depicts. Becomes the SVG `<desc>`. */
  groundTruth: string;
  /** The claim the figure makes, in words. Visible under the plate. */
  caption: string;
  /** SVG user space. Primitives draw around the origin, so plates usually pan. */
  viewBox?: string;
  /**
   * The rotated right `[ SUBJECT ]` rail. Off where the same words already sit
   * within a glance of the plate (a mount that repeats the subject in its own
   * heading) or where the plate is too narrow to spend a column on furniture.
   * The left `FIG_0NN` rail is not affected: it carries the only id the plate
   * has in its own margin.
   */
  showSubjectRail?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * What a numbered plate component accepts from its mount site.
 *
 * A plate owns its own drawing, subject and caption, so the only thing a page
 * gets to decide is how much margin furniture the plate wears there.
 */
export type PlateProps = Pick<FigureProps, "showSubjectRail">;

function figId(num: number | string): string {
  return typeof num === "number" ? String(num).padStart(3, "0") : num;
}

/**
 * Rendered plate width under which the callouts come off.
 *
 * Below this the wide plates cannot hold their labels at a readable size —
 * FIG_004's ran at 3.5 CSS px on a 390px phone, which is texture rather than
 * type. The `<figcaption>` states the claim in words at every width, so the
 * drawing loses its annotation and the reader loses nothing.
 */
const LABEL_MIN_PLATE_PX = 420;

/** Slack held back from the viewBox edge when sizing a label, CSS px. */
const LABEL_EDGE_PAD = 2;

/**
 * Rendered plate width under which the `[ SUBJECT ]` rail comes off.
 *
 * The rail is furniture that repeats the `<figcaption>`, and on a plate this
 * narrow the column it costs is drawing width. The id rail stays: it is the
 * only place the plate names its own number in the margin.
 */
const SUBJECT_RAIL_MIN_PLATE_PX = 480;

/**
 * How far the plate's labels may grow before one of them clips.
 *
 * Read once, from the authored geometry, so the result is a ratio in plate
 * units and holds at any viewport. A label anchored `end` grows leftward and
 * one anchored `start` grows rightward; either way the arrow target stays
 * put, so the only thing that can run out of room is the text itself.
 */
function measureLabelCap(svg: SVGSVGElement): number {
  const plate = svg.getBoundingClientRect();
  if (plate.width <= 0) return 1;

  let cap = Number.POSITIVE_INFINITY;
  svg.querySelectorAll<SVGTextElement>("[data-leader-group] text").forEach((label) => {
    const box = label.getBoundingClientRect();
    if (box.width <= 0) return;

    const left = box.left - plate.left;
    const right = plate.right - box.right;
    const anchor = label.getAttribute("text-anchor");
    const room =
      anchor === "end" ? left : anchor === "start" ? right : 2 * Math.min(left, right);
    let allowed = 1 + Math.max(0, room - LABEL_EDGE_PAD) / box.width;

    if (box.height > 0) {
      const vertical = 2 * Math.min(box.top - plate.top, plate.bottom - box.bottom);
      allowed = Math.min(allowed, 1 + Math.max(0, vertical - LABEL_EDGE_PAD) / box.height);
    }

    cap = Math.min(cap, allowed);
  });

  return Number.isFinite(cap) ? Math.max(1, cap) : 1;
}

export function Figure({
  num,
  title,
  groundTruth,
  caption,
  viewBox = "0 0 800 600",
  showSubjectRail = true,
  children,
  className,
}: FigureProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const plateRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<number | null>(null);
  const [scale, setScale] = useState<FigureScale | null>(null);
  const [fittedBox, setFittedBox] = useState<string | null>(null);
  const [narrowPlate, setNarrowPlate] = useState(false);
  const labelsOff = scale !== null && !scale.labelsVisible;
  const subjectRail = showSubjectRail && !narrowPlate;
  const id = figId(num);
  const titleId = `fig-${id}-title`;
  const descId = `fig-${id}-desc`;

  /* Measured before paint, so the reader never sees the authored size first.
     The cap is read on the first pass only, while the labels are still at
     their authored scale; it is a property of the drawing, not of the
     viewport, so it never needs re-reading. */
  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const read = () => {
      const box = svg.viewBox?.baseVal;
      const rect = svg.getBoundingClientRect();
      if (capRef.current === null) capRef.current = measureLabelCap(svg);
      setNarrowPlate(rect.width > 0 && rect.width < SUBJECT_RAIL_MIN_PLATE_PX);

      const unitsPerCssPx =
        box && box.width > 0 && box.height > 0 && rect.width > 0 && rect.height > 0
          ? Math.max(box.width / rect.width, box.height / rect.height)
          : 1;

      setScale((current) => {
        const next: FigureScale = {
          unitsPerCssPx,
          labelScaleCap: capRef.current ?? 1,
          labelsVisible: rect.width === 0 || rect.width >= LABEL_MIN_PLATE_PX,
        };
        if (
          current &&
          current.unitsPerCssPx === next.unitsPerCssPx &&
          current.labelScaleCap === next.labelScaleCap &&
          current.labelsVisible === next.labelsVisible
        ) {
          return current;
        }
        return next;
      });
    };

    read();
    const observer = new ResizeObserver(read);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  /* A plate's viewBox is drawn around its callouts, so taking them off leaves
     the drawing pushed into one corner against a third of a plate of empty
     paper. Refitting to what is still drawn recentres it and hands the phone a
     larger drawing than the desktop column gets, which is the right trade when
     the annotation has gone. Measured with the callouts already removed. */
  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (!labelsOff) {
      setFittedBox(null);
      return;
    }
    let box: DOMRect;
    try {
      box = svg.getBBox();
    } catch {
      return;
    }
    if (box.width <= 0 || box.height <= 0) return;
    const pad = Math.max(box.width, box.height) * 0.03;
    setFittedBox(
      [box.x - pad, box.y - pad, box.width + pad * 2, box.height + pad * 2]
        .map((n) => n.toFixed(2))
        .join(" "),
    );
  }, [labelsOff]);

  /* Held until the label pass has committed: the runners collect the plate's
     shapes once, and at a width where the callouts come off they are not part
     of the drawing. Re-keyed on that decision so a resize across the
     threshold re-collects rather than parking shapes that no longer exist. */
  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !scale) return;

    /* The plate announces that it is finished so anything that must not run
       over the draw-on — the signal packets, today — can start. Stamped on the
       `<svg>` for a consumer that mounted late, and fired as an event for one
       that is already listening. Never reached under reduced motion, because
       neither draw runner registers there, which is what keeps a
       reduced-motion plate a complete drawing with nothing moving on it. */
    const markDrawn = () => {
      if (svg.hasAttribute(PLATE_DRAWN_ATTR)) return;
      svg.setAttribute(PLATE_DRAWN_ATTR, "");
      svg.dispatchEvent(new CustomEvent(PLATE_DRAWN_EVENT));
    };

    let release: (() => void) | null = null;
    const draw = drawOnProgress(svg, {
      onProgress: (progress) => {
        if (progress >= drawOnProgressSpec.labelsAt) release?.();
        if (progress >= 1) markDrawn();
      },
    });

    if (draw.bound) {
      const labels = labelSettle(svg, { trigger: "manual" });
      release = labels.release;
      return () => {
        draw();
        labels();
      };
    }

    const stopDraw = drawOn(svg, { onDrawn: markDrawn });
    const labels = labelSettle(svg, { trigger: "inView", delay: DURATION.short });
    return () => {
      stopDraw();
      labels();
    };
  }, [scale !== null, scale?.labelsVisible, fittedBox]);

  return (
    <figure className={`w-full ${className ?? ""}`}>
      {/* The drawing sits on a gridded white plate; the page ground stays
          plain paper. See the reference cover, where every figure is drafted
          on graph paper inside the sheet. */}
      <div ref={plateRef} data-xray="plate" className="figure-plate flex items-stretch gap-2 p-4">
        <span
          aria-hidden="true"
          className="hidden shrink-0 self-start font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint/70 [writing-mode:vertical-rl] rotate-180 lg:block"
        >
          FIG_{id}
        </span>

        <svg
          ref={svgRef}
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descId}
          viewBox={fittedBox ?? viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-full flex-1"
        >
          <title id={titleId}>{title}</title>
          <desc id={descId}>{groundTruth}</desc>
          <FigureScaleContext.Provider value={scale ?? AUTHORED_SCALE}>
            {children}
          </FigureScaleContext.Provider>
          {/* Last child, so the hairlines read over the drawing rather than
              under it. Carries `pointer-events: none`, so hovering a node
              still reaches the node. */}
          <PlateCrosshair plateRef={plateRef} svgRef={svgRef} scale={scale} />
        </svg>

        {subjectRail ? (
          <span
            aria-hidden="true"
            className="hidden shrink-0 self-start font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint/70 [writing-mode:vertical-rl] lg:block"
          >
            [ {title} ]
          </span>
        ) : null}
      </div>

      <figcaption className="mt-4 flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint">
          FIG_{id} [ {title} ]
        </span>
        <span className="font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/80">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
