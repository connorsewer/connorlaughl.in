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
  /** ID from Portfolio Claims Register where applicable. */
  claimId?: string;
  /** Governance posture; lives in source so future edits cannot drift. */
  posture: ClaimPosture;
  /** How the metric should appear in public UI. */
  publicUse: PublicUse;
  /** Optional source citation for internal review. Never rendered. */
  sourceNote?: string;
};

/** Five hero proof statistics rendered above the fold. */
export const heroProofStrip: ProofMetric[] = [
  {
    value: "$159.4M",
    label: "marketing-influenced pipeline",
    context: "GTM infrastructure built from zero",
    claimId: "CJL-CLAIM-001",
    posture: "approved-exact-with-context",
    publicUse: "show",
    sourceNote: "candidate-profile-master-v3.md:96-103; approved with context.",
  },
  {
    value: "22-agent",
    label: "AI GTM operating system",
    context: "governed workflows, approvals, audit trails",
    claimId: "CJL-CLAIM-021",
    posture: "directional",
    publicUse: "show",
    sourceNote:
      "candidate-profile-master-v3.md:257-279; directional pending workflow map publication.",
  },
  {
    value: "35+",
    label: "RevOps KPI framework",
    context: "funnel, attribution, unit economics, pipeline movement",
    claimId: "CJL-CLAIM-025",
    posture: "verified",
    publicUse: "show",
    sourceNote: "candidate-profile-master-v3.md:379-409; verified.",
  },
  {
    value: "7 acquisitions",
    label: "marketing integration scope",
    context: "8 acquired brands, 3 web properties, regulated Canadian business unit",
    claimId: "CJL-CLAIM-050",
    posture: "approved-exact-with-context",
    publicUse: "show",
    sourceNote: "candidate-profile-master-v3.md:212-228; approved corrected scope.",
  },
  {
    value: "near-$0 to board-backed",
    label: "marketing function built from scratch",
    context: "2 offshore resources to 4 direct reports and a 16-person international model",
    claimId: "SCOPE-004",
    posture: "approved-exact-with-context",
    publicUse: "show",
    sourceNote: "candidate-profile-master-v3.md:212-228; approval overlay.",
  },
];

export type ProofGroup = {
  id: string;
  title: string;
  metrics: ProofMetric[];
};

/** Grouped proof cards for the homepage Impact Ledger module. */
export const impactLedger: ProofGroup[] = [
  {
    id: "revenue-pipeline",
    title: "Revenue and pipeline",
    metrics: [
      {
        value: "$159.4M",
        label: "marketing-influenced pipeline",
        context: "GTM infrastructure built from zero",
        claimId: "CJL-CLAIM-001",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "$52.5M",
        label: "net-new revenue contribution",
        context: "GTM strategy, demand generation, and sales enablement contribution",
        claimId: "CJL-CLAIM-002",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "$25M+",
        label: "margin contribution",
        context: "revenue infrastructure ROI with attribution discipline",
        claimId: "CJL-CLAIM-003",
        posture: "company-level",
        publicUse: "show",
      },
      {
        value: "Multi-million",
        label: "marketing-sourced closed-won",
        context: "public phrasing; exact closed-won figure gated until source clarified",
        claimId: "CJL-CLAIM-004",
        posture: "internal-only",
        publicUse: "soften",
        sourceNote:
          "$8.5M closed-won remains internal-only until source confirmed. Body uses softened phrasing.",
      },
    ],
  },
  {
    id: "funnel-demand",
    title: "Funnel and demand",
    metrics: [
      {
        value: "+2,821%",
        label: "net-new prospect growth",
        context: "from a near-zero baseline; source-definition review noted",
        claimId: "CJL-CLAIM-010",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "+1,073%",
        label: "MQL growth",
        context: "CRM-defined; exact use pending CRM definition review",
        claimId: "CJL-CLAIM-011",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "+757%",
        label: "SQL growth",
        context: "CRM-defined; exact use pending CRM definition review",
        claimId: "CJL-CLAIM-012",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "$2.5M+",
        label: "first-90-day pipeline from signal BDR",
        context: "approved exact with redaction discipline",
        claimId: "CJL-CLAIM-013",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "40%",
        label: "meeting-to-SQL conversion",
        context: "directional until CRM source is attached",
        claimId: "CJL-CLAIM-014",
        posture: "directional",
        publicUse: "show",
      },
    ],
  },
  {
    id: "ai-output",
    title: "AI and operating output",
    metrics: [
      {
        value: "22-agent",
        label: "AI marketing operating system",
        context: "research, content, RFP, competitive, executive reporting",
        claimId: "CJL-CLAIM-021",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "400%",
        label: "productivity uplift",
        context: "team output measured against pre-system baseline",
        claimId: "CJL-CLAIM-022",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "96%",
        label: "RFP response-time reduction",
        context: "governed RFP workflow with human approval",
        claimId: "CJL-CLAIM-023",
        posture: "approved-exact-with-context",
        publicUse: "show",
      },
      {
        value: "24.5 hrs/wk",
        label: "team time recaptured",
        context: "weekly hours redirected from manual work to strategy",
        claimId: "CJL-CLAIM-024",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "115+",
        label: "strategic deliverables, 60-day sprint",
        context: "internal deliverable count across content, RFP, intel, enablement",
        claimId: "CJL-CLAIM-020",
        posture: "verified",
        publicUse: "show",
      },
    ],
  },
  {
    id: "revops-reporting",
    title: "RevOps and executive reporting",
    metrics: [
      {
        value: "35+",
        label: "KPI revenue funnel framework",
        context: "awareness through revenue with unit economics",
        claimId: "CJL-CLAIM-025",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "+400%",
        label: "CRM data completeness",
        context: "completeness lift after data governance program",
        claimId: "CJL-CLAIM-026",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "Board-ready",
        label: "executive marketing reporting",
        context: "CEO, CRO, and PE sponsor reporting cadence",
        claimId: "CJL-CLAIM-027",
        posture: "verified",
        publicUse: "show",
      },
      {
        value: "Pipeline truth",
        label: "ghost-pipeline inspection",
        context: "close-date movement and stage aging visibility",
        claimId: "CJL-CLAIM-028",
        posture: "verified",
        publicUse: "show",
      },
    ],
  },
  {
    id: "narrative-content",
    title: "Narrative, content, and market architecture",
    metrics: [
      {
        value: "774-line",
        label: "messaging architecture",
        context: "regulated business lines; artifact size kept internal unless approved",
        claimId: "CJL-CLAIM-030",
        posture: "internal-only",
        publicUse: "show",
        sourceNote: "Artifact size approved as a number; raw artifact remains private.",
      },
      {
        value: "10,900 words",
        label: "master GTM brief",
        context: "stakeholder interviews, ICP, positioning, and proof",
        claimId: "CJL-CLAIM-031",
        posture: "internal-only",
        publicUse: "show",
      },
      {
        value: "20+",
        label: "stakeholder interviews",
        context: "8 alignment gates; source review before exact comparative use",
        claimId: "CJL-CLAIM-032",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "75%",
        label: "faster RFP turnaround",
        context: "directional pending source review",
        claimId: "CJL-CLAIM-033",
        posture: "directional",
        publicUse: "show",
      },
      {
        value: "380-page",
        label: "pSEO and GEO system",
        context: "system architecture; deployment proof gated",
        claimId: "CJL-CLAIM-040",
        posture: "directional",
        publicUse: "show",
      },
    ],
  },
];
