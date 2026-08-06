import Image from "next/image";
import { vignettes, type VignetteName } from "@/data/illustrations";

type AtmosphericArtworkProps = {
  name: VignetteName;
  className?: string;
  sizes?: string;
};

/**
 * Explicitly non-literal concept art. Never presented as property proof.
 */
export function AtmosphericArtwork({
  name,
  className = "",
  sizes = "(max-width: 768px) 100vw, 40vw",
}: AtmosphericArtworkProps) {
  const art = vignettes[name];

  return (
    <figure className={`atmospheric-artwork ${className}`}>
      <div className="atmospheric-artwork-frame relative aspect-[4/5] overflow-hidden">
        <Image
          src={art.src}
          alt={art.alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </div>
      <figcaption className="atmospheric-artwork-caption">
        <span className="atmospheric-artwork-label">Atmosphere</span>
        {art.caption}
      </figcaption>
    </figure>
  );
}
