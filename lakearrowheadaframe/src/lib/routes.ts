/** Canonical public routes for sitemap, nav, and internal linking. */
export const seoRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  {
    path: "/shoreline-rights",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/lake-arrowhead-cabin-with-sauna",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/dog-friendly-lake-arrowhead-cabin",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/lake-arrowhead-a-frame-cabin",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/weekend-from-los-angeles",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  { path: "/chapters", priority: 0.75, changeFrequency: "monthly" as const },
  {
    path: "/burnout-reset",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/holiday-ready",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
] as const;

export const clusterNavLinks = [
  { href: "/shoreline-rights", label: "Lake Access" },
  { href: "/lake-arrowhead-cabin-with-sauna", label: "Sauna Cabin" },
  { href: "/dog-friendly-lake-arrowhead-cabin", label: "Dog-Friendly" },
  { href: "/lake-arrowhead-a-frame-cabin", label: "A-Frame" },
  { href: "/weekend-from-los-angeles", label: "Weekend from LA" },
  { href: "/chapters", label: "Reviews" },
  { href: "/holiday-ready", label: "Holiday Ready" },
] as const;
