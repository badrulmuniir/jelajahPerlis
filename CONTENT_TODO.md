# Content TODO

Nothing below has been verified. The site shows these values as "To be confirmed" and does not present them as fact.
Resolve each item against official sources (Perlis tourism / state park authorities, operators), then edit `data/attractions.js` and tick it off.

## Applies to every attraction in `data/attractions.js`
- [ ] `location.lat` / `location.lng`: all `null`. Until filled, the Google Maps link falls back to a text search for the name plus "Perlis", and "Nearby" uses the listed ids only.
- [ ] `fee`, `hours`, `bestTime`, `facilities`: all `TODO: verify`.
- [ ] `images`: all generic placeholders (`images/placeholder-*.svg`). Replace with real photos and record sources and licences in `CREDITS.md`.
- [ ] Descriptions and highlights: minimal on purpose. Expand only with sourced facts.
- [ ] `nearby` links: editorial and unverified, except Gua Kelam ↔ Wang Kelian State Park, which the PRD suggested. Recompute once coordinates exist.

## Per attraction
- **Gua Kelam**: history, walkway length, accessibility, whether it suits families.
- **Wang Kelian State Park**: boundaries, trails, permits, wildlife, closures.
- **Wang Kelian Sunday Market**: whether it currently operates, days and hours, border-access rules, what is sold.
- **Tasik Melati**: exact location/area, category suitability, activities.
- **Kota Kayang Museum & Heritage Area**: exhibits, history, surrounding sites, hours.
- **Masjid Alwi**: history, architecture, visitor rules and times for non-Muslims.
- **Padang Besar**: rail services, border-crossing requirements, shopping areas, hours.
- **Kuala Perlis**: ferry operators, schedules and fares to Langkawi; recommended seafood eateries.
- **Harumanis orchards**: harvest season, visitor-friendly orchards, how to buy genuine fruit, area.
- **Bukit Ketri / Bukit Chabang**: whether accessible, trail difficulty, safety, best time.
- **Local food stops**: which eateries to recommend, addresses, halal status, hours.

## Itineraries (`data/itineraries.js`)
- [ ] Verify order, timing and feasibility of all three plans; no travel times are claimed yet.

## Site-wide copy
- [ ] Quick-facts strip on the home page (smallest state in Malaysia, border with Thailand, ferry to Langkawi): widely known, but confirm against an official source before launch.
- [ ] Practical info on `plan.html` (getting there by road, KTM/ETS to Arau/Padang Besar, ferry; local tips; etiquette; best seasons): to be written and verified in phase 6.
- [ ] About page statements about Perlis: verify in phase 7.
- [ ] Contact details: no real email or address is published; the form is front-end only.
- [ ] Canonical site URL for `sitemap.xml`, `robots.txt` and Open Graph tags: set once the deploy URL is known (phase 8).
