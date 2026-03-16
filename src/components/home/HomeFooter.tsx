import Link from "next/link";
import { Twitter, Instagram, Mail } from "lucide-react";

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

const footerLinks = {
  Explore: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Halal Guide", href: "/halal-guide" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
  ],
};

export default function HomeFooter() {
  return (
    <footer className="bg-dark-bg border-t border-gold/10 pt-20 pb-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <HalalFindStar />
            <span className="font-display text-2xl font-bold tracking-tight text-slate-100">
              Halal<span className="text-gold">Bites</span>
            </span>
          </div>
          {/* <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Your guide to the best halal restaurants in Sydney - verified
            information, honest listings, zero compromise.
          </p> */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-slate-500 hover:text-gold transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-slate-500 hover:text-gold transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="text-slate-500 hover:text-gold transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-bold text-slate-100 mb-6 uppercase tracking-widest text-xs">
              {heading}
            </h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-10 border-t border-gold/5">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} HalalBites. All rights reserved. Made by
          Shafstudio Web Design.
        </p>
      </div>
    </footer>
  );
}
