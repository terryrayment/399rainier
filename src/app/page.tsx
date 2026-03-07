import Image from "next/image";
import Link from "next/link";
import { property, airbnbData } from "@/data/property";

function Hero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={property.photos[0].src}
          alt={property.photos[0].alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 pb-16 md:pb-24 max-w-7xl mx-auto">
        <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-4">
          Lake Arrowhead, California
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-6 text-white">
          399
          <br />
          Rainier
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-8">
          <span>{property.beds} Bed</span>
          <span className="w-px h-3 bg-white/20" />
          <span>{property.baths} Bath</span>
          <span className="w-px h-3 bg-white/20" />
          <span>{property.sqft.toLocaleString()} Sqft</span>
          <span className="w-px h-3 bg-white/20" />
          <span>${property.price.toLocaleString()}</span>
        </div>
        <div className="flex gap-4">
          <Link
            href="#property"
            className="bg-white text-foreground px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-white/90 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="#contact"
            className="border border-white/30 text-white px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-white/10 transition-colors"
          >
            Inquire
          </Link>
        </div>
      </div>
    </section>
  );
}

function PropertyOverview() {
  return (
    <section id="property" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Two-column: text + image */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
          <div>
            <p className="text-muted text-xs tracking-[0.4em] uppercase mb-4">
              The Property
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8">
              {property.headline}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              {property.description}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: property.beds, label: "Bedrooms" },
                { value: property.baths, label: "Bathrooms" },
                {
                  value: property.sqft.toLocaleString(),
                  label: "Square Feet",
                },
                { value: "2", label: "Fireplaces" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-light tracking-tight text-accent">
                    {stat.value}
                  </p>
                  <p className="text-muted text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] gallery-item">
            <Image
              src={property.photos[1].src}
              alt={property.photos[1].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Feature details from inspection report */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "New HVAC",
              detail: "Installed May 2023",
              sub: "Gas forced air + central A/C",
            },
            {
              title: "Two Fireplaces",
              detail: "Wood + gas capable",
              sub: "Masonry, living room & den",
            },
            {
              title: "200-Amp Service",
              detail: "Modern capacity",
              sub: "Copper wiring throughout",
            },
            {
              title: "Low Taxes",
              detail: `$${property.details.propertyTax.toLocaleString()}/yr`,
              sub: "No Mello-Roos, no special assessments",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-surface rounded-2xl"
            >
              <p className="text-foreground font-medium text-sm mb-1">
                {item.title}
              </p>
              <p className="text-2xl font-light tracking-tight text-accent mb-1">
                {item.detail}
              </p>
              <p className="text-muted text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  // Show first 9 photos in a magazine-style grid
  const galleryPhotos = property.photos.slice(0, 9);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-muted text-xs tracking-[0.4em] uppercase mb-4">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            See It For Yourself
          </h2>
        </div>

        {/* Asymmetric magazine grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Hero — full glass A-frame at twilight */}
          <div className="col-span-2 row-span-2 gallery-item relative aspect-square">
            <Image
              src={galleryPhotos[0].src}
              alt={galleryPhotos[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 rounded-b-[12px]">
              <p className="text-sm text-white/90">{galleryPhotos[0].caption}</p>
            </div>
          </div>
          {galleryPhotos.slice(1, 5).map((photo, i) => (
            <div key={i} className="gallery-item relative aspect-square">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 rounded-b-[12px]">
                <p className="text-xs text-white/90">{photo.caption}</p>
              </div>
            </div>
          ))}
          {/* Bottom row — 4 wide */}
          {galleryPhotos.slice(5, 9).map((photo, i) => (
            <div key={i} className="gallery-item relative aspect-[4/3]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 rounded-b-[12px]">
                <p className="text-xs text-white/90">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InvestmentTeaser() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-muted text-xs tracking-[0.4em] uppercase mb-4">
              Investment
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8">
              More Than a Home.
              <br />
              <span className="text-accent">A Proven Business.</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              This isn&apos;t just a beautiful mountain retreat — it&apos;s a
              turnkey income property with a verified track record across Airbnb
              and VRBO. $42K in 2025 revenue. Superhost status. 85 five-star
              reviews.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/investment"
                className="bg-accent text-white px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent-light transition-colors"
              >
                2025 Earnings
              </Link>
              <Link
                href="/calculator"
                className="border border-accent text-accent px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent hover:text-white transition-colors"
              >
                ROI Calculator
              </Link>
            </div>
          </div>

          <div className="bg-surface p-8 md:p-10 rounded-3xl">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light tracking-tight text-accent">
                  $42K
                </p>
                <p className="text-muted text-sm mt-1">2025 Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light tracking-tight text-accent">
                  4.9
                </p>
                <p className="text-muted text-sm mt-1">Guest Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light tracking-tight text-accent">
                  +66%
                </p>
                <p className="text-muted text-sm mt-1">YoY Growth</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light tracking-tight text-accent">
                  85
                </p>
                <p className="text-muted text-sm mt-1">Reviews</p>
              </div>
            </div>
            {/* Mini revenue bar */}
            <div className="flex items-end gap-1 h-20">
              {airbnbData.monthly2025.map((m) => {
                const max = 9481.21;
                const pct = (m.revenue / max) * 100;
                return (
                  <div
                    key={m.month}
                    className="flex-1 bg-accent/20 rounded-t hover:bg-accent/40 transition-colors"
                    style={{ height: `${Math.max(pct, 4)}%` }}
                    title={`${m.month}: $${m.revenue.toLocaleString()}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-muted/50 mt-1 px-0.5">
              <span>Jan</span>
              <span>Dec</span>
            </div>
            {/* VRBO feature badge */}
            <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-center">
              <a
                href="https://www.instagram.com/p/DS2t45NCX08/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted/60 hover:text-muted transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                Featured in VRBO&apos;s official Instagram campaign
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyDetails() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-muted text-xs tracking-[0.4em] uppercase mb-4">
            Under the Hood
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Built to <span className="text-accent">Last</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Interior features */}
          <div className="bg-background rounded-2xl p-8">
            <h3 className="text-sm text-muted tracking-wider uppercase mb-6">
              Interior
            </h3>
            <div className="space-y-4">
              {property.features.interior.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-3 text-foreground/80 text-sm"
                >
                  <span className="text-accent mt-0.5 text-xs">&#10004;</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Exterior features */}
          <div className="bg-background rounded-2xl p-8">
            <h3 className="text-sm text-muted tracking-wider uppercase mb-6">
              Exterior
            </h3>
            <div className="space-y-4">
              {property.features.exterior.map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-3 text-foreground/80 text-sm"
                >
                  <span className="text-accent mt-0.5 text-xs">&#10004;</span>
                  {f}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-black/5">
              <h3 className="text-sm text-muted tracking-wider uppercase mb-4">
                Peace of Mind
              </h3>
              <div className="space-y-3 text-sm text-foreground/80">
                <div className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 text-xs">&#10004;</span>
                  Not in a flood zone or earthquake fault zone
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 text-xs">&#10004;</span>
                  No Mello-Roos or special assessment liens
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 text-xs">&#10004;</span>
                  STR-compliant — fully permitted
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 text-xs">&#10004;</span>
                  Public water + natural gas service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NeighborhoodTeaser() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Aerial lake image */}
          <div className="relative aspect-[4/3] gallery-item order-2 md:order-1">
            <Image
              src={property.photos[2].src}
              alt={property.photos[2].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-muted text-xs tracking-[0.4em] uppercase mb-4">
              The Neighborhood
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8">
              A Life
              <br />
              <span className="text-accent">Worth Living</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              90 minutes from 13 million people in Greater LA. Lake Arrowhead
              offers four-season mountain living with world-class recreation and
              the serenity of the San Bernardino National Forest.
            </p>
            <Link
              href="/neighborhood"
              className="border border-accent text-accent px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              Explore the Area
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-surface">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-muted text-xs tracking-[0.4em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Interested?
          </h2>
          <p className="text-muted text-lg">
            Schedule a private tour, request the investment prospectus, or ask
            us anything.
          </p>
        </div>

        {/* Agent card */}
        <div className="bg-background rounded-2xl p-8 mb-10 text-center">
          <p className="text-muted text-xs tracking-[0.3em] uppercase mb-3">
            Listed By
          </p>
          <h3 className="text-2xl font-light tracking-tight mb-1">
            Gary Doss
          </h3>
          <p className="text-muted text-sm mb-1">
            Senior Real Estate Agent
          </p>
          <p className="text-muted text-sm mb-6">
            Compass &middot; DRE# 01416748
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:gary.doss@compass.com?subject=Inquiry%20—%20399%20Rainier%20Road%2C%20Lake%20Arrowhead"
              className="bg-accent text-white px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent-light transition-colors"
            >
              Email Gary
            </a>
            <a
              href="https://www.compass.com/agents/gary-doss/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent text-accent px-7 py-3 text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              View on Compass
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted text-sm mb-1">Or reach out directly</p>
          <a
            href="mailto:gary.doss@compass.com"
            className="text-accent text-sm hover:underline"
          >
            gary.doss@compass.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <PropertyOverview />
      <Gallery />
      <InvestmentTeaser />
      <PropertyDetails />
      <NeighborhoodTeaser />
      <ContactSection />
    </main>
  );
}
