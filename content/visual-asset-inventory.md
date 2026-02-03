# Visual Asset Inventory

**Project:** Portfolio v2 — TSI Metrics & Proof Assets  
**Source:** `/Users/connorlaughlin/clawd/career/portfolio-assets/tsi-metrics/Screenshots/`  
**Generated:** 2026-02-02  
**Total Assets:** 5 screenshots  

---

## Hero-Worthy Assets (Priority 1)

### 1. Salesforce Prospect Database — 32K Records
| Attribute | Value |
|-----------|-------|
| **File** | `{7FD1D5AB-F170-453B-B7B0-C81CA45DEB0A}.png` |
| **Hero Ranking** | #1 — Primary Hero |
| **Display Recommendation** | Full-width hero with overlay text |
| **Rationale** | Large number (32K) creates immediate impact. Shows scale of demand gen operations. |

**Alt Text:**
```
Salesforce dashboard showing 32,000 prospect records with enriched data fields, 
demonstrating the scale of TSI's demand generation operations and database management capabilities.
```

**Caption:**
> **32,000 enriched prospects** managed in Salesforce — from Apollo enrichment to sales-ready handoff. This is what scaled B2B demand gen looks like.

**Technical Specs:**
- Resolution: ~155KB PNG
- Aspect Ratio: Landscape (optimal for 16:9 hero containers)
- Recommended Treatment: Slight dark overlay (rgba(0,0,0,0.4)) with white text for contrast

---

## Supporting Proof Assets (Priority 2)

### 2. Apollo Lead Gen Dashboard
| Attribute | Value |
|-----------|-------|
| **File** | `{33456B58-7487-4911-B918-A4B798B12529}.png` |
| **Hero Ranking** | #2 — Secondary Hero / Carousel Lead |
| **Display Recommendation** | Inline proof block or carousel item |
| **Rationale** | Shows the source of prospect data. Apollo is recognizable to marketing ops professionals. |

**Alt Text:**
```
Apollo.io lead generation dashboard showing prospect sourcing metrics, 
email sequences, and enrichment data for B2B outreach campaigns.
```

**Caption:**
> Sourced and enriched **32K+ prospects** via Apollo — validated emails, direct dials, and intent signals.

**Display Context:** 
- Use as second slide in hero carousel
- Or: Inline "behind the scenes" section showing the sourcing engine

---

### 3. HubSpot Pipeline Growth
| Attribute | Value |
|-----------|-------|
| **File** | `{3C777BDD-7394-4BB7-8EB4-6CD86995B416}.png` |
| **Hero Ranking** | #3 — Process Proof |
| **Display Recommendation** | Inline accordion or side-by-side comparison |
| **Rationale** | Shows pipeline velocity and conversion — the "so what" behind the 32K prospects. |

**Alt Text:**
```
HubSpot CRM dashboard displaying sales pipeline growth, deal stages, 
and revenue progression from marketing-qualified leads.
```

**Caption:**
> Pipeline impact: **$X.XM** in qualified opportunities generated from outbound sequences.

**Display Context:**
- Pair with Salesforce hero to show "before/after" (prospect → pipeline)
- Use in expandable proof section

---

### 4. LinkedIn Campaign Metrics
| Attribute | Value |
|-----------|-------|
| **File** | `{5336693E-B2EB-437F-801D-740CB0CB33C6}.png` |
| **Hero Ranking** | #4 — Channel Proof |
| **Display Recommendation** | Inline grid of channel results |
| **Rationale** | Shows paid social competency. LinkedIn is high-value B2B channel. |

**Alt Text:**
```
LinkedIn Campaign Manager dashboard showing sponsored content performance, 
engagement rates, cost per lead, and audience targeting metrics.
```

**Caption:**
> LinkedIn demand gen: **X% lower CPL** than industry benchmark, **X% lead-to-SQL conversion**.

**Display Context:**
- Grid item in "Channel Expertise" section
- Tooltip or lightbox expansion for detailed metrics

---

### 5. GA4 + Search Console Traffic Analytics
| Attribute | Value |
|-----------|-------|
| **File** | `{F2B39709-7D8B-4FB4-ADC8-C577AE9CF191}.png` |
| **Hero Ranking** | #5 — Organic Growth Proof |
| **Display Recommendation** | Inline proof or case study inset |
| **Rationale** | Shows organic/inbound capability alongside outbound. 498K impressions is strong. |

**Alt Text:**
```
Google Analytics 4 dashboard integrated with Search Console data showing 
498,000 search impressions with 23.2% month-over-month growth.
```

**Caption:**
> Organic growth engine: **498K search impressions** (+23.2% MoM) driving inbound pipeline alongside outbound.

**Display Context:**
- Final carousel slide showing "full-funnel" capability
- Case study page inset

---

## Asset Display Matrix

| Asset | Hero | Carousel | Inline | Lightbox | Download |
|-------|:----:|:--------:|:------:|:--------:|:--------:|
| Salesforce 32K | ✅ | ✅ | ✅ | — | — |
| Apollo Lead Gen | — | ✅ | ✅ | ✅ | — |
| HubSpot Pipeline | — | ✅ | ✅ | ✅ | — |
| LinkedIn Campaigns | — | ✅ | ✅ | ✅ | — |
| GA4 Analytics | — | ✅ | ✅ | — | — |

---

## Optimization Recommendations

### Image Compression
- Current: 100-155KB PNGs
- Recommended: WebP format, 60-80KB target
- Retina support: Serve 2x versions for high-DPI displays

### Lazy Loading
- Hero image: Eager load (above fold)
- Carousel items: Native lazy load with priority on first 2 slides
- Inline proofs: IntersectionObserver lazy load

### Accessibility
- All images have descriptive alt text (see above)
- Captions visible by default, not just on hover
- Keyboard-navigable carousel with pause control

### Performance Budget
- Hero image: <100KB (compressed WebP)
- Carousel images: <60KB each
- Total visual payload for /work page: <400KB initial, <800KB total

---

## Gaps to Fill (Drive Search Results)

*Drive search not available during generation — manual follow-up needed*

Search terms to use in Google Drive:
- `"dashboard" type:pdf OR type:presentation`
- `"TSI" "metrics" OR "results"`
- `"Q1" OR "Q2" OR "Q3" OR "Q4" "report"`
- `"Loom" OR "video" owner:me`

Priority targets:
1. **Presentation decks** → Convert to downloadable PDFs for case studies
2. **Video walkthroughs** → Embed Loom links in case study pages
3. **Additional dashboards** → Look for Zoho CRM, additional GA4 reports
4. **Before/after comparisons** → Any screenshots showing transformation

---

## File Naming Convention (Future Assets)

Rename GUID files to semantic names:
```
{7FD1D5AB-F170-453B-B7B0-C81CA45DEB0A}.png → salesforce-32k-prospects-hero.png
{33456B58-7487-4911-B918-A4B798B12529}.png → apollo-lead-gen-dashboard.png
{3C777BDD-7394-4BB7-8EB4-6CD86995B416}.png → hubspot-pipeline-growth.png
{5336693E-B2EB-437F-801D-740CB0CB33C6}.png → linkedin-campaign-metrics.png
{F2B39709-7D8B-4FB4-ADC8-C577AE9CF191}.png → ga4-search-console-traffic.png
```

---

*Last updated: 2026-02-02*
