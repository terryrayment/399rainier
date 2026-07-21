import Image from "next/image";
import { vignettes, type VignetteName } from "@/data/illustrations";

type VignetteProps = {
  name: VignetteName;
  className?: string;
  showCaption?: boolean;
  priority?: boolean;
};

/** Standalone illustrative vignette. Sits beside photos, never replaces them. */
export function IllustratedVignette({
  name,
  className = "",
  showCaption = true,
  priority = false,
}: VignetteProps) {
  const vignette = vignettes[name];

  return (
    <figure className={`illustrated-vignette ${className}`.trim()}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-forest/10 shadow-[0_20px_50px_rgba(26,29,22,0.12)]">
        <Image
          src={vignette.src}
          alt={vignette.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      {showCaption ? (
        <figcaption className="mt-3 text-[11px] uppercase tracking-[0.14em] text-muted">
          {vignette.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
