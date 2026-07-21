"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroParallaxProps = {
  src: string;
  alt: string;
};

export function HeroParallax({ src, alt }: HeroParallaxProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY, window.innerHeight) * 0.28;
      layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1.12)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45" />
    </div>
  );
}
