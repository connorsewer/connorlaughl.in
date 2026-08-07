/**
 * Command table for the cover shell (`components/manual/Terminal.tsx`).
 *
 * Pure functions only. `runCommand()` takes a raw input string plus the
 * session state a command might read, and returns lines to print and at most
 * one effect for the component to carry out. Nothing here touches the DOM,
 * the router, or the theme, which is what makes the table testable and the
 * component small.
 *
 * The chapter index is derived from `tocSections` in `content/cover.ts`, the
 * same source the printed contents renders from, so `ls` can never drift from
 * the page above it.
 *
 * Claim discipline: no output in this file carries a business outcome,
 * magnitude, or performance figure. Section and chapter ordinals are
 * structural numbering and exempt, same as `FIG_00N`.
 */

import { tocSections } from "@/content/cover";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TerminalLine =
  /** The echoed command, printed behind its prompt. */
  | { kind: "in"; text: string }
  /** Normal output. */
  | { kind: "out"; text: string }
  /** Something the reader asked for that does not exist. */
  | { kind: "err"; text: string }
  /** Preformatted block, rendered in a `<pre>`. */
  | { kind: "pre"; text: string }
  /** A real link the reader can follow. */
  | { kind: "link"; text: string; href: string };

export type TerminalEffect =
  | { type: "navigate"; href: string }
  | { type: "theme"; value: "light" | "dark" }
  | { type: "clear" }
  /* Undocumented. The second door into operator mode, for readers whose
     focus lives in this input, where the keyboard sequence can never fire. */
  | { type: "operator" };

export type CommandResult = {
  lines: TerminalLine[];
  effect?: TerminalEffect;
};

export type TerminalContext = {
  /** Commands entered this session, oldest first. */
  history: string[];
  /** Resolved theme, or undefined before next-themes has read storage. */
  theme: string | undefined;
  /** How many unknown commands have been entered, for the rotating suffix. */
  misses: number;
};

/* ------------------------------------------------------------------ */
/* Chapter index                                                       */
/* ------------------------------------------------------------------ */

export type ManualEntry = {
  /** Section and entry ordinal, for example `1.03`. */
  ref: string;
  /** Last path segment of the href, or the fragment for in-page anchors. */
  slug: string;
  title: string;
  href: string;
};

/**
 * The name a reader would type. Anchored entries take their fragment, minus
 * its ordinal prefix, because three chapters of section 2 share the `/edge`
 * path and would otherwise all answer to the same word.
 */
function slugOf(href: string): string {
  const [path, hash] = href.split("#");
  if (hash) return hash.replace(/^\d+-/, "");
  const segments = path.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? href;
}

export const manualIndex: ManualEntry[] = tocSections.flatMap((section) =>
  section.entries.map((entry) => ({
    ref: `${section.num}.${entry.num}`,
    slug: slugOf(entry.href),
    title: entry.title,
    href: entry.href,
  })),
);

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const EMAIL = "connor.laughlin@gmail.com";

const HELP_ROWS: [string, string][] = [
  ["help", "this list"],
  ["ls", "the chapters, by section"],
  ["open <ref|slug>", "go to one of them"],
  ["resume", "the resume"],
  ["about", "the longer answer to who"],
  ["edge", "how the work gets done"],
  ["contact", "an address that reaches me"],
  ["theme light|dark", "reprint the manual"],
  ["whoami", "the short answer"],
  ["history", "what you have typed here"],
  ["fig", "a plate, drawn in characters"],
  ["clear", "wipe the scrollback"],
  ["[?]", "there are verbs here this list leaves out. root has its uses."],
];

/** Rotates so a reader who fat-fingers twice does not get the same line. */
const MISS_SUFFIXES = [
  "(ls prints the chapters.)",
  "(help prints the verbs that are on the record.)",
  "(spelling counts here, same as it does in the copy.)",
];

const FIG_BOX = [
  "       +-------+",
  "      /       /|",
  "     /       / |",
  "    +-------+  |",
  "    |       |  +",
  "    |       | /",
  "    |       |/",
  "    +-------+",
].join("\n");

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function out(...texts: string[]): TerminalLine[] {
  return texts.map((text) => ({ kind: "out", text }) as const);
}

