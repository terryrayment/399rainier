import { sceneAssets } from "@/data/illustration-scenes";

type ForestTransitionProps = {
  variant?: "mist" | "canopy" | "ember" | "lake" | "night" | "cabin-mist" | "hills";
  className?: string;
};

/** Full-width continuous scene change — mist / cabin / hills like the motif mockup. */
export function ForestTransition({
  variant = "mist",
  className = "",
}: ForestTransitionProps) {
  const src =
    variant === "cabin-mist" || variant === "mist" || variant === "canopy"
      ? sceneAssets.mistCabinTransition
      : variant === "lake"
        ? sceneAssets.lakeMist
        : variant === "hills" || variant === "night" || variant === "ember"
          ? sceneAssets.forestHillsTransition
          : sceneAssets.mistCabinTransition;
  const file = src.split("/").pop() ?? "";
  const mobileSrc = `/illustrations/scenes/mobile/${file}`;

  return (
    <div
      className={`forest-transition forest-transition--${variant} ${className}`}
      aria-hidden="true"
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
        <img src={src} alt="" className="forest-transition-plate" loading="lazy" decoding="async" />
      </picture>
      <div className="forest-transition-veil" />
    </div>
  );
}
