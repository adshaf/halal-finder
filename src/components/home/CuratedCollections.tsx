import { ChevronRight } from "lucide-react";

interface CollectionCard {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const collections: CollectionCard[] = [
  {
    label: "Exquisite",
    title: "Fine Dining",
    description: "Sophisticated atmospheres and world-class chefs.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYuCKypLMhueyWVy5sVyOblu4bSWYca83H_uuJvIGI8ZsTbB6L0mXnMJC0WYUSqKGLFNuDNvInvpNBNM0G8cQS6fVzTnmYOaFmc6NwyrCDNRC-Ok7VrlIGZZsp_TYBpXubYQSKn8YOd_nRsuOqAVQ-0gqFTw5Xg2aLyOw8Kf57ivqlVBZcS6wazKgvTtxr5s53e3Q5vV45hxOiexWvN_Cf07tlrclNDTx7PLbJBkK162SkoMfkTGNh21AxTrp-bwgaIKz9RSs70jmf",
    imageAlt: "Luxurious fine dining interior with crystal chandeliers",
  },
  {
    label: "Authentic",
    title: "Traditional Gems",
    description: "Timeless recipes passed through generations.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATW1AYdz3Z7DNoobTaOJ95kKipkmg_gQhAxV5-byN14P0gKZDM8-27Kg-ymC8G35tgEGL5HQ7ShpGEUCEjxg5U2x08SStIlLJyNEw1oShCr13XEnPfRc4sNAxE4CSzPVRufteg684JI4peCFiWiT5q1VsSTEcIMlGkcbgE_KiqmLnt35i4OnMy9Tkj8GcRSCKr1epqqzYhtbjerbwUqok-EA4dP7mFK83GU4ukBV3CfJA1mc9UOwh8Do2R2JbezByrJV8ni7tU4C0n",
    imageAlt: "Traditional ornate copper table settings and Middle Eastern food",
  },
  {
    label: "Innovative",
    title: "Modern Fusion",
    description: "A contemporary twist on Halal culinary arts.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAJalZhA4sE-brdUlibLfm78HlNxzupkg32i1iIz-2SISGfGjTSXYHFizOSj6z9PZGIQ1FQtKSsJywiLvh_rOv7IV5m81DnFOevr3RAaqGCCOHSGj7IMb42T5fxmnWwGeGIEOOMU8xDtNhu39lVH2fjQws6pQwyoWTFS0xQ4imMKKXVNVSyFwpH64jwhjhMxWw8l1rouSjyKbOU-2vqAiU9LVjBvwn9v_uIYvvqrUI6MzbFlESj5YeSq7a-E4nkDjvcM9EcgkaBDgb",
    imageAlt: "Modern fusion cuisine plate with artistic plating",
  },
];

export default function CuratedCollections() {
  return (
    <section className="px-6 lg:px-40 py-16 bg-white">
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-deep-green text-3xl md:text-4xl font-display font-bold">
            Curated Collections
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>
        <a
          href="#"
          className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight size={16} aria-hidden="true" />
        </a>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer"
          >
            {/* Background image with gradient overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(10, 61, 46, 0) 40%, rgba(10, 61, 46, 0.9) 100%), url("${card.imageUrl}")`,
              }}
              role="img"
              aria-label={card.imageAlt}
            />

            {/* Card content */}
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-accent-gold text-xs font-bold uppercase tracking-widest mb-2">
                {card.label}
              </p>
              <h3 className="text-white text-2xl font-display font-bold">
                {card.title}
              </h3>
              <p className="text-slate-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
