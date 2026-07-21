import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, DarkCta, PageShell, SectionIntro } from "@/components/page-shell";
import type { SeoLander } from "@/data/seo-landers";
import { getBreadcrumbJsonLd } from "@/lib/seo";

export function SeoLanderPage({ lander }: { lander: SeoLander }) {
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
        eyebrow={lander.eyebrow}
        title={lander.headline}
        description={lander.lead}
        campaign={lander.campaign}
      >
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
              <Image
                src={lander.photo.src}
                alt={lander.photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-10">
              {lander.sections.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-2">
            {lander.sections.slice(2).map((section) => (
              <div key={section.title}>
                <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            eyebrow="Common questions"
            title="Before you book"
            description="Plain answers for guests comparing Lake Arrowhead cabin rentals."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {lander.faqs.map((faq) => (
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
          <SectionIntro eyebrow="Keep exploring" title="Related guides" />
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
