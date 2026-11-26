"use client";

import { useMemo, useRef, useState, type TouchEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, CHANNEL_URL, STORIES_NEWEST } from "@/data/stories";
import type { CategoryId } from "@/types";
import PageDots from "./PageDots";
import StoryTile from "./StoryTile";
import { TONE_BG } from "./tones";

type Filter = CategoryId | "all";
const PER_PAGE = 6;   // 2 columns × 3 rows on phones, 3 × 2 on desktop
const SWIPE_PX = 50;  // how far a finger must move to count as a swipe

export default function StoriesSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);

  // Newest first, then filtered by the chosen category.
  const visible = useMemo(
    () => (filter === "all" ? STORIES_NEWEST : STORIES_NEWEST.filter((s) => s.category === filter)),
    [filter]
  );
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const pageItems = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function goTo(next: number) {
    if (next < 1 || next > totalPages || next === page) return;
    setDirection(next > page ? "next" : "prev");
    setPage(next);
  }

  function chooseFilter(next: Filter) {
    setFilter(next);
    setPage(1); // a new category always starts on its first page
    setDirection("next");
  }

  // Swipe: remember where the finger started, compare where it ended.
  function onTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -SWIPE_PX) goTo(page + 1); // swiped left → next page
    if (dx > SWIPE_PX) goTo(page - 1);  // swiped right → previous page
    touchStartX.current = null;
  }

  const chips: { id: Filter; className: string }[] = [
    { id: "all", className: "bg-white text-ink" },
    ...CATEGORIES.map((c) => ({ id: c.id as Filter, className: TONE_BG[c.tone] })),
  ];

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full text-xl font-bold transition-transform active:scale-95 disabled:opacity-40";

  return (
    <section id="stories" className="px-5 pt-8">
      {/* Category chips */}
      <div role="group" aria-label="Story categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
        {chips.map((c) => {
          const selected = filter === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={selected}
              onClick={() => chooseFilter(c.id)}
              className={`flex-none rounded-full px-4 py-2.5 text-[15px] font-bold transition-all ${c.className} ${
                selected ? "scale-105 ring-2 ring-ink ring-offset-2 ring-offset-cream" : "opacity-90 hover:opacity-100"
              }`}
            >
              {t.categories[c.id]}
            </button>
          );
        })}
      </div>

      {/* Heading + arrows */}
      <div className="flex items-center justify-between pt-5">
        <div>
          <h2 className="text-[26px] font-extrabold leading-tight md:text-3xl">{t.stories.title}</h2>
          {totalPages > 1 && (
            <p className="text-sm text-ink-soft" aria-live="polite">
              {t.stories.pageOf.replace("{page}", String(page)).replace("{total}", String(totalPages))}
            </p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1}
              aria-label={t.stories.prev} className={`${arrow} bg-white text-ink shadow-sm`}>‹</button>
            <button type="button" onClick={() => goTo(page + 1)} disabled={page === totalPages}
              aria-label={t.stories.next} className={`${arrow} bg-brand text-white`}>›</button>
          </div>
        )}
      </div>

      {/* The page of 6 tiles. key forces a fresh slide-in on every page/category change. */}
      <div
        key={`${filter}-${page}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={`grid touch-pan-y grid-cols-2 gap-3 pt-4 md:grid-cols-3 ${
          direction === "next" ? "animate-slide-from-right" : "animate-slide-from-left"
        }`}
      >
        {pageItems.length === 0 && <p className="col-span-full text-ink-soft">{t.stories.empty}</p>}
        {pageItems.map((story) => (
          <StoryTile key={story.id} story={story} />
        ))}
      </div>

      {/* Dots + link */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <PageDots page={page} totalPages={totalPages} onChange={goTo} label={t.stories.page} />
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-[15px] font-bold">
          {t.stories.seeAll}
        </a>
      </div>
    </section>
  );
}