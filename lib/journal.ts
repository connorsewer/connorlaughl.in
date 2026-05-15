import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Journal loader. File-based — no CMS, no runtime fetch. One markdown file per
 * entry under `content/journal/`, each with a small string-only frontmatter
 * block parsed below.
 *
 * Frontmatter contract (all required):
 *   title, slug, date (YYYY-MM-DD), theme, read_time, dek
 */

export type JournalEntry = {
  slug: string;
  title: string;
  dek: string;
  theme: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Human-readable, e.g. "6 min". */
  readTime: string;
};

export type JournalPost = JournalEntry & {
  body: string;
};

const DIR = path.join(process.cwd(), "content", "journal");

type Frontmatter = Record<string, string>;

function parseFrontmatter(src: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src);
  if (!match) return { data: {}, body: src };
  const data: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return { data, body: match[2].replace(/^\s*\n/, "") };
}

function toEntry(slug: string, data: Frontmatter): JournalEntry {
  const required = ["title", "date", "theme", "read_time", "dek"] as const;
  for (const k of required) {
    if (!data[k]) {
      throw new Error(`Journal entry "${slug}" is missing frontmatter: ${k}`);
    }
  }
  return {
    slug,
    title: data.title,
    dek: data.dek,
    theme: data.theme,
    date: data.date,
    readTime: data.read_time,
  };
}

let cached: JournalPost[] | null = null;

function loadAll(): JournalPost[] {
  if (cached) return cached;
  const files = readdirSync(DIR).filter((f) => f.endsWith(".md"));
  const posts: JournalPost[] = files.map((file) => {
    const src = readFileSync(path.join(DIR, file), "utf8");
    const { data, body } = parseFrontmatter(src);
    const slug = data.slug || file.replace(/\.md$/, "");
    return { ...toEntry(slug, data), body };
  });
  posts.sort((a, b) => b.date.localeCompare(a.date));
  cached = posts;
  return posts;
}

function asEntry(p: JournalPost): JournalEntry {
  return {
    slug: p.slug,
    title: p.title,
    dek: p.dek,
    theme: p.theme,
    date: p.date,
    readTime: p.readTime,
  };
}

export function listJournal(): JournalEntry[] {
  return loadAll().map(asEntry);
}

export function readJournal(slug: string): JournalPost | null {
  return loadAll().find((p) => p.slug === slug) ?? null;
}

export function journalSlugs(): string[] {
  return loadAll().map((p) => p.slug);
}

/**
 * Returns the chronological neighbours for a slug. `older` is the post
 * immediately preceding this one in time; `newer` is the one immediately
 * following. Useful for prev/next links on detail pages.
 */
export function neighbours(slug: string): {
  older: JournalEntry | null;
  newer: JournalEntry | null;
} {
  const posts = loadAll();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) return { older: null, newer: null };
  // posts is sorted newest-first, so the next index is older.
  const olderPost = posts[i + 1];
  const newerPost = posts[i - 1];
  return {
    older: olderPost ? asEntry(olderPost) : null,
    newer: newerPost ? asEntry(newerPost) : null,
  };
}

/**
 * Formats a YYYY-MM-DD date as editorial caption tokens.
 *   "2025-04-22" -> { year: "2025", month: "Apr", day: "22", long: "April 22, 2025" }
 */
export function formatDate(iso: string): {
  year: string;
  month: string;
  day: string;
  long: string;
} {
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const longMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIdx = parseInt(m, 10) - 1;
  return {
    year: y,
    month: months[monthIdx],
    day: d,
    long: `${longMonths[monthIdx]} ${parseInt(d, 10)}, ${y}`,
  };
}
