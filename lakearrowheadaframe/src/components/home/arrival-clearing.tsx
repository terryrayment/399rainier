import { BookingDock } from "@/components/illustration/booking-dock";
import { PhotoClearing } from "@/components/illustration/photo-clearing";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { cabin } from "@/data/cabin";

export function ArrivalClearing() {
  return (
    <SceneChapter
      scene="arrival"
      className="arrival-clearing"
      contentClassName="arrival-clearing-inner"
    >
      <div className="arrival-clearing-stage" id="hero-booking">
        <PhotoClearing
          src={cabin.heroPhoto.src}
          alt={cabin.heroPhoto.alt}
          priority
          overlap="dual"
          aspectClassName="aspect-[4/5] md:aspect-[16/10]"
          className="arrival-clearing-photo"
        >
          <div className="arrival-clearing-veil" />
          <div className="arrival-clearing-copy">
            <h1 className="font-display arrival-clearing-headline">{cabin.heroHeadline}</h1>
            <p className="arrival-clearing-subhead">{cabin.heroSubhead}</p>
          </div>
        </PhotoClearing>
        <BookingDock variant="hero" className="arrival-clearing-dock" />
      </div>
    </SceneChapter>
  );
}
