# Portfolio v2 — Design Template + Copy Inventory

Location: `career/portfolio-v2/`

This doc is meant for editing. Everything below is laid out as **section headers + current copy**, so you can revise quickly.

---

## 0) Design Template (Luxury Editorial)

### Brand / Aesthetic
- **Mode:** Luxury editorial (museum catalog / black gallery wall)
- **Default:** Dark-first
- **Accent:** Sandy rattan / khaki

### Color tokens (CSS variables)
- `--ink` (background)
- `--paper` (foreground text)
- `--paper-muted` (secondary text)
- `--rule` (hairline borders)
- `--accent` (rattan highlight)

### Typography
- **Display (headers):** Instrument Serif (`--font-display`)
- **Body:** IBM Plex Sans (`--font-sans`)
- **Metadata/Index:** IBM Plex Mono (`--font-mono`)

### Layout rules
- **Grid:** max width `max-w-6xl`
- **Rhythm:** big sections, sharp hairlines, generous negative space
- **Components:**
  - Fixed header with hairline divider
  - “Catalogue” index with preview pane (hover updates)
  - Dossier-style case study pages with proof blocks

### Motion rules (restraint)
- One “signature” animation per surface.
- Prefer **opacity + translateY** and **timing curves** over bouncy motion.
- Easing: `cubic-bezier(0.19, 1, 0.22, 1)` or similar.

---

## 1) Global Header

### Nav labels
- **Index**
- **Contact**

### Theme toggle label
- Toggles between **Light** / **Dark**.

---

## 2) Home Page (`app/page.tsx`)

### SECTION: HERO

#### Eyebrow
**Systems Architecture**

#### H1 (hero headline)
**GTM Ops**
**& Governed**
**Automation.**

*(Note: “Automation.” is currently accent + italic.)*

#### Hero subhead
**Revenue architecture for the B2B enterprise. Governed instrumentation for high-trust scale.**

#### Stats rail
- **$15M+** — Pipeline Influence
- **300%** — Inbound Growth
- **99%+** — Compliance Accuracy

---

### SECTION: CATALOGUE (Proof Explorer)

#### Section ID
`#catalogue`

#### Left label
**Catalogue**

#### Right label
**Operating Proof**

#### Primary CTA label
**Read Dossier**

*(Note: The project titles + decks come from `content/case-studies.ts`.)*

---

### SECTION: CONTACT

#### Eyebrow
**Availability**

#### H2
**Executive Briefing**

#### Body copy
**Redacted walkthrough of GTM operating blueprints: process maps, KPI dictionaries, and automation logs.**

#### CTA buttons
- **Email** → `mailto:connor.laughlin@gmail.com`
- **LinkedIn** → `linkedin.com/in/connorlaughlin`

---

### FOOTER
- **© 2026 CJL**
- **Architecture of Trust**

---

## 3) Proof Index Page (`app/proof/page.tsx`)

### Eyebrow
**SYSTEMS INVENTORY**

### H1
**The Proof Index.**

### Subhead
**Systems, leadership, and outcomes. Technical catalog of verified GTM instrumentation.**

---

## 4) Case Study Template (`app/case-studies/[slug]/page.tsx`)

### Meta label
**OPERATOR LOG**

### Sections
1. **Label** (e.g., LEADERSHIP / DEMAND GEN / AI DELIVERY)
2. **Title** (from content)
3. **Deck** (from content)
4. Proof blocks (grid)
   - **OUTCOME**
   - **SYSTEM**
   - **STACK**
   - **GOVERNANCE**
5. **SYSTEM SHIPMENTS** (bullets)
6. **OPERATOR NOTE**
7. **DEEP DIVE** (redaction reveal)

### Deep dive default copy
**Redacted artifacts in live briefings: routing trees, KPI dictionaries, reporting packs, and automation logs.**

**Artifact examples: routing logic; KPI dictionaries; AI approval gates; weekly narrative reports.**

---

## 5) Strategy Memo (`app/case-studies/strategy-memo/page.tsx`)

### Meta label
**STRATEGY MEMO**

### Eyebrow
**THE ARCHITECTURE OF TRUST**

### H1
**Governed GTM**

### Subhead
**Narrative discipline, technical instrumentation, and rigorous governance over dashboard theater.**

### Cards
- **THESIS:** Trust is infrastructure, not brand.
- **METHOD:** Define KPIs → Map Routing → Automate → Govern.
- **PROMISE:** Scalability without technical debt.

