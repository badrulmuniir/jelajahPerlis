import { attractions, categories } from "../data/attractions.js";
import { cardHTML, bindTripButtons, esc } from "./ui.js";
import { initReveal } from "./main.js";

const featured = attractions.filter((a) => a.featured).slice(0, 6);
const grid = document.getElementById("featured-grid");
grid.innerHTML = featured.map((a) => cardHTML(a)).join("");

document.getElementById("category-tiles").innerHTML = categories
  .map((c) => {
    const n = attractions.filter((a) => a.category === c.name).length;
    return `<li><a class="tile reveal" href="attractions.html?category=${encodeURIComponent(c.name)}">
      <span class="tile__icon" aria-hidden="true">${c.icon}</span>
      <span class="tile__name">${esc(c.name)}</span>
      <span class="tile__meta">${esc(c.blurb)} · ${n} place${n === 1 ? "" : "s"}</span>
    </a></li>`;
  })
  .join("");

bindTripButtons();
initReveal();
