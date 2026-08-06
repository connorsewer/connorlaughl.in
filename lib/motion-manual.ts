/**
 * Motion primitives for the manual system.
 *
 * Additive to `lib/motion.ts`: that catalog stays untouched until its last
 * legacy consumer is converted. Everything here is new work for the manual
 * pages: SVG stroke draw-on (one-shot and scroll-linked), stat fill, stat
 * tick, leader-label settle, ruler breathe, wordmark pixel reveal.
 *
 * Motion ceiling (Wave C): constant but quiet. Figures draw themselves on
 * scroll, stats tick on entry, leader labels settle, the ruler breathes,
 * nothing blocks reading. Reduced motion is outcome-parity: the same finished
 * page, the same information, minus the transition into it.
 *
 * Performance budget: transform and opacity only, plus `stroke-dashoffset`
 * for draw-on. No width, height, top, left, or margin is ever animated. No
 * hand-rolled `rAF` scroll loop and no `getBoundingClientRect` inside a scroll
 * callback; scroll binding goes through motion's `scroll()` driver.
 *
 * Every runner is a client-side imperative helper that takes an element (or a
 * ref to one), applies the animation, and returns a cleanup function. Each one
 * checks `prefersReducedMotion()` first and, when reduced motion is requested,
 * writes the FINAL state synchronously and returns a no-op cleanup, without
 * registering an observer or a scroll binding. Nothing here ever leaves an
 * element mid-animation for a reduced-motion visitor.
 *
 * The React-side equivalent of that check is `usePrefersReducedMotion()` in
 * hooks/useMediaQuery.ts; components that need to branch during render should
 * use the hook, and components that just want the animation should call these
 * runners from an effect.
 */

import { animate, inView, scroll } from "motion";
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

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
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

/**
 * draw-on-progress — the same stroke draw, bound to scroll instead of to a
 * clock, for plates that start below the fold.
 *
 * The offsets are deliberate and are not a typo: both bounds sit on the
 * plate's own start edge, so a tall plate finishes drawing while its lower
 * half is still below the fold. Moving the second bound to `end` would make
 * a full-height plate finish only as it leaves.
 */
export const drawOnProgressSpec = {
  offset: ["start 0.9", "start 0.3"],
  /** Share of the scroll window given to the per-shape cascade. */
  lead: 0.35,
  /** Progress past which the plate's leader labels latch on. */
  labelsAt: 0.85,
} as const;

/**
 * stat-tick — a numeric readout counting to the value already in the DOM.
 * The animation never synthesizes a claim: it starts from a floor derived
 * from the final string and ends by restoring that string verbatim.
 */
export const statTickSpec = {
  duration: DURATION.medium,
  ease: EASE.outQuart,
  perItem: STAGGER.med,
} as const;

/**
 * label-settle — leader labels arriving as a group once their plate is on
 * screen. A 4px settle and nothing more; leader type that travels far reads
 * as a slide rather than as a label finding its place.
 */
