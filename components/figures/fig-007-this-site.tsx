import { ExplodedStack, type StackLayer } from "@/components/figures/ExplodedStack";
import { Figure } from "@/components/figures/Figure";

/**
 * FIG_007 [ THIS SITE ]
 *
 * Ground truth: the stack that renders the page the figure is on, including
 * the content gate every number passes through. Self-referential and checkable
 * by anyone reading the repository.
 */

/** Top of the stack first. */
const LAYERS: StackLayer[] = [
  { label: "Prerendered HTML", fill: "none" },
  { label: "Next.js App Router", fill: "blue" },
  { label: "Tailwind token layer", fill: "none" },
  { label: "React components", fill: "lavender" },
  { label: "Proof metrics gate", fill: "teal" },
  { label: "Typed content modules", fill: "none", h: 18 },
];

export function Fig007ThisSite() {
  return (
    <Figure
      num={7}
      title="This site"
      groundTruth="The portfolio's own build: typed content modules at the base, the proof-metrics gate above them, React components, the Tailwind token layer, Next.js App Router routes, and the prerendered HTML the build writes out."
      caption="The manual you are reading, drawn as its own exploded stack."
      viewBox="-333 -32 483 642"
    >
      <ExplodedStack layers={LAYERS} gap={92} labelSide="left" />
    </Figure>
  );
}
