# Portfolio Redesign Plan

**Research Date:** March 2, 2026  
**Goal:** Build ideal portfolio website for VP/GTM roles at AI companies

---

## 1. Design Trends (2026)

### Key Themes from Awwwards/Dribbble
- **AI-Enhanced Creativity** — Real-time content adaptation, AI-collaborative design
- **Virtual Reality Websites** — Immersive 3D environments (might be overkill for personal portfolio)
- **Dynamic Motion Design** — Logo animations, scroll-triggered micro-interactions
- **Interactive 3D Models** — Cursor-reactive elements, product-like showcases
- **Exploratory Layouts** — Non-traditional grids, floating/scattered elements
- **Typographic Statements** — Oversized sans-serif, animated typography
- **Cinematic Heroes** — Full-bleed video backgrounds with bold overlay text
- **Mixed Scroll Directions** — Horizontal + vertical scroll experiences
- **Noise & Chromatic Effects** — Grain overlays, color shifts
- **Illustrated Worlds** — Custom illustrations vs stock photography

### Recommendations for VP/GTM Portfolio
- **Prioritize:** Cinematic hero + typographic statements + subtle motion
- **Avoid:** Full VR experiences (distracting from core message)
- **Style:** Bold, confident, minimal but not boring — let results speak

---

## 2. CMS Options

### Headless CMS Comparison

| CMS | Best For | Pros | Cons |
|-----|----------|------|------|
| **Sanity** | Complex content ops, code-first teams | Real-time collab, version control, highly customizable Studio | Higher learning curve |
| **Contentful** | Enterprise-scale | Robust API, strong integrations, enterprise-ready | Can be pricey, complex for simple needs |
| **Strapi** | Self-hosting, max customization | Open-source, full control | Requires DevOps maintenance |
| **Prismic** | Visual page building | Great visual editor, Slice machine | Less flexible for complex data |
| **Notion** | Simplicity, already using it | Dead-simple, familiar UI | Limited API, not true headless |
| **Storyblok** | Marketing teams | Visual editing bridge headless/traditional | Enterprise-focused |

### Traditional/CMS-Lite Options
- **Framer** — All-in-one design+hosting, stunning portfolios, no-code
- **Webflow** — Full design control, steeper learning
- **Carrd** — Ultra-simple one-page sites

### Recommendation
**Sanity + Next.js** — Best balance of:
- Code-first customization (you control the experience)
- Real-time collaboration (future-proof for team edits)
- Excellent Next.js integration
- Free tier sufficient for personal portfolio

**Alternative (simpler):** Notion + Super (if you want zero maintenance)

---

## 3. Animation Libraries

### Comparison

| Library | Use Case | Learning Curve | Bundle Size | Best For |
|---------|----------|---------------|-------------|----------|
| **Motion (Framer Motion)** | React apps | Low | ~30kb | UI animations, page transitions |
| **GSAP** | Complex timelines | Medium | ~60kb+ | Scroll animations, complex sequences |
| **Three.js** | 3D experiences | High | ~500kb | WebGL, 3D models |
| **Spline** | No-code 3D | Low | Runtime only | Designer-friendly 3D embedables |

### Recommendation
**Motion (Framer Motion)** — 
- Perfect for Next.js/React stack
- Easy scroll-triggered animations
- Layout animations (AnimatePresence)
- Smallest bundle impact

**Add GSAP only if needed:**
- Complex scroll timelines
- Parallax effects
- SVG path animations

**Spline for accents:**
- One hero 3D element
- Subtle interactive piece (don't overdo)

---

## 4. Content Strategy for VP/GTM Roles

### What Recruiters Want to See
1. **Proven Results** — Metrics, revenue impact, growth percentages
2. **Scope of Leadership** — Team size, budget managed, P&L ownership
3. **Company Context** — Stage (Series A→IPO), industry, ARR/MRR
4. **Strategic Wins** — GTM strategy that worked, launch stories
5. **Thought Leadership** — Frameworks, speaking, writing

### Recommended Sections

| Section | Purpose |
|---------|---------|
| **Hero** | One-line value prop + credibility signal (company logos, "VP GTM at X") |
| **Impact Numbers** | 3-4 key metrics (e.g., "Scaled from $2M→$50M ARR") |
| **Experience Timeline** | Role + company + tenure, expandable for details |
| **Case Studies** | 2-3 deep dives on specific wins (problem → strategy → result) |
| **Approach/Philosophy** | Your GTM framework (differentiator) |
| **Testimonials** | Peer or executive endorsements |
| **Speaking/Writing** | Links to talks, articles, podcasts |
| **Contact** | Clear CTA (book a call, email) |

### Tone
- **Confident, not cocky** — "Led" not "helped with"
- **Results-focused** — Always tie to business outcomes
- **Strategic, not tactical** — Show thinking, not just doing

---

## 5. Competitor Portfolios (VP/GTM at AI Companies)

### Notable Examples to Study
- **Ramón Ruijs** (ex-Notion, VP GTM) — Clean, metrics-focused
- **Matt Siroty** (Anthropic, Head of GTM) — Minimal corporate but effective
- **Katherine McCauley** (xAI, Head of Revenue) — Emerging AI company style

### General Observations
- Most VP/GTM portfolios are surprisingly **under-designed**
- LinkedIn profile often serves as "portfolio"
- Opportunity: **Stand out with a well-designed site**
- AI company employees lean toward **minimal, tech-forward** aesthetic

### Recommendations
- Don't copy corporate LinkedIn style — be memorable
- Use AI-forward imagery/subtle tech touches
- Show you understand the AI space

---

## 6. Technical Stack Recommendation

### Full Option (Maximum Control)
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity.io
- **Animation:** Motion (Framer Motion)
- **Hosting:** Vercel
- **Domain:** Namecheap/Cloudflare

### Simplified Option (Faster Build)
- **Platform:** Framer
- **CMS:** Framer (built-in) or Notion
- **Animation:** Built-in Motion effects

---

## 7. Project Phases

### Phase 1: Foundation (Week 1)
- [ ] Define content strategy & messaging
- [ ] Write case studies (3 deep dives)
- [ ] Gather assets (headshots, logos, metrics)
- [ ] Choose stack (Sanity+Next vs Framer)

### Phase 2: Design (Week 2)
- [ ] Wireframes for each section
- [ ] Hero concept + animation direction
- [ ] Typography system
- [ ] Mobile responsive breakdown

### Phase 3: Build (Week 3)
- [ ] Set up Next.js + Sanity
- [ ] Implement hero + navigation
- [ ] Build experience timeline
- [ ] Add case study templates

### Phase 4: Polish (Week 4)
- [ ] Animation implementation
- [ ] Performance optimization
- [ ] SEO setup
- [ ] Testing (mobile, accessibility)
- [ ] Launch

---

## 8. Key Decisions Needed

Before building, confirm:

1. **Stack preference:** Sanity+Next.js (control) vs Framer (speed)?
2. **Case studies:** Which 3 wins tell your best story?
3. **Design direction:** Bold typography-forward OR subtle tech accents?
4. **Animation level:** Motion UI (subtle) vs Scrollytelling (complex)?
5. **Maintenance:** Comfortable with code maintenance or want no-code?

---

## Inspiration Links

- [Awwwards Portfolios](https://www.awwwards.com/websites/portfolio/)
- [Dribbble Portfolios](https://dribbble.com/tags/portfolio)
- [Motion (Framer Motion)](https://motion.dev)
- [Sanity for Portfolios](https://www.sanity.io/templates/portfolio)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)

---

*Plan ready for build phase when you're ready.*
