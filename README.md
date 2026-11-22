# Story with Pratibha · website

Mobile-first site for **pratibhakanoo.com**, built with Next.js 16, React 19, TypeScript and Tailwind CSS 4.
Bilingual (English / हिंदी), animated, and exported as static files, so hosting costs almost nothing.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in your booking link
npm run dev                  # http://localhost:3000
npm run build                # static site in ./out
```

Node 20 or newer.

## Where things live

```
src/
  app/            layout (fonts, SEO), page (section order), globals.css (colours + animations)
  components/     one file per section: Header, Hero, StoriesSection, Audiences, Benefits,
                  AboutCard, BookingSection, MiniPlayer, BottomNav, Footer
  context/        LanguageContext (EN/हिं toggle), PlayerContext (shared audio player)
  data/           stories.ts (episodes + social links), sessions.ts (session types, time slots)
  lib/            i18n.ts (ALL text, both languages), booking.ts (booking API call)
public/
  images/         see IMAGE_PROMPTS.md for every file and its prompt
  audio/          optional mp3s for the built-in player
```

**Common edits**
- Change any wording → `src/lib/i18n.ts` (English and Hindi side by side; have the Hindi proofread).
- Add a story → add an entry in `src/data/stories.ts`. If you add `audioUrl: "/audio/my-story.mp3"` it plays in the site's mini player; otherwise Play opens YouTube.
- Change colours → the `@theme` block at the top of `src/app/globals.css`.
- Session types, durations, time slots → `src/data/sessions.ts`.

## Animations

All CSS, defined in `globals.css`: drifting clouds, twinkling stars and a floating moon on the banner, a pulsing "Play" button, scroll-in reveals on every section (`<Reveal>`), hover lifts and zooms on cards, an equalizer on the story that's playing, wiggling icons, and pop-in menus and confirmations. Everything switches off automatically for visitors with "reduce motion" turned on.

## Booking

The booking form works in two modes:

1. **No backend (free, start here):** set `NEXT_PUBLIC_GOOGLE_BOOKING_URL` to your Google Calendar appointment-schedule link. "Confirm" opens that page, and Google adds the booking to the calendar.
2. **Own backend:** set `NEXT_PUBLIC_BOOKING_API_URL` to an API (e.g. API Gateway + Lambda that calls the Google Calendar API). The form POSTs to `{API_URL}/book`:
   ```json
   { "sessionType": "school", "date": "2026-11-24", "time": "16:00", "name": "…", "email": "…" }
   ```
   Return 2xx on success. Enable CORS for `https://www.pratibhakanoo.com`.

## Deploy on AWS (low cost)

The site is static (`output: "export"`), so there's no server to pay for.

1. `npm run build` → upload `out/` to a private S3 bucket:
   `aws s3 sync out/ s3://YOUR-BUCKET --delete`
2. CloudFront distribution with the bucket as origin (Origin Access Control), default root object `index.html`.
3. ACM certificate in **us-east-1** for `pratibhakanoo.com` and `www.pratibhakanoo.com`, attached to CloudFront.
4. Route 53: A/AAAA **alias** records for both names pointing at the distribution.
5. After each deploy: `aws cloudfront create-invalidation --distribution-id XXX --paths "/*"`

Simpler alternative: connect the repo to **AWS Amplify Hosting**, which builds on every git push. It costs a little more than S3 but needs no manual steps, and you can still keep the domain in Route 53.
