"use client";

import { useLenis } from "lenis/react";
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
 * The rail is also a scrub. A ruler that reports a position and cannot be used
 * to set one is a gauge; press anywhere on it and the document goes to that
 * position, drag and it tracks the pointer. The scrub writes scroll position
 * only, so the readout keeps being driven by the same `scroll()` binding and
 * there is no second source of truth for where the reader is.
 *
 * No keyboard path, deliberately. The rail is `aria-hidden` because the same
 * information is in the page structure, and a focusable control inside a
 * hidden subtree is worse than no control: it takes a tab stop and announces
 * nothing. Keyboard readers scroll the document, which is the same action.
 *
 * Reduced motion: the ticks render, the readout and the moving indicator do
 * not, and nothing is registered at all — no scroll binding, no observer, no
 * breathe. The scrub stays, because it follows input rather than running on a
 * clock, and it lands in one jump either way.
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
  const lenis = useLenis();
  const railRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);

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

  /* The scrub. Separate from the readout binding above because it is input,
     not animation: it survives the reduced-motion branch, and it must not be
     re-bound when the readout is. */
  useIsomorphicLayoutEffect(() => {
    const rail = railRef.current;
    const surface = scrubRef.current;
    if (!rail || !surface) return;

    /* Geometry is read on press and on each move, which is pointer input and
       not a scroll callback: the rail's own box is the only thing measured,
       and the browser has already laid it out by then. */
    const seek = (clientY: number) => {
      const box = rail.getBoundingClientRect();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (box.height <= 0 || max <= 0) return;
      const raw = (clientY - box.top) / box.height;
      const to = (raw < 0 ? 0 : raw > 1 ? 1 : raw) * max;
      /* Immediate, always. A scrub that eases lags the pointer that is
         setting it, and the ruler would stop reading the position the reader
         is holding. Lenis owns scroll wherever it is mounted, so going
         through it is what keeps its internal position from fighting this
         one; without it, a plain write is already the instant jump reduced
         motion asks for. */
      if (lenis) lenis.scrollTo(to, { immediate: true });
      else window.scrollTo({ top: to, behavior: "auto" });
    };

    const onMove = (event: PointerEvent) => seek(event.clientY);

    const onDown = (event: PointerEvent) => {
      /* Primary button only: a right-press on the rail belongs to the UA. */
      if (event.button !== 0) return;
      event.preventDefault();
      surface.setPointerCapture(event.pointerId);
      surface.addEventListener("pointermove", onMove);
      seek(event.clientY);
    };

    const onUp = (event: PointerEvent) => {
      surface.removeEventListener("pointermove", onMove);
      if (surface.hasPointerCapture(event.pointerId)) {
        surface.releasePointerCapture(event.pointerId);
      }
    };

    surface.addEventListener("pointerdown", onDown);
    surface.addEventListener("pointerup", onUp);
    surface.addEventListener("pointercancel", onUp);

    return () => {
      surface.removeEventListener("pointerdown", onDown);
      surface.removeEventListener("pointerup", onUp);
      surface.removeEventListener("pointercancel", onUp);
      surface.removeEventListener("pointermove", onMove);
    };
  }, [lenis]);

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

        {/* The grip. Wider than the ticks it covers, so the rail can be taken
            hold of without aiming at a 2.5px column, and `touch-action: none`
            so a drag on it scrubs instead of scrolling the page under it.
            Sits under the readout in paint order and carries no ink of its
            own: the affordance is the cursor. */}
        <div
          ref={scrubRef}
          data-ruler-scrub
          className="pointer-events-auto absolute right-2 top-0 h-full w-8 cursor-ns-resize"
          style={{ touchAction: "none" }}
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
