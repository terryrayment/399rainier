export type SceneName =
  | "arrival"
  | "trust"
  | "interior"
  | "gallery"
  | "ritual"
  | "lake"
  | "night";

export type SceneTone = "paper" | "sage" | "dusk" | "forest" | "night";
export type SceneDensity = "open" | "medium" | "dense";
export type SceneForeground =
  | "none"
  | "branches"
  | "shrubs"
  | "rocks"
  | "water"
  | "forest-floor";
export type SceneMist = "none" | "low" | "medium" | "heavy";

export type SceneConfig = {
  name: SceneName;
  tone: SceneTone;
  density: SceneDensity;
  foreground: SceneForeground;
  mist: SceneMist;
  /** 0–1 visual intensity; homepage chapters use ~0.85–1 */
  intensity: number;
  canopy?: boolean;
  sideRails?: boolean;
};

export const homeScenes = {
  arrival: {
    name: "arrival",
    tone: "paper",
    density: "dense",
    foreground: "branches",
    mist: "medium",
    intensity: 1,
    canopy: true,
    sideRails: true,
  },
  trust: {
    name: "trust",
    tone: "forest",
    density: "medium",
    foreground: "none",
    mist: "none",
    intensity: 1,
    canopy: false,
    sideRails: true,
  },
  interior: {
    name: "interior",
    tone: "sage",
    density: "medium",
    foreground: "none",
    mist: "low",
    intensity: 0.9,
    canopy: false,
    sideRails: true,
  },
  gallery: {
    name: "gallery",
    tone: "paper",
    density: "open",
    foreground: "branches",
    mist: "low",
    intensity: 0.85,
    canopy: true,
    sideRails: false,
  },
  ritual: {
    name: "ritual",
    tone: "dusk",
    density: "dense",
    foreground: "forest-floor",
    mist: "heavy",
    intensity: 1,
    canopy: true,
    sideRails: true,
  },
  lake: {
    name: "lake",
    tone: "sage",
    density: "medium",
    foreground: "water",
    mist: "none",
    intensity: 0.9,
    canopy: true,
    sideRails: true,
  },
  night: {
    name: "night",
    tone: "night",
    density: "dense",
    foreground: "forest-floor",
    mist: "low",
    intensity: 1,
    canopy: true,
    sideRails: true,
  },
} as const satisfies Record<SceneName, SceneConfig>;

/** Supporting-page families → default scene + intensity */
export type PageSceneFamily =
  | "arrival-interior"
  | "ritual-ember"
  | "morning-trail"
  | "arrival-evening"
  | "lake-mist"
  | "dark-lodge"
  | "quiet-morning"
  | "winter-forest"
  | "seo-light";

export const pageSceneFamilies: Record<
  PageSceneFamily,
  { scene: SceneConfig; intensity: number }
> = {
  "arrival-interior": {
    scene: { ...homeScenes.arrival, intensity: 0.55, density: "medium" },
    intensity: 0.55,
  },
  "ritual-ember": {
    scene: { ...homeScenes.ritual, intensity: 0.75 },
    intensity: 0.75,
  },
  "morning-trail": {
    scene: {
      ...homeScenes.interior,
      name: "interior",
      tone: "sage",
      density: "medium",
      foreground: "forest-floor",
      mist: "low",
      intensity: 0.55,
    },
    intensity: 0.55,
  },
  "arrival-evening": {
    scene: {
      ...homeScenes.arrival,
      tone: "dusk",
      intensity: 0.65,
      density: "medium",
    },
    intensity: 0.65,
  },
  "lake-mist": {
    scene: { ...homeScenes.lake, intensity: 0.55 },
    intensity: 0.55,
  },
  "dark-lodge": {
    scene: { ...homeScenes.night, intensity: 0.65, density: "medium" },
    intensity: 0.65,
  },
  "quiet-morning": {
    scene: {
      ...homeScenes.arrival,
      density: "open",
      mist: "medium",
      intensity: 0.5,
      sideRails: true,
    },
    intensity: 0.5,
  },
  "winter-forest": {
    scene: {
      ...homeScenes.arrival,
      tone: "forest",
      density: "dense",
      mist: "heavy",
      intensity: 0.7,
    },
    intensity: 0.7,
  },
  "seo-light": {
    scene: {
      ...homeScenes.gallery,
      density: "open",
      intensity: 0.45,
      sideRails: true,
    },
    intensity: 0.45,
  },
};

export const routeSceneMap: Record<
  string,
  { family: PageSceneFamily; intensityLabel: string }
> = {
  "/": { family: "arrival-interior", intensityLabel: "maximum" },
  "/lake-arrowhead-a-frame-cabin": {
    family: "arrival-interior",
    intensityLabel: "medium",
  },
  "/lake-arrowhead-cabin-with-sauna": {
    family: "ritual-ember",
    intensityLabel: "high",
  },
  "/dog-friendly-lake-arrowhead-cabin": {
    family: "morning-trail",
    intensityLabel: "medium",
  },
  "/weekend-from-los-angeles": {
    family: "arrival-evening",
    intensityLabel: "medium-high",
  },
  "/shoreline-rights": { family: "lake-mist", intensityLabel: "medium" },
  "/chapters": { family: "dark-lodge", intensityLabel: "medium-high" },
  "/burnout-reset": { family: "quiet-morning", intensityLabel: "medium" },
  "/holiday-ready": { family: "winter-forest", intensityLabel: "medium-high" },
};

export const sceneAssets = {
  pinesLeft: "/illustrations/scenes/scene-pines-left.webp",
  pinesRight: "/illustrations/scenes/scene-pines-right.webp",
  mistCanopy: "/illustrations/scenes/scene-mist-canopy.webp",
  nightFloor: "/illustrations/scenes/scene-night-floor.webp",
  branchLeft: "/illustrations/scenes/scene-branch-left.webp",
  branchRight: "/illustrations/scenes/scene-branch-right.webp",
  shrubsRocks: "/illustrations/scenes/scene-shrubs-rocks.webp",
  lakeMist: "/illustrations/scenes/scene-lake-mist.webp",
  forestWallLeft: "/illustrations/scenes/forest-wall-left.webp",
  forestWallRight: "/illustrations/scenes/forest-wall-right.webp",
  mistCabinTransition: "/illustrations/scenes/mist-cabin-transition.webp",
  forestHillsTransition: "/illustrations/scenes/forest-hills-transition.webp",
} as const;
