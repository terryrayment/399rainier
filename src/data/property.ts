export const property = {
  address: "399 Rainier Road",
  city: "Lake Arrowhead",
  state: "CA",
  zip: "92352",
  price: 875000,
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
    "Two masonry fireplaces — wood and gas capable",
    "Three serene decks for year-round outdoor living",
    "Brand new HVAC system (2023) with central A/C",
    "Proven Airbnb + VRBO performer — $42K in 2025",
    "90 minutes from downtown Los Angeles",
  ],

  // Property details from inspection report & title docs
  details: {
    electrical: "200-amp service, copper branch wiring",
    plumbing: "Copper supply and distribution throughout",
    hvac: "Brand new gas-fired forced air (May 2023), American Standard central A/C",
    fireplaces: "Two masonry fireplaces (living room + den) — wood and gas capable",
    appliances: "Samsung suite: refrigerator, range/oven, dishwasher",
    foundation: "Concrete footing with raised stemwall, wood framing",
    roof: "Asphalt composition dimensional shingle, middle lifespan",
    water: "Public water supply, natural gas service",
    propertyTax: 7439, // annual, 2024-2025
    noMelloRoos: true,
    noFloodZone: true,
    noEarthquakeFault: true,
    facing: "South-facing",
    tract: "Lot 127, Arrowhead Woods Tract No. 105",
    jurisdiction: "Unincorporated San Bernardino County",
    strCompliant: true,
  },

  features: {
    interior: [
      "Open-concept great room with stone fireplace",
      "Floor-to-ceiling A-frame windows",
      "Modern kitchen with butcher block counters",
      "Primary suite on upper level with loft",
      "Two generous bedrooms on main level",
      "Three full bathrooms",
      "Lower-level den with brick fireplace",
      "Hardwood flooring throughout",
    ],
    exterior: [
      "Three expansive decks with string lights",
      "Private hot tub among the pines",
      "Surrounded by mature pine trees",
      "Private forest setting on 0.25 acres",
    ],
  },

  // Curated professional photos — best of 48 shots
  photos: [
    {
      src: "/photos/rainier_46.jpg",
      alt: "A-frame exterior at twilight with full glass wall glowing warmly, deck furniture, and pine trees",
      caption: "Twilight",
    },
    {
      src: "/photos/rainier_5.jpg",
      alt: "Living room with soaring A-frame ceiling, stone fireplace, cream sofas, and floor-to-ceiling windows",
      caption: "Living Room",
    },
    {
      src: "/photos/rainier_2.jpg",
      alt: "Aerial view of Lake Arrowhead at sunset with property marked among towering pines",
      caption: "Lake Arrowhead",
    },
    {
      src: "/photos/rainier_9.jpg",
      alt: "Open plan view showing loft, kitchen, dining area, and living room with natural light",
      caption: "Open Plan",
    },
    {
      src: "/photos/rainier_4.jpg",
      alt: "Deck at twilight with string lights, dining table, and A-frame glass wall glowing",
      caption: "Deck",
    },
    {
      src: "/photos/rainier_6.jpg",
      alt: "Modern kitchen with dark cabinets, butcher block counters, white tile backsplash, and Samsung appliances",
      caption: "Kitchen",
    },
    {
      src: "/photos/rainier_47.jpg",
      alt: "A-frame exterior from deck showing full glass facade, warm interior glow, and pine trees at dusk",
      caption: "A-Frame Glow",
    },
    {
      src: "/photos/rainier_42.jpg",
      alt: "Hot tub on lower deck surrounded by towering pine trees at golden hour",
      caption: "Hot Tub",
    },
    {
      src: "/photos/rainier_14.jpg",
      alt: "Primary bedroom with queen bed, hardwood floors, and Samsung Serif TV",
      caption: "Primary Suite",
    },
    {
      src: "/photos/rainier_41.jpg",
      alt: "Lower level den with brick fireplace, terracotta velvet sofas, and sliding glass doors to forest",
      caption: "Den",
    },
    {
      src: "/photos/rainier_33-2.jpg",
      alt: "Guest bedroom with twin beds, warm textiles, and natural light through pine tree windows",
      caption: "Guest Room",
    },
    {
      src: "/photos/rainier_50.jpg",
      alt: "A-frame cabin exterior at dusk with warm windows glowing against moody blue sky and pine trees",
      caption: "Dusk",
    },
    {
      src: "/photos/rainier_1.jpg",
      alt: "Drone sunset panorama of Lake Arrowhead with golf course, mountains, and property pinned in forest",
      caption: "Sunset Aerial",
    },
    {
      src: "/photos/rainier_26.jpg",
      alt: "Walkway approach to A-frame through fall foliage and mature trees at golden hour",
      caption: "Approach",
    },
    {
      src: "/photos/rainier_28.jpg",
      alt: "Outdoor dining on upper deck surrounded by towering pines with mountain views",
      caption: "Al Fresco",
    },
    {
      src: "/photos/rainier_3.jpg",
      alt: "Overhead drone shot of A-frame cabin and decks nestled among towering pine trees",
      caption: "Bird's Eye",
    },
  ],
};

export const airbnbData = {
  // Real combined earnings data (Airbnb + VRBO)
  annualRevenue2025: 42046.89, // Airbnb $38,565.63 + VRBO $3,481.26
  airbnbRevenue2025: 38565.63,
  vrboRevenue2025: 3481.26, // 3 completed VRBO stays (8 nights)
  ytd2026: 5384.18,
  superhostStatus: true,
  // TODO: Replace with real review count and rating from your listing
  totalReviews: 85,
  averageRating: 4.9,

  // 2025 monthly earnings (Airbnb + VRBO combined)
  monthly2025: [
    { month: "Jan", revenue: 2064.74 },
    { month: "Feb", revenue: 2684.87 },
    { month: "Mar", revenue: 3020.78 },
    { month: "Apr", revenue: 3084.92 }, // Airbnb $1,502.05 + VRBO $1,582.87
    { month: "May", revenue: 3433.60 },
    { month: "Jun", revenue: 3121.02 }, // Airbnb $1,222.63 + VRBO $1,898.39
    { month: "Jul", revenue: 2586.04 },
    { month: "Aug", revenue: 5491.03 },
    { month: "Sep", revenue: 3710.40 },
    { month: "Oct", revenue: 2665.61 },
    { month: "Nov", revenue: 702.67 },
    { month: "Dec", revenue: 9481.21 },
  ],

  // 2026 earnings (year-to-date)
  monthly2026: [
    { month: "Jan", revenue: 3434.58 },
    { month: "Feb", revenue: 1949.60 },
  ],

  // Growth: Jan 2026 vs Jan 2025 = 66% increase
  yoyGrowthJan: 0.66,

  // Upcoming scheduled payouts (as of March 2026)
  upcomingPayouts: 2854.13,

  // TODO: Replace placeholder reviews with real Airbnb reviews
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
