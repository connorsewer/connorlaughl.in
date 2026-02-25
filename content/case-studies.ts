export type CaseStudy = {
  slug: string;
  label: string;
  title: string;
  deck: string;
  outcome: string;
  scope: string;
  stack: string;
  governance: string;
  bullets: string[];
  interviewLine: string;
  longformHref?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "marketing-analytics-architecture",
    label: "MARKETING ANALYTICS",
    title: "Marketing Analytics Architecture (GA4 + CRM)",
    deck:
      "Measurement rebuilt from first principles: clean segmentation, event taxonomy, CRM capture.",
    outcome:
      "Clean B2B attribution (segmented from consumer noise); conversion events standardized; analytics reliable enough to run RevOps off it.",
    scope:
      "Audience segmentation → content groupings → event taxonomy → UTM/GCLID governance → cross-domain tracking requirements.",
    stack: "GA4 • GTM • WordPress • CRM (Zoho/Salesforce concepts)",
    governance:
      "Event + naming standards • hidden-field requirements • QA checklist • change control",
    bullets: [
      "Before → After — Reporting polluted by mixed traffic → GA4 audiences separated B2B prospects from consumer visitors.",
      "System — Line-of-business content grouping across 7 verticals for attribution by solution line.",
      "System — Conversion event taxonomy prioritized around generate_lead (primary), file_download (nurture), click_to_call, click_to_email.",
      "Governance — CRM capture requirements: UTM + GCLID stored in hidden fields; enforced for lead-source integrity.",
      "Governance — Cross-domain/subdomain tracking requirements specified for form flows; measurement QA built into release steps.",
    ],
    interviewLine:
      "I treat analytics as infrastructure—if attribution is wrong, every decision is wrong.",
  },
  {
    slug: "gtm-strategy-positioning",
    label: "GTM STRATEGY",
    title: "GTM Strategy + Positioning System",
    deck:
      "Outcome-first messaging with a claims register—so sales moves fast without making things up.",
    outcome:
      "One narrative system across 6 business units; tighter proof governance; faster enablement and more consistent win themes.",
    scope:
      "Positioning architecture → pillar framework → persona value props → proof library/claims register → enablement.",
    stack: "Messaging System • Enablement • RFP Library • Governance",
    governance:
      "Claims register (Verified/Directional/Projected) • versioned messaging • voice/style rules",
    bullets: [
      "System — Authored 50+ page messaging architecture spanning 6 business units with outcome-first positioning.",
      "System — 5-pillar framework: Recover More/Faster; Protect Brand & Experience; Reduce Risk/Compliance Exposure; Lifecycle Visibility; Start Fast/Scale on Proof.",
      "System — Persona value props mapped as: client outcomes → delivery mechanisms → proof/KPIs → use cases.",
      "Governance — Proof library + claims register with explicit status tracking to prevent unverified external claims.",
      "Before → After — Service-language decks → quantified, buyer-aligned talk tracks with guardrails (plain English, active voice, no empty superlatives).",
    ],
    interviewLine:
      "I build positioning as a governed system—clear claims, clear proof, language rules.",
  },
  {
    slug: "revenue-operations-signal-to-revenue",
    label: "REVOPS",
    title: "Revenue Operations: Signal-to-Revenue Engine",
    deck:
      "Defined funnel definitions, KPI math, and operating model embedded in daily execution.",
    outcome:
      "$150M+ pipeline influenced; $8M+ closed-won (directional/public-safe); predictable signal-to-touch execution.",
    scope:
      "Funnel definitions → KPI formulas → reverse-funnel capacity planning → signal routing + SLA → BDR pod model.",
    stack: "CRM • ZoomInfo WebSights • Outreach/Sequences • Dashboards",
    governance:
      "Lifecycle definitions • disposition codes • SLA enforcement • weekly operating review",
    bullets: [
      "Outcome — Built an end-to-end revenue funnel KPI framework (35+ KPIs) covering Awareness → Revenue + unit economics.",
      "System — Reverse-funnel calculator to translate quota into required leads, meetings, and capacity (lead→revenue math).",
      "System — 90-day, budget-light BDR pod model repurposing existing reps into a focused signal-to-meeting motion.",
      "Governance — WebSights signal-to-meeting workflow with tiered SLAs (Tier A: ≤2 hours; Tier B: ≤24 hours) and timestamped accountability.",
      "Governance — Lead lifecycle definitions + qualification criteria + disposition codes to keep CRM data usable for forecasting.",
    ],
    interviewLine:
      "I turn demand into RevOps: defined funnel, enforced SLAs, made CRM trustworthy.",
  },
  {
    slug: "leadership-team-development",
    label: "LEADERSHIP",
    title: "Leadership + Team Development (Operating System)",
    deck:
      "Clear lanes, enforced SLAs, repeatable templates.",
    outcome:
      "Marketing execution speed increased (SLA-driven); teams shipped with less thrash; governance reduced rework.",
    scope:
      "Org design → intake + prioritization → QA + governance → templates → cadence → coaching.",
    stack: "Operating Cadence • Intake • Templates • Analytics",
    governance:
      "RACI • SLAs • weekly reviews • version control • escalation paths",
    bullets: [
      "Before → After — Ad hoc requests and random priorities → two accountable lanes (Demand Gen vs Enablement) with documented handoffs.",
      "Governance — Enforced brief-to-ship SLAs and output floors; work ran like a product team (cadence + templates + review loops).",
      "System — Repurposed existing roles (telesales → BDR) with targets, QA gates, and manager review.",
      "System — Built reusable artifacts: process maps, templates, and weekly operating review formats.",
      "Systems thinking — Treated CRM + analytics as shared infrastructure (definitions, capture requirements, change control), not “someone else’s tool.”",
    ],
    interviewLine:
      "I lead by building systems: clear lanes, measurable SLAs, review loops.",
  },
  {
    slug: "ai-native-gtm",
    label: "AI‑NATIVE GTM",
    title: "Governed AI GTM Engine",
    deck: "Automation for outbound + RFP workflows with human approvals and audit trails.",
    outcome: "40% cycle-time reduction; 99%+ compliance accuracy.",
    scope: "RAG-enabled enrichment → score → draft → approve → CRM handoff.",
    stack: "n8n • RAG • CRM • LLM",
    governance: "Approval gates • audit logs • drift reviews",
    bullets: [
      "Outcome — 40% cycle-time reduction via automated enrichment and draft generation.",
      "Outcome — 99%+ compliance accuracy via mandatory approvals on all AI artifacts.",
      "System — RAG-backed knowledge base for governed RFP and outbound drafting.",
      "Governance — Post-run review loops: error tagging → prompt updates → regression checks.",
      "Artifacts — Workflow map, approval-gate checklist, audit-log schema.",
    ],
    interviewLine:
      "I engineered a governed automation layer—more throughput, lower risk.",
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    label: "DEMAND GEN",
    title: "BDR Pod: Signal-to-Meeting",
    deck: "Signal-driven BDR pod with a hard ≤2-hour signal-to-touch SLA.",
    outcome: "40–60 meetings + 12–20 SQLs (90 days); ≤2-hour signal-to-touch.",
    scope: "Signal capture → enrichment → ICP score → 2-hour outreach SLA.",
    stack: "ZoomInfo • Enrichment • CRM • Outbound",
    governance: "Enforced SLA • documented workflow • weekly operating review",
    longformHref: "/longform/01-bdr-pod-signal-to-meeting.md",
    bullets: [
      "Outcome — 40–60 meetings + 12–20 SQLs in 90 days under a hard ≤2-hour SLA.",
      "System — WebSights signal ingest → company match → ICP score → contact append.",
      "Governance — SLA with teeth: every signal timestamped; misses fixed at process layer.",
      "Governance — Repurposed existing telesales into a signal-driven 2-person BDR pod.",
      "Artifacts — Process map, SLA doc, weekly review template.",
    ],
    interviewLine:
      "I built a signal-driven BDR pod—2-hour SLA, 40-60 meetings in 90 days.",
  },
  {
    slug: "outcome-first-repositioning",
    label: "STRATEGIC POSITIONING",
    title: "Outcome-First Narrative Architecture",
    deck: "Messaging rebuilt to lead with quantified outcomes over service language.",
    outcome: "~10% payment lift; 20%+ cost reduction; 26-day cycle reduction.",
    scope: "Feature mapping → talk tracks → language rules → enablement.",
    stack: "Outcome Mapping • Sales Enablement • Brand Governance",
    governance: "Language rules • claim owners • versioned messaging system",
    longformHref: "/longform/02-outcome-first-repositioning.md",
    bullets: [
      "Outcome — ~10% payment lift + 20%+ cost reduction via outcome-anchored tracks.",
      "Outcome — 26-day reduction in appeals cycle time baked into healthcare talk tracks.",
      "System — Mapped features to quantified outcomes across 6 business units.",
      "Governance — Mandatory Do/Don’t language guide; claim consistency for legal review.",
      "Artifacts — Messaging architecture v1.0, language guide, exec deck.",
    ],
    interviewLine:
      "I rebuilt the narrative around quantified outcomes—~10% payment lift, 20%+ cost reduction.",
  },
  {
    slug: "marketing-org-design-governance",
    label: "MARKETING OPS",
    title: "Two-Function Marketing Operating System",
    deck: "Marketing split into Demand Gen vs. Enablement with enforced SLAs.",
    outcome: "7-day brief-to-ship SLA; 200+/yr content output floor.",
    scope: "Org design → intake workflow → deck governance → GA4 segregation.",
    stack: "Beautiful.ai • GA4 • SharePoint • Marketing Hub",
    governance: "7-day SLA • output minimums • version control • cadence reviews",
    longformHref: "/longform/03-marketing-org-design-governance.md",
    bullets: [
      "Outcome — 7-day brief-to-ship SLA enforced across all content and sales assets.",
      "Outcome — 200+/yr content output floor including 26 press releases per year.",
      "System — Two accountable lanes: Demand Gen (pipeline) + Enablement (asset factory).",
      "Governance — Centralized intake-to-archive + Beautiful.ai version control.",
      "Governance — GA4 audience segregation: B2B reporting isolated from consumer noise.",
      "Artifacts — SLA doc, output cadence dashboard, GA4 requirements.",
    ],
    interviewLine:
      "I rebuilt marketing into two functions with a 7-day ship SLA—runs like a product team.",
  },
  {
    slug: "debtnext-integration",
    label: "DATA SYSTEMS",
    title: "Enterprise Recovery Performance Ledger",
    deck: "Real-time bridge between GTM systems and recovery platforms.",
    outcome: "Eliminated 40 hours/month of manual reconciliation.",
    scope: "API integration → SQL middleware → BI dashboards → anomaly detection.",
    stack: "DebtNext API • SQL • CRM • PowerBI",
    governance: "SOC2-aligned handling • daily ledger checks • anomaly alerts",
    bullets: [
      "Outcome — Eliminated ~40 hours/month of manual reconciliation with an automated ledger.",
      "System — API ingest + SQL middleware normalizing platform data into one view.",
      "System — Executive BI dashboards for recovery mix, performance, and drift visibility.",
      "Governance — Daily reconciliation + anomaly detection to catch portfolio drift early.",
      "Artifacts — Field mapping spec, reconciliation query set, dashboard screenshots.",
    ],
    interviewLine:
      "I built a real-time performance ledger—cut 40 hours/month manual work, surfaced drift.",
  },
  {
    slug: "enterprise-site-overhaul",
    label: "WEB OPS",
    title: "Enterprise Digital Presence Rebuild",
    deck:
      "tsico.com rebuilt around enterprise conversion and clean measurement.",
    outcome: "6× increase in qualified traffic (directional); +28% organic clicks; +19% lead engagement.",
    scope: "UX audit → information architecture → B2B routing → GA4/GTM wiring.",
    stack: "WordPress • Elementor • GA4 • GTM",
    governance: "Conversion IA standards • strict B2B routing • measurement QA",
    bullets: [
      "Outcome — 6× increase in qualified traffic (directional) alongside +28% organic clicks and +19% enterprise lead engagement.",
      "System — Conversion-first IA built for enterprise buyers, not consumer traffic.",
      "System — GA4/GTM instrumentation for high-intent events and event taxonomy.",
      "Governance — Strict B2B routing to eliminate consumer leakage into enterprise funnels.",
      "Artifacts — IA map, event taxonomy, conversion report snapshots.",
    ],
    interviewLine:
      "I rebuilt tsico.com for enterprise conversion—clean routing, clean measurement, measurable growth.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
