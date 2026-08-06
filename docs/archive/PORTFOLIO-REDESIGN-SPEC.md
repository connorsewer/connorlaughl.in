# ConnorLaughl.in — Complete Portfolio Redesign

**Vision:** The single most impressive VP/GTM executive portfolio on the internet  
**Domain:** connorlaughl.in (GoDaddy → Vercel)  
**Aesthetic:** Luxury editorial + cutting-edge interactivity  
**Goal:** "Impress the shit out of someone" ✓

---

## Architecture

```
connorlaughl.in/
├── /                    ← Hero + Navigation
├── /about               ← Full bio, philosophy, approach
├── /work                ← Interactive case studies (the proof)
├── /services            ← Fractional CMO offering
├── /intel               ← Research, insights, thinking
├── /contact             ← Calendly + direct contact
└── /deck                ← Downloadable executive summary
```

---

## Content Strategy (Leverage What Exists)

### From Google Drive
| Source | How to Use |
|--------|-----------|
| TSI Marketing assets | Anonymized case studies with metrics |
| Strategy docs | Downloadable frameworks |
| Reports & analysis | Proof of analytical depth |
| Presentations | Embedded decks |

### From Local Files
| Source | How to Use |
|--------|-----------|
| `career/portfolio/case-studies/` | Primary content |
| `tsi-leadgen/reports/` | Data proof points |
| `ops/research/` | Thought leadership |
| `career/intel/` | Market research showcase |

### Generated Content
- **BDR Pod case study** → Interactive dashboard
- **Outcome-First repositioning** → Before/after comparison
- **GA4 governance** → Technical architecture diagram
- **Marketing Org Design** → Org chart + governance model

---

## Design System

### Visual Language
```
Mode: Dark-first (with light toggle)
Background: #0a0a0b (ink)
Text: #f5f2ed (paper)
Muted: #8a8680 (paper-muted)
Accent: #c4a77d (sandy rattan)
Rule: #d4d0c8 (hairline)

Typography:
- Display: Instrument Serif (elegant, editorial)
- Body: IBM Plex Sans (modern, technical)
- Mono: IBM Plex Mono (data, metadata)
```

### Motion Principles
- **Signature animation per page** (not generic)
- **Scroll-triggered reveals** (content appears as you scroll)
- **Hover micro-interactions** (subtle, not bouncy)
- **Page transitions** (smooth, cinematic)
- **Data animations** (numbers count up, charts draw)

### Interaction Patterns
- **Magnetic buttons** (cursor attraction)
- **Parallax depth** (layers move at different speeds)
- **Cursor tracking** (subtle spotlight effect)
- **Scroll hijacking** (controlled, purposeful)

---

## Page Specifications

### 1. Home (Hero)
**Concept:** Cinematic entrance

**Elements:**
- Full-screen animated gradient (subtle, ink → deep blue)
- Typing headline: "I build GTM systems for AI-native companies"
- Stats that animate on load (count up)
- Navigation appears on scroll
- Single CTA: "Explore my work" or "Work with me"

**Animation:**
- Page load: Fade in from black
- Headline: Character-by-character reveal
- Stats: Count up from 0
- CTA: Magnetic hover effect

### 2. About
**Concept:** Dossier/profile

**Elements:**
- Split layout: Image left, content right
- "At a glance" stats
- Philosophy section
- What energizes/drains (from our interview)
- Liverpool FC integration (personal touch)
- Timeline of career

**Animation:**
- Scroll: Content reveals in columns
- Stats: Counter animation
- Timeline: Horizontal scroll or vertical with sticky dates

### 3. Work (The Proof)
**Concept:** Museum gallery meets dashboard

**Elements:**
- Filterable case study grid
- Each case study:
  - Hero image/video
  - Challenge → Solution → Outcome
  - Interactive metrics
  - Embedded artifacts (decks, docs)
  - Download PDF option

**Case Studies to Feature:**
1. **BDR Pod: Signal-to-Meeting**
   - Interactive: Before/after pipeline
   - Metrics: 40-60 meetings/month
   - Artifact: Process diagram

2. **Outcome-First Repositioning**
   - Interactive: Message matrix
   - Metrics: 6 LOBs repositioned
   - Artifact: Framework download

3. **Marketing Org Design**
   - Interactive: Org chart
   - Metrics: 26 press releases/year, 4+ posts/week
   - Artifact: Governance template

