/**
 * Motion primitives for the manual system.
 *
 * Additive to `lib/motion.ts`: that catalog stays untouched until its last
 * legacy consumer is converted. Everything here is new work for the manual
 * pages: SVG stroke draw-on (one-shot and scroll-linked), stat fill, stat
 * tick, leader-label settle, ruler breathe, wordmark pixel reveal, and the
 * living-figure set: signal packet, node lift, plate crosshair.
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

/**
 * signal-packet — a drawn mark travelling a chain, node to node, on a loop.
 *
 * The plates depict systems that run, and a static plate depicts one that has
 * stopped. One packet per chain, one hop at a time, linear: a signal moving
 * through a machine holds its speed, and an eased hop reads as a thrown
 * object. It dwells at each node because that is where the work happens.
 *
 * Amplitude is the whole argument. The mark is ~3.5 CSS px, it carries no
 * fill, and at reading distance it is a tick that moves rather than a thing
 * that draws attention. It starts only once its plate has finished drawing, so
 * it never competes with the draw-on, and it never runs under reduced motion.
 *
 * The phase offset is what stops a page of chains from beating in unison,
 * which would read as choreography rather than as several machines running.
 */
export const signalPacketSpec = {
  /** Time for one hop, node centre to node centre. */
  travel: DURATION.hero,
  /** Hold at a node before the next hop. */
  dwell: DURATION.short,
  /** Fade in at the head of the run and out at its tail, so the loop wrap is
      never a teleport. */
  fade: DURATION.quick,
  /** Ink opacity at full travel. Under the plate's own strokes. */
  opacity: 0.85,
  /** Mark size, CSS px, resolved into plate units by the caller. */
  sizePx: 3.5,
  /** Per-plate start offset, seconds, multiplied by the plate's index. */
  phase: DURATION.medium,
  /** Number of distinct phases before the offsets repeat. */
  phaseCount: 4,
} as const;

/**
 * node-lift — an iso node rising under the pointer while its peers step back.
 *
 * Values are carried here and applied by the stylesheet (LIVING FIGURES block
 * in app/globals.css), for the same reason `themeCrossSpec` is: the effect is
 * a hover state, which script has no business owning, but the numbers still
 * belong to one catalog so the two cannot drift.
 *
 * The lift is 2px of screen travel along the iso up-axis and nothing else. The
 * illumination is subtractive: every label already sits at full blueprint, so
 * hovering one node dims the rest rather than brightening the one, which means
 * a reader who never hovers is missing nothing. That is also why the effect is
 * pointer-only and adds no tab stops: there is no information behind it.
 */
export const nodeLiftSpec = {
  /** Screen-space rise, px. Up the iso z axis, which is straight up. */
  lift: 2,
  /** What the peers drop to while a node is held. */
  peerOpacity: 0.55,
  duration: DURATION.quick,
  ease: EASE.outQuart,
} as const;

/**
 * plate-crosshair — the drafting cursor a plate wears under a fine pointer.
 *
 * Two hairlines across the plate and a mono chip reading the pointer's
 * position in the plate's own unit space. It follows input rather than running
 * on a clock, so it is exempt from the reduced-motion cut: suppressing it
 * would remove a cursor, not an animation. It is cut on coarse pointers, where
 * there is no cursor to draft with, and on plates narrow enough to have
 * dropped their callouts.
 *
 * No easing and no duration: every frame is the pointer's own position, and
 * interpolating it would make the readout lie.
 */
export const plateCrosshairSpec = {
  /** Hairline ink, as a share of blueprint. */
  hairOpacity: 0.3,
  /** Readout type size, CSS px. Matches the plate's other mono chrome. */
  chipPx: 10,
  /** Chip inset from the pointer, CSS px. */
  chipGap: 8,
  /** Media query the whole effect is gated on. */
  pointerQuery: "(hover: hover) and (pointer: fine)",
} as const;

