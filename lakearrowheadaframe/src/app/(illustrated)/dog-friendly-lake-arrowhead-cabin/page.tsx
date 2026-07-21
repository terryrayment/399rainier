import type { Metadata } from "next";
import { SeoLanderPage } from "@/components/seo-lander-page";
import { dogFriendlyLander } from "@/data/seo-landers";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: dogFriendlyLander.metaTitle,
  description: dogFriendlyLander.description,
  path: dogFriendlyLander.path,
  keywords: dogFriendlyLander.keywords,
});

export default function DogFriendlyLakeArrowheadCabinPage() {
  return <SeoLanderPage lander={dogFriendlyLander} />;
}
