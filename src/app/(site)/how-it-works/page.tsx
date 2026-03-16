import type { Metadata } from "next";
import HowItWorksHero from "@/components/how-it-works/HowItWorksHero";
import HowItWorksBadges from "@/components/how-it-works/HowItWorksBadges";
import HowItWorksListings from "@/components/how-it-works/HowItWorksListings";
import HowItWorksDisclaimer from "@/components/how-it-works/HowItWorksDisclaimer";

export const metadata: Metadata = {
  title: "How It Works | HalalBites",
  description:
    "Learn how HalalBites works — how listings are added, what the halal badges mean, and what to keep in mind when using the platform.",
};

export default function HowItWorksPage() {
  return (
    <div>
      <HowItWorksHero />
      <HowItWorksListings />
      <HowItWorksBadges />
      <HowItWorksDisclaimer />
    </div>
  );
}
