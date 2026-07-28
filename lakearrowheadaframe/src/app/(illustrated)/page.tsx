import { ArrivalClearing } from "@/components/home/arrival-clearing";
import { InsideTheGlassChapter } from "@/components/home/inside-the-glass-chapter";
import { NightBookingClose } from "@/components/home/night-booking-close";
import { PhotographicClearing } from "@/components/home/photographic-clearing";
import { PlaceAndPracticalTruth } from "@/components/home/place-and-practical-truth";
import { RitualAtDusk } from "@/components/home/ritual-at-dusk";
import { TrustForestFloor } from "@/components/home/trust-forest-floor";
import { BookingDock } from "@/components/illustration/booking-dock";
import { SceneBridge } from "@/components/illustration/scene-bridge";
import { JsonLd } from "@/components/json-ld";
import {
  createMetadata,
  getLodgingJsonLd,
  getWebsiteJsonLd,
} from "@/lib/seo";

const homeMeta = createMetadata({
  title: "Lake Arrowhead Cabin Rental | A-Frame with Sauna & Hot Tub",
  description:
    "Lake Arrowhead cabin rental in Arrowhead Woods. Indoor sauna, hot tub in the pines, dog-friendly fenced yard, honest lake trails. Guest Favorite A-frame, 90 minutes from Los Angeles.",
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

/**
 * Homepage chapter map (one SceneBridge owns each boundary):
 * 1. Arrival → Trust: forest floor from hero/booking
 * 2. Trust → Interior: mist lift into sage/parchment
 * 3. Interior → Gallery: restrained clearing
 * 4. Gallery → Ritual: no banner; Ritual dusk wash owns the open-in
 * 5. Ritual → Place → Night: continuous tone (no strip bridges)
 * 6. Night → Footer: shared night base (color continuity)
 */
export default function HomePage() {
  return (
    <div className="illustrated-page clearing-home">
      <JsonLd id="website-json-ld" data={getWebsiteJsonLd()} />
      <JsonLd id="lodging-json-ld" data={getLodgingJsonLd()} />

      <ArrivalClearing />
      <SceneBridge
        fromTone="paper"
        toTone="forest"
        motif="forest-floor"
        height="11rem"
        mobileHeight="7rem"
        edgeDensity="dense"
        overlap="both"
        className="scene-bridge--arrival-trust"
      />
      <TrustForestFloor />
      <SceneBridge
        fromTone="forest"
        toTone="sage"
        motif="mist-lift"
        height="10rem"
        mobileHeight="6.5rem"
        edgeDensity="dense"
        overlap="down"
        className="scene-bridge--trust-interior"
      />
      <InsideTheGlassChapter />
      <SceneBridge
        fromTone="sage"
        toTone="paper"
        motif="clearing"
        height="5rem"
        mobileHeight="3.5rem"
        edgeDensity="open"
        className="scene-bridge--interior-gallery"
      />
      <PhotographicClearing />
      <RitualAtDusk />
      {/* Ritual → Place → Night: continuous tone; no strip bridges */}
      <PlaceAndPracticalTruth />
      <NightBookingClose />

      <BookingDock variant="mobile-bar" content="mobile-sticky" />
    </div>
  );
}
