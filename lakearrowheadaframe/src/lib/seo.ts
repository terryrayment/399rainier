import type { Metadata } from "next";
import { cabin } from "@/data/cabin";
import { airbnbConfig, absoluteUrl, siteConfig } from "@/lib/site";

const defaultOgImage = {
  url: absoluteUrl(cabin.heroPhoto.src),
  alt: cabin.heroPhoto.alt,
};

const defaultKeywords = [
  "Lake Arrowhead cabin rental",
  "Lake Arrowhead A-frame",
  "Lake Arrowhead vacation rental",
  "Arrowhead Woods cabin",
  "Lake Arrowhead cabin with sauna",
  "dog friendly Lake Arrowhead cabin",
  "Lake Arrowhead hot tub cabin",
  "weekend getaway from Los Angeles",
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const homeFaqs: FaqItem[] = [
  {
    question: "Is this a Lake Arrowhead cabin rental with a real A-frame?",
    answer:
      "Yes. This is a renovated A-frame in Arrowhead Woods with a floor-to-ceiling glass wall, three decks, an indoor sauna, and a hot tub in the pines. It sleeps up to eight guests.",
  },
  {
    question: "Can Airbnb guests use Lake Arrowhead beach clubs?",
    answer:
      "No. Short-term rental guests cannot use private beach clubs such as Tavern Bay or Burnt Mill. Registered guests at eligible Arrowhead Woods homes may access certain ALA trails and shoreline areas when the host follows ALA registration rules. See our shoreline rights guide for the full YES / NO / VERIFY breakdown.",
  },
  {
    question: "Is the cabin dog-friendly?",
    answer:
      "Yes. Dogs are welcome. The property has a fenced yard and three decks so pets have room to roam without guessing the rules at check-in.",
  },
  {
    question: "How far is the cabin from Los Angeles?",
    answer:
      "About 90 minutes from downtown Los Angeles depending on traffic and mountain conditions. Lake Arrowhead Village is about five minutes away.",
  },
];

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const mergedKeywords = [...new Set([...defaultKeywords, ...keywords])];
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export function getLodgingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${absoluteUrl("/")}#lodging`,
    name: cabin.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    image: cabin.gallery.slice(0, 8).map((photo) => absoluteUrl(photo.src)),
    address: {
      "@type": "PostalAddress",
      streetAddress: cabin.address,
      addressLocality: cabin.city,
      addressRegion: cabin.state,
      postalCode: cabin.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.2483,
      longitude: -117.1845,
    },
    numberOfRooms: cabin.beds,
    petsAllowed: true,
    starRating: {
      "@type": "Rating",
      ratingValue: cabin.rating,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: cabin.rating,
      reviewCount: cabin.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: [
      "Indoor sauna",
      "Hot tub",
      "Dog-friendly fenced yard",
      "Three decks",
      "Floor-to-ceiling A-frame windows",
      "165 Mbps wifi",
      "Owner lake trail access when registered",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    checkinTime: "16:00",
    checkoutTime: "11:00",
    sameAs: [airbnbConfig.listingUrl, `https://www.airbnb.com/rooms/${airbnbConfig.listingId}`],
    identifier: airbnbConfig.registration,
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": `${absoluteUrl("/")}#lodging`,
    },
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
