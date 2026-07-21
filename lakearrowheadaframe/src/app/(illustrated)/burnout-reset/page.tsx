import Link from "next/link";
import { BurnoutQuiz } from "@/components/burnout-quiz";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, DarkCta, PageShell, SectionIntro } from "@/components/page-shell";
import { createMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "48-Hour Burnout Reset Quiz",
  description:
    "LA and OC weekend escape quiz. Get a personalized 48-hour Lake Arrowhead reset itinerary with sauna, hot tub, and forest time at our cabin rental.",
  path: "/burnout-reset",
  keywords: [
    "Lake Arrowhead weekend reset",
    "LA weekend getaway quiz",
    "burnout reset cabin Los Angeles",
  ],
});

export default function BurnoutResetPage() {
  return (
    <>
      <JsonLd
        id="burnout-breadcrumb"
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Burnout Reset Quiz", path: "/burnout-reset" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Burnout Reset" }]} />
      <PageShell
        title="Which 48-hour reset are you?"
        description="Four quick questions. No wellness jargon. Just an honest itinerary for sauna, hot tub, decks, and forest quiet ninety minutes from Los Angeles."
        campaign="burnout-reset"
        sceneFamily="quiet-morning"
      >
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="Reset · Reconnect · Recharge"
            description="Each result ends at Airbnb with your protocol ready to picture before you book."
          />
          <BurnoutQuiz />
          <p className="mt-10 max-w-2xl text-sm leading-7 text-muted">
            Want the drive-market story without the quiz? Read{" "}
            <Link
              href="/weekend-from-los-angeles"
              className="text-copper underline underline-offset-4"
            >
              Lake Arrowhead weekend from Los Angeles
            </Link>
            .
          </p>
        </section>
      </PageShell>
      <DarkCta
        title="Skip the quiz. Check dates"
        description="Indoor sauna, hot tub in the pines, dog-friendly. Book the Lake Arrowhead A-frame on Airbnb."
        campaign="burnout-reset"
      />
    </>
  );
}
