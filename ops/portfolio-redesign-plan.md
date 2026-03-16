# Portfolio Redesign Research & Planning

_Date:_ 2026-03-15  
_Status:_ Research + planning only. No build work started.

## Executive summary

The ideal portfolio for Connor is **not** a designer-style experimental playground and **not** a static resume site. It should be a **high-credibility operator portfolio**: sharp positioning, evidence-heavy case studies, lightweight but polished motion, strong writing, and a CMS/content model that makes it easy to publish new thinking without creating a maintenance hobby.

The best direction is:

- **Visual style:** modern, premium, restrained, editorial, with selective motion rather than constant spectacle
- **Primary goal:** convert high-intent visitors (recruiters, founders, hiring managers, collaborators) into one of three outcomes:
  1. “This person clearly knows GTM and can operate at a high level.”
  2. “I understand their thinking and track record fast.”
  3. “I know exactly how to contact them / review deeper proof.”
- **Build target:** likely custom site with a lightweight headless CMS, or Framer if speed beats flexibility
- **Content strategy:** fewer projects, deeper proof; strong written POV; explicit metrics and strategic framing; role-specific messaging for VP/GTM and AI-company audiences

My opinion: for this use case, **clarity beats cleverness**. The sites winning awards with maximal motion are useful inspiration for pacing, typography, layering, and transitions — but the actual portfolio should behave more like a premium strategy/product site than a digital art piece.

---

## 1) Research synthesis: modern portfolio design trends

### What the current inspiration landscape suggests

From Awwwards portfolio collections and current portfolio inspiration roundups, the pattern is pretty clear:

- Large, confident hero statements
- Strong typography doing most of the brand work
- Editorial spacing and rhythm
- Modular case-study blocks rather than dense archive pages
- Selective micro-interactions and scroll reveals
- Motion used to guide attention, not just show off
- More “productized personal brand” than traditional portfolio grid
- Social proof and outcomes appearing earlier on the page

Framer’s current portfolio/marketing examples also push a similar direction:

- Clear value proposition above the fold
- Case studies in narrative sequence
- Clean hierarchy and whitespace
- Proof assets embedded into the story
- Thought leadership/blog integrated into the same site

### Strong trends worth borrowing

#### 1. Editorial + product hybrid layout
The best modern portfolios look like a cross between:

- a premium startup landing page
- a longform editorial site
- a curated case-study archive

That’s ideal here. For a VP/GTM portfolio, this format signals both taste and strategic clarity.

#### 2. Fewer, stronger pages
Winning sites are trending away from giant nav trees. The better pattern is:

- concise homepage
- selected work / case studies
- writing / ideas
- about / bio
- contact

Optional extras only if justified:

- speaking / press
- resources / playbooks
- resume / dossier

#### 3. Motion as hierarchy, not decoration
Useful motion patterns:

- section reveals
- subtle parallax layers
- hover states on cards/links
- animated metric counters only when meaningful
- page transitions if they feel instant and deliberate
- sticky storytelling in case studies

Bad-for-this-project motion patterns:

- endless scroll gimmicks
- heavy WebGL intros
- cursor circus
- animation that delays reading or obscures credibility

#### 4. Premium typography over heavy visuals
For operator/executive portfolios, typography and composition matter more than illustration fireworks.

Good signals:

- elegant serif + sans pairing, or a strong single sans system
- disciplined type scale
- wide margins / whitespace
- dark-on-light or soft-light neutral palettes
- restrained accent color system

#### 5. “Show your brain” content architecture
A lot of strong personal sites now blend portfolio + publishing. That matters here because GTM leadership is judged not just by shipped work, but by thinking quality.

Meaning: the site should let visitors see:

- what you did
- how you think
- what patterns you notice
- what you believe about AI/GTM/market creation

### Recommended visual direction

**Best-fit design north star:**

> A premium, editorial, AI-era operator site with the narrative confidence of a startup homepage and the evidence density of a top-tier case-study deck.

