import type { Category } from "@/types";

type Tone = Category["tone"];

/** Background + text colour pairs that pass contrast checks. */
export const TONE_BG: Record<Tone, string> = {
  plum: "bg-ink text-white",
  sky: "bg-sky text-sky-ink",
  mint: "bg-mint text-mint-ink",
  rose: "bg-rose text-rose-ink",
  sun: "bg-sun text-sun-ink",
};
