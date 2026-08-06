import { Figure, type PlateProps } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_006 [ CLAIM TO PUBLISH ]
 *
 * Ground truth: the claim register lifecycle this site runs on. The approval
 * reference is the gate; nothing reaches a publish surface without one.
 */

const STAGES: ChainNode[] = [
  { label: "Claim", fill: "blue" },
  { label: "Evidence", fill: "none" },
  { label: "Tier", fill: "teal" },
  { label: "Approval reference", fill: "lavender", gate: true },
  { label: "Publish surface", fill: "none" },
];

export function Fig006ClaimToPublish({ showSubjectRail }: PlateProps = {}) {
  return (
    <Figure
      showSubjectRail={showSubjectRail}
      num={6}
      title="Claim to publish"
      groundTruth="The claim register lifecycle used on this site: a claim is written down, evidence is attached, a tier is assigned, an approval reference is recorded, and only then does the claim reach a publish surface."
      caption="The register lifecycle for a claim, from first draft through to the published sentence."
      viewBox="-186 -34 821 469"
    >
      <IsoChain nodes={STAGES} />
    </Figure>
  );
}
