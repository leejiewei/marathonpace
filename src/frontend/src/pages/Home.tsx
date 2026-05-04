import type { Run } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGPS } from "@/hooks/use-gps";
import { useWeather } from "@/hooks/use-weather";
import { useGetAllRuns } from "@/hooks/useRunQueries";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  CloudRain,
  Droplets,
  Footprints,
  Play,
  Thermometer,
} from "lucide-react";

function formatDate(startTime: bigint): string {
  const ms = Number(startTime / 1_000_000n);
  return new Date(ms).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(secs: bigint): string {
  const n = Number(secs);
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const s = n % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export default function Home() {
  const navigate = useNavigate();
  const { lat, lon } = useGPS();
  const { temperature, humidity, isHotHumid } = useWeather(lat, lon);
  const { data: runs = [] as Run[], isLoading } = useGetAllRuns();

  const recentRuns = runs.slice(0, 3);
  const hasRuns = runs.length > 0;

  const totalDistance = runs.reduce((sum, r) => sum + r.totalDistanceMeters, 0);
  const bestDistance = hasRuns
    ? Math.max(...runs.map((r) => r.totalDistanceMeters))
    : 0;

  return (
    <div
      className="flex min-h-[calc(100svh-4rem)] flex-col"
      data-ocid="home.page"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-card border-b border-border px-5 pt-12 pb-10">
        {/* Decorative accent blob */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary opacity-10"
          aria-hidden
        />
        <p className="stat-label mb-2">MarathonPace</p>
        <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-foreground">
          Train Smarter.
          <br />
          <span className="text-primary">Run Safer.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          GPS tracking · Smart pace · Live weather · Music
        </p>

        {/* Weather badge */}
        {lat !== null && (
          <div className="mt-5 inline-flex items-center gap-4 rounded-lg border border-border bg-popover px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <Thermometer size={14} className="text-secondary" />
              <span className="font-mono text-sm font-bold text-secondary">
                {temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets size={14} className="text-secondary" />
              <span className="font-mono text-sm font-bold text-secondary">
                {humidity}%
              </span>
            </div>
            {isHotHumid && (
              <div className="flex items-center gap-1.5">
                <CloudRain size={13} className="text-destructive" />
                <span className="text-xs font-bold uppercase text-destructive">
                  Slow down
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Start Run CTA */}
      <section className="flex flex-col items-center gap-4 px-5 py-10 bg-background">
        <Button
          type="button"
          size="lg"
          className="h-20 w-full max-w-sm rounded-2xl text-2xl font-bold uppercase tracking-widest shadow-[0_0_40px_oklch(0.75_0.18_130/0.35)] transition-smooth hover:scale-[1.03] hover:shadow-[0_0_56px_oklch(0.75_0.18_130/0.55)] active:scale-[0.97]"
          data-ocid="home.start_run_button"
          onClick={() => navigate({ to: "/run" })}
        >
          <Play className="mr-3" size={28} fill="currentColor" />
          Start Run
        </Button>
        <p
          className="flex items-center gap-1.5 text-xs text-muted-foreground"
          data-ocid="home.gps_weather_indicator"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          GPS + live weather powered
        </p>
      </section>

      {/* Quick stats */}
      {hasRuns && (
        <section
          className="bg-muted/30 border-t border-b border-border px-5 py-6"
          data-ocid="home.stats_section"
        >
          <p className="stat-label mb-4">Your Progress</p>
          <div className="grid grid-cols-3 gap-3">
            <div
              className="rounded-lg bg-card border border-border px-3 py-4 text-center"
              data-ocid="home.total_runs_card"
            >
              <p className="stat-display text-2xl">{runs.length}</p>
              <p className="stat-label mt-1">Total Runs</p>
            </div>
            <div
              className="rounded-lg bg-card border border-border px-3 py-4 text-center"
              data-ocid="home.total_distance_card"
            >
              <p className="stat-display text-2xl">
                {(totalDistance / 1000).toFixed(1)}
              </p>
              <p className="stat-label mt-1">km Total</p>
            </div>
            <div
              className="rounded-lg bg-card border border-border px-3 py-4 text-center"
              data-ocid="home.best_distance_card"
            >
              <p className="stat-display text-2xl">
                {(bestDistance / 1000).toFixed(1)}
              </p>
              <p className="stat-label mt-1">km Best</p>
            </div>
          </div>
        </section>
      )}

      {/* Recent runs */}
      <section
        className="flex-1 px-5 py-6 bg-background"
        data-ocid="home.recent_runs_section"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="stat-label">Recent Runs</p>
          {hasRuns && (
            <Link
              to="/history"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              data-ocid="home.see_all_link"
            >
              See all →
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3" data-ocid="home.runs_loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : !hasRuns ? (
          <div
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-14 px-6 text-center"
            data-ocid="home.empty_state"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Footprints size={28} className="text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">
              Ready for your first run?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Your journey starts with a single step. Hit Start Run to begin
              tracking.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {recentRuns.map((run, idx) => (
              <li
                key={String(run.id)}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 transition-smooth hover:border-primary/40 hover:bg-card/80"
                data-ocid={`home.run_item.${idx + 1}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Activity size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {formatDate(run.startTime)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDuration(run.durationSeconds)}
                  </p>
                </div>
                <p className="font-mono text-lg font-bold text-primary shrink-0">
                  {(run.totalDistanceMeters / 1000).toFixed(2)}
                  <span className="text-xs font-normal text-muted-foreground ml-0.5">
                    km
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
