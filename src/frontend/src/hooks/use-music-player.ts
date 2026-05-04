import { useCallback, useEffect, useRef, useState } from "react";

interface MusicPlayerState {
  files: File[];
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  trackName: string;
}

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [state, setState] = useState<MusicPlayerState>({
    files: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    trackName: "",
  });

  // Clean up old object URL when track changes
  const loadTrack = useCallback((files: File[], index: number) => {
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
      duration: 0,
    }));
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () =>
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
    const onDurationChange = () =>
      setState((s) => ({ ...s, duration: audio.duration || 0 }));
    const onEnded = () => {
      setState((s) => {
        const nextIndex = (s.currentIndex + 1) % Math.max(s.files.length, 1);
        if (s.files.length > 1) {
          loadTrack(s.files, nextIndex);
          audio.play().catch(() => {});
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

  const loadFiles = useCallback(
    (newFiles: File[]) => {
      if (newFiles.length === 0) return;
      setState((s) => ({ ...s, files: newFiles }));
      loadTrack(newFiles, 0);
    },
    [loadTrack],
  );

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setState((s) => ({ ...s, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const next = useCallback(() => {
    setState((s) => {
      if (s.files.length === 0) return s;
      const nextIndex = (s.currentIndex + 1) % s.files.length;
      loadTrack(s.files, nextIndex);
      if (s.isPlaying) {
        setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
      }
      return { ...s, currentIndex: nextIndex };
    });
  }, [loadTrack]);

  const previous = useCallback(() => {
    setState((s) => {
      if (s.files.length === 0) return s;
      const prevIndex = (s.currentIndex - 1 + s.files.length) % s.files.length;
      loadTrack(s.files, prevIndex);
      if (s.isPlaying) {
        setTimeout(() => audioRef.current?.play().catch(() => {}), 50);
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
    togglePlayPause,
  };
}
