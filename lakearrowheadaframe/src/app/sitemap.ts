import type { MetadataRoute } from "next";
import { seoRoutes } from "@/lib/routes";

function siteBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://lakearrowheadaframe.com";
  try {
    return new URL(raw).origin;
  } catch {
    return "https://lakearrowheadaframe.com";
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBaseUrl();
  const lastModified = new Date("2026-07-21T00:00:00.000Z");

  return seoRoutes.map((route) => ({
    url: route.path === "/" ? `${base}/` : `${base}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
