import type { AudienceId, CategoryId, Lang, SessionTypeId } from "@/types";

/**
 * All UI copy in one place. Hindi strings are a first draft,
 * so have Pratibha read them over before launch.
 */
const en = {
  brand: "Story with Pratibha",
  menu: { open: "Open menu", close: "Close menu", language: "Language" },
  nav: { home: "Home", stories: "Stories", rhymes: "Rhymes", sessions: "Sessions", book: "Book" },
  hero: {
    eyebrow: "Stories & rhymes for kids · English + हिंदी",
    title: "Once upon a time, every single night.",
    body: "Gentle stories that help your child imagine and learn new words. Told by Pratibha, a trained actor and certified child educator.",
    play: "Play tonight's story",
    book: "Book a story session",
    photoAlt: "Pratibha smiling with her microphone",
  },
  categories: {
    all: "All",
    bedtime: "Bedtime",
    rhymes: "Rhymes",
    moral: "Moral stories",
    moms: "For moms-to-be",
    tips: "Tips & tricks",
  } satisfies Record<CategoryId | "all", string>,
  stories: {
    title: "New stories",
    seeAll: "See all on YouTube",
    play: "Play",
    empty: "New stories in this shelf soon.",
    min: "min",
    prev: "Previous page",
    next: "Next page",
    page: "Page",
    pageOf: "Page {page} of {total} · swipe for more",
  },
  audiences: {
    title: "Stories for every circle",
    body: "Whether it's one child at bedtime or a hall full of families, every session is built around the listeners.",
    cta: "Plan a session",
    items: {
      parents: {
        title: "For parents",
        body: "Bedtime stories, rhymes and birthday story parties that build imagination and vocabulary.",
      },
      schools: {
        title: "For schools",
        body: "Classroom and library sessions that tie stories to values, language and listening skills.",
      },
      societies: {
        title: "For societies",
        body: "Festival evenings and weekend story circles that bring kids and families together.",
      },
    } satisfies Record<AudienceId, { title: string; body: string }>,
  },
  benefits: {
    title: "Why parents press play",
    items: [
      { title: "Sparks imagination", body: "Voices and sounds that paint pictures." },
      { title: "New words", body: "In English and Hindi, side by side." },
      { title: "Calm bedtimes", body: "Soft pacing to wind down." },
      { title: "Good values", body: "Fables with a gentle moral." },
    ],
  },
  about: {
    title: "Hi, I'm Pratibha",
    subtitle: "Mom · Writer · Storyteller",
    body: "I used to perform on stage. Now my favourite audience is a little one at bedtime. I write, narrate and voice every story myself.",
    badges: ["Trained actor", "Certified child educator", "Bhubaneswar"],
  },
  booking: {
    title: "Book a story session",
    body: "Birthdays, schools, housing societies or an online story circle. Pick a slot and it lands straight on Pratibha's calendar.",
    sessionType: "Session type",
    date: "Date",
    time: "Time",
    name: "Your name",
    email: "Email",
    confirm: "Confirm",
    sending: "Booking…",
    note: "Synced with Google Calendar · confirmation by email",
    success: "You're booked! Check your email for the calendar invite.",
    error: "Something went wrong. Please try again or use the booking page.",
    fallback: "Open booking page",
    sessions: {
      birthday: "Birthday storytelling",
      school: "School or library visit",
      society: "Society or community event",
      online: "Online story circle",
    } satisfies Record<SessionTypeId, string>,
  },
  player: { pause: "Pause", play: "Play", close: "Close player", nowPlaying: "Now playing" },
  footer: { rights: "pratibhakanoo.com" },
};

export type Dictionary = typeof en;

