import {
  ShieldCheck,
  Database,
  Share2,
  Mail,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HalalFind",
  description:
    "How HalalFind collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-warm-dark min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">

        {/* Page header */}
        <div className="mb-12 border-b border-gold/10 pb-8">
          <h1 className="font-display text-5xl font-bold mb-4 text-gold">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <CalendarDays size={16} aria-hidden="true" />
            <span>Last updated: March 2025</span>
          </div>
        </div>

        <div className="space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed text-slate-300 font-display italic">
              At HalalFind, we take your privacy seriously. This policy outlines
              how we collect, use, and protect your personal information when you
              use our platform to discover premium Halal-certified establishments
              worldwide.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Database className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                We collect information you provide directly to us, such as when
                you create an account, search for restaurants, or leave reviews.
                This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account data: Name, email address, and profile preferences.</li>
                <li>Usage data: Your search history, saved locations, and favourite establishments.</li>
                <li>Location data: Real-time geographical information to provide localised search results.</li>
                <li>Device info: IP addresses, browser types, and operating system details.</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                How We Use Your Data
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" aria-hidden="true" />
                  Service Optimisation
                </h3>
                <p className="text-sm text-slate-400">
                  We use your preferences to personalise your feed and recommend
                  restaurants that match your dietary standards.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" aria-hidden="true" />
                  Safety &amp; Security
                </h3>
                <p className="text-sm text-slate-400">
                  Protecting our community from fraudulent reviews and ensuring
                  account integrity is our top priority.
                </p>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Share2 className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Information Sharing
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              We do not sell your personal data to third parties. We may share
              information with service providers who perform services on our
              behalf, such as cloud hosting or analytical tools, all of which are
              bound by strict confidentiality agreements.
            </p>
          </section>

          {/* Your Rights */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Your Rights
              </h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Depending on your location, you may have rights under applicable
                data protection law, including the right to:
              </p>
              <ul className="space-y-3 list-none pl-0">
                {[
                  "Access the personal data we hold about you.",
                  "Request correction of inaccurate information.",
                  "Request deletion of your personal data.",
                  "Object to or restrict how we process your data.",
                  "Request a portable copy of your data.",
                ].map((right) => (
                  <li key={right} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-primary mt-1 shrink-0"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="p-8 rounded-2xl bg-gold/5 border border-gold/20">
            <div className="flex items-start gap-4">
              <Mail className="text-gold shrink-0 mt-1" size={28} aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-bold text-gold mb-2">
                  Questions or Concerns?
                </h2>
                <p className="text-slate-300 mb-4">
                  If you have any questions regarding this Privacy Policy, please
                  contact our data protection officer.
                </p>
                <a
                  href="mailto:privacy@halalfind.com"
                  className="inline-flex items-center gap-2 text-gold font-bold hover:underline underline-offset-4"
                >
                  privacy@halalfind.com
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
