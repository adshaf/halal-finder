import type { Metadata } from "next";
import Link from "next/link";
import HalalGuideHero from "@/components/halal-guide/HalalGuideHero";

export const metadata: Metadata = {
  title: "Halal Guide | HalalBites",
  description:
    "A guide to understanding halal food — what halal means, what makes food haram, how halal certification works in Australia, and tips for dining out.",
};

export default function HalalGuidePage() {
  return (
    <div>
      <HalalGuideHero />

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* What is Halal */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gold">
            What Does Halal Mean?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            &ldquo;Halal&rdquo; is an Arabic word meaning <em>permissible</em>.
            In the context of food, it refers to what is allowed under Islamic
            dietary law. The opposite is <em>haram</em>, meaning forbidden.
          </p>
          <p className="text-slate-400 leading-relaxed">
            For most Muslims, eating halal is a religious obligation — not a
            preference. This makes accurate, reliable information about
            restaurant practices genuinely important.
          </p>
        </section>

        <hr className="border-gold/10" />

        {/* What makes food haram */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gold">
            What Makes Food Haram?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            The main categories of haram food and drink are:
          </p>
          <ul className="space-y-3 text-slate-400 leading-relaxed list-none">
            {[
              [
                "Pork and pork derivatives",
                "including lard, gelatin from pork, and any product containing pig meat.",
              ],
              [
                "Alcohol",
                "in any form — including wine used in cooking, beer-battered food, and alcohol-based flavourings.",
              ],
              [
                "Improperly slaughtered meat",
                "Meat from animals not slaughtered according to dhabiha (Islamic slaughter) is not halal, even if the animal itself is a permitted species.",
              ],
              [
                "Blood",
                "Flowing blood is forbidden. This is why halal slaughter involves draining the blood fully.",
              ],
              [
                "Cross-contamination",
                "Food that is technically halal can become haram through contact with haram ingredients — such as using the same oil to fry pork and chicken.",
              ],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-3">
                <span className="text-primary mt-1 shrink-0">—</span>
                <span>
                  <strong className="text-slate-200">{term}:</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="border-gold/10" />

        {/* Halal slaughter */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gold">
            Halal Slaughter (Dhabiha)
          </h2>
          <p className="text-slate-300 leading-relaxed">
            For meat to be halal, the animal must be slaughtered according to
            dhabiha — a method prescribed in Islamic law. The key requirements
            are:
          </p>
          <ul className="space-y-3 text-slate-400 leading-relaxed list-none">
            {[
              "The animal must be alive and healthy at the time of slaughter.",
              "A Muslim must perform the slaughter, reciting the name of God (Bismillah) before the cut.",
              "The cut must sever the windpipe, oesophagus, and blood vessels in a single swift motion.",
              "Blood must be fully drained from the carcass.",
              "The animal must not have been stunned in a way that causes death prior to slaughter (though pre-slaughter stunning is accepted by some certification bodies if the animal survives).",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span className="text-primary mt-1 shrink-0">—</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-500 text-sm italic">
            Note: There are minor differences of opinion among Islamic scholars
            on certain points, particularly around stunning. If this matters to
            you, ask the restaurant which certification body they use and check
            that body&rsquo;s standards.
          </p>
        </section>

        <hr className="border-gold/10" />

        {/* Seafood */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gold">
            Is Seafood Halal?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Generally, yes — seafood is considered halal by the majority of
            Islamic scholars. Fish and most seafood do not require slaughter in
            the same way as land animals.
          </p>
          <p className="text-slate-400 leading-relaxed">
            There are minor differences between madhabs (schools of Islamic
            jurisprudence): the Hanafi school, for example, restricts seafood to
            fish only, excluding shellfish. Most Muslims in Australia follow
            positions that permit seafood broadly, but individuals differ.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The main concern at restaurants is cross-contamination — seafood
            cooked in the same oil as non-halal items, or served with
            alcohol-based sauces.
          </p>
        </section>

        <hr className="border-gold/10" />

        {/* Certification in Australia */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gold">
            Halal Certification in Australia
          </h2>
          <p className="text-slate-300 leading-relaxed">
            In Australia, halal certification is voluntary — there is no
            government-mandated standard. Restaurants and food producers apply
            to independent certification bodies, which inspect their premises
            and practices before issuing a certificate.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Well-known certification bodies operating in Australia include the
            Australian Federation of Islamic Councils (AFIC), the Halal
            Certification Authority (HCA), and various state-based Islamic
            councils. Each body has its own standards, particularly around
            stunning.
          </p>
          <p className="text-slate-400 leading-relaxed">
            A halal certificate is not permanent — it requires renewal and
            ongoing compliance. If a restaurant displays a certificate, it is
            worth checking the issuing body and expiry date if formal
            certification is important to you.
          </p>
        </section>

        <hr className="border-gold/10" />

        {/* Dining tips */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-gold">
            Tips for Dining Out
          </h2>
          <ul className="space-y-3 text-slate-400 leading-relaxed list-none">
            {[
              [
                "Ask about the meat source",
                "If a restaurant isn't certified, ask where they source their meat and whether it is halal-slaughtered.",
              ],
              [
                "Check for alcohol in cooking",
                "Some dishes use wine, beer, or spirits in their preparation. Always ask if you're unsure.",
              ],
              [
                "Ask about shared fryers",
                "Many restaurants fry both halal and non-halal items in the same oil. Ask specifically if this is the case.",
              ],
              [
                "Look for the certificate",
                "Certified restaurants will usually display their certificate. You can ask to see it.",
              ],
              [
                "Use HalalBites filters",
                "Filter by 'Halal Certified', 'No Alcohol', or 'No Pork' to narrow down restaurants that match your requirements.",
              ],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-3">
                <span className="text-primary mt-1 shrink-0">—</span>
                <span>
                  <strong className="text-slate-200">{term}:</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
