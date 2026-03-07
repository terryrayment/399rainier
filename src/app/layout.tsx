import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "399 Rainier Road — A-Frame Retreat in Lake Arrowhead",
  description:
    "A fully renovated A-frame retreat nestled among the pines of Lake Arrowhead. 3 bed, 3 bath, 2,106 sqft. Proven Airbnb performer. 90 minutes from LA.",
  openGraph: {
    title: "399 Rainier Road — Lake Arrowhead A-Frame",
    description:
      "Fully renovated mountain retreat with floor-to-ceiling windows, three decks, and proven Airbnb income. $889,000.",
    type: "website",
  },
};

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-light text-xl tracking-wide text-foreground">
          399 <span className="text-accent">Rainier</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          <Link href="/#property" className="text-muted hover:text-foreground transition-colors">
            The Property
          </Link>
          <Link href="/#gallery" className="text-muted hover:text-foreground transition-colors">
            Gallery
          </Link>
          <Link href="/investment" className="text-muted hover:text-foreground transition-colors">
            Investment
          </Link>
          <Link href="/calculator" className="text-muted hover:text-foreground transition-colors">
            Calculator
          </Link>
          <Link href="/neighborhood" className="text-muted hover:text-foreground transition-colors">
            Neighborhood
          </Link>
          <Link
            href="/#contact"
            className="bg-accent text-white px-5 py-2 text-sm font-medium rounded-full hover:bg-accent-light transition-colors"
          >
            Inquire
          </Link>
        </div>
        {/* Mobile menu button */}
        <MobileMenuButton />
      </div>
    </nav>
  );
}

function MobileMenuButton() {
  return (
    <div className="md:hidden">
      <Link
        href="/#contact"
        className="bg-accent text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-accent-light transition-colors"
      >
        Inquire
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-light tracking-tight text-2xl mb-4">
              399 <span className="text-accent">Rainier</span>
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              399 Rainier Road<br />
              Lake Arrowhead, CA 92352
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-4 text-accent">
              Explore
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/#property" className="text-muted text-sm hover:text-foreground transition-colors">
                The Property
              </Link>
              <Link href="/investment" className="text-muted text-sm hover:text-foreground transition-colors">
                Investment
              </Link>
              <Link href="/calculator" className="text-muted text-sm hover:text-foreground transition-colors">
                STR Calculator
              </Link>
              <Link href="/neighborhood" className="text-muted text-sm hover:text-foreground transition-colors">
                Neighborhood
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase mb-4 text-accent">
              Get In Touch
            </h4>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Interested in this property? We&apos;d love to hear from you.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-accent text-white px-6 py-2 text-sm font-medium rounded-full hover:bg-accent-light transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-black/5 text-center">
          <p className="text-muted/50 text-xs">
            &copy; {new Date().getFullYear()} 399 Rainier Road. All rights reserved. MLS# IG25221884.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