/**
 * theme-cross — light ↔ cyanotype as one printed pull.
 *
 * The duration is carried in the stylesheet (`@keyframes theme-pull`), because
 * a View Transition animates pseudo-elements the document cannot reach from
 * script. It is stated here so the two never drift: `DURATION.medium` at
 * `EASE.outQuart`.
 */
export const themeCrossSpec = {
  duration: DURATION.medium,
  ease: EASE.outQuart,
  /** Attribute the stylesheet scopes the transition to. */
  flag: "data-theme-swap",
} as const;

/* ─────────────────────────────── runners ───────────────────────────── */

/**
 * Runs a theme swap inside a View Transition.
 *
 * `disableTransitionOnChange` on the provider stops every `transition-colors`
 * in the tree from staggering independently, which is right, but it leaves the
 * swap as an instantaneous repaint. A View Transition snapshots the whole
 * document, so it crosses the two grounds as one image and sidesteps the
 * per-property transitions entirely.
 *
 * Reduced motion, and any engine without the API: `swap()` runs on its own and
 * the theme changes at once. Same end state, nothing registered.
 */
export function themeCross(swap: () => void): void {
  if (typeof document === "undefined") {
    swap();
    return;
  }

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<unknown> };
  };

  if (prefersReducedMotion() || typeof doc.startViewTransition !== "function") {
    swap();
    return;
  }

  const root = doc.documentElement;
  root.setAttribute(themeCrossSpec.flag, "");
  const transition = doc.startViewTransition(swap);
  /* The flag scopes the stylesheet rule to this swap so a cross-document
     navigation keeps its own fade. Cleared whether the transition finishes or
     is skipped, so a second click never inherits a stale flag. */
  void Promise.resolve(transition.finished)
    .catch(() => undefined)
    .then(() => root.removeAttribute(themeCrossSpec.flag));
}

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
  /**
   * Called once the plate is fully drawn, by animation or by failsafe.
   * Anything that must not run over the draw-on waits for this.
   */
  onDrawn?: () => void;
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

  /* One-shot, whichever path gets there first: the last stroke landing, or
     the failsafe. A consumer waiting on the drawing must be released exactly
     once and must never be stranded by a stroke that failed to animate. */
  let announced = false;
  const announce = () => {
    if (announced) return;
    announced = true;
    options.onDrawn?.();
  };

  const failsafe = window.setTimeout(() => {
    if (drawn) return;
    drawn = true;
    shapes.forEach(clear);
    announce();
  }, options.failsafeMs ?? 2500);

  const stop = inView(
    el,
    () => {
      if (drawn) return;
      drawn = true;
      window.clearTimeout(failsafe);
      window.removeEventListener("resize", onResize);
      let pending = shapes.length;
      const settle = (shape: SVGGeometryElement) => {
        clear(shape);
        pending -= 1;
        if (pending === 0) announce();
      };
      shapes.forEach((shape, i) => {
        if (lengths[i] <= 0) {
          settle(shape);
          return;
        }
        animate(
          shape,
          { strokeDashoffset: [lengths[i], 0] },
          { duration, ease: drawOnSpec.ease, delay: i * gap },
        ).finished.then(
          () => settle(shape),
          () => settle(shape),
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

const LABEL_SETTLE_EASE = `cubic-bezier(${labelSettleSpec.options.ease.join(", ")})`;

/**
 * Writes a leader group's travel leg as a CSS transform.
 *
 * `delay: null` parks: the value lands with no transition, which is what a
 * mount-time park has to do. A number arms the transition off
 * `labelSettleSpec.options` and staggers it, so the travel and the opacity leg
 * run on the same curve and land together.
 */
function settleTransform(label: Element, transform: string, delay: number | null): void {
  const { style } = label as SVGElement;
  style.transition =
    delay === null
      ? "none"
      : `transform ${labelSettleSpec.options.duration}s ${LABEL_SETTLE_EASE} ${delay}s`;
  style.transform = transform;
}

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
    labels.forEach((label) => {
      settleTransform(label, labelSettleSpec.to.transform, null);
      animate(label, { opacity: final.to.opacity }, final.options);
    });
    return Object.assign(NOOP as MotionCleanup, { release: NOOP });
  }

  const gap = options.stagger ?? labelSettleSpec.perItem;
  /* Opacity is parked through motion rather than by writing the style
     directly: motion has to own that value or its commit on finish loses to
     the inline one and the labels stay at zero.

     The travel leg is deliberately NOT handed to motion. A leader group is an
     SVG `<g>`, and motion routes a transform on an SVG element through the
     `transform` presentation attribute, which cannot carry a CSS length — it
     writes the string `null` and the parser rejects it once per label, 33
     times on the cover. CSS `transform` on an SVG element is the correct
     surface anyway: it is composited, and it reads in screen px rather than
     in the plate's user units, so a 4px settle is 4px in every viewBox. */
  labels.forEach((label) => {
    settleTransform(label, labelSettleSpec.from.transform, null);
    animate(label, { opacity: labelSettleSpec.from.opacity }, { duration: 0 });
  });

  let settled = false;
  const release = () => {
    if (settled) return;
    settled = true;
    labels.forEach((label, i) => {
      const delay = (options.delay ?? 0) + i * gap;
      settleTransform(label, labelSettleSpec.to.transform, delay);
      animate(label, { opacity: labelSettleSpec.to.opacity }, {
        ...labelSettleSpec.options,
        delay,
      });
    });
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

/* ──────────────────────────────── x-ray ───────────────────────────── */

/**
 * x-ray — the page drawing its own construction over itself.
 *
 * The annotations are a technical drawing, so they arrive the way a plate
 * does: stroke first, readout after. The cascade is deliberately ordered by
 * the caller (viewport marks, then dimensions, then leaders, then the status
 * chip), so a reader watches the drawing get set up rather than watching
 * everything appear at once.
 *
 * The overlay carries no viewBox: its coordinates are viewport pixels, so a
 * dash length read from `getTotalLength()` is already in the space the UA
 * resolves the dash in and needs no `plateScale()` correction.
 */
export const xrayDrawSpec = {
  /** Stroke draw time per annotation group. */
  duration: DURATION.medium,
  ease: EASE.outQuart,
  /** Gap between annotation groups. */
  perItem: STAGGER.short,
  /** How far a group's mono readout trails its own stroke. */
  inkDelay: DURATION.quick,
  /** Ink fade in and the whole overlay's fade out. */
  exit: DURATION.quick,
} as const;

/**
 * Draws an x-ray overlay in, group by group.
 *
 * Groups are matched by `[data-xray-anno]` and may be SVG or HTML: the strokes
 * inside a group dash-draw, and anything marked `[data-xray-ink]` fades in
 * behind them. A group with no drawable shape (the status chip) is ink only.
 *
 * Reduced motion: nothing is parked and nothing is registered. The overlay
 * renders complete, which is the same finished drawing minus the plotting.
 */
export function xrayDraw(target: MotionTarget): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;
  if (prefersReducedMotion()) return NOOP;

  const groups = Array.from(el.querySelectorAll("[data-xray-anno]"));
  if (groups.length === 0) return NOOP;

  const { duration, ease, perItem, inkDelay, exit } = xrayDrawSpec;
  const running: Array<{ stop: () => void }> = [];

  groups.forEach((group, i) => {
    const delay = i * perItem;

    const shapes = Array.from(group.querySelectorAll<SVGGeometryElement>(DRAWABLE)).filter(
      (shape) =>
        !shape.hasAttribute("data-no-draw") && typeof shape.getTotalLength === "function",
    );

    shapes.forEach((shape) => {
      let length = 0;
      try {
        length = shape.getTotalLength();
      } catch {
        length = 0;
      }
      if (length <= 0) return;
      park(shape, length);
      const controls = animate(
        shape,
        { strokeDashoffset: [length, 0] },
        { duration, ease, delay },
      );
      running.push(controls);
      controls.finished.then(
        () => unpark(shape),
        () => unpark(shape),
      );
    });

    const ink = Array.from(group.querySelectorAll("[data-xray-ink]"));
    ink.forEach((node) => {
      animate(node, { opacity: 0 }, { duration: 0 });
      running.push(
        animate(node, { opacity: 1 }, { duration: exit, ease: EASE.standard, delay: delay + inkDelay }),
      );
    });
  });

  return () => {
    running.forEach((controls) => controls.stop());
    groups.forEach((group) => {
      group.querySelectorAll<SVGGeometryElement>(DRAWABLE).forEach(unpark);
      group.querySelectorAll("[data-xray-ink]").forEach((node) => {
        (node as HTMLElement).style.opacity = "";
      });
    });
  };
}

/**
 * Fades a finished x-ray overlay out and reports when it may be unmounted.
 *
 * Reduced motion, and any missing target: `done()` fires at once and nothing
 * is registered, so the overlay simply stops being there.
 */
export function xrayFadeOut(target: MotionTarget, done: () => void): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined" || prefersReducedMotion()) {
    done();
    return NOOP;
  }
  const controls = animate(el, { opacity: [1, 0] }, {
    duration: xrayDrawSpec.exit,
    ease: EASE.standard,
  });
  controls.finished.then(done, done);
  return () => controls.stop();
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

/* ──────────────────────────── signal packet ───────────────────────── */

/** A node centre in plate user units. */
export type PacketPoint = readonly [number, number];

/**
 * Runs one packet along a chain of node centres, forever, on a linear driver.
 *
 * The runner writes the `transform` and `opacity` ATTRIBUTES rather than the
 * CSS properties, which is the one place this file departs from its own
 * transform-and-opacity-via-style habit, and it is deliberate. A packet has to
 * travel in the plate's user units so that a 150-unit hop is a 150-unit hop in
 * every viewBox on the site; CSS `transform` on an SVG element resolves its
 * lengths in the host space instead, which would make the same chain travel a
 * different distance on a wide plate than on a narrow one. The attribute is
 * the only surface that speaks user units. It is still a transform: no layout
 * property is touched, and one element per plate is written per frame.
 *
 * The driver is a single `animate()` over the cycle length with the whole
 * schedule resolved in `onUpdate`, so a chain of any length costs one
 * animation rather than one per hop.
 *
 * Reduced motion: nothing starts and the packet is left at opacity 0, which is
 * where it renders. The plate is a complete static drawing with no stray mark.
 */
export function signalPacket(
  target: MotionTarget,
  points: readonly PacketPoint[],
  options: { phase?: number } = {},
): MotionCleanup {
  const el = resolve(target);
  if (!el || typeof window === "undefined") return NOOP;
  if (prefersReducedMotion()) return NOOP;
  if (points.length < 2) return NOOP;

  const { travel, dwell, fade, opacity } = signalPacketSpec;
  const hops = points.length - 1;
  const cycle = 2 * fade + hops * (travel + dwell);

  const place = (x: number, y: number, alpha: number) => {
    el.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    el.setAttribute("opacity", alpha.toFixed(3));
  };

  const head = points[0];
  const tail = points[points.length - 1];

  /* The whole schedule, resolved from one clock. Walks the cycle rather than
     indexing into it so the fades, the hops and the dwells stay in one place
     and cannot disagree about where the packet is. */
  const apply = (elapsed: number) => {
    let t = elapsed;

    if (t < fade) {
      place(head[0], head[1], (t / fade) * opacity);
      return;
    }
    t -= fade;

    for (let i = 0; i < hops; i += 1) {
      const from = points[i];
      const to = points[i + 1];
      if (t < travel) {
        const k = t / travel;
        place(from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k, opacity);
        return;
      }
      t -= travel;
      if (t < dwell) {
        place(to[0], to[1], opacity);
        return;
      }
      t -= dwell;
    }

    place(tail[0], tail[1], (1 - clamp01(t / fade)) * opacity);
  };

  apply(0);

  const controls = animate(0, cycle, {
    duration: cycle,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY,
    delay: options.phase ?? 0,
    onUpdate: apply,
  });

  return () => {
    controls.stop();
    el.setAttribute("opacity", "0");
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
