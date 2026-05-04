function formatDuration(seconds) {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor(s % 3600 / 60);
  const sec = s % 60;
  return [
    String(h).padStart(2, "0"),
    String(m).padStart(2, "0"),
    String(sec).padStart(2, "0")
  ].join(":");
}
function formatPace(secsPerKm) {
  if (!Number.isFinite(secsPerKm) || secsPerKm <= 0) return "--:--";
  const m = Math.floor(secsPerKm / 60);
  const s = Math.floor(secsPerKm % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function formatDistance(meters) {
  return (meters / 1e3).toFixed(2);
}
function formatSpeed(mps) {
  return (mps * 3.6).toFixed(1);
}
function estimateCalories(meters) {
  return Math.round(meters / 1e3 * 60);
}
function formatTimestamp(ns) {
  const ms = Number(ns / 1000000n);
  const d = new Date(ms);
  return d.toLocaleString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
export {
  formatDuration as a,
  formatPace as b,
  formatTimestamp as c,
  formatSpeed as d,
  estimateCalories as e,
  formatDistance as f
};
