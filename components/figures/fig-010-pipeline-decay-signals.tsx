import { Figure } from "@/components/figures/Figure";
import {
  FIG_STROKE,
  IsoBox,
  isoPoint,
  type FigFill,
} from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_010 [ PIPELINE DECAY SIGNALS ]
 *
 * Ground truth: the three inspection signals instrumented under the weekly
 * pipeline review: close-date drift, stage aging, and activity that never
 * advanced a deal. All three report into one review.
 *
 * The shape is a merge: three independent screens run against
 * the same pipeline and land in one meeting. Nothing on the plate carries a
 * threshold or a count; the thresholds are the gated part.
 */

/** Slab footprint, shared by the three signals and the review they feed. */
const W = 120;
const D = 80;
const H = 14;

/** Screen-space distance between stacked signal slabs. */
const ROW = 110;
/** Screen-space offset of the review slab from the signal run. */
const MERGE_X = 300;
const MERGE_Y = ROW;

const [CX, CY] = isoPoint(W / 2, D / 2, H);
/** The corner a tie leaves from, and the corner it arrives at. */
const [OUT_X, OUT_Y] = isoPoint(W, 0, H);
const [IN_X, IN_Y] = isoPoint(0, D, H);

/** Screen-space run from a label anchor out to the slab it names. */
const LABEL_RUN = 200;

const SIGNALS: Array<{ label: string; fill: FigFill }> = [
  { label: "Close-date drift", fill: "blue" },
  { label: "Stage aging", fill: "lavender" },
  { label: "Non-advancing activity", fill: "teal" },
];

export function Fig010PipelineDecaySignals() {
  return (
    <Figure
      num={10}
      title="Pipeline decay signals"
      groundTruth="The three pipeline inspection screens as instrumented: deals whose close date keeps moving, deals aging past their stage definition, and deals with activity that never advanced them. All three report into one weekly review."
      caption="Close-date drift, stage aging, and dead activity, each instrumented on its own and read together."
      viewBox="-387 -32 1092 370"
    >
      {/* Ties first, so the slabs sit on top of them. */}
      {SIGNALS.map((signal, i) => (
        <line
          key={`tie-${signal.label}`}
          data-no-draw
          x1={OUT_X}
          y1={i * ROW + OUT_Y}
          x2={MERGE_X + IN_X}
          y2={MERGE_Y + IN_Y}
          stroke="var(--blueprint)"
          strokeWidth={FIG_STROKE}
          strokeDasharray="5 6"
          strokeOpacity={0.7}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {SIGNALS.map((signal, i) => (
        <IsoBox key={signal.label} w={W} d={D} h={H} fill={signal.fill} y={i * ROW} />
      ))}

      {SIGNALS.map((signal, i) => (
        <LeaderLabel
          key={`label-${signal.label}`}
          x={-LABEL_RUN}
          y={i * ROW + CY}
          dx={LABEL_RUN + CX}
          dy={0}
          text={signal.label}
        />
      ))}

      <IsoBox w={W} d={D} h={H * 1.6} fill="none" x={MERGE_X} y={MERGE_Y} />

      <LeaderLabel
        x={MERGE_X + CX + LABEL_RUN}
        y={MERGE_Y + CY}
        dx={-LABEL_RUN}
        dy={0}
        text="Weekly pipeline review"
      />
    </Figure>
  );
}
