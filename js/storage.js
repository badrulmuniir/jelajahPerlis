// localStorage helpers: safe against disabled storage / bad JSON.
export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const TRIP_KEY = "jp:trip";
const listeners = new Set();

export function getTrip() {
  const t = load(TRIP_KEY, []);
  return Array.isArray(t) ? t : [];
}
export function inTrip(id) { return getTrip().includes(id); }
export function toggleTrip(id) {
  const trip = getTrip();
  const next = trip.includes(id) ? trip.filter((x) => x !== id) : [...trip, id];
  save(TRIP_KEY, next);
  listeners.forEach((fn) => fn(next));
  return next.includes(id);
}
export function removeFromTrip(id) {
  const next = getTrip().filter((x) => x !== id);
  save(TRIP_KEY, next);
  listeners.forEach((fn) => fn(next));
}
export function clearTrip() {
  save(TRIP_KEY, []);
  listeners.forEach((fn) => fn([]));
}
export function onTripChange(fn) { listeners.add(fn); }
