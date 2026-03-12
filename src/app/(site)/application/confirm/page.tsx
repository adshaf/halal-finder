import Link from "next/link";
import { CheckCircle2, ChevronRight, Search } from "lucide-react";

export default function ApplicationConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-3xl font-bold text-slate-100 mb-3">
          Application Submitted!
        </h1>
        <p className="text-slate-400 leading-relaxed mb-8">
          Thanks for contributing to HalalBites. Our team will review your
          submission and verify the details before it goes live. We&apos;ll
          notify you once it&apos;s approved.
        </p>

        {/* Divider */}
        <div className="h-px bg-gold/10 mb-8" />

        {/* What happens next */}
        <div className="bg-dark-surface/60 border border-gold/10 rounded-2xl p-6 text-left mb-8 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            What happens next
          </p>
          {[
            "Our team reviews your submission, typically within 2–5 business days.",
            "We verify halal credentials and contact the restaurant if needed.",
            "Once approved, the listing goes live and you can see it in your dashboard.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-gold/20 border border-gold/30 text-gold text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-400">{step}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 bg-gold text-dark-bg font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all text-sm"
          >
            View My Applications <ChevronRight size={15} />
          </Link>
          <Link
            href="/searchResults"
            className="flex-1 flex items-center justify-center gap-2 bg-dark-surface border border-gold/20 text-slate-300 font-semibold px-6 py-3 rounded-xl hover:border-gold/40 transition-colors text-sm"
          >
            <Search size={14} /> Explore Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
}
