"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookIcon, CloseIcon, MenuIcon } from "./Icons";
import type { Lang } from "@/types";

const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "hi", label: "हिं" },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#stories", label: t.nav.stories },
    { href: "#audiences", label: t.audiences.cta },
    { href: "#about", label: t.about.title },
    { href: "#book", label: t.nav.book },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-cream/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_4px_20px_rgb(59_42_74/0.08)]" : "border-b border-cream-dark"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="#top" className="group flex items-center gap-2 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white group-hover:animate-wiggle">
            <BookIcon size={20} />
          </span>
          <span className="text-lg font-extrabold leading-none">{t.brand}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-semibold text-ink-soft hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={t.menu.language} className="flex rounded-full bg-cream-dark p-[3px]">
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={lang === l.id}
                onClick={() => setLang(l.id)}
                className={`min-h-8 rounded-full px-3 text-sm font-bold transition-colors ${
                  lang === l.id ? "bg-white shadow-sm" : "bg-transparent"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={open ? t.menu.close : t.menu.open}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream-dark md:hidden"
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down menu */}
      {open && (
        <nav aria-label="Mobile" className="animate-pop-in border-t border-cream-dark bg-cream px-5 pb-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-cream-dark py-3 text-lg font-semibold no-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
