import type { GpxPoint, RunState } from "@/types";
import { create } from "zustand";

interface RunStore {
  runState: RunState;
  startTime: number | null;
  elapsedSeconds: number;
  distance: number; // meters
  maxSpeed: number; // m/s
  currentSpeed: number; // m/s
  gpxPoints: GpxPoint[];

  // Actions
  startRun: () => void;
  pauseRun: () => void;
  resumeRun: () => void;
  finishRun: () => void;
  resetRun: () => void;
  tick: () => void;
  addGpxPoint: (point: GpxPoint) => void;
  updateDistance: (delta: number) => void;
  updateSpeed: (speed: number) => void;
}

export const useRunStore = create<RunStore>((set, get) => ({
  runState: "idle",
  startTime: null,
  elapsedSeconds: 0,
  distance: 0,
  maxSpeed: 0,
  currentSpeed: 0,
  gpxPoints: [],

  startRun: () =>
    set({
      runState: "active",
      startTime: Date.now(),
      elapsedSeconds: 0,
      distance: 0,
      maxSpeed: 0,
      currentSpeed: 0,
      gpxPoints: [],
    }),

  pauseRun: () => set({ runState: "paused" }),

  resumeRun: () => set({ runState: "active" }),

  finishRun: () => set({ runState: "finished" }),

  resetRun: () =>
    set({
      runState: "idle",
      startTime: null,
      elapsedSeconds: 0,
      distance: 0,
      maxSpeed: 0,
      currentSpeed: 0,
      gpxPoints: [],
    }),

  tick: () => {
    const { runState } = get();
    if (runState === "active") {
      set((s) => ({ elapsedSeconds: s.elapsedSeconds + 1 }));
    }
  },

  addGpxPoint: (point) => set((s) => ({ gpxPoints: [...s.gpxPoints, point] })),

  updateDistance: (delta) => set((s) => ({ distance: s.distance + delta })),

  updateSpeed: (speed) =>
    set((s) => ({
      currentSpeed: speed,
      maxSpeed: Math.max(s.maxSpeed, speed),
    })),
}));
