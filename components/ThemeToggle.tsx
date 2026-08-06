"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { themeCross } from "@/lib/motion-manual";

/**
 * Theme switch, manual chrome.
 *
 * Reads as a two-state setting printed on the masthead rather than as an app
 * control: both words are always set, the live one in blueprint, so the
 * control states what the document is currently printed on.
 *
 * Mounted gate: `resolvedTheme` is undefined on the server and on the first
 * client render, and next-themes fills it in only after it has read storage.
 * Deriving `isDark` from it directly makes the first client render disagree
 * with the server whenever a returning dark reader loads the page, because the
 * inline theme script has already put `.dark` on `html` by then. Holding the
 * lit word until `mounted` keeps the two renders identical and the markup is
 * the same size either way, so nothing shifts.
 *
 * The swap itself goes through `themeCross()`, which crosses the two grounds
 * inside a View Transition. Reduced motion, and any engine without the API,
 * take the plain path.
 */
const NOOP = () => {};
const NO_SUBSCRIPTION = () => NOOP;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  /* Hydration is a one-time transition, not a subscription: the store never
     changes after the first client render, so `subscribe` registers nothing
     and the two snapshots are the whole gate. */
  const mounted = useSyncExternalStore(
    NO_SUBSCRIPTION,
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label="Dark mode"
      onClick={() => themeCross(() => setTheme(isDark ? "light" : "dark"))}
      /* The nav sits to the left of this and reads as three more links unless
         the switch is fenced off, so it carries a hairline of its own. The
         negative margin buys a ≥24px pointer target off a 10px line without
         moving anything on the masthead. */
      className="manual-press group -my-2 flex cursor-pointer items-center gap-1.5 border-l border-rule-hair py-2 pl-4 font-mono text-[10px] uppercase leading-none tracking-[0.2em] transition-colors"
    >
      <span
        aria-hidden="true"
        className={
          isDark
            ? "text-body-ink/60 transition-colors group-hover:text-body-ink"
            : "text-blueprint"
        }
      >
        Light
      </span>
      <span aria-hidden="true" className="text-body-ink/40">
        /
      </span>
      <span
        aria-hidden="true"
        className={
          isDark
            ? "text-blueprint"
            : "text-body-ink/60 transition-colors group-hover:text-body-ink"
        }
      >
        Dark
      </span>
    </button>
  );
}
