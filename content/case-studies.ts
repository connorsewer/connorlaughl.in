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
    deck: "Human-in-the-loop automation for outbound and RFP workflows.",
    outcome: "40% cycle reduction; 99%+ compliance accuracy.",
    scope: "Enrichment → intent scoring → automated drafting → approval gates → CRM handoff.",
    stack: "n8n • RAG • CRM • GPT-4o",
    governance: "Mandatory approval gates • full audit logging • model-drift audits",
    bullets: [
      "System: RAG-enabled RFP engine utilizing governed knowledge bases.",
      "Governance: Mandatory approval gates for all AI-generated output.",
      "Outcome: 40% cycle reduction via automated enrichment and routing.",
      "System: Post-run review loops for prompt refinement and error mitigation.",
    ],
    interviewLine:
      "We didn’t ‘add AI.’ We built a governed system that increased throughput while reducing risk.",
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    label: "DEMAND GEN",
    title: "BDR Pod: Signal-to-Meeting",
    deck: "Signal-driven BDR pod with 2-hour outreach SLAs.",
    outcome: "40–60 meetings + 12–20 SQLs (90 days); ≤2-hour signal-to-touch SLA.",
    scope: "Signal identification → automated enrichment → ICP scoring → 2-hour SLA.",
    stack: "ZoomInfo WebSights • Enrichment Tools • CRM • Outbound Sales",
    governance: "Documented workflows • hard 2-hour SLA • weekly operating reviews.",
    longformHref: "/longform/01-bdr-pod-signal-to-meeting.md",
    bullets: [
      "System: B2B signal capture via ZoomInfo WebSights.",
      "System: Automated enrichment layer: company match → ICP score → contact append.",
      "Governance: Enforced 2-hour signal-to-touch SLA as a structural constraint.",
      "Outcome: 90-day target of 40–60 meetings and 12–20 SQLs under a hard ≤2-hour SLA.",
      "Governance: Weekly operating reviews for signal quality and disqualification iteration.",
    ],
    interviewLine:
      "I repurposed existing telesales into a signal-driven BDR pod with a 2-hour SLA. First 90 days: 40-60 meetings and 12-20 SQLs.",
  },
  {
    slug: "outcome-first-repositioning",
    label: "STRATEGIC POSITIONING",
    title: "Outcome-First Narrative Architecture",
    deck: "Repositioning from service-based language to outcome-anchored messaging.",
    outcome: "10% payment lift; 20%+ cost reduction.",
    scope: "Messaging framework → outcome mapping → language guides → sales enablement.",
    stack: "Outcome Mapping • Sales Enablement • Brand Governance",
    governance: "Explicit language rules • cross-functional alignment • auditable positioning.",
    longformHref: "/longform/02-outcome-first-repositioning.md",
    bullets: [
      "System: Quantified outcome mapping across 6 business units (e.g., 26-day cycle reduction).",
      "Governance: Mandatory 'Do/Don't' language guides for enterprise-wide claim consistency.",
      "Outcome: 10% payment lift and 20%+ cost reduction via narrative-driven payment tracks.",
      "System: Sales enablement alignment ensuring claim survival through procurement/legal.",
    ],
    interviewLine:
      "We stopped saying 'collections' and started proving 'recover more at lower net-cost'—10% lift and 20%+ cost reduction.",
  },
  {
    slug: "marketing-org-design-governance",
    label: "MARKETING OPS",
    title: "Two-Function Marketing: Org Design",
    deck: "Marketing restructure into accountable functions with output SLAs.",
    outcome: "7-day brief-to-ship SLA; 200+/yr content output floor.",
    scope: "Org Design (Demand Gen vs. Enablement) → governance layer → GA4 segregation.",
    stack: "Beautiful.ai • GA4 • SharePoint/Teams • Marketing Hub",
    governance: "7-day brief-to-ship SLA • published output minimums • audience segregation.",
    longformHref: "/longform/03-marketing-org-design-governance.md",
    bullets: [
      "System: Functional split (Demand Gen vs. Sales Enablement) with defined operational lanes.",
      "Governance: 7-day brief-to-ship SLA for all content and sales assets.",
      "Outcome: 200+/yr content output floor + 26 press releases/yr under a governed 7-day SLA.",
      "System: Centralized intake-to-archive workflow and deck governance.",
      "Governance: GA4 audience segregation isolating B2B activity from consumer noise.",
    ],
    interviewLine:
      "I restructured marketing into two functions with a 7-day brief-to-ship SLA. Marketing now operates like a product team.",
  },
  {
    slug: "debtnext-integration",
    label: "DATA SYSTEMS",
    title: "Enterprise Recovery Performance Ledger",
    deck: "Data bridge between TSI GTM systems and DebtNext recovery platforms.",
    outcome: "Real-time portfolio visibility; eliminated 40-hour monthly manual reconciliation.",
    scope: "API integration → custom SQL middleware → BI dashboarding → governance framework.",
    stack: "DebtNext API • SQL • CRM • PowerBI",
    governance: "SOC2-compliant handling • daily ledger reconciliation • anomaly detection.",
    bullets: [
      "System: Real-time API bridge for automated data ingestion from recovery platforms.",
      "Outcome: 100% elimination of 40-hour monthly manual data reconciliation.",
      "System: Executive BI dashboards providing granular recovery-mix visibility.",
      "Governance: Automated anomaly detection system flagging portfolio drift in real-time.",
    ],
    interviewLine:
      "We built a real-time ledger that synced TSI and DebtNext data, saving 40 hours of manual work every month.",
  },
  {
    slug: "enterprise-site-overhaul",
    label: "WEB OPS",
    title: "Enterprise Digital Presence Rebuild",
    deck: "tsico.com redesign focusing on enterprise conversion.",
    outcome: "28% lift in organic clicks; 19% increase in enterprise lead engagement.",
    scope: "UX audit → information architecture → GA4 wiring → content governance.",
    stack: "WordPress • Elementor • GA4 • GTM",
    governance: "Conversion-first IA standards • strict B2B routing • annual governance review.",
    bullets: [
      "System: Conversion-optimized information architecture for enterprise buyers.",
      "Outcome: 28% increase in organic search clicks and 19% lift in enterprise engagement.",
      "Governance: High-trust UX standards reducing consumer routing leakage to enterprise sales.",
      "System: Advanced GA4/GTM wiring isolating high-intent B2B conversion events.",
    ],
    interviewLine:
      "The site is a conversion machine that separates consumer noise from enterprise value, driving a 28% lift in clicks.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
