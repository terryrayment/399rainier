import Image from "next/image";
import Link from "next/link";
import { AirbnbButton, BookingPill } from "@/components/airbnb-button";
import { DriveTimeList } from "@/components/drive-time-list";
import { HeroParallax } from "@/components/hero-parallax";
import { HolidayReadyStrip } from "@/components/holiday-ready-strip";
import { JsonLd } from "@/components/json-ld";
import { ParallaxImage } from "@/components/parallax-image";
import { ReviewStrip } from "@/components/review-strip";
import { cabin } from "@/data/cabin";
import { getLodgingJsonLd, getWebsiteJsonLd, homeFaqs } from "@/lib/seo";
import { clusterNavLinks } from "@/lib/routes";

/** Zero-illustration photo-first homepage (pre–illustrative rehaul). */
export function HomePageClassic() {
  return (
    <main>
      <JsonLd id="classic-website-json-ld" data={getWebsiteJsonLd()} />
      <JsonLd id="classic-lodging-json-ld" data={getLodgingJsonLd()} />

      <section className="relative min-h-[92vh] overflow-hidden">
        <HeroParallax src={cabin.heroPhoto.src} alt={cabin.heroPhoto.alt} />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-6 pb-48 pt-32 md:pb-52">
          <h1 className="font-serif max-w-3xl text-5xl leading-[1.05] tracking-tight text-white md:text-7xl">
            {cabin.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 md:text-base">
            {cabin.heroSubhead}
          </p>
        </div>
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6">
          <BookingPill />
        </div>
      </section>

      <section className="border-b border-line bg-parchment">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-[13px] text-muted">
          {cabin.featureBar.map((item, index) => (
            <span key={item} className="flex items-center gap-8">
              {index > 0 && (
                <span className="hidden h-1 w-1 rounded-full bg-muted-light md:inline-block" />
              )}
              {item}
            </span>
          ))}
        </div>
      </section>

      <HolidayReadyStrip />
      <ReviewStrip />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16">
        <ParallaxImage
          src={cabin.narrativePhoto.src}
          alt={cabin.narrativePhoto.alt}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-[4/5] rounded-[1.75rem]"
        />
        <div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            {cabin.narrative.headline}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-muted">{cabin.narrative.body}</p>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif mb-10 text-4xl tracking-tight md:text-5xl">
          Quiet rooms, long views
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:auto-rows-[220px]">
          {cabin.gallery.map((photo) => {
            const spanClass =
              photo.span === "large"
                ? "col-span-2 md:col-span-8 md:row-span-2"
                : photo.span === "medium"
                  ? "col-span-2 md:col-span-4 md:row-span-2"
                  : "col-span-1 md:col-span-4";
            return (
              <div
                key={photo.src}
                className={`relative overflow-hidden rounded-[1.25rem] ${spanClass}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <span className="gallery-label">{photo.caption}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pleasures" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Three honest pleasures</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cabin.pleasures.map((pleasure) => (
            <article key={pleasure.title}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image
                  src={pleasure.image}
                  alt={pleasure.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-serif mt-6 text-3xl tracking-tight">{pleasure.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{pleasure.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="ritual" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif max-w-2xl text-4xl tracking-tight md:text-5xl">
          Sauna. Cool air. Hot tub under the stars.
        </h2>
        <ol className="mt-12 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
          {cabin.ritual.map((step) => (
            <li key={step.step}>
              <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-copper">
                {step.step}
              </p>
              <h3 className="font-serif mt-3 text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Before you book</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {homeFaqs.map((faq) => (
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

      <section id="location" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="dark-panel grid gap-10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
              In the pines of Arrowhead Woods
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              Ninety minutes from Los Angeles. Five minutes to Lake Arrowhead Village. Owner lake
              trails when registered. Beach clubs are not included for short-term guests.
            </p>
            <DriveTimeList />
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[1.25rem] bg-forest">
            <iframe
              title="Lake Arrowhead map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${cabin.address}, ${cabin.city}, ${cabin.state} ${cabin.zip}`)}&z=15&output=embed`}
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="dark-panel grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-12">
          <div>
            <p className="font-serif text-5xl text-copper md:text-6xl">{cabin.rating}★</p>
            <blockquote className="mt-6 max-w-xl">
              <p className="font-serif text-3xl leading-snug tracking-tight md:text-4xl">
                &ldquo;{cabin.featuredReview.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-white/55">
                {cabin.featuredReview.author} · {cabin.featuredReview.detail}
              </footer>
            </blockquote>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-10">
            <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{cabin.ctaHeadline}</h2>
            <div className="mt-8">
              <AirbnbButton
                campaign="classic"
                content="final-cta"
                variant="light"
                label="See open weekends"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {clusterNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-copper underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/" className="text-sm text-muted underline underline-offset-4">
            Illustrated site →
          </Link>
        </div>
      </section>
    </main>
  );
}
