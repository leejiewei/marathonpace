/** Format seconds -> HH:MM:SS */
export function formatDuration(seconds: number): string {
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [
    String(h).padStart(2, "0"),
    String(m).padStart(2, "0"),
    String(sec).padStart(2, "0"),
  ].join(":");
}

/** Format pace seconds/km -> MM:SS /km */
export function formatPace(secsPerKm: number): string {
  if (!Number.isFinite(secsPerKm) || secsPerKm <= 0) return "--:--";
  const m = Math.floor(secsPerKm / 60);
  const s = Math.floor(secsPerKm % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Format meters -> X.XX km */
export function formatDistance(meters: number): string {
  return (meters / 1000).toFixed(2);
}

/** Format m/s -> X.X km/h */
export function formatSpeed(mps: number): string {
  return (mps * 3.6).toFixed(1);
}

/** Estimate calories from distance (kcal) — ~60 kcal/km for 70kg runner */
export function estimateCalories(meters: number): number {
  return Math.round((meters / 1000) * 60);
}

/** Format a bigint timestamp (nanoseconds) to a readable date/time string */
export function formatTimestamp(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
