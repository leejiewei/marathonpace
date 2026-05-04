import { c as createLucideIcon, r as reactExports } from "./index-BYrLvhks.js";
import { u as useActor, b as useQuery, c as createActor } from "./backend-DEIwFg3h.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
function useGPS() {
  var _a, _b, _c, _d;
  const [state, setState] = reactExports.useState({
    coords: null,
    routePoints: [],
    error: null,
    isWatching: false
  });
  const watchIdRef = reactExports.useRef(null);
  const startWatching = reactExports.useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }));
      return;
    }
    setState((s) => ({ ...s, isWatching: true, error: null, routePoints: [] }));
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const c = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          speed: pos.coords.speed,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp
        };
        setState((s) => ({
          ...s,
          coords: c,
          routePoints: [...s.routePoints, c],
          error: null
        }));
      },
      (err) => {
        setState((s) => ({ ...s, error: err.message }));
      },
      { enableHighAccuracy: true, timeout: 1e4, maximumAge: 0 }
    );
  }, []);
  const stopWatching = reactExports.useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setState((s) => ({ ...s, isWatching: false }));
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);
  return {
    lat: ((_a = state.coords) == null ? void 0 : _a.lat) ?? null,
    lon: ((_b = state.coords) == null ? void 0 : _b.lon) ?? null,
    speed: ((_c = state.coords) == null ? void 0 : _c.speed) ?? null,
    accuracy: ((_d = state.coords) == null ? void 0 : _d.accuracy) ?? null,
    routePoints: state.routePoints,
    error: state.error,
    isWatching: state.isWatching,
    startWatching,
    stopWatching
  };
}
function isHotHumidTime(temp, humidity) {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  return temp > 30 && humidity > 80 && hour >= 11 && hour <= 16;
}
function useWeather(lat, lon) {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      if (!actor || lat === null || lon === null) {
        return { temperature: 0, humidity: 0 };
      }
      const result = await actor.fetchWeather(lat, lon);
      return {
        temperature: result.temperature,
        humidity: Number(result.humidity)
      };
    },
    enabled: !!actor && !isFetching && lat !== null && lon !== null,
    staleTime: 5 * 60 * 1e3,
    refetchInterval: 5 * 60 * 1e3
  });
  const weather = query.data;
  const temperature = (weather == null ? void 0 : weather.temperature) ?? 0;
  const humidity = (weather == null ? void 0 : weather.humidity) ?? 0;
  return {
    temperature,
    humidity,
    isHotHumid: isHotHumidTime(temperature, humidity),
    isLoading: query.isLoading,
    error: query.error
  };
}
export {
  Play as P,
  useWeather as a,
  useGPS as u
};
