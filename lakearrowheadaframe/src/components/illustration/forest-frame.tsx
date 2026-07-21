"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { DenseForestColumn } from "@/components/illustration/pine-svg";

type ForestFrameProps = {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "parchment";
  density?: "cozy" | "heavy";
};

/**
 * Decorative pine forest framing a real photo or panel.
 * Illustrative SVG only. Never replaces photography.
 */
export function ForestFrame({
  children,
  className = "",
  tone = "ink",
  density = "heavy",
}: ForestFrameProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const backs = root.querySelectorAll<HTMLElement>(".forest-layer-back");
    const mids = root.querySelectorAll<HTMLElement>(".forest-layer-mid");
    const fronts = root.querySelectorAll<HTMLElement>(".forest-layer-front");
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      backs.forEach((el) => {
        el.style.transform = `translate3d(0, ${progress * 14}px, 0)`;
      });
      mids.forEach((el) => {
        el.style.transform = `translate3d(0, ${progress * 24}px, 0)`;
      });
      fronts.forEach((el) => {
        el.style.transform = `translate3d(0, ${progress * 36}px, 0)`;
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const toneClass = tone === "parchment" ? "forest-frame-parchment" : "forest-frame-ink";
  const densityClass = density === "heavy" ? "forest-frame-heavy" : "forest-frame-cozy";

  return (
    <div
      ref={rootRef}
      className={`forest-frame ${toneClass} ${densityClass} ${className}`.trim()}
    >
      <div className="forest-side forest-side-left" aria-hidden="true">
        <DenseForestColumn side="left" />
      </div>
      <div className="forest-frame-content">{children}</div>
      <div className="forest-side forest-side-right" aria-hidden="true">
        <DenseForestColumn side="right" />
      </div>
    </div>
  );
}
