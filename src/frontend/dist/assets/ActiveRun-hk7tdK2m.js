import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, R as React, u as useNavigate, b as useQueryClient } from "./index-BYrLvhks.js";
import { u as useActor, a as useMutation, B as Button, c as createActor } from "./backend-DEIwFg3h.js";
import { R as Root, C as Content, a as Close, T as Title, D as Description, P as Portal, O as Overlay, M as MapPin } from "./index-02pLL9iv.js";
import { u as useGPS, a as useWeather, P as Play } from "./use-weather-B_UAmg5d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["polygon", { points: "19 20 9 12 19 4 19 20", key: "o2sva" }],
  ["line", { x1: "5", x2: "5", y1: "19", y2: "5", key: "1ocqjk" }]
];
const SkipBack = createLucideIcon("skip-back", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function useMusicPlayer() {
  const audioRef = reactExports.useRef(null);
  const objectUrlRef = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({
    files: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    trackName: ""
  });
  const loadTrack = reactExports.useCallback((files, index) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const file = files[index];
    if (!file) return;
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    audio.src = url;
    audio.load();
    setState((s) => ({
      ...s,
      currentIndex: index,
      trackName: file.name.replace(/\.[^/.]+$/, ""),
      currentTime: 0,
      duration: 0
    }));
  }, []);
  reactExports.useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const onTimeUpdate = () => setState((s) => ({ ...s, currentTime: audio.currentTime }));
    const onDurationChange = () => setState((s) => ({ ...s, duration: audio.duration || 0 }));
    const onEnded = () => {
      setState((s) => {
        const nextIndex = (s.currentIndex + 1) % Math.max(s.files.length, 1);
        if (s.files.length > 1) {
          loadTrack(s.files, nextIndex);
          audio.play().catch(() => {
          });
          return { ...s, currentIndex: nextIndex, isPlaying: true };
        }
        return { ...s, isPlaying: false };
      });
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, [loadTrack]);
  const loadFiles = reactExports.useCallback(
    (newFiles) => {
      if (newFiles.length === 0) return;
      setState((s) => ({ ...s, files: newFiles }));
      loadTrack(newFiles, 0);
    },
    [loadTrack]
  );
  const play = reactExports.useCallback(() => {
    var _a;
    (_a = audioRef.current) == null ? void 0 : _a.play().catch(() => {
    });
    setState((s) => ({ ...s, isPlaying: true }));
  }, []);
  const pause = reactExports.useCallback(() => {
    var _a;
    (_a = audioRef.current) == null ? void 0 : _a.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);
  const togglePlayPause = reactExports.useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);
  const next = reactExports.useCallback(() => {
    setState((s) => {
      if (s.files.length === 0) return s;
      const nextIndex = (s.currentIndex + 1) % s.files.length;
      loadTrack(s.files, nextIndex);
      if (s.isPlaying) {
        setTimeout(() => {
          var _a;
          return (_a = audioRef.current) == null ? void 0 : _a.play().catch(() => {
          });
        }, 50);
      }
      return { ...s, currentIndex: nextIndex };
    });
  }, [loadTrack]);
  const previous = reactExports.useCallback(() => {
    setState((s) => {
      if (s.files.length === 0) return s;
      const prevIndex = (s.currentIndex - 1 + s.files.length) % s.files.length;
      loadTrack(s.files, prevIndex);
      if (s.isPlaying) {
        setTimeout(() => {
          var _a;
          return (_a = audioRef.current) == null ? void 0 : _a.play().catch(() => {
          });
        }, 50);
      }
      return { ...s, currentIndex: prevIndex };
    });
  }, [loadTrack]);
  return {
    files: state.files,
    currentIndex: state.currentIndex,
    isPlaying: state.isPlaying,
    currentTime: state.currentTime,
    duration: state.duration,
    trackName: state.trackName,
    hasFiles: state.files.length > 0,
    loadFiles,
    play,
    pause,
    next,
    previous,
    togglePlayPause
  };
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useRunStore = create((set, get) => ({
  runState: "idle",
  startTime: null,
  elapsedSeconds: 0,
  distance: 0,
  maxSpeed: 0,
  currentSpeed: 0,
  gpxPoints: [],
  startRun: () => set({
    runState: "active",
    startTime: Date.now(),
    elapsedSeconds: 0,
    distance: 0,
    maxSpeed: 0,
    currentSpeed: 0,
    gpxPoints: []
  }),
  pauseRun: () => set({ runState: "paused" }),
  resumeRun: () => set({ runState: "active" }),
  finishRun: () => set({ runState: "finished" }),
  resetRun: () => set({
    runState: "idle",
    startTime: null,
    elapsedSeconds: 0,
    distance: 0,
    maxSpeed: 0,
    currentSpeed: 0,
    gpxPoints: []
  }),
  tick: () => {
    const { runState } = get();
    if (runState === "active") {
      set((s) => ({ elapsedSeconds: s.elapsedSeconds + 1 }));
    }
  },
  addGpxPoint: (point) => set((s) => ({ gpxPoints: [...s.gpxPoints, point] })),
  updateDistance: (delta) => set((s) => ({ distance: s.distance + delta })),
  updateSpeed: (speed) => set((s) => ({
    currentSpeed: speed,
    maxSpeed: Math.max(s.maxSpeed, speed)
  }))
}));
function haversineDistance(a, b) {
  const R = 6371e3;
  const φ1 = a.lat * Math.PI / 180;
  const φ2 = b.lat * Math.PI / 180;
  const Δφ = (b.lat - a.lat) * Math.PI / 180;
  const Δλ = (b.lon - a.lon) * Math.PI / 180;
  const x = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs % 3600 / 60);
  const s = secs % 60;
  if (h > 0)
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function formatPace(secsPerKm) {
  if (!Number.isFinite(secsPerKm) || secsPerKm <= 0) return "--:--";
  const m = Math.floor(secsPerKm / 60);
  const s = Math.round(secsPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
function RouteCanvas({
  routePoints,
  currentLat,
  currentLon
}) {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "oklch(0.15 0 0)";
    ctx.fillRect(0, 0, W, H);
    const points = routePoints.length > 0 ? routePoints : currentLat !== null && currentLon !== null ? [
      {
        lat: currentLat,
        lon: currentLon,
        speed: null,
        accuracy: 5,
        timestamp: Date.now()
      }
    ] : [];
    if (points.length === 0) {
      ctx.strokeStyle = "oklch(0.22 0 0)";
      ctx.lineWidth = 1;
      const step2 = 40;
      for (let x = 0; x < W; x += step2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += step2) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.fillStyle = "oklch(0.65 0 0)";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Waiting for GPS signal…", W / 2, H / 2);
      return;
    }
    const lats = points.map((p) => p.lat);
    const lons = points.map((p) => p.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const pad = 24;
    const rangeX = maxLon - minLon || 1e-3;
    const rangeY = maxLat - minLat || 1e-3;
    const scaleX = (W - pad * 2) / rangeX;
    const scaleY = (H - pad * 2) / rangeY;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = pad + (W - pad * 2 - rangeX * scale) / 2;
    const offsetY = pad + (H - pad * 2 - rangeY * scale) / 2;
    const toCanvas = (lat, lon) => ({
      x: offsetX + (lon - minLon) * scale,
      y: H - (offsetY + (lat - minLat) * scale)
    });
    ctx.strokeStyle = "oklch(0.22 0 0)";
    ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    if (points.length > 1) {
      ctx.strokeStyle = "oklch(0.75 0.18 130 / 0.25)";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const { x, y } = toCanvas(points[i].lat, points[i].lon);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = "oklch(0.75 0.18 130)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const { x, y } = toCanvas(points[i].lat, points[i].lon);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    const lastPt = currentLat !== null && currentLon !== null ? { lat: currentLat, lon: currentLon } : points[points.length - 1];
    const pos = toCanvas(lastPt.lat, lastPt.lon);
    const gradient = ctx.createRadialGradient(
      pos.x,
      pos.y,
      0,
      pos.x,
      pos.y,
      12
    );
    gradient.addColorStop(0, "oklch(0.7 0.2 200 / 0.5)");
    gradient.addColorStop(1, "oklch(0.7 0.2 200 / 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "oklch(0.92 0 0)";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "oklch(0.7 0.2 200)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [routePoints, currentLat, currentLon]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 600,
      height: 220,
      className: "h-full w-full",
      "data-ocid": "active_run.route_canvas",
      "aria-label": "GPS route map"
    }
  );
}
function ActiveRun() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  const [showStopDialog, setShowStopDialog] = reactExports.useState(false);
  const [warningDismissed, setWarningDismissed] = reactExports.useState(false);
  const {
    runState,
    startTime,
    elapsedSeconds,
    distance,
    maxSpeed,
    currentSpeed,
    gpxPoints,
    startRun,
    pauseRun,
    resumeRun,
    finishRun,
    resetRun,
    tick,
    addGpxPoint,
    updateDistance,
    updateSpeed
  } = useRunStore();
  const {
    lat,
    lon,
    speed,
    routePoints,
    error: gpsError,
    startWatching,
    stopWatching
  } = useGPS();
  const { temperature, humidity, isHotHumid } = useWeather(lat, lon);
  const music = useMusicPlayer();
  const fileInputRef = reactExports.useRef(null);
  const lastPointRef = reactExports.useRef(null);
  const tickRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isHotHumid) setWarningDismissed(false);
  }, [isHotHumid]);
  reactExports.useEffect(() => {
    if (runState === "active" && lat !== null && lon !== null) {
      const point = { lat, lon, timestamp: BigInt(Date.now()) };
      addGpxPoint(point);
      if (lastPointRef.current) {
        const delta = haversineDistance(lastPointRef.current, point);
        if (delta > 1) updateDistance(delta);
      }
      lastPointRef.current = { lat, lon };
      if (speed !== null) updateSpeed(speed);
    }
  }, [lat, lon, speed, runState, addGpxPoint, updateDistance, updateSpeed]);
  reactExports.useEffect(() => {
    if (runState === "active") {
      tickRef.current = setInterval(tick, 1e3);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [runState, tick]);
  const saveRunMutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      return actor.saveRun(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      resetRun();
      navigate({ to: "/history" });
    }
  });
  const handleStart = reactExports.useCallback(() => {
    lastPointRef.current = null;
    startRun();
    startWatching();
  }, [startRun, startWatching]);
  const handlePause = reactExports.useCallback(() => pauseRun(), [pauseRun]);
  const handleResume = reactExports.useCallback(() => resumeRun(), [resumeRun]);
  const handleConfirmStop = reactExports.useCallback(() => {
    setShowStopDialog(false);
    finishRun();
    stopWatching();
    const now = BigInt(Date.now()) * 1000000n;
    const start = BigInt(startTime ?? Date.now()) * 1000000n;
    const avgPace = distance > 0 ? elapsedSeconds / (distance / 1e3) : 0;
    const input = {
      startTime: start,
      endTime: now,
      totalDistanceMeters: distance,
      durationSeconds: BigInt(elapsedSeconds),
      avgPaceSecsPerKm: avgPace,
      maxSpeedMps: maxSpeed,
      gpxPoints
    };
    saveRunMutation.mutate(input);
  }, [
    finishRun,
    stopWatching,
    startTime,
    distance,
    elapsedSeconds,
    maxSpeed,
    gpxPoints,
    saveRunMutation
  ]);
  const handleDiscard = reactExports.useCallback(() => {
    stopWatching();
    resetRun();
    navigate({ to: "/" });
  }, [stopWatching, resetRun, navigate]);
  const paceSecsPerKm = distance > 0 && elapsedSeconds > 0 ? elapsedSeconds / (distance / 1e3) : 0;
  const distanceKm = (distance / 1e3).toFixed(2);
  const speedKmh = ((currentSpeed ?? 0) * 3.6).toFixed(1);
  const showWarning = isHotHumid && runState === "active" && !warningDismissed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex min-h-svh flex-col bg-background text-foreground",
      "data-ocid": "active_run.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between bg-card px-4 py-3 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200",
              "data-ocid": "active_run.back_button",
              onClick: handleDiscard,
              "aria-label": "Go back",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              runState === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `relative inline-flex h-2 w-2 rounded-full ${runState === "active" ? "bg-primary" : "bg-muted-foreground"}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "LIVE GPS TRACKER" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `rounded px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${runState === "active" ? "bg-primary text-primary-foreground" : runState === "paused" ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}`,
              children: runState === "idle" ? "READY" : runState === "active" ? "RUNNING" : runState === "paused" ? "PAUSED" : "FINISHED"
            }
          )
        ] }),
        showWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex items-center gap-3 bg-destructive px-4 py-3 text-sm font-bold text-destructive-foreground",
            "data-ocid": "active_run.pace_warning",
            role: "alert",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, fill: "currentColor", className: "shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1", children: [
                "Slow down — heat risk! Temp ",
                temperature.toFixed(1),
                "°C / Humidity",
                " ",
                humidity,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "ml-2 shrink-0 rounded p-0.5 hover:bg-destructive/80 transition-colors duration-150",
                  onClick: () => setWarningDismissed(true),
                  "aria-label": "Dismiss warning",
                  "data-ocid": "active_run.pace_warning_dismiss",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-52 shrink-0 overflow-hidden border-b border-border bg-[oklch(0.15_0_0)]",
            "data-ocid": "active_run.map_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RouteCanvas,
                {
                  routePoints,
                  currentLat: lat,
                  currentLon: lon
                }
              ),
              gpsError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 28, className: "text-destructive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-destructive", children: "GPS unavailable" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: gpsError })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-background py-6 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "ELAPSED TIME" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono font-black tabular-nums leading-none text-primary",
              style: { fontSize: "clamp(3rem, 10vw, 5.5rem)" },
              "data-ocid": "active_run.time_stat",
              children: formatTime(elapsedSeconds)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 divide-x divide-border border-b border-border bg-card shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-4 gap-0.5",
              "data-ocid": "active_run.distance_stat",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-wider text-muted-foreground", children: "Distance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-2xl font-black tabular-nums text-secondary leading-tight", children: distanceKm }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "km" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-4 gap-0.5",
              "data-ocid": "active_run.speed_stat",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-wider text-muted-foreground", children: "Speed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-2xl font-black tabular-nums text-primary leading-tight", children: speedKmh }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "km/h" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center py-4 gap-0.5",
              "data-ocid": "active_run.pace_stat",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-wider text-muted-foreground", children: "Avg Pace" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-2xl font-black tabular-nums text-primary leading-tight", children: formatPace(paceSecsPerKm) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "/km" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-muted/40 border-b border-border px-5 py-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground uppercase tracking-wider", children: "Weather" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-secondary", children: [
            temperature > 0 ? `${temperature.toFixed(1)}°C` : "--°C",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 font-normal text-muted-foreground", children: humidity > 0 ? `${humidity}% hum` : "-- hum" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 px-5 py-5 bg-background shrink-0", children: [
          runState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "lg",
              className: "w-full rounded-full text-base font-black uppercase tracking-widest h-14 shadow-[0_0_24px_oklch(0.75_0.18_130/0.35)]",
              "data-ocid": "active_run.start_button",
              onClick: handleStart,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 20, fill: "currentColor", className: "mr-2" }),
                "Start Run"
              ]
            }
          ),
          (runState === "active" || runState === "paused") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full gap-3", children: [
            runState === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "lg",
                className: "flex-1 rounded-full font-bold uppercase tracking-wider h-13",
                "data-ocid": "active_run.pause_button",
                onClick: handlePause,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 18, className: "mr-2" }),
                  " Pause"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "lg",
                className: "flex-1 rounded-full font-bold uppercase tracking-wider h-13 shadow-[0_0_20px_oklch(0.75_0.18_130/0.3)]",
                "data-ocid": "active_run.resume_button",
                onClick: handleResume,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18, fill: "currentColor", className: "mr-2" }),
                  " Resume"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "lg",
                className: "flex-1 rounded-full font-bold uppercase tracking-wider h-13",
                "data-ocid": "active_run.stop_button",
                onClick: () => setShowStopDialog(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { size: 16, fill: "currentColor", className: "mr-2" }),
                  " Stop"
                ]
              }
            )
          ] }),
          saveRunMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono text-xs text-muted-foreground animate-pulse",
              "data-ocid": "active_run.saving_state",
              children: "Saving run to history…"
            }
          ),
          saveRunMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono text-xs text-destructive",
              "data-ocid": "active_run.error_state",
              children: "Failed to save — please try again"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-auto border-t border-border bg-card px-4 py-3 shrink-0",
            "data-ocid": "music_player.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200",
                    onClick: () => {
                      var _a;
                      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                    },
                    "data-ocid": "music_player.upload_button",
                    "aria-label": "Load music files",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { size: 18 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "audio/*",
                    multiple: true,
                    className: "hidden",
                    onChange: (e) => {
                      const files = Array.from(e.target.files ?? []);
                      if (files.length) music.loadFiles(files);
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground leading-tight", children: music.hasFiles ? music.trackName || "Unknown Track" : "No music loaded" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: music.hasFiles ? `${music.currentIndex + 1} / ${music.files.length} tracks` : "Tap 🎵 to load files" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-30",
                      "data-ocid": "music_player.prev_button",
                      onClick: music.previous,
                      disabled: !music.hasFiles,
                      "aria-label": "Previous track",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipBack, { size: 18 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background hover:opacity-85 transition-opacity duration-200 disabled:opacity-30 shadow-md",
                      "data-ocid": "music_player.play_pause_button",
                      onClick: music.togglePlayPause,
                      disabled: !music.hasFiles,
                      "aria-label": music.isPlaying ? "Pause" : "Play",
                      children: music.isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 20, fill: "currentColor" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 20, fill: "currentColor" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-30",
                      "data-ocid": "music_player.next_button",
                      onClick: music.next,
                      disabled: !music.hasFiles,
                      "aria-label": "Next track",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 18 })
                    }
                  )
                ] })
              ] }),
              music.hasFiles && music.duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-0.5 w-full overflow-hidden rounded-full bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-primary transition-all duration-1000",
                  style: {
                    width: `${music.currentTime / music.duration * 100}%`
                  }
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showStopDialog, onOpenChange: setShowStopDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "active_run.stop_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Stop this run?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              "Your run will be saved to history.",
              distance > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " ",
                "You've covered ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  distanceKm,
                  " km"
                ] }),
                " in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatTime(elapsedSeconds) }),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setShowStopDialog(false),
                "data-ocid": "active_run.stop_cancel_button",
                children: "Keep Running"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: handleConfirmStop,
                "data-ocid": "active_run.stop_confirm_button",
                children: "Save & Stop"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  ActiveRun as default
};
