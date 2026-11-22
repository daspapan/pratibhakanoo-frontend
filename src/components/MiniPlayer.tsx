"use client";

import { useLanguage } from "@/context/LanguageContext";
import { usePlayer } from "@/context/PlayerContext";
import { CloseIcon, PauseIcon, PlayIcon } from "./Icons";
import SmartImage from "./SmartImage";
import { EqualizerBars } from "./StoryCard";

/** Sticky player that floats above the bottom nav (and bottom-right on desktop). */
export default function MiniPlayer() {
  const { t } = useLanguage();
  const { current, isPlaying, progress, toggle, close } = usePlayer();
  if (!current) return null;

  return (
    <div
      role="region"
      aria-label={t.player.nowPlaying}
      className="fixed inset-x-3 bottom-[84px] z-40 flex animate-pop-in items-center gap-3 rounded-[20px] bg-ink p-2.5 pr-3 text-white shadow-[0_8px_24px_rgb(59_42_74/0.3)] md:bottom-6 md:left-auto md:right-6 md:w-96"
    >
      <div className={`relative h-11 w-11 flex-none overflow-hidden rounded-xl bg-mint ${isPlaying ? "animate-float" : ""}`}>
        {current.thumbnail && (
          <SmartImage src={current.thumbnail} alt="" fill sizes="44px" className="object-cover" fallbackClassName="bg-mint" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-center gap-2 text-xs text-[#e9ddf2]">
          {isPlaying && <EqualizerBars className="bg-sun" />}
          {t.player.nowPlaying}
        </span>
        <strong className="truncate text-[15px] leading-tight">{current.title}</strong>
        <div className="mt-1.5 h-1 rounded bg-ink-soft">
          <div className="h-1 rounded bg-sun transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? t.player.pause : t.player.play}
        className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream text-ink active:scale-95"
      >
        {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      </button>
      <button
        type="button"
        onClick={close}
        aria-label={t.player.close}
        className="flex h-11 w-9 flex-none items-center justify-center text-[#e9ddf2]"
      >
        <CloseIcon size={18} />
      </button>
    </div>
  );
}
