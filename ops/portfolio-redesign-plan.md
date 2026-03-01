# Portfolio Redesign Plan

**Created:** March 1, 2026  
**Goal:** Research and planning for ideal VP/GTM portfolio website

---

## 1. Modern Design Trends (2026)

### Key Trends from Awwwards/Dribbble

| Trend | Description | Fit for VP/GTM |
|-------|-------------|----------------|
| **AI-Enhanced Creativity** | AI-generated visuals, real-time personalization | ✅ Use AI-generated abstract art for hero sections |
| **Virtual Reality Websites** | Immersive 3D environments, walkable digital showrooms | ⚠️ High effort—consider interactive 3D elements only |
| **Dynamic Motion Design** | Logo animations, scroll-triggered motion that matches brand rhythm | ✅ Essential—subtle, premium feel |
| **Interactive 3D Models** | 3D shapes that react to scroll/hover | ⚠️ Use sparingly—can distract from content |
| **Exploratory Layouts** | Modular/scattered grids, click-to-discover content | ✅ Great for case study navigation |
| **Typographic Statements** | Oversized sans-serif, animated typography | ✅ Strong choice—communicates authority |
| **Cinematic Heroes** | Full-bleed video/photo with bold typography | ✅ Recommended for hero section |
| **Mixed Scroll Directions** | Horizontal + vertical scrolling | ⚠️ Risky—can harm UX |
| **Noise & Chromatic Effects** | Grain overlays, color mashups | ⚠️ Avoid—too trendy for executive |
| **Illustrated Worlds** | Custom illustrations, hand-drawn elements | ⚠️ Depends on brand |

### Recommended Direction
**Clean, authoritative, motion-forward.** Avoid trendy chaos. Target:
- Bold typography as hero (your name, role)
- Cinematic video/image background OR solid color with subtle animation
- Smooth scroll-triggered reveals (Framer Motion)
- Exploratory layout for case studies (modular grid)

---

## 2. CMS Options

### Comparison Matrix

| CMS | Type | Ease of Use | Flexibility | Best For |
|-----|------|-------------|------------|----------|
| **Notion** | Headless/API | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Fastest setup, familiar UI, great for case studies |
| **Sanity** | Headless | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Highly customizable, real-time collab |
| **Contentful** | Headless | ⭐⭐⭐ | ⭐⭐⭐⭐ | Enterprise-grade, good APIs |
| **Framer** | All-in-one | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Built-in animations, fast deployment |
| **Webflow** | Visual | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Full design control, steeper learning |
| **WordPress** | Traditional | ⭐⭐⭐ | ⭐⭐⭐⭐ | Most plugins, but overkill |

### Recommendation

**Primary: Notion + Next.js** (or Framer)
- Notion as backend—you already know it
- Notion-to-site via Notion API or Super.so
- Case studies = Notion pages (easy to edit)
- Fast, clean, minimal maintenance

**Alternative: Framer**
- If you want native animations without code
- Higher cost, less flexibility long-term

**Avoid:** WordPress (overkill), pure headless without need (overengineering)

---

## 3. Animation Libraries

### Comparison

| Library | Use Case | Learning Curve | Bundle Size | Recommendation |
|---------|----------|----------------|-------------|----------------|
| **Framer Motion** | React animations | Low | ~40kb | ✅ Best choice for Next.js |
| **GSAP** | Complex timelines | Medium | ~60kb+ | Best for scroll sequences |
| **Three.js / React Three Fiber** | 3D/WebGL | High | ~500kb+ | ⚠️ Only if 3D needed |
| **Spline** | 3D scenes, easy export | Low | Runtime ~10mb | ⚠️ Heavy, use sparingly |
| **Lenis** | Smooth scrolling | Low | ~10kb | ✅ Essential for premium feel |
| **CSS/Scroll-driven** | Simple reveals | Low | 0 | ✅ Use for simple things |

### Recommended Stack

```
Animation: Framer Motion
Smooth Scroll: Lenis
3D (if needed): Spline or R3F (sparingly)
```

### Animation Strategy
- **Hero:** Subtle fade-in + slight parallax
- **Scroll:** Elements reveal on scroll (fade up, slide in)
- **Case studies:** Smooth image transitions, staggered text
- **Micro-interactions:** Hover states, button animations
- **Avoid:** Excessive motion that distracts from content

---

## 4. Content Strategy for VP/GTM Roles

### What to Include

#### Homepage
- **Hero:** Name, title (VP of Growth/GTM), one-line value prop
- **Bio blurb:** 2-3 sentences on who you are and what you do
- **Key metrics:** 3-4 impressive numbers (revenue, growth %, team size)
- **Recent work:** 2-3 highlighted projects/companies

