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
