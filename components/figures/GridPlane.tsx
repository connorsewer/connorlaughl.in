import { FIG_STROKE, figFill, isoPolygon, type FigFill } from "@/components/figures/IsoBox";

/**
 * Isometric grid plane.
 *
 * Reference crop: `docs/superpowers/reference/chapter-1440.png`, the touch
 * screen plate — a flat lattice in isometric with a handful of cells filled to
 * mark state. The plane is the substrate a figure sits on: a matrix, a grid of
 * accounts, a lifecycle board.
 *
 * Interior rules carry `data-no-draw` so `drawOn()` plots the outline and
 * leaves the lattice in place, which keeps the draw-on legible instead of
 * turning into a hundred racing dashes.
 */

export type GridCell = {
  col: number;
  row: number;
  fill: FigFill;
};

export type GridPlaneProps = {
  cols?: number;
  rows?: number;
  /** Cell edge in figure-space units. */
  cell?: number;
  /** Screen-space offset of the plane origin. */
  x?: number;
  y?: number;
  /** Wash under the whole lattice. */
  fill?: FigFill;
  /** Individually filled cells, for marking state on the lattice. */
  cells?: GridCell[];
  className?: string;
};

export function GridPlane({
  cols = 8,
  rows = 8,
  cell = 22,
  x = 0,
  y = 0,
  fill = "none",
  cells,
  className,
}: GridPlaneProps) {
  const w = cols * cell;
  const d = rows * cell;

  const outline = isoPolygon([
    [0, 0, 0],
    [w, 0, 0],
    [w, d, 0],
    [0, d, 0],
  ]);

  const lines: Array<{ key: string; points: string }> = [];
  for (let c = 1; c < cols; c += 1) {
    lines.push({
      key: `c${c}`,
      points: isoPolygon([
        [c * cell, 0, 0],
        [c * cell, d, 0],
      ]),
    });
  }
  for (let r = 1; r < rows; r += 1) {
    lines.push({
      key: `r${r}`,
      points: isoPolygon([
        [0, r * cell, 0],
        [w, r * cell, 0],
      ]),
    });
  }

  return (
    /* `vector-effect` is not inherited and does nothing on a group; the
       plate-wide rule in app/globals.css sets it per shape. The lattice runs
       at the same 1.25 weight as the outline and is held back by opacity
       alone, which is deliberate: a second stroke weight inside one plate
       reads as a second drawing convention. */
    <g
      transform={`translate(${x} ${y})`}
      className={className}
      stroke="var(--blueprint)"
      strokeWidth={FIG_STROKE}
    >
      <polygon points={outline} fill={figFill(fill)} fillOpacity={fill === "none" ? 0 : 0.5} />

      {cells?.map(({ col, row, fill: cellFill }) => (
        <polygon
          key={`${col}-${row}`}
          data-no-draw
          points={isoPolygon([
            [col * cell, row * cell, 0],
            [(col + 1) * cell, row * cell, 0],
            [(col + 1) * cell, (row + 1) * cell, 0],
            [col * cell, (row + 1) * cell, 0],
          ])}
          fill={figFill(cellFill)}
          fillOpacity={cellFill === "none" ? 0 : 1}
        />
      ))}

      {lines.map(({ key, points }) => (
        <polyline
          key={key}
          data-no-draw
          points={points}
          fill="none"
          strokeOpacity={0.45}
        />
      ))}
    </g>
  );
}
