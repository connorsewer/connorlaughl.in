"use client";

import { useTheme } from "next-themes";

/**
 * Theme switch, manual chrome.
 *
 * Reads as a two-state setting printed on the masthead rather than as an app
 * control: both words are always set, the live one in blueprint, so the
 * control states what the document is currently printed on. That also means
 * the markup is identical before and after hydration, so there is no layout
 * shift and no mismatch warning; only which word is lit changes once
 * `resolvedTheme` is known.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // `resolvedTheme` is undefined on the server and on the first client render,
  // so this reads false in both places and the tree hydrates clean. It settles
  // to the real value on the render after next-themes reads storage.
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label="Dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1.5 font-mono uppercase tracking-[0.2em] text-[10px] leading-none"
    >
      <span aria-hidden="true" className={isDark ? "text-body-ink/60" : "text-blueprint"}>
        Light
      </span>
      <span aria-hidden="true" className="text-body-ink/60">
        /
      </span>
      <span aria-hidden="true" className={isDark ? "text-blueprint" : "text-body-ink/60"}>
        Dark
      </span>
    </button>
  );
}
