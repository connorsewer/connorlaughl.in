# Case Study: DebtNext SaaS Integration
## Bridging Product-Led Growth and Enterprise Services Sales

**Role:** VP Marketing / GTM Integration Lead  
**Timeline:** 2024–2025  
**Context:** TSI (services) acquired DebtNext (SaaS platform + dPlat software)  
**Challenge:** Integrate two fundamentally different GTM motions without destroying either

---

## The Situation

**TSI (Acquirer)**
- $10B+ annual receivables under management
- 12,000+ employees across 3 continents
- Traditional enterprise services sales: 9-12 month cycles, relationship-driven, high CAC
- No SaaS experience, no subscription revenue model

**DebtNext (Acquired)**
- Recovery management SaaS platform with dPlat software
- Self-serve trials, product-led onboarding, usage-based tiers
- $500-$2K/month subscription pricing
- PQL-driven sales motion, 30-60 day average sales cycle

**The Integration Challenge:**
TSI leadership wanted to "leverage the DebtNext platform" to drive services growth—but the two organizations spoke different languages. Services reps didn't understand subscription economics. SaaS reps couldn't navigate enterprise procurement. The risk was destroying DebtNext's efficient PLG motion while failing to generate meaningful services cross-sell.

---

## The Strategy

I designed and executed a **three-tier hybrid GTM architecture**:

1. **Preserve the PLG motion** (don't fix what isn't broken)
2. **Build a sales-assisted bridge** (dedicated function, distinct skills)
3. **Services as expansion** (product usage → services opportunity)

---

## What I Built

### 1. The PQL Scoring System

**Problem:** DebtNext had product data but no systematic way to identify expansion-ready accounts.

**Solution:** I built a weighted PQL (Product Qualified Lead) scoring model:

| Signal | Weight | Threshold |
|--------|--------|-----------|
| Team expansion (3+ users) | 20 | Score >70 = |
| Integration depth (2+ data sources) | 25 | Sales-assist touch |
| Campaign activity (5+ created) | 20 | |
| Premium feature interest | 15 | |
| Volume milestones (1000+ accounts) | 20 | |

**Impact:** Sales-assist reps could prioritize 40 accounts/week instead of blind outreach to 400.

### 2. The Sales-Assisted Function

**Problem:** Traditional TSI reps were too heavy-handed for SaaS prospects; DebtNext team couldn't navigate enterprise complexity.

**Solution:** Created a dedicated "SaaS Success" team—4 specialists trained in:
- Product analytics interpretation
- Consultative expansion (not feature dumping)
- Multi-threading (end-user + economic buyer)
- SaaS metrics language (activation, NRR, LTV/CAC)

**Key Design Decisions:**
- Comp: 50% base + 50% variable tied to NRR (not just bookings)
- Quota: 110% NRR target, not just new logo count
- Tools: Product analytics dashboard (Mixpanel), CRM (Salesforce), health scoring

### 3. The Cross-Sell Playbook

**Problem:** TSI ARM reps didn't know how to identify opportunities in DebtNext accounts.

**Solution:** Built explicit plays with automated triggers:

**Play 1: The Yield Gap Analysis**
- Trigger: DebtNext client with >3 vendors and >15% performance variance
- Action: SaaS Success Manager presents native benchmark report
- Pitch: "You see the gap—let us prove we can close it"
- Offer: 90-day pilot, 20% contingency only

**Play 2: The Multi-Location Expansion**
- Trigger: Single location active, company has 3+ locations
- Action: Expansion conversation (not upsell positioning)
- Pitch: "Your team here is seeing results—let's roll out regionally"

**Play 3: The Digital-First Upgrade**
- Trigger: High-volume Essential tier client approaching limits
- Action: Sales-assist call positioning Nexie AI + Professional tier
- Pitch: "You're growing into the features your competitors use"

### 4. The Health Score Framework

**Problem:** No unified view of customer health across product and services.

**Solution:** Built a composite health score:

| Factor | Weight | Source |
|--------|--------|--------|
| Product engagement | 30% | DebtNext analytics |
| Feature adoption | 20% | Nexie AI, DME usage |
| Support trend | 15% | Zendesk |
| Satisfaction | 15% | NPS/CSAT |
| Services performance | 10% | Recovery rates (if TSI ARM) |
| Expansion pipeline | 10% | Salesforce |

**Health Score Actions:**
- 80-100 (Green): Expansion opportunity → AE alert
- 60-79 (Yellow): Intervention → SSM playbook
- <60 (Red): Churn risk → Executive escalation

### 5. The Rep Retraining Program

**Problem:** Services reps thought in deals and quarters; SaaS requires cohorts and retention.

**Solution:** 6-week retraining curriculum:

**Weeks 1-2: SaaS Economics**
- CAC, LTV, NRR, churn deep-dives
- Case study: Why 110% NRR = 2x valuation multiple
- Homework: Calculate DebtNext unit economics from real data

**Weeks 3-4: Product-Led Sales**
- PQL interpretation and timing
- Sales-assist vs. traditional sales (roleplay)
- Using product data in discovery

**Weeks 5-6: Cross-Sell Orchestration**
- DebtNext → TSI ARM positioning
- Commission structure and collaboration
- Pipeline management across motions

---

## The Results

### Sales Efficiency

