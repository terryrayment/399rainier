export const siteConfig = {
  name: "Lake Arrowhead A-Frame",
  shortName: "Lake Arrowhead A-Frame",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lakearrowheadaframe.com",
  locale: "en_US",
  description:
    "Lake Arrowhead cabin rental: renovated A-frame in Arrowhead Woods with indoor sauna, hot tub in the pines, dog-friendly yard, and honest owner lake trails. Guest Favorite on Airbnb. 90 minutes from Los Angeles.",
};

export const airbnbConfig = {
  listingUrl: "https://airbnb.com/h/lakearrowheadcabinrental",
  listingId: "1318992607376167956",
  host: "Terry",
  registration: "CESTRP-2025-00206",
  maxGuests: 8,
};

export type AirbnbStayParams = {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  pets?: number;
};

export function buildAirbnbUrl(
  campaign: string,
  content = "hero-cta",
  stay: AirbnbStayParams = {},
) {
  const hasStay = Boolean(stay.checkIn && stay.checkOut);
  const url = new URL(
    hasStay
      ? `https://www.airbnb.com/rooms/${airbnbConfig.listingId}`
      : airbnbConfig.listingUrl,
  );

  if (stay.checkIn) url.searchParams.set("check_in", stay.checkIn);
  if (stay.checkOut) url.searchParams.set("check_out", stay.checkOut);
  if (stay.adults != null) url.searchParams.set("adults", String(stay.adults));
  if (stay.pets != null && stay.pets > 0) {
    url.searchParams.set("pets", String(stay.pets));
  }

  url.searchParams.set("utm_source", "lakearrowheadaframe");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
