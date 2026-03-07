"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "";

export function FacebookPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!PIXEL_ID) return;
    import("react-facebook-pixel")
      .then((m) => m.default)
      .then((ReactPixel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ReactPixel.init(PIXEL_ID, undefined as any, { autoConfig: true, debug: false });
        ReactPixel.pageView();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}
