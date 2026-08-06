/**
 * Figure system (spec §5). Primitives only: the numbered plates themselves
 * live in `components/figures/fig-0NN-*.tsx` and are registered in FIGURES.md.
 *
 * Every primitive strokes in `var(--blueprint)` at 1.25 and fills only from
 * the `--fig-*` tokens. Labels are mono, uppercase, and horizontal.
 */

export { Figure, type FigureProps } from "@/components/figures/Figure";
export {
  useFigureScale,
  AUTHORED_SCALE,
  type FigureScale,
} from "@/components/figures/FigureScale";
export { LeaderLabel, type LeaderLabelProps } from "@/components/figures/LeaderLabel";
export {
  PlateLabels,
  type PlateLabel,
  type PlateLabelsProps,
} from "@/components/figures/PlateLabels";
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
export {
  SignalPacket,
  type SignalPacketProps,
} from "@/components/figures/SignalPacket";
export {
  PlateCrosshair,
  type PlateCrosshairProps,
} from "@/components/figures/PlateCrosshair";
export { PLATE_DRAWN_ATTR, PLATE_DRAWN_EVENT } from "@/components/figures/plate-signal";

/* Numbered plates. Registry: FIGURES.md. Never renumber. */
export { Fig001RevenueOperatingLayers } from "@/components/figures/fig-001-revenue-operating-layers";
export { Fig002SignalToTouch } from "@/components/figures/fig-002-signal-to-touch";
export { Fig003LifecycleStages } from "@/components/figures/fig-003-lifecycle-stages";
export { Fig004AttributionJoin } from "@/components/figures/fig-004-attribution-join";
export { Fig005ApprovalGatePath } from "@/components/figures/fig-005-approval-gate-path";
export { Fig006ClaimToPublish } from "@/components/figures/fig-006-claim-to-publish";
export { Fig007ThisSite } from "@/components/figures/fig-007-this-site";
export { Fig008RevenueOperatingLayers } from "@/components/figures/fig-008-revenue-operating-layers";
export { Fig009ApprovalGatePath } from "@/components/figures/fig-009-approval-gate-path";
export { Fig010PipelineDecaySignals } from "@/components/figures/fig-010-pipeline-decay-signals";
export { Fig011SignalToTouch } from "@/components/figures/fig-011-signal-to-touch";
export { Fig012PillarToProof } from "@/components/figures/fig-012-pillar-to-proof";
export { Fig013IntegrationSequence } from "@/components/figures/fig-013-integration-sequence";
export { Fig014PerformanceLedgerJoin } from "@/components/figures/fig-014-performance-ledger-join";
export { Fig015OperatingCadence } from "@/components/figures/fig-015-operating-cadence";
export { Fig016ClaimToApproval } from "@/components/figures/fig-016-claim-to-approval";
export { Fig017TwoFunctionModel } from "@/components/figures/fig-017-two-function-model";
export { Fig018SchemaToPage } from "@/components/figures/fig-018-schema-to-page";
