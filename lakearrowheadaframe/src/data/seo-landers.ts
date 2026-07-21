import { getAirbnbPhoto } from "@/data/photos";

export type SeoLanderSection = {
  title: string;
  body: string;
};

export type SeoLander = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  headline: string;
  lead: string;
  campaign: string;
  breadcrumbLabel: string;
  photo: { src: string; alt: string };
  sections: SeoLanderSection[];
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ href: string; label: string }>;
};

export const saunaLander: SeoLander = {
  path: "/lake-arrowhead-cabin-with-sauna",
  title: "Lake Arrowhead cabin with sauna",
  metaTitle: "Lake Arrowhead Cabin with Sauna & Hot Tub",
  description:
    "Book a Lake Arrowhead cabin with an indoor sauna and hot tub in the pines. Rare mountain ritual at our Guest Favorite A-frame in Arrowhead Woods. 90 minutes from LA.",
  keywords: [
    "Lake Arrowhead cabin with sauna",
    "indoor sauna cabin Lake Arrowhead",
    "Lake Arrowhead hot tub and sauna",
    "sauna cabin near Los Angeles",
  ],
  headline: "A Lake Arrowhead cabin with an indoor sauna. Then hot tub under the pines.",
  lead: "Most mountain rentals stop at a hot tub. This Arrowhead Woods A-frame adds an indoor Dynamic sauna so the weekend has a real ritual: heat, cool pine air, soak. Guest Favorite on Airbnb.",
  campaign: "sauna-lander",
  breadcrumbLabel: "Cabin with Sauna",
  photo: {
    src: getAirbnbPhoto("rainier_sauna.jpg").src,
    alt: getAirbnbPhoto("rainier_sauna.jpg").alt,
  },
  sections: [
    {
      title: "Why an indoor sauna matters in Lake Arrowhead",
      body: "Arrowhead weekends swing from sun on the deck to cold mountain nights. An indoor sauna means the ritual works in any season. After a Village walk, after Snow Valley, or when the weather turns. You are not waiting for a spa appointment; you are running a simple circuit at the cabin.",
    },
    {
      title: "The ritual guests actually do",
      body: "Heat in the Dynamic sauna. Step onto the deck for cool pine air. Finish in the hot tub under the trees. Guests describe it as the reason they stop shopping other listings. Not a brochure amenity, a repeatable evening.",
    },
    {
      title: "Paired with the rest of the cabin",
      body: "Floor-to-ceiling glass, three decks, a fenced dog yard, and honest owner lake-trail access when registered. Beach clubs are not included. We say that upfront so the sauna weekend is not sold on a false lake pass.",
    },
    {
      title: "Who this page is for",
      body: "Couples and small groups searching for a Lake Arrowhead cabin with sauna, a wellness-leaning LA/OC weekend, or a winter escape that still feels luxurious when it rains. Sleeps up to eight. Dog-friendly.",
    },
  ],
  faqs: [
    {
      question: "Is the sauna indoor or outdoor?",
      answer:
        "Indoor Dynamic sauna inside the cabin, paired with an outdoor hot tub on the lower deck among the pines.",
    },
    {
      question: "Is a Lake Arrowhead cabin with sauna hard to find?",
      answer:
        "Yes relative to hot-tub-only rentals. Indoor sauna inventory is thinner in Arrowhead, which is why we lead with the ritual instead of burying it in an amenity list.",
    },
  ],
  related: [
    { href: "/lake-arrowhead-a-frame-cabin", label: "A-frame cabin details" },
    { href: "/dog-friendly-lake-arrowhead-cabin", label: "Dog-friendly cabin" },
    { href: "/weekend-from-los-angeles", label: "Weekend from Los Angeles" },
    { href: "/chapters", label: "Guest reviews" },
  ],
};

