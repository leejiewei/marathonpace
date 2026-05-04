import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteRun, useGetRunById } from "@/hooks/useRunQueries";
import {
  estimateCalories,
  formatDistance,
  formatDuration,
  formatPace,
  formatSpeed,
  formatTimestamp,
} from "@/lib/format";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Flame,
  Gauge,
  MapPin,
  Timer,
  Trash2,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
  ocid: string;
}

function StatCard({
  icon,
  label,
  value,
  unit,
  accent = false,
  ocid,
}: StatCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
      data-ocid={ocid}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
        <span className={accent ? "text-primary" : "text-muted-foreground"}>
          {icon}
        </span>
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <div className="flex items-baseline gap-1">
          <p
            className={`font-mono text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}
          >
            {value}
          </p>
          {unit && (
            <span className="text-xs font-semibold text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RunDetail() {
  const { runId } = useParams({ from: "/history/$runId" });
  const id = BigInt(runId);
  const navigate = useNavigate();

  const { data: run, isLoading, isError } = useGetRunById(id);
  const deleteMutation = useDeleteRun();

  async function handleDelete() {
    await deleteMutation.mutateAsync(id);
    navigate({ to: "/history" });
  }

  return (
    <div className="flex min-h-svh flex-col" data-ocid="run_detail.page">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="run_detail.back_button"
          onClick={() => navigate({ to: "/history" })}
          aria-label="Back to history"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <p className="stat-label">Run Details</p>
          {run && (
            <p className="text-sm font-semibold text-foreground">
              {formatTimestamp(run.startTime)}
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <div
          className="space-y-4 bg-background p-5"
          data-ocid="run_detail.loading_state"
        >
          <Skeleton className="h-6 w-2/3" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
        </div>
      )}

      {(isError || (!isLoading && !run)) && (
        <div
          className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center"
          data-ocid="run_detail.error_state"
        >
          <p className="font-display text-xl font-bold">Run not found</p>
          <Link to="/history">
            <Button type="button" data-ocid="run_detail.back_to_history_button">
              Back to History
            </Button>
          </Link>
        </div>
      )}

      {run && (
        <div className="flex-1 bg-background">
          {/* Summary banner */}
          <div className="border-b border-border bg-card/50 px-5 py-3">
            <p className="font-mono text-sm text-muted-foreground">
              {formatDistance(run.totalDistanceMeters)} km
              <span className="mx-2 text-border">·</span>
              {formatDuration(Number(run.durationSeconds))}
            </p>
          </div>

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 gap-3 p-4"
            data-ocid="run_detail.stats_grid"
          >
            <StatCard
              icon={<MapPin size={18} />}
              label="Total Distance"
              value={formatDistance(run.totalDistanceMeters)}
              unit="km"
              accent
              ocid="run_detail.stat.distance"
            />
            <StatCard
              icon={<Timer size={18} />}
              label="Total Time"
              value={formatDuration(Number(run.durationSeconds))}
              unit=""
              accent
              ocid="run_detail.stat.duration"
            />
            <StatCard
              icon={<TrendingUp size={18} />}
              label="Avg Pace"
              value={formatPace(run.avgPaceSecsPerKm)}
              unit="/km"
              ocid="run_detail.stat.pace"
            />
            <StatCard
              icon={<Gauge size={18} />}
              label="Max Speed"
              value={formatSpeed(run.maxSpeedMps)}
              unit="km/h"
              ocid="run_detail.stat.max_speed"
            />
            <StatCard
              icon={<Flame size={18} />}
              label="Calories"
              value={String(estimateCalories(run.totalDistanceMeters))}
              unit="kcal"
              ocid="run_detail.stat.calories"
            />
            <div
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
              data-ocid="run_detail.stat.time_range"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <span className="text-muted-foreground">
                  <Timer size={18} />
                </span>
              </div>
              <div>
                <p className="stat-label">Start / End</p>
                <p className="font-mono text-sm font-bold text-foreground">
                  {new Date(
                    Number(run.startTime / 1_000_000n),
                  ).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" → "}
                  {new Date(
                    Number(run.endTime / 1_000_000n),
                  ).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Delete button */}
          <div className="px-4 pb-8 pt-2" data-ocid="run_detail.delete_section">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  data-ocid="run_detail.delete_button"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Run
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="run_detail.dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this run?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove the run record. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="run_detail.cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-ocid="run_detail.confirm_button"
                  >
                    {deleteMutation.isPending ? "Deleting…" : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
}
