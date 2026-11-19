// Shared rendering helpers (cards, escaping, TODO display).
import { isTodo } from "../data/attractions.js";
import { inTrip, toggleTrip } from "./storage.js";

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/** Strip "TODO: verify" noise for display; unknown values show as "To be confirmed". */
export function show(value) {
  return isTodo(value) ? '<span class="badge badge--todo">To be confirmed</span>' : esc(value);
}

/** Visible area text: hide TODO text from cards. */
export const areaText = (a) => (isTodo(a.location.area) ? "Perlis" : a.location.area);

export function cardHTML(a, { headingLevel = 3 } = {}) {
  const img = a.images[0];
  const h = `h${headingLevel}`;
  const saved = inTrip(a.id);
  return `
  <li>
    <article class="card reveal" data-id="${esc(a.id)}">
      <div class="card__media">
        <img src="${esc(img.src)}" alt="${esc(img.alt)}" width="${img.width || 1200}" height="${img.height || 800}" loading="lazy" decoding="async">
      </div>
      <div class="card__body">
        <span class="badge">${esc(a.category)}</span>
        <${h} class="card__title"><a href="attraction.html?id=${encodeURIComponent(a.id)}">${esc(a.name)}</a></${h}>
        <p class="card__loc"><span aria-hidden="true">📍</span> <span class="visually-hidden">Location: </span>${esc(areaText(a))}</p>
        <p class="card__summary">${esc(a.summary)}</p>
        <div class="card__actions">${tripButtonHTML(a, saved)}</div>
      </div>
    </article>
  </li>`;
}

export function tripButtonHTML(a, saved = inTrip(a.id)) {
  return `<button type="button" class="trip-btn" data-trip="${esc(a.id)}" aria-pressed="${saved}" aria-label="Add ${esc(a.name)} to trip">
    <span aria-hidden="true" data-trip-icon>${saved ? "♥" : "♡"}</span> <span data-trip-label>${saved ? "In my trip" : "Add to trip"}</span>
  </button>`;
}

/** Sync every trip button in the DOM with storage. */
export function syncTripButtons(root = document) {
  root.querySelectorAll("[data-trip]").forEach((btn) => {
    const saved = inTrip(btn.dataset.trip);
    btn.setAttribute("aria-pressed", String(saved));
    btn.querySelector("[data-trip-icon]").textContent = saved ? "♥" : "♡";
    btn.querySelector("[data-trip-label]").textContent = saved ? "In my trip" : "Add to trip";
  });
}

/** Delegated handler for all "Add to trip" buttons on a page. */
export function bindTripButtons(root = document) {
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-trip]");
    if (!btn) return;
    toggleTrip(btn.dataset.trip);
    syncTripButtons(document);
  });
}

export function mapsUrl(a) {
  const { lat, lng } = a.location;
  if (typeof lat === "number" && typeof lng === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.name + ", Perlis, Malaysia")}`;
}
