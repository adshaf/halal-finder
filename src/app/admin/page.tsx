"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Store,
  ClipboardList,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
  TrendingUp,
  Clock,
  UserPlus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

// ── Mock data ────────────────────────────────────────────
const KPI_CARDS = [
  {
    label: "Total Restaurants",
    value: "2,481",
    trend: "+12.5%",
    trendColor: "text-primary",
    icon: Store,
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
    barColor: "from-gold",
  },
  {
    label: "Pending Approvals",
    value: "42",
    trend: "8 Active",
    trendColor: "text-amber-400",
    icon: Clock,
    iconBg: "bg-amber-400/10",
    iconColor: "text-amber-400",
    barColor: "from-amber-400",
  },
  {
    label: "Monthly Active Users",
    value: "15.8k",
    trend: "+4.2%",
    trendColor: "text-primary",
    icon: UserPlus,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    barColor: "from-primary",
  },
  {
    label: "New Reviews Today",
    value: "127",
    trend: "Avg 4.8",
    trendColor: "text-slate-400",
    icon: MessageSquare,
    iconBg: "bg-white/10",
    iconColor: "text-slate-400",
    barColor: "from-slate-400",
  },
];

const APPLICATIONS = [
  {
    name: "Al-Basha Mediterranean Grill",
    website: "albasha-grill.com",
    category: "Middle Eastern",
    date: "Oct 24, 2023, 11:20 AM",
    location: "London, UK",
    status: "Pending Review",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=80",
  },
  {
    name: "Silk Road Uyghur Cuisine",
    website: "silkroad-resto.io",
    category: "Central Asian",
    date: "Oct 23, 2023, 09:45 PM",
    location: "New York, USA",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=80",
  },
  {
    name: "Royal Biryani House",
    website: "royalbiryani.ae",
    category: "Indian & Pakistani",
    date: "Oct 23, 2023, 02:15 PM",
    location: "Dubai, UAE",
    status: "Pending Review",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=80",
  },
  {
    name: "Habibi Burger",
    website: "habibi-burgers.ca",
    category: "Fast Food",
    date: "Oct 22, 2023, 10:05 AM",
    location: "Toronto, CA",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=80",
  },
  {
    name: "Nile Valley Cafe",
    website: "nile-valley.sd",
    category: "Sudanese",
    date: "Oct 21, 2023, 08:30 PM",
    location: "Khartoum, SD",
    status: "Pending Review",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80",
  },
];

const ACTIVITY = [
  {
    icon: CheckCircle2,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    title: "New Review Verified",
    desc: '"Zaitoon House" received a 5-star review.',
    time: "4 minutes ago",
  },
  {
    icon: UserPlus,
    iconBg: "bg-gold/20",
    iconColor: "text-gold",
    title: "New Partner Sign-up",
    desc: '"Desert Rose Dining" submitted application.',
    time: "18 minutes ago",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-amber-400/20",
    iconColor: "text-amber-400",
    title: "Report Filed",
    desc: 'Review reported as spam on "Little Isfahan".',
    time: "1 hour ago",
  },
];

const NAV_LINKS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Restaurants", icon: Store },
  { label: "Applications", icon: ClipboardList, badge: "12" },
  { label: "Reviews", icon: MessageSquare },
  { label: "User Management", icon: Users },
];

