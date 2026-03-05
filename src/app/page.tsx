import HomeNavbar from "@/components/home/HomeNavbar";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import CTASection from "@/components/home/CTASection";
import HomeFooter from "@/components/home/HomeFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg overflow-x-hidden">
      <HomeNavbar />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedCollections />
        <CTASection />
      </main>
      <HomeFooter />
    </div>
  );
}
