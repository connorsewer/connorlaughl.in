import { Figure, type PlateProps } from "@/components/figures/Figure";
import { GridPlane } from "@/components/figures/GridPlane";
import { IsoBox, isoPoint } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_023 [ BUILD FLEET ]
 *
 * Ground truth: the eight systems the `/builds` section lists, standing in
 * three ranks by where they run. Five on the employer stack, one in the open,
 * two in the operator's own toolchain; the last box is the site this figure
 * renders on. One box per card, same order as the cards below the plate.
 * (The open shelf held two until hermes-agent was cut, 2026-08-06.)
 */

/** Shelf cell edge. Boxes stand inset on their cells. */
const CELL = 44;
const INSET = 8;
const BOX = CELL - INSET * 2;

type FleetBox = { col: number; h: number };

/** Screen offset of a box standing on shelf cell `col`. */
function cellOffset(col: number): [number, number] {
  return isoPoint(col * CELL + INSET, INSET);
}

function Shelf({
  x,
  y,
  boxes,
  fill,
}: {
  x: number;
  y: number;
  boxes: FleetBox[];
  fill: "blue" | "lavender" | "teal";
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <GridPlane cols={boxes.length} rows={1} cell={CELL} />
      {boxes.map(({ col, h }) => {
        const [bx, by] = cellOffset(col);
        return <IsoBox key={col} x={bx} y={by} w={BOX} h={h} d={BOX} fill={fill} />;
      })}
    </g>
  );
}

/** Heights vary so the ranks read as machines rather than as a bar chart. */
const EMPLOYER: FleetBox[] = [
  { col: 0, h: 30 },
  { col: 1, h: 24 },
  { col: 2, h: 27 },
  { col: 3, h: 22 },
  { col: 4, h: 26 },
];
const OPEN: FleetBox[] = [{ col: 0, h: 25 }];
const OPERATOR: FleetBox[] = [
  { col: 0, h: 27 },
  { col: 1, h: 31 },
];

export function Fig023BuildFleet({ showSubjectRail }: PlateProps = {}) {
  /* The callout on the last operator box: the page the reader is on. */
  const [siteX, siteY] = cellOffset(1);

  return (
    <Figure
      showSubjectRail={showSubjectRail}
      num={23}
      title="Build fleet"
      groundTruth="The eight systems the builds section lists, one box per card in card order: five running on the employer's marketing stack, one published in the open, and two in the operator's own toolchain, ending with the site this figure renders on."
      caption="The fleet, mustered: the employer stack, the open-source dashboard, and the operator's own toolchain, with the page you are reading standing last."
      viewBox="-148 -34 706 364"
    >
      {/* Rank 1: the employer stack. */}
      <Shelf x={0} y={40} boxes={EMPLOYER} fill="blue" />
      <LeaderLabel x={330} y={44} dx={-135} dy={92} text="Employer stack" />

      {/* Rank 2: the open-source pair. */}
      <Shelf x={0} y={230} boxes={OPEN} fill="teal" />
      <LeaderLabel x={-46} y={282} dx={32} dy={-18} text="Open source" />

      {/* Rank 3: the operator's own toolchain. */}
      <Shelf x={250} y={230} boxes={OPERATOR} fill="lavender" />
      {/* Points at the top of the last box: this site, on the operator shelf. */}
      <LeaderLabel x={448} y={168} dx={250 + siteX - 448 + 8} dy={230 + siteY - 168 - 32} text="You are here" />
      <LeaderLabel x={160} y={312} dx={62} dy={-24} text="Operator tooling" />
    </Figure>
  );
}
