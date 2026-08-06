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
    let raf = 0;
    let listening = false;
    let reduced = reduceMotion.matches;

    const update = () => {
      raf = 0;
      if (reduced) return;
      const rect = frame.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      // -0.5 when entering bottom, 0.5 when leaving top
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      const offset = progress * rect.height * strength;
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (reduced || raf) return;
      raf = window.requestAnimationFrame(update);
    };

    const disableMotion = () => {
      reduced = true;
      if (listening) {
        listening = false;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
      layer.style.removeProperty("transform");
    };

    const enableMotion = () => {
      reduced = false;
      if (!listening) {
        listening = true;
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      }
      update();
    };

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        disableMotion();
      } else {
        enableMotion();
      }
    };

    reduceMotion.addEventListener("change", onMotionPreferenceChange);
    if (reduced) {
      disableMotion();
    } else {
      enableMotion();
    }

    return () => {
      reduceMotion.removeEventListener("change", onMotionPreferenceChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      layer.style.removeProperty("transform");
    };
  }, [strength]);

  return (
    <div ref={frameRef} className={`parallax-frame relative ${className}`}>
      <div
        ref={layerRef}
        className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform"
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
