# Portfolio Redesign Research + Planning

_Date:_ 2026-03-13  
_Status:_ Research and planning only — do **not** build yet.

## 1) Goal

Design the ideal portfolio website for a senior VP / GTM / growth / AI-facing operator profile.

This site should do four jobs at once:

1. **Signal executive credibility fast**
2. **Show strategic depth, not just aesthetics**
3. **Package measurable business outcomes as case studies**
4. **Be easy to maintain without turning into a side project**

The right portfolio for this role is **not** a flashy designer portfolio and **not** a resume site with prettier fonts. It should feel like:

- high-agency
- modern
- editorial
- strategic
- outcomes-first
- quietly technical
- selective rather than exhaustive

The overall recommendation: **build a premium editorial portfolio with restrained motion, strong case-study storytelling, and a lightweight CMS layer that keeps publishing friction low.**

---

## 2) Executive Summary / Recommendation

### Recommended direction

Build a **content-led, editorial personal site** with:

- a bold but restrained homepage
- 3–5 flagship case studies
- a sharp positioning / bio page
- a lightweight writing / insights section
- a speaking / press / proof section if applicable
- a simple contact / CTA path

### Recommended stack direction

**Best overall recommendation:**
- **Frontend:** Next.js or equivalent modern React framework
- **CMS:** **Sanity** as primary recommendation
- **Animation:** **Motion (Framer Motion / motion.dev)** for most interactions, optionally small targeted **GSAP** use only if needed
- **3D / immersive:** avoid defaulting to Three.js or Spline unless there is a very specific brand concept worth the performance cost

### Why this is the best fit

Because this portfolio needs to optimize for:

- credibility over novelty
- maintainability over experimentation
- narrative clarity over visual spectacle
- speed and readability over “look what web tech can do”

A VP/GTM portfolio should feel closer to a **beautiful strategy memo + operating case study library** than an art-school playground.

---

## 3) Research Findings: Modern Portfolio Design Trends

Research sources reviewed included current category pages and examples from:

- Awwwards portfolio category
- Awwwards creative portfolio collection/article
- Framer portfolio gallery
- Framer portfolio template ecosystem

### What the current best portfolio sites are doing

Across Awwwards and Framer examples, the recurring patterns are:

#### 3.1 Big editorial typography
Large type is doing most of the brand work.

Common traits:
- oversized headlines
- sparse but confident copy
- strong hierarchy
- high contrast
- lots of whitespace

**Implication:** typography is the cheapest way to look premium. For this portfolio, strong type matters more than fancy interactions.

#### 3.2 Strong visual rhythm and pacing
Modern portfolio sites increasingly feel like guided narratives instead of grids.

Patterns:
- stacked full-width sections
- alternating dense and sparse moments
- section-by-section reveal
- deliberate pacing using whitespace and scroll

**Implication:** the homepage should read as a story arc, not a dump of tiles.

#### 3.3 Case study previews with strong framing
Better sites do not just show project names. They pre-frame the value.

Common card structure:
- project / company name
- role or mandate
- one-line strategic context
- measurable result
- visual identity or art direction

**Implication:** for GTM work, each case study preview should telegraph a business problem and result immediately.

#### 3.4 Motion is everywhere, but the best examples use restraint
The strongest examples use:
- hover states
- layered parallax
- fade / reveal / slide transitions
- scroll-linked polish
- subtle kinetic typography

The weaker examples overuse:
- unnecessary cursor gimmicks
- heavy WebGL scenes
- slow transitions that hurt reading
- full-screen animation intros

**Implication:** motion should support comprehension, not compete with it.

#### 3.5 Personality is now expected
Portfolio sites increasingly show a point of view, not just competence.

This happens through:
- voice in headlines
- editorial curation
- a selective project list
- subtle visual identity
- “what I believe” / “how I work” framing

**Implication:** this portfolio should not be generic “growth leader with 10+ years…” copy. It needs a clear thesis.

---

## 4) Design Principles for This Specific Portfolio

### Core positioning principle
This site should present Connor as:

