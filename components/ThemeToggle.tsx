"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/60 border border-rule px-4 py-2 rounded-full"
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
      className="font-mono text-[11px] tracking-[0.2em] uppercase text-paper/70 hover:text-accent hover:border-accent/60 transition-colors border border-rule px-4 py-2 rounded-full"
    >
      {current === "dark" ? "Light" : "Dark"}
    </button>
  );
}
