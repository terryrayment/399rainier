import Link from "next/link";
import { AtmosphericArtwork } from "@/components/illustration/atmospheric-artwork";
import { PhotoClearing } from "@/components/illustration/photo-clearing";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, DarkCta, PageShell, SectionIntro } from "@/components/page-shell";
import { landerSceneFamilies, landerVignettes } from "@/data/illustrations";
import type { SeoLander } from "@/data/seo-landers";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export function SeoLanderPage({ lander }: { lander: SeoLander }) {
  const vignetteName = landerVignettes[lander.campaign] ?? "glass-pines";
  const sceneFamily = landerSceneFamilies[lander.campaign] ?? "seo-light";

  return (
    <>
      <JsonLd
        id={`${lander.campaign}-breadcrumb`}
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: lander.breadcrumbLabel, path: lander.path },
        ])}
      />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: lander.breadcrumbLabel }]}
      />
      <PageShell
        title={lander.headline}
        description={lander.lead}
        campaign={lander.campaign}
        sceneFamily={sceneFamily}
      >
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <PhotoClearing
              src={lander.photo.src}
              alt={lander.photo.alt}
              aspectClassName="aspect-[4/5]"
              sizes="(max-width: 768px) 100vw, 50vw"
              overlap="tl"
              priority
            />
            <div className="space-y-10">
              {lander.sections.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
                </div>
              ))}
              <div className="max-w-sm pt-2">
                <AtmosphericArtwork name={vignetteName} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="place-truth-list place-truth-list--lander">
            {lander.sections.slice(2).map((section) => (
              <div key={section.title} className="place-truth-item">
                <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <SectionIntro
            title="Before you book"
            description="Plain answers for guests comparing Lake Arrowhead cabin rentals."
          />
          <dl className="place-truth-faq">
            {lander.faqs.map((faq) => (
              <div key={faq.question} className="place-truth-faq-item">
                <dt className="font-serif place-truth-faq-q">{faq.question}</dt>
                <dd className="place-truth-faq-a">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-8">
          <SectionIntro title="Related guides" />
          <div className="flex flex-wrap gap-4">
            {lander.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-copper underline underline-offset-4 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </PageShell>
      <DarkCta
        title="Check dates on Airbnb"
        description="Guest Favorite A-frame — indoor sauna, hot tub in the pines, dog-friendly, honest lake trails when registered."
        campaign={lander.campaign}
      />
    </>
  );
}
