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
    slug: "ai-native-gtm",
    label: "AI‑NATIVE GTM",
    title: "Governed AI GTM Engine",
    deck: "Automation for outbound + RFP drafting with human approvals and audit trails.",
    outcome: "40% cycle-time reduction; 99%+ compliance accuracy.",
    scope: "Outbound + RFP: enrich → score → draft → approve → CRM handoff.",
    stack: "n8n • RAG • CRM • LLM",
    governance: "Approval gates • audit logs • drift reviews",
    bullets: [
      "Outcome — 40% cycle-time reduction by automating enrichment, routing, and draft generation.",
      "Outcome — 99%+ compliance accuracy by forcing approvals on every AI-generated artifact.",
      "System — RAG-backed knowledge base for governed RFP and outbound drafting (source-cited inputs).",
      "Governance — post-run review loop: error tagging → prompt updates → regression checks.",
      "Artifacts — workflow map, approval-gate checklist, audit-log schema.",
    ],
    interviewLine:
      "I didn’t ‘add AI.’ I engineered a governed automation layer—more throughput, lower risk.",
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    label: "DEMAND GEN",
    title: "BDR Pod: Signal-to-Meeting",
    deck: "Signal-driven BDR pod with a hard ≤2-hour signal-to-touch SLA.",
    outcome: "40–60 meetings + 12–20 SQLs (first 90 days); ≤2-hour signal-to-touch.",
    scope: "Signal capture → enrichment → ICP score → contact append → 2-hour outreach SLA.",
    stack: "ZoomInfo WebSights • Enrichment • CRM • Outbound",
    governance: "Documented workflow • enforced SLA • weekly operating review",
    longformHref: "/longform/01-bdr-pod-signal-to-meeting.md",
    bullets: [
      "Outcome — 40–60 meetings + 12–20 SQLs targeted in 90 days under a hard ≤2-hour SLA.",
      "Constraint — no new headcount: repurposed existing telesales into a 2-person BDR pod.",
      "System — WebSights signal ingest → company match → ICP score → contact append before human touch.",
      "Governance — SLA with teeth: every signal timestamped; misses reviewed weekly and fixed at the process layer.",
      "Artifacts — process map, SLA doc, weekly review template.",
    ],
    interviewLine:
      "No new headcount. I repurposed telesales into a signal-driven BDR pod with a hard 2-hour SLA—first 90 days targeted 40–60 meetings and 12–20 SQLs.",
  },
  {
    slug: "outcome-first-repositioning",
    label: "STRATEGIC POSITIONING",
    title: "Outcome-First Narrative Architecture",
    deck: "Rebuilt messaging to lead with quantified outcomes instead of service language.",
    outcome: "~10% payment lift; 20%+ cost reduction; 26-day cycle-time reduction.",
    scope: "Feature→benefit→outcome mapping → talk tracks → language rules → enablement + RFP survivability.",
    stack: "Outcome Mapping • Sales Enablement • Brand Governance",
    governance: "Do/Don’t language rules • claim owners • versioned messaging system",
    longformHref: "/longform/02-outcome-first-repositioning.md",
    bullets: [
      "Outcome — ~10% payment lift + 20%+ cost reduction by shifting to outcome-anchored payment tracks.",
      "Proof — 26 fewer days in appeals cycle time baked into talk tracks (healthcare motion).",
      "System — mapped features → benefits → quantified outcomes across 6 business units (no orphan claims).",
      "Governance — mandatory Do/Don’t language guide; claim consistency survived legal/procurement review.",
      "Artifacts — messaging architecture v1.0, language guide, exec deck + RFP inserts.",
    ],
    interviewLine:
      "I rebuilt the narrative around quantified outcomes across 6 business units—~10% payment lift, 20%+ cost reduction, and a 26-day cycle-time reduction baked into every talk track.",
  },
  {
    slug: "marketing-org-design-governance",
    label: "MARKETING OPS",
    title: "Two-Function Marketing Operating System",
    deck: "Split marketing into Demand Gen vs. Enablement, then enforced SLAs and output minimums.",
    outcome: "7-day brief-to-ship SLA; 200+/yr content output floor.",
    scope: "Org design → intake-to-archive workflow → deck governance → GA4 audience segregation.",
    stack: "Beautiful.ai • GA4 • SharePoint/Teams • Marketing Hub",
    governance: "7-day SLA • published minimum outputs • version control • cadence reviews",
    longformHref: "/longform/03-marketing-org-design-governance.md",
    bullets: [
      "Outcome — 7-day brief-to-ship SLA enforced across content + sales assets (no ‘rush’ queue jumping).",
      "Outcome — output minimums published and tracked: 200+/yr floor incl. 26 press releases/yr.",
      "System — two accountable lanes: Demand Gen (pipeline) + Enablement/Design (asset factory).",
      "Governance — centralized intake-to-archive + Beautiful.ai version control (no rogue decks).",
      "Governance — GA4 audience segregation: B2B reporting isolated from consumer/debtor noise.",
      "Artifacts — SLA doc, output cadence dashboard, GA4 tracking requirements, hub structure map.",
    ],
    interviewLine:
      "I rebuilt marketing into two functions with a 7-day brief-to-ship SLA and published output minimums—marketing now runs like a product team.",
  },
  {
    slug: "debtnext-integration",
    label: "DATA SYSTEMS",
    title: "Enterprise Recovery Performance Ledger",
    deck: "Real-time bridge between GTM systems and recovery platforms with daily reconciliation.",
    outcome: "Eliminated 40 hours/month of manual reconciliation; real-time portfolio visibility.",
    scope: "API integration → SQL middleware → BI dashboards → reconciliation + anomaly detection.",
    stack: "DebtNext API • SQL • CRM • PowerBI",
    governance: "SOC2-aligned handling • daily ledger checks • anomaly alerts",
    bullets: [
      "Outcome — eliminated ~40 hours/month of manual reconciliation with an automated ledger.",
      "System — API ingest + SQL middleware to normalize platform data into one portfolio view.",
      "System — executive BI dashboards for recovery mix, performance, and drift visibility.",
      "Governance — daily reconciliation + anomaly detection to catch portfolio drift early.",
      "Artifacts — field mapping spec, reconciliation query set, dashboard screenshots.",
    ],
    interviewLine:
      "I built a real-time performance ledger across GTM + DebtNext, cutting ~40 hours/month of manual reconciliation and making portfolio drift visible immediately.",
  },
  {
    slug: "enterprise-site-overhaul",
    label: "WEB OPS",
    title: "Enterprise Digital Presence Rebuild",
    deck: "Rebuilt tsico.com around enterprise conversion and clean measurement.",
    outcome: "28% lift in organic clicks; 19% increase in enterprise lead engagement.",
    scope: "UX audit → information architecture → B2B routing → GA4/GTM wiring → content governance.",
    stack: "WordPress • Elementor • GA4 • GTM",
    governance: "Conversion-first IA standards • strict B2B routing • measurement QA",
    bullets: [
      "Outcome — +28% organic clicks and +19% enterprise lead engagement after the rebuild.",
      "System — conversion-first IA built for enterprise buyers (not consumer traffic patterns).",
      "Governance — strict B2B routing to reduce consumer/debtor leakage into enterprise funnels.",
      "System — GA4/GTM instrumentation for high-intent events (forms, key pages, CTAs).",
      "Artifacts — IA map, event taxonomy, conversion report snapshots.",
    ],
    interviewLine:
      "I rebuilt tsico.com for enterprise conversion—+28% organic clicks and +19% enterprise engagement—with governance at the IA and measurement layers.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
