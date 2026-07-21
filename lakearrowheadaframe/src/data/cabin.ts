import {
  airbnbGalleryPhotos,
  getAirbnbPhoto,
  heroPhoto,
  narrativePhoto,
} from "@/data/photos";

export const cabin = {
  name: "Lake Arrowhead A-Frame",
  address: "399 Rainier Road",
  city: "Lake Arrowhead",
  state: "CA",
  zip: "92352",
  community: "Arrowhead Woods",
  beds: 3,
  baths: 3,
  guests: 8,
  yearRenovated: 2023,
  rating: 4.95,
  reviewCount: 85,
  superhost: true,
  guestFavorite: true,

  heroHeadline: "Above the pines, beneath the glass.",
  heroSubhead:
    "LA weekend reset: sauna, hot tub, fenced yard. Guest Favorite · 4.95★",

  featuredReview: {
    quote: "Best Airbnb we've ever stayed at.",
    author: "Airbnb guest",
    detail: "Guest Favorite · 85 stays",
  },

  featureBar: [
    "Arrowhead Woods",
    "Indoor sauna",
    "Hot tub in the pines",
    "Fenced dog yard",
    "Guest Favorite · 4.95★",
  ],

  ritual: [
    {
      step: "01",
      title: "Indoor Dynamic sauna",
      body: "Heat up inside — rare in Lake Arrowhead.",
    },
    {
      step: "02",
      title: "Cool pine air",
      body: "Step onto the deck. Let the mountain reset you.",
    },
    {
      step: "03",
      title: "Hot tub under the stars",
      body: "Finish among the pines. That is the ritual.",
    },
  ],

  differentiators: [
    {
      title: "The glass wall",
      body: "Guests call it \"on another level\" — forest light all day, glow at twilight.",
      href: "/lake-arrowhead-a-frame-cabin",
      linkLabel: "A-frame cabin details →",
    },
    {
      title: "Honest lake trails",
      body: "Owner trails when registered. Beach clubs excluded — we say so upfront.",
      href: "/shoreline-rights",
      linkLabel: "Lake access, explained →",
    },
    {
      title: "Dogs welcome",
      body: "Fenced yard, three decks, room to roam without guessing the pet rules.",
      href: "/dog-friendly-lake-arrowhead-cabin",
      linkLabel: "Dog-friendly cabin →",
    },
    {
      title: "Close enough to come often",
      body: "90 min from LA · 5 min to the Village · 165 Mbps for remote weeks.",
      href: "/weekend-from-los-angeles",
      linkLabel: "Weekend from Los Angeles →",
    },
  ],

  narrative: {
    headline: "A pause, written in pine and glass.",
    accentWords: ["pine", "glass"],
    body: "Floor-to-ceiling windows. Indoor sauna. Hot tub under the pines. Ninety minutes from Los Angeles. Owner lake trails when registered. Beach clubs are not included.",
  },

  heroPhoto,
  narrativePhoto,

  pleasures: [
    {
      title: "The Glass",
      image: getAirbnbPhoto("rainier_5.jpg").src,
      imageAlt: getAirbnbPhoto("rainier_5.jpg").alt,
      body: "The full glass wall guests call \"on another level.\" Natural light all day, forest glow at twilight, Ms Pac-Man and a piano when the weather turns.",
    },
    {
      title: "The Pines",
      image: getAirbnbPhoto("rainier_42.jpg").src,
      imageAlt: getAirbnbPhoto("rainier_42.jpg").alt,
      body: "Three decks, string lights, a fenced yard for dogs. Owner lake trails when registered — beach clubs excluded, honesty included.",
    },
    {
      title: "The Sauna",
      image: getAirbnbPhoto("rainier_sauna.jpg").src,
      imageAlt: getAirbnbPhoto("rainier_sauna.jpg").alt,
      body: "Indoor Dynamic sauna — rare in Lake Arrowhead. The ritual: sauna, cool air on the deck, then the hot tub under the stars.",
    },
  ],

  gallery: airbnbGalleryPhotos,

  driveTimes: [
    {
      place: "Downtown Los Angeles",
      time: "90 min",
      image: "/photos/drive/downtown-los-angeles.jpg",
      imageAlt: "Downtown Los Angeles skyline at night",
    },
    {
      place: "Lake Arrowhead Village",
      time: "5 min",
      image: "/photos/drive/lake-arrowhead-village.jpg",
      imageAlt: "Lake Arrowhead Village on the water",
    },
    {
      place: "Ontario International Airport",
      time: "60 min",
      image: "/photos/drive/ontario-airport.jpg",
      imageAlt: "Ontario International Airport terminal",
    },
    {
      place: "Snow Valley Ski Resort",
      time: "20 min",
      image: "/photos/drive/snow-valley.jpg",
      imageAlt: "Snow-covered pines at Snow Valley",
    },
    {
      place: "SkyPark at Santa's Village",
      time: "15 min",
      image: "/photos/drive/skypark-santas-village.jpg",
      imageAlt: "Mountain cabin decks among the pines near SkyPark",
    },
  ],

  reviews: [
    { quote: "My favorite Airbnb we have stayed at.", author: "Airbnb guest" },
    { quote: "Best Airbnb we've ever stayed at.", author: "Airbnb guest" },
    { quote: "Stop your search and book this!", author: "Airbnb guest" },
    { quote: "That giant window… is on another level.", author: "Airbnb guest" },
    { quote: "The perfect winter escape from LA.", author: "Airbnb guest" },
    { quote: "We didn't want to leave.", author: "Airbnb guest" },
    { quote: "Already planning our return trip.", author: "Airbnb guest" },
  ],

  ctaHeadline: "Wake where the pines begin.",
};