export const dogFriendlyLander: SeoLander = {
  path: "/dog-friendly-lake-arrowhead-cabin",
  title: "Dog-friendly Lake Arrowhead cabin",
  metaTitle: "Dog-Friendly Lake Arrowhead Cabin with Fenced Yard",
  description:
    "Dog-friendly Lake Arrowhead cabin rental with a fenced yard, three decks, indoor sauna, and hot tub. Clear pet rules, Guest Favorite A-frame in Arrowhead Woods.",
  keywords: [
    "dog friendly Lake Arrowhead cabin",
    "Lake Arrowhead cabin with fenced yard",
    "pet friendly Lake Arrowhead vacation rental",
    "bring dog Lake Arrowhead Airbnb",
  ],
  headline: "A dog-friendly Lake Arrowhead cabin with a real fenced yard.",
  lead: "Bring the dog without decoding vague pet policies at midnight. This Arrowhead Woods A-frame has a fenced yard, three decks, and host rules that say yes to dogs up front. Plus sauna, hot tub, and Guest Favorite reviews.",
  campaign: "dog-friendly-lander",
  breadcrumbLabel: "Dog-Friendly Cabin",
  photo: {
    src: getAirbnbPhoto("rainier_42.jpg").src,
    alt: getAirbnbPhoto("rainier_42.jpg").alt,
  },
  sections: [
    {
      title: "Fenced yard, not a hope-and-leash situation",
      body: "Dogs get a fenced yard and deck space so mountain weekends are less about constant vigilance and more about pine air. Declare your dog when you book on Airbnb so we can set expectations before arrival.",
    },
    {
      title: "Honest pet rules beat surprise fees",
      body: "We would rather you know the house is dog-friendly before you drive up the mountain. Follow the Airbnb listing for current pet fees and house rules. Then pack bowls, a bed, and a leash for Village walks.",
    },
    {
      title: "What dogs and humans share here",
      body: "Morning deck time, Village outings, optional registered shoreline walks for humans, and evenings that end in the hot tub while the dog claims a quiet corner inside. Indoor sauna for people; fenced recovery space for pups.",
    },
    {
      title: "Lake access still has human rules",
      body: "Owner lake trails for registered guests do not turn Lake Arrowhead into an off-leash dog park. Beach clubs remain off-limits for STR guests. Read the shoreline guide so the dog weekend stays compliant and calm.",
    },
  ],
  faqs: [
    {
      question: "Are dogs allowed at this Lake Arrowhead cabin?",
      answer:
        "Yes. The cabin is dog-friendly with a fenced yard. Add your dog when booking on Airbnb and follow the listing’s pet rules.",
    },
    {
      question: "Can dogs go on ALA shoreline trails?",
      answer:
        "ALA and local leash rules apply. Plan for leashed, considerate trail use and never assume beach-club or dock access. When in doubt, the fenced yard is the reliable play zone.",
    },
  ],
  related: [
    { href: "/shoreline-rights", label: "Lake access decoder" },
    { href: "/lake-arrowhead-cabin-with-sauna", label: "Sauna & hot tub" },
    { href: "/weekend-from-los-angeles", label: "Weekend from Los Angeles" },
    { href: "/chapters", label: "Guest reviews" },
  ],
};

export const aframeLander: SeoLander = {
  path: "/lake-arrowhead-a-frame-cabin",
  title: "Lake Arrowhead A-frame cabin rental",
  metaTitle: "Lake Arrowhead A-Frame Cabin Rental",
  description:
    "Modern Lake Arrowhead A-frame cabin rental with floor-to-ceiling glass, indoor sauna, hot tub, and dog-friendly yard in Arrowhead Woods. Guest Favorite · 90 min from LA.",
  keywords: [
    "Lake Arrowhead A-frame rental",
    "Lake Arrowhead A-frame cabin",
    "modern A-frame cabin Lake Arrowhead",
    "A-frame Airbnb Lake Arrowhead",
  ],
  headline: "The Lake Arrowhead A-frame cabin guests call “on another level.”",
  lead: "A renovated A-frame in Arrowhead Woods. Soaring glass, pine light all day, indoor sauna, hot tub in the trees. Not a generic condo. A recognizable mountain silhouette you can feel from the driveway.",
  campaign: "aframe-lander",
  breadcrumbLabel: "A-Frame Cabin",
  photo: {
    src: getAirbnbPhoto("rainier_46.jpg").src,
    alt: getAirbnbPhoto("rainier_46.jpg").alt,
  },
  sections: [
    {
      title: "Glass-wall A-frame, not a marketing label",
      body: "The full glass wall is the reason guests stop scrolling. Vaulted living space, forest views, Ms Pac-Man and a piano when the weather turns. Architecture is the product. Amenities support it.",
    },
    {
      title: "Arrowhead Woods setting",
      body: "Five minutes to Lake Arrowhead Village. Owner lake trails when registered. Beach clubs not included. The community context matters if you care about pine streets and honest shoreline access instead of a fake “lake pass.”",
    },
    {
      title: "Designed for real weekends",
      body: "Three bedrooms, three baths, sleeps eight. Three decks with string lights. 165 Mbps for remote weeks. Dog-friendly fenced yard. The A-frame is the photo; the ritual is how people remember the stay.",
    },
    {
      title: "Social proof that matches the search",
      body: "Guest Favorite with a 4.95 average across dozens of quiet stays. Review themes repeat: glass wall, winter escape from LA, “stop your search and book this.” Read the anthology when you want the long version.",
    },
  ],
  faqs: [
    {
      question: "Is this a true A-frame cabin in Lake Arrowhead?",
      answer:
        "Yes. It is a renovated A-frame with a dramatic glass wall and vaulted living area in Arrowhead Woods. The silhouette people mean when they search for a Lake Arrowhead A-frame rental.",
    },
    {
      question: "How many guests does the A-frame sleep?",
      answer: "Up to eight guests across three bedrooms and three bathrooms.",
    },
  ],
  related: [
    { href: "/lake-arrowhead-cabin-with-sauna", label: "Sauna ritual" },
    { href: "/dog-friendly-lake-arrowhead-cabin", label: "Dog-friendly details" },
    { href: "/shoreline-rights", label: "Lake access honesty" },
    { href: "/chapters", label: "Review chapters" },
  ],
};

