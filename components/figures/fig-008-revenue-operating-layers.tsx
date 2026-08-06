import { Figure } from "@/components/figures/Figure";
import { ExplodedStack, type StackLayer } from "@/components/figures/ExplodedStack";
import { isoPoint } from "@/components/figures/IsoBox";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_008 [ REVENUE OPERATING LAYERS ]
 *
 * Ground truth: the layer stack of the revenue operating system as built, at
 * chapter scale. FIG_001 names the layers; this plate also names the form each
 * layer took, because the chapter is about the order the layers were written
 * in and nothing here worked until the one under it existed.
 */

const GAP = 92;
const W = 150;
const THICKNESS = 12;

/** Top of the stack first, the way the reader takes it apart. */
const LAYERS: StackLayer[] = [
  { label: "Executive cadence", fill: "none" },
  { label: "Pipeline inspection", fill: "lavender" },
  { label: "Response windows", fill: "none" },
  { label: "Routing rules", fill: "teal" },
  { label: "Lifecycle stages", fill: "none" },
  { label: "Funnel definitions", fill: "blue", h: 18 },
];

/** What each layer is, as an artifact. Same order as the stack. */
const ARTIFACTS = [
  "Standing review",
  "Inspection screens",
  "Response table",
  "Rule table",
  "Stage set in CRM",
  "Written definitions",
];

/** Right-hand callout anchor: the far corner of the slab, plus a short run. */
const [RIGHT_X] = isoPoint(W, 0, 0);
const RUN = 60;

export function Fig008RevenueOperatingLayers() {
  return (
    <Figure
      num={8}
      title="Revenue operating layers"
      groundTruth="The revenue operating system as built, drawn as an exploded stack: funnel definitions at the base, then lifecycle stages, routing rules, response windows, pipeline inspection, and the executive cadence on top. Each layer is named on the left and its written form on the right."
      caption="Six layers, bottom up. Each one is a document before it is a system."
      viewBox="-316 -30 670 638"
    >
      <ExplodedStack layers={LAYERS} gap={GAP} labelSide="left" />

      {LAYERS.map((layer, i) => {
        const h = layer.h ?? THICKNESS;
        const [, top] = isoPoint(W, 0, h);
        const [, bottom] = isoPoint(W, 0, 0);
        return (
          <LeaderLabel
            key={`artifact-${layer.label}`}
            x={RIGHT_X + RUN}
            y={i * GAP + (top + bottom) / 2}
            dx={-RUN}
            dy={0}
            text={ARTIFACTS[i]}
            dashed
          />
        );
      })}
    </Figure>
  );
}
