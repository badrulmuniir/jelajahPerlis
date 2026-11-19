// Attraction content. Add a place by adding one object to `attractions`.
//
// RULE: no invented facts. Anything unknown is the string "TODO: verify ..." (or null for
// coordinates). The UI shows such values as "To be confirmed". Every TODO is also tracked in
// CONTENT_TODO.md. Images are generic placeholders until real photos are credited in CREDITS.md.

export const categories = [
  { name: "Nature", icon: "🌿", blurb: "Caves, parks and viewpoints." },
  { name: "Heritage & Culture", icon: "🕌", blurb: "Museums, mosques and history." },
  { name: "Food & Local Products", icon: "🍜", blurb: "Seafood, local dishes and produce." },
  { name: "Family & Recreation", icon: "🌳", blurb: "Easy outings for all ages." },
  { name: "Shopping & Border Town", icon: "🛍️", blurb: "Markets and border-town shopping." },
];

const PLACEHOLDER = {
  Nature: "images/placeholder-nature.svg",
  "Heritage & Culture": "images/placeholder-heritage.svg",
  "Food & Local Products": "images/placeholder-food.svg",
  "Family & Recreation": "images/placeholder-family.svg",
  "Shopping & Border Town": "images/placeholder-shopping.svg",
};

const img = (category, name) => [
  { src: PLACEHOLDER[category], alt: `Placeholder illustration for ${name} (real photo to be added)`, width: 1200, height: 800 },
];

const TODO = "TODO: verify";

