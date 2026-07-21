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
        eyebrow="Review anthology"
        title={`Issue ${anthologyMeta.issue} of ${anthologyMeta.issue}.`}
        description={`${anthologyMeta.label} · ${anthologyMeta.rating} average · Superhost Terry. These are real guest lines, grouped by the themes that show up again and again in ${anthologyMeta.issue} stays.`}
        campaign="chapters"
      >
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <SectionIntro
            eyebrow="Chapters"
            title={`Write chapter ${anthologyMeta.issue + 1}`}
            description="Every quote below is taken from public guest feedback themes on the listing. When the Airbnb review count grows, refresh anthologyMeta.issue and add a new chapter so search language stays current."
          />
          <div className="space-y-8">
            {reviewChapters.map((chapter) => (
              <article
                key={chapter.id}
                className="rounded-[1.25rem] border border-line bg-white/60 p-8 md:p-10"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">
                  Chapter {chapter.id} · {chapter.theme}
                </p>
                <h2 className="font-serif mt-3 text-3xl tracking-tight md:text-4xl">
                  {chapter.title}
                </h2>
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
