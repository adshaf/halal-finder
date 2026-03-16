import Image from "next/image";

const BADGES = [
  {
    file: "halal-certified",
    label: "Halal Certified",
    description:
      "The restaurant holds a certificate from a recognised halal certification body. This involves a formal inspection process.",
  },
  {
    file: "no-alcohol",
    label: "No Alcohol",
    description:
      "The venue does not serve alcohol on the premises.",
  },
  {
    file: "no-pork",
    label: "No Pork",
    description:
      "No pork or pork-derived ingredients are used in any menu items.",
  },
  {
    file: "muslim-owned",
    label: "Muslim Owned",
    description:
      "The restaurant is owned by a Muslim individual or family.",
  },
  {
    file: "muslim-chef",
    label: "Muslim Chefs",
    description:
      "Food is prepared by Muslim chefs. This is separate from formal halal certification.",
  },
  {
    file: "prayer-room",
    label: "Prayer Room",
    description:
      "A dedicated prayer space is available on-site for customers.",
  },
  {
    file: "halal-chicken",
    label: "Halal Chicken",
    description:
      "Chicken served at this restaurant is sourced from halal-certified suppliers.",
  },
  {
    file: "halal-beef",
    label: "Halal Beef",
    description:
      "Beef served at this restaurant is sourced from halal-certified suppliers.",
  },
  {
    file: "halal-seafood",
    label: "Halal Seafood",
    description:
      "Seafood options are available and prepared in accordance with halal requirements.",
  },
  {
    file: "vegetarian-option",
    label: "Vegetarian Options",
    description:
      "The menu includes vegetarian dishes suitable for non-meat eaters.",
  },
];

export default function HowItWorksBadges() {
  return (
    <section className="py-16 px-6 border-b border-gold/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-gold mb-3">
          Understanding the Badges
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Each listing displays icons that represent specific attributes of that
          restaurant. These are based on information provided by the restaurant
          or sourced from the community — they are not independently verified by
          HalalBites.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {BADGES.map((badge) => (
            <div
              key={badge.file}
              className="flex items-start gap-4 p-5 rounded-xl bg-dark-surface/40 border border-gold/10"
            >
              <Image
                src={`/assets/halal-icons/${badge.file}-true.png`}
                alt={badge.label}
                width={40}
                height={40}
                className="shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-slate-100 mb-1">{badge.label}</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-500 italic">
          A greyed-out badge means the restaurant does not have that attribute,
          or the information has not been confirmed.
        </p>
      </div>
    </section>
  );
}