### Sections
1) **THE PROBLEM: FRAGMENTED SCALE**
2) **THE TRAP: TOOL-FIRST THINKING**
3) **THE PIVOT: SYSTEMS OVER SLOGANS**
4) **THE ENGINE: GOVERNED AUTOMATION**
   - Governance checklist bullets
5) **THE OPERATING SYSTEM: REVENUE-FIRST**

### Closing line
**Public-safe. Redacted artifacts and operating blueprints available via briefing.**

---

## 6) Project Catalogue Copy (per case study)

Source: `content/case-studies.ts`

> Edit these first — they drive the proof explorer + case study pages.

### (AI‑NATIVE GTM) Governed AI GTM Engine
- **Deck:** Human-in-the-loop automation for outbound and RFP workflows.
- **Outcome:** 40% cycle reduction; 99%+ compliance accuracy.
- **System:** RAG-enabled RFP engine utilizing governed knowledge bases.
- **Stack:** n8n • RAG • CRM • GPT-4o
- **Governance:** Mandatory approval gates • full audit logging • model-drift audits
- **Bullets:**
  - RAG-enabled RFP engine utilizing governed knowledge bases.
  - Mandatory 'Approval Gates' for all AI-generated output.
  - Automated enrichment and routing logic mapped to ICP and intent signals.
  - Post-run review loops for prompt refinement and error mitigation.
- **Interview line:** We didn’t ‘add AI.’ We built a governed system that increased throughput while reducing risk.

### (GTM OPS) Revenue Funnel KPI Framework
- **Deck:** Cross-functional KPI architecture and operating cadence for data reconciliation.
- **Outcome:** 300% inbound growth via data-driven allocation; zero reporting gaps.
- **System:** Unified revenue funnel KPI framework from awareness to LTV:CAC.
- **Stack:** GA4 • Salesforce • Pardot • Looker
- **Governance:** Unified KPI dictionary • stage-gate owners • weekly review rhythm
- **Bullets:**
  - Standardized 'MQL' and 'SQL' definitions across Sales, Marketing, and Finance.
  - Revenue Funnel KPI Framework mapped from awareness to LTV:CAC.
  - Weekly 'What Changed?' cadence for root-cause analysis.
  - Full-funnel instrumentation from session to closed-won.
- **Interview line:** We stopped debating the dashboard and started running the business: definitions, owners, and a weekly rhythm.

### (LEADERSHIP) Enterprise Category Rebrand
- **Deck:** Legacy firm repositioning as a tech-enabled revenue recovery partner.
- **Outcome:** 300% inbound increase; unified national brand; 'Strategic Partner' status.
- **System:** Narrative architecture and product naming ecosystem (CollectX, SAGA, PULSE).
- **Stack:** Narrative Architecture • Brand OS • Agency Management
- **Governance:** Executive steering committee • Compliance guardrails • Rollout plan
- **Bullets:**
  - Led transition from 'commodity collections' to 'AI-powered recovery' narrative.
  - Standardized product naming (CollectX, SAGA, PULSE) for cohesive ecosystem alignment.
  - Managed creative and dev vendors through 12-month rebrand lifecycle.
  - Shipped 'Sales-Ready' system: decks, collateral, and talk tracks.
- **Interview line:** We didn't change the logo; we changed the category. We sold a tech-enabled outcome.

### (LEADERSHIP) Enterprise Website Revenue Engines
- **Deck:** Redesign of static sites into performance-governed lead engines.
- **Outcome:** 300% lead growth; 28% organic click lift; zero migration rank loss.
- **System:** Lead engines with governed SEO and GA4 taxonomy.
- **Stack:** WordPress • GA4/GTM • Search Console • HubSpot
- **Governance:** Performance budgets • Redirect mapping • Pre-launch QA checklists
- **Bullets:**
  - Managed full lifecycle rebuild of two enterprise sites: strategy, dev, and content.
  - Optimized conversion paths (CTA hierarchy, form routing) for buyer personas.
  - High-trust tracking instrumentation: GA4 event taxonomy mapped to CRM stages.
  - Governed SEO migration: redirect mapping and search console monitoring.
- **Interview line:** The website is a revenue system. It must be governed and measured like a product.