4. **GA4 Governance**
   - Interactive: Tracking architecture
   - Metrics: B2B vs consumer segregation
   - Artifact: Requirements doc

5. **AI Operating System**
   - Interactive: System diagram
   - Metrics: 24.5 hrs/week saved
   - Artifact: Demo video

**Animation:**
- Grid: Masonry layout with hover expansion
- Case studies: Full-screen takeover on click
- Metrics: Real-time counter animations
- Artifacts: Preview on hover, download on click

### 4. Services (Fractional CMO)
**Concept:** Premium offering page

**Elements:**
- Problem statement (why they need you)
- Service tiers (Advisory/Execution/Transformation)
- Process diagram (how you work)
- Proof points (results from Work page)
- Pricing (transparent)
- FAQ (objection handling)
- Calendly integration

**Animation:**
- Tiers: Cards that lift on hover
- Process: Step-by-step reveal
- Pricing: Highlight recommended tier

### 5. Intel
**Concept:** Thought leadership hub

**Elements:**
- Articles/research
- Market analysis
- Tools/frameworks (downloadable)
- Reading list
- Speaking/presentations

**Animation:**
- List: Staggered reveal
- Hover: Preview expansion

### 6. Contact
**Concept:** Direct connection

**Elements:**
- Calendly embed (primary)
- Email (secondary)
- LinkedIn/Twitter
- Location (Chicago)
- Response time promise

### 7. Deck
**Concept:** Executive summary PDF

**Elements:**
- One-page downloadable
- Key stats
- Service overview
- Contact info

---

## Technical Stack

```
Framework: Next.js 14 (App Router)
Styling: Tailwind CSS + custom CSS variables
Animation: Framer Motion + GSAP
Deployment: Vercel
Domain: connorlaughl.in (GoDaddy → Vercel)
CMS: None (static) or Sanity (if we want CMS)
Analytics: Vercel Analytics + Plausible
```

## Build Phases

### Phase 1: Foundation (This Week)
- [ ] Set up Next.js project
- [ ] Configure domain (GoDaddy → Vercel)
- [ ] Build design system (tokens, components)
- [ ] Create layout + navigation

### Phase 2: Core Pages (Next Week)
- [ ] Home (hero)
- [ ] About (dossier)
- [ ] Work (case studies)
- [ ] Services (offering)

### Phase 3: Polish (Week 3)
- [ ] Animations + interactions
- [ ] Content population
- [ ] Google Drive integration (downloadables)
- [ ] Performance optimization

### Phase 4: Launch (Week 4)
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Soft launch
- [ ] LinkedIn announcement

---

## Competitive Differentiation

### What Makes This Special

1. **Not a template** — Custom-built, unique interactions
2. **Proof-first** — Case studies with real metrics, not buzzwords
3. **Interactive** — Visitors explore, not just read
4. **Personal** — Liverpool FC, philosophy, what energizes you
5. **Technical** — Shows you can build, not just strategize
6. **Live systems** — Actual demos of your AI operating system

### Inspiration
- **Apple:** Cinematic, restrained motion
- **Stripe:** Technical depth, interactive docs
- **Pentagram:** Editorial design, case study presentation
- **Linear:** Dark mode, subtle animations
- **Vercel:** Performance, modern stack

---

## Content Audit (What to Include)

### From Your Files
- [ ] BDR Pod case study (markdown → interactive)
- [ ] Outcome-First messaging (doc → framework)
- [ ] Marketing Org Design (doc → org chart)
- [ ] GA4 governance (doc → architecture diagram)
- [ ] AI Operating System (live demo?)

### From Google Drive
- [ ] TSI strategy docs (anonymize)
- [ ] Presentations (embed or convert)
- [ ] Reports (extract key data)
- [ ] Frameworks (make downloadable)

### New Content
- [ ] Executive summary video (1 min)
- [ ] Process walkthrough
- [ ] Testimonials (when you get them)
- [ ] Press/media mentions

---

## Next Steps

**TODAY:**
1. **Approve architecture** (this doc)
2. **Grant Google Drive access** (viewer link or shared folder)
3. **Confirm:** GoDaddy domain → Vercel deployment

**THIS WEEK:**
1. Set up project
2. Build design system
3. Create home + about

**QUESTIONS:**
1. Do you want a CMS (Sanity) or static files?
2. Should we include a live demo of your AI system?
3. Any specific animations/interactions you love?
4. Timeline — when do you want this live?

---

*This is your digital monument. Let's build something unforgettable.*
