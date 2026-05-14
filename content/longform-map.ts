/**
 * Maps a long-form route slug to the markdown file in content/case-studies/.
 *
 * Slug naming here follows hire-readable shapes ("revenue-operating-system"),
 * not internal file names. Keep the mapping shallow: a static record.
 */
import path from "node:path";
import { readFileSync } from "node:fs";

export const longformMap: Record<string, string> = {
  "revenue-operating-system-from-zero": "one-tsi-revenue-infrastructure.md",
  "signal-based-demand-engine": "bdr-pod-lead-generation.md",
  "outcome-first-narrative-architecture": "outcome-first-messaging-architecture.md",
  "post-acquisition-saas-bridge": "debtnext-saas-integration.md",
};

export function longformSlugs(): string[] {
  return Object.keys(longformMap);
}

export function readLongform(slug: string): string | null {
  const file = longformMap[slug];
  if (!file) return null;
  try {
    return readFileSync(
      path.join(process.cwd(), "content", "case-studies", file),
      "utf8",
    );
  } catch {
    return null;
  }
}