const SYSTEM_LINKS = [
  { label: "Report Center", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

// ── Star logo ─────────────────────────────────────────────
const HalalFindStar = () => (
  <svg className="size-5 text-dark-bg" fill="currentColor" viewBox="0 0 48 48">
    <path d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" />
  </svg>
);

// ── Status badge ──────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isPending = status === "Pending Review";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
        isPending
          ? "bg-amber-400/10 text-amber-400 border-amber-400/20"
          : "bg-primary/10 text-primary border-primary/20"
      }`}
    >
      {status}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="bg-warm-dark text-slate-100 min-h-screen flex font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-64 xl:w-72 bg-[#15130f] border-r border-gold/10 flex flex-col h-screen sticky top-0 shrink-0">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-gold/10">
          <div className="size-10 rounded-full bg-gold flex items-center justify-center shrink-0">
            <HalalFindStar />
          </div>
          <div>
            <h1 className="text-white text-lg font-display font-bold leading-none">
              HalalFind
            </h1>
            <p className="text-slate-500 text-xs mt-1">Admin Console</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_LINKS.map(({ label, icon: Icon, badge, active }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeNav === label
                  ? "bg-gold text-dark-bg font-bold"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto bg-amber-400/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-4 pb-2 px-4 text-[10px] uppercase tracking-widest text-slate-600 font-bold">
            System
          </div>

          {SYSTEM_LINKS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeNav === label
                  ? "bg-gold text-dark-bg font-bold"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* User card */}
        <div className="p-4 border-t border-gold/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="size-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold text-sm shrink-0">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-sm font-bold truncate">
                Ahmed El-Sayed
              </p>
              <p className="text-slate-500 text-xs truncate">Super Admin</p>
            </div>
            <button
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-warm-dark/80 backdrop-blur-md border-b border-gold/10 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search restaurants, users, or applications..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 focus:border-gold/30 focus:outline-none text-sm text-slate-200 placeholder:text-slate-600 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-6">
            <button
              className="size-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/10 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={16} className="text-slate-400" />
              <span className="absolute top-2 right-2 size-2 bg-amber-400 rounded-full border-2 border-warm-dark" />
            </button>
            <div className="h-6 w-px bg-gold/10" />
            <button className="bg-gold text-dark-bg px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 hover:brightness-110 transition-all">
              <Plus size={16} />
              New Listing
            </button>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-8 space-y-8 overflow-auto">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-100 tracking-tight">
              Overview Dashboard
            </h2>
            <p className="text-gold/60 mt-1 text-sm">
              Welcome back. Here is a summary of HalalFind activities for today.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KPI_CARDS.map(
              ({
                label,
                value,
                trend,
                trendColor,
                icon: Icon,
                iconBg,
                iconColor,
                barColor,
              }) => (
                <div
                  key={label}
                  className="bg-white/5 p-6 rounded-2xl border border-gold/10 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`size-12 rounded-xl ${iconBg} flex items-center justify-center`}
                    >
                      <Icon size={22} className={iconColor} />
                    </div>
                    <span
                      className={`${trendColor} text-xs font-bold flex items-center gap-1`}
                    >
                      {trend.startsWith("+") && <TrendingUp size={12} />}
                      {trend}
                    </span>
                  </div>
                  <p className="text-gold/60 text-sm font-medium">{label}</p>
                  <h3 className="text-3xl font-bold mt-1 text-slate-100">
                    {value}
                  </h3>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r ${barColor} to-transparent opacity-50`}
                  />
                </div>
              ),
            )}
          </div>

          {/* Applications Table */}
          <div className="bg-white/5 rounded-2xl border border-gold/10 overflow-hidden">
            <div className="p-6 border-b border-gold/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-display font-bold text-slate-100">
                  Recent Restaurant Applications
                </h3>
                <p className="text-gold/50 text-sm mt-0.5">
                  Manage and review pending submissions from business owners.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors">
                  <Filter size={15} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors">
                  <Download size={15} /> Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-gold/40 text-xs uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Restaurant</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Submission Date</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {APPLICATIONS.map((app) => (
                    <tr
                      key={app.name}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={app.image}
                            alt={app.name}
                            className="size-10 rounded-lg object-cover border border-gold/10"
                          />
                          <div>
                            <p className="font-bold text-sm text-slate-100">
                              {app.name}
                            </p>
                            <p className="text-gold/40 text-xs">
                              {app.website}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {app.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gold/50">
                        {app.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gold/50">
                        {app.location}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {app.status === "Pending Review" ? (
                          <button className="text-gold hover:text-gold/80 font-bold text-sm transition-colors">
                            Review
                          </button>
                        ) : (
                          <button className="text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors">
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table pagination */}
            <div className="p-4 border-t border-gold/10 flex items-center justify-between">
              <p className="text-xs text-gold/40">
                Showing 5 of 42 pending applications
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="size-8 rounded flex items-center justify-center border border-gold/20 text-slate-600 disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`size-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                      p === 1
                        ? "bg-gold text-dark-bg"
                        : "border border-gold/20 text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button className="size-8 rounded flex items-center justify-center border border-gold/20 text-slate-400 hover:bg-white/5 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto p-6 border-t border-gold/10 text-center">
          <p className="text-xs text-gold/30">
            © 2025 HalalFind Inc. All administrative rights reserved.
            <span className="mx-2">|</span>
            v1.0.0 MVP Build
          </p>
        </footer>
      </main>
    </div>
  );
}