### Recommended interaction philosophy

- Fast first paint
- Minimal friction
- Motion only where it clarifies structure or adds delight
- Mobile experience should stay clean and readable
- Accessibility should win over cleverness

### Design references to emulate conceptually

Not literal cloning, but the right reference families are:

- Awwwards portfolios for pacing, type, section choreography
- Framer portfolio/agency templates for modular storytelling
- Strong SaaS landing pages for value proposition clarity
- Content-led marketer sites for proof + writing balance

### Anti-patterns to avoid

- “I’m a creative technologist” aesthetic if the content is really operator/GTM
- 12 vague buzzwords in the hero
- case studies without business outcomes
- over-designed navigation
- hidden contact info
- a blog full of thin posts that lowers signal
- huge motion payloads that slow the site

---

## 2) CMS options research: what should power the site?

## Core requirement framing

This portfolio likely needs to manage:

- homepage modules
- case studies
- writing/articles
- testimonials / quotes
- company logos / proof assets
- optional speaking/press entries
- perhaps role-tailored landing pages later

The CMS should optimize for:

- easy publishing
- low maintenance
- clean content modeling
- future flexibility
- no painful migration if the site grows

## Option A — Sanity

### Why it fits well
Sanity remains a strong fit for content-structured, custom-designed sites.

Strengths:

- Excellent for structured content
- Flexible schema design
- Strong editorial UX
- Real-time collaboration and preview options
- Very good fit with modern React/Next.js stacks
- Scales from simple portfolio to richer publishing platform

Weaknesses:

- More setup than no-code CMS choices
- GROQ is powerful but adds one more thing to learn/maintain
- Slightly more infrastructure/architecture overhead than Framer/Notion

### Best use case here
Choose Sanity if the goal is:

- a custom site
- clean structured case studies
- future publishing depth
- long-term flexibility without enterprise bloat

### Verdict
**Top recommendation for custom build.**

---

## Option B — Payload CMS

### Why it’s attractive
Payload is increasingly attractive because it is:

- open source
- TypeScript-native
- highly developer-friendly
- self-hostable / ownership-friendly
- flexible for apps and websites alike

Strengths:

- Great DX for TypeScript-heavy stacks
- Strong ownership / low vendor lock-in story
- Can live closer to the app layer
- Very flexible if the site later becomes more app-like

Weaknesses:

- More engineering-shaped than editorial-shaped for some users
- More setup/ops burden than fully managed SaaS CMS
- Potentially more than needed for a personal portfolio

### Best use case here
Choose Payload if:

- you want full control
- you prefer open-source ownership
- you don’t mind more setup
- the site may evolve into something more application-like

### Verdict
**Strong second choice for custom build**, especially if wanting maximum ownership and TypeScript-native workflows.

---

## Option C — Contentful

### Why it’s probably not the best fit
Contentful is polished and enterprise-grade, but for a personal portfolio it often feels like overkill.

Strengths:

- mature platform
- reliable infrastructure
- solid editorial tooling
- broad ecosystem

Weaknesses:

- expensive feel/value ratio for this scope
- more enterprise than necessary
- less appealing than Sanity/Payload for a lean personal brand site

### Verdict
**Not recommended unless there’s a specific ecosystem reason.**

---

## Option D — Notion as CMS

### Why people like it
Notion is attractive for speed and familiarity.

Strengths:

- very easy content authoring
- minimal learning curve
- great for rough drafting and internal planning
- useful as a temporary source of truth

Weaknesses:

- weaker for polished production websites
- content modeling is limited/awkward compared with real CMS tools
- preview, relationships, SEO control, and structured publishing are less elegant
- often brittle if stretched beyond basic use

### Best role for Notion here
Use Notion as:

- internal content staging
- editorial drafting
- source material planning

Not as the long-term production CMS unless optimizing almost entirely for speed over craft.