| Metric | Before Integration | After 12 Months | Change |
|--------|-------------------|-----------------|--------|
| Average CAC | $45K (pure services) | $12K (hybrid) | **-73%** |
| Sales cycle (new logo) | 9-12 months | 30 days (land) | **-90%** |
| Sales cycle (expansion) | N/A | 6-9 months | New capability |
| Product-qualified leads/month | 0 | 120+ | New capability |

### Revenue Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Net Revenue Retention (NRR) | 110% | **112%** |
| Gross Revenue Retention | 95% | **96%** |
| Cross-sell pilot conversion | 30% | **42%** |
| Sales-assist ACV | $75K | **$82K** |

### Cross-Sell Success

- **DebtNext → TSI ARM:** 18 pilots in first year, 42% conversion to contracted services
- **Average services expansion:** $180K ARR per converted pilot
- **Services CAC via product:** $8K (vs. $45K cold outbound)

### Team Metrics

- **Sales-Assist team ramp time:** 6 weeks (vs. 6 months for enterprise reps)
- **Rep productivity:** 12 qualified expansion opps/month (vs. 3 for traditional reps)
- **Collaboration score:** 85% of SaaS deals included services conversation (vs. 15% pre-integration)

---

## Key Artifacts

### 1. The Integration Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    HYBRID GTM ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   LAND                    ADOPT                    EXPAND        │
│  ┌──────────┐           ┌──────────┐            ┌──────────┐    │
│  │ PLG      │──────────▶│ Sales-   │────────────│ Services │    │
│  │ Self-    │  PQL      │ Assisted │  Health    │ (TSI     │    │
│  │ Serve    │  Score    │ Success  │  Score     │ ARM)     │    │
│  └──────────┘  >70      └──────────┘  >80       └──────────┘    │
│       │                      │                      │           │
│   $500-$2K              $50K-$200K              $200K+          │
│   Subscription          Subscription            Services        │
│                                                                  │
│  ─────────────────────────────────────────────────────────────   │
│  Unified Health Score • Shared NRR Target • Split Comp           │
└─────────────────────────────────────────────────────────────────┘
```

### 2. The PQL Dashboard

Built real-time PQL dashboard showing:
- Daily PQL score changes by account
- Historical conversion rates by score band
- Recommended next action per account
- SSM assignment and activity tracking

### 3. The Cross-Sell Trigger Matrix

Automated alert system mapping product signals to services plays:

| Product Signal | Alert Recipient | Suggested Action | SLA |
|----------------|-----------------|------------------|-----|
| Vendor yield <benchmark | AE + SSM | Schedule yield review | 48 hrs |
| Response time >72 hrs | AE | Managed services pitch | 1 week |
| Legal accounts >500 | Legal services | Email campaign | 24 hrs |
| Multi-location detected | Account team | Expansion plan | 2 weeks |

### 4. The Rep Training Certification

Created "SaaS Success Certification" requiring:
- Completion of 6-week curriculum
- Passing score on SaaS metrics exam
- 3 shadowed sales-assist calls
- 2 successful PQL conversions

---

## Governance & Operating Cadence

### Weekly: PQL Review
- Review new PQLs scored >70
- Assign SSMs and set touch SLAs
- Review previous week conversion rates

### Bi-Weekly: Health Score Review
- Review accounts with health score changes
- Align on green/yellow/red actions
- Escalate at-risk accounts

### Monthly: Cross-Sell Pipeline
- Review expansion pipeline by account
- Assess cross-sell play effectiveness
- Adjust triggers and messaging

### Quarterly: NRR Review
- Deep-dive on NRR by cohort
- Analyze churn reasons and expansion patterns
- Adjust compensation and targeting

---

## What I Learned

### Success Factors

1. **Specialization beats generalization.** Trying to train all TSI reps on SaaS failed; dedicated SaaS Success team won.

2. **Product data is the best lead source.** DebtNext usage signals generated higher-quality services leads than any marketing campaign.

3. **Comp alignment is everything.** Until we tied SaaS and services comp to shared NRR, teams competed instead of collaborated.

4. **Health scoring enables proactive success.** Moving from reactive support to proactive intervention improved retention 8 points.

### Challenges Overcome

1. **Cultural resistance.** Services reps initially dismissed "small" SaaS deals. Seeing NRR compound changed minds.

2. **Tool integration.** DebtNext analytics didn't natively integrate with Salesforce. Built custom middleware to sync PQL scores.

3. **Pricing confusion.** Early bundling created margin erosion. Moved to clear tiering with explicit cross-sell modules.

---

## The Interview Line

> "When TSI acquired DebtNext, I led the GTM integration—merging a product-led SaaS platform with enterprise services sales. I built a three-tier hybrid architecture: PLG for land, sales-assisted for adoption, and services for expansion. Results: 73% CAC reduction, 112% NRR, and 18 services pilots with 42% conversion. The key was treating the integration as architecture, not just training—dedicated teams, explicit handoffs, and unified metrics."

---

## Artifacts for Deep Dive

1. PQL Scoring Model & Weighting Framework
2. Sales-Assist Playbook (call scripts, objection handling)
3. Cross-Sell Trigger Matrix
4. Customer Health Score Dashboard
5. Rep Retraining Curriculum (6-week program)
6. Compensation Plan (SaaS + Services alignment)
7. Weekly Operating Cadence Templates

**Tags:** #SaaSIntegration #DebtNext #PLG #GTMStrategy #CrossSell #SalesAssisted #NRR