import type { CSSProperties } from "react";

import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * Leader labels drawn over a chapter plate (Wave C §2).
 *
 * The plates are generated label-free on purpose: an image model asked to
 * letter a technical drawing produces marks that look like type without being
 * type, which is unreadable, untranslatable, and unsearchable. So the image
 * carries the object and this overlay carries the words, in the same Geist
 * Mono, the same blueprint ink, and the same `LeaderLabel` primitive the
 * hand-authored figures use.
 *
 * Anchors are percentages of the image box rather than pixels, so a plate can
 * be re-encoded, re-cropped, or regenerated at another size without every
 * label drifting off the part it names.
 *
 * The overlay is decorative in the accessibility sense: it repeats structure
 * the `<figcaption>` and `alt` already carry in prose, so it is `aria-hidden`
 * and takes no pointer events.
 */

export type PlateLabel = {
  /** Label anchor, percent of image width. */
  x: number;
  /** Label anchor, percent of image height. */
  y: number;
  /** Offset to the part being named, percent of image width. */
  dx: number;
  /** Offset to the part being named, percent of image height. */
  dy: number;
  /** One or two words, from the chapter's approved copy. Never a numeral. */
  text: string;
};

export type PlateLabelsProps = {
  labels: PlateLabel[];
  /** Intrinsic plate dimensions, used only to set the overlay's aspect. */
  width: number;
  height: number;
  className?: string;
};

/**
 * Overlay coordinate space, in units across the plate's width.
 *
 * `LeaderLabel`'s authored constants are absolute: 11-unit type, a 10-unit
 * gap, a 7-unit arrowhead. They read correctly only when one unit is about one
 * CSS pixel. A chapter plate is capped at `max-w-[26rem]`, 416px, so the space
 * is sized to that rather than to the ~640-unit viewBox the full-column
 * figures use. Set it wider and the labels come out too small to read.
 */
const SPACE_WIDTH = 416;

/**
 * The plate's own ink, matching the generation palette.
 *
 * `LeaderLabel` strokes and fills from `var(--blueprint)`, which flips with
 * the theme. That is right over a themed page background and wrong here: the
 * plate no longer inverts, so its paper stays cream in both themes and a
 * theme-lightened ink loses contrast against it in dark mode. Overriding the
 * variable on the overlay's root scopes the fix to this subtree, so
 * `LeaderLabel` needs no special case.
 */
const PLATE_INK = "#2E47F1";

export function PlateLabels({
  labels,
  width,
  height,
  className,
}: PlateLabelsProps) {
  if (labels.length === 0) return null;

  const spaceHeight = (SPACE_WIDTH * height) / width;
  const toX = (pct: number) => (pct / 100) * SPACE_WIDTH;
  const toY = (pct: number) => (pct / 100) * spaceHeight;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${SPACE_WIDTH} ${spaceHeight}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ "--blueprint": PLATE_INK } as CSSProperties}
      className={`pointer-events-none absolute inset-2 block ${className ?? ""}`}
    >
      {labels.map((label) => (
        <LeaderLabel
          key={label.text}
          x={toX(label.x)}
          y={toY(label.y)}
          dx={toX(label.dx)}
          dy={toY(label.dy)}
          text={label.text}
        />
      ))}
    </svg>
  );
}
