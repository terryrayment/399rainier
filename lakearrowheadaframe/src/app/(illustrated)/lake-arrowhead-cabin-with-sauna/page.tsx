import type { Metadata } from "next";
import { SeoLanderPage } from "@/components/seo-lander-page";
import { saunaLander } from "@/data/seo-landers";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: saunaLander.metaTitle,
  description: saunaLander.description,
  path: saunaLander.path,
  keywords: saunaLander.keywords,
});

export default function LakeArrowheadCabinWithSaunaPage() {
  return <SeoLanderPage lander={saunaLander} />;
}
