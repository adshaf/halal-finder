import type { Metadata } from "next";
import FaqHero from "@/components/faq/FaqHero";
import FaqContent from "@/components/faq/FaqContent";
import FaqCta from "@/components/faq/FaqCta";

export const metadata: Metadata = {
  title: "FAQ | HalalBites",
  description:
    "Answers to common questions about HalalBites — how halal information is sourced, how to submit a restaurant, and how to get the most out of the platform.",
};

export default function FaqPage() {
  return (
    <div>
      <FaqHero />
      <FaqContent />
      <FaqCta />
    </div>
  );
}
