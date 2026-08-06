import { Figure } from "@/components/figures/Figure";
import { GridPlane, type GridCell } from "@/components/figures/GridPlane";
import { ISO_COS } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_012 [ PILLAR TO PROOF ]
 *
 * Ground truth: the positioning framework's structure. Five pillars, each one
 * carrying a buyer outcome, a proof artifact, and an approval state. The top
 * band is drawn empty on purpose: the pillar names are withheld on this site,
 * and an empty band is more honest than a placeholder.
 */

const COLS = 5;
const CELL = 66;

/** Bands run the width of the framework: every pillar carries all of them. */
const BANDS: Array<{ text: string; fill: GridCell["fill"] }> = [
  { text: "Pillar name withheld", fill: "none" },
  { text: "Buyer outcome", fill: "blue" },
  { text: "Proof artifact", fill: "teal" },
  { text: "Approval state", fill: "lavender" },
];

const CELLS: GridCell[] = BANDS.flatMap(({ fill }, row) =>
  Array.from({ length: COLS }, (_, col) => ({ col, row, fill })),
);

/** Band centre in plate coordinates, for the leader targets. */
function bandCentre(row: number): [number, number] {
  const x = (COLS * CELL) / 2;
  const y = row * CELL + CELL / 2;
  return [(x - y) * ISO_COS, (x + y) / 2];
}

export function Fig012PillarToProof() {
  return (
    <Figure
      num={12}
      title="Pillar to proof"
      groundTruth="The five-pillar positioning framework as built. Columns are the pillars; the bands are what each pillar carries: a buyer outcome, the proof artifact behind it, and the approval state of that proof. Pillar names are withheld."
      caption="Five pillars, and not one of them is allowed to stand without evidence."
      viewBox="-462 -18 992 333"
    >
      <GridPlane cols={COLS} rows={BANDS.length} cell={CELL} cells={CELLS} />

      {BANDS.map(({ text }, row) => {
        const [tx, ty] = bandCentre(row);
        return (
          <LeaderLabel
            key={text}
            x={-290}
            y={ty}
            dx={tx + 290}
            dy={0}
            text={text}
            dashed={row === 0}
          />
        );
      })}

      <LeaderLabel x={420} y={30} dx={-130} dy={70} text="Five pillars" dashed />
    </Figure>
  );
}
