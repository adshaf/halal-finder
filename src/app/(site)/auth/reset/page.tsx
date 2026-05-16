"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [sessionReady, setSessionReady] = useState(false);

  // Verify the user arrived here via a valid recovery session
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/auth/forgot");
      } else {
        setSessionReady(true);
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2500);
    }
  }

  if (!sessionReady) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-28">
      <div className="w-full max-w-md">

        <div className="bg-dark-surface/80 border border-gold/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="h-1.5 w-full bg-linear-to-r from-gold via-deep-green to-gold" />

          <div className="p-8">
            {done ? (
              /* ── Success state ── */
              <div className="text-center">
                <div className="flex justify-center mb-5">
                  <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-primary" />
                  </div>
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-100 mb-2">
                  Password updated
                </h2>
                <p className="text-slate-400 text-sm">
                  Your password has been changed. Redirecting you to your dashboard…
                </p>
              </div>
            ) : (
              /* ── Reset form ── */
              <>
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold text-slate-100 mb-2">
                    Set new password
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Choose a strong password for your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        required
                        minLength={6}
                        autoFocus
                        className="w-full pl-11 pr-12 py-3 bg-dark-bg border border-gold/15 rounded-lg focus:ring-2 focus:ring-gold/30 focus:border-gold/40 outline-none transition-all text-slate-100 placeholder:text-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Repeat your password"
                        required
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
                      "Update Password"
                    )}
                  </button>
                </form>
              </>
            )}
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
