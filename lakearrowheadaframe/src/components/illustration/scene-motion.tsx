"use client";

import { useEffect } from "react";

/**
 * Shared scroll progress for atmospheric parallax.
 * Disabled under prefers-reduced-motion and on narrow viewports.
 */
export function SceneMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-illustrated");
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");
    let ticking = false;

    const apply = () => {
      ticking = false;
      if (reduceMotion.matches || narrow.matches) {
        root.style.setProperty("--scene-scroll", "0");
        return;
      }
      const y = Math.min(window.scrollY, 2400);
      root.style.setProperty("--scene-scroll", String(y));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    reduceMotion.addEventListener("change", apply);
    narrow.addEventListener("change", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      reduceMotion.removeEventListener("change", apply);
      narrow.removeEventListener("change", apply);
    };
  }, []);

  return null;
}