- a strategic operator
- with GTM depth
- who can work at startup speed
- who understands AI-era distribution, adoption, and revenue systems
- and who can translate ambiguity into execution

### Design principles

1. **Outcome-first**  
   Every major section should anchor to results, systems, or judgment.

2. **Editorial over decorative**  
   The design should feel like premium publishing, not a template carousel.

3. **Selective over comprehensive**  
   Better to have 4 excellent stories than 18 shallow ones.

4. **Modern but not trendy-to-death**  
   It should still look good in 2–3 years.

5. **Readable before impressive**  
   Recruiters, founders, and operators skim under time pressure.

6. **Executive confidence**  
   No “pick me” energy. Strong framing, calm design, proof-heavy content.

---

## 5) Recommended Information Architecture

## Primary site map

1. **Home**
2. **Case Studies** (index)
3. **Case Study Detail** (template)
4. **About / Positioning**
5. **Writing / Insights**
6. **Speaking / Press / Proof** (optional but recommended if material exists)
7. **Resume / PDF / LinkedIn / Contact**

### Homepage recommended structure

1. **Hero**
   - clear positioning statement
   - short proof strip
   - primary CTA

2. **Selected Impact**
   - 3–4 high-signal metrics
   - e.g. revenue influenced, pipeline built, launches led, teams scaled

3. **Featured Case Studies**
   - 3 flagship stories
   - each with context, problem, result

4. **How I Work / Operating Principles**
   - short strategic framework
   - e.g. narrative, systems, experimentation, enablement, distribution

5. **AI / GTM Point of View**
   - concise section showing current relevance
   - why modern GTM is changing and how you operate within it

6. **Selected Writing / Thinking**
   - 2–4 posts or memos

7. **Credibility / Logos / Testimonials / Quotes**
   - optional, only if high quality

8. **CTA footer**
   - contact / intro / resume / LinkedIn

### Navigation recommendation

Keep nav minimal:
- Work
- About
- Writing
- Resume / Contact

Do **not** create a bloated nav with too many top-level items.

---

## 6) Content Strategy for VP / GTM / AI Roles

This is the most important part.

A GTM/executive portfolio lives or dies on **framing**. The site should show that the owner can:

- diagnose markets
- position products
- create adoption systems
- align teams
- build revenue motion
- operate cross-functionally
- make good bets under uncertainty

### What employers / founders want to see

They are not mainly looking for “good taste.” They want evidence of:

- strategic judgment
- measurable outcomes
- scope and complexity handled
- leadership under ambiguity
- ability to build systems, not just campaigns
- understanding of AI market dynamics and modern demand gen / product-led / enterprise motion

### Recommended core content categories

#### 6.1 Flagship case studies
These should be the heart of the site.

Each one should answer:
- What was the company/context?
- What problem existed?
- What was at stake?
- What did you decide?
- What did you build/change?
- What happened?
- What did you learn?

#### 6.2 Strategic essays / memos
Short writing can massively increase perceived seniority.

Examples:
- what AI changes about GTM
- why category narrative matters before scale
- building adoption loops for technical products
- how to diagnose broken positioning
- growth systems vs isolated campaigns

#### 6.3 Operating philosophy
A short section on how you think:
- market understanding
- customer insight
- positioning
- systems design
- experimentation
- enablement
- feedback loops

#### 6.4 Career narrative / about page
This should answer:
- why this person
- why now
- why these roles
- what kind of company/context fits best

### Tone recommendation

Write like:
- a sharp operator
- not a corporate HR page
- not a self-help LinkedIn post
- not a designer manifesto

Tone should be:
- concise
- concrete
- opinionated
- thoughtful
- unsentimental

### Content anti-patterns to avoid

- giant walls of autobiography
- generic “results-driven leader” language
- shallow bullet-point case studies
- overclaiming without evidence
- too many projects with no narrative differentiation
- trying to sound more “AI” by stuffing buzzwords

---

## 7) Case Study Template Recommendation

Each case study should follow a repeatable executive narrative.

## Recommended template

### 1. Snapshot
- company / product / stage
- role
- timeline
- market context
- 2–4 key outcomes

