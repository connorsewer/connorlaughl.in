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
