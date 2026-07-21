import type { Metadata } from "next";
import { SeoLanderPage } from "@/components/seo-lander-page";
import { aframeLander } from "@/data/seo-landers";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: aframeLander.metaTitle,
  description: aframeLander.description,
  path: aframeLander.path,
  keywords: aframeLander.keywords,
});

export default function LakeArrowheadAFrameCabinPage() {
  return <SeoLanderPage lander={aframeLander} />;
}