### Verdict
**Good backstage tool, weak final CMS choice.**

---

## Option E — Framer CMS / Framer-native build

### Why it’s compelling
Framer is compelling if the primary need is:

- visual polish fast
- easy launch
- nice built-in interactions
- fewer engineering decisions

Strengths:

- very fast path to a polished site
- modern templates and interactions out of the box
- good for marketing-style layouts
- easier non-dev editing than a custom-coded stack

Weaknesses:

- CMS flexibility is more limited than Sanity/Payload
- complex content models can become awkward
- long-term portability/control may be weaker
- advanced custom behavior can hit constraints

### Best use case here
Choose Framer if:

- speed matters more than architectural purity
- the site can stay relatively simple
- the design needs to look premium quickly
- content operations are light/moderate

### Verdict
**Best no/low-code launch option.**

---

## Option F — Traditional CMS (WordPress, Webflow CMS, Ghost)

### WordPress
Still viable, but probably not ideal here unless there’s a strong reason.

- Pros: mature, huge ecosystem, easy blogging
- Cons: plugin sprawl, maintenance overhead, can feel dated architecturally

### Webflow CMS
Good for visually-driven sites with moderate CMS needs.

- Pros: polished visual control, designer-friendly, solid CMS for collections
- Cons: content modeling can feel less elegant for deeper structured storytelling

### Ghost
Great for publishing-first brands, less ideal for portfolio-plus-case-study complexity.

- Pros: excellent writing/publishing experience
- Cons: not as strong for complex modular portfolio structures

### Verdict
- **Webflow:** acceptable if the site is designer-led and CMS depth is modest
- **Ghost:** good only if writing is the primary product
- **WordPress:** functional, but not the strongest strategic fit

---

## CMS recommendation stack

### Best overall recommendations

#### 1. **Sanity + custom frontend**
Best if the portfolio should feel bespoke, credible, scalable, and future-proof.

#### 2. **Framer**
Best if shipping quickly with premium visuals matters most.

#### 3. **Payload**
Best if you want ownership, TypeScript-native control, and don’t mind extra setup.

### My recommendation
For the “ideal” version rather than the fastest version:

> **Use a custom frontend with Sanity**.

Why:

- strong content modeling for case studies + writing
- enough flexibility for future growth
- better balance of editorial experience and developer control than the other options
- avoids overkill while still feeling premium

If speed becomes the top constraint, fallback to:

> **Framer now, custom/Sanity later only if needed**

---

## 3) Animation library research

## Principle first
This portfolio does not need animation as a personality replacement. It needs animation as:

- emphasis
- pacing
- spatial continuity
- perceived polish

## Option A — Framer Motion / Motion

Strengths:

- excellent for React-based UI animation
- declarative mental model
- great for component transitions, reveals, layout animations
- ideal for tasteful micro-interactions and page transitions
- easier to keep maintainable than heavy animation stacks

Weaknesses:

- not the best for ultra-complex timeline choreography
- less suited than GSAP for highly custom scroll scenes

### Best use here
Use for:

- hero entrance
- card hover states
- section reveals
- nav transitions
- modal/lightbox transitions
- subtle layout animation

### Verdict
**Default recommendation.**

---

## Option B — GSAP

Strengths:

- extremely powerful timeline control
- excellent for complex scroll-driven storytelling
- broad capability and maturity
- ideal for custom choreographed sequences

Weaknesses:

- easier to overbuild with
n- more imperative / more complexity
- can become a maintenance tax for a simple site

### Best use here
Use GSAP only if the site intentionally includes:

- sophisticated scroll narratives
- pinned sections with layered transitions
- precise art-direction sequences

### Verdict
**Use surgically, not as the default.**

---

## Option C — Three.js

Strengths:

- powerful 3D/WebGL capabilities
- highly immersive visuals possible
- useful for standout interactive hero moments

Weaknesses:

