// Shared init: header/footer injection, nav, theme toggle, reveal-on-scroll.
import { getTrip, onTripChange } from "./storage.js";

const NAV = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "attractions.html", label: "Attractions", page: "attractions" },
  { href: "plan.html", label: "Plan Your Visit", page: "plan" },
  { href: "about.html", label: "About", page: "about" },
];

function headerHTML(current) {
  const links = NAV.map(
    (n) =>
      `<li><a href="${n.href}"${n.page === current ? ' aria-current="page"' : ""}>${n.label}${
        n.page === "plan" ? ' <span class="trip-count" data-trip-count hidden></span>' : ""
      }</a></li>`
  ).join("");
  return `
  <div class="container site-header__inner">
    <a class="brand" href="index.html"><span class="brand__mark" aria-hidden="true">◭</span> Jelajah Perlis</a>
    <nav class="site-nav" aria-label="Main">
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-list">
        <span class="visually-hidden">Menu</span><span class="nav-toggle__bars" aria-hidden="true"></span>
      </button>
      <ul id="nav-list" class="nav-list">${links}</ul>
    </nav>
    <button class="theme-toggle" type="button" aria-pressed="false" aria-label="Dark mode">
      <span aria-hidden="true" data-theme-icon>☾</span>
    </button>
  </div>`;
}

function footerHTML() {
  return `
  <div class="container footer-grid">
    <div>
      <p class="footer-brand">Jelajah Perlis</p>
      <p>An independent tourism guide to Perlis, Malaysia. Always confirm fees, hours and access with official sources before you travel.</p>
    </div>
    <nav aria-label="Footer">
      <ul class="footer-links">
        ${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
      </ul>
    </nav>
  </div>
  <div class="container footer-bottom"><small>&copy; <span data-year></span> Jelajah Perlis. A portfolio project, not an official tourism body.</small></div>`;
}

function initTheme() {
  let stored = null;
  try { stored = localStorage.getItem("jp:theme"); } catch { /* ignore */ }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", String(theme === "dark"));
      btn.querySelector("[data-theme-icon]").textContent = theme === "dark" ? "☀" : "☾";
    }
  }
  apply(stored || (prefersDark ? "dark" : "light"));
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("jp:theme", next); } catch { /* ignore */ }
  });
}

function initNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!btn) return;
  const set = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };
  btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
  });
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) set(false); });
}

function updateTripCount() {
  const n = getTrip().length;
  document.querySelectorAll("[data-trip-count]").forEach((el) => {
    el.textContent = n;
    el.hidden = n === 0;
    el.setAttribute("aria-label", `${n} saved`);
  });
}

export function initReveal(root = document) {
  const els = root.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => io.observe(e));
}

function init() {
  const page = document.body.dataset.page;
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.innerHTML = headerHTML(page);
  if (footer) footer.innerHTML = footerHTML();
  footer?.querySelector("[data-year]")?.append(new Date().getFullYear());
  initNav();
  initTheme();
  updateTripCount();
  onTripChange(updateTripCount);
  initReveal();
}

init();
