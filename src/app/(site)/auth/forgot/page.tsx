"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, Loader2, CheckCircle2, Star, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const linkExpired = searchParams.get("error") === "link_expired";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${location.origin}/auth/callback?next=/auth/reset`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-28">
      <div className="w-full max-w-md">

        <div className="bg-dark-surface/80 border border-gold/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="h-1.5 w-full bg-linear-to-r from-gold via-deep-green to-gold" />

          <div className="p-8">
            {sent ? (
              /* ── Success state ── */
              <div className="text-center">
                <div className="flex justify-center mb-5">
                  <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-primary" />
                  </div>
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">
                  Check your inbox
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  We've sent a password reset link to{" "}
                  <span className="text-slate-200 font-semibold">{email}</span>.
                </p>
                <p className="text-slate-500 text-xs mb-8">
                  The link expires in 1 hour. If you don't see it, check your spam folder.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
                >
                  <ArrowLeft size={15} /> Back to Sign In
                </Link>
              </div>
            ) : (
              /* ── Email form ── */
              <>
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold text-slate-100 mb-2">
                    Forgot password?
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Enter your email and we'll send you a reset link.
                  </p>
                </div>

                {linkExpired && (
                  <div className="flex items-center gap-3 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2.5 mb-5">
                    <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                    <p className="text-xs text-amber-300">
                      That reset link has expired. Request a new one below.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        autoFocus
                        className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-gold/15 rounded-lg focus:ring-2 focus:ring-gold/30 focus:border-gold/40 outline-none transition-all text-slate-100 placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold hover:brightness-110 text-dark-bg font-bold py-3 px-4 rounded-lg shadow-lg shadow-gold/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {!sent && (
            <div className="bg-gold/5 p-5 text-center border-t border-gold/10">
              <Link
                href="/auth"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-gold transition-colors"
              >
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          )}
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