- heavier performance and implementation cost
- easier to distract from content
- can feel like design theater for an executive portfolio
- higher maintenance burden

### Best use here
Only justified if there is a conceptually meaningful interactive object/system tied to the personal brand or work.

### Verdict
**Probably unnecessary.**

---

## Option D — Spline

Strengths:

- easier path to tasteful 3D scenes than raw Three.js
- good for embedding subtle dimensionality and depth
- designer-friendly workflow

Weaknesses:

- can still add performance cost
- risks feeling ornamental
- often better for product/design portfolios than operator portfolios

### Best use here
Potentially acceptable for a subtle ambient hero background or diagrammatic object, but only if very lightweight.

### Verdict
**Optional accent, not core.**

---

## Recommended animation stack

### Best-fit stack
- **Primary:** Motion / Framer Motion
- **Optional secondary:** GSAP for one or two complex scroll sections only
- **Avoid by default:** Three.js
- **Only if tasteful and lightweight:** Spline

### Recommended motion budget

- 1–2 premium hero transitions
- subtle reveal choreography site-wide
- refined hover interactions
- maybe 1 flagship scroll narrative in a case study
- no heavy 3D dependency unless it materially strengthens the story

### Motion rules

- every animation should have a job
- target “premium calm,” not “look what I can code”
- respect reduced motion preferences
- optimize for responsiveness and readability first

---

## 4) Content strategy for VP / GTM roles

## What this audience actually needs
Recruiters, founders, and hiring managers for VP/GTM roles want to answer these questions fast:

1. What kind of GTM leader is this?
2. What markets/stages have they operated in?
3. Can they do strategy and execution?
4. What measurable outcomes did they drive?
5. Can they communicate clearly?
6. Do they understand AI-era product/market dynamics?
7. Would they add leadership signal to my company?

That means the site cannot behave like a generic creative portfolio. It needs to function like a **credibility engine**.

## Positioning recommendation

The site should position Connor as something like:

- GTM leader for AI / B2B / enterprise growth
- operator who connects narrative, market insight, and execution
- strategist who can translate ambiguity into traction
- builder of systems, not just campaigns

The exact wording can change, but the posture should be:

> strategic, commercially literate, high-agency, evidence-backed, AI-native

## Recommended messaging architecture

### Homepage hero
The hero should answer three things immediately:

- who you are
- what kind of work you do
- why it matters

Example structure:

- headline: sharp role/identity positioning
- subhead: domain/stage specialization + business value
- CTA set:
  - View case studies
  - Read my thinking
  - Get in touch

### Proof strip directly below the hero
Include early proof, not buried proof.

Examples:

- companies / sectors worked in
- headline metrics
- functional strengths
- testimonial excerpt
- notable outcomes

### Core sections to include

#### 1. Selected case studies
Not many. Just the strongest.

Ideal count at launch:
- 3 to 5 robust case studies

Each case study should cover:
- context
- problem/opportunity
- constraints
- strategic diagnosis
- GTM approach
- execution details
- metrics/outcomes
- lessons / transferable insight

#### 2. Thinking / writing
This is unusually important for GTM/executive roles.

Good topics:
- AI distribution patterns
- category creation / narrative design
- enterprise adoption behavior
- positioning and messaging systems
- market architecture
- sales/marketing alignment
- lessons from failed GTM assumptions

This section signals judgment, not just activity.

#### 3. About / operating style
This should be concise but specific.

Include:
- short bio
- industries/stages worked in
- how you like to operate
- what problems you’re best at solving
- what types of roles/opportunities are a fit

#### 4. Testimonials / references
Should be selective and high-signal.

Best testimonials mention:
- strategic clarity
- speed
- leadership
- cross-functional impact
- commercial outcomes

#### 5. Contact / conversion section
Should be stupidly easy.

Include:
- email
- LinkedIn
- optional calendar/contact form
- a short invitation tuned to likely visitors

## Case study format recommendation

