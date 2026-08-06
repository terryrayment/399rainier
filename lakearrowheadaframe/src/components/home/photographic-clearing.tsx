import { EditorialGallery } from "@/components/illustration/editorial-gallery";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { cabin } from "@/data/cabin";

/** Exclude hero + narrative sources so the gallery doesn’t repeat them. */
const galleryPhotos = cabin.gallery.filter(
  (photo) => photo.src !== cabin.heroPhoto.src && photo.src !== cabin.narrativePhoto.src,
);

export function PhotographicClearing() {
  return (
    <SceneChapter scene="gallery" id="gallery" contentClassName="photographic-clearing-inner">
      <EditorialGallery photos={galleryPhotos.slice(0, 6)} />
    </SceneChapter>
  );
}
