import Image from "next/image";
import Link from "next/link";
import { PhotoClearing } from "@/components/illustration/photo-clearing";
import { AirbnbButton } from "@/components/airbnb-button";
import { cabin } from "@/data/cabin";

type GalleryPhoto = (typeof cabin.gallery)[number];

type EditorialGalleryProps = {
  photos: GalleryPhoto[];
  title?: string;
};

/**
 * Dominant / medium / detail roles. Not six equal ecommerce cards.
 */
export function EditorialGallery({
  photos,
  title = "Quiet rooms, long views",
}: EditorialGalleryProps) {
  const [dominant, mediumA, mediumB, ...details] = photos;

  if (!dominant) return null;

  return (
    <div className="editorial-gallery">
      <h2 className="font-display editorial-gallery-title">{title}</h2>

      <div className="editorial-gallery-grid">
        <div className="editorial-gallery-dominant">
          <PhotoClearing
            src={dominant.src}
            alt={dominant.alt}
            aspectClassName="aspect-[3/4]"
            sizes="(max-width: 768px) 100vw, 55vw"
            overlap="tl"
          />
          {dominant.caption ? (
            <p className="editorial-gallery-caption">{dominant.caption}</p>
          ) : null}
        </div>

        <div className="editorial-gallery-mediums">
          {mediumA ? (
            <figure className="editorial-gallery-medium">
              <PhotoClearing
                src={mediumA.src}
                alt={mediumA.alt}
                aspectClassName="aspect-[4/3]"
                sizes="(max-width: 768px) 100vw, 32vw"
                overlap="none"
              />
              {mediumA.caption ? (
                <figcaption className="editorial-gallery-caption">{mediumA.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
          {mediumB ? (
            <figure className="editorial-gallery-medium">
              <PhotoClearing
                src={mediumB.src}
                alt={mediumB.alt}
                aspectClassName="aspect-[4/3]"
                sizes="(max-width: 768px) 100vw, 32vw"
                overlap="none"
              />
              {mediumB.caption ? (
                <figcaption className="editorial-gallery-caption">{mediumB.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>

        {details.length > 0 ? (
          <div className="editorial-gallery-details">
            {details.slice(0, 3).map((photo) => (
              <figure key={photo.src} className="editorial-gallery-detail">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 18vw"
                  />
                </div>
              </figure>
            ))}
          </div>
        ) : null}
      </div>

      <div className="editorial-gallery-actions">
        <AirbnbButton
          campaign="homepage"
          content="gallery-cta"
          label="Check availability"
        />
        <Link href="/lake-arrowhead-a-frame-cabin" className="editorial-gallery-link">
          A-frame cabin details →
        </Link>
      </div>
    </div>
  );
}
