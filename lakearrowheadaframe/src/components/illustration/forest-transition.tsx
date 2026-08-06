import { SceneBridge, type BridgeMotif, type BridgeTone } from "@/components/illustration/scene-bridge";

type ForestTransitionProps = {
  variant?:
    | "mist"
    | "canopy"
    | "ember"
    | "lake"
    | "night"
    | "cabin-mist"
    | "hills"
    | "paper"
    | "dusk-paper"
    | "forest-paper"
    | "night-paper";
  className?: string;
};

const variantMap: Record<
  NonNullable<ForestTransitionProps["variant"]>,
  { fromTone: BridgeTone; toTone: BridgeTone; motif: BridgeMotif; height: string; mobileHeight: string }
> = {
  paper: {
    fromTone: "paper",
    toTone: "paper",
    motif: "clearing",
    height: "4.5rem",
    mobileHeight: "3rem",
  },
  "dusk-paper": {
    fromTone: "dusk",
    toTone: "paper",
    motif: "hills-dusk",
    height: "7rem",
    mobileHeight: "4.75rem",
  },
  "forest-paper": {
    fromTone: "forest",
    toTone: "paper",
    motif: "mist-lift",
    height: "7rem",
    mobileHeight: "4.75rem",
  },
  "night-paper": {
    fromTone: "night",
    toTone: "paper",
    motif: "nightfall",
    height: "7.5rem",
    mobileHeight: "5rem",
  },
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
