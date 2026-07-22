import { SceneBridge, type BridgeMotif, type BridgeTone } from "@/components/illustration/scene-bridge";

type ForestTransitionProps = {
  variant?: "mist" | "canopy" | "ember" | "lake" | "night" | "cabin-mist" | "hills";
  className?: string;
};

const variantMap: Record<
  NonNullable<ForestTransitionProps["variant"]>,
  { fromTone: BridgeTone; toTone: BridgeTone; motif: BridgeMotif; height: string; mobileHeight: string }
> = {
  mist: {
    fromTone: "sage",
    toTone: "paper",
    motif: "clearing",
    height: "5.5rem",
    mobileHeight: "3.75rem",
  },
  canopy: {
    fromTone: "sage",
    toTone: "paper",
    motif: "clearing",
    height: "5.5rem",
    mobileHeight: "3.75rem",
  },
  "cabin-mist": {
    fromTone: "sage",
    toTone: "paper",
    motif: "clearing",
    height: "5.5rem",
    mobileHeight: "3.75rem",
  },
  hills: {
    fromTone: "paper",
    toTone: "dusk",
    motif: "hills-dusk",
    height: "8rem",
    mobileHeight: "5.25rem",
  },
  ember: {
    fromTone: "paper",
    toTone: "dusk",
    motif: "hills-dusk",
    height: "8rem",
    mobileHeight: "5.25rem",
  },
  lake: {
    fromTone: "dusk",
    toTone: "sage",
    motif: "lake-mist",
    height: "7rem",
    mobileHeight: "4.75rem",
  },
  night: {
    fromTone: "sage",
    toTone: "night",
    motif: "nightfall",
    height: "7.5rem",
    mobileHeight: "5rem",
  },
};

/** @deprecated Prefer SceneBridge with explicit from/to tones. Kept as a thin adapter. */
export function ForestTransition({ variant = "mist", className = "" }: ForestTransitionProps) {
  const config = variantMap[variant];
  return (
    <SceneBridge
      fromTone={config.fromTone}
      toTone={config.toTone}
      motif={config.motif}
      height={config.height}
      mobileHeight={config.mobileHeight}
      edgeDensity={variant === "cabin-mist" || variant === "mist" ? "open" : "medium"}
      overlap="none"
      className={className}
    />
  );
}
