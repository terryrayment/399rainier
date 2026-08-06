import type { SceneConfig } from "@/data/illustration-scenes";
import { sceneAssets } from "@/data/illustration-scenes";

type ForestSceneProps = {
  config: SceneConfig;
  className?: string;
  children?: React.ReactNode;
};

function ScenePlate({
  desktopSrc,
  mobileSrc,
  className = "",
}: {
  desktopSrc: string;
  mobileSrc: string;
  className?: string;
}) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrc} />
      <img
        src={desktopSrc}
        alt=""
        className={`forest-scene-plate ${className}`}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function assetPair(desktop: string) {
  const file = desktop.split("/").pop() ?? "";
  return {
    desktop,
    mobile: `/illustrations/scenes/mobile/${file}`,
  };
}

/**
 * Owns scene tone and environmental art. All env layers stay behind content (z ≤ 3).
 */
export function ForestScene({ config, className = "", children }: ForestSceneProps) {
  const intensity = Math.max(0.35, Math.min(1, config.intensity));
  const densityClass = `forest-scene--${config.density}`;
  const toneClass = `forest-scene--tone-${config.tone}`;
  const mistClass = `forest-scene--mist-${config.mist}`;

  const canopyDesktop =
    config.tone === "night" || config.tone === "dusk"
      ? sceneAssets.nightFloor
      : config.tone === "sage" && config.foreground === "water"
        ? sceneAssets.lakeMist
        : sceneAssets.mistCanopy;
  const canopy = assetPair(canopyDesktop);

  const foreDesktop =
    config.foreground === "branches"
      ? sceneAssets.branchLeft
      : config.foreground === "water"
        ? sceneAssets.lakeMist
        : config.foreground === "forest-floor" &&
            (config.tone === "night" || config.tone === "dusk")
          ? sceneAssets.nightFloor
          : sceneAssets.shrubsRocks;
  const fore = assetPair(foreDesktop);
  const left = assetPair(sceneAssets.pinesLeft);
  const right = assetPair(sceneAssets.pinesRight);

  return (
    <div
      className={`forest-scene ${toneClass} ${densityClass} ${mistClass} ${className}`}
      data-scene={config.name}
      style={{ "--scene-intensity": String(intensity) } as React.CSSProperties}
    >
      <div className="forest-scene-bg" aria-hidden="true" />

      {config.canopy ? (
        <div
          className="forest-layer forest-layer--distant forest-scene-canopy"
          aria-hidden="true"
        >
          <ScenePlate desktopSrc={canopy.desktop} mobileSrc={canopy.mobile} />
        </div>
      ) : null}

      {config.mist !== "none" ? (
        <div className="forest-layer forest-layer--mist forest-scene-mist" aria-hidden="true" />
      ) : null}

      {config.sideRails !== false ? (
        <>
          <div
            className="forest-layer forest-layer--mid forest-scene-rail forest-scene-rail--left"
            aria-hidden="true"
          >
            <ScenePlate desktopSrc={left.desktop} mobileSrc={left.mobile} />
          </div>
          <div
            className="forest-layer forest-layer--mid forest-scene-rail forest-scene-rail--right"
            aria-hidden="true"
          >
            <ScenePlate desktopSrc={right.desktop} mobileSrc={right.mobile} />
          </div>
        </>
      ) : null}

      {config.foreground !== "none" ? (
        <div
          className={`forest-layer forest-layer--fore forest-scene-foreground forest-scene-foreground--${config.foreground}`}
          aria-hidden="true"
        >
          <ScenePlate desktopSrc={fore.desktop} mobileSrc={fore.mobile} />
        </div>
      ) : null}

      <div className="forest-scene-content">{children}</div>
    </div>
  );
}