### 2. The problem
- what wasn’t working
- why it mattered
- what constraints existed

### 3. Diagnosis
- what you observed
- what insight changed the direction
- where the bottleneck really was

### 4. Strategy
- positioning shift
- GTM redesign
- channel/system changes
- team/process changes

### 5. Execution
- what was actually built
- campaigns, systems, assets, team rituals, measurement, enablement, partnerships, etc.

### 6. Outcomes
- metrics
- operational improvements
- market effects
- leadership lessons

### 7. Reflection
- what you’d do differently
- what this says about how you work

### 8. Related artifacts (optional)
- launch memo
- deck snippet
- playbook screenshot
- dashboard crop
- campaign assets

### Best practice
Every case study needs:
- a clear strategic thesis
- at least one strong number
- enough specificity to feel real
- enough abstraction to preserve confidentiality where needed

---

## 8) CMS Research and Recommendation

Research considered:
- Notion Sites / Notion-backed publishing
- Sanity
- Directus
- Contentful
- broader 2025 headless CMS comparisons mentioning Strapi, Payload, Hygraph, Ghost, Tina, etc.

## What matters most for this portfolio CMS

The ideal CMS should support:

- easy editing for essays and case studies
- structured content models
- lightweight media management
- future flexibility
- low maintenance burden
- good preview / editorial workflow
- no giant enterprise overhead

### Option A: Notion Sites

**Strengths**
- easiest to start
- low friction editing
- familiar UI
- decent for simple publishing
- good for fast prototypes and basic portfolio pages

**Weaknesses**
- design control is limited
- branding ceiling is lower
- structured storytelling is weaker
- harder to create a distinctly premium custom site
- can feel like “published workspace” instead of crafted brand property

**Verdict**
Good for a quick MVP or temporary launch. **Not ideal** for the best-in-class version of this portfolio.

### Option B: Sanity

**Strengths**
- schema-as-code model is excellent for case studies and structured narrative blocks
- strong editorial flexibility
- works well with modern frontend stacks
- highly customizable
- supports precision updates and scalable structured content
- good long-term fit for content-rich sites

**Weaknesses**
- requires developer setup
- more complexity than Notion
- overkill for a single static page

**Verdict**
**Best overall choice.** This is the right balance of flexibility, structure, and future-proofing.

### Option C: Payload CMS

**Strengths**
- strong developer control
- modern and attractive in code-centric workflows
- good fit if wanting a more app-like integrated stack

**Weaknesses**
- can be more infrastructure-heavy than necessary
- may be more operational overhead than this project needs
- content editing experience may not be as elegant for this use case as Sanity

**Verdict**
Strong alternative if wanting deeper code ownership. Still not my first pick for this portfolio.

### Option D: Directus

**Strengths**
- powerful data modeling
- good admin UX
- flexible API access
- good for teams and broader backend needs

**Weaknesses**
- feels more like a data/control platform than a narrative-first personal publishing tool
- likely more backend than needed for a personal portfolio

**Verdict**
Good product, wrong center of gravity for this project.

### Option E: Contentful

**Strengths**
- enterprise-grade
- modular content
- strong ecosystem

**Weaknesses**
- expensive/complex for this use case
- unnecessary enterprise weight for a personal site

**Verdict**
Not recommended for this project.

### Other alternatives worth noting

- **Strapi**: strong open-source option, but usually more setup/admin than necessary here
- **Ghost**: great if the site is blog-first, less ideal if the main asset is structured case studies
- **Hygraph**: solid but not clearly better than Sanity for this use case
- **Tina**: interesting for git-based content workflows, but less obviously superior here

## CMS recommendation ranking

1. **Sanity** — recommended
2. **Payload** — if code-first self-hosted preference becomes important
3. **Notion** — if speed-to-launch matters more than custom brand expression
4. **Directus / Strapi / Hygraph** — possible, but not best-fit
5. **Contentful** — avoid for this project

---

## 9) Animation Library Research and Recommendation

Research reviewed current product positioning and ecosystem signals for:
- Motion / Framer Motion
- GSAP
- Three.js
- Spline

