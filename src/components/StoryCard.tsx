"use client";

import { useLanguage } from "@/context/LanguageContext";
import { usePlayer } from "@/context/PlayerContext";
import type { Story } from "@/types";
import { PlayIcon } from "./Icons";
import SmartImage from "./SmartImage";
import { TONE_BG } from "./tones";
import { CATEGORIES } from "@/data/stories";

export default function StoryCard({ story }: { story: Story }) {
  const { t } = useLanguage();
  const { play, current, isPlaying } = usePlayer();
  const tone = CATEGORIES.find((c) => c.id === story.category)?.tone ?? "sun";
  const active = current?.id === story.id && isPlaying;

  return (
    <article className="group flex items-center gap-3.5 rounded-[22px] bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgb(59_42_74/0.12)]">
      <div className={`relative h-24 w-24 flex-none overflow-hidden rounded-[18px] ${TONE_BG[tone]}`}>
        {story.thumbnail && (
          <SmartImage
            src={story.thumbnail}
            alt={story.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fallbackClassName={TONE_BG[tone]}
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-[13px] font-bold uppercase text-clay">{story.kicker}</span>
        <h3 className="text-[19px] font-bold leading-tight">{story.title}</h3>
        <span className="text-sm text-ink-soft">
          {story.durationMin ? `${story.durationMin} ${t.stories.min} · ` : ""}
          {story.language}
        </span>
      </div>

      <button
        type="button"
        aria-label={`${t.stories.play}: ${story.title}`}
        onClick={() => play(story)}
        className="ml-auto flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:scale-110 active:scale-95"
      >
        {active ? <EqualizerBars /> : <PlayIcon size={18} />}
      </button>
    </article>
  );
}

/** Animated bars shown on the card that's currently playing */
export function EqualizerBars({ className = "bg-white" }: { className?: string }) {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className={`h-full w-[3px] origin-bottom animate-eq rounded-sm ${className}`}
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </span>
  );
}
