/**
 * Cover content module (spec §3 cover anatomy).
 *
 * Every string here is copied verbatim from the approved copy deck,
 * `Resume & Positioning/Portfolio Copy Deck - 2026-08-05.md`, section 1. The
 * cover page never writes fresh prose; it assembles what is in this file.
 *
 * Claim values are NOT in this module. The deck's `{P5}`, `{S1}`, `{S2}`,
 * `{S3}` and `{S6}` tokens resolve in `app/page.tsx` through
 * `renderableProofMetrics()`, and `{S4}` / `{S5}` resolve through
 * `lib/word-counts.ts`. Sentence builders below take the resolved strings as
 * arguments so the copy stays here and the gate stays there.
 */

/* ------------------------------------------------------------------ */
/* 1.1 Masthead                                                        */
/* ------------------------------------------------------------------ */

export const masthead = {
  /** Serif tagline, right-aligned. Deck 17.1, thesis A. */
  tagline: "I tell stories people remember, and I build the systems that make them true.",
  /** Identity lockup. */
  identity: "Marketing executive. GTM systems engineer.",
  /** Mono role and location line. */
  role: "VP of Marketing & GTM (acting CMO). Chicago.",
} as const;

/* ------------------------------------------------------------------ */
/* 1.2 Intro                                                           */
/* ------------------------------------------------------------------ */

/** Mono proof lede. `pipeline` is P5, resolved by the caller. */
export function introLede(pipeline: string): string {
  return `${pipeline} influenced pipeline, built from zero infrastructure.`;
}

/**
 * Deck 17.1 intro, paragraph one. `years` is S1, `promotions` is S8, both
 * resolved by the caller. Employer naming per bank A6.
 */
export function introStory(years: string, promotions: string): string {
  return `I came in as TSI's first digital marketing hire and stayed ${years} years, ${promotions} promotions, and one acting-CMO seat. Everything in this manual is a system I built and still run: positioning, demand, attribution, pipeline inspection, governed AI. Every number resolves from a governed claim register, and the largest one is on this page.`;
}

/**
 * Deck 17.1 intro, paragraph two. `pipelineSoft` is P6, the softened
 * order-of-magnitude form, resolved by the caller. The trailing sentence is
 * rendered by the page as a link to /story.
 */
export function introHook(pipelineSoft: string): string {
  return `The story of how a comic-book kid ended up running a ${pipelineSoft} takes three minutes.`;
}

/** Deck 17.1. The linked closer of the intro hook. */
export const introHookLink =
  "It starts with a Palm Pilot and a man named Tom Bedecarre.";

/* ------------------------------------------------------------------ */
/* 1.3 Three doors (deck 17.2)                                         */
/* ------------------------------------------------------------------ */

export type Door = { label: string; time: string; line: string; href: string };

export const threeDoors: Door[] = [
  {
    label: "The proof",
    time: "Thirty seconds.",
    line: "The flagship chapter and the numbers that survived the register.",
    href: "/work",
  },
  {
    label: "The builds",
    time: "Sixty seconds.",
    line: "The software I ship, named and dated.",
    href: "/builds",
  },
  {
    label: "The story",
    time: "Three minutes.",
    line: "Palm Pilots, Dylan records, and the founder of AKQA.",
    href: "/story",
  },
];

/* ------------------------------------------------------------------ */
/* 1.4 Table of contents                                               */
/* ------------------------------------------------------------------ */

export type CoverTocEntry = {
  /** Entry number inside its section. */
  num: string;
  title: string;
  href: string;
  /** One-sentence outcome dek. */
  dek: string;
  /**
   * Key into `lib/word-counts.ts` for entries that carry a build-computed
   * count. Bespoke TSX pages omit it and render no count.
   */
  countKey?: string;
};

export type CoverTocSection = {
  num: number;
  title: string;
  entries: CoverTocEntry[];
};

