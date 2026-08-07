/**
 * Claim posture model.
 *
 * The public UI is allowed to render confident numbers. The source data here
 * preserves the governance posture so future edits respect the canonical
 * approvals in:
 *  - Career Builder Permanent Claim Approvals - 2026-05-12.md
 *  - Public Safety Claim Subset - 2026-05-12.md
 *  - Portfolio Claims Register - 2026-05-11.md
 */
export type ClaimPosture =
  | "approved-exact-with-context"
  | "verified"
  | "directional"
  | "company-level"
  | "internal-only"
  | "target"
  | "projected"
  | "do-not-use-as-personal-achievement";

export type PublicUse = "show" | "soften" | "hide" | "label-as-target";

export type ProofMetric = {
  value: string;
  label: string;
  /** Plain language context that travels with the number in public UI. */
  context: string;
  /** Public-safe value for softened/target claims. Used instead of value. */
  publicValue?: string;
  /** Public-safe label for softened/target claims. Used instead of label. */
  publicLabel?: string;
  /** Public-safe context for softened/target claims. Used instead of context. */
  publicContext?: string;
  /** ID from Portfolio Claims Register where applicable. */
  claimId?: string;
  /** Governance posture; lives in source so future edits cannot drift. */
  posture: ClaimPosture;
  /** How the metric should appear in public UI. */
  publicUse: PublicUse;
  /** Optional source citation for internal review. Never rendered. */
  sourceNote?: string;
};

export type RenderableProofMetric = Pick<ProofMetric, "value" | "label" | "context">;

const SOFTENED_METRIC_FALLBACK: RenderableProofMetric = {
  value: "Directional proof",
  label: "private metric held for review",
  context: "Exact value remains gated until public-use approval.",
};

const TARGET_METRIC_FALLBACK: RenderableProofMetric = {
  value: "Target",
  label: "target metric",
  context: "Forward-looking claim labeled as a target.",
};

/**
 * Returns the only ProofMetric shape that public routes may render.
 *
 * Raw `value` / `label` / `context` are rendered only when publicUse === "show".
 * Softened and target claims must use public-safe overrides, with conservative
 * fallbacks that avoid leaking exact private values. Hidden claims are dropped.
 */
export function renderableProofMetric(metric: ProofMetric): RenderableProofMetric | null {
  if (metric.publicUse === "hide") return null;

  if (metric.publicUse === "soften") {
    return {
      value: metric.publicValue ?? SOFTENED_METRIC_FALLBACK.value,
      label: metric.publicLabel ?? SOFTENED_METRIC_FALLBACK.label,
      context: metric.publicContext ?? SOFTENED_METRIC_FALLBACK.context,
    };
  }

  if (metric.publicUse === "label-as-target") {
    return {
      value: metric.publicValue ?? TARGET_METRIC_FALLBACK.value,
      label: metric.publicLabel ?? TARGET_METRIC_FALLBACK.label,
      context: metric.publicContext ?? TARGET_METRIC_FALLBACK.context,
    };
  }

  return {
    value: metric.publicValue ?? metric.value,
    label: metric.publicLabel ?? metric.label,
    context: metric.publicContext ?? metric.context,
  };
}

export function renderableProofMetrics(metrics: ProofMetric[]): RenderableProofMetric[] {
  return metrics.flatMap((metric) => {
    const renderable = renderableProofMetric(metric);
    return renderable ? [renderable] : [];
  });
}

/**
 * Stats row S2, shared by the legacy hero strip and the manual cover stats.
 *
 * Tier: Amber with standing approval (P19). One object, two references, so the
 * two surfaces can never drift.
 */
const regulatedVerticals: ProofMetric = {
  value: "5 verticals",
  label: "regulated GTM operating scope",
  context:
    "Regulated business lines run as one GTM operating system, with an international footprint",
  /* The manual cover sets this count beside its own noun, in a stat row
     labelled "regulated verticals" and in a sentence that supplies the same
     word. The bare numeral is the public-safe render there; the approval's
     context requirement travels with it through `context` (stat-row screen
     reader text) and through the surrounding sentence in prose. */
  publicValue: "5",
  publicLabel: "regulated verticals",
  posture: "approved-exact-with-context",
  publicUse: "show",
  sourceNote:
    "BUILDER 2026-05-13 initiative-facts approval; ground truth candidate-profile-master-v3.md Company Context.",
};

/**
 * Spine row P5. Amber with standing approval, cover route only.
 *
 * One object, referenced by both the legacy hero strip and the manual cover's
 * proof lede, so the two surfaces can never drift. The exact-numeral scoping
 * in the copy deck applies to THIS usage, the cover lede: the figure itself
 * travels to no other page, no OG image, and no metadata string.
 *
 * The softened order-of-magnitude form (P6, below) is a separate object and
 * does travel, to the three chapters the deck places it on. Chapter proof
 * blocks additionally render module-posture metrics; whether that scoping
 * should tighten is Connor's Task 21 review, recorded in the overnight log.
 */
