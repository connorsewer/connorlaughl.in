import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";
import { FIG_STROKE, IsoBox, isoPoint } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_014 [ PERFORMANCE LEDGER JOIN ]
 *
 * Ground truth: the join path behind the performance ledger. FIG_004 draws it
 * as one line; this plate draws it as what it is, two systems that used to
 * disagree. The web run and the CRM run land on the same ledger row, which is
 * the whole point of the build.
 */

const STEP = 130;
const NODE_W = 100;
const NODE_D = 70;
const NODE_H = 13;

/** Screen offset of the CRM run below the web run. */
const CRM_Y = 210;
/** Screen offset of the ledger row the two runs land on. */
const LEDGER_X = 420;
const LEDGER_Y = 200;

const LEDGER_W = 120;
const LEDGER_D = 80;
const LEDGER_H = 18;

const WEB: ChainNode[] = [
  { label: "Session capture", fill: "blue" },
  { label: "Source capture", fill: "blue" },
];

const CRM: ChainNode[] = [
  { label: "Lead record", fill: "none" },
  { label: "Opportunity", fill: "lavender" },
  { label: "Closed revenue", fill: "lavender" },
];

const [STEP_X, STEP_Y] = isoPoint(STEP, 0);
/** The corner a tie leaves from, and the corner it arrives at. */
const [OUT_X, OUT_Y] = isoPoint(NODE_W, 0, NODE_H);
const [IN_X, IN_Y] = isoPoint(0, LEDGER_D, LEDGER_H);
const [LEDGER_CX, LEDGER_CY] = isoPoint(LEDGER_W / 2, LEDGER_D / 2, LEDGER_H);

/** Screen position of the last slab in a run, so the tie starts on its corner. */
function runEnd(length: number, offsetY: number): [number, number] {
  const i = length - 1;
  return [i * STEP_X + OUT_X, i * STEP_Y + OUT_Y + offsetY];
}

const TIES: Array<[number, number]> = [runEnd(WEB.length, 0), runEnd(CRM.length, CRM_Y)];

export function Fig014PerformanceLedgerJoin() {
  return (
    <Figure
      num={14}
      title="Performance ledger join"
      groundTruth="The performance ledger join path: session and source capture on the web side, the lead record, opportunity, and closed revenue on the CRM side, and the single ledger row the join writes."
      caption="Two systems, one row. The reconciliation runs itself after that."
      viewBox="-261 -31 984 474"
    >
      {TIES.map(([tx, ty], i) => (
        <line
          key={`join-${i}`}
          data-no-draw
          x1={tx}
          y1={ty}
          x2={LEDGER_X + IN_X}
          y2={LEDGER_Y + IN_Y}
          stroke="var(--blueprint)"
          strokeWidth={FIG_STROKE}
          strokeDasharray="5 6"
          strokeOpacity={0.7}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <IsoChain nodes={WEB} step={STEP} w={NODE_W} d={NODE_D} h={NODE_H} />
      <IsoChain nodes={CRM} step={STEP} w={NODE_W} d={NODE_D} h={NODE_H} y={CRM_Y} />

      <IsoBox
        w={LEDGER_W}
        d={LEDGER_D}
        h={LEDGER_H}
        fill="teal"
        x={LEDGER_X}
        y={LEDGER_Y}
      />

      <LeaderLabel
        x={LEDGER_X + LEDGER_CX + 190}
        y={LEDGER_Y + LEDGER_CY}
        dx={-190}
        dy={0}
        text="Ledger row"
      />
    </Figure>
  );
}
