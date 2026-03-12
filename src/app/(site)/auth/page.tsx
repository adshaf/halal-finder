"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Star, Loader2, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    setError("");

    const supabase = createClient();

    if (tab === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push(next);
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim() || undefined },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/auth/confirm");
      }
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 pt-28">
      <div className="w-full max-w-md">

        {/* Auth Card */}
        <div className="bg-dark-surface/80 border border-gold/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">

          {/* Decorative top bar */}
          <div className="h-1.5 w-full bg-linear-to-r from-gold via-deep-green to-gold" />

          <div className="p-8">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-slate-100 mb-2">
                {tab === "signin" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-slate-400 text-sm">
                Join the community finding the best halal spots.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gold/20 mb-8">
              <button
                onClick={() => { setTab("signin"); setError(""); }}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                  tab === "signin"
                    ? "border-gold text-gold"
                    : "border-transparent text-slate-400 hover:text-gold"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setTab("register"); setError(""); }}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                  tab === "register"
                    ? "border-gold text-gold"
                    : "border-transparent text-slate-400 hover:text-gold"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-gold/15 rounded-lg focus:ring-2 focus:ring-gold/30 focus:border-gold/40 outline-none transition-all text-slate-100 placeholder:text-slate-500"
                    />
                  </div>
                </div>
              )}

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
                    className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-gold/15 rounded-lg focus:ring-2 focus:ring-gold/30 focus:border-gold/40 outline-none transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  {tab === "signin" && (
                    <Link href="/auth/forgot" className="text-xs font-semibold text-gold hover:underline underline-offset-4">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
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

              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:brightness-110 text-dark-bg font-bold py-3 px-4 rounded-lg shadow-lg shadow-gold/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>{tab === "signin" ? "Sign In" : "Create Account"}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Card footer */}
          <div className="bg-gold/5 p-6 text-center border-t border-gold/10">
            <p className="text-sm text-slate-400">
              {tab === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => { setTab("register"); setError(""); }}
                    className="font-bold text-primary hover:underline underline-offset-4 ml-1"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => { setTab("signin"); setError(""); }}
                    className="font-bold text-primary hover:underline underline-offset-4 ml-1"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Bottom decorative motif */}
        <div className="mt-8 flex justify-center items-center opacity-30">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <Star size={16} className="text-gold mx-4" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Bottom links */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <span>© 2025 HalalBites. All rights reserved.</span>
          <span className="mx-2">•</span>
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>

      </div>
    </main>
  );
}
