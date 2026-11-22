import type { Category, Story } from "@/types";

export const CHANNEL_URL = "https://www.youtube.com/@pratibhakanoo07";

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
    id: "kuckle-ep4",
    thumbnail: "/images/stories/kuckle-ep4.webp",
    title: "Kuckle's Adventure",
    kicker: "Series · Episode 4",
    category: "bedtime",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "four-voices",
    thumbnail: "/images/stories/four-voices.webp",
    title: "One story, four voices",
    kicker: "Voices",
    category: "bedtime",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "kuckle-origin",
    thumbnail: "/images/stories/kuckle-origin.webp",
    title: "The real story behind Kuckle the turtle",
    kicker: "Behind the story",
    category: "moral",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "hindi-rhyme-1",
    thumbnail: "/images/stories/hindi-rhyme.webp",
    title: "नन्ही चिड़िया", // sample title
    kicker: "Rhyme · हिंदी",
    category: "rhymes",
    language: "Hindi",
    youtubeUrl: CHANNEL_URL,
  },
  {
    id: "moms-1",
    thumbnail: "/images/stories/moms-to-be.webp",
    title: "A story for the little one on the way",
    kicker: "For moms-to-be",
    category: "moms",
    language: "English",
    youtubeUrl: CHANNEL_URL,
  },
];
