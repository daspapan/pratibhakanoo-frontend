import type { BookingRequest } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL;
export const GOOGLE_BOOKING_URL = process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL ?? "";

export type BookingResult =
  | { ok: true }
  | { ok: false; reason: "no-api" | "error"; message?: string };

/**
 * Sends a booking to your backend (e.g. API Gateway → Lambda → Google Calendar API).
 * When no API is configured we return "no-api" so the UI can send people
 * to the free Google Calendar booking page instead.
 */
export async function createBooking(req: BookingRequest): Promise<BookingResult> {
  if (!API_URL) return { ok: false, reason: "no-api" };

  try {
    const res = await fetch(`${API_URL.replace(/\/$/, "")}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, reason: "error", message: text || res.statusText };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: "error", message: (err as Error).message };
  }
}

/** Next `count` days starting today, as yyyy-mm-dd strings in local time. */
export function upcomingDates(count: number, from = new Date()): string[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    return toIsoDate(d);
  });
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** "16:00" → "4:00 pm" (or Hindi digits/labels via Intl). */
export function formatTime(time: string, locale: string): string {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
}
