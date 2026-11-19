import { bySlug } from "../data/attractions.js";
import { itineraries } from "../data/itineraries.js";
import { getTrip, removeFromTrip, clearTrip, onTripChange } from "./storage.js";
import { esc, areaText } from "./ui.js";
import { initReveal } from "./main.js";

const list = document.getElementById("short-list");
const empty = document.getElementById("short-empty");
const clearBtn = document.getElementById("clear-btn");
const status = document.getElementById("short-status");

function renderShortlist(message) {
  const items = getTrip().map(bySlug).filter(Boolean);
  empty.hidden = items.length > 0;
  clearBtn.hidden = items.length === 0;
  list.innerHTML = items
    .map((a) => `
    <li class="short-item">
      <img src="${esc(a.images[0].src)}" alt="" width="96" height="64" loading="lazy">
      <div class="short-item__text">
        <a class="short-item__name" href="attraction.html?id=${encodeURIComponent(a.id)}">${esc(a.name)}</a>
        <span class="short-item__meta">${esc(a.category)} · ${esc(areaText(a))}</span>
      </div>
      <button type="button" class="btn btn--ghost btn--sm no-print" data-remove="${esc(a.id)}" aria-label="Remove ${esc(a.name)} from shortlist">Remove</button>
    </li>`)
    .join("");
  if (message) status.textContent = message;
}

list.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove]");
  if (!btn) return;
  const a = bySlug(btn.dataset.remove);
  removeFromTrip(btn.dataset.remove);
  renderShortlist(`${a?.name ?? "Attraction"} removed from shortlist.`);
  const next = list.querySelector("[data-remove]");
  if (next) next.focus();
  else {
    const h = document.getElementById("short-h");
    h.setAttribute("tabindex", "-1");
    h.focus();
  }
});

clearBtn.addEventListener("click", () => {
  if (!confirm("Remove all places from your shortlist?")) return;
  clearTrip();
  renderShortlist("Shortlist cleared.");
  const h = document.getElementById("short-h");
  h.setAttribute("tabindex", "-1");
  h.focus();
});

document.getElementById("print-btn").addEventListener("click", () => window.print());
onTripChange(() => renderShortlist());
// Pick up changes made in another tab.
window.addEventListener("storage", () => renderShortlist());

function renderItineraries() {
  document.getElementById("itineraries").innerHTML = itineraries
    .map((it) => `
    <article class="iti reveal" aria-labelledby="iti-${esc(it.id)}">
      <h3 id="iti-${esc(it.id)}">${esc(it.title)}</h3>
      <p class="iti__summary">${esc(it.summary)}</p>
      <ol class="timeline">
        ${it.stops
          .map((s) => {
            const a = bySlug(s.id);
            if (!a) return "";
            const note = s.note.replace(/\s*TODO:[^.]*\.?/g, "").trim();
            return `<li class="timeline__item">
              <span class="timeline__time">${esc(s.when)}</span>
              <h4 class="timeline__title"><a href="attraction.html?id=${encodeURIComponent(a.id)}">${esc(a.name)}</a></h4>
              ${note ? `<p>${esc(note)}</p>` : ""}
            </li>`;
          })
          .join("")}
      </ol>
    </article>`)
    .join("");
}

renderShortlist();
renderItineraries();
initReveal();
