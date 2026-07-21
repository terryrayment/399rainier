import { IllustratedWorld } from "@/components/illustration/illustrated-world";
import { SceneMotion } from "@/components/illustration/scene-motion";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export default function IllustratedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-illustrated">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <IllustratedWorld />
      <SceneMotion />
      <SiteNav />
      <main className="site-main" id="main-content">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
