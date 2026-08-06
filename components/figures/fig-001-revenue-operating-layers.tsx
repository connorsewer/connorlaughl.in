import { ExplodedStack, type StackLayer } from "@/components/figures/ExplodedStack";
import { Figure } from "@/components/figures/Figure";

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

export function Fig001RevenueOperatingLayers() {
  return (
    <Figure
      num={1}
      title="Revenue operating layers"
      groundTruth="The layer stack of the revenue operating system built from zero: funnel definitions at the base, then lifecycle stages, routing rules, response windows, pipeline inspection, and the executive cadence that sits on top."
      caption="The stack, bottom up. Each layer was a blank page first."
      viewBox="-318 -32 467 642"
      className="mx-auto max-w-[34rem]"
    >
      <ExplodedStack layers={LAYERS} gap={92} labelSide="left" />
    </Figure>
  );
}
