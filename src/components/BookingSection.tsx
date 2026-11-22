"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DAYS_AHEAD, DEFAULT_TIME_SLOTS, SESSION_TYPES } from "@/data/sessions";
import { createBooking, formatTime, GOOGLE_BOOKING_URL, upcomingDates } from "@/lib/booking";
import { localeFor } from "@/lib/i18n";
import type { SessionTypeId } from "@/types";
import { CalendarIcon } from "./Icons";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "success" | "error";

export default function BookingSection() {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);

  const [sessionType, setSessionType] = useState<SessionTypeId>("birthday");
  const [dates, setDates] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(DEFAULT_TIME_SLOTS[1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Dates depend on the visitor's clock, so build them on the client only.
  useEffect(() => {
    const next = upcomingDates(DAYS_AHEAD);
    setDates(next);
    setDate(next[0]);
  }, []);

  const dayLabel = (iso: string) => {
    const d = new Date(`${iso}T00:00:00`);
    return {
      weekday: d.toLocaleDateString(locale, { weekday: "short" }),
      day: d.toLocaleDateString(locale, { day: "numeric" }),
      full: d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" }),
    };
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!date) return;
    setStatus("sending");

    const result = await createBooking({ sessionType, date, time, name, email });

    if (result.ok) {
      setStatus("success");
    } else if (result.reason === "no-api" && GOOGLE_BOOKING_URL) {
      // No backend yet: hand over to the free Google Calendar booking page.
      window.open(GOOGLE_BOOKING_URL, "_blank", "noopener,noreferrer");
      setStatus("idle");
    } else {
      setStatus("error");
    }
  }

  const pill = (selected: boolean) =>
    `transition-all ${selected ? "border-brand bg-white shadow-[0_4px_14px_rgb(185_62_12/0.18)] scale-[1.02]" : "border-line bg-white"}`;

  return (
    <section id="book" className="px-5 pt-10">
      <Reveal>
        <h2 className="flex items-center gap-2 text-[26px] font-extrabold md:text-3xl">
          <CalendarIcon size={26} className="animate-float text-brand" />
          {t.booking.title}
        </h2>
        <p className="pt-2 text-base leading-relaxed text-ink-soft">{t.booking.body}</p>
      </Reveal>

      {status === "success" ? (
        <div role="status" className="mt-5 animate-pop-in rounded-[22px] bg-mint p-6 text-center text-lg font-bold text-mint-ink">
          <span aria-hidden className="mb-2 block text-4xl">✓</span>
          {t.booking.success}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 md:max-w-xl">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-bold text-ink-soft">{t.booking.sessionType}</legend>
            {SESSION_TYPES.map((s) => (
              <label
                key={s.id}
                className={`flex min-h-14 cursor-pointer items-center justify-between rounded-2xl border-2 px-4 text-base font-bold ${pill(
                  sessionType === s.id
                )}`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="sessionType"
                    value={s.id}
                    checked={sessionType === s.id}
                    onChange={() => setSessionType(s.id)}
                    className="h-4 w-4 accent-brand"
                  />
                  {t.booking.sessions[s.id]}
                </span>
                <span className="font-medium text-ink-soft">
                  {s.durationMin} {t.stories.min}
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-bold text-ink-soft">{t.booking.date}</legend>
            <div className="grid grid-cols-5 gap-1.5">
              {dates.map((iso) => {
                const { weekday, day } = dayLabel(iso);
                const selected = date === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDate(iso)}
                    className={`flex min-h-16 flex-col items-center justify-center rounded-[14px] text-[13px] font-semibold leading-tight transition-all ${
                      selected ? "scale-105 bg-ink text-white" : "bg-white text-ink hover:bg-cream-dark"
                    }`}
                  >
                    {weekday}
                    <b className="text-lg">{day}</b>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-bold text-ink-soft">{t.booking.time}</legend>
            <div className="grid grid-cols-3 gap-2">
              {DEFAULT_TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  aria-pressed={time === slot}
                  onClick={() => setTime(slot)}
                  className={`min-h-[46px] rounded-xl border-2 text-[15px] font-semibold ${pill(time === slot)}`}
                >
                  {formatTime(slot, locale)}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-bold text-ink-soft">
              {t.booking.name}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="min-h-12 rounded-xl border-2 border-line bg-white px-3.5 text-base font-medium text-ink outline-none focus:border-brand"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold text-ink-soft">
              {t.booking.email}
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="min-h-12 rounded-xl border-2 border-line bg-white px-3.5 text-base font-medium text-ink outline-none focus:border-brand"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "sending" || !date}
            className="min-h-[54px] rounded-[18px] bg-brand text-lg font-bold text-white transition-transform hover:bg-brand-dark active:scale-[0.98] disabled:opacity-60"
          >
            {status === "sending"
              ? t.booking.sending
              : `${t.booking.confirm}${date ? ` · ${dayLabel(date).full} · ${formatTime(time, locale)}` : ""}`}
          </button>

          {status === "error" && (
            <p role="alert" className="animate-pop-in text-center font-semibold text-brand">
              {t.booking.error}{" "}
              {GOOGLE_BOOKING_URL && (
                <a href={GOOGLE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  {t.booking.fallback}
                </a>
              )}
            </p>
          )}
          <p className="text-center text-[13px] text-ink-soft">{t.booking.note}</p>
        </form>
      )}
    </section>
  );
}
