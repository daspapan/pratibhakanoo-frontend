import type { Category, Story } from "@/types";

export const CHANNEL_URL = "https://www.youtube.com/@pratibhakanoo07";
export const IG_KIDS = "https://www.instagram.com/story_with_pratibha/reel";
export const IG_POETRY = "https://www.instagram.com/nature_everybit/reel";

export const SOCIAL_LINKS = {
  youtube: CHANNEL_URL,
  instagramKids: "https://www.instagram.com/story_with_pratibha/",
  instagram: "https://www.instagram.com/nature_everybit/",
  facebook: "https://www.facebook.com/pratibhakanoo",
} as const;

export const CATEGORIES: Category[] = [
  { id: "bedtime", tone: "plum" },
  { id: "rhymes", tone: "sky" },
  { id: "moral", tone: "mint" },
  { id: "moms", tone: "rose" },
];

// Kuckle and "four voices" are from her Instagram. The rest are samples.
// TODO: replace titles, youtubeUrl and durations with the real videos.
export const STORIES: Story[] = [
  {
    id: "Df94PH5S9TF",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "Kuckle Starts School",
    kicker: "Kuckle's Adventures · Episode 4",
    category: "moral",
    language: "English",
    youtubeUrl: `https://www.instagram.com/story_with_pratibha/reel/DgKpEa3JCbw/` // `https://www.youtube.com/shorts/1ChTP67vR_g` // `${IG_KIDS}/Df94PH5S9TE/`,
  },
  {
    id: "Df94PH5S9TE",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "Kuckle Starts School",
    kicker: "Kuckle's Adventures · Episode 4",
    category: "moral",
    language: "English",
    instagramUrl: `${IG_KIDS}/reel/Df94PH5S9TE/`,
  },
  {
    id: "kuckle-ep4",
    publishedAt: "2024-06-01",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "Kuckle's Adventure",
    kicker: "Series · Episode 4",
    category: "bedtime",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "four-voices",
    publishedAt: "2024-06-01",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "One story, four voices",
    kicker: "Voices",
    category: "bedtime",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "kuckle-origin",
    publishedAt: "2024-06-01",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "The real story behind Kuckle the turtle",
    kicker: "Behind the story",
    category: "moral",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "hindi-rhyme-1",
    publishedAt: "2024-06-01",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "नन्ही चिड़िया", // sample title
    kicker: "Rhyme · हिंदी",
    category: "rhymes",
    language: "Hindi",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "DI6Vky4MlmO",
    publishedAt: "2024-06-01",
    thumbnail: "/images/stories/Df94PH5S9TF.webp",
    title: "A story for the little one on the way",
    kicker: "For moms-to-be",
    category: "moms",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
];

/** All stories, newest first. Use this everywhere instead of STORIES. */
export const STORIES_NEWEST = [...STORIES].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);
