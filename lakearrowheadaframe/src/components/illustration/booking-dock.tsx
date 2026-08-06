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
    const finalBooking = document.getElementById("reviews");
    const footer = document.querySelector(".site-footer");
    if (!hero) return;

    let heroOut = false;
    const closingTargets = [finalBooking, footer].filter(
      (target): target is Element => target != null,
    );
    const closingIntersections = new Map<Element, boolean>(
      closingTargets.map((target) => [target, false]),
    );

    const update = () =>
      setVisible(heroOut && ![...closingIntersections.values()].some(Boolean));

    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          heroOut = !entry.isIntersecting;
        }
        update();
      },
      { threshold: 0 },
    );
    heroObserver.observe(hero);

    const closingObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          closingIntersections.set(entry.target, entry.isIntersecting);
        }
        update();
      },
      { threshold: 0 },
    );
    for (const target of closingTargets) closingObserver.observe(target);

    return () => {
      heroObserver.disconnect();
      closingObserver.disconnect();
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