## What the animation layer needs to do

The site needs motion that supports:
- section reveals
- hover polish
- layout transitions
- subtle scroll dynamics
- maybe one “hero” flourish

It does **not** need a cinematic game engine.

### Motion / Framer Motion (motion.dev)

**Strengths**
- easy-to-use API
- strong for React
- excellent for layout animation, entrance transitions, gestures, and scroll-linked polish
- lightweight enough for premium UI motion
- ideal for modern editorial/product-feeling sites

**Weaknesses**
- less specialized than GSAP for ultra-complex scroll choreography

**Verdict**
**Primary recommendation.** Best default choice.

### GSAP

**Strengths**
- extremely robust
- great for professional-grade scroll choreography and advanced sequencing
- ideal for rich storytelling interactions

**Weaknesses**
- easier to overdo
- can add complexity fast
- often more than needed for tasteful executive portfolio motion

**Verdict**
Use only if a specific interaction genuinely benefits from it. Treat as a scalpel, not the base layer.

### Three.js

**Strengths**
- powerful 3D engine
- can create unforgettable branded experiences

**Weaknesses**
- major complexity and performance cost
- easy to become gimmicky
- not obviously aligned with a VP/GTM portfolio unless 3D has strategic meaning

**Verdict**
Avoid by default.

### Spline

**Strengths**
- faster path to interactive 3D scenes
- more approachable than raw Three.js

**Weaknesses**
- still introduces visual/performance overhead
- can date the site if used as generic “floating 3D blob” decoration

**Verdict**
Optional only for one contained hero asset if brand concept truly warrants it.

## Animation recommendation ranking

1. **Motion** — default
2. **GSAP** — selectively, for one or two hero sequences if necessary
3. **Spline** — only for a tightly scoped visual concept
4. **Three.js** — avoid unless there is a strong concept and execution budget

## Motion design rules

- use motion to create polish, not delay
- keep durations short
- avoid long loading sequences
- no novelty cursor unless it adds real value
- maintain fast perceived performance
- respect reduced-motion settings

---

## 10) Competitor / Benchmark Direction

Exact “perfect peers” are rare because executives often do not maintain strong public portfolios. Research should therefore benchmark across **adjacent categories**:

1. high-end personal portfolios
2. operator / strategist personal sites
3. AI company leadership / GTM role expectations
4. strong editorial personal brands

### Relevant benchmark groups

#### Group A: Creative portfolio inspiration
Useful for visual system ideas:
- typography
- scroll pacing
- modular case study cards
- transitions
- high-end layout treatment

But do **not** copy their content structure wholesale. Most are too visual-first.

#### Group B: Strategy/operator personal sites
Useful for:
- voice
- thesis-driven homepage framing
- how to package case studies and essays
- how to balance biography and proof

#### Group C: AI company role signals
OpenAI GTM/partnerships role descriptions show strong signals around what matters in market-facing leadership roles:
- operating cadence
- cross-functional leadership
- partner / revenue systems
- performance reporting
- target setting
- analytics + business judgment
- ability to scale execution in ambiguity

**Implication:** portfolio content should surface exactly these capabilities.

### Competitor content patterns to emulate

- short, high-signal headlines
- selective proof
- intelligent writing
- clear case-study structure
- strong personal thesis

### Competitor patterns to avoid

- “consultant beige” copy
- giant services menu
- too many testimonials with no substance
- fake thought leadership
- flashy but empty interactions

---

## 11) Positioning Strategy for the Site

## Recommended top-line positioning territories

The homepage should likely position around one of these territories:

### Option A: GTM systems builder
“I build go-to-market systems for ambitious products in fast-moving categories.”

Best for emphasizing repeatable execution and scale.

### Option B: Narrative + adoption operator
“I help technical products become legible, desirable, and adopted.”

Best for AI/product marketing crossover positioning.

### Option C: Executive growth strategist
“I turn market ambiguity into positioning, demand, and revenue motion.”

Best for senior leadership framing.

### Option D: AI-era commercial operator
“I design the narratives, systems, and teams that help AI products reach market.”

