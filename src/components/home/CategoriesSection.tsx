const categories = [
  "All Cuisines",
  "Middle Eastern",
  "South Asian",
  "Mediterranean",
  "Steakhouse",
  "Fine Dining",
  "Seafood",
];

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-dark-surface/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4">
          {categories.map((category, i) => (
            <button
              key={category}
              className={
                i === 0
                  ? "flex-none px-6 py-2 rounded-full bg-gold text-dark-bg text-sm font-bold"
                  : "flex-none px-6 py-2 rounded-full bg-dark-surface border border-gold/20 text-slate-300 text-sm font-medium hover:border-gold transition-colors"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
