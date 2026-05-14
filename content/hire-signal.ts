/**
 * Hire-signal state: what Connor is open to right now and at what intensity.
 *
 * "open" = pursuing it now. "warm" = open to a strong-fit conversation.
 * "selective" = only for unusually well-matched problems.
 */
export type Intensity = "open" | "warm" | "selective";

export type HireRole = {
  title: string;
  intensity: Intensity;
  note: string;
};

export const availability: { state: "available" | "exploring" | "closed"; line: string } = {
  state: "available",
  line: "Open to conversations now. Targeting first-half 2026 start, with flexibility for a standout role.",
};

export const roles: HireRole[] = [
  {
    title: "VP, Marketing",
    intensity: "open",
    note: "AI-native B2B SaaS, enterprise software, or PE-backed where growth depends on building the operating layer.",
  },
  {
    title: "CMO",
    intensity: "open",
    note: "Acting-CMO scope I already run. Best fit where marketing is being built into a revenue function.",
  },
  {
    title: "Head of GTM",
    intensity: "open",
    note: "Marketing plus RevOps plus sales enablement under one leader.",
  },
  {
    title: "VP, Revenue Operations",
    intensity: "warm",
    note: "If the org needs the RevOps mechanics first and the narrative second.",
  },
  {
    title: "GTM Engineer",
    intensity: "warm",
    note: "AI-native company that wants the build and the leadership wired together.",
  },
  {
    title: "Advisory",
    intensity: "selective",
    note: "Tightly scoped: GTM systems, AI workflow design, or revenue infrastructure.",
  },
];

export const fitNotes: string[] = [
  "AI-native B2B SaaS, enterprise software, vertical SaaS, PE-backed.",
  "Building the operating layer, not managing a campaign calendar.",
  "Seriousness about RevOps mechanics, claims governance, and executive cadence.",
];
