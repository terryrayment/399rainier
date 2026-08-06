import { RitualSequence } from "@/components/illustration/ritual-sequence";
import { SceneChapter } from "@/components/illustration/scene-chapter";

export function RitualAtDusk() {
  return (
    <SceneChapter scene="ritual" id="ritual" contentClassName="ritual-at-dusk-inner">
      <RitualSequence />
    </SceneChapter>
  );
}
