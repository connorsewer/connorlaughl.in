"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { drawOn } from "@/lib/motion-manual";

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
 * This is a client component so the plate can draw itself in on viewport
 * enter. SVG children passed in from a server page stay server-rendered.
 * Reduced motion: `drawOn` returns without touching a single stroke.
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

  useEffect(() => drawOn(svgRef.current), []);

  return (
    <figure className={`w-full ${className ?? ""}`}>
      <div className="flex items-stretch gap-2">
        <span
          aria-hidden="true"
          className="shrink-0 self-start font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint/70 [writing-mode:vertical-rl] rotate-180"
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
          className="shrink-0 self-start font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint/70 [writing-mode:vertical-rl]"
        >
          [ {title} ]
        </span>
      </div>

      <figcaption className="mt-4 flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint">
          FIG_{id} [ {title} ]
        </span>
        <span className="font-mono text-[11px] leading-relaxed text-body-ink/75">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
