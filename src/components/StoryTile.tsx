"use client";

import { useLanguage } from "@/context/LanguageContext";
import { usePlayer } from "@/context/PlayerContext";
import { CATEGORIES } from "@/data/stories";
import { localeFor } from "@/lib/i18n";
import type { Story } from "@/types";
import { PlayIcon } from "./Icons";
import SmartImage from "./SmartImage";
import { EqualizerBars } from "./StoryCard";
import { TONE_BG } from "./tones";

/** Compact square tile for the swipeable story grid. */
export default function StoryTile({ story }: { story: Story }) {
  const { t, lang } = useLanguage();
  const { play, current, isPlaying } = usePlayer();
  const tone = CATEGORIES.find((c) => c.id === story.category)?.tone ?? "sun";
  const active = current?.id === story.id && isPlaying;

  const date = new Date(`${story.publishedAt}T00:00:00`).toLocaleDateString(localeFor(lang), {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgb(59_42_74/0.12)]">
      <div className={`relative aspect-square overflow-hidden ${TONE_BG[tone]}`}>
        {story.thumbnail && (
          <SmartImage
            src={story.thumbnail}
            alt={story.title}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackClassName={TONE_BG[tone]}
          />
        )}
        <button
          type="button"
          onClick={() => play(story)}
          aria-label={`${t.stories.play}: ${story.title}`}
          className="absolute bottom-2.5 right-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-md transition-transform active:scale-95 group-hover:scale-110"
        >
          {active ? <EqualizerBars /> : <PlayIcon size={16} />}
        </button>
      </div>

      <div className="flex flex-col gap-0.5 p-3">
        <span className="truncate text-[11px] font-bold uppercase text-clay">{story.kicker}</span>
        <h3 className="line-clamp-2 min-h-[2.5em] text-[15px] font-bold leading-tight">{story.title}</h3>
        <span className="text-xs text-ink-soft">{date}</span>
      </div>
    </article>
  );
}