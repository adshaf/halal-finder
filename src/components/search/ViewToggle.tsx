"use client";

import { LayoutGrid, Map } from "lucide-react";

type View = "cards" | "map";

type Props = {
  view: View;
  onToggle: (v: View) => void;
};

export default function ViewToggle({ view, onToggle }: Props) {
  return (
    <div className="flex items-center bg-dark-surface/60 border border-gold/15 rounded-full p-1 gap-1">
      <button
        onClick={() => onToggle("cards")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          view === "cards"
            ? "bg-gold text-dark-bg"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <LayoutGrid size={14} />
        Cards
      </button>
      <button
        onClick={() => onToggle("map")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          view === "map"
            ? "bg-gold text-dark-bg"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <Map size={14} />
        Map
      </button>
    </div>
  );
}
