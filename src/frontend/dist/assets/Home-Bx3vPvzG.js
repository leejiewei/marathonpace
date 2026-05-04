import { c as createLucideIcon, u as useNavigate, j as jsxRuntimeExports, L as Link, S as Skeleton } from "./index-BYrLvhks.js";
import { B as Button } from "./backend-DEIwFg3h.js";
import { u as useGPS, a as useWeather, P as Play } from "./use-weather-B_UAmg5d.js";
import { u as useGetAllRuns } from "./useRunQueries-DTcTpIQZ.js";
import { A as Activity } from "./activity-nHt2D4M5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "M16 14v6", key: "1j4efv" }],
  ["path", { d: "M8 14v6", key: "17c4r9" }],
  ["path", { d: "M12 16v6", key: "c8a4gj" }]
];
const CloudRain = createLucideIcon("cloud-rain", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$2);
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
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
const Footprints = createLucideIcon("footprints", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode);
function formatDate(startTime) {
  const ms = Number(startTime / 1000000n);
  return new Date(ms).toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
function formatDuration(secs) {
  const n = Number(secs);
  const h = Math.floor(n / 3600);
  const m = Math.floor(n % 3600 / 60);
  const s = n % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}
function Home() {
  const navigate = useNavigate();
  const { lat, lon } = useGPS();
  const { temperature, humidity, isHotHumid } = useWeather(lat, lon);
  const { data: runs = [], isLoading } = useGetAllRuns();
  const recentRuns = runs.slice(0, 3);
  const hasRuns = runs.length > 0;
  const totalDistance = runs.reduce((sum, r) => sum + r.totalDistanceMeters, 0);
  const bestDistance = hasRuns ? Math.max(...runs.map((r) => r.totalDistanceMeters)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex min-h-[calc(100svh-4rem)] flex-col",
      "data-ocid": "home.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-card border-b border-border px-5 pt-12 pb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary opacity-10",
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mb-2", children: "MarathonPace" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl font-bold leading-none tracking-tight text-foreground", children: [
            "Train Smarter.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Run Safer." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "GPS tracking · Smart pace · Live weather · Music" }),
          lat !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-4 rounded-lg border border-border bg-popover px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { size: 14, className: "text-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-secondary", children: [
                temperature.toFixed(1),
                "°C"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 14, className: "text-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-bold text-secondary", children: [
                humidity,
                "%"
              ] })
            ] }),
            isHotHumid && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudRain, { size: 13, className: "text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase text-destructive", children: "Slow down" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col items-center gap-4 px-5 py-10 bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "lg",
              className: "h-20 w-full max-w-sm rounded-2xl text-2xl font-bold uppercase tracking-widest shadow-[0_0_40px_oklch(0.75_0.18_130/0.35)] transition-smooth hover:scale-[1.03] hover:shadow-[0_0_56px_oklch(0.75_0.18_130/0.55)] active:scale-[0.97]",
              "data-ocid": "home.start_run_button",
              onClick: () => navigate({ to: "/run" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-3", size: 28, fill: "currentColor" }),
                "Start Run"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "flex items-center gap-1.5 text-xs text-muted-foreground",
              "data-ocid": "home.gps_weather_indicator",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
                "GPS + live weather powered"
              ]
            }
          )
        ] }),
        hasRuns && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-muted/30 border-t border-b border-border px-5 py-6",
            "data-ocid": "home.stats_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mb-4", children: "Your Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg bg-card border border-border px-3 py-4 text-center",
                    "data-ocid": "home.total_runs_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-display text-2xl", children: runs.length }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mt-1", children: "Total Runs" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg bg-card border border-border px-3 py-4 text-center",
                    "data-ocid": "home.total_distance_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-display text-2xl", children: (totalDistance / 1e3).toFixed(1) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mt-1", children: "km Total" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg bg-card border border-border px-3 py-4 text-center",
                    "data-ocid": "home.best_distance_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-display text-2xl", children: (bestDistance / 1e3).toFixed(1) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mt-1", children: "km Best" })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "flex-1 px-5 py-6 bg-background",
            "data-ocid": "home.recent_runs_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Recent Runs" }),
                hasRuns && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/history",
                    className: "text-xs font-semibold text-primary hover:text-primary/80 transition-colors",
                    "data-ocid": "home.see_all_link",
                    children: "See all →"
                  }
                )
              ] }),
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "home.runs_loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) }) : !hasRuns ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-14 px-6 text-center",
                  "data-ocid": "home.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Footprints, { size: 28, className: "text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Ready for your first run?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-xs", children: "Your journey starts with a single step. Hit Start Run to begin tracking." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: recentRuns.map((run, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-card/80",
                  "data-ocid": `home.run_item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18, className: "text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: formatDate(run.startTime) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: formatDuration(run.durationSeconds) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-lg font-bold text-primary shrink-0", children: [
                      (run.totalDistanceMeters / 1e3).toFixed(2),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground ml-0.5", children: "km" })
                    ] })
                  ]
                },
                String(run.id)
              )) })
            ]
          }
        )
      ]
    }
  );
}
export {
  Home as default
};
