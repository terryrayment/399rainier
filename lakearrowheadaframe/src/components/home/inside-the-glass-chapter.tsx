import Link from "next/link";
import { PhotoClearing } from "@/components/illustration/photo-clearing";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { cabin } from "@/data/cabin";

function AccentHeadline({ text, accents }: { text: string; accents: string[] }) {
  const parts = text.split(new RegExp(`(${accents.join("|")})`, "g"));
  return (
    <span>
      {parts.map((part, index) =>
        accents.includes(part) ? (
          <span key={`${part}-${index}`} className="accent-word">
            {part}
          </span>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </span>
  );
}

/** One dominant interior + narrative + three truths. Consolidates duplicated pleasures. */
export function InsideTheGlassChapter() {
  return (
    <SceneChapter
      scene="interior"
      id="inside"
      className="inside-glass-chapter"
      contentClassName="inside-glass-inner"
    >
      <div className="inside-glass-layout">
        <PhotoClearing
          src={cabin.narrativePhoto.src}
          alt={cabin.narrativePhoto.alt}
          aspectClassName="aspect-[4/5]"
          sizes="(max-width: 768px) 100vw, 48vw"
          overlap="tr"
          parallax
          className="inside-glass-photo"
        />
        <div className="inside-glass-copy">
          <h2 className="font-display inside-glass-title">
            <AccentHeadline
              text={cabin.narrative.headline}
              accents={cabin.narrative.accentWords}
            />
          </h2>
          <p className="inside-glass-body">{cabin.narrative.body}</p>
          <p className="inside-glass-seo">
            Looking for a specific kind of stay?{" "}
            <Link href="/lake-arrowhead-cabin-with-sauna">Sauna</Link>,{" "}
            <Link href="/dog-friendly-lake-arrowhead-cabin">dog-friendly</Link>, or a{" "}
            <Link href="/weekend-from-los-angeles">weekend from LA</Link>.
          </p>
        </div>
      </div>

      <ul className="inside-glass-truths">
        {cabin.pleasures.map((pleasure) => (
          <li key={pleasure.title} className="inside-glass-truth">
            <h3 className="font-display inside-glass-truth-title">{pleasure.title}</h3>
            <p className="inside-glass-truth-body">{pleasure.body}</p>
          </li>
        ))}
      </ul>
    </SceneChapter>
  );
}
