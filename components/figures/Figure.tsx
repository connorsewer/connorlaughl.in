"use client";

import { useEffect, useRef, type ReactNode } from "react";

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
  children: ReactNode;
  className?: string;
};

function figId(num: number | string): string {
  return typeof num === "number" ? String(num).padStart(3, "0") : num;
}

export function Figure({
  num,
  title,
  groundTruth,
  caption,
  viewBox = "0 0 800 600",
  children,
  className,
}: FigureProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const id = figId(num);
  const titleId = `fig-${id}-title`;
  const descId = `fig-${id}-desc`;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let release: (() => void) | null = null;
    const draw = drawOnProgress(svg, {
      onProgress: (progress) => {
        if (progress >= drawOnProgressSpec.labelsAt) release?.();
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

    const stopDraw = drawOn(svg);
    const labels = labelSettle(svg, { trigger: "inView", delay: DURATION.short });
    return () => {
      stopDraw();
      labels();
    };
  }, []);

  return (
    <figure className={`w-full ${className ?? ""}`}>
      {/* The drawing sits on a gridded white plate; the page ground stays
          plain paper. See the reference cover, where every figure is drafted
          on graph paper inside the sheet. */}
      <div className="figure-plate flex items-stretch gap-2 p-4">
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
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="h-auto w-full flex-1"
        >
          <title id={titleId}>{title}</title>
          <desc id={descId}>{groundTruth}</desc>
          {children}
        </svg>

        <span
          aria-hidden="true"
          className="hidden shrink-0 self-start font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint/70 [writing-mode:vertical-rl] lg:block"
        >
          [ {title} ]
        </span>
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
