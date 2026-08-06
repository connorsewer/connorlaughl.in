"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Right-edge ruler with a scroll readout.
 *
 * Reference crop: `docs/superpowers/reference/chapter-1440.png`, right edge —
 * a column of short grey ticks running the full height, with one longer
 * blueprint tick and a mono numeric readout (`0.00`) riding the scroll
 * position.
 *
 * Takes no props: it measures document scroll itself. Hidden below `lg`,
 * where there is no gutter to put it in, and hidden from assistive tech
 * (the same information is in the page structure).
 *
 * Reduced motion: the ticks render, the readout and the moving indicator do
 * not, and no scroll listener is attached.
 */

/** Tick pitch in px. Fine enough to read as a rule rather than as a list. */
const PITCH = 10;
/** Neutral tick ink: the rule is furniture, not blueprint working ink. */
const TICK = "color-mix(in srgb, var(--body-ink) 27%, transparent)";

export function RulerRail() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    const read = () => {
      frame.current = null;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-30 hidden h-screen w-16 select-none lg:block"
    >
      <div className="relative h-full pr-4">
        {/* Ticks as a repeating rule: fixed pitch at any viewport height, and
            no continuous hairline down the rail. */}
        <span
          className="absolute right-4 top-0 block h-full w-2.5"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, ${TICK} 0 1px, transparent 1px ${PITCH}px)`,
          }}
        />

        {!reduced ? (
          <div
            className="absolute right-4 flex items-center gap-2"
            // Held inside the rail so the readout never clips off the top or
            // bottom edge at the ends of the scroll.
            style={{ top: `${2 + progress * 96}%`, transform: "translateY(-50%)" }}
          >
            <span className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-blueprint">
              {progress.toFixed(2)}
            </span>
            <span className="block h-px w-5 bg-blueprint" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
