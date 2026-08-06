export type ReviewChapter = {
  id: string;
  title: string;
  theme: string;
  quotes: string[];
};

export const reviewChapters: ReviewChapter[] = [
  {
    id: "01",
    title: "The Favorite",
    theme: "Overall stay",
    quotes: [
      "My favorite Airbnb we have stayed at.",
      "Best Airbnb we've ever stayed at.",
      "Stop your search and book this!",
    ],
  },
  {
    id: "02",
    title: "The Glass Wall",
    theme: "Architecture",
    quotes: [
      "That giant window… is on another level.",
      "The A-frame design with those floor-to-ceiling windows is something else.",
    ],
  },
  {
    id: "03",
    title: "The Reset",
    theme: "Weekend escape",
    quotes: [
      "Absolutely stunning A-frame! The renovation is impeccable and the forest views are breathtaking.",
      "The perfect winter escape from LA.",
      "We didn't want to leave.",
    ],
  },
  {
    id: "04",
    title: "The Return",
    theme: "Repeat intent",
    quotes: [
      "Already planning our return trip.",
      "Would definitely come back.",
    ],
  },
];

export const anthologyMeta = {
  issue: 85,
  rating: 4.95,
  label: "Guest Favorite",
};
