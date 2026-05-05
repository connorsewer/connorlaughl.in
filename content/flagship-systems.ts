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
    eyebrow: "AI-NATIVE OPERATING SYSTEM",
    title: "22-Agent Marketing OS",
    thesis:
      "A governed execution layer for turning strategy, market signals, and buyer context into faster marketing output without sacrificing review discipline.",
    plainEnglish:
      "I built a governed AI workflow that helps a small marketing team research, draft, QA, and summarize work faster while keeping humans in control before anything external ships.",
    problem:
      "Marketing teams drown in handoffs, context loss, and one-off requests. AI adds speed, but without governance it also adds drift and risk.",
    system:
      "A multi-agent workflow model with specialist lanes for research, narrative, campaign planning, content production, QA, and executive synthesis.",
    governance:
      "Human approval gates, artifact versioning, prompt/rubric discipline, and escalation rules before anything external leaves the system.",
    proof: [
      "AI-native GTM engine with governed RFP and outbound workflows",
      "40% cycle-time reduction in AI-assisted GTM/RFP motions",
      "99%+ compliance accuracy via mandatory approval checkpoints",
    ],
    artifacts: ["Agent roster", "handoff map", "approval-gate checklist", "audit log schema"],
    interviewLine:
      "I do not use AI as a content shortcut. I design AI operating systems with gates, ownership, and proof standards.",
  },
  {
    slug: "ghost-pipeline-detector",
    eyebrow: "REVOPS ACCOUNTABILITY LAYER",
    title: "Ghost Pipeline Detector",
    thesis:
      "A revenue accountability system for exposing hidden funnel leakage, ambiguous ownership, and pipeline that looks real until inspected.",
    plainEnglish:
      "I built the rules and reporting layer that shows where leads stall, who owns the next step, and whether pipeline is real or just sitting in the CRM.",
    problem:
      "Most funnel problems hide in definitions, stale stages, weak SLAs, and unclear handoffs between marketing, BDR, sales, and leadership reporting.",
    system:
      "Signal capture, enrichment, ICP scoring, lifecycle definitions, disposition rules, SLA timestamps, and executive-facing pipeline hygiene views.",
    governance:
      "Defined funnel math, SLA reviews, disposition-code discipline, weekly operating cadence, and board-explainable exception handling.",
    proof: [
      "$150M+ influenced pipeline through signal-to-revenue operating model",
      "35+ KPI revenue funnel architecture from awareness through revenue",
      "2-hour Tier A signal-to-touch SLA embedded into BDR pod execution",
    ],
    artifacts: ["Lifecycle map", "KPI dictionary", "SLA tracker", "weekly operating review"],
    interviewLine:
      "I make pipeline accountable by instrumenting the handoffs where revenue usually disappears.",
  },
  {
    slug: "platform-narrative-icp-intelligence",
    eyebrow: "MARKET ARCHITECTURE SYSTEM",
    title: "Platform Narrative / ICP Intelligence System",
    thesis:
      "A positioning and market-intelligence system that turns fragmented offerings into a coherent executive buying narrative and repeatable GTM motion.",
    plainEnglish:
      "I turned a confusing portfolio of services into a buyer-ready story with clear ICPs, value props, proof points, and language sales could reuse.",
    problem:
      "Enterprise portfolios often sell as a list of services. Buyers need a clear market architecture, quantified outcomes, and proof they can trust.",
    system:
      "ICP logic, segmentation, persona value props, outcome-first messaging, proof libraries, claims governance, and enablement architecture.",
    governance:
      "Claims register, proof status labels, language rules, versioned messaging, and legal/compliance-safe sales enablement workflows.",
    proof: [
      "50+ page messaging architecture across 6 business units",
      "Outcome-first positioning tied to payment lift, cost reduction, cycle time, and risk reduction",
      "Reusable proof library and claims register for consistent executive narrative",
    ],
    artifacts: ["ICP logic", "claims register", "persona map", "sales narrative system"],
    interviewLine:
      "I build narrative as infrastructure: ICP, claims, proof, governance, and sales-ready language.",
  },
];
