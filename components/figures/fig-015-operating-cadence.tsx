import { Fragment } from "react";

import { Figure } from "@/components/figures/Figure";
import {
  FIG_STROKE,
  IsoBox,
  isoPoint,
  type FigFill,
} from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_015 [ OPERATING CADENCE ]
 *
 * Ground truth: the three standing artifacts the team ran on, and their
 * owners. The gap between slabs is the gap between meetings, so the plate says
 * "these run at different periods" without printing a period on the drawing.
 */

const W = 100;
const D = 70;
const H = 13;

const ARTIFACTS: Array<{ label: string; owner: string; at: number; fill: FigFill }> = [
  { label: "Weekly pipeline review", owner: "Revenue leads", at: 0, fill: "blue" },
  { label: "Monthly ledger review", owner: "Marketing", at: 170, fill: "teal" },
  { label: "Quarterly sponsor report", owner: "Executive sponsor", at: 420, fill: "lavender" },
];

const [CX, CY] = isoPoint(W / 2, D / 2, H);
const LABEL_RUN = 170;
const OWNER_RUN = 130;
/** Far corner of a slab, where the owner callout lands. */
const [OWNER_X, OWNER_Y] = isoPoint(W, 0, H);

export function Fig015OperatingCadence() {
  return (
    <Figure
      num={15}
      title="Operating cadence"
      groundTruth="The standing cadence as run: a weekly pipeline review, a monthly performance ledger review, and quarterly sponsor reporting, spaced by how often each one happens, each with a named owner."
      caption="The cadence artifacts, drawn on their review periods, with an owner named on each."
      viewBox="-357 -31 1087 344"
    >
      {ARTIFACTS.slice(0, -1).map((artifact, i) => {
        const [ax, ay] = isoPoint(artifact.at, 0);
        const [bx, by] = isoPoint(ARTIFACTS[i + 1].at, 0);
        return (
          <line
            key={`tie-${artifact.label}`}
            data-no-draw
            x1={ax + CX}
            y1={ay + CY}
            x2={bx + CX}
            y2={by + CY}
            stroke="var(--blueprint)"
            strokeWidth={FIG_STROKE}
            strokeDasharray="5 6"
            strokeOpacity={0.7}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      {ARTIFACTS.map(({ label, owner, at, fill }) => {
        const [ox, oy] = isoPoint(at, 0);
        return (
          <Fragment key={label}>
            <IsoBox w={W} d={D} h={H} fill={fill} x={ox} y={oy} />

            <LeaderLabel
              x={ox - LABEL_RUN}
              y={oy + CY}
              dx={LABEL_RUN + CX}
              dy={0}
              text={label}
            />

            <LeaderLabel
              x={ox + OWNER_X + OWNER_RUN}
              y={oy + OWNER_Y}
              dx={-OWNER_RUN}
              dy={0}
              text={owner}
              dashed
            />
          </Fragment>
        );
      })}
    </Figure>
  );
}
