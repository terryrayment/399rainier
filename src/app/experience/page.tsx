import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stay Before You Buy — 399 Rainier Road, Lake Arrowhead",
  description:
    "Experience life at 399 Rainier before you buy. Book a stay, fall in love, and your stay is credited toward the purchase.",
};

export default function ExperiencePage() {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">
            Exclusive Program
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-8">
            Stay Before <span className="text-accent">You Buy</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl">
            Most home tours last 30 minutes. You walk through rooms, glance at closets, and
            make a decision about the next chapter of your life based on a first impression.
            We think you deserve better than that.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">
            The Problem With Home Tours
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-white/5">
              <p className="text-3xl mb-4">30</p>
              <p className="text-muted text-sm">
                Minutes is the average home showing. That&apos;s how long you get to decide
                if this is where you&apos;ll build your life.
              </p>
            </div>
            <div className="p-6 border border-white/5">
              <p className="text-3xl mb-4">2pm</p>
              <p className="text-muted text-sm">
                Most showings happen mid-afternoon. You never see the morning light, the
                evening stars, or how the house feels when it rains.
              </p>
            </div>
            <div className="p-6 border border-white/5">
              <p className="text-3xl mb-4">0</p>
              <p className="text-muted text-sm">
                Nights spent in the home before buying. You wouldn&apos;t marry someone
                after a 30-minute date. Why buy a home after a 30-minute tour?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The solution */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">
            A Better Way
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-12 max-w-2xl">
            399 Rainier is a proven Airbnb property with dozens of five-star reviews.
            Instead of a rushed showing, we invite you to <strong className="text-foreground">live here</strong>.
            Experience the morning coffee on the deck, the evening fire, the sound of rain
            on the A-frame roof. Then decide.
          </p>

          <div className="space-y-0">
            {/* Step 1 */}
            <div className="flex gap-8 items-start py-8 border-b border-white/5">
              <div className="w-16 h-16 shrink-0 bg-accent/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-accent">1</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">Book Your Stay</h3>
                <p className="text-muted leading-relaxed">
                  Reserve a 2-3 night stay through our Airbnb listing (or contact us directly
                  for preferred scheduling). Come with your family, your partner, your dog —
                  whoever will share this home with you.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 items-start py-8 border-b border-white/5">
              <div className="w-16 h-16 shrink-0 bg-accent/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-accent">2</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">Experience the Life</h3>
                <p className="text-muted leading-relaxed">
                  Wake up with the sunrise through the floor-to-ceiling windows. Cook dinner
                  in the kitchen. Sit on all three decks. Walk the neighborhood. Visit the
                  Village. Drive the lake. Feel what it&apos;s like to live here — not just
                  visit.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 items-start py-8 border-b border-white/5">
              <div className="w-16 h-16 shrink-0 bg-accent/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-accent">3</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">Decide With Confidence</h3>
                <p className="text-muted leading-relaxed">
                  After your stay, you&apos;ll know — really know — if this is your place.
                  No pressure, no rush. If you love it (and most guests do), move to the
                  next step.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-8 items-start py-8">
              <div className="w-16 h-16 shrink-0 bg-accent/10 flex items-center justify-center">
                <span className="font-serif text-2xl text-accent">4</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2">Your Stay Is On Us</h3>
                <p className="text-muted leading-relaxed">
                  If you proceed to purchase 399 Rainier,{" "}
                  <strong className="text-foreground">
                    the full cost of your stay is credited back to you at closing
                  </strong>
                  . Consider it a free test drive of your future home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            Why This <span className="text-accent">Works</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/5 bg-background">
              <h3 className="font-serif text-xl mb-3">For Buyers</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>No risk — enjoy a vacation either way</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Experience the home in a way no tour can replicate</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>See the neighborhood, meet the community</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Full stay cost credited if you buy</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Bring the whole family to decide together</span>
                </li>
              </ul>
            </div>

            <div className="p-8 border border-white/5 bg-background">
              <h3 className="font-serif text-xl mb-3">For Investors</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Verify the Airbnb guest experience firsthand</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Assess property condition beyond a walkthrough</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Test the neighborhood for rental appeal</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Understand the guest perspective</span>
                </li>
                <li className="flex gap-3 text-muted">
                  <span className="text-accent shrink-0">&#10004;</span>
                  <span>Confirm the revenue potential with your own eyes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12">
            Common Questions
          </h2>

          <div className="space-y-8">
            {[
              {
                q: "How long should I stay?",
                a: "We recommend 2-3 nights to get a full sense of the property. Weekends are popular for experiencing both the quiet weekday mornings and the village energy on weekends.",
              },
              {
                q: "Can I bring my family?",
                a: "Absolutely. The home sleeps 6 comfortably with 3 bedrooms and 3 bathrooms. We encourage you to bring everyone who'll be part of the decision.",
              },
              {
                q: "How does the credit work?",
                a: "If you proceed to purchase 399 Rainier within 90 days of your stay, the full nightly cost of your stay (excluding cleaning and service fees) is credited to you at closing as a seller concession.",
              },
              {
                q: "What if I'm not sure yet?",
                a: "That's the whole point. There's zero obligation. Enjoy a beautiful mountain getaway and take your time. Many of our guests return for a second stay before deciding.",
              },
              {
                q: "Can I schedule a traditional showing instead?",
                a: "Of course. Private tours are available by appointment. But we genuinely believe staying here overnight gives you information a walkthrough never could.",
              },
            ].map((item, i) => (
              <div key={i} className="pb-8 border-b border-white/5">
                <h3 className="font-medium text-foreground text-lg mb-3">{item.q}</h3>
                <p className="text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-surface text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Ready to Experience It?
          </h2>
          <p className="text-muted text-lg mb-8">
            Book your stay and see if 399 Rainier is the one. No pressure, no obligation —
            just a beautiful mountain weekend with a potential life change at the end of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-accent text-background px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent-light transition-colors"
            >
              Book Your Stay
            </Link>
            <Link
              href="/investment"
              className="border border-accent text-accent px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-accent hover:text-background transition-colors"
            >
              View Investment Details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
