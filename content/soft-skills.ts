/**
 * Soft-skills compendium model for the /edge route.
 *
 * Public-facing transformation of the source compendium that lives in
 * the CJL Vault at:
 *   04 Domains/Career/Resume & Positioning/
 *     Executive Soft Skills Compendium - GTM Engineer - 2026-05-13.md
 *
 * The vault file is a drafting source with internal-only naming and
 * approval-gated metrics. This file is the public-safe projection. It
 * mirrors the claim-posture model in proof-metrics.ts so the Edge page
 * can render confident copy while governance lives in source.
 *
 * Render rule: a proof anchor renders its `internalName` only when
 * `publicUse === "show"`. Otherwise the public surface gets the
 * `categoricalPhrase`. Anchors with `publicUse === "hide"` are dropped.
 */
import type { ClaimPosture, PublicUse } from "./proof-metrics";

export type ActSlug = "move" | "make-sense" | "build-leverage";

export type Act = {
  /** Roman numeral for the divider plate. */
  number: string;
  /** Title rendered on the act divider. */
  title: string;
  /** Single-line subtitle on the divider. */
  subtitle: string;
};

export const ACTS: Record<ActSlug, Act> = {
  move: {
    number: "I",
    title: "How I move",
    subtitle: "Judgment ahead of speed.",
  },
  "make-sense": {
    number: "II",
    title: "How I make ambiguity legible",
    subtitle: "Narrative, evidence, and trust as one stack.",
  },
  "build-leverage": {
    number: "III",
    title: "How I scale judgment",
    subtitle: "Delegation, governance, and the systems people actually use.",
  },
};

export type ProofAnchor = {
  /** Internal canonical name. Never rendered unless publicUse === "show". */
  internalName: string;
  /** Public-safe categorical phrase. Default render. */
  categoricalPhrase: string;
  posture: ClaimPosture;
  publicUse: PublicUse;
  /** Optional /case-studies/<slug> deep-link. */
  caseStudySlug?: string;
  /** Optional /longform/<slug> deep-link, used only if no caseStudySlug. */
  longformSlug?: string;
  /** Claim register id where applicable. */
  claimId?: string;
  /** Internal-only provenance note. Never rendered. */
  sourceNote?: string;
};

export type SoftSkillLanguage = {
  /** Single-line resume bullet, sentence case. */
  resume: string;
  /** First-person recruiter framing, one or two sentences. */
  recruiter: string;
  /** Interview prompt this skill answers. */
  interview: string;
};

export type SoftSkill = {
  /** Two-digit chapter number, "01".."11". */
  number: string;
  /** URL anchor slug. */
  slug: string;
  /** Skill name as rendered in the chapter plate. */
  name: string;
  /** Three-act grouping. */
  act: ActSlug;
  /** Working definition. Reads as one full sentence. */
  definition: string;
  /** Why-it-matters paragraph that continues the lead. */
  whyNow: string;
  /** Two- or three-sentence Connor-specific read. */
  connorRead: string;
  /** Three to five proof anchors per skill. */
  proof: ProofAnchor[];
  /** Language aside content. */
  language: SoftSkillLanguage;
  /** Avoid-reducing-to phrases joined by middot in the NOT footer. */
  not: string[];
};

/**
 * Hero copy and the closing pull-quote.
 *
 * `display`  is the H1 weight-ladder source string (split client-side).
 * `portfolio` lands the lede paragraph after the H1.
 * `stake`    is the single-line stake block before the chapters.
 * `moat`     is the closing one-line moat between two walnut rules.
 */
export const HERO_THESIS = {
  display: "Taste applied at velocity.",
  portfolio:
    "I build GTM systems where judgment is part of the architecture. That means clear specs, source-backed proof, human approval gates, trust calibration, and narrative discipline, on top of automation. In an AI-native GTM org, the leader's job is recognition. Knowing what is worth generating, what is worth trusting, and what is worth shipping.",
  stake: "Generation is cheap. The bottleneck is recognition.",
  moat:
    "My moat is taste applied at velocity. Senior GTM judgment, systems-level specificity, AI-native operating discipline. Without the slop, overclaiming, or trust collapse that usually comes with speed.",
};