export const tocSections: CoverTocSection[] = [
  {
    num: 1,
    title: "Revenue systems",
    entries: [
      {
        num: "01",
        title: "Revenue operating system from zero",
        href: "/case-studies/revenue-operations-signal-to-revenue",
        countKey: "case-studies/revenue-operations-signal-to-revenue",
        dek: "The funnel definitions, lifecycle stages, routing, and reporting that turned scattered activity into one system.",
      },
      {
        num: "02",
        title: "Governed AI operating layer",
        href: "/case-studies/ai-native-gtm",
        countKey: "case-studies/ai-native-gtm",
        dek: "A multi-agent layer that stages GTM work behind human approval gates and audit trails.",
      },
      {
        num: "03",
        title: "Ghost pipeline detector",
        href: "/case-studies/revenue-operations-pipeline-truth",
        countKey: "case-studies/revenue-operations-pipeline-truth",
        dek: "Pipeline reviews stopped rewarding optimism once close-date drift and stage aging were instrumented.",
      },
      {
        num: "04",
        title: "Signal-based demand engine",
        href: "/case-studies/bdr-pod-signal-to-meeting",
        countKey: "case-studies/bdr-pod-signal-to-meeting",
        dek: "Buying signals routed to a tiered response model, with a defined window on the highest-priority ones.",
      },
      {
        num: "05",
        title: "Platform narrative and ICP intelligence",
        href: "/case-studies/gtm-strategy-positioning",
        countKey: "case-studies/gtm-strategy-positioning",
        dek: "I built the positioning framework on five pillars and the ICP research that justifies them.",
      },
      {
        num: "06",
        title: "Post-acquisition GTM bridge",
        href: "/case-studies/debtnext-integration",
        countKey: "case-studies/debtnext-integration",
        dek: "Marketing integration across acquired brands, web properties, and a regulated Canadian business unit.",
      },
      {
        num: "07",
        title: "Marketing analytics architecture",
        href: "/case-studies/marketing-analytics-architecture",
        countKey: "case-studies/marketing-analytics-architecture",
        dek: "Web analytics and CRM joined into one performance ledger that reconciles itself.",
      },
      {
        num: "08",
        title: "Leadership and team operating system",
        href: "/case-studies/leadership-team-development",
        countKey: "case-studies/leadership-team-development",
        dek: "How a near-zero-budget function became a board-backed team with an international model.",
      },
      {
        num: "09",
        title: "Outcome-first narrative architecture",
        href: "/case-studies/outcome-first-repositioning",
        countKey: "case-studies/outcome-first-repositioning",
        dek: "Each claim in the messaging system carries its proof and its approval state.",
      },
      {
        num: "10",
        title: "Two-function marketing operating model",
        href: "/case-studies/marketing-org-design-governance",
        countKey: "case-studies/marketing-org-design-governance",
        dek: "Splitting marketing into a demand function and a narrative function, with governance thin enough to ship through.",
      },
      {
        num: "11",
        title: "Enterprise digital presence rebuild",
        href: "/case-studies/enterprise-site-overhaul",
        countKey: "case-studies/enterprise-site-overhaul",
        dek: "We rebuilt on one architecture, then put a schema under the content so pages stopped being hand-built.",
      },
      {
        num: "12",
        title: "Strategy memo: how I think before I build",
        href: "/case-studies/strategy-memo",
        dek: "The questions I answer before writing a line of a plan.",
      },
    ],
  },
  {
    num: 2,
    title: "The operator",
    entries: [
      {
        num: "01",
        title: "How I move",
        href: "/edge#01-taste-applied-at-velocity",
        dek: "Speed and taste usually trade against each other. These are the habits that keep both.",
      },
      {
        num: "02",
        title: "How I make ambiguity legible",
        href: "/edge#04-narrative-construction",
        dek: "Turning fog into something a team can act on.",
      },
      {
        num: "03",
        title: "How I scale judgment",
        href: "/edge#08-delegation-to-non-humans",
        dek: "How judgment gets out of my head and into something someone else can run.",
      },
    ],
  },
  {
    num: 3,
    title: "Writing",
    entries: [
      {
        num: "01",
        title: "Revenue operating system from zero",
        href: "/longform/revenue-operating-system-from-zero",
        countKey: "longform/revenue-operating-system-from-zero",
        dek: "The long version, written while the system was still being built.",
      },
      {
        num: "02",
        title: "Signal-based demand engine",
        href: "/longform/signal-based-demand-engine",
        countKey: "longform/signal-based-demand-engine",
        dek: "How buying signals became a routing model with response windows attached.",
      },
      {
        num: "03",
        title: "Outcome-first narrative architecture",
        href: "/longform/outcome-first-narrative-architecture",
        countKey: "longform/outcome-first-narrative-architecture",
        dek: "Why messaging falls apart when the proof behind it isn't governed.",
      },
      {
        num: "04",
        title: "Post-acquisition SaaS bridge",
        href: "/longform/post-acquisition-saas-bridge",
        countKey: "longform/post-acquisition-saas-bridge",
        dek: "What it takes to merge an acquired product into a GTM motion that already exists.",
      },
    ],
  },
  {
    num: 4,
    title: "Resume",
    entries: [
      {
        num: "01",
        title: "Resume",
        href: "/resume",
        dek: "First digital marketing hire to VP of Marketing and GTM, with the roles, dates, and systems attached.",
      },
    ],
  },
  {
    num: 5,
    title: "Appendix",
    entries: [
      {
        num: "01",
        title: "Story",
        href: "/story",
        dek: "Writer, then builder, then executive, and how those three keep feeding each other.",
      },
      {
        num: "02",
        title: "RevOps capacity planner",
        href: "/tools/revops-capacity-planner",
        dek: "A working reverse-funnel calculator that turns a revenue target into the volume you would need.",
      },
      {
        num: "03",
        title: "Colophon",
        href: "#colophon",
        dek: "Type, stack, and the design language this manual borrows from.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 1.5 Stats block                                                     */
/* ------------------------------------------------------------------ */

/** Canonical phrasing. Reuse verbatim. */
export const statsPreamble =
  "Every number on this site resolves from a governed claim register. The ones that don't clear the gate aren't here.";

export const statsCaption = "Site figures";

/** Row labels, in deck order. Values are resolved by the caller. */
export const statsLabels = {
  years: "Years building GTM systems",
  verticals: "Regulated verticals",
  acquisitions: "Acquisitions integrated",
  chapters: "Chapters published",
  words: "Words published",
} as const;

/* ------------------------------------------------------------------ */
/* 1.6 FAQ                                                             */
/* ------------------------------------------------------------------ */

export type FaqEntry = { question: string; answer: string };

/**
 * Deck 17.6: the cover keeps three entries (availability, identity, AI
 * practice). The other three render on /story as "asked and answered" in
 * phase 4; they live in `storyFaqEntries` below so no approved copy is lost.
 */
export const coverFaqEntries: FaqEntry[] = [
  {
    question: "Why leave after more than a decade in one place?",
    answer:
      "I built the machine there from the ground up, and I've run out of ceiling. The next chapter should be somewhere AI-native or software-led, where GTM systems and hands-on building are central to the strategy instead of a side effect of it.",
  },
  {
    question: "Are you technical enough to call yourself a GTM engineer?",
    answer:
      "By training I'm a marketer. In practice I build with Python, TypeScript, React, SQL, APIs, retrieval workflows, MCP integrations, and agent orchestration, and I prototype the system myself before asking anyone to staff it. The edge is knowing which piece of GTM friction is worth automating and which decisions should stay human.",
  },
  {
    question: "Are you too senior to still build?",
    answer:
      "I do both. I've operated at acting-CMO level and still write the workflows, prompts, dashboards, and automations when speed or clarity needs it.",
  },
];

/** Held for /story, phase 4. Approved deck copy, verbatim. */
export const storyFaqEntries: FaqEntry[] = [
  {
    question: "You built in regulated services. Does that transfer to SaaS?",
    answer:
      "The category is different. The GTM complexity is harder. A PE-backed enterprise, regulated verticals, multiple acquisitions, long enterprise cycles, and compliance review on every claim that leaves the building. I also ran the GTM bridge for an acquired software product and built the AI systems myself. What transfers is building GTM infrastructure under constraint.",
  },
  {
    question: "Have you built a RevOps function from the ground up?",
    answer:
      "Yes, from nothing. Funnel definitions, lifecycle stages, routing, attribution, SLA logic, pipeline inspection, and the executive cadence sitting on top of it. There was no inherited system to optimize, which is why I know how every piece of it works.",
  },
  {
    question: "What's your biggest gap?",
    answer:
      "I haven't led marketing at an AI-native or developer-tools company. I've been the buyer and the builder inside that stack rather than the vendor selling it. The rest of the pattern moves over cleanly: technical buyers, long cycles, and a story that has to survive scrutiny.",
  },
];

/* ------------------------------------------------------------------ */
/* 1.7 CTA                                                             */
/* ------------------------------------------------------------------ */

export const cta = {
  label: "Email Connor",
  href: "mailto:connor.laughlin@gmail.com",
  secondary:
    "Open to VP Marketing, Head of GTM, VP Revenue Operations, and GTM engineering roles at AI-native B2B SaaS and PE-backed growth companies. Chicago, hybrid or remote.",
} as const;

/* ------------------------------------------------------------------ */
/* Metadata (deck 12.4)                                                */
/* ------------------------------------------------------------------ */

export const coverMeta = {
  title: "Connor J. Laughlin",
  description:
    "Marketing executive and GTM systems engineer in Chicago. A manual of the revenue systems he has built: positioning, demand capture, CRM and attribution, pipeline inspection, and governed AI workflows.",
} as const;
