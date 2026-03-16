import { HelpCircle } from "lucide-react";

export default function FaqHero() {
  return (
    <section className="pt-32 pb-16 px-6 border-b border-gold/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
          <HelpCircle size={14} />
          Support
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gold mb-6">
          Frequently Asked<br className="hidden sm:block" /> Questions
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about how HalalBites works — from reading
          our halal indicators to submitting a restaurant listing.
        </p>
      </div>
    </section>
  );
}
