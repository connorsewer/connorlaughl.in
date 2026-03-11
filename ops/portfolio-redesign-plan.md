# Portfolio Redesign Plan

**Created:** March 10, 2026  
**Goal:** Research and planning for ideal VP/GTM portfolio website

---

## 1. Modern Portfolio Design Trends (2026)

### Key Trends

- **AI-Human Collaboration Design**: Mix of digital and handmade aesthetics, AI-generated layouts with human curation
- **Modular/Asymmetric Layouts**: Dynamic grid systems that break traditional patterns — popular on Awwwards
- **Brutalist Design Elements**: Bold typography, high contrast, interactive mini-games (e.g., Toggl)
- **Horizontal Scrolling**: Creative deviation from vertical scrolling for portfolio showcases
- **Micro-interactions & Transitions**: Smooth, physics-based animations; distinctive typography with generous negative space
- **Immersive 3D Elements**: WebGL-powered experiences (Three.js, Spline) for depth and engagement
- **Mobile-First Responsive**: Beyond rescaling — optimized experiences per device

### Inspiration Sources
- **Awwwards Portfolio Category**: https://www.awwwards.com/websites/portfolio/
- **SiteBuilderReport UX Portfolios**: 30+ inspiring examples
- **Framer Gallery**: Portfolio designs & inspiration

---

## 2. CMS Options

### Headless CMS Comparison

| CMS | Best For | Pricing (Free Tier) | Key Strength |
|-----|----------|---------------------|--------------|
| **Sanity** | Complex content ops, developer-first teams | $0/minimal for small projects | Real-time collaboration, infinitely customizable, React-based Studio |
| **Prismic** | Visual page building, marketing teams | 0 | Great for visual page building, slice-based architecture |
| **Contentful** | Enterprise, DXM needs | 25K records/mo | Full digital experience platform |
| **Strapi** | Open-source preference | Self-hosted free | Full control, API-first |
| **Hygraph** | GraphQL-native | 1M API hits/mo | Relational content, strong free tier |
| **Directus** | SQL databases | Open-source | Direct SQL access, no lock-in |

### Notion as CMS
- Works via Notion API + Next.js
- Great for non-technical content updates
- Limitations: Real-time sync challenges, less structured for complex queries

### Recommendation for VP/GTM Portfolio
- **Sanity** or **Prismic**: Best balance of developer experience + marketing-friendly editing
- **Alternative**: Notion API if content is simple (case studies, bio, experience)

---

## 3. Animation Libraries

### Framer Motion (now "Motion")
- **Pros**: Most popular React animation library, excellent DX, declarative syntax, open-source, smaller bundle size via native browser APIs
- **Cons**: Less comprehensive than GSAP for complex scenarios
- **Best for**: 99% of portfolio animations — page transitions, scroll reveals, hover states

### GSAP (GreenSock)
- **Pros**: Most powerful, exceptional performance for complex animations, tree-shakable, club plugins (MorphSVG, ScrollTrigger)
- **Cons**: Steeper learning curve, licensing for some plugins
- **Best for**: Complex timelines, scroll-driven animations, specialized effects

### Three.js / React Three Fiber (R3F)
- **Pros**: Full WebGL control, infinite possibilities for 3D
- **Cons**: High complexity, performance overhead, steep learning curve
- **Best for**: Immersive 3D scenes, product configurators

### Spline
- **Pros**: No-code 3D design, browser-based, direct export to React, Framer, Webflow
- **Cons**: Limited mesh editing, performance on mobile
- **Best for**: Quick 3D prototypes, accent elements (not full scenes)

### Recommendation
- **Primary**: Framer Motion (Motion) — powers most animations
- **Secondary**: GSAP with ScrollTrigger — for scroll-driven effects
- **Accent**: Spline — for lightweight 3D elements (integrated via @splinetool/react-spline)
- **Avoid**: Full Three.js unless needed — high maintenance

---

## 4. Content Strategy for VP/GTM Roles

### Target Audience
- CEOs/Founders hiring for GTM leadership
- Boards evaluating executive talent
- Investors assessing portfolio company leadership
- Potential partners/customers

### Key Sections

#### 1. Executive Summary / Tagline
- One-line value proposition
- Example: "Scaling $0→$100M GTM engines for AI/SaaS companies"

#### 2. Professional Journey
- Concise timeline: Companies, roles, promotions
- Focus on trajectory and impact

#### 3. Selected Case Studies (3-5)
- Problem → Strategy → Execution → Results
- Metrics-driven: ARR growth, pipeline created, team scaled
- Narrative format: "How I helped [Company] achieve [X]"

