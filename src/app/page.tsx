import HeroSection from "@/components/home/HeroSection";
import CuratedCollections from "@/components/home/CuratedCollections";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex flex-col flex-1">
        <HeroSection />
        <CuratedCollections />
        <NewsletterSection />
      </main>
    </div>
  );
}
