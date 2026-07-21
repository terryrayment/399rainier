import Link from "next/link";
import { cabin } from "@/data/cabin";
import { AirbnbButton } from "@/components/airbnb-button";
import { clusterNavLinks } from "@/lib/routes";

export function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-serif text-2xl tracking-tight text-ink">
          Lake Arrowhead A-Frame
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted lg:flex">
          <Link href="/shoreline-rights" className="transition-colors hover:text-ink">
            Lake Access
          </Link>
          <Link href="/weekend-from-los-angeles" className="transition-colors hover:text-ink">
            Weekend from LA
          </Link>
          <Link href="/chapters" className="transition-colors hover:text-ink">
            Reviews
          </Link>
          <Link href="/#gallery" className="transition-colors hover:text-ink">
            Gallery
          </Link>
        </nav>
        <AirbnbButton campaign="nav" content="nav-cta" className="hidden md:inline-flex" />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-parchment px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div>
          <p className="font-serif text-3xl tracking-tight">Lake Arrowhead A-Frame</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Lake Arrowhead cabin rental in {cabin.community}, {cabin.city}, {cabin.state}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            {clusterNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
            <Link href="/burnout-reset" className="hover:text-ink">
              Burnout Reset Quiz
            </Link>
            <Link href="/#gallery" className="hover:text-ink">
              Gallery
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">Book</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Guest Favorite · Superhost Terry
            <br />
            STR CESTRP-2025-00206
          </p>
          <div className="mt-4">
            <AirbnbButton campaign="footer" content="footer-cta" variant="light" />
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-light">Also</p>
          <p className="mt-4 text-sm text-muted">
            This cabin is also{" "}
            <a
              href="https://399rainier.com/investment"
              className="underline underline-offset-4 hover:text-ink"
            >
              available for purchase
            </a>
            .
          </p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-line pt-8 text-center text-xs text-muted-light">
        © {new Date().getFullYear()} Lake Arrowhead A-Frame. All rights reserved.
      </p>
    </footer>
  );
}