export const attractions = [
  {
    id: "gua-kelam",
    name: "Gua Kelam",
    category: "Nature",
    tags: ["cave", "tin mining", "family"],
    featured: true,
    summary: "A cave attraction in the Kaki Bukit area, a popular stop for families and nature lovers.",
    description:
      "Gua Kelam is a cave attraction in the Kaki Bukit area of Perlis. It is commonly associated with the area's tin-mining past.\n\n" +
      "TODO: verify history, length of the walkway and what visitors can see inside before adding more detail.",
    highlights: ["Cave visit in the Kaki Bukit area", "Tin-mining heritage theme (TODO: verify details)", "Suitable for families (TODO: verify accessibility)"],
    location: { area: "Kaki Bukit", lat: null, lng: null },
    bestTime: `${TODO} (suggested to check seasonal access)`,
    fee: `${TODO} fee`,
    hours: `${TODO} opening hours`,
    facilities: [`${TODO} facilities`],
    images: img("Nature", "Gua Kelam"),
    nearby: ["wang-kelian-state-park"],
  },
  {
    id: "wang-kelian-state-park",
    name: "Wang Kelian State Park",
    category: "Nature",
    tags: ["forest", "hiking", "nature", "state park"],
    featured: true,
    summary: "Perlis State Park, a protected natural area near the Wang Kelian border area.",
    description:
      "Wang Kelian State Park (also referred to as Perlis State Park) is a protected natural area in Perlis.\n\n" +
      "TODO: verify park boundaries, trails, permit requirements, wildlife and any closures before adding more detail.",
    highlights: ["Protected natural area", "Trails and activities (TODO: verify what is open to visitors)"],
    location: { area: "Wang Kelian", lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO} fee`,
    hours: `${TODO} opening hours`,
    facilities: [`${TODO} facilities`],
    images: img("Nature", "Wang Kelian State Park"),
    nearby: ["gua-kelam", "wang-kelian-sunday-market"],
  },
  {
    id: "wang-kelian-sunday-market",
    name: "Wang Kelian Sunday Market",
    category: "Shopping & Border Town",
    tags: ["market", "border", "shopping"],
    featured: false,
    summary: "The Wang Kelian market area, known as a market stop near the border.",
    description:
      "The Wang Kelian market area is a market destination near the Wang Kelian border area.\n\n" +
      "TODO: verify current operating days, status, border-access rules and what is sold before publishing details. Check official sources; arrangements here have changed over time.",
    highlights: [`${TODO} what is sold`, `${TODO} current status`],
    location: { area: "Wang Kelian", lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO}`,
    hours: `${TODO} market days and hours`,
    facilities: [`${TODO} facilities`],
    images: img("Shopping & Border Town", "Wang Kelian Sunday Market"),
    nearby: ["wang-kelian-state-park"],
  },
  {
    id: "tasik-melati",
    name: "Tasik Melati",
    category: "Family & Recreation",
    tags: ["lake", "recreation", "family", "outdoors"],
    featured: true,
    summary: "A lake destination for a relaxed outdoor outing.",
    description:
      "Tasik Melati is a lake attraction in Perlis.\n\n" +
      "TODO: verify exact location, activities, facilities and visiting conditions.",
    highlights: [`${TODO} activities`, `${TODO} scenic spots`],
    location: { area: `${TODO} area`, lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO} fee`,
    hours: `${TODO} opening hours`,
    facilities: [`${TODO} facilities`],
    images: img("Family & Recreation", "Tasik Melati"),
    nearby: [],
  },
  {
    id: "kota-kayang-museum",
    name: "Kota Kayang Museum & Heritage Area",
    category: "Heritage & Culture",
    tags: ["museum", "heritage", "history", "culture"],
    featured: true,
    summary: "A museum and heritage area at Kayang, near Kangar.",
    description:
      "Kota Kayang Museum and the surrounding Kangar/Kayang heritage area are a place to learn about local history and culture.\n\n" +
      "TODO: verify what the museum displays, its history, and the surrounding heritage sites before adding more detail.",
    highlights: ["Museum and heritage area", `${TODO} exhibits`],
    location: { area: "Kayang, Kangar", lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO} fee`,
    hours: `${TODO} opening hours`,
    facilities: [`${TODO} facilities`],
    images: img("Heritage & Culture", "Kota Kayang Museum"),
    nearby: ["masjid-alwi"],
  },
  {
    id: "masjid-alwi",
    name: "Masjid Alwi",
    category: "Heritage & Culture",
    tags: ["mosque", "architecture", "heritage"],
    featured: false,
    summary: "A mosque in Kangar, relevant for visitors interested in local architecture and heritage.",
    description:
      "Masjid Alwi is a mosque in Kangar.\n\n" +
      "TODO: verify its history, architecture and the rules and times for non-Muslim visitors. Dress modestly and respect prayer times when visiting any place of worship.",
    highlights: ["Place of worship in Kangar", `${TODO} architecture and history`],
    location: { area: "Kangar", lat: null, lng: null },
    bestTime: `${TODO} (avoid prayer times)`,
    fee: `${TODO}`,
    hours: `${TODO} visiting hours`,
    facilities: [`${TODO} facilities`],
    images: img("Heritage & Culture", "Masjid Alwi"),
    nearby: ["kota-kayang-museum"],
  },
  {
    id: "padang-besar",
    name: "Padang Besar",
    category: "Shopping & Border Town",
    tags: ["border", "shopping", "train", "Thailand"],
    featured: true,
    summary: "A border town with Thailand, known for shopping and as a rail and road crossing point.",
    description:
      "Padang Besar is a border town in Perlis on the Malaysia–Thailand border, popular for shopping.\n\n" +
      "TODO: verify train services, border-crossing requirements, shopping areas and opening hours.",
    highlights: ["Border town with Thailand", "Shopping", `${TODO} rail connections`],
    location: { area: "Padang Besar", lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO} fee (if any)`,
    hours: `${TODO} shop and market hours`,
    facilities: [`${TODO} facilities`],
    images: img("Shopping & Border Town", "Padang Besar"),
    nearby: [],
  },
  {
    id: "kuala-perlis",
    name: "Kuala Perlis",
    category: "Food & Local Products",
    tags: ["jetty", "seafood", "ferry", "Langkawi"],
    featured: true,
    summary: "A jetty town known for seafood and the ferry link to Langkawi.",
    description:
      "Kuala Perlis is a coastal town with a jetty, seafood eateries and the ferry to Langkawi.\n\n" +
      "TODO: verify ferry operators, schedules, ticket prices and recommended seafood eateries. Check official operators for current times.",
    highlights: ["Jetty and waterfront", "Seafood", "Ferry to Langkawi (TODO: verify schedule)"],
    location: { area: "Kuala Perlis", lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO} (ferry fares and eatery prices vary)`,
    hours: `${TODO} ferry and eatery hours`,
    facilities: [`${TODO} facilities`],
    images: img("Food & Local Products", "Kuala Perlis"),
    nearby: [],
  },
  {
    id: "harumanis-orchards",
    name: "Harumanis Mango Orchards & Local Produce",
    category: "Food & Local Products",
    tags: ["mango", "harumanis", "seasonal", "produce"],
    featured: false,
    summary: "Seasonal local produce, including Perlis's Harumanis mango.",
    description:
      "Harumanis mango is a local product associated with Perlis, and is a seasonal highlight.\n\n" +
      "TODO: verify the harvest season, which orchards welcome visitors and how to buy genuine fruit.",
    highlights: ["Seasonal produce", `${TODO} season dates`, `${TODO} visitor-friendly orchards`],
    location: { area: `${TODO} area`, lat: null, lng: null },
    bestTime: `${TODO} (seasonal)`,
    fee: `${TODO}`,
    hours: `${TODO}`,
    facilities: [`${TODO} facilities`],
    images: img("Food & Local Products", "Harumanis orchards"),
    nearby: [],
  },
  {
    id: "bukit-ketri-chabang",
    name: "Bukit Ketri & Bukit Chabang Viewpoints",
    category: "Nature",
    tags: ["viewpoint", "hill", "sunrise", "hiking"],
    featured: false,
    summary: "Hill viewpoints in Perlis. Check access before you go.",
    description:
      "Bukit Ketri and Bukit Chabang are hill viewpoints in Perlis.\n\n" +
      "TODO: verify whether each is currently accessible to visitors, trail difficulty, safety advice and best viewing times before publishing.",
    highlights: [`${TODO} viewpoints and trails`],
    location: { area: `${TODO} area`, lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO}`,
    hours: `${TODO}`,
    facilities: [`${TODO} facilities`],
    images: img("Nature", "Bukit Ketri and Bukit Chabang"),
    nearby: [],
  },
  {
    id: "perlis-laksa-eateries",
    name: "Local Food Stops: Perlis Laksa & More",
    category: "Food & Local Products",
    tags: ["laksa", "food", "local", "eateries"],
    featured: false,
    summary: "Local dishes such as Perlis laksa, found at eateries around Arau and Kangar.",
    description:
      "Perlis has local dishes worth trying, including Perlis laksa, at eateries in towns such as Arau and Kangar.\n\n" +
      "TODO: verify which eateries to recommend, their addresses, halal status and opening hours. No specific restaurant is endorsed yet.",
    highlights: ["Perlis laksa", `${TODO} recommended eateries`],
    location: { area: "Arau / Kangar", lat: null, lng: null },
    bestTime: `${TODO}`,
    fee: `${TODO} prices vary by eatery`,
    hours: `${TODO} per eatery`,
    facilities: [`${TODO}`],
    images: img("Food & Local Products", "local food stops"),
    nearby: [],
  },
];

export const bySlug = (id) => attractions.find((a) => a.id === id);

/** True for placeholder values that still need verification. */
export const isTodo = (v) => typeof v === "string" && v.includes("TODO");