export const labelSettleSpec = {
  from: { opacity: 0, transform: "translateY(4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  options: { duration: DURATION.short, ease: EASE.outQuart },
  perItem: STAGGER.med,
} as const;

/**
 * value-pulse — a recomputed readout re-inking itself.
 *
 * The planner's outputs change faster than a tween can be read, so the pulse
 * is the only signal that a keystroke landed. Opacity and transform only: the
 * earlier hand-rolled version also tweened `color`, which sits outside the
 * property budget this file holds to.
 */
export const valuePulseSpec = {
  from: { opacity: 0.55, transform: "scale(0.985)" },
  to: { opacity: 1, transform: "scale(1)" },
  options: { duration: DURATION.short, ease: EASE.outQuint },
} as const;

/**
 * ruler-breathe — ambient opacity oscillation on the ruler readout.
 *
 * Amplitude 0.06, which is under the threshold at which a reader notices a
 * change and starts watching for it. The period is 6s and is intentionally
 * outside `DURATION`: that scale is for transitions a reader waits through,
 * and an ambient loop is not one. Carries no state.
 */
export const rulerBreatheSpec = {
  keyframes: [1, 0.94, 1] as number[],
  period: 6,
  ease: "easeInOut" as const,
} as const;

/* ─────────────────────────────── runners ───────────────────────────── */

/** Shapes whose stroke can be dash-drawn. */
const DRAWABLE = "path, line, polyline, polygon, circle, ellipse, rect";

/**
 * Every shape in a plate that is allowed to draw, with its path length in
 * plate user units. `data-no-draw` opts a shape out (fills, and the grid
 * planes that should already be on the page when the drawing starts).
 */
function collectStrokes(el: Element): { shapes: SVGGeometryElement[]; lengths: number[] } {
  const shapes = Array.from(el.querySelectorAll<SVGGeometryElement>(DRAWABLE)).filter(
    (shape) => !shape.hasAttribute("data-no-draw") && typeof shape.getTotalLength === "function",
  );
  const lengths = shapes.map((shape) => {
    try {
      return shape.getTotalLength();
    } catch {
      return 0;
    }
  });
  return { shapes, lengths };
}

/**
 * CSS pixels a plate draws per user unit.
 *
 * Every stroke in a plate carries `non-scaling-stroke`, so the UA resolves
 * `stroke-dasharray` and `stroke-dashoffset` in the host coordinate space
 * while `getTotalLength()` still reports user units. The two disagree by
 * exactly this factor, and a dash written in the wrong space parks a leader
 * as a visible dashed line (scale > 1) or finishes its draw early (scale < 1).
 *
 * Measured at mount and on resize, never inside a scroll callback.
 */
function plateScale(el: Element): number {
  const svg = el instanceof SVGSVGElement ? el : el.closest("svg");
  const box = svg?.viewBox?.baseVal;
  if (!svg || !box || box.width <= 0 || box.height <= 0) return 1;
  const rect = svg.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return 1;
  /* Plates are `xMidYMid meet`, so the uniform scale is the smaller ratio. */
  return Math.min(rect.width / box.width, rect.height / box.height);
}

/** Path lengths in the space the UA will read the dash in. */
function dashLengths(lengths: number[], scale: number): number[] {
  return lengths.map((length) => length * scale);
}

/** Parks a shape at "not yet drawn". */
function park(shape: SVGGeometryElement, length: number): void {
  shape.style.strokeDasharray = `${length}`;
  shape.style.strokeDashoffset = `${length}`;
}

/** Returns a shape to its authored state: fully drawn, no inline dash. */
function unpark(shape: SVGGeometryElement): void {
  shape.style.strokeDasharray = "";
  shape.style.strokeDashoffset = "";
}

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

  const { shapes, lengths: userLengths } = collectStrokes(el);
  if (shapes.length === 0) return NOOP;

  let lengths = dashLengths(userLengths, plateScale(el));

  // Park every shape at "not yet drawn" before the observer fires.
  const parkAll = () => {
    shapes.forEach((shape, i) => {
      if (lengths[i] > 0) park(shape, lengths[i]);
    });
  };
  parkAll();

  const clear = unpark;

  let drawn = false;

  /* A plate that is resized before it is reached changes the space its dash
     is read in, so the park is re-measured rather than left stale. */
  const onResize = () => {
    if (drawn) return;
    lengths = dashLengths(userLengths, plateScale(el));
    parkAll();
  };
  window.addEventListener("resize", onResize, { passive: true });

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
      window.removeEventListener("resize", onResize);
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
    window.removeEventListener("resize", onResize);
    stop();
    shapes.forEach(clear);
  };
}

/* ───────────────────── scroll-linked draw-on ────────────────────────── */

/**
 * A cleanup that also reports whether it bound anything.
 * `bound: false` means the caller should run the one-shot `drawOn` instead.
 */
export type ScrollDrawHandle = MotionCleanup & { bound: boolean };

function drawHandle(fn: MotionCleanup, bound: boolean): ScrollDrawHandle {
  return Object.assign(fn, { bound });
}

/**
 * True when the element's top sits inside the first viewport, measured in
 * document coordinates rather than from the current scroll position, so a
 * deep-linked visitor gets the same answer as a visitor at the top.
 */
function isAboveFold(el: Element): boolean {
  return el.getBoundingClientRect().top + window.scrollY < window.innerHeight;
}

/**
 * The box the scroll driver measures a plate by.
 *
 * `scroll()` places its target by walking `offsetTop`/`offsetLeft` up the
 * offset-parent chain, and those are `HTMLElement` properties: an `<svg>`
 * reports `undefined` for both, so the target offset comes out `NaN` and every
 * tick writes an invalid dash that the UA discards. The plate wrapper is the
 * nearest real box and is also the visual unit the reader sees, so it is what
 * gets measured. The strokes still come from the `<svg>` itself.
 */
function scrollBox(el: Element): Element {
  return el instanceof SVGElement ? (el.parentElement ?? el) : el;
}

export type DrawOnProgressOptions = {
  /** Milliseconds after which an unbound driver stops holding the plate back. */
  failsafeMs?: number;
  /** Called with clamped scroll progress on every tick, and once with 1 on failsafe. */
  onProgress?: (progress: number) => void;
};

