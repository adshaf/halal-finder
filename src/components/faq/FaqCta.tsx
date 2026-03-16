import { Mail } from "lucide-react";
import Link from "next/link";

export default function FaqCta() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gold/5 border border-gold/20 p-8 md:p-12 text-center">
          <Mail className="text-gold mx-auto mb-5" size={36} aria-hidden="true" />
          <h2 className="font-display text-3xl font-bold text-gold mb-4">
            Still have questions?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            If you couldn&rsquo;t find what you were looking for, reach out and
            we&rsquo;ll get back to you as soon as we can.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-[#0a0f0d] px-8 py-3 rounded-full font-bold text-sm hover:bg-gold/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