function err(text: string): TerminalLine[] {
  return [{ kind: "err", text }];
}

const pad = (value: string, width: number) => value.padEnd(width, " ");

/** Widest help key, so the two columns line up without a table. */
const HELP_KEY_WIDTH = HELP_ROWS.reduce((w, [key]) => Math.max(w, key.length), 0) + 2;

/* ------------------------------------------------------------------ */
/* Resolution                                                          */
/* ------------------------------------------------------------------ */

/**
 * What `open` searches. The three chapters of section 2 are anchors on one
 * page, so that page answers to its own name as well, and `open edge` lands
 * where a reader typing it expects to land.
 */
const OPEN_TARGETS: ManualEntry[] = [
  ...manualIndex,
  { ref: "2", slug: "edge", title: "The operator", href: "/edge" },
];

/**
 * Resolves the argument to `open`. Accepts, in order: a full `section.entry`
 * ref, a bare chapter number (read as a chapter of section 1, where the case
 * studies live), an exact slug, then a fragment of a slug or a title.
 */
export function resolveEntry(rawArg: string): ManualEntry[] {
  const arg = rawArg.trim().toLowerCase();
  if (!arg) return [];

  if (/^\d+\.\d+$/.test(arg)) {
    const [section, entry] = arg.split(".");
    const ref = `${Number(section)}.${entry.padStart(2, "0")}`;
    return manualIndex.filter((e) => e.ref === ref);
  }

  if (/^\d+$/.test(arg)) {
    const ref = `1.${arg.padStart(2, "0")}`;
    return manualIndex.filter((e) => e.ref === ref);
  }

  const needle = arg.replace(/\s+/g, "-");
  const exact = OPEN_TARGETS.filter((e) => e.slug === needle);
  if (exact.length > 0) return exact;

  const bySlug = OPEN_TARGETS.filter((e) => e.slug.includes(needle));
  if (bySlug.length > 0) return bySlug;

  const words = arg.replace(/-+/g, " ");
  return manualIndex.filter((e) => e.title.toLowerCase().includes(words));
}

/* ------------------------------------------------------------------ */
/* Commands                                                            */
/* ------------------------------------------------------------------ */

function helpResult(): CommandResult {
  return {
    lines: [
      ...out("available:"),
      ...HELP_ROWS.map(
        ([key, note]) => ({ kind: "out", text: `  ${pad(key, HELP_KEY_WIDTH)}${note}` }) as const,
      ),
    ],
  };
}

function listResult(): CommandResult {
  const lines: TerminalLine[] = [];
  for (const section of tocSections) {
    lines.push({ kind: "out", text: `${section.num}  ${section.title}` });
    for (const entry of section.entries) {
      const item = manualIndex.find(
        (e) => e.ref === `${section.num}.${entry.num}`,
      );
      if (!item) continue;
      lines.push({ kind: "out", text: `     ${pad(item.ref, 7)}${item.slug}` });
    }
  }
  lines.push({ kind: "out", text: "" });
  lines.push({ kind: "out", text: "open 1.03, open 3, or open any part of a slug." });
  return { lines };
}

function openResult(arg: string): CommandResult {
  if (!arg.trim()) {
    return { lines: err("open: name a chapter. ls prints them.") };
  }

  const matches = resolveEntry(arg);

  if (matches.length === 0) {
    return { lines: err(`open: no chapter matches "${arg.trim()}". try ls.`) };
  }

  if (matches.length > 1) {
    return {
      lines: [
        ...err(`open: "${arg.trim()}" matches more than one chapter.`),
        ...matches.map(
          (m) => ({ kind: "out", text: `     ${pad(m.ref, 7)}${m.slug}` }) as const,
        ),
      ],
    };
  }

  const [match] = matches;
  return {
    lines: out(`opening ${match.ref}  ${match.title}`),
    effect: { type: "navigate", href: match.href },
  };
}

function gotoResult(href: string, label: string): CommandResult {
  return {
    lines: out(`opening ${label}`),
    effect: { type: "navigate", href },
  };
}

