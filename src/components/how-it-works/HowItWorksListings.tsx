import { Users, ShieldCheck, ClipboardList } from "lucide-react";

const STEPS = [
  {
    icon: Users,
    title: "Community Submissions",
    description:
      "Anyone with a free HalalBites account can submit a restaurant listing. We encourage the community to share places they've visited and know to be halal-friendly.",
  },
  {
    icon: ClipboardList,
    title: "Admin Review",
    description:
      "Every submission is reviewed by our team before it goes live. We check that the information is complete, reasonable, and not a duplicate. We do not conduct on-site inspections.",
  },
  {
    icon: ShieldCheck,
    title: "Published & Maintained",
    description:
      "Once approved, the listing is published on HalalBites. Details can be updated over time — by the restaurant, the community, or our team — to keep information current.",
  },
];

export default function HowItWorksListings() {
  return (
    <section className="py-16 px-6 border-b border-gold/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-gold mb-3">
          How Listings Are Added
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Listings on HalalBites come from two sources: our admin team and
          community submissions from registered users.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="p-6 rounded-xl bg-dark-surface/40 border border-gold/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="size-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-gold font-bold text-sm">{i + 1}</span>
                </div>
                <step.icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold text-slate-100 mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
