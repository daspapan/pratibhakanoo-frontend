import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import { PlayerProvider } from "@/context/PlayerContext";
// Baloo 2 covers both Latin and Devanagari, so English and Hindi match.
// Self-hosted from npm: no build-time call to Google Fonts.
import "@fontsource-variable/baloo-2";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pratibhakanoo.com"),
  title: "Story with Pratibha · Stories & rhymes for kids",
  description:
    "Bedtime stories, rhymes and moral tales for kids in English and Hindi, told by Pratibha Kanoo. Book a storytelling session for birthdays, schools or online.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    title: "Story with Pratibha",
    description: "Stories & rhymes for kids in English and Hindi.",
    url: "/",
    siteName: "Story with Pratibha",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fff7ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-PSP6CWL3" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-PSP6CWL3');`}
        </Script>
        <LanguageProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
