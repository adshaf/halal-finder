import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  return (
    <section className="px-6 lg:px-40 py-20 bg-deep-green text-white overflow-hidden relative">
      {/* Geometric background pattern */}
      <div className="geometric-pattern absolute inset-0 opacity-10 pointer-events-none rotate-45 scale-150" />

      <div className="relative flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Left: copy + form */}
        <div className="flex-1">
          <h2 className="text-4xl font-display font-bold mb-6">
            Join the Inner Circle
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Receive exclusive invitations to tasting events, private openings,
            and curated dining guides delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <Input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 h-auto rounded-full bg-white/10 border border-white/20 focus-visible:ring-primary placeholder:text-slate-400 text-white"
            />
            <Button className="bg-primary text-deep-green font-bold px-8 py-4 h-auto rounded-full hover:bg-white hover:text-deep-green transition-colors">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Right: decorative element */}
        <div className="flex-1 hidden md:block">
          <div className="relative w-full aspect-square max-w-sm ml-auto">
            <div className="absolute inset-0 border-2 border-accent-gold/30 rounded-full animate-pulse" />
            <div className="absolute inset-8 border border-primary/20 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <UtensilsCrossed
                className="w-32 h-32 text-accent-gold/40"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
