import Link from "next/link";
import { AirbnbButton } from "@/components/airbnb-button";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  campaign: string;
};

export function PageShell({ eyebrow, title, description, children, campaign }: PageShellProps) {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">{eyebrow}</p>
        <h1 className="font-serif mt-4 max-w-4xl text-4xl leading-tight tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted">{description}</p>
        <div className="mt-8">
          <AirbnbButton campaign={campaign} content="page-hero" />
        </div>
      </section>
      {children}
    </main>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">{eyebrow}</p>
      <h2 className="font-serif mt-3 text-3xl tracking-tight md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted">{description}</p> : null}
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
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="dark-panel flex flex-col items-start gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">{description}</p>
        </div>
        <AirbnbButton campaign={campaign} content="page-cta" variant="light" />
      </div>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mx-auto max-w-7xl px-6 pb-6 text-sm text-muted">
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
