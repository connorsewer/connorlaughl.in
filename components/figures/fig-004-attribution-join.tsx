import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_004 [ ATTRIBUTION JOIN ]
 *
 * Ground truth: the performance ledger join path, from session and source
 * capture through to the ledger row that reconciles against closed revenue.
 */

const STAGES: ChainNode[] = [
  { label: "Session and source capture", fill: "blue" },
  { label: "Lead record", fill: "none" },
  { label: "Opportunity", fill: "lavender" },
  { label: "Closed revenue", fill: "none" },
  { label: "Ledger row", fill: "teal" },
];

export function Fig004AttributionJoin() {
  return (
    <Figure
      num={4}
      title="Attribution join"
      groundTruth="The performance ledger join path: web session and source capture, the lead record it lands on, the opportunity that lead becomes, the closed revenue behind it, and the single ledger row the join produces."
      caption="How a web session and a CRM record get joined into a single ledger row."
      viewBox="-348 -34 1003 469"
    >
      <IsoChain nodes={STAGES} />
    </Figure>
  );
}
