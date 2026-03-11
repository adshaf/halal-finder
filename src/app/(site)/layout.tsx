import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-bg overflow-x-hidden">
      <HomeNavbar />
      <main className="flex flex-col flex-1">
        {children}
      </main>
      <HomeFooter />
    </div>
  );
}