Best for strongest AI-forward alignment.

## Recommended positioning choice

Best current direction: **blend B + C + D**.

Why:
- feels senior
- feels current
- highlights both strategy and execution
- differentiates from generic growth marketing language

---

## 12) Visual System Recommendation

### Overall aesthetic
Think:
- premium editorial publication
- modern product company
- subtle experimental edge

Not:
- agency-template maximalism
- startup landing-page cliché
- dark-mode cyberpunk overload

### Color direction
Recommended approaches:

#### Option 1: Monochrome base + one accent
- black / off-black
- ivory / warm white
- one sharp accent color

Best for timelessness.

#### Option 2: Soft neutral editorial palette
- stone / cream / charcoal / muted accent

Best for warmth and readability.

#### Option 3: Dark mode default with disciplined use
Only if done carefully. Can look premium, but easier to get cliché.

**Recommendation:** start from **light editorial** or **balanced monochrome**, not gamer-dark.

### Typography recommendation
Use a pairing like:
- one high-character serif or neo-grotesk headline font
- one clean sans-serif for body / UI

Desired feel:
- intelligent
- contemporary
- expensive
- legible

### Layout recommendation
- generous spacing
- strong grid
- asymmetry in moderation
- image use should support credibility, not fill space
- allow text to carry weight

---

## 13) Homepage Wireframe Spec

## Hero

**Purpose:** establish who this is, what they do, and why they matter.

**Include:**
- one-line positioning statement
- one short supporting sentence
- primary CTA: View work
- secondary CTA: About / Resume / Contact
- small proof strip beneath

**Example content structure:**
- Headline: senior, crisp, thesis-driven
- Subhead: what kinds of companies / problems / outcomes
- Proof strip: revenue, launches, teams, categories, partnerships, etc.

## Impact section

**Purpose:** make business value visible fast.

Use 3–4 metrics only.

Examples:
- pipeline influenced
- adoption / growth percentage
- launch scale
- team/org scope
- strategic partnerships or major accounts

## Featured work

Each item should show:
- company / initiative
- context line
- challenge line
- measurable result
- optional visual artifact

## Operating principles

Could be 4 short blocks:
- Position before promotion
- Build systems, not one-offs
- Tight feedback loops beat big plans
- Adoption is cross-functional

## Writing section

Show only best pieces.
Do not create a content graveyard.

## Final CTA

Simple:
- hiring / advisory / operator conversations
- email + LinkedIn + resume

---

## 14) About Page Spec

The About page should answer:

- What kind of work do you do best?
- What environments fit you best?
- What makes your approach distinct?
- Why AI / GTM / growth / product adoption?

### Recommended sections

1. short narrative intro
2. how you work
3. what problems you like solving
4. career highlights timeline (lightweight)
5. selected principles / beliefs
6. personal note (optional, tasteful)

### Avoid
- a massive chronological autobiography
- generic executive bio clichés
- too much personality filler with no relevance

---

## 15) Writing / Insights Section Spec

This section matters because it upgrades perceived seniority.

### Recommended post types

- short strategic memos
- teardown-style GTM observations
- AI adoption / positioning notes
- lessons from launches / systems / org design

### Recommended cadence

Low volume is fine. Quality matters more than frequency.

Even 4–8 strong essays is enough.

### Recommendation

Treat writing as **evidence of judgment**, not content marketing.

---

## 16) Media / Artifact Strategy

The site will be much stronger if it includes selective supporting assets.

### Good artifacts
- launch screenshots
- strategy framework diagrams
- dashboards or charts (sanitized)
- campaign stills
- deck fragments
- screenshots of systems/processes
- speaking clips or event photos

### Rules
- every asset must earn its place
- avoid generic stock imagery
- do not clutter with decorative mockups
- sanitize confidential materials carefully

---

## 17) SEO and Discoverability Considerations

Even though this is a portfolio, SEO still matters for:
- name search
- recruiter discovery
- thought-leadership discovery
- AI/LLM citation / retrieval friendliness

### Recommended SEO approach

