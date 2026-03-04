import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  return (
    <section className="relative px-6 lg:px-40 py-12 md:py-20">
      {/* Geometric background pattern */}
      <div className="geometric-pattern absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center gap-10 max-w-4xl mx-auto text-center">
        {/* Headline block */}
        <div className="flex flex-col gap-4">
          <span className="text-accent-gold font-display font-medium tracking-widest uppercase text-sm">
            Elevated Dining Experience
          </span>
          <h1 className="text-deep-green text-5xl md:text-7xl font-display font-black leading-tight tracking-tight">
            Experience Culinary Excellence
          </h1>
          <p className="text-slate-600 text-lg md:text-xl font-normal max-w-2xl mx-auto">
            Discover the finest curated Halal dining destinations with elegant
            precision and uncompromising quality.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl px-4">
          <div className="flex w-full items-stretch rounded-full h-16 bg-white shadow-xl border border-slate-100 overflow-hidden ring-4 ring-primary/5">
            <div className="text-deep-green flex items-center justify-center pl-6">
              <Search size={24} aria-hidden="true" />
            </div>
            <Input
              className="flex w-full border-none shadow-none bg-transparent focus-visible:ring-0 px-4 text-slate-900 placeholder:text-slate-400 text-base"
              placeholder="Search premium restaurants, cuisines, or locations..."
              aria-label="Search restaurants"
            />
            <div className="flex items-center pr-2">
              <Button className="bg-primary text-deep-green h-12 px-8 rounded-full font-bold text-sm hover:bg-primary/90 flex items-center gap-2">
                <span>Discover</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Button
            variant="dark"
            size="lg"
            className="min-w-[180px] rounded-full"
          >
            Discover Excellence
          </Button>
        </div>
      </div>
    </section>
  );
}
