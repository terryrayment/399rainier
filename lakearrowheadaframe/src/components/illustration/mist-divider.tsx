import { MistBand } from "@/components/illustration/pine-svg";
import { GoldSpark, TriplePine } from "@/components/illustration/motifs";

export function MistDivider({ withGlow = false }: { withGlow?: boolean }) {
  return (
    <div className="mist-divider" aria-hidden="true">
      <div className="mist-divider-mark">
        <TriplePine className="section-mark-pines" />
        {withGlow ? <GoldSpark className="section-mark-spark" /> : null}
      </div>
      <MistBand className="mist-divider-band" />
    </div>
  );
}