/**
 * Draws an SVG figure in against scroll position, for below-fold plates only.
 *
 * At mount the runner measures the plate. If its top is inside the first
 * viewport it binds nothing and returns `bound: false`, and the caller falls
 * back to the one-shot `drawOn`: a plate the reader is already looking at has
 * no scroll distance to draw across. Below-fold plates bind through motion's
 * `scroll()` driver, which is passive-listener based and does no layout work.
 *
 * On resize, a bound plate that has become above-fold drops its binding and
 * is forced to full draw. The re-measure happens on the resize event, never
 * inside the scroll callback.
 *
 * Reduced motion: no measurement, no `scroll()` registration, `bound: false`.
 * Strokes stay exactly as authored, which is fully drawn.
 */
export function drawOnProgress(
  target: MotionTarget,
  options: DrawOnProgressOptions = {},
): ScrollDrawHandle {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return drawHandle(NOOP, false);
  if (prefersReducedMotion()) return drawHandle(NOOP, false);
  if (isAboveFold(el)) return drawHandle(NOOP, false);

  const { shapes, lengths: userLengths } = collectStrokes(el);
  if (shapes.length === 0) return drawHandle(NOOP, false);

  let lengths = dashLengths(userLengths, plateScale(el));

  const { lead } = drawOnProgressSpec;
  const span = 1 - lead;
  const last = Math.max(1, shapes.length - 1);

  let ticked = false;
  let released = false;
  let progressAt = 0;

  /** Content is never left invisible because a driver did not fire. */
  const release = () => {
    if (released) return;
    released = true;
    shapes.forEach(unpark);
    options.onProgress?.(1);
  };

  /** Writes the dash for a given progress. No geometry is read here. */
  const write = (p: number) => {
    for (let i = 0; i < shapes.length; i += 1) {
      const length = lengths[i];
      if (length <= 0) continue;
      const start = (i / last) * lead;
      const local = clamp01((p - start) / span);
      shapes[i].style.strokeDasharray = `${length}`;
      shapes[i].style.strokeDashoffset = `${length * (1 - local)}`;
    }
  };

  // Parked at "not yet drawn" before the driver's first tick.
  write(0);

  const apply = (progress: number) => {
    ticked = true;
    if (released) return;
    const p = clamp01(progress);
    progressAt = p;
    /* A finished draw returns to the authored dash rather than holding an
       inline offset of zero, so nothing dashed is left overridden. */
    if (p >= 1) {
      release();
      return;
    }
    write(p);
    options.onProgress?.(p);
  };

  const stopScroll = scroll(apply, {
    target: scrollBox(el),
    offset: [...drawOnProgressSpec.offset],
  });

  const failsafe = window.setTimeout(() => {
    if (ticked) return;
    stopScroll();
    release();
  }, options.failsafeMs ?? 2500);

  /**
   * Second rescue, independent of the driver.
   *
   * The scroll window runs from `start 0.9` to `start 0.3`, so a plate needs
   * roughly 0.6 viewports of scroll past it to finish. A plate near the end of
   * a short document never gets that distance, and the driver's own failsafe
   * only covers the case where it never ticked at all. Without this, a
   * scroll-linked plate can hold its strokes part-drawn and its leader labels
   * at opacity 0 for as long as the reader sits there.
   *
   * `amount: "all"` is the conservative trigger: the reader has the whole
   * plate on screen and has had a beat to look at it. A plate taller than the
   * viewport never satisfies it, which is correct — its own height is the
   * scroll headroom the driver needs.
   */
  const stopSeen = inView(
    el,
    () => {
      const timer = window.setTimeout(() => {
        stopScroll();
        release();
      }, 1200);
      return () => window.clearTimeout(timer);
    },
    { amount: "all" },
  );

  const onResize = () => {
    if (released) return;
    if (isAboveFold(el)) {
      stopScroll();
      stopSeen();
      window.removeEventListener("resize", onResize);
      release();
      return;
    }
    /* Still below the fold: the plate changed size, so the dash space did
       too. Re-measure and re-write at the progress already reached. */
    lengths = dashLengths(userLengths, plateScale(el));
    write(progressAt);
  };
  window.addEventListener("resize", onResize, { passive: true });

  return drawHandle(() => {
    window.clearTimeout(failsafe);
    window.removeEventListener("resize", onResize);
    stopSeen();
    stopScroll();
    shapes.forEach(unpark);
  }, true);
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

  /* Parked before the observer, matching every other runner. `inView` at
     `amount: 0.2` fires with the table already a fifth on screen, so parking
     inside the callback showed the reader the finished rows, snapped them to
     empty, and faded them back. */
  rows.forEach((row) => animate(row, statFillSpec.from, { duration: 0 }));

  let filled = false;
  const stop = inView(
    el,
    () => {
      if (filled) return;
      filled = true;
      rows.forEach((row, i) => {
        animate(row, statFillSpec.to, { ...statFillSpec.options, delay: i * gap });
      });
    },
    { amount: 0.2 },
  );

  return () => stop();
}

