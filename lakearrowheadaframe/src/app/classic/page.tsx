import { HomePageClassic } from "@/components/home/home-page-classic";
import { createMetadata } from "@/lib/seo";

export const metadata = {
  ...createMetadata({
    title: "Classic View | Lake Arrowhead Cabin Rental",
    description:
      "Photo-only classic view of our Lake Arrowhead A-frame cabin rental — no illustration layers.",
    path: "/classic",
    keywords: ["Lake Arrowhead cabin rental"],
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function ClassicPage() {
  return <HomePageClassic />;
}
