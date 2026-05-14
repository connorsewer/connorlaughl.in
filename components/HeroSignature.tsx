"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export type HeroSlide = {
  src: string;
  alt: string;
  fig: string;
  caption: string;
};

type Props = {
  slides: HeroSlide[];
  /** Seconds per slide (includes the 1.5s cross-fade). */
  intervalSec?: number;
  /** CSS aspect-ratio string, e.g. "16 / 9". */
  aspect?: string;
};

const WebGLHero = dynamic(() => import("./webgl/WebGLHero"), {
  ssr: false,
  loading: () => null,
});

/**
 * HeroSignature renders a figure shell with a rolodex of base-art plates.
 * The first slide is the static-img / SSR fallback. The OGL canvas
 * crossfades through every slide on a `intervalSec` cadence via a
 * dither-sweep shader, and reports the active slide back so the caption
 * underneath swaps in lockstep.
 *
 * Reduced-motion users keep the first slide as a static image. The
 * WebGL chunk never loads.
 */
export function HeroSignature({
  slides,
  intervalSec = 5,
  aspect = "16 / 9",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const current = slides[active] ?? slides[0];

  // Stable reference for the projection passed to WebGLHero. Without this,
  // `slides.map(...)` would return a new array every render (including the
  // re-render fired by setActive), and WebGLHero's useEffect would tear
  // down + remount on every slide change, resetting the rolodex clock.
  const webglSlides = useMemo(
    () => slides.map((s) => ({ src: s.src, alt: s.alt })),
    [slides],
  );

  return (
    <figure className="flex flex-col gap-3 w-full">
      <div className="dither-frame w-full">
        <div
          className="frame-well relative w-full overflow-hidden bg-ink"
          style={{ aspectRatio: aspect }}
        >
          {/* Static fallback. Always rendered, always visible behind the canvas.
              When the WebGL canvas reports ready, it fades in on top. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[0]?.src}
            alt={slides[0]?.alt ?? ""}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {!reduced && slides.length > 0 && (
            <WebGLHero
              slides={webglSlides}
              intervalSec={intervalSec}
              onSlideChange={setActive}
            />
          )}
        </div>
      </div>
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55">
        <span className="fig-num">{current.fig}</span>
        <span aria-hidden="true">·</span>
        <span
          className="normal-case tracking-wide text-paper/65 transition-opacity duration-300"
          key={current.fig}
        >
          {current.caption}
        </span>
      </figcaption>
    </figure>
  );
}
