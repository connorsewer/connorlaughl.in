/**
 * Figure system (spec §5). Primitives only: the numbered plates themselves
 * live in `components/figures/fig-0NN-*.tsx` and are registered in FIGURES.md.
 *
 * Every primitive strokes in `var(--blueprint)` at 1.25 and fills only from
 * the `--fig-*` tokens. Labels are mono, uppercase, and horizontal.
 */

export { Figure, type FigureProps } from "@/components/figures/Figure";
export { LeaderLabel, type LeaderLabelProps } from "@/components/figures/LeaderLabel";
export {
  IsoBox,
  isoPoint,
  isoPolygon,
  figFill,
  ISO_COS,
  FIG_STROKE,
  type IsoBoxProps,
  type FigFill,
} from "@/components/figures/IsoBox";
export {
  ExplodedStack,
  type ExplodedStackProps,
  type StackLayer,
} from "@/components/figures/ExplodedStack";
export {
  GridPlane,
  type GridPlaneProps,
  type GridCell,
} from "@/components/figures/GridPlane";
export {
  IsoChain,
  type IsoChainProps,
  type ChainNode,
} from "@/components/figures/IsoChain";

/* Numbered plates. Registry: FIGURES.md. Never renumber. */
export { Fig001RevenueOperatingLayers } from "@/components/figures/fig-001-revenue-operating-layers";
export { Fig002SignalToTouch } from "@/components/figures/fig-002-signal-to-touch";
export { Fig003LifecycleStages } from "@/components/figures/fig-003-lifecycle-stages";
export { Fig004AttributionJoin } from "@/components/figures/fig-004-attribution-join";
export { Fig005ApprovalGatePath } from "@/components/figures/fig-005-approval-gate-path";
export { Fig006ClaimToPublish } from "@/components/figures/fig-006-claim-to-publish";
export { Fig007ThisSite } from "@/components/figures/fig-007-this-site";
