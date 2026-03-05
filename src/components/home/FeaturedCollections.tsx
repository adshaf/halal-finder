import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Restaurant {
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
}

const restaurants: Restaurant[] = [
  {
    name: "The Gilded Saffron",
    location: "Mayfair, London • Modern Persian",
    rating: 4.9,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAypbr0WdXd5JoLqVuv2LR1f2qcpbBWEb_I101USWwDRSX4JFJXsKjGZFfNmLP6oGuM-97TijnejQkEKD4lST7afzIrj9mxzaudE0QAOfYZ6krlaI4lNuX_l3PMeNrfWwBQDsCRkvnlUgAkO5WzU2QKRE0mQ-HfL-8StNmkDIx13UMwGNq83YCYPzm5sbaaa2sP_qxtLVAZgeNKYMVqfObQOODDzL3AEX8yUV-IzSgOpAWGcEepI4ButYLO8a4T-lFRNy82HmuQL-p2",
    imageAlt: "High-end modern restaurant dining room",
    tags: ["Fully Halal", "Alcohol Free"],
  },
  {
    name: "Azure Grill",
    location: "Downtown, Dubai • Mediterranean Steakhouse",
    rating: 4.8,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw3vhEKJljTIdDTH10_778jLp2189z5CieYecUIHqZwEYyRR97kTj-Or87s32CNLPUx0SFYlmkJPNcJd6yCq3rCnaQ9y3r-EcQhiH39IbNMOotYcbcyZbclcOrrVrdoEwiUAFBFlQiKj_rnY5Eo4yXeeD19R16QmV-eJNGX8pOHvxVOWTnXl9EiUa8C0XmmUoxIDxeT0ZZjI1xeskBkeKvG8B8ce8dW2m3bbQJ_ZGFIVsvwlUGqqOMbim5DPcA_K8U4jOsLhQHTb8D",
    imageAlt: "Luxury private dining table setup",
    tags: ["Certified Halal", "Prayer Room"],
  },
  {
    name: "Silk Road Bistro",
    location: "Upper East Side, NY • Central Asian Fusion",
    rating: 4.7,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMqnosmnrA1ua6xkn97GubzOdIOGByvoct7q8qg1iuqisLLn8ZhO2sVv57vw8A4E4x4joxIot6PMMrTrLrFx-4NxAJ0cEUvZF81JkBjK4i0lV9olZGMrckjyqmrz9gJl7jNkrIbbhrbFG4-b74ZERPCK39uYEi9O-ZIbHY-7wtput1_8NAYrJWy95JYZg9_3HSKw4LvR-CJ-NU2RN3Fwq_lZO4GiJC0-eD3dxQ94ZQAasZ6U8Pl7hIf-Z4A8LCGmKPEGSfjsbO9EWm",
    imageAlt: "Close up of a fancy coffee and dessert",
    tags: ["Halal Options", "No Pork Served"],
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 px-6 lg:px-20 bg-dark-bg text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Featured Collections
            </h2>
            <p className="text-slate-400">
              Hand-picked selections of the month&apos;s finest openings.
            </p>
          </div>
          <Link
            href="/searchResults"
            className="text-gold font-bold flex items-center gap-2 hover:underline decoration-2 underline-offset-4"
          >
            View All <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((r) => (
            <div key={r.name} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-4/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.imageUrl}
                  alt={r.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gold flex items-center gap-1">
                  <Star size={12} fill="currentColor" aria-hidden="true" />
                  {r.rating}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-transparent to-transparent opacity-60" />
              </div>
              <h3 className="font-display text-xl font-bold group-hover:text-gold transition-colors mb-1">
                {r.name}
              </h3>
              <p className="text-slate-400 text-sm mb-3">{r.location}</p>
              <div className="flex gap-2 flex-wrap">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest bg-dark-surface px-2 py-1 rounded border border-gold/10 text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
