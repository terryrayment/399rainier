"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cabin } from "@/data/cabin";
import { AirbnbButton } from "@/components/airbnb-button";
import { NavWeather } from "@/components/nav-weather";
import { TriplePine } from "@/components/illustration/motifs";
import { clusterNavLinks } from "@/lib/routes";

const primaryLinks = [
  { href: "/shoreline-rights", label: "Lake Access" },
  { href: "/weekend-from-los-angeles", label: "Weekend from LA" },
  { href: "/chapters", label: "Reviews" },
  { href: "/#gallery", label: "Gallery" },
];

function NavPine() {
  return <TriplePine className="nav-pine" />;
}

export function SiteNav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const brandRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const restoreDesktopFocusRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
    if (!open && restoreDesktopFocusRef.current) {
      restoreDesktopFocusRef.current = false;
      brandRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key === "Tab") {
        const focusable = [
          triggerRef.current,
          ...Array.from(
            panelRef.current?.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ) ?? [],
          ),
        ].filter((item): item is HTMLElement => Boolean(item));
        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
        if (currentIndex === -1) return;
        event.preventDefault();
        const direction = event.shiftKey ? -1 : 1;
        const nextIndex = (currentIndex + direction + focusable.length) % focusable.length;
        focusable[nextIndex]?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const closeOnHistoryNavigation = () => setOpen(false);
    window.addEventListener("popstate", closeOnHistoryNavigation);
    return () => window.removeEventListener("popstate", closeOnHistoryNavigation);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches || !openRef.current) return;
      restoreDesktopFocusRef.current = true;
      setOpen(false);
    };
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className={`site-nav ${condensed ? "site-nav--condensed" : "site-nav--clear"}`}>
      <div className="site-nav-inner">
        <Link ref={brandRef} href="/" className="site-nav-brand font-display">
          <NavPine />
          Lake Arrowhead A-Frame
        </Link>
        <NavWeather />
        <nav className="site-nav-links" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <AirbnbButton campaign="nav" content="nav-cta" className="site-nav-cta" />
        <button
          ref={triggerRef}
          type="button"
          className="site-nav-menu-trigger"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      <div
        ref={panelRef}
        id={menuId}
        className={`site-nav-mobile-panel ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile primary">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <AirbnbButton
          campaign="nav"
          content="nav-mobile-cta"
          className="mt-4 w-full"
          onNavigate={() => setOpen(false)}
        />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer site-footer--night">
      <div className="site-footer-floor" aria-hidden="true" />
      <div className="site-footer-grid">
        <div>
          <p className="font-display site-footer-title">Lake Arrowhead A-Frame</p>
          <p className="site-footer-copy">
            Lake Arrowhead cabin rental in {cabin.community}, {cabin.city}, {cabin.state}
          </p>
        </div>
        <div className="site-footer-links">
          {clusterNavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/burnout-reset">Burnout Reset Quiz</Link>
          <Link href="/#gallery">Gallery</Link>
          <Link href="/classic">Classic photo view</Link>
        </div>
        <div>
          <p className="site-footer-copy">
            Guest Favorite · Superhost
            <br />
            STR CESTRP-2025-00206
          </p>
          <div className="mt-4">
            <AirbnbButton campaign="footer" content="footer-cta" variant="light" />
          </div>
        </div>
      </div>
      <p className="site-footer-legal">
        © {new Date().getFullYear()} Lake Arrowhead A-Frame. All rights reserved.
      </p>
    </footer>
  );
}
