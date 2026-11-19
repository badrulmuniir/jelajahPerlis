import { attractions, bySlug, isTodo } from "../data/attractions.js";
import { esc, show, areaText, mapsUrl, tripButtonHTML, bindTripButtons } from "./ui.js";
import "./main.js";

const root = document.getElementById("detail");
const id = new URLSearchParams(location.search).get("id");
const a = id ? bySlug(id) : null;

if (!a) renderNotFound();
else render(a);

function renderNotFound() {
  document.title = "Attraction not found | Jelajah Perlis";
  const robots = document.createElement("meta");
  robots.name = "robots";
  robots.content = "noindex";
  document.head.append(robots);
  root.innerHTML = `
    <section class="section not-found">
      <h1>We couldn't find that attraction</h1>
      <p>The link may be mistyped or the place may have been removed.</p>
      <p><a class="btn btn--primary" href="attractions.html">Browse all attractions</a></p>
    </section>`;
}

function hasCoords(x) {
  return typeof x.location.lat === "number" && typeof x.location.lng === "number";
}

function distanceKm(p, q) {
  const r = Math.PI / 180;
  const dLat = (q.location.lat - p.location.lat) * r;
  const dLng = (q.location.lng - p.location.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(p.location.lat * r) * Math.cos(q.location.lat * r) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

function nearbyOf(x) {
  const ids = new Set(x.nearby);
  if (hasCoords(x)) {
    attractions
      .filter((o) => o.id !== x.id && hasCoords(o))
      .map((o) => ({ o, d: distanceKm(x, o) }))
      .sort((m, n) => m.d - n.d)
      .slice(0, 3)
      .forEach(({ o }) => ids.add(o.id));
  }
  return [...ids].map(bySlug).filter(Boolean);
}

function listOrTodo(items) {
  const real = items.filter((i) => !isTodo(i));
  const hasTodo = items.some(isTodo);
  return (real.length ? `<ul>${real.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "") +
    (hasTodo ? `<p>${show("TODO")}</p>` : "");
}

function render(a) {
  const i = attractions.indexOf(a);
  const prev = attractions[(i - 1 + attractions.length) % attractions.length];
  const next = attractions[(i + 1) % attractions.length];
  const near = nearbyOf(a);
  const imgs = a.images;

  document.title = `${a.name} | Jelajah Perlis`;
  setMeta("description", a.summary);
  setMeta("og:title", `${a.name} | Jelajah Perlis`, true);
  setMeta("og:description", a.summary, true);
  setMeta("og:image", imgs[0].src, true);

  const paras = a.description.split("\n\n").map(paragraphHTML).join("");
  const highlights = a.highlights.filter((h) => !isTodo(h));

  root.innerHTML = `
  <nav class="breadcrumb" aria-label="Breadcrumb"><a href="attractions.html">Attractions</a> <span aria-hidden="true">/</span> <span aria-current="page">${esc(a.name)}</span></nav>
  <article class="detail">
    <header class="detail__head">
      <span class="badge">${esc(a.category)}</span>
      <h1>${esc(a.name)}</h1>
      <p class="detail__loc"><span aria-hidden="true">📍</span> ${esc(areaText(a))}</p>
      <div class="detail__actions">${tripButtonHTML(a)}<a class="btn btn--ghost btn--sm" href="plan.html">View my trip</a></div>
    </header>

    <div class="detail__grid">
      <section aria-label="Photos" class="gallery">
        <button type="button" class="gallery__main" data-open="0" aria-label="Open larger photo: ${esc(imgs[0].alt)}">
          <img id="main-img" src="${esc(imgs[0].src)}" alt="${esc(imgs[0].alt)}" width="${imgs[0].width || 1200}" height="${imgs[0].height || 800}">
        </button>
        ${imgs.length > 1 ? `<ul class="gallery__thumbs">${imgs.map((m, n) => `<li><button type="button" class="gallery__thumb" data-thumb="${n}" aria-label="Show photo ${n + 1} of ${imgs.length}" aria-pressed="${n === 0}"><img src="${esc(m.src)}" alt="" width="120" height="80" loading="lazy"></button></li>`).join("")}</ul>` : ""}
      </section>

      <div class="detail__text">
        <section aria-labelledby="about-h"><h2 id="about-h">About</h2>${paras}</section>
        ${highlights.length ? `<section aria-labelledby="hl-h"><h2 id="hl-h">Highlights</h2><ul>${highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></section>` : ""}
      </div>

      <aside class="info" aria-labelledby="info-h">
        <h2 id="info-h">Visitor information</h2>
        <dl>
          <dt>Best time to visit</dt><dd>${show(a.bestTime)}</dd>
          <dt>Entrance fee</dt><dd>${show(a.fee)}</dd>
          <dt>Opening hours</dt><dd>${show(a.hours)}</dd>
          <dt>Facilities</dt><dd>${listOrTodo(a.facilities)}</dd>
        </dl>
        <h3>Location</h3>
        <p>${esc(areaText(a))}, Perlis${hasCoords(a) ? "" : `<br><small>Exact coordinates ${show("TODO")}</small>`}</p>
        <a class="btn btn--primary btn--sm" href="${esc(mapsUrl(a))}" target="_blank" rel="noopener noreferrer">Open in Google Maps<span class="visually-hidden"> (opens in new tab)</span></a>
        <p class="info__note"><small>Always confirm fees, hours and access with official sources before you travel.</small></p>
      </aside>
    </div>

    ${near.length ? `<section class="nearby" aria-labelledby="near-h"><h2 id="near-h">Nearby attractions</h2><ul class="nearby__list">${near.map((n) => `<li><a href="attraction.html?id=${encodeURIComponent(n.id)}">${esc(n.name)}</a> <span class="badge">${esc(n.category)}</span></li>`).join("")}</ul></section>` : ""}

    <nav class="pager" aria-label="More attractions">
      <a href="attraction.html?id=${encodeURIComponent(prev.id)}" rel="prev"><span aria-hidden="true">←</span> <span><small>Previous</small><br>${esc(prev.name)}</span></a>
      <a href="attraction.html?id=${encodeURIComponent(next.id)}" rel="next"><span><small>Next</small><br>${esc(next.name)}</span> <span aria-hidden="true">→</span></a>
    </nav>
  </article>

  <dialog class="lightbox" id="lightbox" aria-label="Photo viewer">
    <form method="dialog"><button class="lightbox__close" aria-label="Close photo viewer">✕</button></form>
    <img id="lightbox-img" src="" alt="">
    <p id="lightbox-cap" class="lightbox__cap"></p>
    ${imgs.length > 1 ? `<div class="lightbox__nav"><button type="button" id="lb-prev" aria-label="Previous photo">←</button><button type="button" id="lb-next" aria-label="Next photo">→</button></div>` : ""}
  </dialog>`;

  injectJsonLd(a);
  bindTripButtons(root);
  initGallery(imgs);
}

// Hide "TODO" sentences from visitors; flag the paragraph as still being verified.
function paragraphHTML(p) {
  const sentences = p.split(/(?<=[.!?])\s+/);
  const kept = sentences.filter((x) => !isTodo(x));
  const flagged = kept.length < sentences.length;
  const text = kept.join(" ");
  return (text ? `<p>${esc(text)}</p>` : "") +
    (flagged ? `<p>${show("TODO")} <small>More details are still being verified.</small></p>` : "");
}

function initGallery(imgs) {
  const dlg = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-cap");
  const mainImg = document.getElementById("main-img");
  let idx = 0;

  const showAt = (n) => {
    idx = (n + imgs.length) % imgs.length;
    mainImg.src = imgs[idx].src;
    mainImg.alt = imgs[idx].alt;
    lbImg.src = imgs[idx].src;
    lbImg.alt = imgs[idx].alt;
    cap.textContent = imgs[idx].alt;
    document.querySelectorAll("[data-thumb]").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.thumb === idx)));
  };
  showAt(0);

  document.querySelectorAll("[data-thumb]").forEach((b) => b.addEventListener("click", () => showAt(+b.dataset.thumb)));
  const opener = document.querySelector("[data-open]");
  opener.addEventListener("click", () => { showAt(idx); dlg.showModal(); });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => opener.focus());
  document.getElementById("lb-prev")?.addEventListener("click", () => showAt(idx - 1));
  document.getElementById("lb-next")?.addEventListener("click", () => showAt(idx + 1));
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") showAt(idx - 1);
    if (e.key === "ArrowRight") showAt(idx + 1);
  });
}

function setMeta(name, content, property = false) {
  let el = document.head.querySelector(`meta[${property ? "property" : "name"}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(property ? "property" : "name", name);
    document.head.append(el);
  }
  el.content = content;
}

function injectJsonLd(a) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: a.name,
    description: a.summary,
    image: new URL(a.images[0].src, location.href).href,
    url: location.href,
    address: { "@type": "PostalAddress", addressRegion: "Perlis", addressCountry: "MY" },
  };
  if (!isTodo(a.location.area)) data.address.addressLocality = a.location.area;
  if (hasCoords(a)) data.geo = { "@type": "GeoCoordinates", latitude: a.location.lat, longitude: a.location.lng };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(data);
  document.head.append(s);
}
