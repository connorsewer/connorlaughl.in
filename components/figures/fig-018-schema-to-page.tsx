import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_018 [ SCHEMA TO PAGE ]
 *
 * Ground truth: the structured content pipeline. A page comes off a schema and
 * a content record through a template, and the QA check is drawn as a gate
 * because that is where accessibility and markup problems get caught instead
 * of shipping.
 */

const STAGES: ChainNode[] = [
  { label: "Schema", fill: "blue" },
  { label: "Content record", fill: "none" },
  { label: "Template", fill: "teal" },
  { label: "QA check", fill: "lavender", gate: true },
  { label: "Published page", fill: "none" },
];

export function Fig018SchemaToPage() {
  return (
    <Figure
      num={18}
      title="Schema to page"
      groundTruth="The structured content pipeline: a schema, the content record written against it, the template that renders it, a QA check that holds the page until it passes, and the published page."
      caption="Pages come off a schema, not a brief, and nothing publishes past the check."
      viewBox="-192 -31 747 394"
    >
      <IsoChain nodes={STAGES} step={130} w={100} d={70} h={13} />
    </Figure>
  );
}
