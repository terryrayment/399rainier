export const shorelineZones = [
  {
    status: "YES" as const,
    title: "Owner lake trails & shoreline recreation",
    body: "Registered short-term guests at eligible Arrowhead Woods properties may access certain ALA trails and shoreline areas when the host complies with registration and RFID rules.",
    detail: "This is owner lake rights exercised correctly — not a public lake pass.",
  },
  {
    status: "NO" as const,
    title: "Private beach clubs",
    body: "STR guests cannot use Tavern Bay, Burnt Mill, or other private beach clubs — regardless of what competing listings imply with \"lake pass included\" language.",
    detail: "If a listing promises beach club access, read the fine print.",
  },
  {
    status: "VERIFY" as const,
    title: "Boating & dock privileges",
    body: "Boating requires ALA membership steps, registration, and compliance with current operating rules. Dock slips and club amenities are not automatic for every stay.",
    detail: "Confirm current ALA guidance before you plan a lake day around boating.",
  },
  {
    status: "YES" as const,
    title: "Village, SkyPark, and public-adjacent outings",
    body: "Lake Arrowhead Village, SkyPark, hiking, and dining are straightforward — five to fifteen minutes from the cabin without lake membership confusion.",
    detail: "Most weekend resets never need the lake at all.",
  },
];

export const shorelineSteps = [
  {
    step: "01",
    title: "Confirm the property is in Arrowhead Woods",
    body: "Lake access for short-term guests is tied to eligible Arrowhead Woods ownership and ALA membership — not every Lake Arrowhead rental. This A-frame is in Arrowhead Woods with owner lake rights.",
  },
  {
    step: "02",
    title: "Host registers the stay with ALA",
    body: "Before lake use, the host must register guests under a valid ALA membership. We handle registration for confirmed stays so you are not guessing at check-in.",
  },
  {
    step: "03",
    title: "Adults sign the digital liability waiver",
    body: "Each guest over 18 typically signs ALA’s digital waiver acknowledging the rules and personal liability. Plan a few minutes for this before you head to the shoreline.",
  },
  {
    step: "04",
    title: "Carry the host RFID / membership credentials",
    body: "Guests must carry the property owner’s RFID membership card while on ALA property. We provide clear instructions in the Airbnb guidebook so this does not become a scavenger hunt.",
  },
  {
    step: "05",
    title: "Stay on trails and shoreline — skip beach clubs",
    body: "Registered guests may use designated trails and shoreline areas for walking, shoreline recreation, and related allowed uses. Beach clubs, parks, Lone Pine Island, and courtesy docks remain off-limits for STR guests.",
  },
];

export const shorelineMyths = [
  {
    myth: "\"Lake pass included\" means beach clubs.",
    truth: "Often false for STR guests. Owner lake rights ≠ club membership.",
  },
  {
    myth: "Every Lake Arrowhead rental includes the same lake access.",
    truth: "Access depends on deed, Arrowhead Woods boundary, and ALA rules.",
  },
  {
    myth: "Guests can figure it out when they arrive.",
    truth: "Registration and host compliance should happen before check-in.",
  },
];

export const lakeComparison = [
  {
    lake: "Lake Arrowhead",
    access: "Private (ALA)",
    strGuests: "Registered shoreline / trail access when host complies; no beach clubs",
    bestFor: "Quiet walks, honest Arrowhead Woods stays, Village weekends",
  },
  {
    lake: "Lake Gregory",
    access: "Public",
    strGuests: "Open recreation with standard park / beach rules and tickets where required",
    bestFor: "Public swim beach, paddle sports, family lake days without RFID logistics",
  },
];

export const shorelineFaqs = [
  {
    question: "Can Airbnb guests use Lake Arrowhead?",
    answer:
      "Sometimes — with limits. Registered short-term guests at eligible Arrowhead Woods homes may access certain ALA trails and shoreline areas. They cannot use private beach clubs. Always verify the listing’s Arrowhead Woods status and the host’s registration process.",
  },
  {
    question: "What does “lake rights” mean for a rental guest?",
    answer:
      "For owners, lake rights are deed- and membership-linked privileges through the Arrowhead Lake Association. For STR guests, that usually translates to registered shoreline and trail access — not a transferable beach-club pass.",
  },
  {
    question: "Do we need a boat for a good Lake Arrowhead weekend?",
    answer:
      "No. Many of our best guest weekends never touch the water: sauna, hot tub, Village dinner, SkyPark, and pine-deck mornings. Shoreline walks are a bonus when you want them — not the only reason to book.",
  },
];

export const shorelineSources = [
  {
    label: "ALA General Rules",
    href: "https://www.ala-ca.org/general_rules.php",
  },
  {
    label: "ALA STR Lake Access Update (PDF)",
    href: "https://www.ala-ca.org/docs/STR_LAKE_ACCESS_UPDATE.pdf",
  },
  {
    label: "ALA Property Access Rules (includes STR)",
    href: "https://www.ala-ca.org/docs/Changes_in_ALA_Operating_Rules_for_2022_02-28-22.pdf",
  },
  {
    label: "ALA Boating",
    href: "https://www.ala-ca.org/boating.php",
  },
  {
    label: "Visit SB Mountains — Lake Access Guide for STR Guests",
    href: "https://visitsbmountains.com/lake-access-guide-for-str-guests-lake-arrowhead-vs-lake-gregory/",
  },
];
