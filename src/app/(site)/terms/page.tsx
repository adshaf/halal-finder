import {
  BookOpen,
  Scale,
  Copyright,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Mail,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | HalalBites",
  description:
    "HalalBites terms and conditions — guidelines for using our platform, built on transparency, trust, and respect.",
};

export default function TermsPage() {
  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">

        {/* Page header */}
        <div className="mb-12 border-b border-gold/10 pb-8">
          <h1 className="font-display text-5xl font-bold mb-4 text-gold">
            Terms &amp; Conditions
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
              Welcome to HalalBites. These Terms and Conditions govern your use of
              our platform and services. By accessing or using HalalBites, you
              agree to be bound by these guidelines, which are built upon
              principles of transparency, honesty, and mutual respect.
            </p>
          </section>

          {/* Introduction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Introduction
              </h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Our goal is to provide an exceptional directory of premium Halal
                dining experiences. We invite all users to engage with our
                platform and each other with the utmost integrity and
                consideration for our shared community.
              </p>
            </div>
          </section>

          {/* User Rights & Responsibilities */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                User Rights &amp; Responsibilities
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-dark-surface/60 border border-gold/15">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" aria-hidden="true" />
                  Your Rights
                </h3>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li>Right to privacy and data protection.</li>
                  <li>Right to access our directory and curated recommendations freely.</li>
                  <li>Right to report inaccurate listings or unethical behaviour.</li>
                  <li>Right to close your account at any time.</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-dark-surface/60 border border-gold/15">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <AlertCircle size={16} className="text-gold" aria-hidden="true" />
                  Your Responsibilities
                </h3>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li>Maintaining the confidentiality of your account credentials.</li>
                  <li>Providing honest and constructive reviews and feedback.</li>
                  <li>Refraining from posting false or misleading information.</li>
                  <li>Respecting the intellectual property of the platform and its partners.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Copyright className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Intellectual Property
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              All content on HalalBites — including restaurant listings,
              photography, written descriptions, brand identity, and design
              elements — is the property of HalalBites or its respective content
              partners. This material is protected under applicable copyright and
              intellectual property laws.
            </p>
            <div className="bg-dark-surface/60 p-6 rounded-xl border-l-4 border-gold">
              <p className="italic text-slate-300 font-medium">
                &ldquo;We encourage the sharing of our curated recommendations,
                provided content is attributed to HalalBites and used for personal,
                non-commercial purposes only.&rdquo;
              </p>
            </div>
          </section>

          {/* Privacy & Data Ethics */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Privacy &amp; Data Ethics
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Your privacy is a trust we take seriously. We collect only the
              data necessary to improve your experience and will never sell your
              personal information to third parties. For a full breakdown of how
              we protect and manage your data, please refer to our{" "}
              <Link
                href="/privacy"
                className="text-gold underline font-bold underline-offset-4 hover:text-gold/80 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Contact CTA */}
          <section className="p-8 rounded-2xl bg-gold/5 border border-gold/20">
            <div className="flex items-start gap-4">
              <Mail className="text-gold shrink-0 mt-1" size={28} aria-hidden="true" />
              <div>
                <h2 className="font-display text-xl font-bold text-gold mb-2">
                  Questions about our terms?
                </h2>
                <p className="text-slate-300 mb-4">
                  Our team is here to help you understand your rights and our
                  shared responsibilities.
                </p>
                <a
                  href="mailto:support@halalbites.com.au"
                  className="inline-flex items-center gap-2 text-gold font-bold hover:underline underline-offset-4"
                >
                  support@halalbites.com.au
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