#### 4. Thought Leadership
- Links to published content (articles, podcasts, talks)
- Original frameworks or frameworks referenced

#### 5. Advisory / Board Work
- If applicable: Companies advised, board roles

#### 6. Contact / Booking
- Clear CTA: "Book a conversation" or direct email
- LinkedIn, Twitter/X links

### Content Tone
- **Confident but not arrogant**: Lead with results, not superlatives
- **Specific over generic**: "$50M pipeline" > "drove significant revenue"
- **Story-driven**: Show thinking, not just outcomes

---

## 5. Competitor Portfolios (AI Company GTM Leaders)

### Reference Portfolios to Study

| Name | Role | Why |
|------|------|-----|
| **Steph Smith** | Former Head of Marketing, The Hustle/a16z | Content-driven, courses/guides, credibility |
| **Aarron Walter** | VP Product/UX at Mailchimp, InVision | Simple yet effective, "Designing for Emotion" author |
| **Lidia** | Brand Marketing Leader | Color psychology, credibility at-a-glance |
| **Rian** | Product Leader/Author | UX background, cross-functional storytelling |

### AI Company Leadership Pages (for inspiration)
- **OpenAI**: Leadership team pages (clean, minimal)
- **Anthropic**: Executive bios — focused on mission + credentials
- **Scale AI**: GTM leadership hiring pages

---

## 6. Technical Stack Recommendation

### Primary: Next.js + Framer Motion + Sanity

| Layer | Technology | Rationale |
|-------|------------|----------|
| Framework | Next.js 14+ (App Router) | Performance, SEO, Vercel deployment |
| Styling | Tailwind CSS | Speed, consistency |
| Animation | Framer Motion + GSAP ScrollTrigger | Primary + scroll effects |
| CMS | Sanity.io | Flexible, real-time preview, React integration |
| 3D Accents | Spline (via @splinetool/react-spline) | Lightweight 3D elements |
| Hosting | Vercel | Zero-config Next.js, edge caching |
| Domain | Namecheap/Cloudflare | DNS management |

### Alternative (No-Code)
- **Framer Pro**: Fastest path to launch, built-in animations, limited CMS
- **If content is minimal**: Notion + Super.so (Notion as CMS, super.so for styling)

---

## 7. Design Direction

### Visual Identity
- **Style**: Modern minimalist with strategic accent elements
- **Color**: Deep dark theme (trust, premium) or crisp white (clarity) — lean into AI/tech palette
- **Typography**: Distinctive sans-serif (e.g., Geist, Inter, Satoshi) — one font family, multiple weights
- **Layout**: Asymmetric modular grid — break the traditional boxy feel

### Key Interactions
- Smooth page transitions (Framer Motion)
- Scroll-triggered reveal animations
- Subtle hover states on case study cards
- Horizontal scroll section for work showcase (optional)

### 3D/Immersive Elements
- Spline accent: Abstract shape or subtle 3D element as hero background
- Avoid: Heavy 3D that impacts load time

---

## 8. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Next.js + Tailwind
- [ ] Configure Sanity.io CMS schema (case studies, bio, experience)
- [ ] Design system: colors, typography, spacing

### Phase 2: Content (Week 2-3)
- [ ] Write case studies (3-5)
- [ ] Professional bio and journey
- [ ] Gather assets (photos, logos from past companies)

### Phase 3: Build (Week 3-4)
- [ ] Page layouts and components
- [ ] Framer Motion animations
- [ ] GSAP ScrollTrigger effects
- [ ] Integrate Spline accents

### Phase 4: Polish (Week 4-5)
- [ ] Mobile responsive testing
- [ ] Performance optimization (Lighthouse)
- [ ] SEO setup (meta tags, sitemap)
- [ ] Analytics (Vercel/GA4)

### Phase 5: Launch (Week 5-6)
- [ ] DNS configuration
- [ ] Final QA
- [ ] Soft launch to test group

---

## 9. Budget Estimate

| Item | Cost |
|------|------|
| Domain (annual) | ~$15 |
| Vercel Pro (optional) | $20/mo |
| Sanity (free tier) | $0 |
| Spline (free tier) | $0 |
| **Total (min)** | ~$15/year |

---

## 10. Next Steps

1. **Approve this plan** → Proceed to Phase 1
2. **Provide content**: Draft case studies, bio, headshot
3. **Design preferences**: Confirm color palette, typography direction
4. **Timeline**: Confirm target launch date

---

*Document generated: March 10, 2026*
