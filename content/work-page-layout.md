# /work Page Layout Sketch

**Purpose:** Convert TSI metrics screenshots into a compelling, scannable proof page  
**Primary Asset:** Salesforce 32K prospects (hero)  
**Secondary Assets:** 4 supporting dashboards in carousel/grid  

---

## Section 1: Hero — "32,000 Reasons"

**Layout:** Full-bleed hero with asymmetric text overlay

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│    [Salesforce 32K Screenshot — Full Width]                 │
│                                                             │
│    ┌─────────────────────────────────┐                      │
│    │  32,000                        │                      │
│    │  ENRICHED PROSPECTS            │                      │
│    │                                 │                      │
│    │  From Apollo sourcing to       │                      │
│    │  Salesforce sales handoff.     │                      │
│    │                                 │                      │
│    │  [See the system →]            │                      │
│    └─────────────────────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Height: 70vh (min 500px, max 800px)
- Overlay: Left-aligned text block, glassmorphism background
- Screenshot: Slight scale (1.05) with subtle Ken Burns drift
- CTA: "See the system" → scrolls to Section 2

**Responsive:**
- Desktop: Text overlay on left (40% width)
- Mobile: Text below image, stacked

---

## Section 2: The Pipeline Engine (Carousel)

**Layout:** Horizontal swipe carousel with 4 proof points

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   THE PIPELINE ENGINE              [◀] [▶]                  │
│   ─────────────────────                                     │
│                                                             │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│   │             │ │             │ │             │          │
│   │   APOLLO    │ │   HUBSPOT   │ │  LINKEDIN   │          │
│   │             │ │             │ │             │          │
│   │ [Screenshot]│ │ [Screenshot]│ │ [Screenshot]│          │
│   │             │ │             │ │             │          │
│   │ Source      │ │ Convert     │ │ Amplify     │          │
│   │ 32K+ leads  │ │ to pipeline │ │ with paid   │          │
│   │             │ │             │ │             │          │
│   └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│   ┌─────────────┐                                          │
│   │    GA4      │  ← Slide 4 (off-screen initially)        │
│   │  [Screenshot]│                                         │
│   │             │                                          │
│   │ Organic     │                                          │
│   │ inbound     │                                          │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Card size: 320px wide, aspect ratio 4:3
- Gap: 24px
- Visible at once: 3 (desktop), 1 (mobile)
- Auto-advance: 5 seconds (pause on hover)
- Indicators: Dot pagination below

**Interactions:**
- Click card → opens lightbox with full screenshot + caption
- Swipe enabled on touch devices
- Keyboard: Left/right arrows navigate

---

## Section 3: By The Numbers

**Layout:** Sticky metric cards that reveal on scroll

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   BY THE NUMBERS                                            │
│   ───────────────                                           │
│                                                             │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │   32K    │  │   498K   │  │   +23%   │  │   $XM    │   │
│   │ PROSPECTS│  │IMPRESSIONS│  │   MoM    │  │ PIPELINE │   │
│   │          │  │          │  │  GROWTH  │  │          │   │
│   │ [mini]   │  │ [mini]   │  │ [mini]   │  │ [mini]   │   │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│   Hover any card to expand → shows mini screenshot + context│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Card style: White background, subtle shadow, rounded corners (12px)
- Number: 48px bold, dark
- Label: 14px uppercase, muted
- Hover: Card lifts (transform: translateY(-4px)), reveals thumbnail

**Animation:**
- Stagger reveal on scroll (100ms delay between cards)
- Count-up animation for numbers (0 → 32K)

---

## Section 4: The Full Stack

