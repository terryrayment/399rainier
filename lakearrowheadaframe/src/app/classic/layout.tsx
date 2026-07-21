import Link from "next/link";
import { AirbnbButton } from "@/components/airbnb-button";
import { cabin } from "@/data/cabin";

/** Photo-only chrome — zero illustration layers. */
export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-classic">
      <header className="fixed top-0 left-0 right-0 z-50 bg-parchment/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/classic" className="font-serif text-2xl tracking-tight text-ink">
            Lake Arrowhead A-Frame
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <Link href="/classic#gallery" className="hover:text-ink">
              Gallery
            </Link>
            <Link href="/" className="hover:text-ink">
              Illustrated view
            </Link>
          </nav>
          <AirbnbButton campaign="classic-nav" content="nav-cta" className="hidden md:inline-flex" />
        </div>
      </header>
      {children}
      <footer className="border-t border-line bg-parchment px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="font-serif text-3xl tracking-tight">Lake Arrowhead A-Frame</p>
          <p className="mt-4 max-w-md text-sm text-muted">
            Classic photo-only view · {cabin.community}, {cabin.city}, {cabin.state}
          </p>
          <p className="mt-6 text-sm">
            <Link href="/" className="text-copper underline underline-offset-4">
              Back to illustrated site →
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
