import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_005 [ APPROVAL GATE PATH ]
 *
 * Ground truth: the governed AI workflow for proposal triage. The double
 * outline on the review step is the human gate: work stops there until a
 * person releases it.
 */

const STAGES: ChainNode[] = [
  { label: "Intake", fill: "blue" },
  { label: "Classification", fill: "none" },
  { label: "Retrieval", fill: "teal" },
  { label: "Draft", fill: "none" },
  { label: "Human review gate", fill: "lavender", gate: true },
  { label: "Release", fill: "none" },
  { label: "Audit log", fill: "blue" },
];

export function Fig005ApprovalGatePath() {
  return (
    <Figure
      num={5}
      title="Approval gate path"
      groundTruth="The governed proposal-triage workflow: intake, classification, retrieval, drafting, a human review gate that holds the work, release, and the audit log written on the way out."
      caption="Agents stage the work. A human approves it before it leaves."
      viewBox="-194 -32 916 490"
    >
      <IsoChain nodes={STAGES} step={120} w={90} d={65} h={12} />
    </Figure>
  );
}
