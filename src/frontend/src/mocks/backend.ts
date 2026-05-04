import type { backendInterface, Run } from "../backend";

const sampleRuns: Run[] = [
  {
    id: BigInt(1),
    startTime: BigInt(Date.now() - 3600000),
    endTime: BigInt(Date.now() - 600000),
    durationSeconds: BigInt(3000),
    totalDistanceMeters: 8420,
    avgPaceSecsPerKm: 356,
    maxSpeedMps: 4.2,
    gpxPoints: [],
  },
  {
    id: BigInt(2),
    startTime: BigInt(Date.now() - 86400000),
    endTime: BigInt(Date.now() - 82800000),
    durationSeconds: BigInt(2700),
    totalDistanceMeters: 5100,
    avgPaceSecsPerKm: 529,
    maxSpeedMps: 3.8,
    gpxPoints: [],
  },
];

export const mockBackend: backendInterface = {
  saveRun: async (input) => ({
    id: BigInt(3),
    startTime: input.startTime,
    endTime: input.endTime,
    durationSeconds: input.durationSeconds,
    totalDistanceMeters: input.totalDistanceMeters,
    avgPaceSecsPerKm: input.avgPaceSecsPerKm,
    maxSpeedMps: input.maxSpeedMps,
    gpxPoints: input.gpxPoints,
  }),
  getAllRuns: async () => sampleRuns,
  getRunById: async (id) => sampleRuns.find((r) => r.id === id) ?? null,
  deleteRun: async (_id) => true,
  fetchWeather: async (_lat, _lon) => ({
    temperature: 32.5,
    humidity: BigInt(78),
  }),
  transform: async (input) => ({
    status: input.response.status,
    body: input.response.body,
    headers: input.response.headers,
  }),
};
