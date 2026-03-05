import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-dark-surface">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-bg p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-5 blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-dark-surface opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 max-w-2xl leading-tight text-slate-100 relative z-10">
          Elevate Your{" "}
          <span className="text-gold italic">Dining Experience</span>
        </h2>
        <p className="text-slate-400 mb-10 max-w-lg relative z-10">
          Join over 50,000 food enthusiasts discovering the world&apos;s best
          halal kitchens every single day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <Link
            href="/auth"
            className="bg-gold text-dark-bg px-10 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
          >
            Create Your Account
          </Link>
          <Link
            href="/join"
            className="border border-gold text-gold px-10 py-4 rounded-xl font-bold hover:bg-gold/10 transition-all"
          >
            List Your Restaurant
          </Link>
        </div>
      </div>
    </section>
  );
}
