import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";
import { FIG_STROKE, IsoBox, isoPoint } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_017 [ TWO FUNCTION MODEL ]
 *
 * Ground truth: the one-page operating model. Two functions, the inputs each
 * one owns, the outputs each one ships, and the single review gate they share.
 * The gate is drawn with the double outline the figure system uses for a step
 * that holds work rather than passing it through.
 */

const STEP = 130;
const NODE_W = 100;
const NODE_D = 70;
const NODE_H = 13;

/** Screen offset of the narrative run below the demand run. */
const NARRATIVE_Y = 215;
/** Screen offset of the gate both runs report into. */
const GATE_X = 380;
const GATE_Y = 120;

const GATE_W = 120;
const GATE_D = 80;
const GATE_H = 18;

const DEMAND: ChainNode[] = [
  { label: "Demand inputs", fill: "blue" },
  { label: "Demand outputs", fill: "blue" },
];

const NARRATIVE: ChainNode[] = [
  { label: "Narrative inputs", fill: "teal" },
  { label: "Narrative outputs", fill: "teal" },
];

const [STEP_X, STEP_Y] = isoPoint(STEP, 0);
const [OUT_X, OUT_Y] = isoPoint(NODE_W, 0, NODE_H);
const [IN_X, IN_Y] = isoPoint(0, GATE_D, GATE_H);
const [GATE_CX, GATE_CY] = isoPoint(GATE_W / 2, GATE_D / 2, GATE_H);

const TIES: Array<[number, number]> = [
  [STEP_X + OUT_X, STEP_Y + OUT_Y],
  [STEP_X + OUT_X, STEP_Y + OUT_Y + NARRATIVE_Y],
];

export function Fig017TwoFunctionModel() {
  return (
    <Figure
      num={17}
      title="Two function model"
      groundTruth="The two-function operating model: a demand function and a narrative function, each with the inputs it owns and the outputs it ships, and the single review gate they share."
      caption="Two functions, separate inputs and outputs, one gate between them and the work leaving."
      viewBox="-269 -31 1023 414"
    >
      {TIES.map(([tx, ty], i) => (
        <line
          key={`gate-tie-${i}`}
          data-no-draw
          x1={tx}
          y1={ty}
          x2={GATE_X + IN_X}
          y2={GATE_Y + IN_Y}
          stroke="var(--blueprint)"
          strokeWidth={FIG_STROKE}
          strokeDasharray="5 6"
          strokeOpacity={0.7}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <IsoChain nodes={DEMAND} step={STEP} w={NODE_W} d={NODE_D} h={NODE_H} />
      <IsoChain
        nodes={NARRATIVE}
        step={STEP}
        w={NODE_W}
        d={NODE_D}
        h={NODE_H}
        y={NARRATIVE_Y}
      />

      <IsoBox w={GATE_W} d={GATE_D} h={GATE_H} fill="lavender" x={GATE_X} y={GATE_Y} />
      <IsoBox
        w={GATE_W}
        d={GATE_D}
        h={GATE_H * 0.55}
        fill="none"
        x={GATE_X}
        y={GATE_Y - GATE_H - 18}
      />

      <LeaderLabel
        x={GATE_X + GATE_CX + 200}
        y={GATE_Y + GATE_CY}
        dx={-200}
        dy={0}
        text="Shared review gate"
      />
    </Figure>
  );
}
