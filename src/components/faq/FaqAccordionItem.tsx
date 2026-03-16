"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  question: string;
  answer: React.ReactNode;
};

export default function FaqAccordionItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gold/15 rounded-xl overflow-hidden bg-dark-surface/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-dark-surface/80 transition-colors"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-slate-100">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gold shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-6 pb-6 pt-1 text-slate-400 leading-relaxed border-t border-gold/10">
          {answer}
        </div>
      </div>
    </div>
  );
}
