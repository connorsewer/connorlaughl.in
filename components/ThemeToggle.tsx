"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/40 border border-rule px-4 py-2 rounded-full"
      >
        THEME
      </button>
    );
  }

  const current = theme === "system" ? resolvedTheme : theme;
  const next = current === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={`Switch to ${next} theme`}
      onClick={() => setTheme(next)}
      className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/60 hover:text-accent transition-colors border border-rule px-4 py-2 rounded-full"
    >
      {current === "dark" ? "Light" : "Dark"}
    </button>
  );
}
