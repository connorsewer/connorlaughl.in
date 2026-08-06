/**
 * Motion primitives for the manual system.
 *
 * Additive to `lib/motion.ts`: that catalog stays untouched until its last
 * legacy consumer is converted. Everything here is new work for the manual
 * pages (spec §6): SVG stroke draw-on, sheet reveal, stat fill, wordmark
 * pixel reveal.
 *
 * Every runner is a client-side imperative helper that takes an element (or a
 * ref to one), applies the animation, and returns a cleanup function. Each one
 * checks `prefersReducedMotion()` first and, when reduced motion is requested,
 * writes the FINAL state synchronously and returns a no-op cleanup. Nothing
 * here ever leaves an element mid-animation for a reduced-motion visitor.
 *
 * The React-side equivalent of that check is `usePrefersReducedMotion()` in
 * hooks/useMediaQuery.ts; components that need to branch during render should
 * use the hook, and components that just want the animation should call these
 * runners from an effect.
 */

import { animate, inView } from "motion";
import type { RefObject } from "react";

import { DURATION, EASE, STAGGER, reducedMotionFallback } from "@/lib/motion";

/* ──────────────────────────── shared types ─────────────────────────── */

export type MotionTarget = Element | RefObject<Element | null> | null | undefined;

/** Cleanup handle. Safe to call more than once. */
export type MotionCleanup = () => void;

const NOOP: MotionCleanup = () => {};

function resolve(target: MotionTarget): Element | null {
  if (!target) return null;
  if (target instanceof Element) return target;
  return target.current ?? null;
}

/**
 * Reduced-motion check for imperative (non-React) code paths.
 * Returns `true` on the server so that anything running outside the browser
 * takes the final-state branch instead of trying to animate.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─────────────────────────── primitive specs ───────────────────────── */

/**
 * sheet-reveal — a white content sheet settling onto the ground.
 * opacity 0 → 1 with a 12px lift. Shorter and flatter than the legacy
 * `enterUp`: sheets are large surfaces and a long travel reads as a slide.
 */
export const sheetRevealSpec = {
  from: { opacity: 0, transform: "translateY(12px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  options: { duration: DURATION.short, ease: EASE.outQuart },
} as const;

/**
 * stat-fill — mono stat rows arriving one after another, left-anchored.
 * The value column reads as a readout coming up, so the travel is horizontal.
 */
export const statFillSpec = {
  from: { opacity: 0, transform: "translateX(-6px)" },
  to: { opacity: 1, transform: "translateX(0)" },
  options: { duration: DURATION.quick, ease: EASE.standard },
  perItem: STAGGER.med,
} as const;

/**
 * wordmark-reveal — the pixel wordmark coming up a glyph at a time.
 * Opacity only, tight stagger: pixel type shifted vertically looks broken.
 */
export const wordmarkRevealSpec = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  options: { duration: DURATION.quick, ease: EASE.standard },
  perItem: STAGGER.tight,
} as const;

/**
 * draw-on — SVG stroke dash travelling from empty to drawn.
 * Figures are line diagrams; drawing them in reads as the plate being
 * plotted. Timing is per-shape with a short cascade.
 */
export const drawOnSpec = {
  duration: DURATION.long,
  ease: EASE.outQuart,
  perItem: STAGGER.short,
} as const;

/* ─────────────────────────────── runners ───────────────────────────── */

/** Shapes whose stroke can be dash-drawn. */
const DRAWABLE = "path, line, polyline, polygon, circle, ellipse, rect";

type DrawOnOptions = {
  /** Total draw time per shape, seconds. */
  duration?: number;
  /** Gap between shapes, seconds. */
  stagger?: number;
  /** How much of the element must be visible before drawing. */
  amount?: number | "some" | "all";
  /**
   * Milliseconds after which an undrawn figure is revealed anyway.
   * A parked figure is an invisible figure, so the draw-on can never be the
   * only thing standing between a reader and the drawing.
   */
  failsafeMs?: number;
};

/**
 * Draws an SVG figure in on viewport enter by animating stroke dash offset.
 *
 * Shapes marked `data-no-draw` are skipped (use it for fills and for the
 * grid planes that should already be on the page when the drawing starts).
 * Reduced motion: strokes are left exactly as authored, and no observer is
 * registered.
 *
 * @param target the `<svg>` element, or a ref to it
 */
