export type Lang = "en" | "hi";

export type CategoryId = "bedtime" | "rhymes" | "moral" | "moms";

export interface Category {
  id: CategoryId;
  /** Tailwind classes for the chip / thumbnail colour */
  tone: "plum" | "sky" | "mint" | "rose" | "sun";
}

export interface Story {
  id: string;
  /** Date posted, yyyy-mm-dd. Used to show the newest stories first. */
  publishedAt: string;
  title: string;
  /** Small label above the title, e.g. "Series · Episode 4" */
  kicker: string;
  category: CategoryId;
  language: "English" | "Hindi";
  durationMin?: number;
  /** Optional mp3 in /public/audio. If missing, play opens YouTube. */
  audioUrl?: string;
  youtubeUrl?: string;
  thumbnail?: string;
  instagramUrl?: string;
}

export type SessionTypeId = "birthday" | "school" | "society" | "online";

export type AudienceId = "parents" | "schools" | "societies";

export interface SessionType {
  id: SessionTypeId;
  durationMin: number;
}

export interface BookingRequest {
  sessionType: SessionTypeId;
  /** ISO date, yyyy-mm-dd */
  date: string;
  /** 24h time, HH:mm */
  time: string;
  name: string;
  email: string;
}
