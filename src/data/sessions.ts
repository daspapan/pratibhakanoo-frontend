import type { SessionType } from "@/types";

export const SESSION_TYPES: SessionType[] = [
  { id: "birthday", durationMin: 45 },
  { id: "school", durationMin: 60 },
  { id: "society", durationMin: 60 },
  { id: "online", durationMin: 30 },
];

/** Slots shown for every day. Swap for real availability from your API later. */
export const DEFAULT_TIME_SLOTS = ["10:00", "16:00", "18:30"];

/** How many upcoming days to show in the date picker. */
export const DAYS_AHEAD = 5;
