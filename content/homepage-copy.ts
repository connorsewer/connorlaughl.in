/**
 * Homepage copy for connorlaughl.in.
 *
 * The strings here are the single source of truth for above-the-fold and
 * section copy. Keep voice rules from CLAUDE.md and the spec:
 *  - sentence case
 *  - short paragraphs
 *  - plain business nouns
 *  - no em-dashes in body copy
 *  - active verbs: I built, I designed, I turned, I led
 */

export const hero = {
  eyebrow: "Connor J. Laughlin. Chicago. VP of Marketing & GTM (acting CMO).",
  headlinePrimary: "Marketing executive. GTM systems engineer.",
  /** Alternate H1 for the more forceful posture if Connor approves it. */
  headlineAlt: "I build revenue engines from zero.",
  subheadPart1:
    "I built the GTM infrastructure behind $159.4M in marketing-influenced pipeline at a roughly $460M PE-backed enterprise. The work spans positioning, demand generation, CRM and attribution, RevOps reporting, governed AI workflows, sales enablement, and executive operating cadence.",
  subheadPart2:
    "My edge is the combination: acting-CMO judgment, RevOps mechanics, and enough hands-on technical depth to build the systems myself.",
  primaryCta: { text: "See the case studies", href: "/case-studies" },
  secondaryCta: { text: "Talk about a role", href: "#contact" },
} as const;

export const whatIBuild = {
  eyebrow: "What I build",
  heading: "GTM strategy is only as good as the system underneath it.",
  intro:
    "I work where marketing, sales, data, AI, and executive reporting collide. The output is not a campaign calendar. It is a revenue operating layer people can inspect, run, and improve.",
  cards: [
    {
      title: "Revenue infrastructure",
      body: "Lifecycle definitions, attribution, CRM architecture, routing rules, funnel math, and pipeline inspection.",
    },
    {
      title: "Executive marketing leadership",
      body: "Budget cases, board-ready reporting, team design, agency and vendor leadership, and operating cadence.",
    },
    {
      title: "AI GTM systems",
      body: "Governed proposal workflows, answer libraries, agentic content operations, RAG, n8n, MCP-style tooling, and human review gates.",
    },
    {
      title: "Narrative and proof architecture",
      body: "ICP, positioning, competitive intelligence, claims governance, proof libraries, sales enablement, and executive POV.",
    },
    {
      title: "Digital growth systems",
      body: "Programmatic SEO and GEO, schema, content operations, conversion paths, analytics instrumentation, and technical web governance.",
    },
  ],
} as const;

export const builtFromZero = {
  eyebrow: "Built from zero",
  heading: "First digital hire to VP of Marketing & GTM (acting CMO).",
  body: "I did not inherit a mature GTM machine. I built the web, analytics, content, demand, attribution, CRM, AI, sales enablement, and executive reporting layers over 13+ years and 4 promotions.",
  bullets: [
    "Built marketing from near-$0 budget and 2 offshore resources into a board-justified investment program.",
    "Led a 4-direct-report core team inside a 16-person international marketing model across the U.S., Canada, Guatemala, India, and the Philippines.",
    "Managed GTM through 7 acquisitions, 8 acquired brands, 3 web properties, 5 regulated verticals, and a Canadian business unit across 13 provincial jurisdictions.",
    "Reported marketing performance to executive leadership and PE operating partners.",
  ],
} as const;

export const impactLedgerCopy = {
  eyebrow: "Impact ledger",
  heading: "The numbers behind the operating system.",
  intro:
    "Every metric below has a claim posture in source. Exact figures are shown with the context that earned them. Softened phrasing is used where the raw artifact remains private.",
} as const;

export const signatureSystems = {
  eyebrow: "Signature systems",
  heading: "Six systems I built and ran.",
  intro:
    "Each card states the business problem, what I built, the proof it produced, and the hire signal underneath.",
} as const;

export const contact = {
  eyebrow: "Get in touch",
  heading: "If you need the strategy and the system, let's talk.",
  body: "I am focused on VP of Marketing & GTM, CMO, Head of GTM, VP Revenue Operations, Head of Growth, and GTM Engineer roles. Best fit: AI-native B2B SaaS, enterprise software, vertical SaaS, and PE-backed companies where growth depends on building the operating layer, not managing a campaign calendar.",
  primaryCta: {
    text: "Email Connor about a role",
    href: "mailto:connor.laughlin@gmail.com?subject=GTM%20role",
  },
  secondaryCta: { text: "View case studies", href: "/case-studies" },
  advisoryLine:
    "I also take selective advisory conversations when the problem is tightly tied to GTM systems, AI workflow design, or revenue infrastructure.",
  linkedin: "https://linkedin.com/in/connorlaughlin",
} as const;

export type TimelineEntry = { year: string; role: string; company: string };

export const timeline: TimelineEntry[] = [
  { year: "2009 to 2012", role: "BD & Marketing", company: "Vatican Museums" },
  { year: "2012 to 2014", role: "Executive Search Associate", company: "Reilly Partners" },
  { year: "2013 to 2015", role: "Content Creator", company: "Brad's Deals" },
  {
    year: "2015 to Present",
    role: "Digital Marketing Manager to VP, Marketing & GTM (acting CMO)",
    company: "TSI",
  },
];
