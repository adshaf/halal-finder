"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      fill="#1877F2"
      d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
    />
  </svg>
);

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="bg-warm-dark min-h-screen flex flex-col items-center justify-center p-6 pt-28">
      <div className="w-full max-w-md">

        {/* Auth Card */}
        <div className="bg-zinc-900/60 border border-gold/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">

          {/* Decorative top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-gold via-deep-green to-gold" />

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
                onClick={() => setTab("signin")}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                  tab === "signin"
                    ? "border-deep-green text-primary"
                    : "border-transparent text-slate-400 hover:text-gold"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                  tab === "register"
                    ? "border-deep-green text-primary"
                    : "border-transparent text-slate-400 hover:text-gold"
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-deep-green outline-none transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-deep-green outline-none transition-all text-slate-100 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  {tab === "signin" && (
                    <a href="#" className="text-xs font-semibold text-gold hover:underline underline-offset-4">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} aria-hidden="true" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-deep-green outline-none transition-all text-slate-100 placeholder:text-slate-500"
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

              {tab === "signin" && (
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 accent-deep-green rounded border-zinc-600"
                  />
                  <label htmlFor="remember" className="text-sm text-slate-400">
                    Remember me for 30 days
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-deep-green hover:brightness-110 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-deep-green/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{tab === "signin" ? "Sign In" : "Create Account"}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-3 text-slate-500 tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors text-slate-300">
                <GoogleIcon />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors text-slate-300">
                <FacebookIcon />
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>
          </div>

          {/* Card footer */}
          <div className="bg-gold/5 p-6 text-center border-t border-gold/10">
            <p className="text-sm text-slate-400">
              {tab === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => setTab("register")}
                    className="font-bold text-primary hover:underline underline-offset-4 ml-1"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setTab("signin")}
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
          <Star size={16} className="text-gold mx-4" aria-hidden="true" />
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Bottom links */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <span>© 2025 HalalFind. All rights reserved.</span>
          <span className="mx-2">•</span>
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <span className="mx-2">•</span>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>

      </div>
    </main>
  );
}
