// Suggested itineraries. Stops reference attraction ids in data/attractions.js.
// Timings are broad day-parts only; no travel times or distances are claimed.
// TODO: verify the order and feasibility of each plan against real opening hours and travel times.

export const itineraries = [
  {
    id: "nature-day",
    title: "1 Day: Nature",
    duration: "1 day",
    summary: "Caves, a state park and a viewpoint, if access is open.",
    stops: [
      { when: "Morning", id: "gua-kelam", note: "Start with the cave visit. TODO: verify timing needed." },
      { when: "Midday", id: "wang-kelian-state-park", note: "Explore the park. TODO: verify which trails are open." },
      { when: "Afternoon", id: "bukit-ketri-chabang", note: "Viewpoint, only if access is confirmed. TODO: verify." },
    ],
  },
  {
    id: "heritage-food-day",
    title: "1 Day: Heritage & Food",
    duration: "1 day",
    summary: "Museum and mosque in the Kangar area, then local food and the waterfront.",
    stops: [
      { when: "Morning", id: "kota-kayang-museum", note: "Museum and heritage area. TODO: verify opening hours." },
      { when: "Late morning", id: "masjid-alwi", note: "Respect prayer times and dress modestly. TODO: verify visiting rules." },
      { when: "Lunch", id: "perlis-laksa-eateries", note: "Try Perlis laksa. TODO: choose verified eateries." },
      { when: "Afternoon", id: "kuala-perlis", note: "Jetty and seafood. TODO: verify eateries." },
    ],
  },
  {
    id: "weekend",
    title: "2-Day Weekend Trip",
    duration: "2 days",
    summary: "A relaxed weekend mixing nature, border-town shopping, family time and seafood.",
    stops: [
      { when: "Day 1 morning", id: "gua-kelam", note: "TODO: verify timing." },
      { when: "Day 1 afternoon", id: "wang-kelian-state-park", note: "TODO: verify access." },
      { when: "Day 1 late afternoon", id: "wang-kelian-sunday-market", note: "TODO: verify market days; plan this only if it is open." },
      { when: "Day 2 morning", id: "tasik-melati", note: "Relaxed lakeside time. TODO: verify." },
      { when: "Day 2 afternoon", id: "padang-besar", note: "Border-town shopping. TODO: verify border and shop rules." },
      { when: "Day 2 evening", id: "kuala-perlis", note: "Seafood by the jetty. TODO: verify." },
    ],
  },
];
