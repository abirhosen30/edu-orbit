'use client';

import { useState } from "react";
import Link from "next/link";
import { universitiesData } from "@/data/universities";

const countryTabs = [
  "All",
  "United States",
  "United Kingdom",
  "Germany",
  "Switzerland",
  "Singapore",
  "Canada",
  "Australia",
];

export default function UniversitiesDirectoryClient() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = universitiesData.filter((uni) => {
    const matchesCountry =
      selectedCountry === "All" || uni.country === selectedCountry;
    const matchesSearch =
      uni.name.toLowerCase().includes(search.toLowerCase()) ||
      uni.city.toLowerCase().includes(search.toLowerCase()) ||
      uni.popularPrograms.some((p) =>
        p.toLowerCase().includes(search.toLowerCase())
      ) ||
      uni.flagshipScholarship.name.toLowerCase().includes(search.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Country filter pills */}
        <div className="flex-1 min-w-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {countryTabs.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCountry(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCountry === c
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c === "All" ? "🌍 All (10)" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80 md:flex-shrink-0">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by university name, major, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Grid of 10 Universities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((uni) => (
          <article
            key={uni.id}
            className="h-full bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-5"
          >
            {/* Header: Logo, Name, Location & Rank */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${uni.logoBg} ${
                    uni.logoTextColor || "text-white"
                  } font-black text-lg flex items-center justify-center shrink-0 shadow-xs`}
                >
                  {uni.logoInitial}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900 leading-snug">
                      {uni.name}
                    </h2>
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-black px-2 py-0.5 rounded-md">
                      QS Rank #{uni.qsRank}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                    <span>{uni.countryFlag}</span>
                    <span>{uni.city}, {uni.country}</span>
                    <span>•</span>
                    <span className="text-gray-700 font-medium">{uni.type}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Official Website & Admissions Bar */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-blue-950 font-medium truncate">
                <span className="text-blue-600">🌐</span>
                <span className="text-gray-500">Official Web:</span>
                <a
                  href={uni.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-700 hover:underline flex items-center gap-1 truncate"
                >
                  {uni.officialWebsite.replace("https://", "")}
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <a
                href={uni.admissionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gray-600 hover:text-blue-700 font-semibold underline shrink-0 flex items-center gap-1 self-start sm:self-center"
              >
                <span>Admissions Portal</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* University Description */}
            <p className="text-xs text-gray-600 leading-relaxed">
              {uni.description}
            </p>

            {/* Key Stats: Acceptance rate, Tuition */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Acceptance Rate
                </span>
                <span className="font-extrabold text-gray-900 mt-0.5 block">
                  {uni.acceptanceRate}
                </span>
              </div>
              <div className="border-l border-slate-200/80 pl-3">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Tuition / Financial Model
                </span>
                <span className="font-semibold text-gray-800 mt-0.5 block truncate" title={uni.averageTuition}>
                  {uni.averageTuition}
                </span>
              </div>
            </div>

            {/* Flagship Scholarship */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <span>🎓</span>
                  <span>{uni.flagshipScholarship.name}</span>
                </span>
                <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                  {uni.flagshipScholarship.type}
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-800">
                {uni.flagshipScholarship.coverage}
              </p>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                {uni.flagshipScholarship.description}
              </p>
              <div className="text-[10px] text-emerald-800/80 pt-1 font-medium">
                ⏳ Deadline: {uni.flagshipScholarship.deadline}
              </div>
            </div>

            {/* Key Strengths & Popular Programs */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {uni.popularPrograms.map((prog) => (
                  <span
                    key={prog}
                    className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-md"
                  >
                    {prog}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 pt-1">
                {uni.features.map((feat) => (
                  <span key={feat} className="flex items-center gap-1">
                    <span className="text-blue-500 font-bold">✓</span> {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 border-t border-gray-100">
              <a
                href={uni.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Visit Official Website</span>
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <Link
                href={`/match-detail?university=${uni.id}`}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Check Match Eligibility</span>
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
          <p className="text-3xl">🔍</p>
          <h3 className="text-base font-bold text-gray-800">
            No universities found for &quot;{search}&quot;
          </h3>
          <p className="text-xs text-gray-500">
            Try adjusting your search query or reset the country filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCountry("All");
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
