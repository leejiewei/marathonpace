import type { Coords } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

interface GPSState {
  coords: Coords | null;
  routePoints: Coords[];
  error: string | null;
  isWatching: boolean;
}

export function useGPS() {
  const [state, setState] = useState<GPSState>({
    coords: null,
    routePoints: [],
    error: null,
    isWatching: false,
  });
  const watchIdRef = useRef<number | null>(null);

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }

    setState((s) => ({ ...s, isWatching: true, error: null, routePoints: [] }));

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const c: Coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          speed: pos.coords.speed,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        };
        setState((s) => ({
          ...s,
          coords: c,
          routePoints: [...s.routePoints, c],
          error: null,
        }));
      },
      (err) => {
        setState((s) => ({ ...s, error: err.message }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, []);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setState((s) => ({ ...s, isWatching: false }));
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    lat: state.coords?.lat ?? null,
    lon: state.coords?.lon ?? null,
    speed: state.coords?.speed ?? null,
    accuracy: state.coords?.accuracy ?? null,
    routePoints: state.routePoints,
    error: state.error,
    isWatching: state.isWatching,
    startWatching,
    stopWatching,
  };
}
