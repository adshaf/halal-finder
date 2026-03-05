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
    { label: "Popular Cities", href: "/searchResults" },
    { label: "Featured Lists", href: "/searchResults" },
    { label: "Cuisine Guide", href: "/searchResults" },
    { label: "Halal Standards", href: "/about" },
  ],
  "For Businesses": [
    { label: "Partner with Us", href: "/join" },
    { label: "Business Dashboard", href: "/join" },
    { label: "Advertising", href: "/join" },
    { label: "Verification Services", href: "/join" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Safety Guidelines", href: "#" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
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
              Halal<span className="text-gold">Find</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Curating the global standard for premium halal dining experiences
            through meticulous verification and authentic community reviews.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-gold transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-slate-500 hover:text-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Email" className="text-slate-500 hover:text-gold transition-colors">
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
          © 2024 HalalFind International. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