### (POSITIONING) C‑Suite Narrative Strategy
- **Deck:** Narrative shift to "revenue recovery" focused on brand protection and compliance.
- **Outcome:** Secured enterprise CXO meetings; 'Partner' status acquisition.
- **System:** Outcome-First Messaging Architecture and 'Trust-First' talk tracks.
- **Stack:** Messaging Map • Exec Decks • Sales Playbooks
- **Governance:** Approved language bank • Messaging review loop • Version control
- **Bullets:**
  - Authored 'Outcome-First Messaging Architecture' for the enterprise.
  - Re-indexed company proof points for brand safety and compliance rigor.
  - Equipped Sales with 'Trust-First' talk tracks for risk-averse buyers.
  - Built 'Proof Library' of client-approved metrics and performance indicators.
- **Interview line:** We changed the vocabulary, then built proof so the claim could survive a risk-sensitive buyer.

### (MEASUREMENT) GA4 & Tracking Governance
- **Deck:** Event taxonomy and measurement plan replacing fragmented legacy data.
- **Outcome:** Restored executive reporting trust; 100% form attribution visibility.
- **System:** Enterprise GA4 tracking requirements and standardized GTM naming conventions.
- **Stack:** GA4 • GTM • Looker • Salesforce
- **Governance:** Strict naming conventions • Change-control logs • Data QA audits
- **Bullets:**
  - Developed 'GA4 Tracking Requirements' as the enterprise source of truth.
  - Standardized GTM naming to prevent tag-bloat and data fragmentation.
  - Created dashboards with narrative annotations for root-cause analysis.
  - Governed attribution model ensuring web data integrity in CRM records.
- **Interview line:** The win was governance—the reporting layer became dependable enough to run the business.

### (PARTNERSHIP) SaaS Acquisition GTM Integration
- **Deck:** GTM integration aligning value props, collateral, and attribution for acquisition.
- **Outcome:** Unified GTM roadmap; cross-sell pipeline tracking enabled in 60 days.
- **System:** Joint operating model and referral-tracking architecture.
- **Stack:** Campaign Ops • Content System • Salesforce
- **Governance:** Joint operating committee • SLA definition • Shared KPI dashboard
- **Bullets:**
  - Drafted GTM Strategy to align software (DebtNext) and services (TSI).
  - Developed co-branded collateral suite: sell sheets, decks, and website paths.
  - Architected referral-tracking model for joint sales attribution.
  - Established monthly steering cadence for partnership pipeline health.

### (CONTENT SYSTEM) Content Governance & Performance
- **Deck:** Performance-mapped content system replacing volume-based output.
- **Outcome:** 20% organic engagement lift; 100% sales deck alignment; zero 'rogue' collateral.
- **System:** Governed content repository and asset audit framework.
- **Stack:** Beautiful.ai • SEO Strategy • Centralized Repo
- **Governance:** Governance SOP • Versioning • Mandatory approval workflows

### (DEMAND GEN) High-Intent Acquisition Engine
- **Deck:** Acquisition system focused on high-intent capture over volume.
- **Outcome:** 25% MQL growth; established SLAs improving conversion by 15%.
- **System:** Signal-to-touch architecture with lead scoring and handoff SLAs.
- **Stack:** Pardot • Salesforce • ZoomInfo • LinkedIn
- **Governance:** Lead scoring thresholds • Disqualification codes • SLA audits

### (REV OPS) RFP & Pipeline Governance
- **Deck:** Operating model standardizing opportunity capture and qualification.
- **Outcome:** 100% RFP win/loss visibility; improved forecast accuracy; reduced manual overhead.
- **System:** RFP intake and pipeline operating model with CRM enhancements.
- **Stack:** Salesforce • RFP Tools • Pipeline Framework
- **Governance:** Lead Lifecycle Glossary • Mandatory CRM fields • Adoption audits

### (AI STRATEGY) AI Readiness & Risk Roadmap
- **Deck:** GTM workflow audit to identify leverage points and 'Safe AI' roadmap.
- **Outcome:** Prioritized 5–7 high-ROI use cases; 'No-Secrets' AI policy established.
- **System:** Workflow assessment and risk/ROI mapping for AI implementation.
- **Stack:** Process mapping • AI Guardrails • ROI Analysis
- **Governance:** Security review gates • Data privacy standards • Phased implementation

### (AI DELIVERY) AI Tooling & Enablement
- **Deck:** Phase 1 AI deployment for personalization, analytics, and outreach.
- **Outcome:** 15% efficiency gain; reduced 'shelfware' via structured training.
- **System:** Structured pilot implementation and team enablement framework.
- **Stack:** AI Outreach tools • Content AI • Analytics
- **Governance:** Access control audits • Quality-check cycles • Adoption metrics
