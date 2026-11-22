"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SOCIAL_LINKS } from "@/data/stories";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./Icons";

const SOCIALS = [
  { href: SOCIAL_LINKS.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: SOCIAL_LINKS.instagramKids, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL_LINKS.facebook, label: "Facebook", Icon: FacebookIcon },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 pb-48 pt-4 md:pb-10">
      <div className="flex gap-3">
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink transition-transform hover:-translate-y-1 hover:animate-wiggle"
          >
            <Icon size={22} />
          </a>
        ))}
      </div>
      <span className="text-sm text-ink-soft">© {new Date().getFullYear()} {t.footer.rights}</span>
    </footer>
  );
}
