import { ArrivalClearing } from "@/components/home/arrival-clearing";
import { InsideTheGlassChapter } from "@/components/home/inside-the-glass-chapter";
import { NightBookingClose } from "@/components/home/night-booking-close";
import { PhotographicClearing } from "@/components/home/photographic-clearing";
import { PlaceAndPracticalTruth } from "@/components/home/place-and-practical-truth";
import { RitualAtDusk } from "@/components/home/ritual-at-dusk";
import { TrustForestFloor } from "@/components/home/trust-forest-floor";
import { BookingDock } from "@/components/illustration/booking-dock";
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

export default function HomePage() {
  return (
    <div className="illustrated-page clearing-home">
      <JsonLd id="website-json-ld" data={getWebsiteJsonLd()} />
      <JsonLd id="lodging-json-ld" data={getLodgingJsonLd()} />

      <ArrivalClearing />
      <TrustForestFloor />
      <InsideTheGlassChapter />
      <PhotographicClearing />
      <RitualAtDusk />
      <PlaceAndPracticalTruth />
      <NightBookingClose />

      <BookingDock variant="mobile-bar" content="mobile-sticky" />
    </div>
  );
}
