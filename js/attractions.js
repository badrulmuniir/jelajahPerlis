import { attractions, categories } from "../data/attractions.js";
import { cardHTML, bindTripButtons, esc } from "./ui.js";
import { initReveal } from "./main.js";

const $ = (id) => document.getElementById(id);
const qInput = $("q");
const sortSel = $("sort");
const chips = $("chips");

// ---- state <-> URL ----
function readURL() {
  const p = new URLSearchParams(location.search);
  const valid = new Set(categories.map((c) => c.name));
  return {
    q: p.get("q") || "",
    sort: p.get("sort") === "az" ? "az" : "featured",
    cats: new Set(p.getAll("category").filter((c) => valid.has(c))),
  };
}
let state = readURL();

function writeURL() {
  const p = new URLSearchParams();
  if (state.q) p.set("q", state.q);
  if (state.sort !== "featured") p.set("sort", state.sort);
  state.cats.forEach((c) => p.append("category", c));
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

// ---- chips ----
chips.innerHTML = categories
  .map((c) => `<button type="button" class="chip" aria-pressed="false" data-cat="${esc(c.name)}">${esc(c.name)}</button>`)
  .join("");

chips.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cat]");
  if (!btn) return;
  const c = btn.dataset.cat;
  state.cats.has(c) ? state.cats.delete(c) : state.cats.add(c);
  update();
});

qInput.addEventListener("input", () => { state.q = qInput.value; update(); });
sortSel.addEventListener("change", () => { state.sort = sortSel.value; update(); });
const reset = () => { state = { q: "", sort: "featured", cats: new Set() }; update(); qInput.focus(); };
$("reset").addEventListener("click", reset);
$("empty-reset").addEventListener("click", reset);
window.addEventListener("popstate", () => { state = readURL(); update(false); });

// ---- filtering ----
function matches(a) {
  if (state.cats.size && !state.cats.has(a.category)) return false;
  const q = state.q.trim().toLowerCase();
  if (!q) return true;
  const hay = [a.name, a.summary, a.description, a.category, ...a.tags].join(" ").toLowerCase();
  return q.split(/\s+/).every((word) => hay.includes(word));
}

function sorted(list) {
  const out = [...list];
  if (state.sort === "az") return out.sort((a, b) => a.name.localeCompare(b.name));
  return out.sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
}

function update(syncURL = true) {
  const results = sorted(attractions.filter(matches));
  $("grid").innerHTML = results.map((a) => cardHTML(a)).join("");
  $("empty").hidden = results.length > 0;
  $("count").textContent = results.length === 0
    ? "No attractions found."
    : `Showing ${results.length} of ${attractions.length} attractions`;

  if (qInput.value !== state.q) qInput.value = state.q;
  sortSel.value = state.sort;
  chips.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(state.cats.has(b.dataset.cat))));
  $("reset").hidden = !(state.q || state.cats.size || state.sort !== "featured");
  if (syncURL) writeURL();
  initReveal($("grid"));
}

bindTripButtons();
update(false);
