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
    label: "REVENUE OPERATING SYSTEM",
    title: "Revenue Operating System from Zero",
    hook: "The GTM infrastructure behind $159.4M in influenced pipeline.",
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
    proofMetrics: [
      {
        value: "$159.4M",
        label: "marketing-influenced pipeline",
        context: "GTM infrastructure built from zero",
        claimId: "CJL-CLAIM-001",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "$52.5M",
        label: "net-new revenue contribution",
        context: "GTM strategy, demand generation, sales enablement",
        claimId: "CJL-CLAIM-002",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "$25M+",
        label: "margin contribution",
        context: "revenue infrastructure ROI with attribution discipline",
        claimId: "CJL-CLAIM-003",
        posture: "company-level",
        publicUse: "show",
      },
      {
        value: "35+",
        label: "KPI revenue funnel framework",
        context: "awareness through revenue with unit economics",
        claimId: "CJL-CLAIM-025",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "+400%",
        label: "CRM data completeness",
        context: "data governance program",
        claimId: "CJL-CLAIM-026",
        posture: "directional",
        publicUse: "show",
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

    deck: "The operating layer behind a $159.4M influenced pipeline: definitions, KPIs, attribution, cadence.",
    outcome:
      "$159.4M marketing-influenced pipeline. $52.5M net-new revenue contribution. 35+ KPI framework. +400% CRM data completeness.",
    scope:
      "Lifecycle definitions → attribution → 35+ KPI framework → reverse-funnel math → close-date movement → executive reporting cadence.",
    stack: "CRM (Zoho/Salesforce concepts) • Dashboards • GA4 • Reporting",
    governance:
      "Lifecycle definitions • disposition codes • change control • weekly operating review",
    bullets: [
      "Outcome: $159.4M marketing-influenced pipeline built from zero at a roughly $460M PE-backed enterprise.",
      "System: 35+ KPI revenue funnel framework covering awareness through revenue plus unit economics.",
      "System: Reverse-funnel capacity planner that translates quota into required leads, meetings, and capacity.",
      "Governance: Lifecycle definitions, disposition codes, and SLA enforcement keep CRM data trustworthy for forecasting.",
      "Governance: Board-ready monthly and quarterly reporting cadence built for CEO, CRO, and PE sponsor context.",
    ],
  },
  {
    slug: "ai-native-gtm",
    label: "22-AGENT AI GTM OS",
    title: "22-Agent AI GTM Operating System",
    hook: "A 4-person team needed the operating capacity of a much larger department.",
    audienceFit: ["AI GTM systems", "Executive marketing leadership"],
    signature: true,
    signatureOrder: 2,
    businessProblem:
      "A small team had to support content, demand generation, proposals, sales enablement, reporting, and brand work across 5 regulated verticals.",
    whatIBuilt:
      "I self-taught Python, TypeScript, prompt engineering, and agentic workflow design to build a governed AI operating layer for GTM work: research, campaign briefing, content adaptation, RFP and RFX support, competitive intelligence, and executive reporting.",
    whatChanged:
      "The team got a repeatable production system with review gates, voice standards, source discipline, and faster output across high-context work.",
    whyItMattered:
      "AI became an operating system with quality control, not a shortcut around judgment.",
    whatItProves:
      "I can lead the function and build the technical layer myself.",
    proofMetrics: [
      {
        value: "22-agent",
        label: "AI marketing operating system",
        context: "research, content, RFP, intel, executive reporting",
        claimId: "CJL-CLAIM-021",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "400%",
        label: "productivity uplift",
        context: "output measured against pre-system baseline",
        claimId: "CJL-CLAIM-022",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "96%",
        label: "RFP response-time reduction",
        context: "governed RFP workflow with human approval",
        claimId: "CJL-CLAIM-023",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "24.5 hrs/wk",
        label: "team time recaptured",
        context: "weekly hours redirected from manual work to strategy",
        claimId: "CJL-CLAIM-024",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "115+",
        label: "strategic deliverables in 60 days",
        context: "content, RFP, intel, enablement",
        claimId: "CJL-CLAIM-020",
        posture: "verified",
        publicUse: "show",
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
      "Workflow map across 22 agents",
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
    outcome:
      "22-agent AI marketing operating system. 400% productivity uplift. 96% RFP response-time reduction. 115+ deliverables in 60 days.",
    scope: "Research → brief → draft → approve → publish → audit.",
    stack: "Python • TypeScript • RAG • n8n • LLMs • MCP-style tools",
    governance: "Human approval gates • audit logs • drift and regression reviews",
    bullets: [
      "Outcome: 22-agent AI GTM operating system with governed workflows across research, content, RFP, intel, and reporting.",
      "Outcome: 96% reduction in RFP response time on the governed workflow.",
      "System: RAG-backed knowledge base for proposal and outbound drafting.",
      "Governance: Every AI artifact gated by human approval with audit logs and drift reviews.",
      "Outcome: 115+ strategic deliverables produced in a 60-day sprint.",
    ],
  },
  {
    slug: "revenue-operations-pipeline-truth",
    label: "GHOST PIPELINE DETECTOR",
    title: "Ghost Pipeline Detector",
    hook: "Pipeline truth beats pipeline theater.",
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
        claimId: "CJL-CLAIM-027",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "+400%",
        label: "CRM data completeness",
        context: "data governance program",
        claimId: "CJL-CLAIM-026",
        posture: "directional",
        publicUse: "show",
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
    outcome:
      "35+ KPI RevOps framework. Board-ready cadence. +400% CRM data completeness improvement.",
    scope: "Close-date movement → stage aging → activity ratios → rep accountability → executive package.",
    stack: "CRM • Dashboards • SQL • BI",
    governance: "Versioned KPI definitions • weekly review cadence • access controls",
    bullets: [
      "Outcome: 35+ KPI revenue funnel framework with close-date movement and stage aging baked in.",
      "Outcome: Board-ready executive reporting cadence for CEO, CRO, and PE sponsor context.",
      "System: Activity-to-opportunity ratios and rep accountability views.",
      "Governance: Versioned KPI definitions and access controls keep the system honest.",
      "Outcome: +400% CRM data completeness improvement after data governance program.",
    ],
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    label: "SIGNAL DEMAND ENGINE",
    title: "Signal-Based Demand Engine",
    hook: "I turned website and account intent into a sales-action workflow.",
    audienceFit: ["Demand generation", "RevOps and pipeline accountability"],
    signature: true,
    signatureOrder: 4,
    businessProblem:
      "There was no clean outbound motion, no BDR budget, and no reliable way to decide which account signals deserved immediate sales action.",
    whatIBuilt:
      "I built a signal-based BDR pod from existing resources, with fit scoring, WebSights and account intent, enrichment, routing, a 2-hour high-priority SLA, weekly signal review, playbooks, sequences, and a coaching cadence.",
    whatChanged:
      "Sales had a clearer way to prioritize interest, work the right accounts faster, and inspect whether signals became meetings and SQLs.",
    whyItMattered:
      "Demand generation became a managed operating motion tied to pipeline, not a pile of leads.",
    whatItProves:
      "I can build pipeline motion without waiting for perfect budget or headcount.",
    proofMetrics: [
      {
        value: "$2.5M+",
        label: "first-90-day pipeline",
        context: "signal-based BDR pod from existing resources",
        claimId: "CJL-CLAIM-013",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "40%",
        label: "held-meeting-to-SQL conversion",
        context: "directional pending CRM source",
        claimId: "CJL-CLAIM-014",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "2 hours",
        label: "high-priority signal-to-touch SLA",
        context: "every signal timestamped",
        claimId: "CJL-CLAIM-015",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "12,500+",
        label: "monthly company visitors analyzed",
        context: "reconcile before exact comparative use",
        claimId: "CJL-CLAIM-016",
        posture: "directional",
        publicUse: "show",
      },
    ],
    systemsBuilt: [
      "WebSights signal ingest with company match",
      "ICP fit scoring and tiered routing",
      "Enrichment, contact append, and CRM handoff",
      "2-hour high-priority signal-to-touch SLA",
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

    deck: "Signal-driven BDR pod with a 2-hour SLA and pipeline accountability.",
    outcome:
      "$2.5M+ first-90-day pipeline. 40% held-meeting-to-SQL (directional). 2-hour high-priority SLA.",
    scope: "Signal capture → ICP score → enrichment → routing → SLA → review.",
    stack: "ZoomInfo WebSights • CRM • Outreach/Sequences • Enrichment",
    governance: "Enforced SLA • documented workflow • weekly operating review",
    longformHref: "/longform/signal-based-demand-engine",
    bullets: [
      "Outcome: $2.5M+ first-90-day pipeline from a signal-driven BDR pod built from existing resources.",
      "Outcome: 2-hour high-priority signal-to-touch SLA, timestamped per signal.",
      "System: Signal ingest, ICP score, enrichment, and tiered routing into the rep queue.",
      "Governance: Weekly signal review, coaching cadence, and process fixes for SLA misses.",
      "Outcome: 40% held-meeting-to-SQL conversion as a directional indicator pending CRM source.",
    ],
  },
  {
    slug: "gtm-strategy-positioning",
    label: "PLATFORM NARRATIVE + ICP",
    title: "Platform Narrative and ICP Intelligence System",
    hook: "Five regulated business lines needed one market story with proof behind it.",
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
    proofMetrics: [
      {
        value: "774-line",
        label: "messaging architecture",
        context: "regulated business lines",
        claimId: "CJL-CLAIM-030",
        posture: "internal-only",
        publicUse: "show",
      },
      {
        value: "10,900 words",
        label: "master GTM brief",
        context: "ICP, positioning, stakeholder interviews",
        claimId: "CJL-CLAIM-031",
        posture: "internal-only",
        publicUse: "show",
      },
      {
        value: "20+",
        label: "stakeholder interviews",
        context: "8 alignment gates",
        claimId: "CJL-CLAIM-032",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "75%",
        label: "faster RFP turnaround",
        context: "directional pending source review",
        claimId: "CJL-CLAIM-033",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "5-pillar",
        label: "positioning framework",
        context: "shared across sales, marketing, and RFP",
        claimId: "CJL-CLAIM-034",
        posture: "verified",
        publicUse: "show",
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
      "Artifact word and line counts are reported as system scale, not raw artifact disclosure",
      "Claims register tracks each public claim with source, status, and approver",
    ],
    interviewLine:
      "I build positioning as a governed system: clear claims, clear proof, and language rules that hold under sales pressure.",
    sourceCrossrefs: [
      "candidate-profile-master-v3.md:349-375",
      "Proof Library.md:198-276",
    ],

    deck: "One master GTM narrative across five regulated business lines, with proof governance.",
    outcome:
      "774-line messaging architecture. 10,900-word master GTM brief. 20+ stakeholder interviews. 5-pillar positioning framework. 75% faster RFP turnaround (directional).",
    scope:
      "Stakeholder interviews → ICP intelligence → positioning architecture → claims register → enablement.",
    stack: "Messaging system • Proof library • Claims register • Enablement",
    governance:
      "Claims register with verified / directional / projected status • versioned messaging • voice and style rules",
    bullets: [
      "System: Authored a 774-line messaging architecture across 5 regulated business lines.",
      "System: 10,900-word master GTM brief with ICP intelligence and proof governance.",
      "System: 5-pillar positioning framework shared across sales, marketing, and RFP.",
      "Governance: Claims register tracking verified, directional, and projected status to prevent unverified external claims.",
      "Outcome: 75% faster RFP turnaround as a directional indicator pending source review.",
    ],
  },
  {
    slug: "debtnext-integration",
    label: "POST-ACQUISITION SAAS",
    title: "Post-Acquisition SaaS GTM Bridge",
    hook: "Acquired software needed a market story, cross-sell path, and sales motion.",
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
    proofMetrics: [
      {
        value: "$254M",
        label: "cross-sell whitespace",
        context: "from 2,676 clients analyzed, redaction discipline",
        claimId: "CJL-CLAIM-040",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "73%",
        label: "CAC reduction",
        context: "company-level outcome with attribution care",
        claimId: "CJL-CLAIM-041",
        posture: "company-level",
        publicUse: "show",
      },
      {
        value: "112%",
        label: "NRR",
        context: "company-level outcome with attribution care",
        claimId: "CJL-CLAIM-042",
        posture: "company-level",
        publicUse: "show",
      },
      {
        value: "7 acquisitions",
        label: "integration scope",
        context: "8 acquired brands, 3 web properties",
        claimId: "CJL-CLAIM-050",
        posture: "approved-exact-with-context",
        publicUse: "show",
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
      "Whitespace figure approved with redaction discipline; no named accounts in public artifacts",
      "Company-level outcomes labeled as company-level, not personal achievement claims",
      "Cross-sell logic shared as architecture only",
    ],
    interviewLine:
      "I built the GTM bridge that turned acquired software into a cross-sell motion across the platform.",
    sourceCrossrefs: ["candidate-profile-master-v3.md:315-345"],
    longformHref: "/longform/post-acquisition-saas-bridge",

    deck: "Hybrid post-acquisition GTM with PLG, sales-assist, and enterprise-services expansion.",
    outcome:
      "$254M cross-sell whitespace identified from 2,676 clients. 73% CAC reduction (company-level). 112% NRR (company-level). 7 acquisitions integrated.",
    scope: "PLG → sales-assist → enterprise services → PQL scoring → customer-health → cross-sell.",
    stack: "CRM • Product analytics • Customer-health logic • Enablement",
    governance: "Named-account redaction • company-level claim labels • change control",
    bullets: [
      "Outcome: $254M cross-sell whitespace identified from 2,676 client accounts analyzed.",
      "System: Hybrid PLG, sales-assist, and enterprise-services expansion architecture.",
      "System: PQL scoring, customer-health logic, and cross-sell triggers tied to the platform story.",
      "Governance: 73% CAC reduction and 112% NRR shown as company-level outcomes with attribution care.",
      "Outcome: 7 acquisitions integrated across the marketing function.",
    ],
  },
  {
    slug: "marketing-analytics-architecture",
    label: "ANALYTICS ARCHITECTURE",
    title: "Marketing Analytics Architecture (GA4 + CRM)",
    hook: "Measurement rebuilt so attribution stopped lying.",
    audienceFit: ["RevOps and pipeline accountability"],
    signature: false,
    businessProblem:
      "Reporting was polluted by mixed consumer and B2B traffic. UTM and GCLID capture was inconsistent. Attribution numbers led to bad decisions.",
    whatIBuilt:
      "I rebuilt measurement from first principles: B2B audience segmentation, content groupings across 7 verticals, conversion event taxonomy, UTM and GCLID governance, hidden-field capture, and cross-domain tracking requirements.",
    whatChanged:
      "Analytics became reliable enough to run RevOps off it. Lead source integrity held up to scrutiny.",
    whyItMattered:
      "If attribution is wrong, every decision is wrong. The platform became trustworthy infrastructure.",
    whatItProves:
      "I treat analytics as revenue infrastructure, not a downstream report.",
    proofMetrics: [
      {
        value: "7 verticals",
        label: "B2B content groupings",
        context: "attribution by solution line",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "100%",
        label: "UTM and GCLID capture in CRM",
        context: "hidden-field requirements enforced at form layer",
        posture: "verified",
        publicUse: "show",
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
    outcome:
      "Clean B2B attribution segmented from consumer noise. Conversion events standardized. Analytics reliable enough to run RevOps off it.",
    scope:
      "Audience segmentation → content groupings → event taxonomy → UTM/GCLID governance → cross-domain tracking requirements.",
    stack: "GA4 • GTM • WordPress • CRM (Zoho/Salesforce concepts)",
    governance:
      "Event and naming standards • hidden-field requirements • QA checklist • change control",
    bullets: [
      "System: GA4 audiences separated B2B prospects from consumer visitors so reporting stopped lying.",
      "System: Line-of-business content grouping across 7 verticals for attribution by solution line.",
      "System: Conversion event taxonomy prioritized around generate_lead, file_download, click_to_call, click_to_email.",
      "Governance: CRM capture requirements: UTM and GCLID stored in hidden fields, enforced for lead-source integrity.",
      "Governance: Cross-domain and subdomain tracking requirements specified for form flows, measurement QA built into release steps.",
    ],
  },
  {
    slug: "leadership-team-development",
    label: "LEADERSHIP OS",
    title: "Leadership and Team Operating System",
    hook: "Clear lanes, enforced SLAs, repeatable templates.",
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
    outcome:
      "Marketing execution speed increased under SLA. Teams shipped with less thrash. Governance reduced rework.",
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
    label: "OUTCOME-FIRST",
    title: "Outcome-First Narrative Architecture",
    hook: "Messaging rebuilt to lead with quantified outcomes over service language.",
    audienceFit: ["Product marketing and narrative"],
    signature: false,
    businessProblem:
      "Decks led with service language. Sales had nothing quantified to anchor a conversation.",
    whatIBuilt:
      "I mapped features to quantified outcomes across 6 business units, built sales talk tracks, a do and don't language guide, and a versioned messaging system.",
    whatChanged:
      "Sales started leading with outcomes. Buyer conversations got tighter and shorter.",
    whyItMattered:
      "Service language is invisible to a buyer with a target. Quantified outcomes earn the room.",
    whatItProves:
      "I can rebuild a narrative around proof without losing the integrity of the claim.",
    proofMetrics: [
      {
        value: "6 BUs",
        label: "outcome-anchored talk tracks",
        context: "feature-to-outcome mapping",
        posture: "verified",
        publicUse: "show",
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
    outcome:
      "Outcome-anchored talk tracks across 6 BUs. Versioned messaging system with claim governance.",
    scope: "Feature mapping → talk tracks → language rules → enablement.",
    stack: "Outcome mapping • Sales enablement • Brand governance",
    governance: "Language rules • claim owners • versioned messaging system",
    bullets: [
      "Outcome: Outcome-anchored sales talk tracks across 6 business units.",
      "System: Feature-to-outcome mapping spread out across each business line.",
      "Governance: Mandatory do and don't language guide for claim consistency.",
      "Governance: Versioned messaging system with claim owners and change control.",
      "Artifacts: Messaging architecture v1.0, language guide, executive deck.",
    ],
  },
  {
    slug: "marketing-org-design-governance",
    label: "MARKETING OPERATING MODEL",
    title: "Two-Function Marketing Operating Model",
    hook: "Marketing split into demand generation and enablement with enforced SLAs.",
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
    proofMetrics: [
      {
        value: "7-day",
        label: "brief-to-ship SLA",
        context: "enforced across content and sales assets",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "200+",
        label: "content assets per year",
        context: "output floor, including 26 press releases",
        posture: "verified",
        publicUse: "show",
      },
    ],
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
      "I rebuilt marketing into two functions with a 7-day ship SLA. It runs like a product team.",
    longformHref: "/longform/revenue-operating-system-from-zero",

    deck: "Marketing split into demand generation and enablement with enforced SLAs.",
    outcome:
      "7-day brief-to-ship SLA. 200+ per year content output floor including 26 press releases per year.",
    scope: "Org design → intake workflow → deck governance → GA4 segregation.",
    stack: "Beautiful.ai • GA4 • SharePoint • Marketing Hub",
    governance: "7-day SLA • output minimums • version control • cadence reviews",
    bullets: [
      "Outcome: 7-day brief-to-ship SLA enforced across all content and sales assets.",
      "Outcome: 200+ per year content output floor, including 26 press releases per year.",
      "System: Two accountable lanes: demand generation for pipeline, enablement for the asset factory.",
      "Governance: Centralized intake-to-archive workflow and Beautiful.ai version control.",
      "Governance: GA4 audience segregation. B2B reporting stayed isolated from consumer noise.",
    ],
  },
  {
    slug: "enterprise-site-overhaul",
    label: "ENTERPRISE WEB OPS",
    title: "Enterprise Digital Presence Rebuild",
    hook: "tsico.com rebuilt for enterprise conversion and clean measurement.",
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
    proofMetrics: [
      {
        value: "6x",
        label: "qualified traffic increase",
        context: "directional, audience-segmented",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "+28%",
        label: "organic clicks",
        context: "post-rebuild",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "+19%",
        label: "enterprise lead engagement",
        context: "post-rebuild",
        posture: "directional",
        publicUse: "show",
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
    outcome:
      "6x qualified traffic increase (directional). +28% organic clicks. +19% enterprise lead engagement.",
    scope: "UX audit → information architecture → B2B routing → GA4/GTM wiring.",
    stack: "WordPress • Elementor • GA4 • GTM",
    governance: "Conversion IA standards • strict B2B routing • measurement QA",
    bullets: [
      "Outcome: 6x increase in qualified traffic (directional) alongside +28% organic clicks and +19% enterprise lead engagement.",
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
