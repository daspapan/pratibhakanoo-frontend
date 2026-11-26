"use client";

import { useLanguage } from "@/context/LanguageContext";
import { usePlayer } from "@/context/PlayerContext";
import { STORIES_NEWEST } from "@/data/stories";
import { PlayIcon } from "./Icons";
import SmartImage from "./SmartImage";

/** Little twinkling stars scattered over the banner */
const STARS = [
  { top: "12%", left: "8%", delay: "0s" },
  { top: "22%", left: "82%", delay: "0.6s" },
  { top: "8%", left: "58%", delay: "1.2s" },
  { top: "40%", left: "90%", delay: "1.8s" },
  { top: "35%", left: "4%", delay: "0.9s" },
];

export default function Hero() {
  const { t } = useLanguage();
  const { play } = usePlayer();
  const tonight = STORIES_NEWEST[0];

  return (
    <section id="top" className="grid gap-5 px-5 pt-7 md:grid-cols-2 md:items-center md:gap-10 md:pt-12">
      {/* Banner: illustrated sky with drifting clouds, twinkling stars and Pratibha's photo */}
      <div className="relative h-72 overflow-hidden rounded-[32px] bg-sun md:order-2 md:h-[440px]">
        <SmartImage
          src="/images/hero-banner.webp"
          alt={t.hero.photoAlt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          fallbackClassName="bg-sun text-sun-ink"
        />
        {/* decorative layers */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute left-0 top-6 h-9 w-24 animate-drift rounded-full bg-white/80" />
          <span className="absolute left-0 top-20 h-7 w-16 animate-drift-slow rounded-full bg-white/70 [animation-delay:-14s]" />
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute h-2.5 w-2.5 animate-twinkle rounded-full bg-white"
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            />
          ))}
          <span className="absolute right-5 top-5 h-14 w-14 animate-float rounded-full bg-cream shadow-[0_0_30px_rgb(255_247_236/0.9)]" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:order-1">
        <p className="animate-pop-in text-sm font-bold uppercase tracking-[0.08em] text-clay">{t.hero.eyebrow}</p>
        <h1 className="animate-pop-in text-[38px] font-extrabold leading-[1.05] [animation-delay:120ms] md:text-6xl">
          {t.hero.title}
        </h1>
        <p className="animate-pop-in text-[17px] leading-relaxed text-ink-soft [animation-delay:240ms] md:text-lg">
          {t.hero.body}
        </p>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={() => play(tonight)}
            className="flex min-h-[54px] flex-1 animate-pulse-ring items-center justify-center gap-2 rounded-[18px] bg-brand text-lg font-bold text-white transition-transform hover:bg-brand-dark active:scale-[0.98]"
          >
            <PlayIcon size={20} />
            {t.hero.play}
          </button>
          <a
            href="#book"
            className="flex min-h-[54px] flex-1 items-center justify-center rounded-[18px] border-2 border-ink bg-white text-lg font-bold no-underline transition-transform hover:-translate-y-0.5"
          >
            {t.hero.book}
          </a>
        </div>
      </div>
    </section>
  );
}
