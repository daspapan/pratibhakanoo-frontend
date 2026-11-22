"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookIcon, CalendarIcon, HomeIcon, MusicIcon } from "./Icons";

const SECTIONS = ["top", "stories", "audiences", "book"] as const;
type SectionId = (typeof SECTIONS)[number];

/** Thumb-reach navigation on phones; highlights the section in view. */
export default function BottomNav() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SectionId>("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const items: { id: SectionId; label: string; Icon: typeof HomeIcon }[] = [
    { id: "top", label: t.nav.home, Icon: HomeIcon },
    { id: "stories", label: t.nav.stories, Icon: BookIcon },
    { id: "audiences", label: t.nav.sessions, Icon: MusicIcon },
    { id: "book", label: t.nav.book, Icon: CalendarIcon },
  ];

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid h-[72px] grid-cols-4 border-t border-cream-dark bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {items.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? "location" : undefined}
            className={`flex flex-col items-center justify-center gap-0.5 text-xs no-underline transition-colors ${
              isActive ? "font-bold text-brand" : "font-semibold text-ink-soft"
            }`}
          >
            <Icon size={22} className={isActive ? "-translate-y-0.5 transition-transform" : "transition-transform"} />
            {label}
            <span className={`h-1 w-1 rounded-full bg-brand transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
          </a>
        );
      })}
    </nav>
  );
}
