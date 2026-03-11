"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  { label: "Explore", href: "/searchResults" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gold/10 bg-dark-bg/80 backdrop-blur-md px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <HalalFindStar />
            <span className="font-display text-2xl font-bold tracking-tight text-slate-100">
              Halal<span className="text-gold">Bites</span>
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

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-6">
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
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${
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
              Halal<span className="text-gold">Bites</span>
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
        </div>

        {/* Auth pinned to bottom */}
        <div className="px-6 py-6 border-t border-gold/10 flex flex-col gap-3">
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
        </div>
      </nav>
    </>
  );
}
