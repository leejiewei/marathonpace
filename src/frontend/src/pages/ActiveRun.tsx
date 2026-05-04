import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGPS } from "@/hooks/use-gps";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { useWeather } from "@/hooks/use-weather";
import { useRunStore } from "@/store/run-store";
import type { Coords, RunInput } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronLeft,
  MapPin,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyActor = any;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function haversineDistance(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const R = 6371000;
  const φ1 = (a.lat * Math.PI) / 180;
  const φ2 = (b.lat * Math.PI) / 180;
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
  const Δλ = ((b.lon - a.lon) * Math.PI) / 180;
  const x =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function formatTime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0)
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatPace(secsPerKm: number): string {
  if (!Number.isFinite(secsPerKm) || secsPerKm <= 0) return "--:--";
  const m = Math.floor(secsPerKm / 60);
  const s = Math.round(secsPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ─── GPS Route Canvas ─────────────────────────────────────────────────────────

interface RouteCanvasProps {
  routePoints: Coords[];
  currentLat: number | null;
  currentLon: number | null;
}

function RouteCanvas({
  routePoints,
  currentLat,
  currentLon,
}: RouteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "oklch(0.15 0 0)";
    ctx.fillRect(0, 0, W, H);

    const points =
      routePoints.length > 0
        ? routePoints
        : currentLat !== null && currentLon !== null
          ? [
              {
                lat: currentLat,
                lon: currentLon,
                speed: null,
                accuracy: 5,
                timestamp: Date.now(),
              },
            ]
          : [];

    if (points.length === 0) {
      // No GPS yet — show placeholder grid
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
      ctx.fillStyle = "oklch(0.65 0 0)";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Waiting for GPS signal…", W / 2, H / 2);
      return;
    }

    // Coordinate normalization
    const lats = points.map((p) => p.lat);
    const lons = points.map((p) => p.lon);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const pad = 24;
    const rangeX = maxLon - minLon || 0.001;
    const rangeY = maxLat - minLat || 0.001;
    const scaleX = (W - pad * 2) / rangeX;
    const scaleY = (H - pad * 2) / rangeY;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = pad + (W - pad * 2 - rangeX * scale) / 2;
    const offsetY = pad + (H - pad * 2 - rangeY * scale) / 2;

    const toCanvas = (lat: number, lon: number) => ({
      x: offsetX + (lon - minLon) * scale,
      y: H - (offsetY + (lat - minLat) * scale),
    });

    // Grid lines
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
      // Trail glow — outer
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

      // Trail — inner electric lime
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

    // Current position dot
    const lastPt =
      currentLat !== null && currentLon !== null
        ? { lat: currentLat, lon: currentLon }
        : points[points.length - 1];
    const pos = toCanvas(lastPt.lat, lastPt.lon);

    // Pulsing outer ring
    const gradient = ctx.createRadialGradient(
      pos.x,
      pos.y,
      0,
      pos.x,
      pos.y,
      12,
    );
    gradient.addColorStop(0, "oklch(0.7 0.2 200 / 0.5)");
    gradient.addColorStop(1, "oklch(0.7 0.2 200 / 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Dot fill
    ctx.fillStyle = "oklch(0.92 0 0)";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Dot border
    ctx.strokeStyle = "oklch(0.7 0.2 200)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [routePoints, currentLat, currentLon]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={220}
      className="h-full w-full"
      data-ocid="active_run.route_canvas"
      aria-label="GPS route map"
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ActiveRun() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  const [showStopDialog, setShowStopDialog] = useState(false);
  const [warningDismissed, setWarningDismissed] = useState(false);

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
    updateSpeed,
  } = useRunStore();

  const {
    lat,
    lon,
    speed,
    routePoints,
    error: gpsError,
    startWatching,
    stopWatching,
  } = useGPS();
  const { temperature, humidity, isHotHumid } = useWeather(lat, lon);
  const music = useMusicPlayer();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastPointRef = useRef<{ lat: number; lon: number } | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset warning dismiss on new hot condition
  useEffect(() => {
    if (!isHotHumid) setWarningDismissed(false);
  }, [isHotHumid]);

  // GPS tracking effect
  useEffect(() => {
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

  // Timer tick
  useEffect(() => {
    if (runState === "active") {
      tickRef.current = setInterval(tick, 1000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [runState, tick]);

  const saveRunMutation = useMutation({
    mutationFn: async (input: RunInput) => {
      if (!actor) throw new Error("No actor");
      return (actor as AnyActor).saveRun(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      resetRun();
      navigate({ to: "/history" });
    },
  });

  const handleStart = useCallback(() => {
    lastPointRef.current = null;
    startRun();
    startWatching();
  }, [startRun, startWatching]);

  const handlePause = useCallback(() => pauseRun(), [pauseRun]);
  const handleResume = useCallback(() => resumeRun(), [resumeRun]);

  const handleConfirmStop = useCallback(() => {
    setShowStopDialog(false);
    finishRun();
    stopWatching();
    const now = BigInt(Date.now()) * 1_000_000n;
    const start = BigInt(startTime ?? Date.now()) * 1_000_000n;
    const avgPace = distance > 0 ? elapsedSeconds / (distance / 1000) : 0;
    const input: RunInput = {
      startTime: start,
      endTime: now,
      totalDistanceMeters: distance,
      durationSeconds: BigInt(elapsedSeconds),
      avgPaceSecsPerKm: avgPace,
      maxSpeedMps: maxSpeed,
      gpxPoints,
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
    saveRunMutation,
  ]);

  const handleDiscard = useCallback(() => {
    stopWatching();
    resetRun();
    navigate({ to: "/" });
  }, [stopWatching, resetRun, navigate]);

  const paceSecsPerKm =
    distance > 0 && elapsedSeconds > 0 ? elapsedSeconds / (distance / 1000) : 0;
  const distanceKm = (distance / 1000).toFixed(2);
  const speedKmh = ((currentSpeed ?? 0) * 3.6).toFixed(1);
  const showWarning = isHotHumid && runState === "active" && !warningDismissed;

  return (
    <div
      className="flex min-h-svh flex-col bg-background text-foreground"
      data-ocid="active_run.page"
    >
      {/* ── Top Bar ── */}
      <header className="flex items-center justify-between bg-card px-4 py-3 border-b border-border shrink-0">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-ocid="active_run.back_button"
          onClick={handleDiscard}
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {runState === "active" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                runState === "active" ? "bg-primary" : "bg-muted-foreground"
              }`}
            />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            LIVE GPS TRACKER
          </span>
        </div>

        <div
          className={`rounded px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
            runState === "active"
              ? "bg-primary text-primary-foreground"
              : runState === "paused"
                ? "bg-secondary/20 text-secondary"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {runState === "idle"
            ? "READY"
            : runState === "active"
              ? "RUNNING"
              : runState === "paused"
                ? "PAUSED"
                : "FINISHED"}
        </div>
      </header>

      {/* ── Heat Warning Banner ── */}
      {showWarning && (
        <div
          className="relative flex items-center gap-3 bg-destructive px-4 py-3 text-sm font-bold text-destructive-foreground"
          data-ocid="active_run.pace_warning"
          role="alert"
        >
          <AlertTriangle size={16} fill="currentColor" className="shrink-0" />
          <span className="flex-1">
            Slow down — heat risk! Temp {temperature.toFixed(1)}°C / Humidity{" "}
            {humidity}%
          </span>
          <button
            type="button"
            className="ml-2 shrink-0 rounded p-0.5 hover:bg-destructive/80 transition-colors duration-150"
            onClick={() => setWarningDismissed(true)}
            aria-label="Dismiss warning"
            data-ocid="active_run.pace_warning_dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── GPS Route Map ── */}
      <div
        className="relative h-52 shrink-0 overflow-hidden border-b border-border bg-[oklch(0.15_0_0)]"
        data-ocid="active_run.map_section"
      >
        <RouteCanvas
          routePoints={routePoints}
          currentLat={lat}
          currentLon={lon}
        />
        {gpsError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm">
            <MapPin size={28} className="text-destructive" />
            <p className="text-sm font-bold text-destructive">
              GPS unavailable
            </p>
            <p className="text-xs text-muted-foreground">{gpsError}</p>
          </div>
        )}
      </div>

      {/* ── Big Timer ── */}
      <div className="flex flex-col items-center bg-background py-6 border-b border-border shrink-0">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
          ELAPSED TIME
        </p>
        <p
          className="font-mono font-black tabular-nums leading-none text-primary"
          style={{ fontSize: "clamp(3rem, 10vw, 5.5rem)" }}
          data-ocid="active_run.time_stat"
        >
          {formatTime(elapsedSeconds)}
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-card shrink-0">
        <div
          className="flex flex-col items-center py-4 gap-0.5"
          data-ocid="active_run.distance_stat"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Distance
          </span>
          <span className="font-mono text-2xl font-black tabular-nums text-secondary leading-tight">
            {distanceKm}
          </span>
          <span className="font-mono text-xs text-muted-foreground">km</span>
        </div>
        <div
          className="flex flex-col items-center py-4 gap-0.5"
          data-ocid="active_run.speed_stat"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Speed
          </span>
          <span className="font-mono text-2xl font-black tabular-nums text-primary leading-tight">
            {speedKmh}
          </span>
          <span className="font-mono text-xs text-muted-foreground">km/h</span>
        </div>
        <div
          className="flex flex-col items-center py-4 gap-0.5"
          data-ocid="active_run.pace_stat"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Avg Pace
          </span>
          <span className="font-mono text-2xl font-black tabular-nums text-primary leading-tight">
            {formatPace(paceSecsPerKm)}
          </span>
          <span className="font-mono text-xs text-muted-foreground">/km</span>
        </div>
      </div>

      {/* ── Weather Strip ── */}
      <div className="flex items-center justify-between bg-muted/40 border-b border-border px-5 py-2 shrink-0">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Weather
        </span>
        <span className="font-mono text-sm font-bold text-secondary">
          {temperature > 0 ? `${temperature.toFixed(1)}°C` : "--°C"}
          <span className="ml-3 font-normal text-muted-foreground">
            {humidity > 0 ? `${humidity}% hum` : "-- hum"}
          </span>
        </span>
      </div>

      {/* ── Run Controls ── */}
      <div className="flex flex-col items-center gap-3 px-5 py-5 bg-background shrink-0">
        {runState === "idle" && (
          <Button
            type="button"
            size="lg"
            className="w-full rounded-full text-base font-black uppercase tracking-widest h-14 shadow-[0_0_24px_oklch(0.75_0.18_130/0.35)]"
            data-ocid="active_run.start_button"
            onClick={handleStart}
          >
            <Play size={20} fill="currentColor" className="mr-2" />
            Start Run
          </Button>
        )}
        {(runState === "active" || runState === "paused") && (
          <div className="flex w-full gap-3">
            {runState === "active" ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1 rounded-full font-bold uppercase tracking-wider h-13"
                data-ocid="active_run.pause_button"
                onClick={handlePause}
              >
                <Pause size={18} className="mr-2" /> Pause
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="flex-1 rounded-full font-bold uppercase tracking-wider h-13 shadow-[0_0_20px_oklch(0.75_0.18_130/0.3)]"
                data-ocid="active_run.resume_button"
                onClick={handleResume}
              >
                <Play size={18} fill="currentColor" className="mr-2" /> Resume
              </Button>
            )}
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="flex-1 rounded-full font-bold uppercase tracking-wider h-13"
              data-ocid="active_run.stop_button"
              onClick={() => setShowStopDialog(true)}
            >
              <Square size={16} fill="currentColor" className="mr-2" /> Stop
            </Button>
          </div>
        )}
        {saveRunMutation.isPending && (
          <p
            className="font-mono text-xs text-muted-foreground animate-pulse"
            data-ocid="active_run.saving_state"
          >
            Saving run to history…
          </p>
        )}
        {saveRunMutation.isError && (
          <p
            className="font-mono text-xs text-destructive"
            data-ocid="active_run.error_state"
          >
            Failed to save — please try again
          </p>
        )}
      </div>

      {/* ── Music Player ── */}
      <div
        className="mt-auto border-t border-border bg-card px-4 py-3 shrink-0"
        data-ocid="music_player.panel"
      >
        <div className="flex items-center gap-3">
          {/* Album art / load button */}
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-200"
            onClick={() => fileInputRef.current?.click()}
            data-ocid="music_player.upload_button"
            aria-label="Load music files"
          >
            <Music size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length) music.loadFiles(files);
            }}
          />

          {/* Track info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground leading-tight">
              {music.hasFiles
                ? music.trackName || "Unknown Track"
                : "No music loaded"}
            </p>
            <p className="text-xs text-muted-foreground">
              {music.hasFiles
                ? `${music.currentIndex + 1} / ${music.files.length} tracks`
                : "Tap 🎵 to load files"}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-30"
              data-ocid="music_player.prev_button"
              onClick={music.previous}
              disabled={!music.hasFiles}
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background hover:opacity-85 transition-opacity duration-200 disabled:opacity-30 shadow-md"
              data-ocid="music_player.play_pause_button"
              onClick={music.togglePlayPause}
              disabled={!music.hasFiles}
              aria-label={music.isPlaying ? "Pause" : "Play"}
            >
              {music.isPlaying ? (
                <Pause size={20} fill="currentColor" />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-30"
              data-ocid="music_player.next_button"
              onClick={music.next}
              disabled={!music.hasFiles}
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {music.hasFiles && music.duration > 0 && (
          <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{
                width: `${(music.currentTime / music.duration) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* ── Stop Confirmation Dialog ── */}
      <Dialog open={showStopDialog} onOpenChange={setShowStopDialog}>
        <DialogContent data-ocid="active_run.stop_dialog">
          <DialogHeader>
            <DialogTitle>Stop this run?</DialogTitle>
            <DialogDescription>
              Your run will be saved to history.
              {distance > 0 && (
                <>
                  {" "}
                  You've covered <strong>{distanceKm} km</strong> in{" "}
                  <strong>{formatTime(elapsedSeconds)}</strong>.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowStopDialog(false)}
              data-ocid="active_run.stop_cancel_button"
            >
              Keep Running
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmStop}
              data-ocid="active_run.stop_confirm_button"
            >
              Save &amp; Stop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