For this audience, case studies should read more like mini strategy memos than design showcases.

### Recommended template

#### Snapshot
- company / context
- role
- stage / market
- duration
- key outcomes

#### Challenge
- what was broken, unclear, or high-stakes

#### Diagnosis
- what you saw that others may have missed

#### Strategy
- narrative, segmentation, channel, funnel, positioning, sales enablement, or product marketing choices

#### Execution
- what was actually built, launched, changed, or operationalized

#### Outcome
- quantified results where possible

#### Reflection
- what you learned / what general principle transfers

## Content tone

Best tone:
- intelligent
- direct
- commercially literate
- no fake humility, no inflated hype

Avoid:
- “growth hacker” energy
- generic leadership clichés
- unexplained acronyms everywhere
- vague self-brand poetry

## Suggested content pillars

### Pillar 1 — Track record
The proof that you’ve done meaningful work.

### Pillar 2 — Point of view
The proof that you think independently and clearly.

### Pillar 3 — Operating model
The proof that people can imagine working with you.

### Pillar 4 — Domain relevance
The proof that you understand AI, enterprise, and modern GTM conditions.

## Recommended IA for content

- Home
- Work / Case Studies
- Writing / Ideas
- About
- Contact

Optional:
- Resume
- Speaking / Press
- Toolkit / Resources

---

## 5) Competitor / adjacent portfolio research

## Important nuance
There are not many truly great “VP GTM at AI company” personal portfolio sites because many people in those roles either:

- rely on LinkedIn only
- use a simple personal site
- hide their best work inside decks, docs, and internal artifacts

So the better benchmark set is **adjacent archetypes**, not literal title matches.

## Useful competitor archetypes

### 1. Content-driven marketers/operators
Why they matter:
- they combine credibility, clear POV, and discoverability
- they often integrate writing well
- they demonstrate how thought leadership compounds portfolio value

Examples surfaced in research ecosystems:
- content-led marketer sites
- strategist/copywriter/operator portfolios
- marketer-creator sites with strong proof + writing

### 2. Product marketing / brand strategy leaders
Why they matter:
- close match on narrative, positioning, and market framing
- case-study structure often translates better than generic growth sites

### 3. SaaS/AI-focused design or strategy portfolios
Why they matter:
- their site architecture is often stronger than executive bios
- they are better at packaging complex work into persuasive flows

### 4. Founder/operator personal sites
Why they matter:
- strong precedent for high-signal hero messaging
- often better at communicating strategic judgment and market insight

## Competitive gaps to exploit

Most executive/personal sites are weak in one of these ways:

- too resume-like
- too vague
- too sparse on proof
- too dense and hard to scan
- visually dated
- writing disconnected from work

This creates a big opportunity.

### Winning differentiation
The portfolio can stand out by combining:

- premium modern design
- concise, serious positioning
- evidence-rich case studies
- AI/GTM thought leadership
- easy navigation and conversion

That combo is still surprisingly rare.

## Competitor feature audit: what to emulate vs beat

### Emulate
- clear hero positioning
- simple nav
- selected work instead of giant archives
- integrated writing
- social proof and testimonials

### Beat
- better quantified outcomes
- better strategy articulation
- better visual consistency
- stronger AI-era market perspective
- better case-study structure

---

## Recommended site architecture

## Primary sitemap

### 1. Home
Purpose: immediate positioning + proof + routing.

Sections:
- hero
- credibility strip
- selected case studies preview
- thinking/writing preview
- operating principles / strengths
- testimonial strip
- contact CTA

### 2. Case Studies index
Purpose: curated overview of selected work.

Features:
- 3–5 flagship stories
- optional filters by function / market / company stage
- concise preview cards

### 3. Individual case study pages
Purpose: convert interest into conviction.

Features:
- sticky mini-nav
- executive summary block
- outcomes highlighted early
- structured longform narrative
- supporting visuals/artifacts
- related ideas/posts