const influencedPipeline: ProofMetric = {
  value: "$159M+",
  label: "marketing-influenced pipeline FY25",
  context: "GTM infrastructure built from zero",
  claimId: "CJL-CLAIM-001",
  posture: "approved-exact-with-context",
  publicUse: "show",
  sourceNote:
    "candidate-profile-master-v3.md:96-103; approved with context. Rendered as " +
    "the spine's P5 phrasing, '$159M+'. DECISIONS Gate 1 clears that exact " +
    "string, not the $159.4M source value; round-1 review flagged the drift " +
    "on 2026-08-06 and the render now conforms to the approved form.",
};

/** P5, exported for the cover proof lede. Cover route only. */
export const coverProofLede: ProofMetric[] = [influencedPipeline];

/** Six hero proof statistics rendered above the fold. */
export const heroProofStrip: ProofMetric[] = [
  influencedPipeline,
  {
    value: "Material net-new revenue",
    label: "revenue contribution FY25",
    context: "GTM strategy, demand generation, and sales enablement infrastructure",
    publicValue: "Material net-new revenue",
    publicLabel: "revenue contribution FY25",
    publicContext:
      "GTM strategy, demand generation, and sales enablement infrastructure. The exact figure is a company-level number and stays private.",
    claimId: "CJL-CLAIM-002",
    posture: "company-level",
    publicUse: "soften",
    sourceNote:
      "Posture corrected 2026-08-06 against REG, where CJL-CLAIM-002 is company-level. No spine proof point clears the exact figure, so the exact value is withheld from source as well as from render.",
  },
  {
    value: "Multi-agent",
    label: "governed AI GTM operating layer",
    context: "governed workflows, approvals, audit trails",
    publicValue: "Multi-agent",
    publicLabel: "governed AI GTM operating layer",
    publicContext:
      "Governed workflows, human approvals, audit trails. The agent count is gated.",
    claimId: "CJL-CLAIM-021",
    posture: "directional",
    publicUse: "soften",
    sourceNote:
      "Spine P10 gates the agent count. Softened 2026-08-06 so the count has no home in source either.",
  },
  {
    value: "35+ KPI",
    label: "RevOps reporting framework",
    context: "funnel, attribution, unit economics, pipeline movement",
    claimId: "CJL-CLAIM-025",
    posture: "verified",
    publicUse: "show",
    sourceNote: "candidate-profile-master-v3.md:379-409; verified.",
  },
  {
    value: "Multi-million",
    label: "first-90-day signal pipeline",
    context: "signal-driven demand engine with 2-hour SLA",
    publicValue: "Multi-million",
    publicLabel: "first-90-day signal pipeline",
    publicContext: "signal-driven demand engine with a documented high-priority SLA",
    posture: "verified",
    publicUse: "soften",
    sourceNote:
      "Resume FY24 BDR-pod result; verified per signal-based demand engine case study.",
  },
  regulatedVerticals,
];

/**
 * Stats rows for the manual cover (spine section "Stats block decision").
 *
 * S4 (chapters published) and S5 (words published) are build-computed from the
 * rendered public projection via `lib/word-counts.ts` and carry no entry here:
 * they are structural counts, not claims.
 */
export const coverStats: ProofMetric[] = [
  /* S1. Green, biographical (STANDING biographical-accuracy rule). */
  {
    value: "11",
    label: "years building GTM systems",
    context:
      "First digital marketing hire in 2015 through VP of Marketing and GTM, 2026",
    posture: "verified",
    publicUse: "show",
    sourceNote:
      "Employer tenure from candidate-profile-master-v3.md Professional Experience (May 2015 start). Referent is tenure building these systems, not total career length; the profile's separate '13+ years progressive experience' line counts from an earlier start and is deliberately not used here.",
  },
  /* S2. Amber with standing approval (P19). Same object as the hero strip. */
  regulatedVerticals,
  /* S3. Amber with standing approval (P15, P18). Context is the approval condition. */
  {
    value: "7",
    label: "acquisitions integrated",
    context:
      "Marketing integration across 7 acquisitions, including a regulated Canadian business unit whose compliance requirements Connor learned and operationalized",
    claimId: "CJL-CLAIM-050",
    posture: "approved-exact-with-context",
    publicUse: "show",
    sourceNote:
      "BUILDER corrected and approved the count at 7 on 2026-05-12; SCOPE-006 overlay 2026-05-13 approved the exact count with the learning-and-operationalizing framing. Never phrase as practicing law.",
  },
];

/**
 * Bank A7. The 2026 build count, released by Connor on 2026-08-06.
 *
 * The one register row whose ground truth is git history rather than a
 * business system: every commit in the count is enumerable from the
 * repositories the source file names. The count's own denominator travels in
 * the label because the /builds section lists systems beyond the six with
 * measurable git history, and the two totals must never read as the same
 * number. Route scope: the /builds headline. No card renders it.
 */
