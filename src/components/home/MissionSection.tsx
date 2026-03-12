import { ShieldCheck, Users, Wand2 } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Transparent Information",
    description:
      "We aim to provide clear and transparent information about each restaurant so that users can make informed decisions based on their own level of halal observance.",
  },
  {
    icon: Users,
    title: "Community Contributions",
    description:
      "HalalBites grows through community input. Users can suggest restaurants and share information, helping build a directory that reflects the diverse needs of Muslims across Australia.",
  },
  {
    icon: Wand2,
    title: "Simple & Accessible",
    description:
      "Built with modern technology to provide a fast, intuitive experience that makes discovering halal dining options easy across both web and mobile devices.",
  },
];

export default function MissionSection() {
  return (
    <section className="py-24 bg-dark-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-4xl font-bold text-slate-100">
            Our Mission
          </h2>
          <div className="h-1 w-20 bg-gold mx-auto rounded-full my-5" />
          <p className="text-lg text-slate-400 leading-relaxed text-center">
            HalalBites was created to help Muslims in Australia easily discover
            halal dining options. We recognise that halal observance can vary
            from person to person, so our goal is to provide transparent
            information that allows everyone to decide for themselves what they
            are comfortable with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-dark-surface/60 p-10 rounded-2xl border border-gold/15 hover:border-gold/40 transition-colors group"
            >
              <Icon
                size={44}
                className="text-gold mb-6 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-bold mb-4 text-slate-100">
                {title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
