import {
  ShieldCheck,
  Database,
  Share2,
  Mail,
  CalendarDays,
  CheckCircle2,
  Bot,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HalalBites",
  description:
    "How HalalBites collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">

        {/* Page header */}
        <div className="mb-12 border-b border-gold/10 pb-8">
          <h1 className="font-display text-5xl font-bold mb-4 text-gold">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <CalendarDays size={16} aria-hidden="true" />
            <span>Last updated: March 2026</span>
          </div>
        </div>

        <div className="space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed text-slate-300 font-display italic">
              At HalalBites, we take your privacy seriously. This policy explains
              what information we collect when you use our platform to discover
              halal dining options across Australia, how we use it, and how we
              keep it secure.
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
              <p>We collect only what is necessary to provide the HalalBites service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-slate-100">Account data:</strong> Your
                  email address and display name when you create an account.
                </li>
                <li>
                  <strong className="text-slate-100">Saved restaurants:</strong>{" "}
                  The listings you choose to save to your personal list.
                </li>
                <li>
                  <strong className="text-slate-100">Listing submissions:</strong>{" "}
                  Information you provide when submitting a restaurant, including
                  name, address, cuisine, and halal details.
                </li>
                <li>
                  <strong className="text-slate-100">Location data:</strong>{" "}
                  If you grant location permission, we use your approximate location
                  to show nearby restaurants on the map. This is not stored.
                </li>
                <li>
                  <strong className="text-slate-100">Device and usage data:</strong>{" "}
                  Basic technical information such as browser type and IP address,
                  used for security and platform stability.
                </li>
                <li>
                  <strong className="text-slate-100">reCAPTCHA data:</strong>{" "}
                  When you submit forms, Google reCAPTCHA v3 analyses interaction
                  signals to detect automated bot activity. See the Bot Protection
                  section below.
                </li>
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
              <div className="p-6 rounded-xl bg-dark-surface/60 border border-gold/15">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" aria-hidden="true" />
                  Platform Functionality
                </h3>
                <p className="text-sm text-slate-400">
                  To provide core features: account login, saving restaurants,
                  processing listing submissions, and displaying nearby results
                  on the map.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-dark-surface/60 border border-gold/15">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" aria-hidden="true" />
                  Security &amp; Integrity
                </h3>
                <p className="text-sm text-slate-400">
                  To protect the platform from spam submissions, fraudulent
                  accounts, and automated abuse using reCAPTCHA bot detection.
                </p>
              </div>
            </div>
          </section>

          {/* Bot Protection */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Bot className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Bot Protection (reCAPTCHA)
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              HalalBites uses Google reCAPTCHA v3 on forms (sign up, sign in,
              listing submissions, and contact). reCAPTCHA collects hardware and
              software information, such as device and application data, and sends
              this to Google for analysis. This data is used solely to determine
              whether form submissions are made by a human or an automated bot.
              By using HalalBites, you agree to Google&apos;s{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
              >
                Terms of Service
              </a>
              .
            </p>
          </section>

          {/* Information Sharing */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Share2 className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Information Sharing
              </h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                We do not sell your personal data. We use the following third-party
                services to operate HalalBites:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-slate-100">Supabase</strong> — our
                  database and authentication provider. Your account data and saved
                  restaurants are stored securely on Supabase infrastructure.
                </li>
                <li>
                  <strong className="text-slate-100">Google reCAPTCHA</strong> —
                  used for bot detection on form submissions.
                </li>
              </ul>
              <p>
                All third-party providers are bound by their own privacy policies
                and applicable data protection law.
              </p>
            </div>
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
                Under the Australian Privacy Act 1988 and applicable data
                protection legislation, you have the right to:
              </p>
              <ul className="space-y-3 list-none pl-0">
                {[
                  "Access the personal data we hold about you.",
                  "Request correction of inaccurate or outdated information.",
                  "Request deletion of your account and associated personal data.",
                  "Object to how we process your data.",
                  "Withdraw consent where processing is based on consent.",
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
              <p>
                To exercise any of these rights, please contact us at the address
                below.
              </p>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="p-8 rounded-2xl bg-gold/5 border border-gold/20">
            <div className="flex items-start gap-4">
              <Mail className="text-gold shrink-0 mt-1" size={28} aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-bold text-gold mb-2">
                  Privacy Questions or Requests
                </h2>
                <p className="text-slate-300 mb-4">
                  If you have any questions about this Privacy Policy, or wish to
                  exercise your data rights, please contact us.
                </p>
                <a
                  href="mailto:ad.shafstudio@gmail.com"
                  className="inline-flex items-center gap-2 text-gold font-bold hover:underline underline-offset-4"
                >
                  ad.shafstudio@gmail.com
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
