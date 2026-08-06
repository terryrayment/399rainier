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
 * Captions stay in alt text only so the grid can stay tight.
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
            aspectClassName="aspect-[3/4] editorial-gallery-frame"
            sizes="(max-width: 599px) 100vw, (max-width: 899px) 100vw, (min-width: 1440px) 52rem, 56vw"
            overlap="tl"
          />
        </div>

        <div className="editorial-gallery-mediums">
          {mediumA ? (
            <div className="editorial-gallery-medium">
              <PhotoClearing
                src={mediumA.src}
                alt={mediumA.alt}
                aspectClassName="aspect-[4/3] editorial-gallery-frame"
                sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 28rem, 31vw"
                overlap="none"
              />
            </div>
          ) : null}
          {mediumB ? (
            <div className="editorial-gallery-medium">
              <PhotoClearing
                src={mediumB.src}
                alt={mediumB.alt}
                aspectClassName="aspect-[4/3] editorial-gallery-frame"
                sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, (min-width: 1440px) 28rem, 31vw"
                overlap="none"
              />
            </div>
          ) : null}
        </div>

        {details.length > 0 ? (
          <div className="editorial-gallery-details">
            {details.slice(0, 3).map((photo) => (
              <div key={photo.src} className="editorial-gallery-detail">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 599px) 100vw, (max-width: 899px) 33vw, (min-width: 1440px) 26rem, 29vw"
                  />
                </div>
              </div>
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
