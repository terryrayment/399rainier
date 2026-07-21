import Image from "next/image";
import { sceneAssets } from "@/data/illustration-scenes";

type PhotoClearingProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  aspectClassName?: string;
  className?: string;
  /** Default none — use sparingly so branches never stamp every photo */
  overlap?: "none" | "tl" | "tr" | "bl" | "br" | "dual";
  children?: React.ReactNode;
};

/**
 * Authentic property photography. Optional photo-local foliage overlap (3–8%)
 * stays inside this isolated stacking context and never covers page copy/controls.
 */
export function PhotoClearing({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 1100px",
  aspectClassName = "aspect-[4/5] md:aspect-[16/10]",
  className = "",
  overlap = "none",
  children,
}: PhotoClearingProps) {
  return (
    <div className={`photo-clearing ${className}`}>
      <div className={`photo-clearing-frame relative overflow-hidden ${aspectClassName}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
        {children ? <div className="photo-clearing-copy">{children}</div> : null}
      </div>

      {overlap !== "none" ? (
        <div className="photo-clearing-overlap" aria-hidden="true">
          {(overlap === "tl" || overlap === "dual" || overlap === "bl") && (
            <picture>
              <source media="(max-width: 767px)" srcSet="/illustrations/scenes/mobile/scene-branch-left.webp" />
              <img
                src={sceneAssets.branchLeft}
                alt=""
                className={`photo-overlap-branch photo-overlap-branch--left ${
                  overlap === "bl" ? "photo-overlap-branch--bottom" : ""
                }`}
                loading="lazy"
                decoding="async"
              />
            </picture>
          )}
          {(overlap === "tr" || overlap === "dual" || overlap === "br") && (
            <picture>
              <source media="(max-width: 767px)" srcSet="/illustrations/scenes/mobile/scene-branch-right.webp" />
              <img
                src={sceneAssets.branchRight}
                alt=""
                className={`photo-overlap-branch photo-overlap-branch--right ${
                  overlap === "br" ? "photo-overlap-branch--bottom" : ""
                }`}
                loading="lazy"
                decoding="async"
              />
            </picture>
          )}
        </div>
      ) : null}
    </div>
  );
}
