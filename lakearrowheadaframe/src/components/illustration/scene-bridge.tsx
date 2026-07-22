import type { CSSProperties } from "react";
import { sceneAssets } from "@/data/illustration-scenes";

export type BridgeTone = "paper" | "sage" | "dusk" | "forest" | "night";
export type BridgeMotif =
  | "forest-floor"
  | "mist-lift"
  | "clearing"
  | "hills-dusk"
  | "lake-mist"
  | "nightfall"
  | "none";

export type SceneBridgeProps = {
  fromTone: BridgeTone;
  toTone: BridgeTone;
  motif: BridgeMotif;
  /** Desktop bridge height */
  height?: string;
  /** Mobile bridge height */
  mobileHeight?: string;
  edgeDensity?: "open" | "medium" | "dense";
  /** Decorative overlap into adjacent chapters (artwork only) */
  overlap?: "none" | "up" | "down" | "both";
  className?: string;
};

const toneColor: Record<BridgeTone, string> = {
  paper: "var(--color-parchment)",
  sage: "#e3e6d8",
  dusk: "var(--color-dusk)",
  forest: "var(--color-forest-deep)",
  night: "var(--color-night)",
};

const motifAsset: Partial<Record<BridgeMotif, string | undefined>> = {
  "forest-floor": sceneAssets.shrubsRocks,
  /* Wash-only; illustration plates read as muddy horizontal strips */
  "mist-lift": undefined,
  clearing: sceneAssets.mistCabinTransition,
  "hills-dusk": sceneAssets.forestHillsTransition,
  "lake-mist": sceneAssets.lakeMist,
  nightfall: sceneAssets.nightFloor,
};

/**
 * Single owner for a chapter boundary. Continues outgoing tone → bridge motif → incoming tone.
 * Decorative only; sits under content; never owns semantic text.
 */
export function SceneBridge({
  fromTone,
  toTone,
  motif,
  height = "7.5rem",
  mobileHeight = "5rem",
  edgeDensity = "medium",
  overlap = "none",
  className = "",
}: SceneBridgeProps) {
  const asset = motif === "none" ? null : motifAsset[motif];
  const file = asset?.split("/").pop() ?? "";
  const mobileSrc = file ? `/illustrations/scenes/mobile/${file}` : "";

  return (
    <div
      className={`scene-bridge scene-bridge--${motif} scene-bridge--edges-${edgeDensity} scene-bridge--overlap-${overlap} ${className}`}
      style={
        {
          "--bridge-from": toneColor[fromTone],
          "--bridge-to": toneColor[toTone],
          "--bridge-height": height,
          "--bridge-height-mobile": mobileHeight,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="scene-bridge-wash" />
      {asset ? (
        <picture className="scene-bridge-art">
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
          <img src={asset} alt="" className="scene-bridge-plate" loading="lazy" decoding="async" />
        </picture>
      ) : null}
      <div className="scene-bridge-edge scene-bridge-edge--left" />
      <div className="scene-bridge-edge scene-bridge-edge--right" />
    </div>
  );
}
