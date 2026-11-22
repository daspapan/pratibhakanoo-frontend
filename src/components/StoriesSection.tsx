"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, CHANNEL_URL, STORIES } from "@/data/stories";
import type { CategoryId } from "@/types";
import Reveal from "./Reveal";
import StoryCard from "./StoryCard";
import { TONE_BG } from "./tones";

type Filter = CategoryId | "all";

export default function StoriesSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? STORIES : STORIES.filter((s) => s.category === filter)),
    [filter]
  );

  const chips: { id: Filter; className: string }[] = [
    { id: "all", className: "bg-white text-ink" },
    ...CATEGORIES.map((c) => ({ id: c.id as Filter, className: TONE_BG[c.tone] })),
  ];

  return (
    <section id="stories" className="px-5 pt-8">
      <div role="group" aria-label="Story categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
        {chips.map((c) => {
          const selected = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(c.id)}
              className={`flex-none rounded-full px-4 py-2.5 text-[15px] font-bold transition-all ${c.className} ${
                selected ? "scale-105 ring-2 ring-ink ring-offset-2 ring-offset-cream" : "opacity-90 hover:opacity-100"
              }`}
            >
              {t.categories[c.id]}
            </button>
          );
        })}
      </div>

      <div className="flex items-baseline justify-between pt-5">
        <h2 className="text-[26px] font-extrabold md:text-3xl">{t.stories.title}</h2>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-[15px] font-bold">
          {t.stories.seeAll}
        </a>
      </div>

      {/* key={filter} replays the entrance animation whenever the shelf changes */}
      <div key={filter} className="grid gap-3.5 pt-3.5 md:grid-cols-2">
        {visible.length === 0 && <p className="text-ink-soft">{t.stories.empty}</p>}
        {visible.map((story, i) => (
          <Reveal key={story.id} delay={i * 80}>
            <StoryCard story={story} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