export const weekendLaLander: SeoLander = {
  path: "/weekend-from-los-angeles",
  title: "Lake Arrowhead weekend from Los Angeles",
  metaTitle: "Lake Arrowhead Weekend Getaway from Los Angeles",
  description:
    "Plan a Lake Arrowhead weekend getaway from Los Angeles. About 90 minutes to our sauna-and-hot-tub A-frame in Arrowhead Woods. Dog-friendly. Guest Favorite on Airbnb.",
  keywords: [
    "Lake Arrowhead weekend from Los Angeles",
    "cabin 90 minutes from LA",
    "Lake Arrowhead getaway from LA",
    "weekend cabin near Los Angeles",
  ],
  headline: "A Lake Arrowhead weekend getaway about 90 minutes from Los Angeles.",
  lead: "Leave the basin Friday. Sauna, hot tub, pine decks, and Village dinner by evening. This Arrowhead Woods A-frame is built for Southern California drive-market weekends. Not a flight, not a seven-hour trek.",
  campaign: "weekend-la-lander",
  breadcrumbLabel: "Weekend from LA",
  photo: {
    src: getAirbnbPhoto("rainier_4.jpg").src,
    alt: getAirbnbPhoto("rainier_4.jpg").alt,
  },
  sections: [
    {
      title: "Drive times that make spontaneous weekends possible",
      body: "Downtown Los Angeles is about 90 minutes depending on traffic and mountain conditions. Ontario International Airport is about 60 minutes. Lake Arrowhead Village is five minutes from the cabin. That math is why LA and OC guests come often instead of once a year.",
    },
    {
      title: "A 48-hour shape that works",
      body: "Friday: arrive, unpack, hot tub under the pines. Saturday: sauna ritual, Village or SkyPark, long dinner. Sunday: slow coffee in the glass wall light, optional shoreline walk if registered, drive home before the Monday spiral. Prefer a personalized plan? Take the burnout reset quiz.",
    },
    {
      title: "What to pack for an LA-to-Arrowhead switch",
      body: "Layers for mountain nights, dog gear if you are bringing a pet, and realistic expectations about private-lake rules. You do not need beach-club fantasies for a restorative weekend. You need quiet, heat, and pines.",
    },
    {
      title: "Winter and summer both work from LA",
      body: "Snow Valley is about 20 minutes when you want snow. Summer leans Village, decks, and optional shoreline. The indoor sauna keeps shoulder-season rain from wrecking the trip.",
    },
  ],
  faqs: [
    {
      question: "How long is the drive from Los Angeles to Lake Arrowhead?",
      answer:
        "About 90 minutes from downtown Los Angeles in typical conditions. Always check traffic and mountain weather before you leave.",
    },
    {
      question: "Is this cabin good for a one-night LA reset?",
      answer:
        "Yes for couples and small groups who value sauna, hot tub, and sleep over packing a full itinerary. Two nights is the sweet spot; the quiz helps you pick a protocol.",
    },
  ],
  related: [
    { href: "/burnout-reset", label: "48-hour burnout reset quiz" },
    { href: "/lake-arrowhead-cabin-with-sauna", label: "Sauna cabin" },
    { href: "/dog-friendly-lake-arrowhead-cabin", label: "Bring the dog" },
    { href: "/shoreline-rights", label: "Lake access guide" },
  ],
};

export const allSeoLanders = [
  saunaLander,
  dogFriendlyLander,
  aframeLander,
  weekendLaLander,
];
