"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      // Transition mode: pins <html class="light"> pre-hydration so no visitor
      // lands on a converted light page over a legacy dark body. The other
      // props are inert while this is set; Task 18 removes it.
      forcedTheme="light"
    >
      {children}
    </NextThemesProvider>
  );
}
