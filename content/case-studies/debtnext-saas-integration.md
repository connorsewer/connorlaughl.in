# Case study: integrating an acquired SaaS platform
## Bridging product-led growth and enterprise services sales

**Role:** VP of Marketing & GTM (acting CMO)  
**Timeline:** 2024 to 2025  
**Context:** A PE-backed enterprise services business acquired a SaaS platform  
**Challenge:** Integrate two fundamentally different go-to-market motions without destroying either

---

## The situation

**The acquirer**
- An enterprise with receivables under management at national scale
- A workforce in the thousands, across three continents
- Traditional enterprise services sales: nine to twelve month cycles, relationship-driven, expensive to acquire a customer
- No SaaS experience and no subscription revenue model

**The acquired SaaS platform**
- A recovery management platform with its own software layer
- Self-serve trials, product-led onboarding, usage-based tiers
- Subscription pricing at a monthly price point a department could approve
- A PQL-driven sales motion with a cycle measured in weeks rather than quarters

**The integration challenge:**
Leadership wanted to use the platform to drive services growth, and the two organizations spoke different languages. Services reps did not understand subscription economics. SaaS reps could not navigate enterprise procurement. The risk was breaking the platform's efficient product-led motion while failing to generate meaningful services cross-sell.

---

## The strategy

I designed and executed a hybrid GTM architecture in three tiers.

The product-led motion was working, so I left it alone. On top of it I built a sales-assisted bridge, staffed as its own function because the skills it needed were not the skills the services reps had. Services then became the expansion tier, entered off product usage rather than off a cold conversation.

---

## What I built

### 1. The PQL scoring system

**Problem:** the platform had product data but no systematic way to identify expansion-ready accounts.

**Solution:** I built a weighted product-qualified lead scoring model:

| Signal | Weight | What it triggered |
|--------|--------|-------------------|
| Team expansion beyond a single user | High | Accounts above the score threshold |
| Integration depth across data sources | Highest | got a sales-assist touch |
| Campaign activity in the product | High | |
| Premium feature interest | Moderate | |
| Volume milestones | High | |

**Impact:** sales-assist reps worked a short, ranked list every week instead of blind outreach across the whole book.

### 2. The sales-assisted function

**Problem:** the acquirer's reps were too heavy-handed for SaaS prospects, and the platform team could not navigate enterprise complexity.

**Solution:** I created a dedicated SaaS Success team, a small group of specialists trained in:
- Product analytics interpretation
- Consultative expansion rather than feature dumping
- Multi-threading across the end user and the economic buyer
- SaaS metrics language: activation, NRR, LTV/CAC

**Key design decisions:**
- Comp split evenly between base and variable, with the variable tied to net revenue retention rather than bookings alone
- Quota set on a net revenue retention target rather than new logo count
- Tools: a product analytics dashboard, the CRM, and health scoring on top of both

### 3. The cross-sell playbook

**Problem:** the collections reps did not know how to identify opportunities inside platform accounts.

**Solution:** I built explicit plays with automated triggers.

**Play 1: the yield gap analysis**
- Trigger: a platform client running several vendors with wide performance variance between them
- Action: the SaaS Success Manager presents the native benchmark report
- Pitch: "You see the gap. Let us prove we can close it."
- Offer: a 90-day pilot on contingency

**Play 2: the multi-location expansion**
- Trigger: a single location active at a company with several locations
- Action: an expansion conversation rather than upsell positioning
- Pitch: "Your team here is seeing results. Let's roll out regionally."

**Play 3: the digital-first upgrade**
- Trigger: a high-volume entry-tier client approaching its limits
- Action: a sales-assist call positioning the AI module and the professional tier
- Pitch: "You're growing into the features your competitors use."

### 4. The health score framework

**Problem:** there was no unified view of customer health across product and services.

**Solution:** I built a composite health score.

| Factor | Weight | Source |
|--------|--------|--------|
| Product engagement | Heaviest | Platform analytics |
| Feature adoption | Heavy | AI and data module usage |
| Support trend | Moderate | The support desk |
| Satisfaction | Moderate | NPS/CSAT |
| Services performance | Light | Recovery rates, where services were engaged |
| Expansion pipeline | Light | The CRM |

Accounts in the top band were flagged to the AE as an expansion opportunity. Accounts in the middle band went to the SSM playbook for intervention. Accounts in the bottom band were treated as churn risk and escalated to an executive.

### 5. The rep retraining program

**Problem:** services reps thought in deals and quarters, and SaaS requires cohorts and retention.

**Solution:** a six-week retraining curriculum.

**Weeks 1-2: SaaS economics**
- CAC, LTV, NRR, and churn deep-dives
- Case study: why expansion revenue moves the valuation multiple
- Homework: calculate the platform's unit economics from real data

**Weeks 3-4: product-led sales**
- PQL interpretation and timing
- Sales-assist versus traditional sales, by roleplay
- Using product data in discovery

**Weeks 5-6: cross-sell orchestration**
- Positioning the platform into the collections business
- Commission structure and collaboration
- Pipeline management across motions

