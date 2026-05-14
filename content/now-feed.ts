/**
 * Public "Now" feed.
 *
 * Surfaces what Connor is building and reading right now, in the open.
 * Demonstrates the GTM-Engineer identity outside the case studies.
 *
 * Date format: ISO 8601. Render with the user's locale.
 */

export type NowEntryKind = "building" | "reading" | "shipping" | "learning";

export type NowEntry = {
  kind: NowEntryKind;
  title: string;
  body: string;
  /** Optional reference: book, repo, tool, talk. */
  ref?: string;
  date: string;
};

export const nowEntries: NowEntry[] = [
  {
    kind: "shipping",
    title: "Released the RevOps capacity planner",
    body: "A reverse-funnel tool that turns a revenue target into the leads, MQLs, SQLs, and opps required. Same math I ran at TSI to size demand mix.",
    ref: "/tools/revops-capacity-planner",
    date: "2026-05-13",
  },
  {
    kind: "building",
    title: "Governed RAG over the proof library",
    body: "Wiring the proof library to a small RAG endpoint so RFP responses can cite the exact claim, posture, and source without leaking the artifact.",
    date: "2026-05-08",
  },
  {
    kind: "building",
    title: "22-agent GTM OS rewrite in TypeScript",
    body: "Porting the Python orchestration to TypeScript + MCP-style tools so the audit trail and approval gates are easier to reason about.",
    date: "2026-04-30",
  },
  {
    kind: "reading",
    title: "Welcome to the Era of Experience",
    body: "Silver and Sutton on agent learning. Reading it next to the playbooks I drafted for the AI GTM OS.",
    date: "2026-04-25",
  },
  {
    kind: "learning",
    title: "Inference-time optimization for agentic workflows",
    body: "Practicing prompt routing and tool-call planning patterns that make 22-agent systems cheaper without losing review discipline.",
    date: "2026-04-15",
  },
];
