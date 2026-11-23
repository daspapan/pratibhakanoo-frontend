import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StoriesSection from "@/components/StoriesSection";
import Audiences from "@/components/Audiences";
import Benefits from "@/components/Benefits";
import AboutCard from "@/components/AboutCard";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  return (
    
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.pratibhakanoo.com/#website",
                url: "https://www.pratibhakanoo.com/",
                name: "Story with Pratibha",
                inLanguage: ["en-IN", "hi-IN"],
                publisher: { "@id": "https://www.pratibhakanoo.com/#pratibha" },
              },
              {
                "@type": "Person",
                "@id": "https://www.pratibhakanoo.com/#pratibha",
                name: "Pratibha Kanoo",
                url: "https://www.pratibhakanoo.com/",
                image: "https://www.pratibhakanoo.com/images/pratibha-portrait.webp",
                jobTitle: "Storyteller, Writer, Anchor and Dramatist",
                description:
                  "Storyteller for kids in English and Hindi, spoken word artist, trained actor and certified child educator based in Bhubaneswar.",
                address: { "@type": "PostalAddress", addressLocality: "Bhubaneswar", addressRegion: "Odisha", addressCountry: "IN" },
                knowsLanguage: ["en", "hi"],
                sameAs: [
                  "https://www.youtube.com/@pratibhakanoo07",
                  "https://www.instagram.com/story_with_pratibha/",
                  "https://www.instagram.com/nature_everybit/",
                  "https://www.facebook.com/pratibhakanoo",
                ],
              },
              {
                "@type": "Service",
                name: "Storytelling sessions for kids",
                serviceType: "Children's storytelling",
                provider: { "@id": "https://www.pratibhakanoo.com/#pratibha" },
                areaServed: [{ "@type": "City", name: "Bhubaneswar" }, { "@type": "Country", name: "India" }],
                audience: { "@type": "Audience", audienceType: "Parents, schools, housing societies" },
                availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://www.pratibhakanoo.com/#book" },
              },
            ],
          }),
        }}
      />
      <Header />
      <main className="mx-auto max-w-5xl pb-10">
        <Hero />
        <StoriesSection />
        <Audiences />
        <Benefits />
        <AboutCard />
        <BookingSection />
      </main>
      <Footer />
      <MiniPlayer />
      <BottomNav />
    </>
  );
}
