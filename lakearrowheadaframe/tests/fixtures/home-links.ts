export const stableInternalHrefs = [
  "/",
  "/#gallery",
  "/burnout-reset",
  "/chapters",
  "/classic",
  "/dog-friendly-lake-arrowhead-cabin",
  "/holiday-ready",
  "/lake-arrowhead-a-frame-cabin",
  "/lake-arrowhead-cabin-with-sauna",
  "/shoreline-rights",
  "/weekend-from-los-angeles",
] as const;

export const allowedSeasonalHrefs = [
  "/holiday-ready#thanksgiving",
  "/holiday-ready#christmas",
  "/holiday-ready#new-year",
  "/holiday-ready#valentines",
  "/holiday-ready#halloween",
  "/holiday-ready#fourth-of-july",
] as const;

export const airbnbBaseHref = "https://airbnb.com/h/lakearrowheadcabinrental";

export const staticAirbnbHrefs = [
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=footer&utm_content=footer-cta",
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=homepage&utm_content=final-cta",
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=homepage&utm_content=gallery-cta",
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=homepage&utm_content=hero-mobile",
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=nav&utm_content=nav-cta",
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=nav&utm_content=nav-mobile-cta",
] as const;

export const stickyAirbnbHref =
  "https://airbnb.com/h/lakearrowheadcabinrental?utm_source=lakearrowheadaframe&utm_medium=website&utm_campaign=homepage&utm_content=mobile-sticky";
