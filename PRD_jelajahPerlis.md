# PRD: Jelajah Perlis — Tourism Website

**Stack:** HTML5, CSS3, vanilla JavaScript (no frameworks, no build step)
**Type:** Static, responsive, multi-page tourism website
**Owner:** Badrul Munir | **Status:** Ready for implementation in Claude Code

---

## 1. Overview

Jelajah Perlis ("Explore Perlis") is a responsive tourism website that presents the attractions and destinations of Perlis, Malaysia. Content is structured so visitors can browse attractions, filter them by interest, and plan a visit without leaving the site.

### Goals
- Showcase Perlis attractions clearly with photos, descriptions and practical info.
- Let visitors browse, filter and search attractions quickly.
- Help visitors plan: shortlist places, see map links, view suggested itineraries.
- Work well on mobile (most tourists browse on phones).
- Demonstrate clean, semantic, accessible front-end craft (portfolio/resume piece).

### Non-goals
- No backend, user accounts, bookings or payments.
- No frameworks (React, etc.) or bundlers. Plain HTML/CSS/JS only.
- No CMS. Content lives in a single JSON/JS data file.

### Target users
- Domestic tourists (Malaysians planning weekend trips, e.g. from Kedah, Penang, KL).
- International visitors passing through Padang Besar or Kuala Perlis (Langkawi ferry).
- Students and families looking for day-trip ideas.

---

## 2. Technical constraints

- Vanilla HTML/CSS/JS; ES modules allowed (use a simple local server for dev, e.g. `npx serve` or `python -m http.server`).
- Mobile-first CSS using custom properties, Flexbox and Grid; no CSS framework.
- Attraction content stored in `data/attractions.js` (exported array) and rendered by JS, so adding a place means editing one file.
- Must work when deployed to GitHub Pages / Netlify (relative paths only).
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- Support latest 2 versions of Chrome, Safari, Firefox, Edge.

---

## 3. Information architecture

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, featured attractions, categories, CTA to plan a trip |
| Attractions | `attractions.html` | Browse, search, filter all attractions |
| Attraction detail | `attraction.html?id=<slug>` | One template rendered from data by query param |
| Plan your visit | `plan.html` | Shortlist, suggested itineraries, practical info |
| About / Contact | `about.html` | About Perlis, project info, contact/feedback form (front-end only) |

Shared: header with nav, footer, 404 page (`404.html`).

---

## 4. Functional requirements

### 4.1 Home page
- Full-width hero with headline, short tagline and primary CTA "Explore Attractions".
- "Featured destinations" grid (3–6 cards, pulled from data where `featured: true`).
- "Browse by category" tiles linking to `attractions.html?category=<name>`.
- "Plan your trip" teaser section linking to `plan.html`.
- Quick facts strip (e.g. smallest state in Malaysia, border with Thailand, ferry to Langkawi) — verify all facts before publishing.

### 4.2 Attractions listing
- Responsive card grid: image, name, category badge, short description, location.
- **Search:** live text filter on name/description/tags.
- **Filter:** by category (Nature, Heritage & Culture, Food & Local Products, Family & Recreation, Shopping & Border Town); multiple selection allowed.
- **Sort:** A–Z, and "Featured first".
- Filters reflected in URL query string so results are shareable; empty-state message when nothing matches.
- Each card has "Add to trip" (heart/bookmark) toggle and links to the detail page.

### 4.3 Attraction detail page
- Gallery (main image + thumbnails; keyboard-accessible lightbox).
- Description, highlights, best time to visit, entrance fee (if any), opening hours, facilities.
- Location block with address and "Open in Google Maps" link (use a plain maps URL by coordinates; no API key required).
- "Nearby attractions" (computed from coordinates or listed ids).
- Prev/next navigation and "Add to trip" button.

### 4.4 Plan your visit
- **My shortlist:** lists attractions added via "Add to trip", persisted in `localStorage`; remove and clear actions.
- **Suggested itineraries:** at least 3 preset plans (e.g. 1-day nature, 1-day heritage & food, 2-day weekend), each a timeline of stops linking to detail pages.
- **Practical info:** how to get there (road, KTM/ETS to Arau/Padang Besar, ferry from Kuala Perlis), local tips, safety/etiquette, best seasons — verify all details.
- Print-friendly stylesheet for the shortlist/itinerary (`@media print`).

### 4.5 About / Contact
- About Perlis and about the project.
- Contact/feedback form with client-side validation only (name, email, message); show a success message without sending data anywhere (or use `mailto:` fallback).

### 4.6 Global
- Sticky responsive navigation with hamburger menu on small screens (accessible: button, `aria-expanded`, focus trap not required, Esc closes).
- Light theme by default; optional dark-mode toggle persisted in `localStorage` (nice-to-have).
- Optional language toggle EN / BM for nav and key labels (stretch goal; structure data with `name`, `description` fields so a `bm` variant can be added later).
- Lazy-loaded images with explicit width/height to avoid layout shift.

---

## 5. Content / data model

`data/attractions.js`:

```js
export const attractions = [
  {
    id: "gua-kelam",            // slug, unique
    name: "Gua Kelam",
    category: "Nature",         // one of the defined categories
    tags: ["cave", "tin mining", "family"],
    featured: true,
    summary: "One or two sentence card description.",
    description: "Full description (2–3 paragraphs).",
    highlights: ["...", "..."],
    location: { area: "Kaki Bukit", lat: 6.6, lng: 100.2 }, // verify coordinates
    bestTime: "Morning, dry season",
    fee: "Check official source",
    hours: "Check official source",
    facilities: ["Parking", "Toilets"],
    images: [{ src: "images/gua-kelam-1.jpg", alt: "Descriptive alt text" }],
    nearby: ["wang-kelian"]
  }
];
```

