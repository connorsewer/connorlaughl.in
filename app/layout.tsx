import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const SITE_TITLE =
  "Connor J. Laughlin | VP of Marketing & GTM (acting CMO), GTM Engineer";
const SITE_DESCRIPTION =
  "Connor J. Laughlin is a Chicago-based VP of Marketing & GTM (acting CMO) and GTM Engineer who built revenue infrastructure, RevOps systems, governed AI workflows, and executive reporting behind $159.4M in influenced pipeline.";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
