import type { PageSceneFamily } from "@/data/illustration-scenes";

export type VignetteName = "glass-pines" | "deck-lights" | "heat-soak";

export type Vignette = {
  name: VignetteName;
  src: string;
  alt: string;
  caption: string;
};

/** Standalone illustrative art. Never a restyle of listing photos. */
export const vignettes: Record<VignetteName, Vignette> = {
  "glass-pines": {
    name: "glass-pines",
    src: "/illustrations/glass-pines.webp",
    alt: "Atmospheric illustration of glass and pines at dusk. Not a property photo",
    caption: "Glass-and-pine mood",
  },
  "deck-lights": {
    name: "deck-lights",
    src: "/illustrations/deck-lights.webp",
    alt: "Atmospheric illustration of evening deck lights among pines. Not a property photo",
    caption: "Evening light mood",
  },
  "heat-soak": {
    name: "heat-soak",
    src: "/illustrations/heat-soak.webp",
    alt: "Atmospheric illustration of a heat-and-soak ritual. Not a property photo",
    caption: "Heat-and-soak mood",
  },
};

export const landerVignettes: Record<string, VignetteName> = {
  "sauna-lander": "heat-soak",
  "dog-friendly-lander": "deck-lights",
  "aframe-lander": "glass-pines",
  "weekend-la-lander": "deck-lights",
};

export const landerSceneFamilies: Record<string, PageSceneFamily> = {
  "sauna-lander": "ritual-ember",
  "dog-friendly-lander": "morning-trail",
  "aframe-lander": "arrival-interior",
  "weekend-la-lander": "arrival-evening",
};