function themeResult(arg: string, current: string | undefined): CommandResult {
  const want = arg.trim().toLowerCase();

  if (!want) {
    const printed = current === "dark" ? "dark" : "light";
    return {
      lines: out(`printed on ${printed}. theme light or theme dark to reprint.`),
    };
  }

  if (want !== "light" && want !== "dark") {
    return { lines: err(`theme: no such stock as "${want}". light or dark.`) };
  }

  return {
    lines: out(
      want === "dark"
        ? "reprinted as a cyanotype negative."
        : "reprinted on paper.",
    ),
    effect: { type: "theme", value: want },
  };
}

function historyResult(history: string[]): CommandResult {
  if (history.length === 0) {
    return { lines: out("nothing yet. this line is the first thing you asked.") };
  }
  return {
    lines: history.map(
      (entry, i) =>
        ({ kind: "out", text: `  ${pad(String(i + 1), 5)}${entry}` }) as const,
    ),
  };
}

function figResult(): CommandResult {
  return {
    lines: [
      { kind: "pre", text: FIG_BOX },
      { kind: "out", text: "[ box, drawn in characters ]" },
      { kind: "out", text: "the registered plates are drawn in svg. ls, then open one." },
    ],
  };
}

function hireResult(): CommandResult {
  return {
    lines: [
      { kind: "out", text: "[sudo] password for guest:" },
      { kind: "out", text: "permission granted. it was never locked." },
      { kind: "out", text: "" },
      { kind: "out", text: "  user     connor" },
      { kind: "out", text: "  groups   marketing, revenue operations, engineering" },
      { kind: "out", text: "  shell    /bin/ship" },
      { kind: "out", text: "  note     answers his own email" },
      { kind: "out", text: "" },
      { kind: "out", text: "start here:" },
      { kind: "link", text: EMAIL, href: `mailto:${EMAIL}` },
    ],
  };
}

function unknownResult(name: string, misses: number): CommandResult {
  return {
    lines: [
      { kind: "err", text: `${name}: command not found. see: help` },
      { kind: "out", text: MISS_SUFFIXES[misses % MISS_SUFFIXES.length] },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export function runCommand(raw: string, ctx: TerminalContext): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };

  const normalized = trimmed.toLowerCase();
  const [name, ...rest] = normalized.split(/\s+/);
  const arg = rest.join(" ");

  /* The egg. Matched before `sudo` so the exact phrase wins. */
  if (normalized === "sudo hire connor") return hireResult();

  switch (name) {
    case "help":
    case "?":
      return helpResult();

    case "ls":
    case "contents":
    case "dir":
      return listResult();

    case "open":
    case "cd":
      return openResult(arg);

    case "resume":
    case "cv":
      return gotoResult("/resume", "the resume");

    case "about":
      return gotoResult("/story", "the story of who");

    case "edge":
      return gotoResult("/edge", "how the work gets done");

    case "contact":
    case "email":
    case "hire":
      return {
        lines: [
          { kind: "out", text: "one address, read by one person:" },
          { kind: "link", text: EMAIL, href: `mailto:${EMAIL}` },
        ],
      };

    case "theme":
      return themeResult(arg, ctx.theme);

    case "whoami":
      return {
        lines: out(
          "connor j. laughlin. marketer by training, builds the system before asking anyone to staff it.",
        ),
      };

    case "history":
      return historyResult(ctx.history);

    /* Not listed by help. The chip in the masthead names the state; the
       shell prints the state line itself once the toggle has run. */
    case "operator":
      return { lines: [], effect: { type: "operator" } };

    case "fig":
    case "figure":
      return figResult();

    case "clear":
    case "cls":
      return { lines: [], effect: { type: "clear" } };

    case "sudo":
      return { lines: err("sudo: usage is sudo <verb> <target>. pick a verb you mean.") };

    case "exit":
    case "quit":
      return { lines: out("the shell stays. escape gives the page back its keyboard.") };

    default:
      return unknownResult(name, ctx.misses);
  }
}

export const TERMINAL_PROMPT = "connor@manual:~$";
