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
      "Before: reporting was polluted by mixed traffic. After: GA4 audiences separated B2B prospects from consumer visitors.",
      "Built line-of-business content grouping across 7 verticals for attribution by solution line.",
      "Built a conversion event taxonomy around generate_lead, file_download, click_to_call, and click_to_email.",
      "Set CRM capture requirements: UTM and GCLID stored in hidden fields to protect lead-source integrity.",
      "Specified cross-domain and subdomain tracking for form flows, with measurement QA built into release steps.",
    ],
    interviewLine:
      "I treat analytics as infrastructure. If attribution is wrong, every decision is wrong.",
  },
  {
    slug: "gtm-strategy-positioning",
    label: "GTM STRATEGY",
    title: "GTM Strategy + Positioning System",
    deck:
      "Outcome-first messaging with a claims register, so sales can move fast without making things up.",
    outcome:
      "One narrative system across 6 business units; tighter proof governance; faster enablement and more consistent win themes.",
    scope:
      "Positioning architecture → pillar framework → persona value props → proof library/claims register → enablement.",
    stack: "Messaging System • Enablement • RFP Library • Governance",
    governance:
      "Claims register (Verified/Directional/Projected) • versioned messaging • voice/style rules",
    bullets: [
      "Authored a 50+ page messaging architecture across 6 business units with outcome-first positioning.",
      "Built a 5-pillar framework: Recover More/Faster; Protect Brand & Experience; Reduce Risk/Compliance Exposure; Lifecycle Visibility; Start Fast/Scale on Proof.",
      "Mapped persona value props from client outcomes to delivery mechanisms, proof, KPIs, and use cases.",
      "Created a proof library and claims register with status tracking to prevent unverified external claims.",
      "Before: service-language decks. After: quantified, buyer-aligned talk tracks with plain English, active voice, and no empty superlatives.",
    ],
    interviewLine:
      "I build positioning as a governed system with clear claims, clear proof, and language rules.",
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
      "Built an end-to-end revenue funnel KPI framework with 35+ KPIs across awareness, revenue, and unit economics.",
      "Built a reverse-funnel calculator to translate quota into required leads, meetings, and capacity.",
      "Designed a 90-day BDR pod model that repurposed existing reps into a focused signal-to-meeting motion.",
      "Created a WebSights signal-to-meeting workflow with tiered SLAs: Tier A at 2 hours or less, Tier B at 24 hours or less.",
      "Defined lead lifecycle stages, qualification criteria, and disposition codes to keep CRM data usable for forecasting.",
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
      "Before: ad hoc requests and random priorities. After: 2 accountable lanes, Demand Gen and Enablement, with documented handoffs.",
      "Enforced brief-to-ship SLAs and output floors so the work ran like a product team.",
      "Repurposed existing telesales roles into BDR roles with targets, QA gates, and manager review.",
      "Built reusable process maps, templates, and weekly operating review formats.",
      "Treated CRM and analytics as shared infrastructure, with definitions, capture requirements, and change control.",
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
      "Reduced cycle time 40% through automated enrichment and draft generation.",
      "Reached 99%+ compliance accuracy through mandatory approvals on AI artifacts.",
      "Built a RAG-backed knowledge base for governed RFP and outbound drafting.",
      "Added post-run review loops: error tagging, prompt updates, and regression checks.",
      "Artifacts available: workflow map, approval-gate checklist, and audit-log schema.",
    ],
    interviewLine:
      "I engineered a governed automation layer with more throughput and lower risk.",
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    label: "DEMAND GEN",
    title: "BDR Pod: Signal-to-Meeting",
    deck: "Signal-driven BDR pod with a hard ≤2-hour signal-to-touch SLA.",
    outcome: "40 to 60 meetings + 12 to 20 SQLs (90 days); 2-hour signal-to-touch.",
    scope: "Signal capture → enrichment → ICP score → 2-hour outreach SLA.",
    stack: "ZoomInfo • Enrichment • CRM • Outbound",
    governance: "Enforced SLA • documented workflow • weekly operating review",
    longformHref: "/longform/01-bdr-pod-signal-to-meeting.md",
    bullets: [
      "Targeted 40 to 60 meetings and 12 to 20 SQLs in 90 days under a hard 2-hour SLA.",
      "Built the flow from WebSights signal ingest to company match, ICP score, and contact append.",
      "Put teeth on the SLA: every signal was timestamped, and misses were fixed at the process layer.",
      "Repurposed existing telesales into a signal-driven 2-person BDR pod.",
      "Artifacts available: process map, SLA doc, and weekly review template.",
    ],
    interviewLine:
      "I built a signal-driven BDR pod with a 2-hour SLA and 40 to 60 meetings targeted in 90 days.",
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
      "Built outcome-anchored tracks tied to about 10% payment lift and 20%+ cost reduction.",
      "Baked a 26-day appeals cycle-time reduction into healthcare talk tracks.",
      "Mapped features to quantified outcomes across 6 business units.",
      "Created a mandatory Do/Don't language guide to keep claims consistent for legal review.",
      "Artifacts available: Messaging Architecture v1.0, language guide, and executive deck.",
    ],
    interviewLine:
      "I rebuilt the narrative around quantified outcomes, including about 10% payment lift and 20%+ cost reduction.",
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
      "Enforced a 7-day brief-to-ship SLA across content and sales assets.",
      "Set a 200+/year content output floor, including 26 press releases per year.",
      "Created 2 accountable lanes: Demand Gen for pipeline and Enablement for seller assets.",
      "Centralized intake-to-archive workflow and Beautiful.ai version control.",
      "Segregated GA4 audiences so B2B reporting stayed separate from consumer noise.",
      "Artifacts available: SLA doc, output cadence dashboard, and GA4 requirements.",
    ],
    interviewLine:
      "I rebuilt marketing into 2 functions with a 7-day ship SLA. It runs like a product team.",
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
      "Eliminated about 40 hours per month of manual reconciliation with an automated ledger.",
      "Built API ingest and SQL middleware to normalize platform data into one view.",
      "Built executive BI dashboards for recovery mix, performance, and drift visibility.",
      "Added daily reconciliation and anomaly detection to catch portfolio drift early.",
      "Artifacts available: field mapping spec, reconciliation query set, and dashboard screenshots.",
    ],
    interviewLine:
      "I built a real-time performance ledger that cut 40 hours per month of manual work and surfaced drift.",
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
      "Produced a directional 6x increase in qualified traffic, plus 28% organic click growth and 19% higher enterprise lead engagement.",
      "Built conversion-first IA for enterprise buyers and strict separation from consumer traffic.",
      "Built GA4/GTM instrumentation for high-intent events and event taxonomy.",
      "Added strict B2B routing to keep consumer traffic out of enterprise funnels.",
      "Artifacts available: IA map, event taxonomy, and conversion report snapshots.",
    ],
    interviewLine:
      "I rebuilt tsico.com for enterprise conversion with clean routing, clean measurement, and measurable growth.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
