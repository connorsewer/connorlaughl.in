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

export const metadata: Metadata = {
  title: "Connor J. Laughlin — VP Marketing & GTM",
  description:
    "Notes on the systems I've built. $15M influenced pipeline, 300% inbound growth, governed AI workflows, and the org designs underneath them.",
  metadataBase: new URL("https://www.connorlaughl.in"),
  openGraph: {
    title: "Connor J. Laughlin — VP Marketing & GTM",
    description:
      "Notes on the systems I've built. $15M influenced pipeline, 300% inbound growth, governed AI workflows, and the org designs underneath them.",
    url: "https://www.connorlaughl.in",
    siteName: "Connor J. Laughlin",
    type: "website",
    images: [
      {
        url: "/og/og.jpg",
        width: 1200,
        height: 630,
        alt: "Connor J. Laughlin — VP Marketing & GTM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connor J. Laughlin — VP Marketing & GTM",
    description:
      "Notes on the systems I've built. $15M influenced pipeline, 300% inbound growth, governed AI workflows.",
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
