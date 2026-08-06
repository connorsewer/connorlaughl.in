import { Figure } from "@/components/figures/Figure";
import { GridPlane, type GridCell } from "@/components/figures/GridPlane";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_003 [ LIFECYCLE STAGES ]
 *
 * Ground truth: the CRM lifecycle model as built. The columns are the stage
 * set, the bands are what every stage carries. The vendor is deliberately
 * unnamed, per the copy deck's public-safe ground truth.
 */

const COLS = 5;
const ROWS = 3;
const CELL = 70;

/** Each band runs the width of the stage set: every stage carries all three. */
const BANDS: Array<GridCell["fill"]> = ["blue", "lavender", "teal"];

const CELLS: GridCell[] = BANDS.flatMap((fill, row) =>
  Array.from({ length: COLS }, (_, col) => ({ col, row, fill })),
);

/** Band centre in plate coordinates, for the leader targets. */
function bandCentre(row: number): [number, number] {
  const x = (COLS * CELL) / 2;
  const y = row * CELL + CELL / 2;
  return [(x - y) * Math.cos(Math.PI / 6), (x + y) * 0.5];
}

export function Fig003LifecycleStages() {
  const bands: Array<{ text: string; row: number }> = [
    { text: "Entry definition", row: 0 },
    { text: "Stage owner", row: 1 },
    { text: "Exit definition", row: 2 },
  ];

  return (
    <Figure
      num={3}
      title="Lifecycle stages"
      groundTruth="The CRM lifecycle model as built. Columns are the stage set; the three bands are what every stage in it carries: an entry definition, a named owner, and an exit definition."
      caption="A lead enters a stage on one rule and leaves on another, and someone owns the handoff."
      viewBox="-405 -20 834 320"
    >
      <GridPlane cols={COLS} rows={ROWS} cell={CELL} cells={CELLS} />

      {bands.map(({ text, row }) => {
        const [tx, ty] = bandCentre(row);
        return (
          <LeaderLabel
            key={text}
            x={-262}
            y={ty}
            dx={tx + 262}
            dy={0}
            text={text}
          />
        );
      })}

      <LeaderLabel
        x={340}
        y={20}
        dx={-90}
        dy={62}
        text="Stage set"
        dashed
      />
    </Figure>
  );
}