const buildCommits2026: ProofMetric = {
  value: "695",
  label: "commits across 6 codebases in 2026",
  context:
    "Measured from git history on 2026-08-04, nothing estimated, shipped while serving as VP of Marketing and GTM, acting CMO",
  posture: "verified",
  publicUse: "show",
  sourceNote:
    "AI-Native Build Evidence - 2026-08-04.md, section 1 'Shipped codebases' (measured from the local filesystem and git history) and the section 2 governed claim. Released for the site, the FAQ, and cover letters by Connor 2026-08-06, recorded in the story bank as A7. First surface: the /builds headline, re-story phase 3.",
};

/** A7, exported for the /builds headline. That route only. */
export const buildsHeadline: ProofMetric[] = [buildCommits2026];

/**
 * Spine row P6. The approved softened form of the pipeline row: order of
 * magnitude, no figure. A separate object from `influencedPipeline` so the
 * exact numeral has exactly one home and cannot ride along here. The copy deck
 * places this form on three chapters as the outcome line.
 */
const influencedPipelineSoftened: ProofMetric = {
  value: "nine-figure influenced pipeline",
  label: "marketing-influenced pipeline, order of magnitude",
  context: "GTM infrastructure built from zero",
  publicValue: "nine-figure influenced pipeline",
  publicLabel: "marketing-influenced pipeline, order of magnitude",
  publicContext: "GTM infrastructure built from zero",
  claimId: "CJL-CLAIM-001",
  posture: "approved-exact-with-context",
  publicUse: "soften",
  sourceNote:
    "Spine P6, the softened form of CJL-CLAIM-001. Copy deck section 3 places it on 3.1, 3.3 and 3.4 as the chapter outcome line. The exact figure stays on the cover lede only.",
};

/**
 * Spine row P2. Green, the response rule on the highest-priority signal tier.
 * The deck places the phrase on chapter 3.4.
 */
const highPriorityResponseRule: ProofMetric = {
  value: "two-hour high-priority response rule",
  label: "response window on the top signal tier",
  context:
    "Every other tier carries its own defined window and a named owner",
  claimId: "CJL-CLAIM-026",
  posture: "verified",
  publicUse: "show",
  sourceNote:
    "Spine P2, Green, CJL-CLAIM-026. Copy deck section 3.4 uses the phrase in the chapter outcome line.",
};

/**
 * Magnitude numerals that ship as prose on `/`, `/about`, `/resume` and the
 * case-study chapters rather than as stats rows. They are claims, so they
 * resolve through the same gate.
 */
export const proseProofClaims: ProofMetric[] = [
  /* S6. SCOPE-004, BUILDER 2026-05-13 overlay. Kept as one entry: splitting it
     would strip the progression context the approval requires. */
  {
    value: "Near-$0 to board-backed",
    label: "marketing function built from scratch",
    context:
      "2 offshore contributors at the start, 4 direct reports inside a 16-person international model across the U.S., Canada, Guatemala, India, and the Philippines at the end",
    posture: "approved-exact-with-context",
    publicUse: "show",
    sourceNote:
      "SCOPE-004, BUILDER 2026-05-13 overlay, approved with rewrite. The progression framing is the approval condition. Never render a naked headcount.",
  },
  /* S7. SUBSET Amber row, approved 2026-05-12. */
  {
    value: "8 brands, 3 properties",
    label: "unified brand and web architecture",
    context:
      "Eight acquired brands consolidated under one architecture across three web properties",
    claimId: "CJL-CLAIM-050",
    posture: "approved-exact-with-context",
    publicUse: "show",
    sourceNote:
      "SUBSET Amber row, approved by Connor 2026-05-12 with the acquisition count corrected to 7.",
  },
  /* S8. Green, biographical. */
  {
    value: "4",
    label: "promotions",
    context:
      "First digital marketing hire to VP of Marketing and GTM, counting the initial title",
    posture: "verified",
    publicUse: "show",
    sourceNote:
      "candidate-profile-master-v3.md, Professional Summary and Key Differentiators. Counts the initial digital-marketing title; the 4 titles in the chronology are 3 step-ups, so do not present the count as arithmetic from the table.",
  },
  /* P6. Softened pipeline magnitude, chapter outcome lines. */
  influencedPipelineSoftened,
  /* P2. Response rule on the top signal tier, chapter outcome line. */
  highPriorityResponseRule,
];

/**
 * Prose tokens. A route writes `{S6}` or `{P6}` in copy and resolves it
 * through this map, so no magnitude is ever typed as a literal in a content
 * module. Every entry here is also in `proseProofClaims`, which is what the
 * guard scans.
 */
export const proseClaimTokens: Record<string, ProofMetric> = {
  S6: proseProofClaims[0],
  S8: proseProofClaims[2],
  V5: regulatedVerticals,
  P6: influencedPipelineSoftened,
  P2: highPriorityResponseRule,
};

/*
 * `impactLedger` and its `ProofGroup` type were removed on 2026-08-06 by the
 * claim-scope pass. The module was retired as a renderer by Task 9 and had no
 * importer left, but it still held `internal-only` and `company-level` rows on
 * a `show` posture (margin contribution, the messaging-architecture line count,
 * the master-brief word count). Dead source is not a safe home for a Red
 * register row, and the extended guard in
 * `scripts/check-public-proof-metrics.mjs` now fails that combination.
 */
