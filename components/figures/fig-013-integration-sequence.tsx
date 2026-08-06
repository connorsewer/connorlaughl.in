import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_013 [ INTEGRATION SEQUENCE ]
 *
 * Ground truth: the marketing integration stages run on an acquired
 * business. Claims review is drawn as a gate because regulated copy stops
 * there until it is cleared, and the jurisdiction requirements are the last
 * thing the sequence has to satisfy rather than the first thing it assumes.
 */

const STAGES: ChainNode[] = [
  { label: "Brand consolidation", fill: "blue" },
  { label: "Site merge", fill: "none" },
  { label: "Lifecycle mapping", fill: "teal" },
  { label: "Claims review", fill: "lavender", gate: true },
  { label: "Jurisdiction requirements", fill: "none" },
];

export function Fig013IntegrationSequence() {
  return (
    <Figure
      num={13}
      title="Integration sequence"
      groundTruth="The marketing integration stages: brand consolidation, site merge, lifecycle mapping, a claims review that holds regulated copy until it clears, and the jurisdiction requirements the result has to satisfy."
      caption="An acquired brand gets folded in on this sequence, and the claims review comes before launch."
      viewBox="-292 -31 847 394"
    >
      <IsoChain nodes={STAGES} step={130} w={100} d={70} h={13} />
    </Figure>
  );
}
