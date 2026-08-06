"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme root. The manual is light by default: a reader with no stored choice
 * and no OS preference gets paper. `enableSystem` lets a dark-OS visitor land
 * straight in the cyanotype negative, and `ThemeToggle` overrides either way.
 *
 * `attribute="class"` is what `html.dark` in globals.css keys off.
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
