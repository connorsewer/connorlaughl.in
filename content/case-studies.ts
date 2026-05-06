export type CaseStudy = {
  slug: string;
  label: string;
  title: string;
  deck: string;
  outcome: string;
  scope: string;
  stack: string;
  governance: string;
  businessProblem: string;
  whatIBuilt: string;
  whatChanged: string;
  whyItMattered: string;
  whatItProves: string;
  bullets: string[];
  interviewLine: string;
  longformHref?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "marketing-analytics-architecture",
    label: "MARKETING ANALYTICS",
    title: "Marketing Analytics System (GA4 + CRM)",
    deck:
      "Measurement rebuilt from the source: cleaner segmentation, event taxonomy, and CRM capture rules.",
    outcome:
      "B2B attribution separated from consumer noise. Conversion events became standard enough for RevOps to use.",
    scope:
      "Audience segmentation → content groups → event taxonomy → UTM/GCLID capture → cross-domain tracking rules.",
    stack: "GA4 • GTM • WordPress • CRM (Zoho/Salesforce concepts)",
    governance:
      "Event + naming standards • hidden-field requirements • QA checklist • change control",
    businessProblem:
      "Marketing reporting mixed enterprise buyers, consumer visitors, subdomain traffic, and form flows into one blurry picture. The hard part was fixing the tracking layer without breaking live lead flow.",
    whatIBuilt:
      "I rebuilt the measurement model: B2B audience segmentation, 7 line-of-business content groups, conversion events, UTM and GCLID capture, and cross-domain rules.",
    whatChanged:
      "GA4 and CRM data became useful for RevOps. The team could separate buyer traffic from noise and tie conversion activity back to solution lines.",
    whyItMattered:
      "Bad attribution quietly breaks budget decisions, sales follow-up, and executive reporting. I fixed the measurement base before asking the team to add more campaigns.",
    whatItProves:
      "I can rebuild messy marketing data into rules teams can trust and keep using.",
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
      "Outcome-first messaging backed by a claims register, so sales could move fast without making things up.",
    outcome:
      "One narrative system across 6 business units, tighter proof rules, and cleaner sales enablement.",
    scope:
      "Positioning → pillar framework → persona value props → proof library → claims register → enablement.",
    stack: "Messaging System • Enablement • RFP Library • Governance",
    governance:
      "Claims register (Verified/Directional/Projected) • versioned messaging • voice/style rules",
    businessProblem:
      "Sales needed one story across 6 business units. The existing language was too service-led and too easy to bend in the field.",
    whatIBuilt:
      "I wrote the messaging system, built the pillar framework, mapped persona value props to proof, and created a claims register with verification status.",
    whatChanged:
      "Sales got clearer talk tracks, marketing got cleaner guardrails, and external claims had owners instead of drifting across decks.",
    whyItMattered:
      "Enterprise buyers need proof they can repeat internally. The claims register helped sales move faster while keeping unsupported claims out of decks.",
    whatItProves:
      "I can build the story and the controls around it: positioning, proof, enablement, and review rules in one model.",
    bullets: [
      "Authored a 50+ page messaging system across 6 business units with outcome-first positioning.",
      "Built a 5-pillar framework: Recover More/Faster; Protect Brand & Experience; Reduce Risk/Compliance Exposure; Lifecycle Visibility; Start Fast/Scale on Proof.",
      "Mapped persona value props from client outcomes to delivery mechanisms, proof, KPIs, and use cases.",
      "Created a proof library and claims register with status tracking to prevent unverified external claims.",
      "Before: service-language decks. After: quantified talk tracks written in plain English, active voice, and no empty superlatives.",
    ],
    interviewLine:
      "I build positioning with clear claims, clear proof, and rules sellers can actually use.",
  },
  {
    slug: "revenue-operations-signal-to-revenue",
    label: "REVOPS",
    title: "Revenue Operations: Signal-to-Revenue Engine",
    deck:
      "Defined funnel definitions, KPI math, and operating model embedded in daily execution.",
    outcome:
      "Material influenced pipeline and closed-won contribution, with tighter signal-to-touch execution.",
    scope:
      "Funnel definitions → KPI formulas → reverse-funnel capacity planning → signal routing + SLA → BDR pod model.",
    stack: "CRM • ZoomInfo WebSights • Outreach/Sequences • Dashboards",
    governance:
      "Lifecycle definitions • disposition codes • SLA enforcement • weekly operating review",
    businessProblem:
      "Demand activity, sales capacity, and pipeline math were disconnected. The team needed a funnel model people could run every week.",
    whatIBuilt:
      "I built the KPI framework, reverse-funnel calculator, BDR pod model, signal routing workflow, lifecycle definitions, and SLA review cadence.",
    whatChanged:
      "Marketing-influenced pipeline and closed-won contribution became easier to track, while signal response moved into a tighter daily rhythm.",
    whyItMattered:
      "Pipeline quality depends on definitions, ownership, and fast handoffs. The system made demand generation visible enough for leaders to manage.",
    whatItProves:
      "I can connect strategy to RevOps mechanics: quota math, CRM hygiene, rep capacity, signal routing, and weekly accountability.",
    bullets: [
      "Built a revenue funnel KPI framework across awareness, pipeline, revenue, and unit economics.",
      "Built a reverse-funnel calculator to translate quota into required leads, meetings, and capacity.",
      "Designed a 90-day BDR pod model that repurposed existing reps into a focused signal-to-meeting motion.",
      "Created a WebSights signal-to-meeting workflow with tiered SLAs: Tier A at 2 hours or less, Tier B at 24 hours or less.",
      "Defined lead lifecycle stages, qualification criteria, and disposition codes to keep CRM data usable for forecasting.",
    ],
    interviewLine:
      "I turn demand into RevOps: defined funnel, enforced SLAs, and CRM data people can trust.",
  },
  {
    slug: "leadership-team-development",
    label: "LEADERSHIP",
    title: "Leadership + Team Development (Operating System)",
    deck:
      "Clear lanes, enforced SLAs, repeatable templates.",
    outcome:
      "Marketing shipped with less thrash because lanes, SLAs, and review rules were visible.",
    scope:
      "Org design → intake rules → prioritization → QA → templates → cadence → coaching.",
    stack: "Operating Cadence • Intake • Templates • Analytics",
    governance:
      "RACI • SLAs • weekly reviews • version control • escalation paths",
    businessProblem:
      "Marketing work arrived through ad hoc requests, shifting priorities, and unclear handoffs. The constraint was ambiguity, not effort.",
    whatIBuilt:
      "I split work into accountable lanes, added intake rules, enforced brief-to-ship SLAs, created templates, and put recurring reviews around the work.",
    whatChanged:
      "The team shipped with less thrash. Priorities, owners, review gates, and escalation paths were easier to see and harder to ignore.",
    whyItMattered:
      "A marketing org needs a way to decide what gets done, who owns it, and how quality survives speed.",
    whatItProves:
      "I lead by designing the work around the team, then coaching inside clear lanes instead of managing through heroics.",
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
    label: "GOVERNED AI",
    title: "Governed AI GTM Engine",
    deck: "Automation for outbound + RFP workflows with human approvals and audit trails.",
    outcome: "Faster RFP and outbound cycles, with compliance review built into the workflow.",
    scope: "Knowledge-base enrichment → score → draft → approve → CRM handoff.",
    stack: "n8n • RAG • CRM • LLM",
    governance: "Approval gates • audit logs • drift reviews",
    businessProblem:
      "AI could speed up outbound and RFP work. The risk was letting unchecked drafts reach regulated buyers.",
    whatIBuilt:
      "I designed the AI workflow: knowledge base, enrichment, scoring, draft generation, approval gates, audit logs, and post-run reviews.",
    whatChanged:
      "Drafting cycles got faster, and AI outputs moved through human review before anything reached the field.",
    whyItMattered:
      "AI in regulated GTM work needs controls. The workflow increased throughput while keeping approval paths visible.",
    whatItProves:
      "I can turn loose AI experiments into working GTM workflows with approval paths, error loops, and measurable speed gains.",
    bullets: [
      "Cut manual drafting time through automated enrichment and draft generation.",
      "Kept compliance review mandatory before any AI artifact reached the field.",
      "Built a RAG-backed knowledge base for governed RFP and outbound drafting.",
      "Added post-run review loops: error tagging, prompt updates, and regression checks.",
      "Artifacts available: workflow map, approval-gate checklist, and audit-log schema.",
    ],
    interviewLine:
      "I built an automation layer that moved faster because the controls were built in.",
  },
  {
    slug: "bdr-pod-signal-to-meeting",
    label: "DEMAND GEN",
    title: "BDR Pod: Signal-to-Meeting",
    deck: "Signal-driven BDR pod with a hard ≤2-hour signal-to-touch SLA.",
    outcome: "90-day target: 40 to 60 meetings, 12 to 20 SQLs, and a 2-hour signal-to-touch SLA.",
    scope: "Signal capture → enrichment → ICP score → 2-hour outreach SLA.",
    stack: "ZoomInfo • Enrichment • CRM • Outbound",
    governance: "Enforced SLA • documented workflow • weekly operating review",
    businessProblem:
      "High-intent account signals were visible, but the follow-up motion was too slow and too manual to convert intent into meetings reliably.",
    whatIBuilt:
      "I built the WebSights signal flow, company matching, ICP scoring, contact append steps, 2-person BDR pod, and hard 2-hour response SLA.",
    whatChanged:
      "The 90-day plan targeted 40 to 60 meetings and 12 to 20 SQLs. Every signal was timestamped and misses were reviewed.",
    whyItMattered:
      "Intent data loses value fast. The pod turned anonymous account movement into owned follow-up with a clear clock.",
    whatItProves:
      "I can wire demand signals into sales execution: scoring, staffing, SLAs, QA, and weekly fixes when the process breaks.",
    longformHref: "/longform/01-bdr-pod-signal-to-meeting.md",
    bullets: [
      "Targeted 40 to 60 meetings and 12 to 20 SQLs in 90 days under a hard 2-hour SLA.",
      "Built the flow from WebSights signal ingest to company match, ICP score, and contact append.",
      "Put teeth on the SLA. Every signal was timestamped, and misses were fixed at the process layer.",
      "Repurposed existing telesales into a signal-driven 2-person BDR pod.",
      "Artifacts available: process map, SLA doc, and weekly review template.",
    ],
    interviewLine:
      "I built a signal-driven BDR pod with a 2-hour SLA and a clear 90-day meeting target.",
  },
  {
    slug: "outcome-first-repositioning",
    label: "STRATEGIC POSITIONING",
    title: "Outcome-First Narrative System",
    deck: "Messaging rebuilt to lead with quantified outcomes over service language.",
    outcome: "Outcome proof tied to payment lift, cost reduction, and a shorter appeals cycle.",
    scope: "Feature mapping → talk tracks → language rules → enablement.",
    stack: "Outcome Mapping • Sales Enablement • Brand Governance",
    governance: "Language rules • claim owners • versioned messaging system",
    businessProblem:
      "The story leaned on service descriptions when buyers needed quantified outcomes, risk reduction, and language sales could defend. The hard part was making the proof usable without overclaiming.",
    whatIBuilt:
      "I rebuilt the narrative around outcome tracks, mapped features to proof, created language rules, and tied claims to owners for review.",
    whatChanged:
      "The system carried approved proof into sales materials: payment lift, cost reduction, and a shorter appeals cycle.",
    whyItMattered:
      "Better positioning gives sales a cleaner path into executive conversations. It also keeps strong claims from becoming loose claims.",
    whatItProves:
      "I can translate operational proof into buyer language while keeping enough governance around the claims to protect the company.",
    longformHref: "/longform/02-outcome-first-repositioning.md",
    bullets: [
      "Built outcome-anchored tracks tied to approved proof points for payment lift and cost reduction.",
      "Baked a shorter appeals cycle into healthcare talk tracks, with the claim tied to source material.",
      "Mapped features to quantified outcomes across 6 business units.",
      "Created a mandatory Do/Don't language guide to keep claims consistent for legal review.",
      "Artifacts available: Messaging System v1.0, language guide, and executive deck.",
    ],
    interviewLine:
      "I rebuilt the narrative around approved outcome proof, then made the language safe for sales to reuse.",
  },
  {
    slug: "marketing-org-design-governance",
    label: "MARKETING OPS",
    title: "Two-Function Marketing Operating System",
    deck: "Marketing split into Demand Gen vs. Enablement with enforced SLAs.",
    outcome: "7-day brief-to-ship SLA and a published content output floor.",
    scope: "Org design → intake workflow → deck rules → GA4 audience separation.",
    stack: "Beautiful.ai • GA4 • SharePoint • Marketing Hub",
    governance: "7-day SLA • output minimums • version control • cadence reviews",
    businessProblem:
      "Marketing needed more speed and clearer accountability, but the work was spread across requests, decks, content, reporting, and support needs.",
    whatIBuilt:
      "I designed a 2-lane operating model, intake-to-archive workflow, 7-day brief-to-ship SLA, output floor, version control, and GA4 segregation rules.",
    whatChanged:
      "The team had a cleaner ship rhythm, a published output floor, and clearer separation between pipeline work and seller enablement.",
    whyItMattered:
      "Marketing scale comes from repeatable motion. The model made the work easier to route, review, ship, and measure.",
    whatItProves:
      "I can rebuild a marketing function around ownership, cadence, content throughput, and measurement hygiene.",
    longformHref: "/longform/03-marketing-org-design-governance.md",
    bullets: [
      "Enforced a 7-day brief-to-ship SLA across content and sales assets.",
      "Set a published output floor for content, press releases, and sales assets.",
      "Created 2 accountable lanes: Demand Gen for pipeline and Enablement for seller assets.",
      "Centralized intake-to-archive workflow and Beautiful.ai version control.",
      "Segregated GA4 audiences so B2B reporting stayed separate from consumer noise.",
      "Artifacts available: SLA doc, output cadence dashboard, and GA4 requirements.",
    ],
    interviewLine:
      "I rebuilt marketing into 2 functions with a 7-day ship SLA and a clearer review rhythm.",
  },
  {
    slug: "debtnext-integration",
    label: "DATA SYSTEMS",
    title: "Enterprise Recovery Performance Ledger",
    deck: "Bridge between GTM systems and recovery-platform data.",
    outcome: "Removed recurring manual reconciliation work.",
    scope: "API ingest → SQL normalization → BI dashboards → anomaly detection.",
    stack: "DebtNext API • SQL • CRM • PowerBI",
    governance: "SOC2-aligned handling • daily ledger checks • anomaly alerts",
    businessProblem:
      "Performance data lived across recovery systems, GTM systems, and manual reconciliation work. Leaders needed a cleaner view of drift and recovery mix before monthly reporting closed.",
    whatIBuilt:
      "I designed the API ingest, SQL normalization layer, BI dashboards, daily ledger checks, and anomaly alerts.",
    whatChanged:
      "The ledger removed recurring manual reconciliation and gave leaders faster visibility into performance movement.",
    whyItMattered:
      "Manual reconciliation hides problems until they get expensive. A daily ledger made drift visible early enough to act.",
    whatItProves:
      "I can bridge GTM, finance, and operating data into a reporting layer leaders can use without waiting on manual cleanup.",
    bullets: [
      "Removed recurring manual reconciliation with an automated ledger.",
      "Built API ingest and SQL middleware to normalize platform data into one view.",
      "Built executive BI dashboards for recovery mix, performance, and drift visibility.",
      "Added daily reconciliation and anomaly detection to catch portfolio drift early.",
      "Artifacts available: field mapping spec, reconciliation query set, and dashboard screenshots.",
    ],
    interviewLine:
      "I built a performance ledger that removed recurring manual work and surfaced drift earlier.",
  },
  {
    slug: "enterprise-site-overhaul",
    label: "WEB OPS",
    title: "Enterprise Digital Presence Rebuild",
    deck:
      "tsico.com rebuilt around enterprise conversion and clean measurement.",
    outcome: "Directional lift in qualified traffic, organic clicks, and enterprise lead engagement.",
    scope: "UX audit → information architecture → B2B routing → GA4/GTM wiring.",
    stack: "WordPress • Elementor • GA4 • GTM",
    governance: "Conversion IA standards • strict B2B routing • measurement QA",
    businessProblem:
      "The website had to serve enterprise buyers without letting consumer traffic distort routing, reporting, and conversion data. The constraint was rebuilding the funnel while the site stayed live.",
    whatIBuilt:
      "I rebuilt the site around enterprise IA, B2B routing, high-intent events, GA4/GTM instrumentation, and conversion QA.",
    whatChanged:
      "Qualified traffic, organic clicks, and enterprise lead engagement all moved in the right direction.",
    whyItMattered:
      "A corporate site is part of the revenue system. Clean routing and measurement made it easier to see which buyer actions mattered.",
    whatItProves:
      "I can connect web strategy, conversion design, measurement, and enterprise buyer routing in one build.",
    bullets: [
      "Produced directional gains in qualified traffic, organic clicks, and enterprise lead engagement.",
      "Built conversion-first IA for enterprise buyers and strict separation from consumer traffic.",
      "Built GA4/GTM instrumentation for high-intent events and event taxonomy.",
      "Added strict B2B routing to keep consumer traffic out of enterprise funnels.",
      "Artifacts available: IA map, event taxonomy, and conversion report snapshots.",
    ],
    interviewLine:
      "I rebuilt tsico.com for enterprise conversion with cleaner routing and cleaner measurement.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
