import { ExplodedStack, type StackLayer } from "@/components/figures/ExplodedStack";
import { Figure, type PlateProps } from "@/components/figures/Figure";

/**
 * FIG_001 [ REVENUE OPERATING LAYERS ]
 *
 * Ground truth: the layer stack of the revenue operating system as built.
 * Every slab names a layer that exists in that system. Registered in
 * FIGURES.md. No claim numeral appears on the plate.
 */

/** Top of the stack first, so the plate reads bottom up. */
const LAYERS: StackLayer[] = [
  { label: "Executive cadence", fill: "none" },
  { label: "Pipeline inspection", fill: "lavender" },
  { label: "Response windows", fill: "none" },
  { label: "Routing rules", fill: "teal" },
  { label: "Lifecycle stages", fill: "none" },
  { label: "Funnel definitions", fill: "blue", h: 18 },
];

export function Fig001RevenueOperatingLayers({ showSubjectRail }: PlateProps = {}) {
  return (
    <Figure
      showSubjectRail={showSubjectRail}
      num={1}
      title="Revenue operating layers"
      groundTruth="The layer stack of the revenue operating system built from zero: funnel definitions at the base, then lifecycle stages, routing rules, response windows, pipeline inspection, and the executive cadence that sits on top."
      caption="Read this stack bottom up. The definitions came first and everything above them depends on them."
      viewBox="-318 -32 467 642"
    >
      <ExplodedStack layers={LAYERS} gap={92} labelSide="left" />
    </Figure>
  );
}