**Layout:** Vertical timeline showing platform ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   THE FULL STACK                                            │
│   ──────────────                                            │
│                                                             │
│        ┌─────────────┐                                      │
│        │   APOLLO    │ ← Sourcing & enrichment              │
│        │  [thumbnail]│                                      │
│        └──────┬──────┘                                      │
│               │                                             │
│        ┌──────▼──────┐                                      │
│        │  SALESFORCE │ ← Database & scoring                 │
│        │  [thumbnail]│                                      │
│        └──────┬──────┘                                      │
│               │                                             │
│        ┌──────▼──────┐                                      │
│        │   HUBSPOT   │ ← Pipeline & nurture                 │
│        │  [thumbnail]│                                      │
│        └──────┬──────┘                                      │
│               │                                             │
│        ┌──────▼──────┐                                      │
│        │   LINKEDIN  │ ← Paid amplification                 │
│        │  [thumbnail]│                                      │
│        └─────────────┘                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Timeline line: 2px, gradient (blue → purple)
- Node dots: 12px circles, platform brand colors
- Thumbnails: 80px × 60px, rounded, grayscale → color on hover

---

## Section 5: Case Study Deep-Dive

**Layout:** Two-column with large screenshot + narrative

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CASE STUDY: TSI DEMAND GEN TRANSFORMATION                 │
│   ─────────────────────────────────────────                 │
│                                                             │
│   ┌─────────────────────┐  ┌─────────────────────────────┐ │
│   │                     │  │                             │ │
│   │  [Large screenshot] │  │  The Challenge              │ │
│   │  (cycles on click)  │  │  ─────────────              │ │
│   │                     │  │  TSI needed a scalable...   │ │
│   │  ○ ○ ● ○            │  │                             │ │
│   │                     │  │  The Solution               │ │
│   │                     │  │  ────────────               │ │
│   │                     │  │  Built an integrated...     │ │
│   │                     │  │                             │ │
│   │                     │  │  The Results                │ │
│   │                     │  │  ───────────                │ │
│   │                     │  │  • 32K prospects enriched   │ │
│   │                     │  │  • 498K organic impressions │ │
│   │                     │  │  • $XM pipeline generated   │ │
│   │                     │  │                             │ │
│   │                     │  │  [Download full case study] │ │
│   │                     │  │       [PDF, 2.4MB]          │ │
│   └─────────────────────┘  └─────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Left: 55% — Screenshot gallery with thumbnail strip below
- Right: 45% — Narrative text, result bullets, download CTA
- Gallery: Click thumbnail → main image swap
- Download: Styled button with file size disclosure

---

## Responsive Behavior

### Desktop (1200px+)
- All sections at full layout
- Carousel shows 3 cards
- Side-by-side layouts maintained

### Tablet (768px–1199px)
- Hero text overlay widens to 60%
- Carousel shows 2 cards
- Stack: Case study → single column

### Mobile (<768px)
- Hero: Text below image
- Carousel: Single card, swipe only
- Metrics: 2×2 grid
- Timeline: Collapse to accordion
- Case study: Image first, then text

---

## Component Library

### ImageCard
```
┌─────────────────┐
│                 │
│   [screenshot]  │
│                 │
├─────────────────┤
│ Platform Name   │
│ Brief context   │
│ [View full →]   │
└─────────────────┘
```

### MetricCard
```
┌─────────────────┐
│                 │
│     32K         │
│   PROSPECTS     │
│                 │
│   [thumbnail]   │
└─────────────────┘
```

### Lightbox
```
┌─────────────────────────────────┐
│  ╳                              │
│                                 │
│     [Full screenshot]           │
│                                 │
│     Caption text here...        │
│                                 │
│              ○ ○ ● ○            │
└─────────────────────────────────┘
```

---

## Asset Mapping

| Section | Asset File | Usage |
|---------|------------|-------|
| Hero | `{7FD1D5AB...}.png` | Full-bleed background |
| Carousel 1 | `{33456B58...}.png` | Apollo card |
| Carousel 2 | `{3C777BDD...}.png` | HubSpot card |
| Carousel 3 | `{5336693E...}.png` | LinkedIn card |
| Carousel 4 | `{F2B39709...}.png` | GA4 card |
| Metrics | All 5 | Thumbnails in cards |
| Timeline | All 5 | Small thumbnails |
| Case Study | All 5 | Gallery rotation |

---

## Next Steps

1. **Compress assets** to WebP (60-80KB target)
2. **Implement lazy loading** for below-fold images
3. **Add lightbox component** for full-size viewing
4. **Create case study PDF** for download CTA
5. **Build carousel** with swipe/keyboard support

---

*Layout sketch generated: 2026-02-02*
