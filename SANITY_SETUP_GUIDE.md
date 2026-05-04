# Sanity CMS Content Checklist for connorlaughl.in

## ✅ Required Documents

### 1. Hero Content (Document Type: `heroContent`)
Create ONE document with these fields:

| Field | Content to Enter | Example |
|-------|-----------------|---------|
| `headline` | Main headline | "I build revenue systems that actually work." |
| `subheadline` | Supporting text | "Not decks. Not theory. Operating proof: $15M+ influenced pipeline..." |
| `tagline` | Top line | "VP Marketing @ TSI • GTM Systems Architect" |
| `stats` | Array of 4 stats | See below |
| `primaryCTA.text` | Button text | "See Operating Proof →" |
| `primaryCTA.link` | Button URL | "/case-studies" |
| `secondaryCTA.text` | 2nd button | "By The Numbers" |
| `secondaryCTA.link` | 2nd URL | "#proof" |

**Stats Array (4 items):**
1. Value: "$15M+" | Label: "Influenced Pipeline"
2. Value: "300%" | Label: "Inbound Growth"
3. Value: "40-60" | Label: "Meetings/Month"
4. Value: "2hr" | Label: "Signal-to-Meeting SLA"

---

### 2. Proof Points (Document Type: `proofPoint`)  
Create FOUR documents:

**Proof Point 1: BDR Pod Transformation**
- Title: "BDR Pod Transformation"
- Metric: "212% pipeline growth"
- Description: "Scaled from 1 to 4 signal-driven squads with 2-hour SLA"
- Order: 1

**Proof Point 2: Outcome-First Repositioning**
- Title: "Outcome-First Repositioning"
- Metric: "10% payment lift"
- Description: "Repositioned 6 business units from service to outcome language"
- Order: 2

**Proof Point 3: AI-Native GTM Engine**
- Title: "AI-Native GTM Engine"
- Metric: "40% cycle reduction"
- Description: "Governed RFP automation with 99%+ compliance accuracy"
- Order: 3

**Proof Point 4: Two-Function Marketing**
- Title: "Two-Function Marketing"
- Metric: "200+/yr output"
- Description: "7-day brief-to-ship SLA with governed workflow"
- Order: 4

---

### 3. Services (Document Type: `service`)
Create THREE documents:

**Service 1: GTM Systems Architecture**
- Title: "GTM Systems Architecture"
- Description: "Design and implement revenue systems: attribution, routing, SLAs, and the governance that keeps them honest."
- Order: 1

**Service 2: AI-Native Operations**
- Title: "AI-Native Operations"
- Description: "Deploy governed AI workflows for RFPs, outreach, and content—human-in-the-loop with full audit trails."
- Order: 2

**Service 3: Org Design & Execution**
- Title: "Org Design & Execution"
- Description: "Restructure teams with clear lanes, enforced SLAs, and output accountability. Marketing as product."
- Order: 3

---

### 4. Case Studies (Document Type: `caseStudy`)
Create as needed - minimum ONE to test the archive section:

**Required fields:**
- `title`: Case study name
- `slug`: URL-friendly slug (e.g., "bdr-transformation")
- `label`: Category (e.g., "Demand Gen")
- `deck`: Short description
- `outcome`: Key metric (e.g., "212% pipeline growth")
- `featured`: true (to show on homepage)
- `order`: 1 (display order)

**Optional but recommended:**
- `scope`: Array of tags (e.g., ["BDR", "GTM", "AI"])
- `stack`: Array of tools (e.g., ["Salesforce", "HubSpot", "n8n"])

---

## 🎯 Quick Start

1. Go to https://connor-laughlin-cms.sanity.studio
2. Click "Hero Content" → Create new document
3. Fill in all fields above
4. Publish
5. Refresh connorlaughl.in (may take up to 60s due to revalidate)
6. Repeat for Proof Points and Services

## ⚠️ Notes

- Site uses `revalidate = 60` (1 minute cache)
- If content doesn't appear, check: 1) Published status, 2) Wait 60s, 3) Redeploy if needed
- All fields have fallbacks - site won't break if empty