### Seed attractions (verify every fact against official sources before publishing)
Include roughly 10–12 entries, for example:
- Gua Kelam (Kaki Bukit)
- Wang Kelian State Park / Perlis State Park
- Wang Kelian Sunday Market area
- Tasik Melati
- Kota Kayang Museum and the Kangar/Kayang heritage area
- Masjid Alwi (Kangar)
- Padang Besar (border town and shopping)
- Kuala Perlis (jetty, seafood, ferry to Langkawi)
- Harumanis mango orchards / local produce (seasonal)
- Bukit Ketri / Bukit Chabang viewpoints (confirm accessibility)
- Local food stops (e.g. Perlis laksa, Arau/Kangar eateries)

**Rule for Claude Code:** do not invent fees, opening hours, coordinates or historical claims. Use clearly marked `TODO: verify` placeholders where a fact is unknown, and list them in a `CONTENT_TODO.md`. Use placeholder images (or royalty-free images with attribution recorded in `CREDITS.md`).

---

## 6. UX and design requirements

- Mobile-first breakpoints: ~480, 768, 1024, 1280px.
- Visual identity: fresh, nature-inspired palette (greens, warm limestone/sand neutrals, a sunset accent); define as CSS variables in `:root`.
- Typography: one display + one body font (Google Fonts with `font-display: swap`, or system fallback stack).
- Consistent components: button, card, badge, chip filter, section header, timeline.
- Subtle motion only (hover lifts, fade-in on scroll via `IntersectionObserver`); respect `prefers-reduced-motion`.
- Touch targets ≥ 44px; readable contrast (WCAG AA).

## 7. Accessibility, performance, SEO

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page, logical heading order.
- Skip-to-content link; visible focus styles; full keyboard operability including filters, gallery and menu.
- Meaningful `alt` text; `aria-live` region announcing filter result counts.
- Images: modern formats (WebP/AVIF with fallback if feasible), responsive `srcset`, lazy loading.
- Minify-friendly code; no render-blocking scripts (`defer`/`type="module"`).
- SEO: unique `<title>` and meta description per page, Open Graph tags, `sitemap.xml`, `robots.txt`, JSON-LD (`TouristAttraction`) on detail pages.

---

## 8. Suggested project structure

```
jelajah-perlis/
├── index.html
├── attractions.html
├── attraction.html
├── plan.html
├── about.html
├── 404.html
├── css/
│   ├── base.css        # reset, variables, typography
│   ├── components.css  # buttons, cards, nav, badges
│   └── pages.css       # page-specific styles + print
├── js/
│   ├── main.js         # nav, theme, shared init
│   ├── attractions.js  # listing: search/filter/sort
│   ├── detail.js       # detail page rendering
│   ├── plan.js         # shortlist + itineraries
│   └── storage.js      # localStorage helpers
├── data/
│   ├── attractions.js
│   └── itineraries.js
├── images/
├── CREDITS.md
├── CONTENT_TODO.md
└── README.md
```

---

## 9. Implementation plan (for Claude Code)

Work in phases; commit after each, and run the site locally to verify before moving on.

1. **Scaffold:** folder structure, shared header/footer (inject via JS include or duplicate in HTML), CSS variables, base styles.
2. **Data:** create `attractions.js` and `itineraries.js` with seed content and TODO markers.
3. **Home page:** hero, featured grid, category tiles, teaser.
4. **Listing page:** render cards from data, search, category filter, sort, URL sync, empty state.
5. **Detail page:** render from `?id=`, gallery/lightbox, map link, nearby, JSON-LD, handle unknown id (redirect/404 message).
6. **Plan page:** shortlist with `localStorage`, itineraries, practical info, print styles.
7. **About/Contact:** content and validated form.
8. **Polish:** responsive QA, accessibility pass, reduced motion, dark mode (optional), SEO files.
9. **Verify:** Lighthouse, keyboard-only walkthrough, test at 360px / 768px / 1280px, check broken links, `README.md` with setup and deploy steps (GitHub Pages).

## 10. Acceptance criteria

- All five pages render correctly and are navigable on 360px–1440px widths with no horizontal scroll.
- Search and category filters work together, update the URL, and show an empty state.
- Every attraction has a working detail page; unknown ids show a friendly message.
- "Add to trip" persists across reloads and appears on the Plan page.
- Entire site is operable by keyboard; passes automated accessibility checks (axe/Lighthouse ≥ 95).
- No console errors; no external dependency required to run besides optional fonts.
- No unverified facts presented as confirmed; all placeholders listed in `CONTENT_TODO.md`.
- Deployed link works on GitHub Pages with relative paths.

## 11. Stretch goals

- BM/EN language toggle.
- Interactive map (Leaflet + OpenStreetMap) of all attractions.
- Seasonal highlights (e.g. Harumanis season) and events calendar.
- PWA basics (manifest, offline cache of visited pages).
- Visitor reviews/tips stored locally (no backend).

## 12. Resume summary

> **Jelajah Perlis: Tourism Website** | HTML, CSS, JavaScript
> Built a responsive tourism website presenting attractions and destinations in Perlis. Structured content so visitors can browse attractions and plan visits.

---

## Kickoff prompt to paste into Claude Code

```
Read PRD.md and build the Jelajah Perlis website in the current folder following section 9's phases. Use only vanilla HTML/CSS/JS. Do not invent facts (fees, hours, coordinates): use TODO markers and record them in CONTENT_TODO.md. Start with phase 1 and 2, run it locally, then continue phase by phase, committing after each one.
```
