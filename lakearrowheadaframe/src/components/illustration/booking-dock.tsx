"use client";

import { useEffect, useState } from "react";
import { AirbnbButton, BookingPill } from "@/components/airbnb-button";

type BookingDockProps = {
  variant?: "hero" | "inline" | "mobile-bar";
  campaign?: string;
  content?: string;
  className?: string;
};

/**
 * Desktop: full booking pill at hero / inline CTAs.
 * Mobile sticky bar: one primary action, shown only after hero leaves view
 * and hidden when the final booking/footer enters view.
 */
export function BookingDock({
  variant = "hero",
  campaign = "homepage",
  content = "booking-dock",
  className = "",
}: BookingDockProps) {
  if (variant === "mobile-bar") {
    return <MobileStickyBooking campaign={campaign} content={content} className={className} />;
  }

  if (variant === "inline") {
    return (
      <div className={`booking-dock booking-dock--inline ${className}`}>
        <AirbnbButton campaign={campaign} content={content} label="Check availability" />
      </div>
    );
  }

  return (
    <div className={`booking-dock booking-dock--hero ${className}`}>
      <div className="hidden md:block">
        <BookingPill />
      </div>
      <div className="booking-pill booking-pill--hero-mobile-cta md:hidden">
        <AirbnbButton campaign={campaign} content="hero-mobile" label="Check availability" />
      </div>
    </div>
  );
}

function MobileStickyBooking({
  campaign,
  content,
  className,
}: {
  campaign: string;
  content: string;
  className: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-booking");
    const footer = document.querySelector("footer");
    if (!hero) return;

    let heroOut = false;
    let footerIn = false;

    const update = () => setVisible(heroOut && !footerIn);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroOut = !entry.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    heroObserver.observe(hero);

    let footerObserver: IntersectionObserver | undefined;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          footerIn = entry.isIntersecting;
          update();
        },
        { threshold: 0.05 },
      );
      footerObserver.observe(footer);
    }

    return () => {
      heroObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`booking-dock booking-dock--mobile ${className}`}>
      <AirbnbButton
        campaign={campaign}
        content={content}
        label="Check availability"
        className="w-full"
      />
    </div>
  );
}