#### About Page
- Professional story (career journey)
- Philosophy on growth/GTM
- Personal side (optional—keeps it human)
- Resume download

#### Case Studies (Core)
Each case study should include:
1. **Problem:** What was the challenge?
2. **Approach:** Your strategy and GTM plan
3. **Execution:** Tactics, channels, timeline
4. **Results:** Quantified impact (% growth, revenue, etc.)
5. **Lessons:** What you learned

**Recommended Case Studies:**
- 4-6 deep case studies
- Mix of: 1 startup (agile), 1 enterprise (scale), 1 AI/tech (current)
- Each: 800-1500 words, visual-heavy

#### Experience/Resume
- Timeline of roles
- Companies, titles, tenure
- Key accomplishments per role

#### Contact
- Email
- LinkedIn
- Optional: Calendly for calls

### Tone & Voice
- **Confident, not cocky** — "Led growth from $0 to $10M" not "I tried to grow"
- **Results-first** — Lead with impact, back up with context
- **Human** — Not corporate sterile; let personality show
- **Forward-looking** — Reference current AI/tech trends

---

## 5. Competitor Portfolios (AI Company GTM/VPs)

### Reference Examples to Study

| Person/Company | Notes |
|----------------|-------|
| **Jason Cohen** (Founder, WP Engine) | Masterclass in personal brand + content |
| **Andrew Chen** (a16z) | Research-heavy, thought leadership |
| **Elena Verna** (Growth advisor) | Metrics-forward, clean design |
| **Brian Balfour** (Reforge) | Long-form content, expert positioning |
| **Drew Hubbard** (Anthropic, ex-Notion) | Modern, product-focused |

### AI Company GTM Leaders to Watch
- Search for "Head of Growth" or "VP GTM" portfolios at xAI, Anthropic, OpenAI (past employees)
- Many have personal sites that are understated but effective
- Key pattern: **Less is more** — clean, typography-driven, results-focused

### What Works
- Simple, single-column layouts
- Large name/role typography
- Minimal imagery (company logos, not stock photos)
- Clear CTAs (LinkedIn, email)

### What to Avoid
- Flashy effects that delay loading
- Too many case studies (quality > quantity)
- Generic "I help companies grow" copy
- Stock photography

---

## 6. Technical Stack Recommendation

### Recommended Stack

```
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS
CMS: Notion (via Notion API) or Framer
Animation: Framer Motion + Lenis
Hosting: Vercel
Domain: Namecheap/Cloudflare
```

### Optional Upgrades
- **3D elements:** React Three Fiber (use sparingly)
- **Analytics:** Vercel Analytics or Plausible
- **Forms:** Formspree or Resend (for contact)
- **Email:** ConvertKit (newsletter optional)

---

## 7. Phased Implementation Plan

### Phase 1: Foundation (Week 1-2)
- [ ] Choose CMS (recommend: Notion or Framer)
- [ ] Wireframe homepage and case study template
- [ ] Write core copy (hero, bio, 3 case studies)
- [ ] Set up Next.js + Tailwind

### Phase 2: Design & Build (Week 3-4)
- [ ] Implement design (typography, colors, layout)
- [ ] Add Framer Motion animations
- [ ] Integrate Notion CMS or set up Framer pages
- [ ] Mobile responsive check

### Phase 3: Content (Week 5)
- [ ] Write remaining case studies (3-4)
- [ ] Add resume/LinkedIn
- [ ] SEO optimization (meta tags, OG images)

### Phase 4: Launch (Week 6)
- [ ] Testing across devices
- [ ] Analytics setup
- [ ] Deploy to Vercel
- [ ] Domain setup

---

## 8. Budget Estimate

| Item | Cost |
|------|------|
| Domain (1 year) | ~$12 |
| Hosting (Vercel Pro) | $20/mo |
| CMS (Notion Free / Super.so Free) | $0-19/mo |
| Design/Development (DIY) | $0 |
| **Total Year 1** | ~$240-480 |

---

## 9. Open Questions

Before building, clarify:
1. **Brand preference:** Do you want to emphasize AI/tech specifically, or be more general GTM?
2. **Case study confidentiality:** Are you free to name past companies and share metrics?
3. **Personal branding:** How prominent should your photo be?
4. **Content volume:** Are you committed to a blog/thought leadership section?
5. **Timeline:** Any target launch date?

---

## 10. Inspiration Links

### Portfolios to Study
- https://www.aarronwalter.com
- https://www.luyu.design
- https://www.moritzklack.com
- https://andrewchen.co
- https://www.jasoncohen.com

### Design Inspiration
- https://www.awwwards.com/websites/portfolio/
- https://www.sitebuilderreport.com/inspiration/ux-portfolios
- https://dribbble.com/tags/portfolio

---

*End of Plan — Ready for build phase when approved.*
