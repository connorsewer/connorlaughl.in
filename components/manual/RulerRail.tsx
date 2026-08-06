"use client";

import { scroll } from "motion";
import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { prefersReducedMotion, rulerBreathe } from "@/lib/motion-manual";

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
 * (the same information is in the page structure). It starts below the
 * masthead so the readout and the masthead nav never share a y band.
 *
 * The readout rides on `transform: translateY()` driven by motion's `scroll()`
 * and never writes a layout property. The rail height it travels across is
 * measured by a `ResizeObserver`, so nothing reads geometry inside the scroll
 * callback. There is no hand-rolled `rAF` loop and no `top` write per frame.
 *
 * Reduced motion: the ticks render, the readout and the moving indicator do
 * not, and nothing is registered at all — no scroll binding, no observer, no
 * breathe.
 */

/** Tick pitch in px. Fine enough to read as a rule rather than as a list. */
const PITCH = 10;
/** Neutral tick ink: the rule is furniture, not blueprint working ink. */
const TICK = "color-mix(in srgb, var(--body-ink) 27%, transparent)";
/**
 * Share of the rail the readout travels across. The remaining 4% is the top
 * inset it starts from, held so the readout never clips off either end.
 */
const TRAVEL = 0.96;

export function RulerRail() {
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    /* Both checks, deliberately. The hook can still be reporting its server
       fallback on the first client pass, and one pass is enough to register a
       binding that this branch is not allowed to have. The imperative check
       reads the media query directly and closes that window. */
    if (reduced || prefersReducedMotion()) return;
    const rail = railRef.current;
    const readout = readoutRef.current;
    const value = valueRef.current;
    if (!rail || !readout || !value) return;

    /* Measured here and on resize, never in the scroll callback. */
    let travel = rail.clientHeight * TRAVEL;
    const observer = new ResizeObserver(() => {
      travel = rail.clientHeight * TRAVEL;
    });
    observer.observe(rail);

    let shown = "";
    const stopScroll = scroll((progress: number) => {
      const p = progress < 0 ? 0 : progress > 1 ? 1 : progress;
      readout.style.transform = `translateY(calc(-50% + ${p * travel}px))`;
      const next = p.toFixed(2);
      if (next !== shown) {
        shown = next;
        value.textContent = next;
      }
    });

    const stopBreathe = rulerBreathe(readout);

    return () => {
      observer.disconnect();
      stopScroll();
      stopBreathe();
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      data-xray="ruler"
      className="pointer-events-none fixed right-0 top-[4.5rem] z-30 hidden h-[calc(100vh-4.5rem)] w-16 select-none lg:block"
    >
      <div ref={railRef} className="relative h-full pr-4">
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
            ref={readoutRef}
            data-ruler-readout
            // Held inside the rail so the readout never clips off the top or
            // bottom edge at the ends of the scroll. The 2% inset is CSS, so
            // the resting position is right before a single frame runs.
            className="absolute right-4 top-[2%] flex items-center gap-2"
            // `will-change` on the one fixed element that takes a transform
            // write every scroll frame; without it the rail re-rasterises
            // against the page behind it.
            style={{ transform: "translateY(-50%)", willChange: "transform" }}
          >
            <span
              ref={valueRef}
              className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-blueprint"
            >
              0.00
            </span>
            <span className="block h-px w-5 bg-blueprint" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
