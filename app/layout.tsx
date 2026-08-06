import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

/**
 * GT Sectra Fine, the editorial display face. Five weights plus italics,
 * self-hosted from public/fonts/gt-sectra-fine/.
 *
 * Weight mapping (Tailwind utility -> source file):
 *   300 (font-light)    Book
 *   400 (font-normal)   Regular
 *   500 (font-medium)   Medium
 *   700 (font-bold)     Bold
 *   900 (font-black)    Black
 */
const display = localFont({
  src: [
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-Book.woff2",         weight: "300", style: "normal" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-BookItalic.woff2",   weight: "300", style: "italic" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-Regular.woff2",      weight: "400", style: "normal" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-RegularItalic.woff2",weight: "400", style: "italic" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-Medium.woff2",       weight: "500", style: "normal" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-Bold.woff2",         weight: "700", style: "normal" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-BoldItalic.woff2",   weight: "700", style: "italic" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-Black.woff2",        weight: "900", style: "normal" },
    { path: "../public/fonts/gt-sectra-fine/GTSectraFine-BlackItalic.woff2",  weight: "900", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/**
 * Newsreader, the manual body serif (spec §2 type roles). Google Fonts OFL;
 * license copy ships at public/fonts/newsreader/OFL.txt. Static instances
 * pinned from the variable source at opsz 18 (the family default, tuned for
 * body sizes) and subset to the Latin-plus range — see scripts/subset-fonts.py
 * for the reproduction commands.
 *
 * Weight mapping (Tailwind utility -> source file):
 *   400 (font-normal)   Regular + Italic
 *   500 (font-medium)   Medium
 *   600 (font-semibold) SemiBold
 */
const serifBody = localFont({
  src: [
    { path: "../public/fonts/newsreader/Newsreader-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../public/fonts/newsreader/Newsreader-Italic.woff2",   weight: "400", style: "italic" },
    { path: "../public/fonts/newsreader/Newsreader-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../public/fonts/newsreader/Newsreader-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif-body",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Metadata strings: copy deck section 12.4. Numeral-free by design. A metadata
 * string cannot carry the context an approval requires, so no magnitude claim
 * goes here in any form.
 */
const SITE_NAME = "Connor J. Laughlin";
const SITE_TITLE_TEMPLATE = "%s | Connor J. Laughlin";
const SITE_DESCRIPTION =
  "Marketing executive and GTM systems engineer in Chicago. A manual of the revenue systems he has built: positioning, demand capture, CRM and attribution, pipeline inspection, and governed AI workflows.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The two grounds: manual paper and the cyanotype negative. Values track
  // `--ground` in globals.css.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B1020" },
    { media: "(prefers-color-scheme: light)", color: "#FBFBFB" },
  ],
};

export const metadata: Metadata = {
  // `default` is the cover title; child routes fill the template.
  title: { default: SITE_NAME, template: SITE_TITLE_TEMPLATE },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.connorlaughl.in"),
  openGraph: {
    // `title` and `description` are deliberately absent: Next resolves them
    // per route from the page's own metadata, so a chapter shares as its own
    // chapter. Images come from the `opengraph-image` file convention, so each
    // route family ships its own card instead of one static fallback.
    url: "https://www.connorlaughl.in",
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${display.variable} ${serifBody.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
