import { c as createLucideIcon, j as jsxRuntimeExports, S as Skeleton, L as Link } from "./index-BYrLvhks.js";
import { B as Button } from "./backend-DEIwFg3h.js";
import { u as useGetAllRuns } from "./useRunQueries-DTcTpIQZ.js";
import { f as formatDistance, a as formatDuration, b as formatPace, c as formatTimestamp } from "./format-D9YPJrTP.js";
import { A as Activity } from "./activity-nHt2D4M5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function History() {
  const { data: runs, isLoading, isError } = useGetAllRuns();
  const sorted = runs ? [...runs].sort((a, b) => {
    const diff = b.startTime - a.startTime;
    return diff > 0n ? 1 : diff < 0n ? -1 : 0;
  }) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex min-h-[calc(100svh-4rem)] flex-col",
      "data-ocid": "history.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-5 pb-5 pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label mb-1", children: "Your runs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "RUN HISTORY" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background px-4 py-4", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "history.loading_state", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-lg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
                ] })
              ]
            },
            i
          )) }),
          isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center",
              "data-ocid": "history.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: "Failed to load runs." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Check your connection and try again." })
              ]
            }
          ),
          !isLoading && !isError && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center gap-4 py-20 text-center",
              "data-ocid": "history.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 32, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold", children: "No runs yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Start your first run!" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", "data-ocid": "history.start_run_link", children: "Go to Home" }) })
              ]
            }
          ),
          !isLoading && !isError && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "history.list", children: sorted.map((run, i) => {
            const distKm = formatDistance(run.totalDistanceMeters);
            const duration = formatDuration(Number(run.durationSeconds));
            const pace = formatPace(run.avgPaceSecsPerKm);
            const dateStr = formatTimestamp(run.startTime);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { "data-ocid": `history.item.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/history/$runId",
                params: { runId: run.id.toString() },
                className: "group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 transition-smooth hover:border-primary/50 hover:bg-card/80 active:scale-[0.99]",
                "data-ocid": `history.run_link.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: dateStr }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-base font-bold text-primary", children: [
                        distKm,
                        " km"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-muted-foreground", children: duration }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-label", children: [
                        pace,
                        " /km"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronRight,
                    {
                      size: 16,
                      className: "shrink-0 text-muted-foreground transition-smooth group-hover:text-primary"
                    }
                  )
                ]
              }
            ) }, run.id.toString());
          }) })
        ] })
      ]
    }
  );
}
export {
  History as default
};
