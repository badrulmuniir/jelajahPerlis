// Client-side validation only. No data leaves the browser.
const form = document.getElementById("contact-form");
const success = document.getElementById("success");

const rules = {
  name: (v) => (v.trim().length < 2 ? "Please enter your name (at least 2 characters)." : ""),
  email: (v) => {
    if (!v.trim()) return "Please enter your email address.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address, like name@example.com.";
  },
  message: (v) => (v.trim().length < 10 ? "Please write a message of at least 10 characters." : ""),
};

function check(field) {
  const input = form.elements[field];
  const err = document.getElementById(`${field}-err`);
  const msg = rules[field](input.value);
  err.textContent = msg;
  err.hidden = !msg;
  input.setAttribute("aria-invalid", String(Boolean(msg)));
  return !msg;
}

Object.keys(rules).forEach((f) => {
  form.elements[f].addEventListener("blur", () => check(f));
  form.elements[f].addEventListener("input", () => {
    if (form.elements[f].getAttribute("aria-invalid") === "true") check(f);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const results = Object.keys(rules).map((f) => [f, check(f)]);
  const firstBad = results.find(([, ok]) => !ok);
  if (firstBad) { form.elements[firstBad[0]].focus(); return; }
  form.reset();
  form.hidden = true;
  success.hidden = false;
  success.focus();
});

document.getElementById("again").addEventListener("click", () => {
  success.hidden = true;
  form.hidden = false;
  form.elements.name.focus();
});
