import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllRuns } from "@/hooks/useRunQueries";
import {
  formatDistance,
  formatDuration,
  formatPace,
  formatTimestamp,
} from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { Activity, ChevronRight } from "lucide-react";

export default function History() {
  const { data: runs, isLoading, isError } = useGetAllRuns();

  const sorted = runs
    ? [...runs].sort((a, b) => {
        const diff = b.startTime - a.startTime;
        return diff > 0n ? 1 : diff < 0n ? -1 : 0;
      })
    : [];

  return (
    <div
      className="flex min-h-[calc(100svh-4rem)] flex-col"
      data-ocid="history.page"
    >
      {/* Header */}
      <div className="border-b border-border bg-card px-5 pb-5 pt-8">
        <p className="stat-label mb-1">Your runs</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          RUN HISTORY
        </h1>
      </div>

      {/* List */}
      <div className="flex-1 bg-background px-4 py-4">
        {isLoading && (
          <div className="space-y-3" data-ocid="history.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4"
              >
                <Skeleton className="h-11 w-11 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div
            className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center"
            data-ocid="history.error_state"
          >
            <p className="text-sm font-semibold text-destructive">
              Failed to load runs.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Check your connection and try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && sorted.length === 0 && (
          <div
            className="flex flex-col items-center justify-center gap-4 py-20 text-center"
            data-ocid="history.empty_state"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Activity size={32} className="text-primary" />
            </div>
            <div>
              <p className="font-display text-xl font-bold">No runs yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start your first run!
              </p>
            </div>
            <Link to="/">
              <Button type="button" data-ocid="history.start_run_link">
                Go to Home
              </Button>
            </Link>
          </div>
        )}

        {!isLoading && !isError && sorted.length > 0 && (
          <ul className="space-y-3" data-ocid="history.list">
            {sorted.map((run, i) => {
              const distKm = formatDistance(run.totalDistanceMeters);
              const duration = formatDuration(Number(run.durationSeconds));
              const pace = formatPace(run.avgPaceSecsPerKm);
              const dateStr = formatTimestamp(run.startTime);
              return (
                <li key={run.id.toString()} data-ocid={`history.item.${i + 1}`}>
                  <Link
                    to="/history/$runId"
                    params={{ runId: run.id.toString() }}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 transition-smooth hover:border-primary/50 hover:bg-card/80 active:scale-[0.99]"
                    data-ocid={`history.run_link.${i + 1}`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Activity size={18} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {dateStr}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                        <span className="font-mono text-base font-bold text-primary">
                          {distKm} km
                        </span>
                        <span className="font-mono text-sm text-muted-foreground">
                          {duration}
                        </span>
                        <span className="stat-label">{pace} /km</span>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-muted-foreground transition-smooth group-hover:text-primary"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
