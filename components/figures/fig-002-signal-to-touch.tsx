import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";

/**
 * FIG_002 [ SIGNAL TO TOUCH ]
 *
 * Ground truth: the signal tiering model. Sources feed a tier assignment,
 * the tier picks the routing path, and the path carries a response window.
 */

const STAGES: ChainNode[] = [
  { label: "Signal sources", fill: "blue" },
  { label: "Tier assignment", fill: "none" },
  { label: "Routing path", fill: "teal" },
  { label: "Response window", fill: "lavender" },
];

export function Fig002SignalToTouch() {
  return (
    <Figure
      num={2}
      title="Signal to touch"
      groundTruth="The signal tiering model: buying-signal sources, the tier each signal is assigned, the routing path that tier selects, and the response window attached to that path."
      caption="Where a buying signal enters, which tier it lands in, and who has to answer it."
      viewBox="-256 -34 761 374"
    >
      <IsoChain nodes={STAGES} />
    </Figure>
  );
}
