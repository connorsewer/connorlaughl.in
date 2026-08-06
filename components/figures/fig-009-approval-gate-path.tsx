import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";
import { FIG_STROKE, IsoBox, isoPoint } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_009 [ APPROVAL GATE PATH ]
 *
 * Ground truth: the proposal triage workflow end to end. FIG_005 draws the
 * run; this one draws what sits under it. Every stage writes
 * to the audit log, which is why the log is a strip beneath the whole path
 * rather than a last step on it.
 */

const STEP = 120;
const NODE_W = 90;
const NODE_D = 65;
const NODE_H = 12;

/** Screen drop from the run down to the log strip, clear of the stage labels. */
const LOG_DROP = 300;

const STAGES: ChainNode[] = [
  { label: "Intake", fill: "blue" },
  { label: "Classification", fill: "none" },
  { label: "Retrieval", fill: "teal" },
  { label: "Draft", fill: "none" },
  { label: "Human review gate", fill: "lavender", gate: true },
  { label: "Release", fill: "none" },
];

const [STEP_X, STEP_Y] = isoPoint(STEP, 0);
const [CX, CY] = isoPoint(NODE_W / 2, NODE_D / 2, NODE_H);

/** The log runs the length of the path. */
const LOG_W = (STAGES.length - 1) * STEP + NODE_W;
const LOG_D = 50;
/** Near-left corner of the log strip, where its label lands. */
const [LOG_IN_X, LOG_IN_Y] = isoPoint(0, LOG_D, 8);

export function Fig009ApprovalGatePath() {
  return (
    <Figure
      num={9}
      title="Approval gate path"
      groundTruth="The proposal triage workflow: intake, classification, retrieval, drafting, a human review gate that holds the work, and release. Every stage writes a row to the audit log drawn beneath the path."
      caption="Agents stage the work, a person releases it, and every stage leaves a record."
      viewBox="-247 -30 863 718"
    >
      {/* Each stage writes down into the log. Ties first. */}
      {STAGES.map((stage, i) => (
        <line
          key={`log-tie-${stage.label}`}
          data-no-draw
          x1={i * STEP_X + CX}
          y1={i * STEP_Y + CY}
          x2={i * STEP_X + CX}
          y2={i * STEP_Y + CY + LOG_DROP}
          stroke="var(--blueprint)"
          strokeWidth={FIG_STROKE}
          strokeDasharray="5 6"
          strokeOpacity={0.7}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      <IsoChain nodes={STAGES} step={STEP} w={NODE_W} d={NODE_D} h={NODE_H} />

      <IsoBox w={LOG_W} d={LOG_D} h={8} fill="blue" y={LOG_DROP} />

      <LeaderLabel
        x={-160}
        y={LOG_DROP + LOG_IN_Y}
        dx={160 + LOG_IN_X}
        dy={0}
        text="Audit log"
      />
    </Figure>
  );
}
