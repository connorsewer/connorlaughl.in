import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_016 [ CLAIM TO APPROVAL ]
 *
 * Ground truth: the claim register lifecycle as it runs on a messaging
 * architecture. It starts one step earlier than FIG_006 does, at the buyer
 * outcome, because that is what the chapter is about: the outcome comes first
 * and the claim has to earn its way to the page behind it.
 */

const STAGES: ChainNode[] = [
  { label: "Buyer outcome", fill: "blue" },
  { label: "Claim", fill: "none" },
  { label: "Evidence", fill: "teal" },
  { label: "Tier assignment", fill: "none" },
  { label: "Approval reference", fill: "lavender", gate: true },
  { label: "Published message", fill: "none" },
];

export function Fig016ClaimToApproval() {
  return (
    <Figure
      num={16}
      title="Claim to approval"
      groundTruth="The claim register lifecycle behind the messaging architecture: a buyer outcome, the claim made about it, the evidence, the tier that evidence earns, the approval reference that holds the claim until someone signs it, and the published message."
      caption="A claim reaches the page only after someone has put their name to it."
      viewBox="-246 -30 862 426"
    >
      <IsoChain nodes={STAGES} step={120} w={90} d={65} h={12} />
    </Figure>
  );
}
