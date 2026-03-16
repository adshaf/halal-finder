"use client";

import { useState } from "react";
import Link from "next/link";
import FaqAccordionItem from "./FaqAccordionItem";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type Category = {
  label: string;
  items: FaqItem[];
};

const CATEGORIES: Category[] = [
  {
    label: "About HalalBites",
    items: [
      {
        question: "What is HalalBites?",
        answer:
          "HalalBites is a directory of halal-friendly restaurants and eateries in Australia. We help Muslims and halal-conscious diners discover restaurants based on their halal requirements — from fully halal-certified venues to places that offer no-pork or no-alcohol options.",
      },
      {
        question: "Is HalalBites free to use?",
        answer:
          "Yes — browsing, searching, and saving restaurants is completely free. Creating an account is also free and unlocks features like saving your favourite spots.",
      },
      {
        question: "Which areas does HalalBites cover?",
        answer:
          "We're currently focused on Australia, with listings growing across major cities. If you know a restaurant that isn't listed yet, you can submit it through our application form.",
      },
      {
        question: "Who runs HalalBites?",
        answer:
          "HalalBites is an independent platform built to serve the Muslim community and halal-conscious diners. We are not affiliated with any halal certification body. Our goal is to surface useful, accurate information — not to certify restaurants ourselves.",
      },
    ],
  },
  {
    label: "Using the Platform",
    items: [
      {
        question: "Do I need an account to use HalalBites?",
        answer:
          "No — you can browse and search restaurants without an account. However, creating a free account lets you save restaurants to your favourites and submit new listings.",
      },
      {
        question: "How do I save a restaurant to my favourites?",
        answer:
          "When viewing a restaurant listing, click the bookmark icon to save it. You can access all your saved restaurants from your account dashboard. You'll need to be logged in to use this feature.",
      },
      {
        question: "How does the search and filter work?",
        answer:
          "You can search by restaurant name, cuisine, or suburb. The filter panel on the search results page lets you narrow down by cuisine type, halal attributes (e.g. certified only, no alcohol, prayer room), and price range. You can also browse restaurants visually using the map view.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Not yet — HalalBites is currently a web app optimised for mobile browsers. A dedicated app may come in the future.",
      },
    ],
  },
  {
    label: "Submitting a Restaurant",
    items: [
      {
        question: "How do I suggest a restaurant to be added?",
        answer: (
          <span>
            Visit our{" "}
            <Link
              href="/application"
              className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
            >
              Submit a Listing
            </Link>{" "}
            page and fill out the application form. You&rsquo;ll need a free
            account to submit. Our admin team reviews all submissions before
            they go live.
          </span>
        ),
      },
      {
        question: "How long does it take for a submission to be reviewed?",
        answer:
          "We aim to review submissions within a few business days. You'll receive a notification once your submission has been approved or if we need more information.",
      },
      {
        question: "Can I submit a restaurant I don't own?",
        answer:
          "Yes — community members are welcome to submit restaurants they've visited. Just make sure the information you provide is accurate to the best of your knowledge. The restaurant will be reviewed by our team before going live.",
      },
      {
        question: "What information do I need to submit a listing?",
        answer:
          "At minimum, we need the restaurant name and location. Additional details like cuisine type, halal attributes, phone number, website, and opening hours all help make the listing more useful — but they're optional at submission stage.",
      },
    ],
  },
];

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Category tabs */}
        <div className="flex overflow-x-auto gap-1 mb-12 pb-px border-b border-gold/10 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeCategory === i
                  ? "text-gold border-gold"
                  : "text-slate-500 border-transparent hover:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {CATEGORIES[activeCategory].items.map((item) => (
            <FaqAccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
