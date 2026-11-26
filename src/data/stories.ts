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
  { id: "tips", tone: "sun" },
];

// 
// Kuckle and "four voices" are from her Instagram. The rest are samples.
// TODO: replace titles, youtubeUrl and durations with the real videos.
export const STORIES: Story[] = [
  {
    id: "Df94PH5S9TE",
    publishedAt: "2026-11-22",
    thumbnail: "/images/stories/Df94PH5S9TE.webp",
    title: "Kuckle Starts School",
    kicker: "Kuckle's Adventures · Episode 4",
    category: "moral",
    language: "English",
    instagramUrl: `${IG_KIDS}/Df94PH5S9TE/`,
  },
  {
    id: "Df2CDmKyb5g",
    publishedAt: "2026-11-17",
    thumbnail: "/images/stories/Df2CDmKyb5g.webp",
    title: "Kuckle Takes It Slow",
    kicker: "Kuckle's Adventures", // posted between Ep 2 and Ep 4, probably Episode 3
    category: "moral",
    language: "English",
    instagramUrl: `${IG_KIDS}/Df2CDmKyb5g/`,
  },
  {
    id: "Dfzar_SNzq1",
    publishedAt: "2026-11-16",
    thumbnail: "/images/stories/Dfzar_SNzq1.webp",
    title: "Kuckle and the Dark",
    kicker: "Kuckle's Adventures · Episode 2",
    category: "moral",
    language: "English",
    instagramUrl: `${IG_KIDS}/Dfzar_SNzq1/`,
  },
  {
    id: "DfrqWPmJdO4",
    publishedAt: "2026-11-13",
    thumbnail: "/images/stories/DfrqWPmJdO4.webp",
    title: "Meet Kuckle, the Little Turtle",
    kicker: "Kuckle's Adventures · Episode 1",
    category: "bedtime",
    language: "English",
    instagramUrl: `${IG_KIDS}/DfrqWPmJdO4/`,
  },
  {
    id: "DfpOwwTTBJ-",
    publishedAt: "2026-11-12",
    thumbnail: "/images/stories/DfpOwwTTBJ-.webp",
    title: "Tara the Timid Tiger",
    kicker: "Word Builder · 3 new words",
    category: "moral",
    language: "English",
    instagramUrl: `${IG_KIDS}/DfpOwwTTBJ-/`,
  },
  /*{
    id: "DJWcmNKzmS9",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/DJWcmNKzmS9.webp",
    title: "The Pirate Who Was Afraid of Water",
    kicker: "Funny Story",
    category: "bedtime",
    language: "English",
    durationMin: 2,
    instagramUrl: `${IG_KIDS}/DJWcmNKzmS9/`,
    youtubeUrl: "https://www.youtube.com/shorts/b4uL_rbLAgM",
  },
  {
    id: "DJDS-dtsXSl",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/DJDS-dtsXSl.webp",
    title: "Lola the Llama Who Loved to Laugh",
    kicker: "Bedtime Story",
    category: "bedtime",
    language: "English",
    durationMin: 2,
    instagramUrl: `${IG_KIDS}/DJDS-dtsXSl/`,
    youtubeUrl: "https://www.youtube.com/shorts/SCVaDqx5nAk",
  },
  {
    id: "DI6Vky4MlmO",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/DI6Vky4MlmO.webp",
    title: "The Bumblebee Who Couldn't Buzz",
    kicker: "Bedtime Story",
    category: "bedtime",
    language: "English",
    durationMin: 2,
    instagramUrl: `${IG_KIDS}/DI6Vky4MlmO/`,
    youtubeUrl: "https://www.youtube.com/shorts/HbtPa_bB6uE",
  },*/

  // ── About Pratibha ──
  {
    id: "Df7NgiHSFX1",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/Df7NgiHSFX1.webp",
    title: "From the Stage to Bedtime Stories",
    kicker: "Meet Pratibha",
    category: "moms",
    language: "English",
    instagramUrl: `${IG_KIDS}/Df7NgiHSFX1/`,
  },
  {
    id: "DJgt2NSzQ8Q",
    publishedAt: "2025-05-11",
    thumbnail: "/images/stories/DJgt2NSzQ8Q.webp",
    title: "Happy Mother's Day",
    kicker: "For Every Mother",
    category: "moms",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJgt2NSzQ8Q/`,
  },

  // ── Tips for parents ──
  {
    id: "Df4nwssMWpG",
    publishedAt: "2026-11-19",
    thumbnail: "/images/stories/Df4nwssMWpG.webp",
    title: "One Story, Four Voices",
    kicker: "Storytelling Tip · Voices",
    category: "tips",
    language: "English",
    instagramUrl: `${IG_KIDS}/Df4nwssMWpG/`,
  },
  {
    id: "DfuZNFDzJfw",
    publishedAt: "2026-11-20",
    thumbnail: "/images/stories/DfuZNFDzJfw.webp",
    title: "Swap Scrolling for Storytelling",
    kicker: "Bedtime Tip",
    category: "tips",
    language: "English",
    instagramUrl: `${IG_KIDS}/DfuZNFDzJfw/`,
  },
  {
    id: "Dfmg0HNJkUt",
    publishedAt: "2026-11-11",
    thumbnail: "/images/stories/Dfmg0HNJkUt.webp",
    title: "The Best Screen-Time Alternative Is You",
    kicker: "Parenting Tip",
    category: "tips",
    language: "English",
    instagramUrl: `${IG_KIDS}/Dfmg0HNJkUt/`,
  },
  {
    id: "Dfj6fsRhrAo",
    publishedAt: "2026-11-10",
    thumbnail: "/images/stories/Dfj6fsRhrAo.webp",
    title: "Little Stories, Big Lessons",
    kicker: "Parenting Tip",
    category: "tips",
    language: "English",
    instagramUrl: `${IG_KIDS}/Dfj6fsRhrAo/`,
  },
  {
    id: "Dfhd2Fwz0q5",
    publishedAt: "2026-11-09",
    thumbnail: "/images/stories/Dfhd2Fwz0q5.webp",
    title: "5 Tiny Shifts for Calmer Bedtimes",
    kicker: "Bedtime Tip",
    category: "tips",
    language: "English",
    instagramUrl: `${IG_KIDS}/Dfhd2Fwz0q5/`,
  },
  {
    id: "DJT32_asXhm",  
    publishedAt: "2025-05-06",
    thumbnail: "/images/stories/DJT32_asXhm.webp",
    title: "Feeling Shy About Silly Voices?",
    kicker: "Storytelling Tip · Voices",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJT32_asXhm/`,
  },
  {
    id: "DJRS_tjMjXB",
    publishedAt: "2025-05-05",
    thumbnail: "/images/stories/DJRS_tjMjXB.webp",
    title: "Make Story Time Active",
    kicker: "Storytelling Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJRS_tjMjXB/`,
  },
  {
    id: "DJOuNvJs-K3",
    publishedAt: "2025-05-04",
    thumbnail: "/images/stories/DJOuNvJs-K3.webp",
    title: "Repetition Builds Memory, Twists Build Creativity",
    kicker: "Storytelling Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJOuNvJs-K3/`,
  },
  {
    id: "DJMJYfYMS29",
    publishedAt: "2025-05-03",
    thumbnail: "/images/stories/DJMJYfYMS29.webp",
    title: "Save Their Questions for the End",
    kicker: "Storytelling Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJMJYfYMS29/`,
  },
  {
    id: "DJJkpMZs2Km",
    publishedAt: "2025-05-02",
    thumbnail: "/images/stories/DJJkpMZs2Km.webp",
    title: "\"My Kid Won't Sit Still\"",
    kicker: "Parenting Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJJkpMZs2Km/`,
  },
  {
    id: "DJHDP-ws0_E",
    publishedAt: "2025-05-01",
    thumbnail: "/images/stories/DJHDP-ws0_E.webp",
    title: "Do You Listen to Your Child's Stories?",
    kicker: "Parenting Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJHDP-ws0_E/`,
  },
  {
    id: "DJAuI_TTcwG",
    publishedAt: "2025-04-29",
    thumbnail: "/images/stories/DJAuI_TTcwG.webp",
    title: "Stories Build Emotional Intelligence",
    kicker: "Why Stories Matter",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DJAuI_TTcwG/`,
  },
  {
    id: "DI-JTQMzKkp",
    publishedAt: "2025-04-28",
    thumbnail: "/images/stories/DI-JTQMzKkp.webp",
    title: "Rich in Toys, Poor in Connection?",
    kicker: "Parenting Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DI-JTQMzKkp/`,
  },
  {
    id: "DI72t4hz3uR",  
    publishedAt: "2025-04-27",
    thumbnail: "/images/stories/DI72t4hz3uR.webp",
    title: "The Magic of Reading Aloud",
    kicker: "Why Stories Matter",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DI72t4hz3uR/`,
  },
  {
    id: "DIygSw6TdfL",
    publishedAt: "2025-04-26",
    thumbnail: "/images/stories/DIygSw6TdfL.webp",
    title: "How to Build a Reading Habit in Kids",
    kicker: "Parenting Tip",
    category: "tips",
    language: "English", // check language
    instagramUrl: `${IG_KIDS}/DIygSw6TdfL/`,
  },
  

];

/** All stories, newest first. Use this everywhere instead of STORIES. */
export const STORIES_NEWEST = [...STORIES].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);