export const softSkills: SoftSkill[] = [
  {
    number: "01",
    slug: "taste-applied-at-velocity",
    name: "Taste applied at velocity",
    act: "move",
    definition:
      "Recognizing what is good, true, sharp, useful, and on-brand fast enough to keep AI-native work from becoming polished mediocrity at scale.",
    whyNow:
      "In the agentic era, generation is cheap. The bottleneck is recognition: choosing the right brief, the right angle, the right proof, the right level of finish, and the right thing not to ship.",
    connorRead:
      "This is the umbrella skill. Judgment without slowness, speed without slop. I would rather pull a draft I have not sat with than ship one I cannot defend.",
    proof: [
      {
        internalName: "22-Agent Marketing OS",
        categoricalPhrase: "22-agent governed AI GTM operating system",
        posture: "directional",
        publicUse: "show",
        caseStudySlug: "ai-native-gtm",
        claimId: "CJL-CLAIM-021",
        sourceNote:
          "Mirrors proof-metrics.ts directional-posture entry; safe to render with context.",
      },
      {
        internalName: "Platform Narrative and ICP Intelligence System",
        categoricalPhrase: "platform narrative and ICP intelligence system",
        posture: "directional",
        publicUse: "show",
        caseStudySlug: "gtm-strategy-positioning",
        sourceNote:
          "Public via existing case study; categorical phrase matches case-study language.",
      },
      {
        internalName: "SEO/GEO Content Operating System",
        categoricalPhrase: "governed content workflows for SEO and GEO",
        posture: "directional",
        publicUse: "soften",
      },
      {
        internalName: "Executive Marketing Reporting System",
        categoricalPhrase: "executive marketing reporting cadence",
        posture: "directional",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Built AI-enabled GTM workflows that increased team throughput while preserving executive-quality review, brand standards, and claim discipline.",
      recruiter:
        "The value is faster recognition. I can tell quickly whether an idea, a claim, or an output will land for a buyer, a board, or a sales team.",
      interview: "Tell me about a time you improved speed without lowering quality.",
    },
    not: [
      "AI-powered content machine",
      "creative visionary",
      "move fast and break things",
    ],
  },

  {
    number: "02",
    slug: "specification-clarity",
    name: "Specification clarity",
    act: "move",
    definition:
      "Defining what good looks like with enough precision that a human team, vendor, or AI agent can execute without inventing the missing strategy.",
    whyNow:
      "Weak briefs create expensive ambiguity for humans and over-compliant slop from LLMs. Modern leaders need to specify goals, constraints, inputs, outputs, review gates, and non-goals.",
    connorRead:
      "Most of my work is turning messy GTM intent into schemas, intake forms, routing logic, briefs, proof standards, and review loops. The thing I write most often is the spec the AI agent or junior teammate can actually execute against.",
    proof: [
      {
        internalName: "Governed RFP/RFX AI Answer Library",
        categoricalPhrase:
          "a governed proposal AI workflow with source-backed answer libraries",
        posture: "internal-only",
        publicUse: "soften",
        sourceNote:
          "Internal name flagged approval-required in compendium external-use rule.",
      },
      {
        internalName: "Zoho CRM Lead Lifecycle and Routing Architecture",
        categoricalPhrase:
          "lead lifecycle and routing architecture in CRM",
        posture: "company-level",
        publicUse: "soften",
      },
      {
        internalName: "Leadership and Team Development Operating System",
        categoricalPhrase:
          "a leadership and team-development operating system",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "leadership-team-development",
      },
      {
        internalName: "SEO/GEO Content Operating System",
        categoricalPhrase: "governed content workflows for SEO and GEO",
        posture: "directional",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Translated ambiguous GTM priorities into executable briefs, schemas, workflows, SLAs, and review gates across marketing, sales, RevOps, and proposal operations.",
      recruiter:
        "I am strongest where strategy has to become an operating spec: who owns what, which inputs matter, what the output must prove, and where human judgment stays in the loop.",
      interview: "How do you brief people or agents when the problem is ambiguous?",
    },
    not: ["great communicator", "detail oriented", "prompt engineer"],
  },

  {
    number: "03",
    slug: "decision-quality-under-uncertainty",
    name: "Decision quality under uncertainty",
    act: "move",
    definition:
      "Making useful decisions when data is incomplete, incentives are mixed, and waiting for certainty would itself be a bad decision.",
    whyNow:
      "Executive work is rarely deterministic. AI sharpens this: outputs are probabilistic, source quality varies, and the leader has to decide when evidence is sufficient.",
    connorRead:
      "I build decision layers before making claims. Attribution hygiene, proof governance, pipeline inspection, source maps, executive reporting that separates signal from noise. Dashboards are inputs, never the final read.",
    proof: [
      {
        internalName: "Attribution False-Negative and Instrumentation Audit",
        categoricalPhrase:
          "attribution false-negative work and instrumentation hygiene",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "marketing-analytics-architecture",
      },
      {
        internalName: "Ghost Pipeline Detector",
        categoricalPhrase: "a ghost-pipeline detection and accountability layer",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "revenue-operations-pipeline-truth",
      },
      {
        internalName: "Executive Marketing Reporting System",
        categoricalPhrase: "executive marketing reporting cadence",
        posture: "directional",
        publicUse: "soften",
      },
      {
        internalName: "Career Claim Governance and Proof Library",
        categoricalPhrase: "career claim governance and proof-library discipline",
        posture: "internal-only",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Built decision-grade reporting that separated actual performance from instrumentation gaps across attribution, routing, CRM follow-up, and pipeline inspection.",
      recruiter:
        "I do not treat dashboards as truth by default. I look for the instrumentation gaps, incentive problems, and false negatives that distort GTM decisions.",
      interview: "Describe a decision you had to make with incomplete or unreliable data.",
    },
    not: ["data-driven leader", "analytics expert", "decisive executive"],
  },

  {
    number: "04",
    slug: "narrative-construction",
    name: "Narrative construction and sensemaking",
    act: "make-sense",
    definition:
      "Making ambiguity legible so an organization can act: what is happening, why it matters, what to believe, what not to claim, and what to do next.",
    whyNow:
      "Executive work is mostly creating the shared mental model that lets teams coordinate in uncertainty. Communicating decisions is the surface.",
    connorRead:
      "Narrative is infrastructure for me. The bridge between writing and systems building. Buyer economics, proof, market context, channels, and adoption paths all have to connect inside one frame.",
    proof: [
      {
        internalName: "Platform Narrative and ICP Intelligence System",
        categoricalPhrase: "platform narrative and ICP intelligence system",
        posture: "directional",
        publicUse: "show",
        caseStudySlug: "gtm-strategy-positioning",
      },
      {
        internalName: "Enterprise ICP and GTM Intelligence System",
        categoricalPhrase: "enterprise ICP and GTM intelligence system",
        posture: "directional",
        publicUse: "soften",
      },
      {
        internalName: "DebtNext SaaS Repositioning and Cross-Sell Engine",
        categoricalPhrase: "post-acquisition SaaS repositioning and cross-sell engine",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "debtnext-integration",
      },
      {
        internalName: "Outcome-First Narrative Architecture",
        categoricalPhrase: "outcome-first narrative architecture",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "outcome-first-repositioning",
        longformSlug: "outcome-first-narrative-architecture",
      },
    ],
    language: {
      resume:
        "Built outcome-first narrative architecture across complex business lines, connecting buyer pain, proof, market context, and sales-ready messaging.",
      recruiter:
        "I build narrative the way I build systems. Buyer economics, proof, constraints, claims, channels, and adoption paths all connect.",
      interview: "How do you create alignment when the business is complex or fragmented?",
    },
    not: ["storyteller", "brand strategist", "strong communicator"],
  },

  {
    number: "05",
    slug: "epistemic-humility-with-conviction",
    name: "Epistemic humility with conviction",
    act: "make-sense",
    definition:
      "Holding a strong point of view while staying willing to update it when the evidence, source quality, or operating reality changes.",
    whyNow:
      "AI-native executives need conviction to move and humility to avoid hallucinated certainty, vanity metrics, or overconfident strategy.",
    connorRead:
      "I put a stake in the ground while building claim governance, evidence tiers, public-safe language, and review gates around the claim. The thesis can be loud. The proof has to keep pace.",
    proof: [
      {
        internalName: "Career Claims Register and Proof Library",
        categoricalPhrase: "a claims register with posture tiers",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Governed RFP/RFX AI Answer Library",
        categoricalPhrase: "a governed proposal AI workflow",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Attribution False-Negative Audit",
        categoricalPhrase: "attribution false-negative work",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "marketing-analytics-architecture",
      },
      {
        internalName: "Public-Safety Claim Subset",
        categoricalPhrase: "public-safety claim discipline",
        posture: "internal-only",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Created claims governance and proof-library discipline to accelerate GTM execution while reducing legal, compliance, and credibility risk.",
      recruiter:
        "My bias is to move with a clear thesis, but I do not let the thesis outrun the proof. That matters in regulated markets and matters more with AI-generated work.",
      interview: "Tell me about a time you changed your mind after new evidence came in.",
    },
    not: ["humble leader", "lifelong learner", "confident decision maker"],
  },

  {
    number: "06",
    slug: "cross-functional-frame-fluency",
    name: "Cross-functional frame fluency",
    act: "make-sense",
    definition:
      "Thinking in finance, sales, product, compliance, engineering, and RevOps frames rather than translating marketing language at the surface.",
    whyNow:
      "Modern GTM leaders have to reason across functions. Translation is not enough. The executive has to understand what each function optimizes for and what proof they trust.",
    connorRead:
      "Cross-functional communication is the surface. The work is building artifacts that finance, sales, executives, product, compliance, and technical teams can each use without translation.",
    proof: [
      {
        internalName: "35+ KPI Revenue Funnel Architecture",
        categoricalPhrase: "35+ KPI revenue funnel architecture",
        posture: "verified",
        publicUse: "show",
        claimId: "CJL-CLAIM-025",
      },
      {
        internalName: "PE-Backed and Board-Ready GTM Reporting",
        categoricalPhrase: "PE-backed and board-ready GTM reporting",
        posture: "directional",
        publicUse: "soften",
      },
      {
        internalName: "Zoho CRM Lead Lifecycle Architecture",
        categoricalPhrase: "lead lifecycle architecture in CRM",
        posture: "company-level",
        publicUse: "soften",
      },
      {
        internalName: "DebtNext M&A GTM Integration",
        categoricalPhrase: "post-acquisition M&A GTM integration",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "debtnext-integration",
      },
      {
        internalName: "RFP/RFX Workflow Governance",
        categoricalPhrase: "RFP/RFX workflow governance",
        posture: "internal-only",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Built GTM operating artifacts usable across Sales, Marketing, RevOps, Finance, Compliance, Product, and executive stakeholders.",
      recruiter:
        "I can move between the CRO question, the CFO question, the product question, and the operator question without losing the GTM thread.",
      interview:
        "How do you align Sales, Marketing, Finance, Product, and Compliance around one GTM motion?",
    },
    not: ["collaborative", "cross-functional communicator", "stakeholder manager"],
  },

  {
    number: "07",
    slug: "trust-calibration",
    name: "Trust calibration",
    act: "make-sense",
    definition:
      "Knowing when to trust an AI output, dashboard, vendor, team member, or source. When to sample, when to verify, and when to throw it away.",
    whyNow:
      "Over-trusting destroys credibility. Under-trusting destroys the productivity gain. The scarce skill is calibration.",
    connorRead:
      "I design guardrails that preserve the productivity gain. Source-backed libraries, human review gates, audit trails, approval statuses, QA loops, pipeline inspection. The review loop is the unlock, not the brake.",
    proof: [
      {
        internalName: "22-Agent Governed AI Marketing OS",
        categoricalPhrase: "22-agent governed AI marketing operating system",
        posture: "directional",
        publicUse: "show",
        caseStudySlug: "ai-native-gtm",
        claimId: "CJL-CLAIM-021",
      },
      {
        internalName: "Governed RFP/RFX AI Answer Library",
        categoricalPhrase:
          "a governed proposal AI workflow with source-backed answer libraries",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Attribution False-Negative Audit",
        categoricalPhrase: "attribution false-negative audit work",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "marketing-analytics-architecture",
      },
      {
        internalName: "Career Claims Register and Proof Library",
        categoricalPhrase: "a claims register and proof-library discipline",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Ghost Pipeline Detector",
        categoricalPhrase: "a ghost-pipeline detection layer",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "revenue-operations-pipeline-truth",
      },
    ],
    language: {
      resume:
        "Designed AI and reporting workflows with trust calibration built in: source-backed inputs, sampling, human approval gates, auditability, and claim-status governance.",
      recruiter:
        "The productivity gain from AI only matters if people can trust what ships. I design the review loops and source discipline that make that possible.",
      interview: "When do you ship AI-assisted work, and when do you verify or reject it?",
    },
    not: ["AI governance", "responsible AI", "quality assurance"],
  },

  {
    number: "08",
    slug: "delegation-to-non-humans",
    name: "Delegation to non-humans",
    act: "build-leverage",
    definition:
      "Treating AI agents as operating participants that need context, goals, constraints, feedback, memory, review cycles, and ownership boundaries.",
    whyNow:
      "Leaders who treat agents as chatboxes get tool demos. Leaders who manage agents like junior team members get a repeatable operating system.",
    connorRead:
      "I have firsthand muscle here. Agent rosters, handoffs, task-specific workflows, source libraries, QA gates, review cycles. Each agent has a role, an owner, and a defined output, the same way I would onboard a teammate.",
    proof: [
      {
        internalName: "22-Agent Marketing OS",
        categoricalPhrase: "22-agent governed AI GTM operating system",
        posture: "directional",
        publicUse: "show",
        caseStudySlug: "ai-native-gtm",
        claimId: "CJL-CLAIM-021",
      },
      {
        internalName: "Governed RFP/RFX AI Answer Library",
        categoricalPhrase: "a governed proposal AI workflow",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Multi-Agent SEO/GEO Content Workflow",
        categoricalPhrase: "a multi-agent SEO and GEO content workflow",
        posture: "directional",
        publicUse: "soften",
      },
      {
        internalName: "JobOS / Hermes Personal Agent Operating Model",
        categoricalPhrase: "a personal agent operating model",
        posture: "internal-only",
        publicUse: "hide",
      },
    ],
    language: {
      resume:
        "Designed multi-agent GTM workflows with role-specific context, templates, handoffs, QA gates, and human approval loops.",
      recruiter:
        "I do not use agents as one-off tools. I give them context, constraints, review cycles, and operating roles, the same way I would onboard a new team member into a sensitive workflow.",
      interview: "What changes when you delegate work to AI agents instead of people?",
    },
    not: ["AI enthusiast", "prompting expert", "automation user"],
  },

  {
    number: "09",
    slug: "governance-without-drag",
    name: "Governance without drag",
    act: "build-leverage",
    definition:
      "Adding enough structure to make work safe, repeatable, and reviewable without turning the organization into a compliance swamp.",
    whyNow:
      "AI-native GTM will fail if governance is either absent or paralyzing. The executive skill is designing lightweight control systems.",
    connorRead:
      "Strong regulated-market differentiator for me. Claim tiers, proof libraries, RFP gates, compliance-aware content systems, executive review loops. Light enough to keep velocity, structured enough that nobody ships an unsupported claim.",
    proof: [
      {
        internalName: "Governed RFP/RFX AI Answer Library",
        categoricalPhrase:
          "a governed proposal AI workflow with source-backed answer libraries",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Career Claims Register and Proof Library",
        categoricalPhrase: "a claims register with posture tiers",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "Public-Safety Claim Subset",
        categoricalPhrase: "a public-safety claim subset for external surfaces",
        posture: "internal-only",
        publicUse: "soften",
      },
      {
        internalName: "SEO/GEO Content Operating System",
        categoricalPhrase: "governed content workflows for SEO and GEO",
        posture: "directional",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Built lightweight governance systems for regulated GTM work: proof tiers, approved-language libraries, review checkpoints, and public-safe claim boundaries.",
      recruiter:
        "I am comfortable operating in markets where speed matters but the cost of an unsupported claim is high.",
      interview: "How do you keep governance from slowing everyone down?",
    },
    not: ["process oriented", "risk manager", "compliance minded"],
  },

  {
    number: "10",
    slug: "signal-detection-and-instrumentation-skepticism",
    name: "Signal detection and instrumentation skepticism",
    act: "build-leverage",
    definition:
      "Finding the hidden signal in messy GTM data while questioning whether the system is measuring the right thing at all.",
    whyNow:
      "AI and dashboards can amplify bad measurement. The better leader asks whether the signal path is broken before making people optimize the wrong metric.",
    connorRead:
      "My proof library is unusually strong here. Attribution false negatives, ghost pipeline, signal-to-touch SLAs, lead routing, lifecycle definitions. A lot of what looks like strategy failure is measurement failure wearing a strategy costume.",
    proof: [
      {
        internalName: "Ghost Pipeline Detector",
        categoricalPhrase: "a ghost-pipeline detection and accountability layer",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "revenue-operations-pipeline-truth",
      },
      {
        internalName: "Attribution False-Negative Audit",
        categoricalPhrase: "attribution false-negative audit work",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "marketing-analytics-architecture",
      },
      {
        internalName: "Signal-Based Demand Generation Engine",
        categoricalPhrase: "signal-based demand generation engine",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "bdr-pod-signal-to-meeting",
        longformSlug: "signal-based-demand-engine",
      },
      {
        internalName: "Zoho CRM Lead Lifecycle and Routing",
        categoricalPhrase: "lead lifecycle and routing architecture in CRM",
        posture: "company-level",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Rebuilt GTM measurement logic around signal quality, attribution hygiene, lifecycle definitions, and sales follow-up inspection.",
      recruiter:
        "A lot of GTM underperformance comes from measurement failure, routing failure, or handoff failure wearing a strategy costume.",
      interview: "How do you know whether a GTM motion is actually working?",
    },
    not: ["data-driven", "dashboard builder", "funnel analytics"],
  },

  {
    number: "11",
    slug: "operator-empathy-and-adoption-design",
    name: "Operator empathy and adoption design",
    act: "build-leverage",
    definition:
      "Designing systems people will actually use: clear ownership, low-friction handoffs, feedback loops, and enough training to make the new behavior stick.",
    whyNow:
      "The best GTM architecture fails if sales, marketing, proposal, finance, or executives do not adopt it. AI workflows make adoption more important because the process is new and psychologically unfamiliar.",
    connorRead:
      "I turn systems into usable operating habits. Playbooks, cadence, team lanes, sales handoffs, dashboards, intake, QA. The system that nobody uses is a worse outcome than the messy process it replaced.",
    proof: [
      {
        internalName: "Leadership and Team Development Operating System",
        categoricalPhrase: "a leadership and team-development operating system",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "leadership-team-development",
      },
      {
        internalName: "Signal-Based Demand Generation Engine",
        categoricalPhrase: "signal-based demand generation engine",
        posture: "verified",
        publicUse: "show",
        caseStudySlug: "bdr-pod-signal-to-meeting",
      },
      {
        internalName: "Executive Marketing Reporting System",
        categoricalPhrase: "executive marketing reporting cadence",
        posture: "directional",
        publicUse: "soften",
      },
      {
        internalName: "Governed RFP/RFX AI Answer Library",
        categoricalPhrase: "a governed proposal AI workflow",
        posture: "internal-only",
        publicUse: "soften",
      },
    ],
    language: {
      resume:
        "Converted GTM strategy into adopted operating habits through playbooks, intake processes, review cadences, training loops, and role-specific artifacts.",
      recruiter:
        "I care less about whether a system looks impressive and more about whether the people closest to the work can use it every week.",
      interview: "Tell me about a system you built that people actually adopted.",
    },
    not: ["team player", "people leader", "change manager"],
  },
];

/**
 * Slugs of the four chapter teasers shown in the homepage echo block.
 * Picked to span: judgment, evidence, AI trust, adoption.
 */
export const HOMEPAGE_TEASER_SLUGS: ReadonlyArray<string> = [
  "taste-applied-at-velocity",
  "decision-quality-under-uncertainty",
  "trust-calibration",
  "operator-empathy-and-adoption-design",
];

/**
 * Render an anchor through the posture model. Returns null when the
 * anchor is hidden. Returned `text` is the categorical phrase by
 * default; the internal name only renders when publicUse === "show".
 * `href` deep-links to a case study or longform piece when present.
 */
export function renderProofAnchor(
  a: ProofAnchor,
): { text: string; href?: string } | null {
  if (a.publicUse === "hide") return null;
  const text = a.publicUse === "show" ? a.internalName : a.categoricalPhrase;
  const href = a.caseStudySlug
    ? `/case-studies/${a.caseStudySlug}`
    : a.longformSlug
      ? `/longform/${a.longformSlug}`
      : undefined;
  return { text, href };
}

/** Convenience lookup. */
export function getSoftSkill(slug: string): SoftSkill | undefined {
  return softSkills.find((s) => s.slug === slug);
}

/** Skills filtered by act, in source order. */
export function softSkillsByAct(act: ActSlug): SoftSkill[] {
  return softSkills.filter((s) => s.act === act);
}
