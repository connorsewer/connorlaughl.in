/**
 * Soft-skills compendium model for the /edge route.
 *
 * Public-facing transformation of the source compendium that lives in
 * the CJL Vault at:
 *   04 Domains/Career/Resume & Positioning/
 *     Executive Soft Skills Compendium - GTM Engineer - 2026-05-13.md
 *
 * The vault file is a drafting source with internal-only naming,
 * approval-gated metrics, and prep artifacts (resume bullets, recruiter
 * lines, interview prompts, avoid-reducing-to phrases). This file is
 * the public-safe projection. Each chapter publishes a single
 * principle plus a concrete signature; the prep material stays in the
 * vault.
 *
 * Render rule: a proof anchor renders its `internalName` only when
 * `publicUse === "show"`. Otherwise the public surface gets the
 * `categoricalPhrase`. Anchors with `publicUse === "hide"` are dropped.
 *
 * Chapter names are the deck-17.4 register shift (re-story phase 4,
 * approved 2026-08-06): each title is something Connor would say out loud
 * to a colleague. Bodies, slugs, and anchors are unchanged, so every
 * existing deep link survives; the two titles the deck confirmed verbatim
 * are 08 and 10.
 */
import type { ClaimPosture, PublicUse } from "./proof-metrics";

export type ActSlug = "move" | "make-sense" | "build-systems";

export type Act = {
  /** Roman numeral for the divider plate. */
  number: string;
  /** Title rendered on the act divider. */
  title: string;
  /** Act framing paragraph. Approved copy deck, section 5, verbatim. */
  subtitle: string;
};

