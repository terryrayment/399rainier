"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** How far the image drifts relative to scroll through the viewport (0–1). */
  strength?: number;
};

export function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  strength = 0.18,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      // -0.5 when entering bottom, 0.5 when leaving top
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      const offset = progress * rect.height * strength;
      layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.16)`;
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
  }, [strength]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={layerRef}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1.16)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
      </div>
    </div>
  );
}
