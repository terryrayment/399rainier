export type BurnoutProfile = "reset" | "reconnect" | "recharge";

export type QuizOption = {
  id: string;
  label: string;
  profile: BurnoutProfile;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export const burnoutQuestions: QuizQuestion[] = [
  {
    id: "pace",
    prompt: "What kind of tired are you?",
    options: [
      { id: "pace-a", label: "Screen-fatigued — I need quiet", profile: "reset" },
      { id: "pace-b", label: "Over-scheduled — I need space with my people", profile: "reconnect" },
      { id: "pace-c", label: "Wired — I need to move and soak", profile: "recharge" },
    ],
  },
  {
    id: "company",
    prompt: "Who is coming?",
    options: [
      { id: "company-a", label: "Just me or us two", profile: "reset" },
      { id: "company-b", label: "Family or friends", profile: "reconnect" },
      { id: "company-c", label: "Me plus a dog", profile: "recharge" },
    ],
  },
  {
    id: "weather",
    prompt: "If it rains, you want…",
    options: [
      { id: "weather-a", label: "Sauna, fireplace, Ms Pac-Man", profile: "reset" },
      { id: "weather-b", label: "Board games and long meals", profile: "reconnect" },
      { id: "weather-c", label: "Hot tub anyway", profile: "recharge" },
    ],
  },
  {
    id: "drive",
    prompt: "How far will you drive for relief?",
    options: [
      { id: "drive-a", label: "Up to 90 minutes from LA", profile: "reset" },
      { id: "drive-b", label: "Worth it if the cabin feels special", profile: "reconnect" },
      { id: "drive-c", label: "Only if I can bring my dog", profile: "recharge" },
    ],
  },
];

export const burnoutProtocols: Record<
  BurnoutProfile,
  { title: string; itinerary: string[]; cta: string }
> = {
  reset: {
    title: "48-Hour Reset Protocol",
    itinerary: [
      "Arrive · forest deck breathing room",
      "Hour 2 · indoor sauna session",
      "Evening · hot tub under the pines",
      "Morning · coffee + floor-to-ceiling light",
      "Midday · Village stroll or trail time",
      "Afternoon · WFH block if needed (165 Mbps)",
    ],
    cta: "Book your reset on Airbnb",
  },
  reconnect: {
    title: "48-Hour Reconnect Protocol",
    itinerary: [
      "Arrive · deck dinner with string lights",
      "Evening · den fireplace + games",
      "Morning · slow breakfast in open kitchen",
      "Midday · SkyPark or lake trail (registered guests)",
      "Afternoon · Ms Pac-Man tournament",
      "Evening · hot tub + stargazing",
    ],
    cta: "Book your reconnect on Airbnb",
  },
  recharge: {
    title: "48-Hour Recharge Protocol",
    itinerary: [
      "Arrive · dog yard + forest walk",
      "Hour 1 · hot tub among the pines",
      "Hour 3 · sauna cool-down cycle",
      "Morning · Heart Rock or Village hike",
      "Afternoon · piano, arcade, or nap in primary suite",
      "Checkout · already planning the return",
    ],
    cta: "Book your recharge on Airbnb",
  },
};