- clean semantic structure
- strong metadata per case study / article
- descriptive slugs
- structured content blocks
- author identity consistency
- fast load times
- strong internal linking between work and writing

### Important note
The main traffic will likely be direct and referral, not pure search. So optimize for **clarity and credibility first**, SEO second.

---

## 18) Performance / UX Constraints

Non-negotiables:
- fast first render
- excellent mobile behavior
- accessible contrast / type sizes
- reduced-motion support
- no heavy hero that delays content
- no hidden important information behind interaction gimmicks

### UX rule of thumb
If a recruiter or founder can’t understand the value proposition in 8–12 seconds, the design failed.

---

## 19) Phased Build Plan (for later)

_Not to build now; this is planning for future execution._

### Phase 0 — Content inventory
- collect all possible projects / wins / artifacts
- score them by signal and specificity
- choose top 3–5 case studies

### Phase 1 — Positioning and narrative
- finalize headline territory
- write homepage copy skeleton
- write case study templates
- decide tone and visual references

### Phase 2 — Design system
- pick type, color, spacing, motion rules
- create modular page sections
- define image treatment

### Phase 3 — CMS model
- model case studies, essays, quotes, proof metrics, bio blocks
- define editorial workflow

### Phase 4 — Build
- implement pages
- add motion sparingly
- optimize responsiveness and performance

### Phase 5 — Polish
- metadata, analytics, QA, accessibility, proofreading

---

## 20) Detailed Content Model Recommendation

If using Sanity, define structured models roughly like:

### Site settings
- site title
- default SEO
- nav items
- CTA links
- social links

### Author profile
- name
- role/positioning line
- bio short
- bio long
- headshot / portrait
- links

### Case study
- title
- slug
- company
- role
- timeframe
- stage / market
- summary
- hero metrics
- challenge
- diagnosis
- strategy
- execution
- outcomes
- lessons
- featured media
- tags
- SEO fields

### Insight article
- title
- slug
- summary
- body
- tags
- published date
- featured flag
- SEO fields

### Proof metric
- label
- value
- context
- sort order

### Testimonial / quote
- quote
- person
- title
- company
- optional logo

### Speaking / press item
- title
- event/publication
- type
- date
- link
- media

---

## 21) Open Questions Before Design Starts

These need answers before execution:

1. What exact roles is this portfolio optimizing for?
   - VP Marketing?
   - VP GTM?
   - Head of Growth?
   - AI GTM / product marketing leadership?
   - advisory / consulting also?

2. What is the strongest positioning thesis?

3. Which 3–5 case studies are highest-signal and safest to share?

4. Are there sanitized metrics and artifacts available?

5. Should the voice lean more:
   - operator / executive
   - strategist / thinker
   - builder / systems designer
   - or a blend?

6. Does the site need a blog cadence, or just a static “selected writing” shelf?

7. Is the target outcome:
   - recruiting / hiring
   - consulting / advisory inbound
   - speaking / credibility
   - all three?

---

## 22) Final Recommendation

If the goal is the **ideal** portfolio rather than the fastest one, the best direction is:

### Recommended final stack and approach
- **Experience:** premium editorial portfolio
- **Frontend:** modern React/Next-style custom site
- **CMS:** **Sanity**
- **Animation:** **Motion** by default, optional tiny dose of **GSAP** only where justified
- **3D:** skip unless there is a very specific brand concept

### Recommended strategic emphasis
Lead with:
- strategic clarity
- measurable business outcomes
- AI-era GTM relevance
- concise operator voice
- well-structured flagship case studies

### What this portfolio should feel like
A founder, recruiter, or exec should come away thinking:

> This person has taste, judgment, and range — but more importantly, they know how to move a market-facing organization forward.

That is the bar.

---

## 23) Immediate Next Step Recommendations

When ready to move beyond research, the next best sequence is:

1. choose target role archetype(s)
2. shortlist 5–7 possible case studies
3. pick top 3 flagship stories
4. define the homepage positioning statement
5. gather artifacts and proof metrics
6. then move into wireframes and content drafts

Until then: **do not build. Finalize narrative first.**
