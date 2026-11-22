"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HeartIcon, MoonIcon, SunIcon, WordsIcon } from "./Icons";
import Reveal from "./Reveal";

const STYLES = [
  { Icon: SunIcon, tone: "bg-sun text-sun-ink", spin: "group-hover:rotate-45" },
  { Icon: WordsIcon, tone: "bg-sky text-sky-ink", spin: "group-hover:-rotate-6" },
  { Icon: MoonIcon, tone: "bg-mint text-mint-ink", spin: "group-hover:-rotate-12" },
  { Icon: HeartIcon, tone: "bg-rose text-rose-ink", spin: "group-hover:scale-125" },
];

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section className="px-5 pt-10">
      <h2 className="text-[26px] font-extrabold md:text-3xl">{t.benefits.title}</h2>
      <div className="grid grid-cols-2 gap-3 pt-3 md:grid-cols-4">
        {t.benefits.items.map((item, i) => {
          const { Icon, tone, spin } = STYLES[i];
          return (
            <Reveal key={item.title} delay={i * 100}>
              <div className={`group flex h-full flex-col gap-1.5 rounded-[22px] p-4 ${tone}`}>
                <Icon size={28} className={`transition-transform duration-500 ${spin}`} />
                <strong className="text-[17px] leading-tight">{item.title}</strong>
                <span className="text-sm leading-snug">{item.body}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
