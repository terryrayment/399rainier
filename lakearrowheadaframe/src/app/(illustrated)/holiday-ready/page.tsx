import Link from "next/link";
import { AirbnbButton } from "@/components/airbnb-button";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, DarkCta, PageShell, SectionIntro } from "@/components/page-shell";
import { formatKitPrice, holidayKits } from "@/data/holiday-kits";
import { createMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Holiday Ready Kits | Lake Arrowhead Cabin",
  description:
    "Optional paid holiday kits for our Lake Arrowhead A-frame. Thanksgiving table for 8, Christmas tree and cocoa bar, and more. Book on Airbnb, then message to add a kit.",
  path: "/holiday-ready",
  keywords: [
    "Lake Arrowhead Christmas cabin rental",
    "Thanksgiving cabin Lake Arrowhead",
    "holiday cabin rental near Los Angeles",
  ],
});

export default function HolidayReadyPage() {
  return (
    <>
      <JsonLd
        id="holiday-ready-breadcrumb"
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Holiday Ready", path: "/holiday-ready" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Holiday Ready" }]} />
      <PageShell
        title="The cabin shows up ready."
        description="Optional paid Holiday Ready kits. Staged before you arrive. Book the stay on Airbnb, then message us to add a kit. Not a hotel spa package. Just the A-frame dressed for the holiday."
        campaign="holiday-ready"
        sceneFamily="winter-forest"
      >
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="How it works"
            description="Stay books on Airbnb. Kit is requested after booking and paid as a Special Offer on your reservation."
          />
          <ol className="grid gap-8 border-t border-line pt-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Book your dates",
                body: "Reserve the Lake Arrowhead A-frame on Airbnb for a holiday window.",
              },
              {
                step: "02",
                title: "Message for a kit",
                body: "Reply with the kit name. Request at least 5 days before check-in (3 for Valentine’s).",
              },
              {
                step: "03",
                title: "We stage before arrival",
                body: "Accept the Special Offer. We set up before you walk in. Tear-down is on us after checkout.",
              },
            ].map((item) => (
              <li key={item.step}>
                <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-copper">
                  {item.step}
                </p>
                <h3 className="font-serif mt-3 text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="The kits"
            description="Shelf-stable first. Artificial tree only. No cooked feasts. We leave the turkey to you or a caterer."
          />
          <div className="space-y-12 border-t border-line pt-12">
            {holidayKits.map((kit) => (
              <article
                key={kit.slug}
                id={kit.slug}
                className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-copper">
                    {kit.windowLabel}
                    {kit.status === "coming" ? " · Coming next window" : null}
                  </p>
                  <h3 className="font-serif mt-3 text-3xl tracking-tight md:text-4xl">
                    {kit.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{kit.tagline}</p>
                  <p className="mt-4 font-serif text-2xl tracking-tight">
                    {formatKitPrice(kit.price)}
                  </p>
                  <p className="mt-2 text-xs text-muted-light">
                    Request ≥ {kit.requestCutoffDays} days before check-in
                  </p>
                  <div className="mt-6">
                    <AirbnbButton
                      campaign="holiday-ready"
                      content={kit.slug}
                      label={
                        kit.status === "live"
                          ? "Book stay on Airbnb"
                          : "Book stay. Kit next window"
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="text-[11px] font-medium uppercase tracking-[0.09em] text-ink">
                      Includes
                    </h4>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-muted">
                      {kit.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-medium uppercase tracking-[0.09em] text-ink">
                      Not included
                    </h4>
                    <ul className="mt-4 space-y-2 text-sm leading-7 text-muted">
                      {kit.excludes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8">
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Prefer a quiet reset without holiday décor? Skip the kit. The sauna, hot tub, and
            glass wall are always there. Or try the{" "}
            <Link
              href="/burnout-reset"
              className="text-copper underline underline-offset-4"
            >
              48-hour burnout reset quiz
            </Link>
            .
          </p>
        </section>
      </PageShell>
      <DarkCta
        title="Book the stay first"
        description="After you reserve on Airbnb, message us with the kit name. We’ll send a Special Offer to add it to your reservation."
        campaign="holiday-ready"
      />
    </>
  );
}
