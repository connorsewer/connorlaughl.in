/**
 * Motion scales.
 *
 * The shared vocabulary every animation on the site draws from: four easing
 * curves, six durations, four stagger gaps, and the reduced-motion collapse.
 * The manual's actual primitives live in `lib/motion-manual.ts` and are all
 * built out of these values, so a change here moves the whole system at once.
 *
 * Reduced-motion handling: `reducedMotionFallback()` turns any `{ from, to }`
 * spec into an instant jump to its end state. Components branch on
 * `usePrefersReducedMotion()` from hooks/useMediaQuery.ts.
 *
 * See DESIGN.md for the catalog these scales feed.
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
