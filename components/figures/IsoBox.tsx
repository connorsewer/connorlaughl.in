/**
 * Isometric box, and the projection every other figure primitive shares.
 *
 * Reference crop: `docs/superpowers/reference/cover-1440.png`, FIG_001 — the
 * exploded floppy plate. Boxes are drawn in true 2:1 isometric, one blueprint
 * stroke weight throughout, pastel fill inside the shape only.
 *
 * Stroke is always `var(--blueprint)` at 1.25. Fills come only from the
 * `--fig-*` tokens; the two visible side faces reuse the same token at lower
 * opacity so a box reads as shaded without introducing a second colour.
 */

/** Half of a 60° isometric: cos(30°). */
export const ISO_COS = Math.cos(Math.PI / 6);

/** Blueprint stroke weight for every figure primitive. */
export const FIG_STROKE = 1.25;

/**
 * Projects a point in figure space onto the plate.
 * `x` runs right-and-down, `y` runs left-and-down, `z` runs up.
 */
export function isoPoint(x: number, y: number, z = 0): [number, number] {
  return [(x - y) * ISO_COS, (x + y) * 0.5 - z];
}

/** Points to an SVG polygon `points` string. */
export function isoPolygon(points: Array<[number, number, number]>): string {
  return points
    .map(([x, y, z]) => {
      const [sx, sy] = isoPoint(x, y, z);
      return `${sx.toFixed(2)},${sy.toFixed(2)}`;
    })
    .join(" ");
}

export type FigFill = "blue" | "lavender" | "teal" | "none";

/** Resolves a fill name to its token. Never returns a literal colour. */
export function figFill(fill: FigFill = "none"): string {
  switch (fill) {
    case "blue":
      return "var(--fig-blue)";
    case "lavender":
      return "var(--fig-lavender)";
    case "teal":
      return "var(--fig-teal)";
    case "none":
      return "none";
  }
}

export type IsoBoxProps = {
  /** Width along the figure-space x axis. */
  w: number;
  /** Height along z (up). */
  h: number;
  /** Depth along the figure-space y axis. */
  d: number;
  fill?: FigFill;
  /** Screen-space offset of the box origin, in plate units. */
  x?: number;
  y?: number;
  className?: string;
};

export function IsoBox({ w, h, d, fill = "none", x = 0, y = 0, className }: IsoBoxProps) {
  const paint = figFill(fill);

  // Visible faces from this viewpoint: the top, the y = d face, the x = w face.
  const top = isoPolygon([
    [0, 0, h],
    [w, 0, h],
    [w, d, h],
    [0, d, h],
  ]);
  const front = isoPolygon([
    [0, d, 0],
    [w, d, 0],
    [w, d, h],
    [0, d, h],
  ]);
  const side = isoPolygon([
    [w, 0, 0],
    [w, d, 0],
    [w, d, h],
    [w, 0, h],
  ]);

  return (
    /* `vector-effect` is not inherited, so it cannot be set here: on a group
       it applies to the group and to nothing inside it. The plate-wide rule in
       app/globals.css sets it on the shapes themselves, which is the only
       place it has any effect. */
    <g
      transform={`translate(${x} ${y})`}
      className={className}
      stroke="var(--blueprint)"
      strokeWidth={FIG_STROKE}
      strokeLinejoin="round"
    >
      <polygon points={front} fill={paint} fillOpacity={paint === "none" ? 0 : 0.55} />
      <polygon points={side} fill={paint} fillOpacity={paint === "none" ? 0 : 0.35} />
      <polygon points={top} fill={paint} fillOpacity={paint === "none" ? 0 : 1} />
    </g>
  );
}
