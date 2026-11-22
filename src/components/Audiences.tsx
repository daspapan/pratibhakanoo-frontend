"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { AudienceId } from "@/types";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";

const AUDIENCES: { id: AudienceId; image: string; tone: string }[] = [
  { id: "parents", image: "/images/audiences/parents.webp", tone: "bg-sun text-sun-ink" },
  { id: "schools", image: "/images/audiences/schools.webp", tone: "bg-sky text-sky-ink" },
  { id: "societies", image: "/images/audiences/societies.webp", tone: "bg-mint text-mint-ink" },
];

export default function Audiences() {
  const { t } = useLanguage();

  return (
    <section id="audiences" className="px-5 pt-10">
      <Reveal>
        <h2 className="text-[26px] font-extrabold md:text-3xl">{t.audiences.title}</h2>
        <p className="pt-2 text-base leading-relaxed text-ink-soft">{t.audiences.body}</p>
      </Reveal>

      <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {AUDIENCES.map((a, i) => {
          const copy = t.audiences.items[a.id];
          return (
            <Reveal key={a.id} delay={i * 120} className="w-[78%] flex-none snap-start md:w-auto">
              <a
                href="#book"
                className={`group flex h-full flex-col overflow-hidden rounded-[26px] no-underline transition-transform duration-300 hover:-translate-y-1.5 ${a.tone}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <SmartImage
                    src={a.image}
                    alt={copy.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 78vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackClassName={a.tone}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <h3 className="text-xl font-extrabold">{copy.title}</h3>
                  <p className="text-[15px] leading-snug">{copy.body}</p>
                  <span className="mt-auto pt-2 font-bold underline-offset-4 group-hover:underline">
                    {t.audiences.cta} →
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
