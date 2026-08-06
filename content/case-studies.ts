import type { ProofMetric } from "./proof-metrics";

/**
 * Public case-study model for the proof-led rebuild.
 *
 * Every entry carries the 5-part case logic (business problem, what I built,
 * what changed, why it mattered, what it proves) and a proofMetrics array.
 * Each metric has a claim posture in source so the public UI can be confident
 * while governance stays intact.
 *
 * Legacy fields (label, deck, outcome, scope, stack, governance, bullets)
 * remain so existing routes that consume them still render. They are now
 * derived from the 5-part fields and proofMetrics.
 */
export type AudienceTag =
  | "Executive marketing leadership"
  | "RevOps and pipeline accountability"
  | "AI GTM systems"
  | "Demand generation"
  | "Product marketing and narrative"
  | "Post-acquisition GTM"
  | "SEO/GEO and content systems";

export type CaseStudy = {
  slug: string;
  /**
   * Chapter plate key. Resolves through the figure registry in
   * `app/case-studies/[slug]/page.tsx`. Omitted where no honest figure exists:
   * a text-only chapter is the sanctioned fallback (spec §5).
   */
  figureSlug?: string;
  label: string;
  title: string;
  hook: string;
  audienceFit: AudienceTag[];
  /** Whether this case appears in the homepage signature-systems grid. */
  signature: boolean;
  signatureOrder?: number;
  /** Five-part case logic. */
  businessProblem: string;
  whatIBuilt: string;
  whatChanged: string;
  whyItMattered: string;
  whatItProves: string;
  /** Chapter intro paragraphs, deck-verbatim. `{S6}` resolves through proof-metrics. */
  chapterIntro: string[];
  proofMetrics: ProofMetric[];
  systemsBuilt: string[];
  artifactIdeas: string[];
  governanceNotes: string[];
  interviewLine: string;
  sourceCrossrefs?: string[];
  longformHref?: string;

  /* Legacy fields. Kept for backward compatibility with index renderers. */
  deck: string;
  outcome: string;
  scope: string;
  stack: string;
  governance: string;
  bullets: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "revenue-operations-signal-to-revenue",
    figureSlug: "fig-008",
    label: "REVENUE OPERATING SYSTEM",
    title: "Revenue operating system from zero",
    hook: "The funnel definitions, lifecycle stages, routing, and reporting that turned scattered activity into one system.",
    chapterIntro: [
      "There was no revenue system here before this. No agreed funnel, no lifecycle stages, no routing rules, and no reporting anyone trusted enough to argue with. I wrote the definitions first, built the plumbing under them, then put a weekly cadence on top so leaders had one place to look.",
    ],
    audienceFit: [
      "Executive marketing leadership",
      "RevOps and pipeline accountability",
    ],
    signature: true,
    signatureOrder: 1,
    businessProblem:
      "Marketing, sales, CRM, attribution, and reporting were not operating as one revenue system. Leadership needed pipeline truth, not activity summaries.",
    whatIBuilt:
      "I built the operating layer: lifecycle definitions, attribution logic, 35+ KPI funnel architecture, reverse-funnel math, close-date movement tracking, CRM and data governance, executive dashboards, and a board-ready reporting cadence.",
    whatChanged:
      "Pipeline influence, source quality, funnel movement, sales follow-through, and investment needs became easier to inspect from one shared system.",
    whyItMattered:
      "Marketing earned credibility as revenue infrastructure because the work could be measured, challenged, and improved.",
    whatItProves:
      "I can operate at VP of Marketing & GTM and acting-CMO altitude while building the RevOps mechanics underneath the strategy.",
    /* Claim-scope pass 2026-08-06. The exact pipeline figure (P5,
       CJL-CLAIM-001) is scoped to the cover route by DECISIONS Gate 1, so it
       is gone from here; the softened form (P6) already carries the chapter in
       `outcome`. Net-new revenue (CJL-CLAIM-002), margin contribution
       (CJL-CLAIM-004) and CRM completeness (CJL-CLAIM-016) map to no cleared
       proof point in the spine and have no approved softened form, so they are
       dropped rather than softened. */
    proofMetrics: [
      {
        value: "35+",
        label: "KPI revenue funnel framework",
        context: "awareness through revenue with unit economics",
        claimId: "CJL-CLAIM-025",
        posture: "verified",
        publicUse: "show",
        sourceNote: "Spine P1, Green, CJL-CLAIM-025 verified in REG.",
      },
    ],
    systemsBuilt: [
      "Lifecycle definitions and disposition codes",
      "Multi-touch attribution with hidden-field capture",
      "35+ KPI revenue funnel framework",
      "Reverse-funnel capacity planning",
      "Close-date movement and ghost-pipeline inspection",
      "Board-ready monthly and quarterly reporting cadence",
    ],
    artifactIdeas: [
      "Lead lifecycle definition map (LC-13-DFN)",
      "Revenue funnel KPI dictionary (REV-KPI-17)",
      "Reverse funnel capacity planner (Fig. 16)",
      "Executive marketing scorecard (board pack)",
    ],
    governanceNotes: [
      "Pipeline figure approved with context, no raw opportunity rows in public artifacts",
      "Lifecycle definitions versioned, change control logged",
      "Board-ready reporting stays private; only the system narrative is public",
    ],
    interviewLine:
      "I treat the revenue funnel as one inspectable system. If a number cannot be questioned, it cannot be improved.",
    sourceCrossrefs: [
      "candidate-profile-master-v3.md:379-409",
      "Proof Library.md:198-276",
    ],
    longformHref: "/longform/revenue-operating-system-from-zero",

    deck: "The operating layer behind a nine-figure influenced pipeline: definitions, KPIs, attribution, cadence.",
    outcome: "Built the GTM infrastructure behind a {P6}.",
    scope:
      "Lifecycle definitions → attribution → 35+ KPI framework → reverse-funnel math → close-date movement → executive reporting cadence.",
    stack: "CRM (Zoho/Salesforce concepts) • Dashboards • GA4 • Reporting",
    governance:
      "Lifecycle definitions • disposition codes • change control • weekly operating review",
    bullets: [
      "Outcome: nine-figure marketing-influenced pipeline built from zero at a PE-backed enterprise.",
      "System: 35+ KPI revenue funnel framework covering awareness through revenue plus unit economics.",
      "System: Reverse-funnel capacity planner that translates quota into required leads, meetings, and capacity.",
      "Governance: Lifecycle definitions, disposition codes, and SLA enforcement keep CRM data trustworthy for forecasting.",
      "Governance: Board-ready monthly and quarterly reporting cadence built for CEO, CRO, and PE sponsor context.",
    ],
  },
  {
    slug: "ai-native-gtm",
    figureSlug: "fig-009",
    /* Spine P10 gates the agent count. The eyebrow is the largest type on the
       chapter, so the count comes out of display first. */
    label: "GOVERNED AI OPERATING LAYER",
    title: "Governed AI operating layer",
    hook: "A multi-agent layer that stages GTM work behind human approval gates and audit trails.",
    chapterIntro: [
      "I taught myself to code, then built the automation I kept asking someone else for. Proposal triage, research, competitive intelligence, content, and executive reporting all run through agents that stage the work. Humans approve it. Every run leaves a trail somebody can audit.",
    ],
    audienceFit: ["AI GTM systems", "Executive marketing leadership"],
    signature: true,
    signatureOrder: 2,
    businessProblem:
      "A small team had to support content, demand generation, proposals, sales enablement, reporting, and brand work across {V5}.",
    whatIBuilt:
      "I self-taught Python, TypeScript, prompt engineering, and agentic workflow design to build a governed AI operating layer for GTM work: research, campaign briefing, content adaptation, RFP and RFX support, competitive intelligence, and executive reporting.",
    whatChanged:
      "The team got a repeatable production system with review gates, voice standards, source discipline, and faster output across high-context work.",
    whyItMattered:
      "AI became an operating system with quality control, not a shortcut around judgment.",
    whatItProves:
      "I can lead the function and build the technical layer myself.",
    /* Claim-scope pass 2026-08-06. Claim IDs corrected against REG: the agent
       count is CJL-CLAIM-021, the productivity multiple CJL-CLAIM-014, the
       proposal-workflow compression CJL-CLAIM-046. All three render in their
       spine-approved softened form (P10, P8, P14/P9). Hours recaptured
       (CJL-CLAIM-023) and the 60-day deliverable count (CJL-CLAIM-020) map to
       no cleared proof point and have no approved softened form, so they go. */
    proofMetrics: [
      {
        value: "Multi-agent",
        label: "governed AI operating layer",
        context:
          "research, content, proposals, competitive intelligence, executive reporting",
        publicValue: "Multi-agent",
        publicLabel: "governed AI operating layer",
        publicContext:
          "Agents stage GTM work behind human approval gates and audit trails. The agent count is gated.",
        claimId: "CJL-CLAIM-021",
        posture: "directional",
        publicUse: "soften",
        sourceNote:
          "Spine P10, Amber+. Agent count gated; the exact count is withheld from source as well as from render.",
      },
      {
        value: "Material lift",
        label: "productivity from the governed AI layer",
        context: "team output against the pre-system baseline",
        publicValue: "Material lift",
        publicLabel: "productivity from the governed AI layer",
        publicContext:
          "Team output against the pre-system baseline. The exact multiple is gated.",
        claimId: "CJL-CLAIM-014",
        posture: "directional",
        publicUse: "soften",
        sourceNote: "Spine P8, Amber+ softened form of CJL-CLAIM-014.",
      },
      {
        value: "Days to minutes",
        label: "proposal triage and response",
        context: "governed proposal workflow with human approval",
        publicValue: "Days to minutes",
        publicLabel: "proposal triage and response",
        publicContext:
          "Triage compressed from a day-scale workflow to a minutes-scale workflow. Percentages stay gated.",
        claimId: "CJL-CLAIM-046",
        posture: "directional",
        publicUse: "soften",
        sourceNote:
          "Spine P14 (shape claim) with P9 phrasing preference. CJL-CLAIM-046 in REG.",
      },
    ],
    systemsBuilt: [
      "Agentic workflow design with human review gates",
      "RAG knowledge base for governed RFP and outbound drafting",
      "Voice standards, source discipline, audit logs",
      "Prompt libraries and regression-check loops",
      "MCP-style tool integrations and n8n orchestration",
    ],
    artifactIdeas: [
      "Workflow map across the agent set",
      "RAG knowledge base index (KB-INDEX)",
      "AI workflow audit log (Fig. 22)",
      "Governed RFP approval gate (Fig. 20)",
    ],
    governanceNotes: [
      "Source packet and workflow map shared before exact architecture images go public",
      "Every AI artifact has an approval gate and an audit trail",
      "Drift reviews and regression checks log error tags and prompt updates",
    ],
    interviewLine:
      "I built an AI operating system for a small team that needed the output of a much larger department.",
    sourceCrossrefs: [
      "candidate-profile-master-v3.md:257-279",
      "Proof Library.md:198-276",
    ],

    deck: "Governed agentic AI workflows for content, RFP, intel, and reporting, with human approval and audit logs.",
    outcome: "Compressed RFP/RFX triage from a day-scale workflow to a minutes-scale workflow. Material productivity lift from a governed AI operating layer.",
    scope: "Research → brief → draft → approve → publish → audit.",
    stack: "Python • TypeScript • RAG • n8n • LLMs • MCP-style tools",
    governance: "Human approval gates • audit logs • drift and regression reviews",
    bullets: [
      "Outcome: multi-agent governed AI GTM operating layer across research, content, RFP, intel, and reporting.",
      "Outcome: proposal triage compressed from a day-scale workflow to a minutes-scale workflow.",
      "System: RAG-backed knowledge base for proposal and outbound drafting.",
      "Governance: Every AI artifact gated by human approval with audit logs and drift reviews.",
      "Outcome: material productivity lift from the governed AI operating layer.",
    ],
  },
  {
    slug: "revenue-operations-pipeline-truth",
    figureSlug: "fig-010",
    label: "GHOST PIPELINE DETECTOR",
    title: "Ghost pipeline detector",
    hook: "Instrumenting close-date drift, stage aging, and dead activity so pipeline reviews stop rewarding optimism.",
    chapterIntro: [
      "Three screens sit under the weekly pipeline review: deals whose close date keeps moving, deals aging past their stage definition, and deals with activity that never advanced anything. I built all three, plus the cadence that makes someone answer for what is on them.",
    ],
    audienceFit: [
      "RevOps and pipeline accountability",
      "Executive marketing leadership",
    ],
    signature: true,
    signatureOrder: 3,
    businessProblem:
      "Executive reviews were full of optimism. Deal slippage, stage stalling, and rep activity gaps were hard to see until the quarter ended.",
    whatIBuilt:
      "I built close-date movement tracking, stage aging, activity-to-opportunity ratios, rep accountability, and a weekly executive package that surfaced ghost pipeline in time to act.",
    whatChanged:
      "Forecast calls stopped relying on rep optimism and started relying on what the system showed. Stale deals got worked or cleaned up. Real pipeline got attention.",
    whyItMattered:
      "Forecast accuracy is a CFO and CEO concern, not a marketing courtesy. The detector made the conversation honest.",
    whatItProves:
      "I can build the inspection layer that turns CRM data into accountability without crushing the team.",
    proofMetrics: [
      {
        value: "35+",
        label: "KPI RevOps framework",
        context: "funnel, attribution, unit economics, pipeline movement",
        claimId: "CJL-CLAIM-025",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "Board-ready",
        label: "executive reporting cadence",
        context: "CEO, CRO, and PE sponsor reporting",
        posture: "verified",
        publicUse: "show",
        sourceNote:
          "Categorical, no magnitude asserted. The former CJL-CLAIM-027 reference was a mis-map: REG 027 is a meetings/SQL target row and nothing here claims it.",
      },
    ],
    systemsBuilt: [
      "Close-date movement tracking",
      "Stage aging and pipeline velocity",
      "Activity-to-opportunity ratios",
      "Weekly executive ghost-pipeline package",
      "Rep accountability and follow-through views",
    ],
    artifactIdeas: [
      "Weekly executive ghost-pipeline dashboard",
      "Stage aging report with movement deltas",
      "Activity-to-opportunity ratio sheet",
    ],
    governanceNotes: [
      "System narrative is public, raw opportunity rows stay private",
      "Reporting cadence formalized at weekly, monthly, and quarterly tiers",
      "Rep-level views accessible only to managers and ops",
    ],
    interviewLine:
      "I built pipeline truth. The system makes it harder to hide a soft quarter, and easier to fix it before it lands.",
    sourceCrossrefs: ["candidate-profile-master-v3.md:379-409"],

    deck: "Weekly ghost-pipeline inspection so forecast calls stop relying on optimism.",
    outcome: "Designed a 35+ KPI funnel architecture from awareness through revenue and unit economics, the inspection layer inside the GTM infrastructure behind a {P6}.",
    scope: "Close-date movement → stage aging → activity ratios → rep accountability → executive package.",
    stack: "CRM • Dashboards • SQL • BI",
    governance: "Versioned KPI definitions • weekly review cadence • access controls",
    bullets: [
      "Outcome: 35+ KPI revenue funnel framework with close-date movement and stage aging baked in.",
      "Outcome: Board-ready executive reporting cadence for CEO, CRO, and PE sponsor context.",
      "System: Activity-to-opportunity ratios and rep accountability views.",
      "Governance: Versioned KPI definitions and access controls keep the system honest.",
      "Governance: CRM data-governance program that made lead source and completeness inspectable.",
    ],
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    figureSlug: "fig-011",
    label: "SIGNAL DEMAND ENGINE",
    title: "Signal-based demand engine",
    hook: "Buying signals routed to a tiered response model, with a defined window on the highest-priority ones.",
    chapterIntro: [
      "Most outbound treats every account the same way. I built a tiering model that reads buying signals, routes each tier to the right motion, and holds the team to a response window. The highest-priority signals carry a {P2}. Every other tier gets a defined window and a named owner.",
    ],
    audienceFit: ["Demand generation", "RevOps and pipeline accountability"],
    signature: true,
    signatureOrder: 4,
    businessProblem:
      "There was no clean outbound motion, no BDR budget, and no reliable way to decide which account signals deserved immediate sales action.",
    whatIBuilt:
      "I built a signal-based BDR pod from existing resources, with fit scoring, account-intent signals, enrichment, routing, a high-priority SLA, weekly signal review, playbooks, sequences, and a coaching cadence.",
    whatChanged:
      "Sales had a clearer way to prioritize interest, work the right accounts faster, and inspect whether signals became meetings and SQLs.",
    whyItMattered:
      "Demand generation became a managed operating motion tied to pipeline, not a pile of leads.",
    whatItProves:
      "I can build pipeline motion without waiting for perfect budget or headcount.",
    /* Claim-scope pass 2026-08-06. Claim IDs corrected against REG. The
       first-90-day pipeline row is CJL-CLAIM-028, internal-only and on the
       spine's excluded list, so it is gone rather than softened; the chapter's
       pipeline claim is carried by P6 in `outcome`. The held-meeting-to-SQL row
       is CJL-CLAIM-029, and the spine holds meeting and SQL counts out of this
       chapter entirely. The two-hour rule (P2, CJL-CLAIM-026) is the one
       cleared figure here. */
    proofMetrics: [
      {
        value: "2 hours",
        label: "high-priority signal-to-touch SLA",
        context: "every signal timestamped",
        claimId: "CJL-CLAIM-026",
        posture: "verified",
        publicUse: "show",
        sourceNote:
          "Spine P2, Green. DECISIONS Gate 2 approved the concept-safe two-hour SLA language.",
      },
      {
        value: "Hidden",
        label: "monthly company visitor volume",
        context: "private visitor count held from public route",
        claimId: "CJL-CLAIM-030",
        posture: "directional",
        publicUse: "hide",
      },
    ],
    systemsBuilt: [
      "Account-intent signal ingest with company match",
      "ICP fit scoring and tiered routing",
      "Enrichment, contact append, and CRM handoff",
      "High-priority signal-to-touch SLA",
      "Weekly signal review and rep coaching cadence",
    ],
    artifactIdeas: [
      "Signal-to-meeting routing map (Fig. 14)",
      "Signal-to-touch SLA logbook",
      "Weekly signal review template",
    ],
    governanceNotes: [
      "Pipeline figure approved with redaction discipline",
      "SLA misses fixed at the process layer, not in personal callouts",
      "Meeting and SQL targets explicitly labeled as targets where forward-looking",
    ],
    interviewLine:
      "I built a signal-driven BDR pod from existing resources. The system, not the budget, made the pipeline.",
    sourceCrossrefs: ["candidate-profile-master-v3.md:283-311"],

    deck: "Signal-driven BDR pod with SLA discipline and pipeline accountability.",
    outcome: "Built tiered signal-to-touch SLAs, including a {P2}, inside the GTM infrastructure behind a {P6}.",
    scope: "Signal capture → ICP score → enrichment → routing → SLA → review.",
    stack: "Account-intent signals • CRM • sequences • enrichment",
    governance: "Enforced SLA • documented workflow • weekly operating review",
    longformHref: "/longform/signal-based-demand-engine",
    bullets: [
      "Outcome: a working outbound pipeline motion from a BDR pod built out of existing resources.",
      "Outcome: high-priority signal-to-touch SLA, timestamped per signal.",
      "System: Signal ingest, ICP score, enrichment, and tiered routing into the rep queue.",
      "Governance: Weekly signal review, coaching cadence, and process fixes for SLA misses.",
      "Governance: Meeting, SQL, and visitor counts stay private; only the operating motion is public.",
    ],
  },
  {
    slug: "gtm-strategy-positioning",
    figureSlug: "fig-012",
    label: "PLATFORM NARRATIVE + ICP",
    title: "Platform narrative and ICP intelligence",
    hook: "A five-pillar positioning framework tied to proof, and the ICP work underneath it.",
    chapterIntro: [
      "Positioning falls over when nobody can prove it. I built a five-pillar framework where each pillar carries a buyer outcome and the evidence behind it, then wired it into the ICP definitions sales works from. The pillars stay unnamed on this page on purpose.",
    ],
    audienceFit: [
      "Product marketing and narrative",
      "Executive marketing leadership",
    ],
    signature: true,
    signatureOrder: 5,
    businessProblem:
      "The company had multiple acquired brands, complex service lines, and commodity claims that made sales language inconsistent.",
    whatIBuilt:
      "I built a master GTM narrative, ICP intelligence system, buyer trigger maps, competitive claims index, 5-pillar positioning framework, proof library, do and don't language guide, and a sales-ready messaging architecture.",
    whatChanged:
      "Sales, marketing, RFP, and executive teams had a shared source of truth for what to say, what to avoid, and what proof supported each claim.",
    whyItMattered:
      "In a regulated enterprise GTM motion, narrative without proof creates risk. Proof without narrative does not move buyers.",
    whatItProves:
      "I can make a messy multi-line business commercially legible.",
    /* Claim-scope pass 2026-08-06. Claim IDs corrected against REG. The
       artifact line and word counts are CJL-CLAIM-034, internal-only, so both
       rows are gone and the exact sizes are withheld from source too. The
       interview and gate counts are CJL-CLAIM-035, which the spine excludes by
       name while allowing the governance to be described qualitatively, so that
       row renders count-free. The proposal-turnaround percentage
       (CJL-CLAIM-037) belongs to the AI chapter, where it renders as a shape
       claim; it has no cleared form here. */
    proofMetrics: [
      {
        value: "Governed intake",
        label: "stakeholder interviews and alignment gates",
        context: "executive sign-off before deployment",
        publicValue: "Governed intake",
        publicLabel: "stakeholder interviews and alignment gates",
        publicContext:
          "Interviews, alignment gates, and executive sign-off before deployment. Counts are withheld.",
        claimId: "CJL-CLAIM-035",
        posture: "directional",
        publicUse: "soften",
        sourceNote:
          "Spine excluded set: CJL-CLAIM-035 is directional in REG and appears in no SUBSET table, so the counts are out. Qualitative description is explicitly permitted.",
      },
      {
        value: "5-pillar",
        label: "positioning framework",
        context: "shared across sales, marketing, and RFP",
        claimId: "CJL-CLAIM-033",
        posture: "verified",
        publicUse: "show",
        sourceNote:
          "Spine P3, Green, CJL-CLAIM-033 verified in REG. Pillar names stay withheld.",
      },
    ],
    systemsBuilt: [
      "Master GTM narrative and intelligence brief",
      "ICP intelligence system with buyer triggers",
      "5-pillar positioning framework",
      "Competitive claims index and proof library",
      "Do and don't language guide for sales and RFP",
    ],
    artifactIdeas: [
      "Messaging pillar architecture (MSG-ARCH-01)",
      "Claims register (MK-CR-18)",
      "Outcome-first repositioning spread (Fig. 05)",
    ],
    governanceNotes: [
      "Product or solution outcome metrics are not used as personal achievement claims",
      "Artifact word and line counts stay internal; only the system narrative is public",
      "Claims register tracks each public claim with source, status, and approver",
    ],
    interviewLine:
      "I build positioning as a governed system: clear claims, clear proof, and language rules that hold under sales pressure.",
    sourceCrossrefs: [
      "candidate-profile-master-v3.md:349-375",
      "Proof Library.md:198-276",
    ],

    deck: "One master GTM narrative across five regulated business lines, with proof governance.",
    outcome: "Built a five-pillar positioning framework tied to proof and buyer outcomes.",
    scope:
      "Stakeholder interviews → ICP intelligence → positioning architecture → claims register → enablement.",
    stack: "Messaging system • Proof library • Claims register • Enablement",
    governance:
      "Claims register with verified / directional / projected status • versioned messaging • voice and style rules",
    bullets: [
      "System: Authored the messaging architecture across {V5}.",
      "System: Master GTM brief with ICP intelligence and proof governance.",
      "System: 5-pillar positioning framework shared across sales, marketing, and RFP.",
      "Governance: Claims register tracking verified, directional, and projected status to prevent unverified external claims.",
      "Governance: Artifact sizes and interview counts stay internal.",
    ],
  },
  {
    slug: "debtnext-integration",
    figureSlug: "fig-013",
    label: "POST-ACQUISITION SAAS",
    title: "Post-acquisition GTM bridge",
    hook: "Marketing integration across acquired brands, web properties, and a regulated Canadian business unit.",
    chapterIntro: [
      "Acquisitions arrive with their own brand, their own pipeline, and their own idea of how selling works. I ran the marketing half of the merge: one architecture, one set of definitions, and a bridge that put the acquired software product into the motion that already existed. For the Canadian unit I learned the compliance and market requirements first, then operationalized them.",
    ],
    audienceFit: [
      "Post-acquisition GTM",
      "Product marketing and narrative",
      "Executive marketing leadership",
    ],
    signature: true,
    signatureOrder: 6,
    businessProblem:
      "A services business and an acquired SaaS capability had different sales motions, buyer expectations, and expansion paths.",
    whatIBuilt:
      "I built a hybrid GTM architecture: product-led, sales-assist, and enterprise-services expansion, PQL scoring, customer-health logic, cross-sell triggers, named-account campaign strategy, and rep retraining.",
    whatChanged:
      "The acquired capability became easier to position, sell, and connect to the broader platform story.",
    whyItMattered:
      "Post-acquisition value depends on turning deal logic into GTM execution.",
    whatItProves:
      "I can translate M&A complexity into product marketing, revenue architecture, and sales enablement.",
    /* Claim-scope pass 2026-08-06. This block carried the worst leak on the
       site: the cross-sell economics row is CJL-CLAIM-017, Red and
       internal-only, mis-labelled here as CJL-CLAIM-040 and approved-exact.
       Internal-only is not softenable, so the whitespace figure, the client
       count and the penetration rate are withheld from source as well as from
       render, and the row now carries the register's safe default only. CAC
       (CJL-CLAIM-012) and NRR (CJL-CLAIM-013) are company-level rows the spine
       excludes by name; they are dropped, which also settles the contradiction
       with this chapter's own governance note. */
    proofMetrics: [
      {
        value: "Installed-base analysis",
        label: "cross-sell opportunity and expansion motion",
        context: "targeted expansion motion built from the installed base",
        publicValue: "Installed-base analysis",
        publicLabel: "cross-sell opportunity and expansion motion",
        publicContext:
          "Analyzed the installed base to uncover a large cross-sell opportunity and build a targeted expansion motion. Economics, client counts, and penetration stay private.",
        claimId: "CJL-CLAIM-017",
        posture: "internal-only",
        publicUse: "soften",
        sourceNote:
          "CJL-CLAIM-017 is internal-only in REG and Red in SUBSET. BUILDER approves the exact form for private packets only; the register safe default is the sole public form.",
      },
      {
        value: "7 acquisitions",
        label: "integration scope",
        context: "8 acquired brands, 3 web properties",
        claimId: "CJL-CLAIM-050",
        posture: "approved-exact-with-context",
        publicUse: "show",
        sourceNote:
          "Spine P15/P18. BUILDER corrected and approved the count at 7 on 2026-05-12; SCOPE-006 overlay approved the exact count with the learning-and-operationalizing framing.",
      },
    ],
    systemsBuilt: [
      "Hybrid PLG, sales-assist, and enterprise-services architecture",
      "PQL scoring and customer-health logic",
      "Cross-sell triggers and expansion paths",
      "Named-account campaign strategy",
      "Rep retraining curriculum",
    ],
    artifactIdeas: [
      "Cross-sell trigger matrix (GTM-XM-28)",
      "Recovery performance ledger field-mapping (RPL-FLD-MAP-01)",
      "CRM lifecycle map (LC-13-DFN)",
    ],
    governanceNotes: [
      "Cross-sell economics, client counts, and penetration rates stay in private packets",
      "Company-level outcomes such as retention and acquisition cost are not published as personal achievement claims",
      "Cross-sell logic shared as architecture only, with no named accounts in public artifacts",
    ],
    interviewLine:
      "I built the GTM bridge that turned acquired software into a cross-sell motion across the platform.",
    sourceCrossrefs: ["candidate-profile-master-v3.md:315-345"],
    longformHref: "/longform/post-acquisition-saas-bridge",

    deck: "Hybrid post-acquisition GTM with PLG, sales-assist, and enterprise-services expansion.",
    outcome: "Led marketing integration across multiple acquisitions, acquired brands, web properties, and Canadian regulatory jurisdictions.",
    scope: "PLG → sales-assist → enterprise services → PQL scoring → customer-health → cross-sell.",
    stack: "CRM • Product analytics • Customer-health logic • Enablement",
    governance: "Named-account redaction • company-level claim labels • change control",
    bullets: [
      "Outcome: installed-base analysis that uncovered a large cross-sell opportunity and a targeted expansion motion.",
      "System: Hybrid PLG, sales-assist, and enterprise-services expansion architecture.",
      "System: PQL scoring, customer-health logic, and cross-sell triggers tied to the platform story.",
      "Governance: Cross-sell economics and company-level retention figures stay in private packets.",
      "Outcome: 7 acquisitions integrated across the marketing function.",
    ],
  },
  {
    slug: "marketing-analytics-architecture",
    figureSlug: "fig-014",
    label: "ANALYTICS ARCHITECTURE",
    title: "Marketing analytics architecture",
    hook: "Web analytics and CRM joined into one performance ledger that reconciles itself.",
    chapterIntro: [
      "Two systems, two versions of the truth, and a monthly argument about which one to believe. I joined web analytics to the CRM record so spend, source, and outcome land in one ledger row. The reconciliation that used to eat days now runs on its own.",
    ],
    audienceFit: ["RevOps and pipeline accountability"],
    signature: false,
    businessProblem:
      "Reporting was polluted by mixed consumer and B2B traffic. UTM and GCLID capture was inconsistent. Attribution numbers led to bad decisions.",
    whatIBuilt:
      "I rebuilt measurement from first principles: B2B audience segmentation, content groupings by solution line, conversion event taxonomy, UTM and GCLID governance, hidden-field capture, and cross-domain tracking requirements.",
    whatChanged:
      "Analytics became reliable enough to run RevOps off it. Lead source integrity held up to scrutiny.",
    whyItMattered:
      "If attribution is wrong, every decision is wrong. The platform became trustworthy infrastructure.",
    whatItProves:
      "I treat analytics as revenue infrastructure, not a downstream report.",
    /* Claim-scope pass 2026-08-06. The vertical count here (7) contradicted the
       operating-scope count the rest of the site publishes (P19, 5 regulated
       verticals) with no explanation of the different denominators, and it maps
       to no register row, so the grouping renders count-free. The capture rate
       maps to no register row either and renders as the process claim it is. */
    proofMetrics: [
      {
        value: "By solution line",
        label: "B2B content groupings",
        context: "attribution grouped by solution line rather than by page",
        publicValue: "By solution line",
        publicLabel: "B2B content groupings",
        publicContext:
          "Attribution grouped by solution line rather than by page. Grouping counts are not published.",
        posture: "verified",
        publicUse: "soften",
        sourceNote:
          "No register row. Count removed in the per-value pass because it read against P19's 5 regulated verticals.",
      },
      {
        value: "Enforced",
        label: "UTM and GCLID capture in CRM",
        context: "hidden-field requirements enforced at the form layer",
        publicValue: "Enforced",
        publicLabel: "UTM and GCLID capture in CRM",
        publicContext:
          "Hidden-field requirements enforced at the form layer. A process rule, not a measured rate.",
        posture: "verified",
        publicUse: "soften",
        sourceNote:
          "No register row. The capture rate is dropped; the enforced requirement is a process claim.",
      },
    ],
    systemsBuilt: [
      "B2B audience segmentation in GA4",
      "Conversion event taxonomy (generate_lead, file_download, click_to_call, click_to_email)",
      "UTM and GCLID hidden-field capture",
      "Cross-domain and subdomain tracking requirements",
    ],
    artifactIdeas: [
      "Tracking pixel exploded view (TKPX-01)",
      "GA4 event taxonomy worksheet (GA-EV-TAX-01)",
      "UTM capture spec (UTM-SPEC-27)",
    ],
    governanceNotes: [
      "Event and naming standards versioned",
      "Measurement QA built into release steps",
    ],
    interviewLine:
      "I treat analytics as infrastructure. If attribution is wrong, every decision built on it is wrong.",

    deck:
      "Measurement rebuilt from first principles: clean segmentation, event taxonomy, CRM capture.",
    outcome: "Reduced manual reconciliation through an automated performance ledger.",
    scope:
      "Audience segmentation → content groupings → event taxonomy → UTM/GCLID governance → cross-domain tracking requirements.",
    stack: "GA4 • GTM • WordPress • CRM (Zoho/Salesforce concepts)",
    governance:
      "Event and naming standards • hidden-field requirements • QA checklist • change control",
    bullets: [
      "System: GA4 audiences separated B2B prospects from consumer visitors so reporting stopped lying.",
      "System: Line-of-business content grouping for attribution by solution line.",
      "System: Conversion event taxonomy prioritized around generate_lead, file_download, click_to_call, click_to_email.",
      "Governance: CRM capture requirements: UTM and GCLID stored in hidden fields, enforced for lead-source integrity.",
      "Governance: Cross-domain and subdomain tracking requirements specified for form flows, measurement QA built into release steps.",
    ],
  },
  {
    slug: "leadership-team-development",
    figureSlug: "fig-015",
    label: "LEADERSHIP OS",
    title: "Leadership and team operating system",
    hook: "How a near-zero-budget function became a board-backed team with an international model.",
    chapterIntro: [
      "{S6}",
      "None of that scaled on charisma. Scope, review gates, escalation rules, and a cadence people could plan around all got written down, which is the only reason the team could grow without me in every room.",
    ],
    audienceFit: ["Executive marketing leadership"],
    signature: false,
    businessProblem:
      "Marketing was responding to ad hoc requests with random priorities. Execution speed and quality suffered.",
    whatIBuilt:
      "I built two accountable lanes (demand generation and enablement), documented handoffs, intake and prioritization, QA gates, templates, cadence, and a coaching loop.",
    whatChanged:
      "Marketing ran like a product team. Execution speed went up. Rework went down.",
    whyItMattered:
      "Operating speed without governance creates churn. Governance without speed creates a slow team.",
    whatItProves:
      "I lead by building systems with clear lanes, measurable SLAs, and review loops.",
    proofMetrics: [
      {
        value: "2 lanes",
        label: "demand generation and enablement",
        context: "documented handoffs and shared cadence",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "Weekly",
        label: "operating review",
        context: "RACI, SLAs, escalation paths",
        posture: "verified",
        publicUse: "show",
      },
    ],
    systemsBuilt: [
      "Two-function org with documented handoffs",
      "Intake and prioritization workflow",
      "Templates and QA gates",
      "Weekly operating review",
    ],
    artifactIdeas: [
      "Org chart blueprint (Plate 06)",
      "Two-lane cadence wall (Fig. 25)",
    ],
    governanceNotes: [
      "RACI maintained for every recurring workflow",
      "Version control and escalation paths defined",
    ],
    interviewLine:
      "I lead by building systems: clear lanes, measurable SLAs, review loops.",

    deck: "Clear lanes, enforced SLAs, repeatable templates.",
    outcome: "",
    scope: "Org design → intake and prioritization → QA and governance → templates → cadence → coaching.",
    stack: "Operating cadence • Intake • Templates • Analytics",
    governance: "RACI • SLAs • weekly reviews • version control • escalation paths",
    bullets: [
      "Before to after: Ad hoc requests and random priorities became two accountable lanes (demand generation and enablement) with documented handoffs.",
      "Governance: Enforced brief-to-ship SLAs and output floors. Work ran like a product team with cadence, templates, and review loops.",
      "System: Repurposed existing roles (telesales to BDR) with targets, QA gates, and manager review.",
      "System: Built reusable artifacts: process maps, templates, and weekly operating review formats.",
      "Systems thinking: Treated CRM and analytics as shared infrastructure with definitions, capture requirements, and change control.",
    ],
  },
  {
    slug: "outcome-first-repositioning",
    figureSlug: "fig-016",
    label: "OUTCOME-FIRST",
    title: "Outcome-first narrative architecture",
    hook: "A messaging architecture where every claim carries its proof and its approval state.",
    chapterIntro: [
      "The acquired brands were each saying something different, and some of it couldn't be defended if a buyer pushed. I built a messaging architecture that leads with buyer outcomes, attaches evidence to every claim, and records who approved it. Sales says things the company can stand behind.",
    ],
    audienceFit: ["Product marketing and narrative"],
    signature: false,
    businessProblem:
      "Decks led with service language. Sales had nothing quantified to anchor a conversation.",
    whatIBuilt:
      "I mapped features to quantified outcomes across the business units, built sales talk tracks, a do and don't language guide, and a versioned messaging system.",
    whatChanged:
      "Sales started leading with outcomes. Buyer conversations got tighter and shorter.",
    whyItMattered:
      "Service language is invisible to a buyer with a target. Quantified outcomes earn the room.",
    whatItProves:
      "I can rebuild a narrative around proof without losing the integrity of the claim.",
    proofMetrics: [
      /* The business-unit count is CJL-CLAIM-032, directional in REG and
         cleared nowhere. P11 carries the same idea without a count. */
      {
        value: "Multi-unit",
        label: "outcome-anchored talk tracks",
        context: "feature-to-outcome mapping across the business lines",
        publicValue: "Multi-unit",
        publicLabel: "outcome-anchored talk tracks",
        publicContext:
          "Feature-to-outcome mapping across the business lines. The unit count is not published.",
        claimId: "CJL-CLAIM-032",
        posture: "directional",
        publicUse: "soften",
        sourceNote: "Spine P11 phrasing, count removed in the per-value pass.",
      },
      {
        value: "Versioned",
        label: "messaging system",
        context: "claim owners, language rules, change control",
        posture: "verified",
        publicUse: "show",
      },
    ],
    systemsBuilt: [
      "Feature-to-outcome mapping",
      "Do and don't language guide",
      "Versioned messaging system",
      "Sales talk tracks with proof anchors",
    ],
    artifactIdeas: [
      "Outcome-first repositioning spread (Fig. 05)",
      "Claims register (MK-CR-18)",
    ],
    governanceNotes: [
      "Language guide mandatory for legal-reviewed materials",
      "Claim consistency tracked in the register",
    ],
    interviewLine:
      "I rebuilt the narrative around quantified outcomes. Service language was the easy part to delete.",
    longformHref: "/longform/outcome-first-narrative-architecture",

    deck: "Messaging rebuilt to lead with quantified outcomes over service language.",
    outcome: "Built a multi-business-unit messaging architecture with proof governance and outcome-first positioning.",
    scope: "Feature mapping → talk tracks → language rules → enablement.",
    stack: "Outcome mapping • Sales enablement • Brand governance",
    governance: "Language rules • claim owners • versioned messaging system",
    bullets: [
      "Outcome: Outcome-anchored sales talk tracks across the business units.",
      "System: Feature-to-outcome mapping spread out across each business line.",
      "Governance: Mandatory do and don't language guide for claim consistency.",
      "Governance: Versioned messaging system with claim owners and change control.",
      "Artifacts: Messaging architecture v1.0, language guide, executive deck.",
    ],
  },
  {
    slug: "marketing-org-design-governance",
    figureSlug: "fig-017",
    label: "MARKETING OPERATING MODEL",
    title: "Two-function marketing operating model",
    hook: "Splitting marketing into a demand function and a narrative function, with governance thin enough to ship through.",
    chapterIntro: [
      "The model is a one-page document: two functions, the inputs each one owns, the outputs each one ships, and the single review gate they share. Demand capture and platform narrative had been competing for the same people and losing to each other, so I gave them separate inputs and separate outputs.",
    ],
    audienceFit: ["Executive marketing leadership"],
    signature: false,
    businessProblem:
      "Output was inconsistent. Briefs piled up. There was no shared definition of done.",
    whatIBuilt:
      "I split the team into two accountable lanes (demand generation and enablement), enforced a 7-day brief-to-ship SLA, set an output floor, governed Beautiful.ai version control, and segregated GA4 audiences so B2B reporting stayed clean.",
    whatChanged:
      "Output became countable. SLAs became enforceable. Reporting became honest.",
    whyItMattered:
      "An operating model is what turns a team into a function leadership can trust.",
    whatItProves:
      "I can rebuild marketing into a product-team operating model with enforced cadence.",
    /* Claim-scope pass 2026-08-06. Both rows are CJL-CLAIM-042, a `target` row
       in REG: the SLA and the output floor are targets, and the spine's rule
       for this chapter is to describe the operating model rather than the
       floors. Targets rendered as results are on the must-not-say list, and
       neither has an approved softened form, so the proof block is empty and
       the operating model carries the chapter. */
    proofMetrics: [],
    systemsBuilt: [
      "Two-function org structure",
      "Centralized intake-to-archive workflow",
      "Beautiful.ai version control",
      "GA4 audience segregation for B2B reporting",
    ],
    artifactIdeas: [
      "Brief-to-ship intake board (MKT-INT-01)",
      "Content governance calendar (CGC-24-RE)",
      "Two-lane cadence wall (Fig. 25)",
    ],
    governanceNotes: [
      "Output floor and SLA reviewed in weekly cadence",
      "GA4 audience definitions versioned",
    ],
    interviewLine:
      "I rebuilt marketing into two functions with one shared review gate. It runs like a product team.",
    longformHref: "/longform/revenue-operating-system-from-zero",

    deck: "Marketing split into demand generation and enablement with enforced SLAs.",
    outcome: "Marketing under this model ran on written scope, review gates, and escalation rules rather than on my availability.",
    scope: "Org design → intake workflow → deck governance → GA4 segregation.",
    stack: "Beautiful.ai • GA4 • SharePoint • Marketing Hub",
    governance: "7-day SLA • output minimums • version control • cadence reviews",
    bullets: [
      "System: Brief-to-ship SLA enforced across content and sales assets, with the day count held as an internal target.",
      "System: Annual content output floor set and reviewed in cadence, held as an internal target.",
      "System: Two accountable lanes: demand generation for pipeline, enablement for the asset factory.",
      "Governance: Centralized intake-to-archive workflow and Beautiful.ai version control.",
      "Governance: GA4 audience segregation. B2B reporting stayed isolated from consumer noise.",
    ],
  },
  {
    slug: "enterprise-site-overhaul",
    figureSlug: "fig-018",
    label: "ENTERPRISE WEB OPS",
    title: "Enterprise digital presence rebuild",
    hook: "A web rebuild, a structured content system underneath it, and accessibility fixed in the templates.",
    chapterIntro: [
      "The sites were slow, inconsistent between brands, and failing accessibility in ways that were easy to prove. We rebuilt on one architecture, then put a structured content system underneath so pages generate from schemas instead of briefs. Accessibility got fixed in the templates, which is where it stops coming back.",
    ],
    audienceFit: ["SEO/GEO and content systems", "RevOps and pipeline accountability"],
    signature: false,
    businessProblem:
      "Site traffic was high but unqualified. Consumer visitors mixed with enterprise prospects, and conversion measurement leaked across both.",
    whatIBuilt:
      "I rebuilt the information architecture for enterprise buyers, separated consumer routing, set up GA4 and GTM for high-intent events, and tuned the conversion experience.",
    whatChanged:
      "Qualified traffic improved. Conversion measurement stopped leaking across audiences.",
    whyItMattered:
      "An enterprise site is a sales asset. It should be designed and measured like one.",
    whatItProves:
      "I can rebuild a digital presence so it routes the right traffic and measures the right conversions.",
    /* Claim-scope pass 2026-08-06. All three rows are CJL-CLAIM-045,
       directional in REG, and the spine excludes traffic multiples from this
       chapter by name. P7 is the cleared form of the growth claim, so the three
       exact rows collapse into one softened row and the multiple is gone. */
    proofMetrics: [
      {
        value: "Material growth",
        label: "organic performance after the rebuild",
        context: "growth from SEO and content infrastructure",
        publicValue: "Material growth",
        publicLabel: "organic performance after the rebuild",
        publicContext:
          "Material organic growth from SEO and content infrastructure. Multiples and percentages stay gated.",
        claimId: "CJL-CLAIM-045",
        posture: "directional",
        publicUse: "soften",
        sourceNote: "Spine P7, Amber+, the approved softened form of the growth claim.",
      },
    ],
    systemsBuilt: [
      "Conversion-first IA for enterprise buyers",
      "GA4 and GTM instrumentation for high-intent events",
      "Strict B2B routing",
      "Measurement QA on release",
    ],
    artifactIdeas: [
      "Website conversion IA (IA-MAP-26)",
      "Cross-sell trigger matrix (GTM-XM-28)",
    ],
    governanceNotes: [
      "Conversion IA standards versioned",
      "B2B routing enforced to eliminate consumer leakage",
    ],
    interviewLine:
      "I rebuilt tsico.com for enterprise conversion. Clean routing, clean measurement, measurable growth.",

    deck: "tsico.com rebuilt around enterprise conversion and clean measurement.",
    outcome: "Designed a large-scale structured SEO/GEO content system across regulated verticals. Material organic growth from SEO and content infrastructure. Drove WCAG 2.1 AA remediation across web properties, including image, heading, statement, and contrast fixes.",
    scope: "UX audit → information architecture → B2B routing → GA4/GTM wiring.",
    stack: "WordPress • Elementor • GA4 • GTM",
    governance: "Conversion IA standards • strict B2B routing • measurement QA",
    bullets: [
      "Outcome: material organic growth in qualified traffic and enterprise engagement after the rebuild.",
      "System: Conversion-first IA built for enterprise buyers, not consumer traffic.",
      "System: GA4 and GTM instrumentation for high-intent events and event taxonomy.",
      "Governance: Strict B2B routing to eliminate consumer leakage into enterprise funnels.",
      "Artifacts: IA map, event taxonomy, conversion report snapshots.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getSignatureCaseStudies(): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.signature)
    .sort(
      (a, b) => (a.signatureOrder ?? 99) - (b.signatureOrder ?? 99),
    );
}

export const audienceTags: AudienceTag[] = [
  "Executive marketing leadership",
  "RevOps and pipeline accountability",
  "AI GTM systems",
  "Demand generation",
  "Product marketing and narrative",
  "Post-acquisition GTM",
  "SEO/GEO and content systems",
];
