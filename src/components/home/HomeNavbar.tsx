"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { createClient } from "@/lib/supabase/client";

const HalalFindStar = () => (
  <svg
    className="size-7 text-gold"
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" />
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/search-results" },
  { label: "Contact", href: "/contact" },
];

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteError("");
    const res = await fetch("/api/user/delete", { method: "DELETE" });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setDeleteError(data.error ?? "Something went wrong. Please try again.");
      setDeleting(false);
    }
  }

  const userInitial =
    user?.user_metadata?.full_name?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 border-b border-gold/10 bg-dark-bg/80 backdrop-blur-md px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <HalalFindStar />
            <span className="font-display text-2xl font-bold tracking-tight text-slate-100">
              halal <span className="text-gold">yums</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <span className="size-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">
                    {userInitial}
                  </span>
                  <span className="max-w-[120px] truncate">
                    {user.user_metadata?.full_name ?? user.email?.split("@")[0]}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-dark-bg border border-gold/15 rounded-xl shadow-xl overflow-hidden z-50">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-gold hover:bg-gold/5 transition-colors"
                    >
                      <LayoutDashboard size={15} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-gold hover:bg-gold/5 transition-colors border-t border-gold/10"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                    {/* Clearly separated delete option */}
                    <div className="border-t border-red-400/20 mt-0">
                      <button
                        onClick={() => { setDropdownOpen(false); setShowDeleteModal(true); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-colors"
                      >
                        <Trash2 size={15} />
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth"
                  className="bg-gold hover:brightness-110 text-dark-bg px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-gold/10"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden cursor-pointer ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel */}
      <nav
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-dark-bg border-l border-gold/10 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
          <div className="flex items-center gap-2">
            <HalalFindStar />
            <span className="font-display text-lg font-bold text-slate-100">
              halal <span className="text-gold">yums</span>
            </span>
          </div>
          <button
            className="text-slate-400 hover:text-white p-1 transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* User info (if logged in) */}
        {user && (
          <div className="px-6 py-4 border-b border-gold/10 flex items-center gap-3">
            <span className="size-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-sm font-bold shrink-0">
              {userInitial}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {user.user_metadata?.full_name ?? "User"}
              </p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <div className="flex flex-col px-6 py-4 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-slate-300 hover:text-gold font-medium py-4 border-b border-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-gold font-medium py-4 border-b border-white/5 transition-colors flex items-center gap-2"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth pinned to bottom */}
        <div className="px-6 py-6 border-t border-gold/10 flex flex-col gap-3">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-center text-sm font-medium text-slate-300 hover:text-gold py-3 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={15} />
                Sign Out
              </button>
              <button
                onClick={() => { setMenuOpen(false); setShowDeleteModal(true); }}
                className="text-center text-xs font-medium text-red-400/50 hover:text-red-400/80 py-2 transition-colors flex items-center justify-center gap-2 border-t border-red-400/10 pt-3"
              >
                <Trash2 size={13} />
                Delete Account
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-center text-sm font-medium text-slate-300 hover:text-white py-3 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth"
                className="text-center bg-gold text-dark-bg px-6 py-3 rounded-full text-sm font-bold hover:brightness-110 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Delete account confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-2000 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !deleting && setShowDeleteModal(false)}
          />
          <div className="relative bg-dark-surface border border-red-400/20 rounded-2xl w-full max-w-sm shadow-2xl p-6">
            <button
              onClick={() => { setShowDeleteModal(false); setDeleteError(""); }}
              disabled={deleting}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="size-12 rounded-full bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                <AlertTriangle size={22} className="text-red-400" />
              </div>
            </div>

            <h3 className="font-display font-bold text-slate-100 text-lg text-center mb-2">
              Delete your account?
            </h3>
            <p className="text-sm text-slate-400 text-center mb-1">
              This is permanent and cannot be undone.
            </p>
            <p className="text-xs text-slate-500 text-center mb-6">
              Your saved restaurants and profile will be removed. Any restaurant submissions you've made will remain in our database.
            </p>

            {deleteError && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-4 text-center">
                {deleteError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteError(""); }}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white text-sm transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting && <Loader2 size={15} className="animate-spin" />}
                {deleting ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
