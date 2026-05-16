import HomeNavbar from "@/components/home/HomeNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden">
      <HomeNavbar />
      <main>{children}</main>
    </div>
  );
}