const hi: Dictionary = {
  brand: "कहानी प्रतिभा के साथ",
  menu: { open: "मेन्यू खोलें", close: "मेन्यू बंद करें", language: "भाषा" },
  nav: { home: "होम", stories: "कहानियाँ", rhymes: "कविताएँ", sessions: "सत्र", book: "बुक करें" },
  hero: {
    eyebrow: "बच्चों के लिए कहानियाँ और कविताएँ · English + हिंदी",
    title: "एक था ज़माना… हर रात एक नई कहानी।",
    body: "प्यारी कहानियाँ जो बच्चों की कल्पना जगाएँ और नए शब्द सिखाएँ। प्रशिक्षित अभिनेत्री और प्रमाणित बाल शिक्षिका प्रतिभा की आवाज़ में।",
    play: "आज की कहानी सुनें",
    book: "कहानी सत्र बुक करें",
    photoAlt: "माइक के साथ मुस्कुराती प्रतिभा",
  },
  categories: {
    all: "सभी",
    bedtime: "सोने से पहले",
    rhymes: "कविताएँ",
    moral: "नैतिक कहानियाँ",
    moms: "होने वाली माँओं के लिए",
    tips: "टिप्स और ट्रिक्स",
  },
  stories: {
    title: "नई कहानियाँ",
    seeAll: "YouTube पर सभी देखें",
    play: "सुनें",
    empty: "इस शेल्फ़ में जल्द नई कहानियाँ।",
    min: "मिनट",
    prev: "पिछला पेज",
    next: "अगला पेज",
    page: "पेज",
    pageOf: "पेज {page} / {total} · और देखने के लिए स्वाइप करें",
  },
  audiences: {
    title: "हर समूह के लिए कहानियाँ",
    body: "सोने से पहले एक बच्चा हो या परिवारों से भरा हॉल, हर सत्र श्रोताओं के हिसाब से बनाया जाता है।",
    cta: "सत्र की योजना बनाएँ",
    items: {
      parents: {
        title: "माता-पिता के लिए",
        body: "सोने से पहले की कहानियाँ, कविताएँ और जन्मदिन पर कहानी पार्टी, जो कल्पना और शब्दावली बढ़ाएँ।",
      },
      schools: {
        title: "स्कूलों के लिए",
        body: "कक्षा और लाइब्रेरी सत्र जो कहानियों को संस्कार, भाषा और सुनने की कला से जोड़ें।",
      },
      societies: {
        title: "सोसाइटी के लिए",
        body: "त्योहार की शामें और वीकेंड कहानी मंडली, जो बच्चों और परिवारों को साथ लाएँ।",
      },
    },
  },
  benefits: {
    title: "माता-पिता क्यों पसंद करते हैं",
    items: [
      { title: "कल्पना को पंख", body: "आवाज़ें जो तस्वीरें बना दें।" },
      { title: "नए शब्द", body: "अंग्रेज़ी और हिंदी, साथ-साथ।" },
      { title: "सुकून भरी रात", body: "धीमी, शांत कहानियाँ।" },
      { title: "अच्छे संस्कार", body: "सीख देने वाली कथाएँ।" },
    ],
  },
  about: {
    title: "नमस्ते, मैं प्रतिभा हूँ",
    subtitle: "माँ · लेखिका · कहानीकार",
    body: "पहले मैं मंच पर अभिनय करती थी। अब मेरे सबसे प्यारे श्रोता सोने से पहले के नन्हे बच्चे हैं। हर कहानी मैं खुद लिखती और सुनाती हूँ।",
    badges: ["प्रशिक्षित अभिनेत्री", "प्रमाणित बाल शिक्षिका", "भुवनेश्वर"],
  },
  booking: {
    title: "कहानी सत्र बुक करें",
    body: "जन्मदिन, स्कूल, सोसाइटी या ऑनलाइन कहानी मंडली। समय चुनें, और वह सीधे प्रतिभा के कैलेंडर में जुड़ जाएगा।",
    sessionType: "सत्र का प्रकार",
    date: "तारीख़",
    time: "समय",
    name: "आपका नाम",
    email: "ईमेल",
    confirm: "पक्का करें",
    sending: "बुक हो रहा है…",
    note: "Google Calendar से जुड़ा · ईमेल पर पुष्टि",
    success: "बुकिंग हो गई! कैलेंडर आमंत्रण के लिए ईमेल देखें।",
    error: "कुछ गड़बड़ हुई। दोबारा कोशिश करें या बुकिंग पेज खोलें।",
    fallback: "बुकिंग पेज खोलें",
    sessions: {
      birthday: "जन्मदिन पर कहानी",
      school: "स्कूल या लाइब्रेरी",
      society: "सोसाइटी या सामुदायिक कार्यक्रम",
      online: "ऑनलाइन कहानी मंडली",
    },
  },
  player: { pause: "रोकें", play: "चलाएँ", close: "प्लेयर बंद करें", nowPlaying: "अभी चल रहा है" },
  footer: { rights: "pratibhakanoo.com" },
};

export const dictionaries: Record<Lang, Dictionary> = { en, hi };

/** Locale string for Intl date formatting. */
export const localeFor = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");
