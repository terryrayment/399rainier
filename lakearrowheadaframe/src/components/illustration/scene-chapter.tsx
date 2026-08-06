import { ForestScene } from "@/components/illustration/forest-scene";
import type { SceneConfig, SceneName } from "@/data/illustration-scenes";
import { homeScenes } from "@/data/illustration-scenes";

type SceneChapterProps = {
  scene: SceneName | SceneConfig;
  id?: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
  /** Override intensity without cloning full config */
  intensity?: number;
};

export function SceneChapter({
  scene,
  id,
  className = "",
  contentClassName = "",
  children,
  intensity,
}: SceneChapterProps) {
  const config: SceneConfig =
    typeof scene === "string"
      ? { ...homeScenes[scene], ...(intensity != null ? { intensity } : {}) }
      : intensity != null
        ? { ...scene, intensity }
        : scene;

  return (
    <section
      id={id}
      className={`scene-chapter scene-chapter--${config.name} scene-chapter--tone-${config.tone} ${className}`}
      data-scene={config.name}
    >
      <ForestScene config={config}>
        <div className={`scene-chapter-inner ${contentClassName}`}>{children}</div>
      </ForestScene>
    </section>
  );
}