### 4. Writing / Ideas
Purpose: show strategic thinking and domain fluency.

Content types:
- essays
- memos
- short notes
- frameworks

### 5. About
Purpose: make the person behind the work legible.

Sections:
- short narrative bio
- career throughline
- operating style
- focus areas
- optional extended CV link

### 6. Contact
Purpose: reduce friction.

Include:
- direct email
- LinkedIn
- optional inquiry form
- optional “for recruiters / founders” note

## Optional pages

- Resume / dossier PDF page
- Speaking / podcast appearances
- Library / recommended reading
- AI/GTM frameworks archive

---

## Homepage wireframe spec

## Above the fold

### Left side / main content
- H1 with clear positioning
- 1–2 sentence supporting statement
- primary CTA: View case studies
- secondary CTA: Read writing / Contact

### Right side / supporting content
Choose one:
- portrait / restrained image treatment
- abstract brand visual
- subtle animated systems diagram
- lightweight ambient motion block

### Below hero fold
- logo strip / sectors / proof tags
- 3 quick metrics or outcomes
- one short testimonial or credibility quote

## Middle sections

### Selected work
- 3 featured cards max on home
- each card includes: challenge, role, result, CTA

### Thinking
- 2–4 recent or evergreen pieces
- emphasize quality over freshness theater

### Operating model
Examples of blocks:
- Narrative & positioning
- Enterprise GTM systems
- AI market sensing
- Cross-functional execution

### Social proof
- 2–4 selective testimonials
- headshots optional; company/role context more important

## Footer CTA
- concise invitation to connect
- email + LinkedIn visible

---

## Design system direction

## Brand attributes
- precise
- intelligent
- contemporary
- calm
- premium
- operator-grade

## Color direction
Best fit is likely one of:

### Option A — Soft light neutral
- warm white / off-white background
- charcoal text
- muted slate/stone neutrals
- one restrained accent (electric blue, muted green, or deep violet)

### Option B — Light editorial with dark sections
- mostly bright, readable pages
- selective dark bands for emphasis
- useful for breaking up long scrolls

### Option C — Dark mode primary
Possible, but riskier for executive readability.

My opinion: **light-first is the better default** for credibility, readability, and print-like calm.

## Typography direction

### Preferred system
- one premium sans plus one restrained serif accent, or
- one exceptional sans throughout

Use type to do the heavy lifting.

Needs:
- crisp H1/H2 scale
- readable body copy for long case studies
- strong quote/testimonial styling
- elegant stat/metric treatment

## Visual asset direction

Use:
- diagrams
- key screenshots
- market maps
- frameworks
- annotated artifacts
- sparing photography

Avoid relying only on generic laptop mockups.

---

## Content model spec (for CMS)

## Content types

### 1. CaseStudy
Fields:
- title
- slug
- summary
- company/client
- role
- industry
- stage
- date range
- challenge
- diagnosis
- strategy
- execution
- outcomes
- metrics (repeatable)
- testimonial references
- assets gallery
- related posts
- featured boolean
- seo title/description

### 2. Post
Fields:
- title
- slug
- excerpt
- body
- category
- tags
- publish date
- featured boolean
- related case studies
- seo title/description

### 3. Testimonial
Fields:
- quote
- person name
- title
- company
- portrait optional
- featured boolean

### 4. HomepageSettings
Fields:
- hero headline
- hero subhead
- CTA labels/links
- featured case studies
- featured posts
- proof stats
- logo strip items
- contact CTA copy

### 5. AboutPage
Fields:
- short bio
- long bio
- focus areas
- principles
- links

### 6. MediaAsset / ProofAsset
Fields:
- title
- type
- file/image/video
- caption
- associated case study

---

## Technical planning recommendations

## Build approach recommendation