export const ACTS: Record<ActSlug, Act> = {
  move: {
    number: "I",
    title: "How I move",
    subtitle:
      "Speed and taste usually trade against each other. These are the habits that keep both: reading a problem fast, writing the spec before the work starts, and deciding well while the picture is still incomplete.",
  },
  "make-sense": {
    number: "II",
    title: "How I make ambiguity legible",
    subtitle:
      "Most of the executive job is turning fog into something a team can act on. That takes a narrative that holds up under questioning, plus enough fluency in other functions' frames to argue in their language.",
  },
  "build-systems": {
    number: "III",
    title: "How I scale judgment",
    subtitle:
      "Judgment stops scaling the moment it only lives in your head. I taught myself to code, then built governed AI workflows with human approval gates and audit trails. Material productivity lift from a governed AI operating layer. The rest is delegation to people and to agents, governance that doesn't drag, skepticism about my own instrumentation, and designing for whoever runs the thing after me.",
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
  /** First-person principle. The position this chapter publishes. */
  principle: string;
  /** Concrete behavioral marker. What this looks like in operator work. */
  signature: string;
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
  /** Language aside content (principle + signature). */
  language: SoftSkillLanguage;
};

/**
 * Historical. The hero, stake, and closing blocks this fed were replaced in
 * Task 15 by the approved deck's page intro, so nothing renders these fields
 * and `scripts/word-counts.mjs` no longer counts them. Retained for one
 * release so the wording is recoverable without git archaeology; the legacy
 * sweep may delete it.
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
    name: "Moving fast without losing taste",
    act: "move",
    definition:
      "Recognizing what is good, true, sharp, useful, and on-brand fast enough to keep AI-native work from becoming a high volume of competent, forgettable output.",
    whyNow:
      "Generation is cheap now. The bottleneck is recognition: knowing which brief, which angle, and which proof to spend the finish on.",
    connorRead:
      "This is the umbrella skill. I would rather pull a draft I have not sat with than ship one I cannot defend.",
    proof: [
      {
        internalName: "22-Agent Marketing OS",
        categoricalPhrase: "a governed AI GTM operating layer",
        posture: "directional",
        publicUse: "soften",
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
      principle:
        "The value is faster recognition. I can tell quickly whether an idea, a claim, or an output will land for a buyer, a board, or a sales team.",
      signature:
        "The content review checkpoint reads the brief and the proof standard before anyone spends a day on finish work.",
    },
  },

  {
    number: "02",
    slug: "specification-clarity",
    name: "Writing briefs a team can build from",
    act: "move",
    definition:
      "Defining what good looks like with enough precision that a human team, vendor, or AI agent can execute without inventing the missing strategy.",
    whyNow:
      "Weak briefs create expensive ambiguity for humans and over-compliant slop from LLMs. Modern leaders need to specify goals, constraints, inputs, outputs, review gates, and non-goals.",
    connorRead:
      "Most of my work is turning messy GTM intent into schemas, intake forms, routing logic, briefs, proof standards, and review loops. The thing I write most often is the spec the AI agent or junior teammate can execute against.",
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
      principle:
        "I am strongest where strategy has to become an operating spec: who owns what, which inputs matter, what the output must prove, and where human judgment stays in the loop.",
      signature:
        "The thing I write most often is an intake spec that says what the output has to prove and who signs off on it.",
    },
  },

  {
    number: "03",
    slug: "decision-quality-under-uncertainty",
    name: "Making the call with half the data",
    act: "move",
    definition:
      "Making useful decisions when data is incomplete, incentives are mixed, and waiting for certainty would itself be a bad decision.",
    whyNow:
      "Executive work is rarely deterministic. AI sharpens this: outputs are probabilistic, source quality varies, and the leader has to decide when evidence is sufficient.",
    connorRead:
      "I build decision layers before making claims. Attribution hygiene, proof governance, pipeline inspection, source maps, executive reporting that separates signal from noise.",
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
      principle:
        "A dashboard is an input to me, and I read it looking for the instrumentation gaps, incentive problems, and false negatives that distort GTM decisions.",
      signature:
        "I built the ghost-pipeline detector after a forecast that looked fine while the deals underneath it stopped moving. It watches close-date drift and stage aging.",
    },
  },

  {
    number: "04",
    slug: "narrative-construction",
    name: "Giving the team a story it can act on",
    act: "make-sense",
    definition:
      "Making ambiguity legible so an organization can act: what is happening, why it matters, what to believe, what not to claim, and what to do next.",
    whyNow:
      "Executive work is mostly creating the shared mental model that lets teams coordinate in uncertainty.",
    connorRead:
      "The messaging work starts with what the buyer is purchasing, then the proof that survives a compliance read, then the words a rep can say out loud. I write it down so the story stops drifting by business unit.",
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
        publicUse: "soften",
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
      principle:
        "I build narrative the way I build systems. Buyer economics, proof, constraints, claims, channels, and adoption paths all connect.",
      signature:
        "The messaging system is versioned, with a named owner on every claim and a change log for every rewrite.",
    },
  },

  {
    number: "05",
    slug: "epistemic-humility-with-conviction",
    name: "Changing my mind when the evidence says to",
    act: "make-sense",
    definition:
      "Holding a strong point of view while staying willing to update it when the evidence, source quality, or operating reality changes.",
    whyNow:
      "AI-native executives need conviction to move and humility to avoid hallucinated certainty, vanity metrics, or overconfident strategy.",
    connorRead:
      "I put a stake in the ground while building claim governance, evidence tiers, public-safe language, and review gates around the claim. The thesis can be loud as long as the evidence tier behind it is current.",
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
      principle:
        "My bias is to move with a clear thesis, but I do not let the thesis outrun the proof. That matters in regulated markets and matters more with AI-generated work.",
      signature:
        "This site runs on a claims register: every number carries a tier and the name of whoever approved it.",
    },
  },

  {
    number: "06",
    slug: "cross-functional-frame-fluency",
    name: "Speaking finance, sales, and engineering",
    act: "make-sense",
    definition:
      "Thinking in finance, sales, product, compliance, engineering, and RevOps frames rather than translating marketing language at the surface.",
    whyNow:
      "Modern GTM leaders have to reason across functions. The executive has to understand what each function optimizes for and what proof it trusts.",
    connorRead:
      "Each function trusts different proof. The artifacts have to be usable by finance, sales, product, and compliance without a translation layer in between.",
    proof: [
      {
        internalName: "35+ KPI Revenue Funnel Architecture",
        categoricalPhrase: "the revenue funnel KPI architecture",
        posture: "verified",
        publicUse: "soften",
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
        publicUse: "soften",
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
      principle:
        "I can move between the CRO question, the CFO question, the product question, and the operator question without losing the GTM thread.",
      signature:
        "One funnel definition document sits under the CFO's model and the CRO's forecast, so both are arguing from the same denominator.",
    },
  },

  {
    number: "07",
    slug: "trust-calibration",
    name: "Deciding what to trust, and how much",
    act: "make-sense",
    definition:
      "Knowing when to trust an AI output, dashboard, vendor, team member, or source. When to sample, when to verify, and when to throw it away.",
    whyNow:
      "Over-trusting an AI output costs credibility. Under-trusting it costs the productivity gain that justified the workflow.",
    connorRead:
      "I design guardrails that preserve the productivity gain. Source-backed libraries, human review gates, audit trails, approval statuses, QA loops, pipeline inspection. The review loop is what makes the productivity gain usable.",
    proof: [
      {
        internalName: "22-Agent Governed AI Marketing OS",
        categoricalPhrase: "a governed AI marketing operating layer",
        posture: "directional",
        publicUse: "soften",
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
      principle:
        "The productivity gain from AI only matters if people can trust what ships. I design the review loops and source discipline that make that possible.",
      signature:
        "Proposal triage moved from a day-scale workflow to a minutes-scale one, and a person still releases the answers that leave the building.",
    },
  },

  {
    number: "08",
    slug: "delegation-to-non-humans",
    name: "Managing a team that includes agents",
    act: "build-systems",
    definition:
      "Treating AI agents as operating participants that need context, goals, constraints, feedback, memory, review cycles, and ownership boundaries.",
    whyNow:
      "An agent needs the same things a new teammate needs: context, a defined output, an owner, and a review cycle.",
    connorRead:
      "I keep an agent roster with handoffs, source libraries, and QA gates written down. Each agent has a role, an owner, and a defined output, the same way I would onboard a teammate.",
    proof: [
      {
        internalName: "22-Agent Marketing OS",
        categoricalPhrase: "a governed AI GTM operating layer",
        posture: "directional",
        publicUse: "soften",
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
      principle:
        "I give agents context, constraints, review cycles, and operating roles, the same way I would onboard a new team member into a sensitive workflow.",
      signature:
        "Each agent in the GTM layer has a role, an owner, a defined output, and a review cycle, which is the same onboarding a new teammate gets.",
    },
  },

  {
    number: "09",
    slug: "governance-without-drag",
    name: "Guardrails a team can ship through",
    act: "build-systems",
    definition:
      "Adding enough structure to make work safe, repeatable, and reviewable without turning the organization into a review process nobody can ship through.",
    whyNow:
      "AI-native GTM will fail if governance is either absent or paralyzing. The executive skill is designing lightweight control systems.",
    connorRead:
      "Claim tiers, proof libraries, proposal gates, compliance-aware content systems, executive review loops. The gates are thin. Nothing with an unsupported claim gets past them.",
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
      principle:
        "I am comfortable operating in markets where speed matters but the cost of an unsupported claim is high.",
      signature:
        "An approved-language library sits next to the claim tiers. A rep looking for a defensible sentence finds one that already cleared review.",
    },
  },

  {
    number: "10",
    slug: "signal-detection-and-instrumentation-skepticism",
    name: "Knowing when a dashboard is lying",
    act: "build-systems",
    definition:
      "Finding the hidden signal in messy GTM data while questioning whether the system is measuring the right thing at all.",
    whyNow:
      "AI and dashboards can amplify bad measurement. The better leader asks whether the signal path is broken before making people optimize the wrong metric.",
    connorRead:
      "Attribution false negatives, ghost pipeline, signal-to-touch SLAs, lead routing, lifecycle definitions. A lot of what looks like strategy failure is measurement failure wearing a strategy costume.",
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
      principle:
        "Before I ask a team to fix the strategy, I check whether the measurement and the handoff are doing what the diagram says they do.",
      signature:
        "The attribution audit started with a report that said a channel produced nothing. The channel was producing. The hidden fields were empty.",
    },
  },

  {
    number: "11",
    slug: "operator-empathy-and-adoption-design",
    name: "Building systems people keep using",
    act: "build-systems",
    definition:
      "Designing systems people keep using: clear ownership, low-friction handoffs, feedback loops, and enough training to make the new behavior stick.",
    whyNow:
      "The best GTM architecture fails if sales, marketing, proposal, finance, or executives do not adopt it. AI workflows make adoption more important because the process is new and psychologically unfamiliar.",
    connorRead:
      "I turn systems into usable operating habits. Playbooks, cadence, team lanes, sales handoffs, dashboards, intake, QA. Adoption is the test. A system nobody opens on a Tuesday did not work.",
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
      principle:
        "I care less about whether a system looks impressive and more about whether the people closest to the work can use it every week.",
      signature:
        "Playbooks, intake forms, and training all sat under the weekly operating review I built and chaired.",
    },
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
