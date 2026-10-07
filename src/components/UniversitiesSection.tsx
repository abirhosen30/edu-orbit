'use client';

import { useState } from "react";
import Link from "next/link";
import { universitiesData, University } from "@/data/universities";

const countryFilters = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Germany",
  "Switzerland",
  "Singapore",
  "Canada",
  "Australia",
];

export default function UniversitiesSection() {
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

  const filteredUniversities = universitiesData.filter((uni) => {
    const matchesCountry =
      selectedCountry === "All Countries" || uni.country === selectedCountry;
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.popularPrograms.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      uni.flagshipScholarship.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <section
      id="universities"
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-gray-100"
      aria-labelledby="universities-heading"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full">
            <span>🏛️</span>
            <span>10 Top Global Partner Universities · 100% Verified Portals</span>
          </div>
          <h2
            id="universities-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Explore World-Leading Universities &amp; Official Portals
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Official website links, audited admission portals, and direct scholarship programs for the world&apos;s top-ranked academic institutions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/80 shadow-xs">
          {/* Country Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {countryFilters.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCountry === country
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/70"
                }`}
              >
                {country === "All Countries"
                  ? "🌍 All Countries"
                  : country === "United States"
                  ? "🇺🇸 USA"
                  : country === "United Kingdom"
                  ? "🇬🇧 UK"
                  : country === "Germany"
                  ? "🇩🇪 Germany"
                  : country === "Switzerland"
                  ? "🇨🇭 Switzerland"
                  : country === "Singapore"
                  ? "🇸🇬 Singapore"
                  : country === "Canada"
                  ? "🇨🇦 Canada"
                  : "🇦🇺 Australia"}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search university or major..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 10 Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni) => (
            <article
              key={uni.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header row: Logo + Rank badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${uni.logoBg} ${
                        uni.logoTextColor || "text-white"
                      } font-bold text-base flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {uni.logoInitial}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                        {uni.name}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <span>{uni.countryFlag}</span>
                        <span>{uni.city}</span>
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-black px-2 py-0.5 rounded-md shrink-0">
                    QS #{uni.qsRank}
                  </span>
                </div>

                {/* Badge if available */}
                {uni.badge && (
                  <div className="text-[11px] font-medium text-blue-800 bg-blue-50/70 border border-blue-100 rounded-md px-2.5 py-1">
                    ✨ {uni.badge}
                  </div>
                )}

                {/* Description snippet */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {uni.description}
                </p>

                {/* Key Stats Bar */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50/90 border border-slate-100 rounded-xl p-2.5 text-center">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                      Acceptance Rate
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      {uni.acceptanceRate}
                    </span>
                  </div>
                  <div className="border-l border-slate-200/60">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                      Institution Type
                    </span>
                    <span className="text-xs font-bold text-gray-800 truncate block px-1">
                      {uni.type.split(" ")[0]} Research
                    </span>
                  </div>
                </div>

                {/* Flagship Scholarship Box */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-900 flex items-center gap-1">
                      <span>🎓</span>
                      <span className="truncate max-w-[180px]">{uni.flagshipScholarship.name}</span>
                    </span>
                    <span className="bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded text-[10px]">
                      {uni.flagshipScholarship.type}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-800">
                    {uni.flagshipScholarship.coverage}
                  </p>
                </div>

                {/* Popular Programs Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    Popular Programs
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.popularPrograms.slice(0, 3).map((prog) => (
                      <span
                        key={prog}
                        className="text-[11px] bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-md"
                      >
                        {prog}
                      </span>
                    ))}
                    {uni.popularPrograms.length > 3 && (
                      <span className="text-[11px] text-gray-400 font-medium px-1 py-0.5">
                        +{uni.popularPrograms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions: Official Website + Match Detail */}
              <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
                {/* Official Website Link */}
                <a
                  href={uni.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-800 text-xs font-semibold transition-all shadow-2xs group/btn"
                  title={`Open official website: ${uni.officialWebsite}`}
                >
                  <span>Official Website</span>
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-blue-600 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                {/* Match Detail or Modal Trigger */}
                <Link
                  href={`/match-detail?university=${uni.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  <span>Match Analysis</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA to see full directory */}
        <div className="text-center pt-4">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xs"
          >
            <span>View Full Directory of 10 Verified Universities</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
