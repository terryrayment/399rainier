import Link from "next/link";
import { PhotoClearing } from "@/components/illustration/photo-clearing";
import { cabin } from "@/data/cabin";
import { getAirbnbPhoto } from "@/data/photos";

/** Heat → cold air → soak as one dusk narrative — authentic proof photos only. */
export function RitualSequence() {
  const sauna = getAirbnbPhoto("rainier_sauna.jpg");
  const deck = getAirbnbPhoto("rainier_4.jpg");
  const hotTub = getAirbnbPhoto("rainier_42.jpg");
  const proofPhotos = [
    {
      step: cabin.ritual[0],
      photo: { image: sauna.src, imageAlt: sauna.alt },
    },
    {
      step: cabin.ritual[1],
      photo: { image: deck.src, imageAlt: deck.alt },
    },
    {
      step: cabin.ritual[2],
      photo: { image: hotTub.src, imageAlt: hotTub.alt },
    },
  ];

  return (
    <div className="ritual-sequence">
      <header className="ritual-sequence-header">
        <h2 className="font-display ritual-sequence-title">
          Sauna. Cool air. Hot tub under the stars.
        </h2>
        <p className="ritual-sequence-lead">
          A mountain circuit you can actually do before dinner.{" "}
          <Link href="/lake-arrowhead-cabin-with-sauna" className="ritual-sequence-link">
            Cabin with sauna →
          </Link>
        </p>
      </header>

      <ol className="ritual-sequence-steps">
        {proofPhotos.map(({ step, photo }, index) =>
          step && photo ? (
            <li key={step.step} className="ritual-step">
              <div className="ritual-step-proof">
                <PhotoClearing
                  src={photo.image}
                  alt={photo.imageAlt}
                  aspectClassName="aspect-[4/5]"
                  sizes="(max-width: 768px) 100vw, 28vw"
                  overlap={index === 0 ? "tl" : "none"}
                />
              </div>
              <div className="ritual-step-copy">
                <p className="ritual-step-index">{step.step}</p>
                <h3 className="font-display ritual-step-title">{step.title}</h3>
                <p className="ritual-step-body">{step.body}</p>
              </div>
            </li>
          ) : null,
        )}
      </ol>

      {/* Steam / ember accents — CSS only, non-literal */}
      <div className="ritual-steam" aria-hidden="true" />
    </div>
  );
}
