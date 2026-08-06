import { Figure } from "@/components/figures/Figure";
import { GridPlane, type GridCell } from "@/components/figures/GridPlane";
import { ISO_COS, isoPoint } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_011 [ SIGNAL TO TOUCH ]
 *
 * Ground truth: the signal tiering model the pod worked from. FIG_002 draws
 * the path a signal takes; this draws the table behind it. One row per tier,
 * and every tier carries both a routing path and a response window. The
 * windows themselves are gated, so the plate names the column, not the value.
 */

const COLS = 2;
const ROWS = 3;
const CELL = 70;

const COLUMNS = ["Routing path", "Response window"];
const COLUMN_FILLS: Array<GridCell["fill"]> = ["teal", "lavender"];

const CELLS: GridCell[] = COLUMN_FILLS.flatMap((fill, col) =>
  Array.from({ length: ROWS }, (_, row) => ({ col, row, fill })),
);

/** Column centre in plate coordinates, for the leader targets. */
function columnCentre(col: number): [number, number] {
  const x = col * CELL + CELL / 2;
  const y = (ROWS * CELL) / 2;
  return [(x - y) * ISO_COS, (x + y) / 2];
}

/** Near-left corner of the plane, where the row callout lands. */
const [ROW_X, ROW_Y] = isoPoint(0, (ROWS * CELL) / 2, 0);

export function Fig011SignalToTouch() {
  return (
    <Figure
      num={11}
      title="Signal to touch"
      groundTruth="The signal tiering model as built: one row per signal tier, and every tier carrying a routing path and a response window. Tier thresholds and window lengths are held back."
      caption="A tier determines the routing path and the response window, and the system assigns both."
      viewBox="-381 -18 775 211"
    >
      <GridPlane cols={COLS} rows={ROWS} cell={CELL} cells={CELLS} />

      {COLUMNS.map((text, col) => {
        const [tx, ty] = columnCentre(col);
        return (
          <LeaderLabel key={text} x={260} y={ty} dx={tx - 260} dy={0} text={text} />
        );
      })}

      <LeaderLabel
        x={-240}
        y={ROW_Y}
        dx={240 + ROW_X}
        dy={0}
        text="One row per tier"
        dashed
      />
    </Figure>
  );
}
