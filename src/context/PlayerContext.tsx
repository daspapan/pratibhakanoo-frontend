"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Story } from "@/types";

interface PlayerState {
  current: Story | null;
  isPlaying: boolean;
  /** 0..1 */
  progress: number;
  play: (story: Story) => void;
  toggle: () => void;
  close: () => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Story | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // One shared <audio> element for the whole site.
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const play = useCallback((story: Story) => {
    // No audio file yet: send people to the video instead (YouTube first, else Instagram).
    if (!story.audioUrl) {
      const videoUrl = story.youtubeUrl ?? story.instagramUrl;
      if (videoUrl) window.open(videoUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.src !== new URL(story.audioUrl, window.location.href).href) {
      audio.src = story.audioUrl;
      setProgress(0);
    }
    setCurrent(story);
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [current]);

  const close = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrent(null);
  }, []);

  return (
    <PlayerContext.Provider value={{ current, isPlaying, progress, play, toggle, close }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}