### Ideal stack
- frontend: Next.js or equivalent modern React framework
- CMS: Sanity
- styling: Tailwind or a similarly fast design-system layer
- animation: Motion / Framer Motion
- deployment: Vercel or equivalent
- analytics: simple, privacy-respecting, low-noise

### Why this stack
- strong design freedom
- structured content
- excellent performance potential
- easy future expansion
- maintainable motion layer

## Performance requirements

- excellent mobile performance
- lightweight fonts
- minimal JS on content-heavy pages
- avoid oversized animation payloads
- images optimized and intentional
- no autoplay video unless it truly helps

## SEO / discovery requirements

This site should rank for Connor’s name and support discoverability for adjacent expertise.

Needs:
- clean metadata
- article schema where useful
- OG images
- descriptive URLs
- high-quality writing
- internal linking between case studies and essays

## Accessibility requirements

- reduced-motion support
- strong contrast
- keyboard navigability
- semantic headings
- legible type sizes/line lengths
- no crucial info hidden in hover-only states

---

## Recommended launch scope

## Phase 1 — Ideal MVP
Launch with only the essentials, but make them excellent.

### Must-have pages
- Home
- 3 case studies
- 3–5 writing pieces or 1–2 strong evergreen essays plus notes
- About
- Contact

### Must-have assets
- short bio
- headshot or equivalent visual identity asset
- testimonials (at least 2 strong ones)
- 3–6 meaningful metrics
- company/sector proof strip

### Must-have interactions
- polished hero
- subtle reveal motion
- card hovers
- elegant case-study transitions

## Phase 2 — Enrichment
- more writing
- recruiter-friendly dossier / resume page
- speaking/appearances
- deeper taxonomy and filtering
- richer proof artifacts

## Phase 3 — Advanced only if justified
- one flagship scroll story
- custom diagrams
- interactive framework visualizations
- role-specific landing pages

---

## Decision matrix

## If priority is “best long-term site”
Choose:
- **Custom frontend + Sanity + Motion**

## If priority is “ship polished site fastest”
Choose:
- **Framer**

## If priority is “full ownership / open-source bias”
Choose:
- **Payload + custom frontend**

## If priority is “publishing-first personal brand”
Choose:
- **Ghost or Sanity**, depending on how deep case studies need to be

---

## Final recommendation

## Recommended concept
Build a **premium editorial operator portfolio** for AI/GTM leadership.

### Core characteristics
- clear above-the-fold positioning
- early proof and metrics
- curated, strategy-rich case studies
- integrated thought leadership
- restrained but high-quality motion
- clean CMS-backed publishing workflow

## Recommended implementation path

### Best ideal plan
1. **Design for custom frontend + Sanity**
2. Use **Motion / Framer Motion** as primary animation layer
3. Keep visual language minimal, editorial, premium
4. Prioritize **case-study quality and writing quality** over exotic visuals
5. Avoid heavy 3D unless there is a compelling brand reason

## Strongest strategic insight from this research

For VP/GTM roles, the portfolio’s competitive edge is not “more design.” It is:

- **better framing**
- **better evidence**
- **better writing**
- **better packaging of strategic judgment**

That’s the gap to win.

---

## Concrete next planning steps (still pre-build)

1. Define the exact positioning statement for the homepage hero
2. Inventory available case-study candidates and supporting metrics
3. Select 3–5 flagship stories
4. Draft content model in final schema form
5. Choose platform path:
   - Sanity/custom
   - Framer
   - Payload/custom
6. Collect reference set of 10–15 visual examples across:
   - typography
   - homepage structure
   - case-study layout
   - motion style
7. Draft final sitemap and page-by-page content requirements
8. Create low-fidelity wireframes before any visual design/build starts

## Suggested default choice if deciding today

- **Platform:** Sanity + custom frontend
- **Animation:** Motion, with optional GSAP only for one advanced story section
- **Tone:** premium, sharp, restrained
- **Content emphasis:** case studies + thinking
- **Design emphasis:** typography, rhythm, proof, and calm confidence
