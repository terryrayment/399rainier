import Link from "next/link";
import { IllustratedMap } from "@/components/illustration/illustrated-map";
import { SceneChapter } from "@/components/illustration/scene-chapter";
import { cabin } from "@/data/cabin";
import { homeFaqs } from "@/lib/seo";

/** Location, map, lake caveats, differentiators, FAQs. One field-guide landscape. */
export function PlaceAndPracticalTruth() {
  return (
    <SceneChapter scene="lake" id="location" contentClassName="place-truth-inner">
      <IllustratedMap />

      <div className="place-truth-grid">
        <section className="place-truth-block" id="why">
          <h2 className="font-serif place-truth-heading">What sets this stay apart</h2>
          <ul className="place-truth-list">
            {cabin.differentiators.map((item) => (
              <li key={item.title} className="place-truth-item">
                <h3 className="font-serif place-truth-item-title">{item.title}</h3>
                <p className="place-truth-item-body">{item.body}</p>
                {"href" in item && item.href ? (
                  <Link href={item.href} className="place-truth-link">
                    {"linkLabel" in item && item.linkLabel ? item.linkLabel : "Learn more →"}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="place-truth-block" id="faq">
          <h2 className="font-serif place-truth-heading">Before you book</h2>
          <dl className="place-truth-faq">
            {homeFaqs.map((faq) => (
              <div key={faq.question} className="place-truth-faq-item">
                <dt className="font-serif place-truth-faq-q">{faq.question}</dt>
                <dd className="place-truth-faq-a">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </SceneChapter>
  );
}
