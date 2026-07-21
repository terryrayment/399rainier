import type { Metadata } from "next";
import { SeoLanderPage } from "@/components/seo-lander-page";
import { weekendLaLander } from "@/data/seo-landers";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: weekendLaLander.metaTitle,
  description: weekendLaLander.description,
  path: weekendLaLander.path,
  keywords: weekendLaLander.keywords,
});

export default function WeekendFromLosAngelesPage() {
  return <SeoLanderPage lander={weekendLaLander} />;
}
