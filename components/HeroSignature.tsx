"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  /** CSS aspect-ratio string. Defaults to a near-square 4:5 portrait. */
  aspect?: string;
};

const WebGLHero = dynamic(() => import("./webgl/WebGLHero"), {
  ssr: false,
  loading: () => null,
});

/**
 * HeroSignature renders the figure shell (dither-frame, static img,
 * caption) on every paint. The OGL canvas is loaded as a separate chunk
 * and overlays the static image with a mouse-driven displacement.
 *
 * Reduced-motion users get the static image only; the WebGL chunk never
 * loads.
 *
 * No-WebGL users (or anyone whose context creation fails) keep the
 * static image because the canvas stays at opacity 0 until the OGL
 * effect reports ready.
 */
export function HeroSignature({ src, alt, caption, aspect = "4 / 5" }: Props) {
  const reduced = usePrefersReducedMotion();

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
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {!reduced && <WebGLHero src={src} alt={alt} />}
        </div>
      </div>
      {caption ? (
        <figcaption className="font-mono fig-num">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
