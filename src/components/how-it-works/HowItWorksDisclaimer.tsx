import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function HowItWorksDisclaimer() {
  return (
    <section className="py-16 px-6 border-b border-gold/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-gold mb-3">
          Important: About Our Information
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          We want to be upfront about how halal information on HalalBites works.
        </p>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle size={22} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-slate-100">HalalBites does not independently verify or audit any restaurant.</strong>{" "}
                All halal attributes shown on a listing — such as &ldquo;Halal
                Certified&rdquo;, &ldquo;No Alcohol&rdquo;, or &ldquo;Muslim
                Owned&rdquo; — are based on information provided by the
                restaurant, submitted by community members, or sourced from
                publicly available details.
              </p>
              <p>
                We make reasonable efforts to ensure listings are accurate, but
                we cannot guarantee the completeness or currency of any
                information. Halal certification status, ingredients, and
                kitchen practices can change over time.
              </p>
              <p className="font-medium text-slate-200">
                If halal compliance is important to you, always verify directly
                with the restaurant before dining — especially for formal halal
                certification.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
          <p>
            <strong className="text-slate-300">Spotted something incorrect?</strong>{" "}
            If a listing has wrong or outdated information, please contact us at{" "}
            <a
              href="mailto:support@halalbites.com.au"
              className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
            >
              support@halalbites.com.au
            </a>
            . We review all reports and update listings promptly.
          </p>
          <p>
            For more information on how we handle your data and your rights as a
            user, see our{" "}
            <Link
              href="/privacy"
              className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
