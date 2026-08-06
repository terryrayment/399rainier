import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, DarkCta, PageShell, SectionIntro } from "@/components/page-shell";
import {
  lakeComparison,
  shorelineFaqs,
  shorelineMyths,
  shorelineSources,
  shorelineSteps,
  shorelineZones,
} from "@/data/shoreline";
import { createMetadata, getBreadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Shoreline Rights for Airbnb Guests",
  description:
    "Can Airbnb guests use Lake Arrowhead? Honest STR guide: trails and shoreline yes when registered, beach clubs no. ALA sources and Lake Gregory comparison.",
  path: "/shoreline-rights",
  keywords: [
    "can Airbnb guests use Lake Arrowhead",
    "Lake Arrowhead shoreline access STR",
    "Lake Arrowhead lake rights for renters",
    "Arrowhead Woods lake access guests",
  ],
});

const statusStyles = {
  YES: "bg-[#dfe8df] text-[#1c3a24]",
  NO: "bg-[#f3dfda] text-[#6b2d1f]",
  VERIFY: "bg-[#ece4d6] text-[#5c4a2a]",
};

export default function ShorelineRightsPage() {
  return (
    <>
      <JsonLd
        id="shoreline-breadcrumb"
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shoreline Rights", path: "/shoreline-rights" },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shoreline Rights" },
        ]}
      />
      <PageShell
        title="What you can, and cannot, do on the lake."
        description="Lake Arrowhead is private. Owner lake rights at this Arrowhead Woods A-frame include registered guest access to certain trails and shoreline areas. Beach clubs are not included. This page exists because most listings get that wrong."
        campaign="shoreline-rights"
        sceneFamily="lake-mist"
      >
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="YES · NO · VERIFY"
            description="Use this matrix before you book anywhere in Lake Arrowhead. Especially if a listing says lake pass included."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {shorelineZones.map((zone) => (
              <article
                key={zone.title}
                className="rounded-[1.25rem] border border-line bg-white/60 p-8"
              >
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${statusStyles[zone.status]}`}
                >
                  {zone.status}
                </span>
                <h3 className="font-serif mt-5 text-2xl tracking-tight">{zone.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{zone.body}</p>
                <p className="mt-4 text-sm leading-7 text-muted-light">{zone.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="Registration steps before shoreline time"
            description="Treat lake access as a checklist, not a surprise at the trailhead."
          />
          <ol className="grid gap-8 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3">
            {shorelineSteps.map((item) => (
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
          <div className="dark-panel p-8 md:p-12">
            <SectionIntro
              title="Three lines that mislead guests"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {shorelineMyths.map((item) => (
                <div key={item.myth} className="rounded-[1.25rem] bg-white/5 p-6">
                  <p className="text-sm leading-7 text-white/55">{item.myth}</p>
                  <p className="font-serif mt-4 text-xl leading-snug text-white">{item.truth}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="Lake Arrowhead vs Lake Gregory for STR guests"
            description="If your group needs a public swim beach, plan Lake Gregory. If you want Arrowhead Woods pines and registered shoreline walks, stay honest about ALA limits."
          />
          <div
            className="comparison-scroll rounded-[1.25rem] border border-line"
            tabIndex={0}
            role="region"
            aria-label="Lake Arrowhead versus Lake Gregory comparison table. Scroll horizontally to see all columns."
          >
            <p className="sr-only">
              Keyboard tip: focus this region, then use arrow keys or trackpad to scroll
              horizontally on narrow screens.
            </p>
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/70 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                <tr>
                  <th className="px-6 py-4">Lake</th>
                  <th className="px-6 py-4">Access</th>
                  <th className="px-6 py-4">STR guests</th>
                  <th className="px-6 py-4">Best for</th>
                </tr>
              </thead>
              <tbody>
                {lakeComparison.map((row) => (
                  <tr key={row.lake} className="border-t border-line bg-white/40">
                    <td className="px-6 py-5 font-medium text-ink">{row.lake}</td>
                    <td className="px-6 py-5 text-muted">{row.access}</td>
                    <td className="px-6 py-5 text-muted">{row.strGuests}</td>
                    <td className="px-6 py-5 text-muted">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro title="Straight answers" />
          <div className="grid gap-6 md:grid-cols-3">
            {shorelineFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.25rem] border border-line bg-white/60 p-8"
              >
                <h3 className="font-serif text-xl tracking-tight">{faq.question}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-8">
          <SectionIntro title="Verify against ALA directly" />
          <ul className="space-y-3">
            {shorelineSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-copper underline underline-offset-4"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-muted">
            At {siteConfig.url}, we would rather lose a booking than overpromise lake access.
            Prefer a sauna-and-pines weekend without lake logistics? Start with the{" "}
            <Link href="/lake-arrowhead-cabin-with-sauna" className="text-copper underline underline-offset-4">
              sauna cabin guide
            </Link>{" "}
            or a{" "}
            <Link href="/weekend-from-los-angeles" className="text-copper underline underline-offset-4">
              weekend from Los Angeles
            </Link>
            .
          </p>
        </section>
      </PageShell>
      <DarkCta
        title="Ready for an honest Lake Arrowhead stay?"
        description="Indoor sauna, hot tub in the pines, owner lake trails when registered. Book on Airbnb."
        campaign="shoreline-rights"
      />
    </>
  );
}
