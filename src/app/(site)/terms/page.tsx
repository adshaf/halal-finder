import {
  BookOpen,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Mail,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "halal yums terms and conditions — guidelines for using our platform, built on transparency, trust, and respect.",
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
            <span>Last updated: March 2026</span>
          </div>
        </div>

        <div className="space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed text-slate-300 font-display italic">
              Welcome to halal yums. These Terms and Conditions govern your use of
              our platform and services. By accessing or using halal yums, you
              agree to be bound by these guidelines. Please read them carefully
              before using the platform.
            </p>
          </section>

          {/* Introduction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                About halal yums
              </h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                halal yums is an Australian halal restaurant discovery platform that
                helps the Muslim community and halal-conscious diners find, save, and
                share halal dining options. Our directory is built from community
                submissions reviewed and managed by our team.
              </p>
              <p>
                halal yums is a listing directory only. We are not a halal
                certification body, and we do not independently audit or inspect any
                restaurant on our platform. See the{" "}
                <em>Halal Information Accuracy</em> section below for important
                information about how we source and represent halal status.
              </p>
              <p className="text-slate-400 text-sm">
                The halal yums name, logo, and platform design are the property of
                halal yums. Restaurant listing information belongs to the respective
                establishments.
              </p>
            </div>
          </section>

          {/* Halal Information Accuracy */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <TriangleAlert className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Halal Information Accuracy
              </h2>
            </div>
            <div className="bg-dark-surface/60 p-6 rounded-xl border-l-4 border-gold">
              <p className="text-slate-300 leading-relaxed">
                Halal status information displayed on halal yums is sourced from
                restaurant submissions, publicly available certification data, and
                community reports. While we make reasonable efforts to keep listings
                accurate and up to date, we cannot guarantee the ongoing halal
                compliance of any listed establishment.
              </p>
            </div>
            <div className="space-y-3 text-slate-300 leading-relaxed">
              <p>
                Certification status, ingredients, and preparation methods can change
                without notice. We strongly encourage users to verify halal status
                directly with the restaurant — particularly for stricter dietary
                requirements — before dining.
              </p>
              <p>
                A <strong className="text-slate-100">Verified</strong> badge on a
                listing indicates that the information was confirmed by someone with
                authority over the restaurant (e.g. an owner or manager). It does not
                constitute an independent halal audit or guarantee of compliance.
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
                  <li>Access and browse the halal yums directory freely.</li>
                  <li>Save restaurants to your personal saved list.</li>
                  <li>Submit new restaurant listings for review.</li>
                  <li>Report inaccurate or outdated listing information.</li>
                  <li>Request deletion of your account and associated data at any time.</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-dark-surface/60 border border-gold/15">
                <h3 className="font-bold mb-2 text-slate-100 flex items-center gap-2">
                  <AlertCircle size={16} className="text-gold" aria-hidden="true" />
                  Your Responsibilities
                </h3>
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li>Maintaining the confidentiality of your account credentials.</li>
                  <li>Submitting only accurate and honest listing information.</li>
                  <li>Not submitting duplicate, spam, or misleading listings.</li>
                  <li>Respecting the intellectual property of the platform.</li>
                  <li>Not attempting to manipulate or scrape the platform.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Listing Submissions */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Listing Submissions
              </h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Users may submit restaurants for inclusion in the halal yums
                directory. All submissions are reviewed by our team before being
                published. By submitting a listing, you confirm that the information
                provided is accurate to the best of your knowledge.
              </p>
              <p>
                We reserve the right to approve, reject, edit, or remove any listing
                at our discretion. Submissions that are found to be false, misleading,
                or submitted in bad faith may result in account suspension.
              </p>
            </div>
          </section>

          {/* Privacy & Data Ethics */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-primary shrink-0" size={24} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary">
                Privacy &amp; Data
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Your privacy is important to us. We collect only the data necessary to
              provide and improve the halal yums service and will never sell your
              personal information to third parties. For full details on how we
              collect, use, and protect your data, please read our{" "}
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
                  If you have any questions about these Terms and Conditions or
                  need to report a listing issue, please get in touch.
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