/* ─────────────────────────────── stat tick ─────────────────────────── */

/**
 * The only shape of value that may tick, checked against the string already
 * in the DOM, which is the string `renderableProofMetrics()` resolved. Digits,
 * separators, a currency mark and a trailing plus. Anything with a letter in
 * it, an em-width word, or a range renders static.
 */
const TICKABLE = /^[\d,.$+]+$/;
/** Sub-parse of a value that passed `TICKABLE`. */
const TICK_PARTS = /^(\$?)([\d,.]+)(\+?)$/;

type TickPlan = {
  el: HTMLElement;
  /** The DOM-authored string, restored verbatim when the tick finishes. */
  final: string;
  from: number;
  to: number;
  decimals: number;
  grouped: boolean;
  prefix: string;
  suffix: string;
};

function planTick(el: HTMLElement): TickPlan | null {
  const final = (el.textContent ?? "").trim();
  if (!TICKABLE.test(final)) return null;
  const parts = TICK_PARTS.exec(final);
  if (!parts) return null;

  const [, prefix, digits, suffix] = parts;
  const bare = digits.replace(/,/g, "");
  const to = Number.parseFloat(bare);
  if (!Number.isFinite(to) || to <= 0) return null;

  const dot = bare.indexOf(".");
  if (dot !== bare.lastIndexOf(".")) return null;
  const decimals = dot === -1 ? 0 : bare.length - dot - 1;

  /* Floor. Counts start at zero. Currency holds its first significant digit
     constant, so a nine-figure value never reads as a two-figure one on its
     way up: it starts at the order of magnitude it ends in. */
  let from = 0;
  if (prefix === "$") {
    const magnitude = 10 ** Math.floor(Math.log10(to));
    from = Math.floor(to / magnitude) * magnitude;
    if (from >= to) from = 0;
  }

  return { el, final, from, to, decimals, grouped: digits.includes(","), prefix, suffix };
}

function formatTick(plan: TickPlan, value: number): string {
  const body = plan.grouped
    ? value.toLocaleString("en-US", {
        minimumFractionDigits: plan.decimals,
        maximumFractionDigits: plan.decimals,
      })
    : value.toFixed(plan.decimals);
  return `${plan.prefix}${body}${plan.suffix}`;
}

/**
 * Counts numeric readouts up to the value already rendered, once, on entry.
 *
 * The animation never synthesizes a claim. It only ever moves between a floor
 * derived from the final string and that string, and it ends by writing the
 * DOM-authored string back verbatim, so the resting state is byte-identical
 * to what the server sent. Values are matched by `[data-stat-value]`.
 *
 * Before ticking, each cell reserves `min-width` in `ch` equal to the width of
 * its final string, so a narrower intermediate value cannot reflow the row.
 * That is a width reservation and not a `tabular-nums` claim, and it is a
 * one-time write, never an animated property.
 *
 * Reduced motion: the final string stands. No tick, no observer.
 */
export function statTick(
  target: MotionTarget,
  options: { stagger?: number; failsafeMs?: number } = {},
): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const cells = Array.from(el.querySelectorAll<HTMLElement>("[data-stat-value]"));
  const plans = cells.map(planTick).filter((plan): plan is TickPlan => plan !== null);
  if (plans.length === 0) return NOOP;

  plans.forEach((plan) => {
    plan.el.style.minWidth = `${plan.final.length}ch`;
  });

  const gap = options.stagger ?? statTickSpec.perItem;
  const running: Array<{ stop: () => void }> = [];
  let ticked = false;

  const settle = () => {
    plans.forEach((plan) => {
      plan.el.textContent = plan.final;
    });
  };

  /* Armed when the tick starts, not at mount: a readout that has not been
     reached yet is already showing its final string and needs no rescue. */
  let failsafe: number | undefined;

  const stop = inView(
    el,
    () => {
      if (ticked) return;
      ticked = true;
      failsafe = window.setTimeout(settle, options.failsafeMs ?? 4000);
      plans.forEach((plan, i) => {
        plan.el.textContent = formatTick(plan, plan.from);
        const controls = animate(plan.from, plan.to, {
          duration: statTickSpec.duration,
          ease: statTickSpec.ease,
          delay: i * gap,
          onUpdate: (value) => {
            plan.el.textContent = formatTick(plan, value);
          },
        });
        running.push(controls);
        controls.finished.then(
          () => {
            plan.el.textContent = plan.final;
          },
          () => {
            plan.el.textContent = plan.final;
          },
        );
      });
    },
    { amount: 0.2 },
  );

  return () => {
    if (failsafe !== undefined) window.clearTimeout(failsafe);
    stop();
    running.forEach((controls) => controls.stop());
    settle();
  };
}

