import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb, DarkCta, PageShell, SectionIntro } from "@/components/page-shell";
import { anthologyMeta, reviewChapters } from "@/data/chapters";
import { createMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Guest Review Anthology",
  description: `Read the story of ${anthologyMeta.issue} Guest Favorite stays at our Lake Arrowhead A-frame cabin rental — verbatim Airbnb guest quotes, chapter by chapter.`,
  path: "/chapters",
  keywords: [
    "Lake Arrowhead A-frame reviews",
    "Lake Arrowhead cabin rental reviews",
    "Guest Favorite Lake Arrowhead",
  ],
});

export default function ChaptersPage() {
  return (
    <>
      <JsonLd
        id="chapters-breadcrumb"
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guest Review Anthology", path: "/chapters" },
        ])}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Chapters" }]} />
      <PageShell
        title={`${anthologyMeta.issue} Guest Favorite stays, in their words.`}
        description={`${anthologyMeta.label} · ${anthologyMeta.rating} average · Superhost Terry. Real guest lines from our Lake Arrowhead A-frame, grouped by the themes that keep showing up.`}
        campaign="chapters"
        sceneFamily="dark-lodge"
      >
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            title="What guests remember"
            description="Every quote below comes from public guest feedback on the listing — organized by the themes that define a stay here."
          />
          <div className="space-y-8">
            {reviewChapters.map((chapter) => (
              <article
                key={chapter.id}
                className="illustrative-card p-8 md:p-10"
              >
                <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
                  {chapter.title}
                </h2>
                <p className="mt-2 text-sm text-muted">Chapter {chapter.id} · {chapter.theme}</p>
                <ul className="mt-8 space-y-5">
                  {chapter.quotes.map((quote) => (
                    <li key={quote} className="text-base leading-8 text-muted">
                      “{quote}”
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-7 text-muted">
            Searching by amenity instead of reviews? See the{" "}
            <Link
              href="/lake-arrowhead-cabin-with-sauna"
              className="text-copper underline underline-offset-4"
            >
              sauna cabin
            </Link>
            ,{" "}
            <Link
              href="/dog-friendly-lake-arrowhead-cabin"
              className="text-copper underline underline-offset-4"
            >
              dog-friendly cabin
            </Link>
            , or{" "}
            <Link
              href="/lake-arrowhead-a-frame-cabin"
              className="text-copper underline underline-offset-4"
            >
              A-frame guide
            </Link>
            .
          </p>
        </section>
      </PageShell>
      <DarkCta
        title="Become the next quiet stay"
        description="Guest Favorite A-frame — book on Airbnb and write the next chapter."
        campaign="chapters"
      />
    </>
  );
}
