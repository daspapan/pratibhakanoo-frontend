"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

export default function AboutCard() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-5 pt-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-cream md:flex md:items-center md:gap-8 md:p-10">
          {/* soft floating glow */}
          <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 animate-float rounded-full bg-brand/30 blur-2xl" />

          <div className="relative flex items-center gap-4 md:w-56 md:flex-none md:flex-col md:items-start">
            <div className="relative h-[72px] w-[72px] flex-none overflow-hidden rounded-full bg-ink-soft ring-4 ring-sun/60 md:h-40 md:w-40">
              <SmartImage
                src="/images/pratibha-portrait.webp"
                alt="Pratibha Kanoo"
                fill
                sizes="(min-width: 768px) 160px, 72px"
                className="object-cover"
                fallbackClassName="bg-ink-soft text-cream"
              />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">{t.about.title}</h2>
              <span className="text-[15px] text-[#e9ddf2]">{t.about.subtitle}</span>
            </div>
          </div>

          <div className="relative flex flex-col gap-3 pt-3 md:pt-0">
            <p className="text-base leading-relaxed text-[#f3eaf8] md:text-lg">{t.about.body}</p>
            <div className="flex flex-wrap gap-2">
              {t.about.badges.map((b, i) => (
                <span
                  key={b}
                  className="animate-pop-in rounded-full bg-ink-soft px-3 py-1.5 text-sm font-semibold"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
