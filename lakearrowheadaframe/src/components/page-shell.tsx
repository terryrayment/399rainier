import Link from "next/link";
import { AirbnbButton } from "@/components/airbnb-button";
import { ForestScene } from "@/components/illustration/forest-scene";
import { ForestTransition } from "@/components/illustration/forest-transition";
import {
  pageSceneFamilies,
  type PageSceneFamily,
  type SceneConfig,
} from "@/data/illustration-scenes";

type PageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  campaign: string;
  sceneFamily?: PageSceneFamily;
  intensity?: number;
};

export function PageShell({
  title,
  description,
  children,
  campaign,
  sceneFamily = "seo-light",
  intensity,
}: PageShellProps) {
  const family = pageSceneFamilies[sceneFamily];
  const scene: SceneConfig = {
    ...family.scene,
    intensity: intensity ?? family.intensity,
    // Supporting-page heroes need one continuous color field. The canopy plates
    // are designed for tall homepage chapters and expose their lower edge here.
    canopy: false,
  };
  const darkTone =
    scene.tone === "dusk" || scene.tone === "night" || scene.tone === "forest";

  return (
    <div className={`page-shell page-shell--${sceneFamily}`}>
      <ForestScene config={scene} className="page-shell-hero-scene">
        <section className="page-shell-hero">
          <h1 className="font-display page-shell-title">{title}</h1>
          <p className="page-shell-lead">{description}</p>
          <div className="mt-8 page-shell-hero-cta">
            <AirbnbButton
              campaign={campaign}
              content="page-hero"
              variant={darkTone ? "light" : "dark"}
              label="Check availability"
            />
          </div>
        </section>
      </ForestScene>
      <ForestTransition
        variant={
          scene.tone === "dusk"
            ? "dusk-paper"
            : scene.tone === "night"
              ? "night-paper"
              : scene.tone === "forest"
                ? "forest-paper"
                : scene.tone === "sage"
                  ? "mist"
                  : "paper"
        }
      />
      <div className="page-shell-body">{children}</div>
    </div>
  );
}

export function SectionIntro({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
    </div>
  );
}

export function DarkCta({
  title,
  description,
  campaign,
}: {
  title: string;
  description: string;
  campaign: string;
}) {
  return (
    <section className="page-shell-dark-cta">
      <ForestScene
        config={{
          name: "night",
          tone: "night",
          density: "medium",
          foreground: "forest-floor",
          mist: "low",
          intensity: 0.7,
          canopy: true,
          sideRails: true,
        }}
      >
        <div className="dark-panel flex flex-col items-start gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/80">{description}</p>
          </div>
          <AirbnbButton
            campaign={campaign}
            content="page-cta"
            variant="light"
            label="Check availability"
          />
        </div>
      </ForestScene>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="page-shell-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && <span className="mx-2 text-muted-light">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
