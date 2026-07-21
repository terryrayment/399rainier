import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { cabin } from "@/data/cabin";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION;

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Lake Arrowhead Cabin Rental | A-Frame with Sauna & Hot Tub",
    template: "%s | Lake Arrowhead A-Frame",
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    title: "Lake Arrowhead Cabin Rental | A-Frame with Sauna & Hot Tub",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl(cabin.heroPhoto.src),
        alt: cabin.heroPhoto.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lake Arrowhead Cabin Rental | A-Frame with Sauna & Hot Tub",
    description: siteConfig.description,
    images: [absoluteUrl(cabin.heroPhoto.src)],
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    other: BING_SITE_VERIFICATION
      ? {
          "msvalidate.01": BING_SITE_VERIFICATION,
        }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${cormorant.variable} antialiased`}>
        <SiteNav />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
