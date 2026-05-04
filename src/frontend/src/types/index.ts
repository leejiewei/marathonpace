// Backend-mirrored types
export interface GpxPoint {
  lat: number;
  lon: number;
  timestamp: bigint;
}

export interface Run {
  id: bigint;
  startTime: bigint;
  endTime: bigint;
  totalDistanceMeters: number;
  durationSeconds: bigint;
  avgPaceSecsPerKm: number;
  maxSpeedMps: number;
  gpxPoints: GpxPoint[];
}

export interface RunInput {
  startTime: bigint;
  endTime: bigint;
  totalDistanceMeters: number;
  durationSeconds: bigint;
  avgPaceSecsPerKm: number;
  maxSpeedMps: number;
  gpxPoints: GpxPoint[];
}

// Run store types
export type RunState = "idle" | "active" | "paused" | "finished";

export interface Coords {
  lat: number;
  lon: number;
  speed: number | null;
  accuracy: number;
  timestamp: number;
}
