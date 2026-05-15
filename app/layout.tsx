import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import "lenis/dist/lenis.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";

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

const SITE_TITLE =
  "Connor J. Laughlin | VP of Marketing & GTM (acting CMO), GTM Engineer";
const SITE_DESCRIPTION =
  "Connor J. Laughlin is a Chicago-based VP of Marketing & GTM (acting CMO) and GTM Engineer who built revenue infrastructure, RevOps systems, governed AI workflows, and executive reporting behind $159.4M in influenced pipeline.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
    { media: "(prefers-color-scheme: light)", color: "#F6F1E7" },
  ],
};

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://www.connorlaughl.in"),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.connorlaughl.in",
    siteName: "Connor J. Laughlin",
    type: "website",
    images: [
      {
        url: "/og/og.jpg",
        width: 1200,
        height: 630,
        alt: "Connor J. Laughlin, VP of Marketing & GTM (acting CMO), GTM Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og/og.jpg"],
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
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${display.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
