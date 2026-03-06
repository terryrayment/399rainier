export const property = {
  address: "399 Rainier Road",
  city: "Lake Arrowhead",
  state: "CA",
  zip: "92352",
  price: 889000,
  beds: 3,
  baths: 3,
  sqft: 2106,
  lotSize: "0.25 acres",
  yearBuilt: 1965,
  yearRenovated: 2023,
  type: "A-Frame",
  mls: "IG25221884",
  tagline: "An A-Frame Retreat Among the Pines",
  headline: "Where Modern Living Meets Mountain Magic",
  description:
    "Fully renovated and nestled amidst the towering pines of Lake Arrowhead, this striking A-frame perfectly blends modern updates with timeless mountain charm. Floor-to-ceiling windows flood the open living area with natural light and frame breathtaking views of the surrounding forest.",
  highlights: [
    "Floor-to-ceiling windows with panoramic forest views",
    "Fully renovated with contemporary finishes throughout",
    "Open-concept living with soaring A-frame ceilings",
    "Primary suite with loft and treetop views",
    "Three serene decks for year-round outdoor living",
    "Sleek modern kitchen with premium appliances",
    "Proven Airbnb performer with strong rental history",
    "90 minutes from downtown Los Angeles",
  ],
  features: {
    interior: [
      "Open-concept great room with fireplace",
      "Floor-to-ceiling windows",
      "Modern kitchen with quartz countertops",
      "Primary suite on upper level with loft",
      "Two generous bedrooms on main level",
      "Three full bathrooms",
      "Hardwood and tile flooring throughout",
    ],
    exterior: [
      "Three expansive decks",
      "Surrounded by mature pine trees",
      "Private forest setting",
      "Ample parking",
    ],
  },
  // Replace these with your actual property photos
  // Drop images into /public/photos/ and update paths here
  photos: [
    {
      src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
      alt: "A-frame cabin nestled in pine trees",
      caption: "Exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
      alt: "Modern cabin interior with large windows",
      caption: "Living Room",
    },
    {
      src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      alt: "Modern open kitchen",
      caption: "Kitchen",
    },
    {
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      alt: "Cozy bedroom with mountain views",
      caption: "Primary Suite",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      alt: "Deck overlooking forest",
      caption: "Deck",
    },
    {
      src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&q=80",
      alt: "Snow-covered A-frame cabin",
      caption: "Winter",
    },
  ],
};

export const airbnbData = {
  // PLACEHOLDER — Replace with your actual Airbnb data
  averageNightlyRate: 340,
  occupancyRate: 0.65,
  annualRevenue: 72000,
  totalReviews: 85,
  averageRating: 4.9,
  superhostStatus: true,
  yearsOperating: 3,
  topReviews: [
    {
      guest: "Sarah M.",
      date: "January 2026",
      text: "Absolutely stunning A-frame! The renovation is impeccable and the forest views are breathtaking. We didn't want to leave.",
      rating: 5,
    },
    {
      guest: "David & Lauren",
      date: "December 2025",
      text: "The perfect winter escape from LA. Cozy fireplace, modern kitchen, and the decks are magical with snow on the trees.",
      rating: 5,
    },
    {
      guest: "Michael T.",
      date: "October 2025",
      text: "Best Airbnb we've ever stayed at. The A-frame design with those floor-to-ceiling windows is something else. Already planning our return trip.",
      rating: 5,
    },
  ],
  // Revenue projections at different occupancy levels
  projections: [
    { occupancy: 0.5, annual: 55000, monthly: 4583 },
    { occupancy: 0.6, annual: 66000, monthly: 5500 },
    { occupancy: 0.65, annual: 72000, monthly: 6000 },
    { occupancy: 0.75, annual: 83000, monthly: 6917 },
  ],
};

export const neighborhood = {
  driveTimesFrom: [
    { place: "Downtown Los Angeles", time: "90 min" },
    { place: "Ontario International Airport", time: "60 min" },
    { place: "San Bernardino", time: "35 min" },
    { place: "Big Bear Lake", time: "45 min" },
    { place: "Palm Springs", time: "90 min" },
  ],
  attractions: [
    {
      name: "Lake Arrowhead Village",
      distance: "5 min drive",
      description:
        "Charming Alpine-inspired village with 50+ waterfront shops, boutiques, restaurants, and live music on the southern shore of the lake.",
      category: "shopping" as const,
    },
    {
      name: "SkyPark at Santa's Village",
      distance: "15 min drive",
      description:
        "Premier outdoor adventure park — mountain biking, zip-lining, rock climbing, archery, ax throwing, skating, and seasonal events in the San Bernardino National Forest.",
      category: "adventure" as const,
    },
    {
      name: "Lake Arrowhead Boat Tours",
      distance: "5 min drive",
      description:
        "Daily hour-long cruises along the shoreline with views of lakefront mansions and local history narration.",
      category: "water" as const,
    },
    {
      name: "Heart Rock Trail",
      distance: "10 min drive",
      description:
        "One of the most popular hikes in the area — a moderate trail leading to a natural heart-shaped rock formation in a creek bed.",
      category: "hiking" as const,
    },
    {
      name: "Heaps Peak Arboretum",
      distance: "10 min drive",
      description:
        "A peaceful 1-mile loop trail through giant sequoias with educational displays about local flora and fauna. Perfect for families.",
      category: "hiking" as const,
    },
    {
      name: "Snow Valley Mountain Resort",
      distance: "20 min drive",
      description:
        "The mountain's top ski resort with runs for all skill levels, snow tubing, and winter activities from November through March.",
      category: "adventure" as const,
    },
    {
      name: "Lake Gregory Regional Park",
      distance: "10 min drive",
      description:
        "Swimming, fishing, kayaking, and hiking at this beautiful mountain lake open to the public year-round.",
      category: "water" as const,
    },
    {
      name: "Deep Creek Hot Springs",
      distance: "30 min drive",
      description:
        "Natural hot springs along Deep Creek — a challenging but rewarding hike to one of Southern California's hidden gems.",
      category: "hiking" as const,
    },
  ],
  dining: [
    {
      name: "Jettie's Waterfront Kitchen",
      description: "Lakefront fine dining with stunning water views",
    },
    {
      name: "Belgian Waffle Works",
      description: "Beloved breakfast spot in the Village",
    },
    {
      name: "Papagayos Mexican Restaurant",
      description: "Local favorite for Mexican cuisine",
    },
    {
      name: "The Grill at Antlers Inn",
      description: "Classic American comfort food",
    },
  ],
  seasons: [
    {
      name: "Winter",
      icon: "snowflake",
      description:
        "Snow-dusted pines, cozy fires, skiing at Snow Valley. The A-frame is magical blanketed in white.",
    },
    {
      name: "Spring",
      icon: "flower",
      description:
        "Wildflowers emerge, trails reopen, and the forest comes alive with fresh green canopy and birdsong.",
    },
    {
      name: "Summer",
      icon: "sun",
      description:
        "Lake days, hiking, BBQs on the deck. Golden hour through the floor-to-ceiling windows is unforgettable.",
    },
    {
      name: "Fall",
      icon: "leaf",
      description:
        "The mountains transform with autumn color. Cool mornings, warm afternoons, and the crackle of the first fire.",
    },
  ],
};
