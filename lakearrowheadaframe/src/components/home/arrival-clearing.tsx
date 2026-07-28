import { BookingDock } from "@/components/illustration/booking-dock";
import { PhotoClearing } from "@/components/illustration/photo-clearing";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { cabin } from "@/data/cabin";
import { sceneAssets } from "@/data/illustration-scenes";

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
        {/* Pine skirts break the hard parchment→forest seam around the dock */}
        <div className="arrival-pine-skirt" aria-hidden="true">
          <img
            src={sceneAssets.pinesLeft}
            alt=""
            className="arrival-pine-skirt-plate arrival-pine-skirt-plate--left"
            loading="lazy"
            decoding="async"
          />
          <img
            src={sceneAssets.pinesRight}
            alt=""
            className="arrival-pine-skirt-plate arrival-pine-skirt-plate--right"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </SceneChapter>
  );
}