---

## The results

### Sales efficiency

| Metric | Before integration | After the first year |
|--------|--------------------|----------------------|
| Customer acquisition cost | Pure services economics | A material reduction under the hybrid motion |
| Sales cycle, new logo | Nine to twelve months | Weeks to land |
| Sales cycle, expansion | No motion existed | Two to three quarters, a new capability |
| Product-qualified leads | None | A steady monthly flow, a new capability |

### Revenue metrics

| Metric | Result against target |
|--------|-----------------------|
| Net revenue retention | Above target, with expansion outrunning churn |
| Gross revenue retention | Held above the retention floor the plan set |
| Cross-sell pilot conversion | Converted at a better rate than the pilot plan assumed |
| Sales-assist ACV | Average deal came in larger than the sales-assist model assumed |

### Cross-sell success

The platform fed a real pilot pipeline into the collections business in the first year, and a healthy share of those pilots converted to contracted services. Each converted pilot carried meaningful recurring services revenue, and acquiring those clients through the product cost a fraction of what cold outbound cost.

### Team metrics

The sales-assist team ramped in weeks where enterprise reps took months. Rep productivity on qualified expansion opportunities ran several times what a traditional rep produced. Most SaaS deals came to include a services conversation, against almost none before the integration.

---

## Key artifacts

### 1. The integration architecture diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    HYBRID GTM ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   LAND                    ADOPT                    EXPAND       │
│  ┌──────────┐           ┌──────────┐            ┌──────────┐    │
│  │ PLG      │──────────▶│ Sales-   │───────────▶│ Services │    │
│  │ Self-    │  PQL      │ Assisted │  Health    │ (the     │    │
│  │ Serve    │  Score    │ Success  │  Score     │ company) │    │
│  └──────────┘           └──────────┘            └──────────┘    │
│       │                      │                      │           │
│  Subscription           Subscription            Services        │
│  entry tier             expansion tier          engagement      │
│                                                                 │
│  ────────────────────────────────────────────────────────────   │
│  Unified health score • Shared NRR target • Split comp          │
└─────────────────────────────────────────────────────────────────┘
```

### 2. The PQL dashboard

I built a real-time PQL dashboard showing daily score changes by account, historical conversion rates by score band, the recommended next action per account, and SSM assignment and activity tracking.

### 3. The cross-sell trigger matrix

An automated alert system mapping product signals to services plays:

| Product signal | Alert recipient | Suggested action | SLA |
|----------------|-----------------|------------------|-----|
| Vendor yield below benchmark | AE + SSM | Schedule yield review | 48 hrs |
| Response time above threshold | AE | Managed services pitch | 1 week |
| Legal account volume spike | Legal services | Email campaign | 24 hrs |
| Multi-location detected | Account team | Expansion plan | 2 weeks |

### 4. The rep training certification

I created a SaaS Success certification requiring completion of the six-week curriculum, a passing score on the SaaS metrics exam, shadowed sales-assist calls, and documented PQL conversions.

---

## Governance and operating cadence

### Weekly: PQL review
- Review new PQLs above the score threshold
- Assign SSMs and set touch SLAs
- Review the previous week's conversion rates

### Bi-weekly: health score review
- Review accounts with health score changes
- Align on green, yellow, and red actions
- Escalate at-risk accounts

### Monthly: cross-sell pipeline
- Review the expansion pipeline by account
- Assess cross-sell play effectiveness
- Adjust triggers and messaging

### Quarterly: NRR review
- Deep-dive on net revenue retention by cohort
- Analyze churn reasons and expansion patterns
- Adjust compensation and targeting

---

## What I learned

### What worked

Training every services rep on SaaS failed. The dedicated SaaS Success team worked.

Platform usage signals produced better services leads than any campaign we ran, and the two teams only stopped competing once their comp pointed at the same net revenue retention number.

Moving from reactive support to proactive intervention is what made health scoring worth building.

### What went wrong

Services reps dismissed the small SaaS deals for the first few months. Watching retention compound changed their minds.

The platform's analytics had no native path into the CRM, so we built custom middleware to sync PQL scores.

Early bundling eroded margin. We moved to clear tiering with explicit cross-sell modules.

---

## The interview line

> "When the company acquired the SaaS platform, I led the go-to-market integration, merging a product-led platform with enterprise services sales. I built a three-tier hybrid architecture: product-led for land, sales-assisted for adoption, services for expansion. Acquisition cost came down materially, retention landed above target, and the cross-sell pilots converted at a rate that beat the plan. The key was treating the integration as architecture: dedicated teams, explicit handoffs, unified metrics."

---

## Artifacts for deep dive

1. PQL scoring model and weighting framework
2. Sales-assist playbook (call scripts, objection handling)
3. Cross-sell trigger matrix
4. Customer health score dashboard
5. Rep retraining curriculum (six-week program)
6. Compensation plan (SaaS and services alignment)
7. Weekly operating cadence templates

**Tags:** #SaaSIntegration #PLG #GTMStrategy #CrossSell #SalesAssisted #NRR