export function drawOn(target: MotionTarget, options: DrawOnOptions = {}): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const duration = options.duration ?? drawOnSpec.duration;
  const gap = options.stagger ?? drawOnSpec.perItem;

  const shapes = Array.from(el.querySelectorAll<SVGGeometryElement>(DRAWABLE)).filter(
    (shape) => !shape.hasAttribute("data-no-draw") && typeof shape.getTotalLength === "function",
  );
  if (shapes.length === 0) return NOOP;

  const lengths = shapes.map((shape) => {
    let length = 0;
    try {
      length = shape.getTotalLength();
    } catch {
      length = 0;
    }
    return length;
  });

  // Park every shape at "not yet drawn" before the observer fires.
  shapes.forEach((shape, i) => {
    if (lengths[i] <= 0) return;
    shape.style.strokeDasharray = `${lengths[i]}`;
    shape.style.strokeDashoffset = `${lengths[i]}`;
  });

  const clear = (shape: SVGGeometryElement) => {
    shape.style.strokeDasharray = "";
    shape.style.strokeDashoffset = "";
  };

  let drawn = false;
  const failsafe = window.setTimeout(() => {
    if (drawn) return;
    drawn = true;
    shapes.forEach(clear);
  }, options.failsafeMs ?? 2500);

  const stop = inView(
    el,
    () => {
      if (drawn) return;
      drawn = true;
      window.clearTimeout(failsafe);
      shapes.forEach((shape, i) => {
        if (lengths[i] <= 0) {
          clear(shape);
          return;
        }
        animate(
          shape,
          { strokeDashoffset: [lengths[i], 0] },
          { duration, ease: drawOnSpec.ease, delay: i * gap },
        ).finished.then(
          () => clear(shape),
          () => clear(shape),
        );
      });
    },
    { amount: options.amount ?? "some" },
  );

  return () => {
    window.clearTimeout(failsafe);
    stop();
    shapes.forEach(clear);
  };
}

/**
 * Reveals a content sheet on viewport enter.
 * Reduced motion: the sheet is written to its final state immediately.
 */
export function sheetReveal(
  target: MotionTarget,
  options: { delay?: number; amount?: number | "some" | "all" } = {},
): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;

  if (prefersReducedMotion()) {
    const final = reducedMotionFallback(sheetRevealSpec);
    animate(el, final.to, final.options);
    return NOOP;
  }

  let revealed = false;
  const stop = inView(
    el,
    () => {
      if (revealed) return;
      revealed = true;
      animate(el, sheetRevealSpec.from, { duration: 0 });
      animate(el, sheetRevealSpec.to, {
        ...sheetRevealSpec.options,
        delay: options.delay ?? 0,
      });
    },
    { amount: options.amount ?? 0.1 },
  );

  return () => stop();
}

/**
 * Staggers the rows of a stat table in on viewport enter.
 * Pass the table (or any container); direct rows are matched by
 * `[data-stat-row]`, falling back to element children.
 * Reduced motion: all rows are written to their final state immediately.
 */
export function statFill(
  target: MotionTarget,
  options: { stagger?: number } = {},
): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;

  const found = el.querySelectorAll("[data-stat-row]");
  const rows: Element[] =
    found.length > 0 ? Array.from(found) : Array.from(el.children);
  if (rows.length === 0) return NOOP;

  if (prefersReducedMotion()) {
    const final = reducedMotionFallback(statFillSpec);
    rows.forEach((row) => animate(row, final.to, final.options));
    return NOOP;
  }

  const gap = options.stagger ?? statFillSpec.perItem;

  let filled = false;
  const stop = inView(
    el,
    () => {
      if (filled) return;
      filled = true;
      rows.forEach((row, i) => {
        animate(row, statFillSpec.from, { duration: 0 });
        animate(row, statFillSpec.to, { ...statFillSpec.options, delay: i * gap });
      });
    },
    { amount: 0.2 },
  );

  return () => stop();
}

/**
 * Brings a pixel wordmark up a glyph at a time.
 * Glyphs are matched by `[data-glyph]`; if the caller has not split the
 * wordmark, the whole element is faded as one.
 * Reduced motion: final state, immediately.
 */
export function wordmarkReveal(
  target: MotionTarget,
  options: { stagger?: number } = {},
): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;

  const glyphs = el.querySelectorAll("[data-glyph]");
  const parts: Element[] = glyphs.length > 0 ? Array.from(glyphs) : [el];

  if (prefersReducedMotion()) {
    const final = reducedMotionFallback(wordmarkRevealSpec);
    parts.forEach((part) => animate(part, final.to, final.options));
    return NOOP;
  }

  const gap = options.stagger ?? wordmarkRevealSpec.perItem;

  parts.forEach((part, i) => {
    animate(part, wordmarkRevealSpec.from, { duration: 0 });
    animate(part, wordmarkRevealSpec.to, {
      ...wordmarkRevealSpec.options,
      delay: i * gap,
    });
  });

  return NOOP;
}
