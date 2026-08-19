import { Figure } from "@/components/figures/Figure";
import { IsoChain, type ChainNode } from "@/components/figures/IsoChain";
import { LeaderLabel } from "@/components/figures/LeaderLabel";

/**
 * FIG_024 [ COMPILE-ONCE PATH ]
 *
 * Ground truth: the governed LLM wiki's build pipeline (Story Bank A14; LLM
 * Wiki inventory 2026-08-19). The source corpus is extracted, compiled into
 * interlinked articles, and verified before a build ships; verification is
 * drawn as a gate because a build with broken links or bad source IDs stops
 * there. Two reader callouts converge on the wiki slab because humans and AI
 * agents read the same pages, which is the system's whole argument. Counts
 * (articles, records) stay off the plate; they render through the claim gate
 * in the chapter's proof table.
 */

const STAGES: ChainNode[] = [
  { label: "Source corpus", fill: "blue" },
  { label: "Extract", fill: "none" },
  { label: "Compile", fill: "teal" },
  { label: "Verify", fill: "lavender", gate: true },
  { label: "Governed wiki", fill: "blue" },
];

export function Fig024CompileOncePath() {
  return (
    <Figure
      num={24}
      title="Compile-once path"
      groundTruth="The governed LLM wiki's pipeline: the source corpus is extracted, compiled into interlinked machine-readable articles, and verified before a build ships. The two converging callouts are the point of the system: human readers and AI agents read the same governed pages."
      caption="Compiled once, verified, then read by humans and agents from the same pages."
      viewBox="-192 -31 980 410"
    >
      <IsoChain nodes={STAGES} step={130} w={100} d={70} h={13} />
      {/* Both leaders land on the wiki slab: one set of pages, two kinds of
          reader. */}
      <LeaderLabel x={614} y={208} dx={-128} dy={70} text="Human readers" />
      <LeaderLabel x={614} y={330} dx={-118} dy={-32} text="Agent readers" />
    </Figure>
  );
}
