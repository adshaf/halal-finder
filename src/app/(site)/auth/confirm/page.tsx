import Link from "next/link";
import { Mail, Star } from "lucide-react";

export default function ConfirmPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">

        <div className="bg-dark-surface/80 border border-gold/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="h-1.5 w-full bg-linear-to-r from-gold via-deep-green to-gold" />

          <div className="p-10">
            <div className="size-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
              <Mail size={28} className="text-gold" />
            </div>

            <h2 className="font-display text-2xl font-bold text-slate-100 mb-3">
              Check your email
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              We&apos;ve sent a confirmation link to your email address. Click the link to activate your account and get started.
            </p>

            <Link
              href="/auth"
              className="inline-block text-sm font-semibold text-gold hover:underline underline-offset-4 transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center opacity-30">
          <div className="w-24 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
          <Star size={16} className="text-gold mx-4" />
          <div className="w-24 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </main>
  );
}
