import type { Metadata } from "next";
import Link from "next/link";
import MatchDetailNavbar from "@/components/MatchDetailNavbar";
import Footer from "@/components/Footer";
import UniversitiesDirectoryClient from "@/components/UniversitiesDirectoryClient";

export const metadata: Metadata = {
  title: "Top 10 Verified Global Universities & Official Portals | EduOrbit",
  description:
    "Explore 10 world-leading universities with audited official websites, admissions portals, and flagship scholarship programs.",
};

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans overflow-x-hidden">
      <MatchDetailNavbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-gray-500 px-1"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-blue-600 font-semibold">Verified Universities</span>
        </nav>

        {/* Hero Banner */}
        <header className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-4 py-1.5 rounded-full">
              <span>🏛️</span>
              <span>EduOrbit Official University Directory</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] sm:leading-[1.08] max-w-3xl">
              Top 10 Global Universities &amp; Official Portals
            </h1>
            <p className="max-w-3xl text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Direct access to the world&apos;s most prestigious institutions. Audited for 2026/2027 admissions, featuring official website links, application cutoff portals, and fully funded flagship scholarships.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs text-blue-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <span>✓</span> 100% Verified Official Domains
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <span>✓</span> Full Ride &amp; Fellowship Opportunities
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                <span>✓</span> Direct Graduate Application Portals
              </div>
            </div>
          </div>
        </header>

        {/* Directory Client component */}
        <UniversitiesDirectoryClient />
      </main>

      <Footer />
    </div>
  );
}
