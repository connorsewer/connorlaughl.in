/**
 * Motion primitives.
 *
 * Single source of truth for every animation on the site. Each primitive is a
 * spec object that can be passed directly to motion.dev's `animate()` or used
 * inside a React component.
 *
 * Reduced-motion handling: every primitive carries a `reduced` variant that
 * collapses the animation to instant. Components should branch on
 * `usePrefersReducedMotion()` from hooks/useMediaQuery.ts.
 *
 * See DESIGN.md §5 for the full catalog.
 */

import type { AnimationOptions } from "motion";

/* ────────────────────────────── easings ────────────────────────────── */

/** Cubic-bezier curves. Out-only. No bounce, no elastic. */
export const EASE = {
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  outQuint: [0.22, 1, 0.36, 1] as [number, number, number, number],
  outExpo: [0.19, 1, 0.22, 1] as [number, number, number, number],
  /** Standard Material out-cubic, for short utility transitions. */
  standard: [0.2, 0, 0, 1] as [number, number, number, number],
} as const;

/* ────────────────────────────── durations ──────────────────────────── */

/** Canonical durations in seconds. Pick from this list; don't invent. */
export const DURATION = {
  instant: 0.001,
  quick: 0.25,
  short: 0.45,
  medium: 0.6,
  long: 0.9,
  hero: 1.2,
} as const;

/* ────────────────────────────── stagger ────────────────────────────── */

/** Stagger gaps in seconds. */
export const STAGGER = {
  tight: 0.012,
  short: 0.03,
  med: 0.05,
  wide: 0.08,
} as const;

/* ──────────────────── primitive specs (DESIGN.md §5) ───────────────── */

/**
 * enter-up — default below-fold sections.
 * y: 24 → 0, opacity 0 → 1, ease-out-quart, 0.6s.
 */
export const enterUp = {
  from: { opacity: 0, transform: "translateY(24px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  options: {
    duration: DURATION.medium,
    ease: EASE.outQuart,
  } satisfies AnimationOptions,
} as const;

/**
 * stagger-up — list / grid reveals with per-child delay.
 * The `delay` factor multiplies index × STAGGER.short.
 */
export const staggerUp = {
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  options: {
    duration: DURATION.short,
    ease: EASE.outQuart,
  } satisfies AnimationOptions,
  perItem: STAGGER.short,
} as const;

/**
 * redact-in — confidential reveals.
 * 0.9s, 1px horizontal sweep, ink → signal → paper.
 * Used by the WebGL redaction shader (this is the CSS fallback).
 */
export const redactIn = {
  duration: DURATION.long,
  ease: EASE.outQuint,
} as const;

/**
 * print-stamp — status pills, fig labels.
 * scale 1.08 → 1, opacity 0 → 1, 0.25s.
 */
export const printStamp = {
  from: { opacity: 0, transform: "scale(1.08)" },
  to: { opacity: 1, transform: "scale(1)" },
  options: {
    duration: DURATION.quick,
    ease: EASE.outQuart,
  } satisfies AnimationOptions,
} as const;

/**
 * magnetic — cursor proximity inside a radius.
 * Max translate is 6px on the target axis.
 * Implemented as a React hook in hooks/useMagnetic.ts.
 */
export const magnetic = {
  radius: 120, // px
  maxTranslate: 6, // px
  damping: 0.18, // 0..1, higher = snappier
} as const;

/**
 * marquee — infinite horizontal loop.
 * 30s by default. Pauses on hover via CSS.
 */
export const marquee = {
  duration: 30, // seconds for one loop
  ease: "linear",
  loop: Infinity,
} as const;

/**
 * splittext-words — display H1/H2 word stagger on enter.
 * 0.8s, 30ms per word, y 18 → 0, opacity 0 → 1.
 */
export const splitTextWords = {
  from: { opacity: 0, transform: "translateY(18px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  options: {
    duration: 0.8,
    ease: EASE.outQuint,
  } satisfies AnimationOptions,
  stagger: STAGGER.short,
} as const;

/**
 * splittext-chars — hero only. Char-level stagger.
 * 1.2s, 12ms per char, y 24 → 0, opacity 0 → 1.
 */
export const splitTextChars = {
  from: { opacity: 0, transform: "translateY(24px)" },
  to: { opacity: 1, transform: "translateY(0)" },
  options: {
    duration: DURATION.hero,
    ease: EASE.outExpo,
  } satisfies AnimationOptions,
  stagger: STAGGER.tight,
} as const;

/**
 * count-up — numeric tween for stats.
 * 1.4s ease-out-expo. Debounced when input-driven (planner).
 */
export const countUp = {
  duration: 1.4,
  ease: EASE.outExpo,
  /** Debounce ms when fired from controlled inputs. */
  debounceMs: 80,
} as const;

/**
 * pulse-grain — paper texture overlay.
 * 4s loop, opacity 0.06 → 0.10 → 0.06.
 * Pure CSS keyframes; this object is documentation only.
 */
export const pulseGrain = {
  duration: 4,
  from: 0.06,
  peak: 0.1,
  loop: Infinity,
} as const;

/**
 * walk-glyph — animated dot that walks across a section divider rule.
 * 1.2s on viewport enter, glyph translates left → right.
 */
export const walkGlyph = {
  duration: DURATION.hero,
  ease: EASE.outQuart,
  from: { transform: "translateX(0%)" },
  to: { transform: "translateX(100%)" },
} as const;

/* ───────────────────── view-transition name pairs ───────────────────── */

/**
 * Named view-transition keys for cross-document moves.
 * The source and destination must declare the same name in CSS via
 * `view-transition-name: <key>`.
 */
export const TRANSITION_KEYS = {
  heroPortrait: "hero-portrait",
  caseDetailHero: "case-detail-hero",
  caseTitle: "case-title",
  caseDetailTitle: "case-detail-title",
  /** `fig-label-${number}` for matching fig labels across pages. */
  figLabel: (n: number) => `fig-label-${n}`,
} as const;

/* ──────────────────────── helpers ─────────────────────────────────── */

/**
 * Returns a no-op spec for use when reduced motion is preferred.
 * Pass `to` directly to skip the animation entirely.
 */
export function reducedMotionFallback<T extends { from: unknown; to: unknown }>(
  spec: T,
): { from: T["to"]; to: T["to"]; options: AnimationOptions } {
  return {
    from: spec.to,
    to: spec.to,
    options: { duration: DURATION.instant },
  };
}

/**
 * Stagger delay for the Nth child in a list, in seconds.
 */
export function staggerDelay(index: number, perItem = STAGGER.short): number {
  return index * perItem;
}