/* ───────────────────────────── label settle ────────────────────────── */

/** A cleanup that can also be asked to let its labels through. */
export type LabelSettleHandle = MotionCleanup & { release: () => void };

/**
 * Settles a plate's leader labels in as a group.
 *
 * `trigger: "inView"` observes the plate and settles the labels once it is on
 * screen, after a short delay so the strokes are already moving.
 * `trigger: "manual"` parks the labels and hands back a `release()`, which is
 * what a scroll-linked plate calls once its draw passes `labelsAt`. Either
 * way the reveal is one-shot and latched: nothing un-animates on scroll-up.
 *
 * Reduced motion: all labels at final state immediately, nothing parked, no
 * observer registered, and `release()` is a no-op.
 */
export function labelSettle(
  target: MotionTarget,
  options: {
    trigger?: "inView" | "manual";
    stagger?: number;
    delay?: number;
    failsafeMs?: number;
  } = {},
): LabelSettleHandle {
  const el = resolve(target);
  const labels = el ? Array.from(el.querySelectorAll("[data-leader-group]")) : [];

  if (!el || typeof window === "undefined" || labels.length === 0) {
    return Object.assign(NOOP, { release: NOOP });
  }

  if (prefersReducedMotion()) {
    const final = reducedMotionFallback(labelSettleSpec);
    labels.forEach((label) => animate(label, final.to, final.options));
    return Object.assign(NOOP as MotionCleanup, { release: NOOP });
  }

  const gap = options.stagger ?? labelSettleSpec.perItem;
  /* Parked through motion rather than by writing the style directly. Motion
     has to own the opacity value or its commit on finish loses to the inline
     one and the labels stay at zero. */
  labels.forEach((label) => animate(label, labelSettleSpec.from, { duration: 0 }));

  let settled = false;
  const release = () => {
    if (settled) return;
    settled = true;
    labels.forEach((label, i) =>
      animate(label, labelSettleSpec.to, {
        ...labelSettleSpec.options,
        delay: (options.delay ?? 0) + i * gap,
      }),
    );
  };

  /* Manual mode carries no timer of its own: the scroll-linked caller owns
     the failsafe, and firing one here would settle an off-screen plate's
     labels before the reader ever reaches it. */
  if (options.trigger === "manual") {
    return Object.assign((() => release()) as MotionCleanup, { release });
  }

  const failsafe = window.setTimeout(release, options.failsafeMs ?? 2500);
  const stop = inView(
    el,
    () => {
      window.clearTimeout(failsafe);
      release();
    },
    { amount: "some" },
  );

  return Object.assign(
    (() => {
      window.clearTimeout(failsafe);
      stop();
      release();
    }) as MotionCleanup,
    { release },
  );
}

/* ───────────────────────────── value pulse ─────────────────────────── */

/**
 * Pulses a readout that has just been recomputed.
 *
 * The target has to generate a box for the scale leg to apply: `transform`
 * does nothing on a non-replaced inline box, which is what a bare `<span>` is.
 * Callers wrap the value in an `inline-block`.
 *
 * Reduced motion: nothing runs, and the value simply changes.
 */
export function valuePulse(target: MotionTarget): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const controls = animate(
    el,
    {
      opacity: [valuePulseSpec.from.opacity, valuePulseSpec.to.opacity],
      transform: [valuePulseSpec.from.transform, valuePulseSpec.to.transform],
    },
    { ...valuePulseSpec.options },
  );

  return () => controls.stop();
}

/* ──────────────────────────── ruler breathe ────────────────────────── */

/**
 * Breathes the ruler readout: an opacity oscillation under the threshold of
 * being noticed, carrying no state and reporting nothing.
 *
 * Reduced motion: not started. The ruler is static, as it is today.
 */
export function rulerBreathe(target: MotionTarget): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const controls = animate(
    el,
    { opacity: [...rulerBreatheSpec.keyframes] },
    {
      duration: rulerBreatheSpec.period,
      ease: rulerBreatheSpec.ease,
      repeat: Number.POSITIVE_INFINITY,
    },
  );

  return () => {
    controls.stop();
    if (el instanceof HTMLElement) el.style.opacity = "";
  };
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
