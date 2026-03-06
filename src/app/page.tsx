import Image from "next/image";
import Link from "next/link";
import { property, airbnbData } from "@/data/property";

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={property.photos[0].src}
          alt={property.photos[0].alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6 font-medium">
          Lake Arrowhead, California
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6">
          {property.address.split(" ")[0]}{" "}
          <span className="text-accent">{property.address.split(" ").slice(1).join(" ")}</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 font-light mb-4 font-serif italic">
          {property.tagline}
        </p>
        <p className="text-muted text-lg mb-10">
          {property.beds} Bed &middot; {property.baths} Bath &middot;{" "}
          {property.sqft.toLocaleString()} Sqft &middot; ${property.price.toLocaleString()}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#property"
            className="bg-accent text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
          >
            Explore the Property
          </Link>
          <Link
            href="#contact"
            className="border border-foreground/30 text-foreground px-8 py-3 text-sm font-medium tracking-wider uppercase hover:border-accent hover:text-accent transition-colors"
          >
            Schedule a Viewing
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent" />
      </div>
    </section>
  );
}

function PropertyOverview() {
  return (
    <section id="property" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">The Property</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8">
              {property.headline}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">{property.description}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-2 border-accent pl-4">
                <p className="text-3xl font-serif text-foreground">{property.beds}</p>
                <p className="text-muted text-sm">Bedrooms</p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <p className="text-3xl font-serif text-foreground">{property.baths}</p>
                <p className="text-muted text-sm">Bathrooms</p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <p className="text-3xl font-serif text-foreground">
                  {property.sqft.toLocaleString()}
                </p>
                <p className="text-muted text-sm">Square Feet</p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <p className="text-3xl font-serif text-foreground">3</p>
                <p className="text-muted text-sm">Decks</p>
              </div>
            </div>
          </div>

          {/* Feature image */}
          <div className="relative aspect-[4/5] gallery-item">
            <Image
              src={property.photos[1].src}
              alt={property.photos[1].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-24 grid md:grid-cols-2 gap-x-16 gap-y-6 stagger-children">
          {property.highlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-white/5">
              <span className="text-accent text-lg mt-0.5">&#10004;</span>
              <p className="text-foreground/80">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Gallery</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light">
            See It For Yourself
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {property.photos.map((photo, i) => (
            <div
              key={i}
              className={`gallery-item relative ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-[4/3]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm text-white/80">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-8">
          More photos available upon request. Schedule a private tour to experience the home in person.
        </p>
      </div>
    </section>
  );
}

function InvestmentTeaser() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Investment</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8">
              More Than a Home.
              <br />
              <span className="text-accent">A Proven Business.</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              This isn&apos;t just a beautiful mountain retreat — it&apos;s a turnkey income
              property with a strong Airbnb track record. Lake Arrowhead ranks #43
              nationally for short-term rental ROI, and this home is one of the top performers
              in the area.
            </p>
            <Link
              href="/investment"
              className="inline-block bg-accent text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
            >
              View Full Investment Details
            </Link>
          </div>

          {/* Quick stats */}
          <div className="bg-surface p-8 md:p-12 border border-white/5">
            <h3 className="font-serif text-2xl mb-8 text-center">Performance Snapshot</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-muted">Average Nightly Rate</span>
                <span className="text-2xl font-serif text-accent">
                  ${airbnbData.averageNightlyRate}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-muted">Occupancy Rate</span>
                <span className="text-2xl font-serif text-accent">
                  {Math.round(airbnbData.occupancyRate * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-muted">Annual Revenue</span>
                <span className="text-2xl font-serif text-accent">
                  ${airbnbData.annualRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-muted">Guest Rating</span>
                <span className="text-2xl font-serif text-accent">
                  {airbnbData.averageRating} &#9733;
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Superhost Status</span>
                <span className="text-accent font-medium">
                  {airbnbData.superhostStatus ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NeighborhoodTeaser() {
  const seasonEmoji: Record<string, string> = {
    Winter: "\u2744\uFE0F",
    Spring: "\uD83C\uDF38",
    Summer: "\u2600\uFE0F",
    Fall: "\uD83C\uDF41",
  };

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">The Neighborhood</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            A Life Worth Living
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            90 minutes from downtown LA, Lake Arrowhead offers four-season mountain living
            with world-class recreation, charming village culture, and the serenity of the
            San Bernardino National Forest.
          </p>
        </div>

        {/* Seasons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { name: "Winter", description: "Snow-dusted pines, cozy fires, skiing at Snow Valley" },
            { name: "Spring", description: "Wildflowers, green canopy, trails reopen" },
            { name: "Summer", description: "Lake days, hiking, golden-hour deck sunsets" },
            { name: "Fall", description: "Autumn color, cool mornings, first fires" },
          ].map((season) => (
            <div
              key={season.name}
              className="text-center p-6 border border-white/5 hover:border-accent/30 transition-colors"
            >
              <span className="text-3xl mb-3 block">{seasonEmoji[season.name]}</span>
              <h3 className="font-serif text-lg mb-2">{season.name}</h3>
              <p className="text-muted text-sm">{season.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/neighborhood"
            className="inline-block border border-accent text-accent px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent hover:text-background transition-colors"
          >
            Explore the Neighborhood
          </Link>
        </div>
      </div>
    </section>
  );
}

function StayBeforeYouBuyTeaser() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={property.photos[5].src}
          alt="A-frame in winter"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Exclusive Program</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8">
          Stay Before You Buy
        </h2>
        <p className="text-foreground/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Why buy a home you&apos;ve only walked through for 30 minutes? Experience life at
          399 Rainier firsthand. Book a stay, fall in love, and if you decide to make it yours —
          your stay is on us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/experience"
            className="bg-accent text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
          >
            Learn How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Interested?
          </h2>
          <p className="text-muted text-lg">
            Schedule a private tour, request the investment prospectus, or ask us anything.
          </p>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-muted mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-background border border-white/10 px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-background border border-white/10 px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-muted mb-2">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full bg-background border border-white/10 px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
              placeholder="(555) 000-0000"
            />
          </div>

          <div>
            <label htmlFor="interest" className="block text-sm text-muted mb-2">
              I&apos;m interested as a...
            </label>
            <select
              id="interest"
              name="interest"
              className="w-full bg-background border border-white/10 px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
            >
              <option value="">Select one</option>
              <option value="primary">Primary / Vacation Home Buyer</option>
              <option value="investor">Investment / Airbnb Buyer</option>
              <option value="both">Both — Lifestyle + Income</option>
              <option value="agent">Real Estate Agent</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full bg-background border border-white/10 px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your interest in the property..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-background py-4 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
          >
            Send Inquiry
          </button>
        </form>

        <p className="text-center text-muted/50 text-xs mt-6">
          Your information is private and will never be shared. We&apos;ll respond within 24 hours.
        </p>
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
      <NeighborhoodTeaser />
      <StayBeforeYouBuyTeaser />
      <ContactSection />
    </main>
  );
}
