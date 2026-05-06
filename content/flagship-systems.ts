export type FlagshipSystem = {
  slug: string;
  eyebrow: string;
  title: string;
  thesis: string;
  plainEnglish: string;
  problem: string;
  system: string;
  governance: string;
  proof: string[];
  artifacts: string[];
  interviewLine: string;
};

export const flagshipSystems: FlagshipSystem[] = [
  {
    slug: "agentic-marketing-os",
    eyebrow: "GOVERNED AI WORKFLOW",
    title: "22-agent marketing workflow",
    thesis:
      "A governed workflow for turning strategy, market signals, and buyer context into usable marketing output with review built in.",
    plainEnglish:
      "I built an AI workflow that helps a small marketing team research, draft, QA, and summarize work faster. Human review stays in the path before anything external ships.",
    problem:
      "Marketing teams drown in handoffs, context loss, and one-off requests. AI adds speed. Without review gates, it also adds drift and risk.",
    system:
      "Specialist lanes for research, narrative, campaign planning, content production, QA, and executive summaries.",
    governance:
      "Human approval gates, artifact versioning, prompt rubrics, and escalation rules before anything external leaves the workflow.",
    proof: [
      "Governed RFP and outbound workflows built with AI-assisted research and drafting",
      "Faster RFP and outbound drafting with review gates built in",
      "Mandatory approval checkpoints before AI artifacts reach the field",
    ],
    artifacts: ["Agent roster", "handoff map", "approval checklist", "audit log schema"],
    interviewLine:
      "I use AI behind review gates: research, drafts, QA, summaries, and logs before anything ships.",
  },
  {
    slug: "ghost-pipeline-detector",
    eyebrow: "REVOPS ACCOUNTABILITY LAYER",
    title: "Pipeline Hygiene System",
    thesis:
      "A revenue accountability layer for finding stalled leads, unclear ownership, and pipeline that looks healthier than it is.",
    plainEnglish:
      "I built the rules and reporting layer that shows where leads stall, who owns the next step, and whether pipeline is real or just sitting in CRM.",
    problem:
      "Most funnel problems hide in definitions, stale stages, weak SLAs, and unclear handoffs between marketing, BDR, sales, and leadership reporting.",
    system:
      "Signal capture, enrichment, ICP scoring, lifecycle definitions, disposition rules, SLA timestamps, and pipeline hygiene views for leadership.",
    governance:
      "Defined funnel math, SLA reviews, disposition-code discipline, weekly cadence, and plain-English exception handling for leadership.",
    proof: [
      "Material influenced pipeline through a signal-to-revenue operating model",
      "Revenue funnel KPI model from awareness through revenue",
      "2-hour Tier A signal-to-touch SLA embedded into BDR pod execution",
    ],
    artifacts: ["Lifecycle map", "KPI dictionary", "SLA tracker", "weekly operating review"],
    interviewLine:
      "I make pipeline accountable by instrumenting the handoffs where revenue disappears.",
  },
  {
    slug: "platform-narrative-icp-intelligence",
    eyebrow: "POSITIONING AND ICP SYSTEM",
    title: "Platform narrative and ICP system",
    thesis:
      "A positioning and buyer-intelligence system that turns fragmented offerings into a clearer executive story and reusable sales language.",
    plainEnglish:
      "I turned a confusing service portfolio into a buyer-ready story with clear ICPs, value props, proof points, and language sales could reuse.",
    problem:
      "Enterprise portfolios often sell as a list of services. Buyers need a clear story, quantified outcomes, and proof they can repeat internally.",
    system:
      "ICP logic, segmentation, persona value props, outcome-first messaging, proof library, claims register, and enablement rules.",
    governance:
      "Claims register, proof status labels, language rules, versioned messaging, and sales enablement review paths.",
    proof: [
      "50+ page messaging system across 6 business units",
      "Outcome-first positioning tied to approved proof around payment lift, cost reduction, cycle time, and risk reduction",
      "Reusable proof library and claims register for consistent seller language",
    ],
    artifacts: ["ICP logic", "claims register", "persona map", "sales language system"],
    interviewLine:
      "I build the story and the proof system behind it: ICP, claims, proof, review rules, and sales-ready language.",
  },
];
