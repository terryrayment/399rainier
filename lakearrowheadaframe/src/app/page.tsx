import Image from "next/image";
import Link from "next/link";
import { AirbnbButton, BookingPill } from "@/components/airbnb-button";
import { DriveTimeList } from "@/components/drive-time-list";
import { HeroParallax } from "@/components/hero-parallax";
import { JsonLd } from "@/components/json-ld";
import { ParallaxImage } from "@/components/parallax-image";
import { ReviewStrip } from "@/components/review-strip";
import { cabin } from "@/data/cabin";
import {
  createMetadata,
  getLodgingJsonLd,
  getWebsiteJsonLd,
  homeFaqs,
} from "@/lib/seo";
import { clusterNavLinks } from "@/lib/routes";

const homeMeta = createMetadata({
  title: "Lake Arrowhead Cabin Rental | A-Frame with Sauna & Hot Tub",
  description:
    "Lake Arrowhead cabin rental in Arrowhead Woods — indoor sauna, hot tub in the pines, dog-friendly fenced yard, honest lake trails. Guest Favorite A-frame, 90 minutes from Los Angeles.",
  path: "/",
  keywords: [
    "Lake Arrowhead cabin rentals",
    "Lake Arrowhead cabin rental",
    "Lake Arrowhead A-frame rental",
  ],
});

export const metadata = {
  ...homeMeta,
  title: {
    absolute: "Lake Arrowhead Cabin Rental | A-Frame with Sauna & Hot Tub",
  },
};

function AccentHeadline({ text, accents }: { text: string; accents: string[] }) {
  const parts = text.split(new RegExp(`(${accents.join("|")})`, "g"));

  return (
    <span>
      {parts.map((part, index) =>
        accents.includes(part) ? (
          <span key={`${part}-${index}`} className="accent-word">
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </span>
  );
}

export default function HomePage() {
  return (
    <main>
      <JsonLd id="website-json-ld" data={getWebsiteJsonLd()} />
      <JsonLd id="lodging-json-ld" data={getLodgingJsonLd()} />

      {/* Hero */}
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

      {/* Feature bar */}
      <section className="border-b border-line bg-parchment">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-[13px] text-muted">
          {cabin.featureBar.map((item, index) => (
            <span key={item} className="flex items-center gap-8">
              {index > 0 && <span className="hidden h-1 w-1 rounded-full bg-muted-light md:inline-block" />}
              {item}
            </span>
          ))}
        </div>
      </section>

      <ReviewStrip />

      {/* Narrative intro */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16">
        <ParallaxImage
          src={cabin.narrativePhoto.src}
          alt={cabin.narrativePhoto.alt}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-[4/5] rounded-[1.75rem]"
        />
        <div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            <AccentHeadline text={cabin.narrative.headline} accents={cabin.narrative.accentWords} />
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-muted">{cabin.narrative.body}</p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
            Looking for a specific kind of Lake Arrowhead cabin rental? Start with{" "}
            <Link href="/lake-arrowhead-cabin-with-sauna" className="text-copper underline underline-offset-4">
              sauna
            </Link>
            ,{" "}
            <Link href="/dog-friendly-lake-arrowhead-cabin" className="text-copper underline underline-offset-4">
              dog-friendly
            </Link>
            , or a{" "}
            <Link href="/weekend-from-los-angeles" className="text-copper underline underline-offset-4">
              weekend from Los Angeles
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Quiet rooms, long views</h2>
        </div>

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
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <span className="gallery-label">{photo.caption}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Three pleasures */}
      <section id="pleasures" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Three honest pleasures</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cabin.pleasures.map((pleasure) => (
            <article key={pleasure.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                <Image
                  src={pleasure.image}
                  alt={pleasure.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-serif mt-6 text-3xl tracking-tight">{pleasure.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{pleasure.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Mountain ritual */}
      <section id="ritual" className="mx-auto max-w-7xl px-6 pb-24">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">The Ritual</p>
        <h2 className="font-serif mt-3 max-w-2xl text-4xl tracking-tight md:text-5xl">
          Sauna. Cool air. Hot tub under the stars.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
          Not a spa menu — a mountain circuit you can actually do before dinner.{" "}
          <Link
            href="/lake-arrowhead-cabin-with-sauna"
            className="text-copper underline underline-offset-4"
          >
            Lake Arrowhead cabin with sauna →
          </Link>
        </p>

        <ol className="mt-12 grid gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-8">
          {cabin.ritual.map((step) => (
            <li key={step.step}>
              <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-copper">
                {step.step}
              </p>
              <h3 className="font-serif mt-3 text-2xl tracking-tight md:text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why this cabin */}
      <section id="why" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
          What the others leave out
        </h2>

        <div className="mt-12 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {cabin.differentiators.map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-2xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="mt-4 inline-block text-sm text-copper transition hover:text-ink"
                >
                  {"linkLabel" in item && item.linkLabel
                    ? item.linkLabel
                    : "Learn more →"}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Guides hub */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">Guides</p>
        <h2 className="font-serif mt-3 text-4xl tracking-tight md:text-5xl">
          Lake Arrowhead cabin rental guides
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Long-tail pages for guests comparing sauna cabins, dog-friendly yards, A-frames, and
          LA weekends — plus the shoreline honesty most listings skip.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {clusterNavLinks.map((link) => (
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

      {/* FAQ */}
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

      {/* Location */}
      <section id="location" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="dark-panel grid gap-10 p-8 md:grid-cols-2 md:p-12 lg:p-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Location</p>
            <h2 className="font-serif mt-4 text-4xl leading-tight tracking-tight md:text-5xl">
              In the pines of Arrowhead Woods
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              Ninety minutes from Los Angeles. Five minutes to Lake Arrowhead Village. Owner lake
              trails when registered — beach clubs are not included for short-term guests.
            </p>
            <DriveTimeList />
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[1.25rem] bg-forest">
            <iframe
              title="Lake Arrowhead map"
              src="https://maps.google.com/maps?q=Arrowhead+Woods,+Lake+Arrowhead,+CA&z=13&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Reviews — slim anthology CTA */}
      <section id="reviews" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col gap-6 border-t border-line pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">Reviews</p>
            <h2 className="font-serif mt-3 text-4xl tracking-tight md:text-5xl">
              {cabin.reviewCount} quiet stays
            </h2>
            <p className="mt-3 text-sm text-muted">
              Guest Favorite · {cabin.rating} average · Superhost Terry
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="font-serif text-5xl text-copper">{cabin.rating}★</p>
            <Link
              href="/chapters"
              className="text-sm text-ink underline decoration-line underline-offset-4 transition hover:text-copper"
            >
              Read the guest anthology →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="dark-panel flex flex-col items-start gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12 lg:p-16">
          <div>
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">{cabin.ctaHeadline}</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
              Book on Airbnb — indoor sauna, hot tub in the pines, dog-friendly, 165 Mbps for remote
              weeks.
            </p>
          </div>
          <AirbnbButton campaign="homepage" content="final-cta" variant="light" />
        </div>
      </section>
    </main>
  );
}
