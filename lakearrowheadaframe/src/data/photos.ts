export type CabinPhoto = {
  src: string;
  alt: string;
  caption: string;
};

/** Matches live Airbnb listing gallery order (see docs/marketplace-airbnb-booking-test.md). */
export const AIRBNB_GALLERY_ORDER = [
  "rainier_46.jpg",
  "rainier_5.jpg",
  "rainier_42.jpg",
  "rainier_4.jpg",
  "rainier_47.jpg",
  "rainier_9.jpg",
  "rainier_14.jpg",
  "rainier_28.jpg",
] as const;

const photoCatalog: Record<string, CabinPhoto> = {
  "rainier_46.jpg": {
    src: "/photos/rainier_46.jpg",
    alt: "A-frame exterior at twilight with full glass wall glowing warmly, deck furniture, and pine trees",
    caption: "Twilight",
  },
  "rainier_5.jpg": {
    src: "/photos/rainier_5.jpg",
    alt: "Living room with soaring A-frame ceiling, stone fireplace, cream sofas, and floor-to-ceiling windows",
    caption: "Living Room",
  },
  "rainier_42.jpg": {
    src: "/photos/rainier_42.jpg",
    alt: "Hot tub on lower deck surrounded by towering pine trees at golden hour",
    caption: "Hot Tub",
  },
  "rainier_4.jpg": {
    src: "/photos/rainier_4.jpg",
    alt: "Deck at twilight with string lights, dining table, and A-frame glass wall glowing",
    caption: "Deck",
  },
  "rainier_47.jpg": {
    src: "/photos/rainier_47.jpg",
    alt: "A-frame exterior from deck showing full glass facade, warm interior glow, and pine trees at dusk",
    caption: "A-Frame Glow",
  },
  "rainier_9.jpg": {
    src: "/photos/rainier_9.jpg",
    alt: "Open plan view showing loft, kitchen, dining area, and living room with natural light",
    caption: "Open Plan",
  },
  "rainier_14.jpg": {
    src: "/photos/rainier_14.jpg",
    alt: "Primary bedroom with queen bed, hardwood floors, and Samsung Serif TV",
    caption: "Primary Suite",
  },
  "rainier_28.jpg": {
    src: "/photos/rainier_28.jpg",
    alt: "Outdoor dining on upper deck surrounded by towering pines with mountain views",
    caption: "Al Fresco",
  },
  "rainier_sauna.jpg": {
    src: "/photos/rainier_sauna.jpg",
    alt: "Indoor Dynamic infrared sauna with wood frame, glass door, and warm red glow",
    caption: "Sauna",
  },
};

export const airbnbGalleryPhotos: (CabinPhoto & {
  span: "large" | "medium" | "small";
})[] = AIRBNB_GALLERY_ORDER.map((file, index) => {
  const photo = photoCatalog[file];
  const span =
    index === 0 ? "large" : index === AIRBNB_GALLERY_ORDER.length - 1 ? "medium" : "small";

  return { ...photo, span };
});

export function getAirbnbPhoto(file: keyof typeof photoCatalog) {
  return photoCatalog[file];
}

export const heroPhoto = getAirbnbPhoto("rainier_46.jpg");
export const narrativePhoto = getAirbnbPhoto("rainier_5.jpg");
