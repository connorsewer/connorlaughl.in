"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  poster?: string;
  className?: string;
  caption?: string;
};

export function HeroAsciiVideo({
  poster = "/hero/ascii-poster.jpg",
  className = "",
  caption = "[Fig. 01] WFH // ASCII Loop: CJL + Henry",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!videoRef.current) return;
    if (reducedMotion) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        /* autoplay policy may block, poster stays */
      });
    }
  }, [reducedMotion]);

  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="dither-frame w-full">
        <div className="frame-well relative aspect-[1024/1538] w-full overflow-hidden bg-ink">
          {reducedMotion ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="/hero/ascii.webm" type="video/webm" />
              <source src="/hero/ascii.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <figcaption className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/55">
        {caption}
      </figcaption>
    </figure>
  );
}
