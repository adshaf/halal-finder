"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire up to mailing list provider
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 lg:px-20 bg-dark-surface">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-bg p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-dark-surface opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 max-w-2xl leading-tight text-slate-100 relative z-10">
          New Restaurants,{" "}
          <span className="text-gold italic">Straight to You</span>
        </h2>
        <p className="text-slate-400 mb-10 max-w-lg relative z-10">
          Get notified when new halal restaurants are added in Sydney. No spam —
          just the good stuff.
        </p>

        {submitted ? (
          <div className="flex items-center gap-3 text-primary font-bold text-lg relative z-10">
            <CheckCircle2 size={24} />
            You&apos;re on the list — we&apos;ll be in touch!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative z-10"
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-3 bg-dark-surface/60 border border-gold/15 rounded-xl focus-within:border-gold/40 transition-colors">
              <Mail size={18} className="text-gold shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-transparent outline-none text-slate-100 placeholder:text-slate-500 text-sm w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-gold text-dark-bg px-8 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-slate-600 text-xs mt-4 relative z-10">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
