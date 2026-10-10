'use client';

import { useState, useMemo } from "react";
import EligibilityNavbar from "@/components/EligibilityNavbar";
import MetricCards from "@/components/MetricCards";
import UniversityMatchCard from "@/components/UniversityMatchCard";
import SidebarWidgets from "@/components/SidebarWidgets";
import DashboardFooter from "@/components/DashboardFooter";
import {
  initialMetricData,
  sampleMatchedUniversities,
  sampleVerificationAlerts,
  sampleReadinessChecklist,
  sampleExchangeRates,
  UniversityMatch,
} from "@/data/matchedUniversities";

export default function EligibilityDashboardClient() {
  // Navigation & SubTab state
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Country filter state: "all" | "USA" | "Germany" | "UK" | "Canada"
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  // Band filter state: "all" | "Dream" | "Target" | "Safe"
  const [selectedBand, setSelectedBand] = useState<string>("all");

  // Funding type checkboxes
  const [fundingFilters, setFundingFilters] = useState({
    fullRide: true,
    tuitionWaiver: true,
    daadStipend: false,
  });

  // Sort state
  const [sortBy, setSortBy] = useState<"match" | "rank" | "name">("match");

  // Shortlist tracking (start with 6 simulated shortlisted items, including Georgia Tech if desired)
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const baseShortlistCount = 6;
  const currentShortlistCount = baseShortlistCount + shortlistedIds.length;

  // Modals
  const [showMoreFiltersModal, setShowMoreFiltersModal] = useState(false);
  const [showMilestonesModal, setShowMilestonesModal] = useState(false);

  // Toggle Shortlist action
  const handleToggleShortlist = (id: string) => {
    setShortlistedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered and Sorted Universities
  const filteredUniversities = useMemo(() => {
    return sampleMatchedUniversities.filter((uni) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = uni.name.toLowerCase().includes(q);
        const matchesProgram = uni.program.toLowerCase().includes(q);
        const matchesLocation = uni.location.toLowerCase().includes(q);
        const matchesFunding = uni.funding.title.toLowerCase().includes(q);
        if (!matchesName && !matchesProgram && !matchesLocation && !matchesFunding) {
          return false;
        }
      }

      // 2. Country filter
      if (selectedCountry !== "all" && uni.country !== selectedCountry) {
        return false;
      }

      // 3. Band filter
      if (selectedBand !== "all" && uni.band !== selectedBand) {
        return false;
      }

      // 4. Funding type filter
      // If none selected, don't filter out; if selected, match
      if (fundingFilters.fullRide || fundingFilters.tuitionWaiver || fundingFilters.daadStipend) {
        let matchesFundingType = false;
        if (fundingFilters.fullRide && uni.fundingType === "full-ride") matchesFundingType = true;
        if (fundingFilters.tuitionWaiver && uni.fundingType === "tuition-waiver") matchesFundingType = true;
        if (fundingFilters.daadStipend && (uni.fundingType === "daad" || uni.funding.details.includes("DAAD"))) matchesFundingType = true;
        if (!matchesFundingType) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "rank") return a.qsRank - b.qsRank;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCountry, selectedBand, fundingFilters, sortBy]);

  const countries = [
    { id: "all", label: "All Countries" },
    { id: "USA", label: "USA" },
    { id: "Germany", label: "Germany" },
    { id: "UK", label: "UK" },
    { id: "Canada", label: "Canada" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans antialiased">
      {/* 1. Header with primary nav & secondary sub-tab bar */}
      <EligibilityNavbar
        shortlistCount={currentShortlistCount}
        activeSubTab={activeSubTab}
        onSubTabChange={(tab) => setActiveSubTab(tab)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* 2. Main Page Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top 4 Summary Metric Cards */}
        <MetricCards
          data={initialMetricData}
          onOpenMilestones={() => setShowMilestonesModal(true)}
        />

        {/* Main 2-Column Layout matching Figma UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLUMNS: University Matches & Filter Controls */}
          <section className="lg:col-span-8 space-y-4">
            {/* Filter Control Box */}
            <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3.5 shadow-2xs">
              {/* Row 1: Country Pills & Band Selectors */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Countries Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {countries.map((c) => {
                    const isSelected = selectedCountry === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCountry(c.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 border-blue-600 text-blue-600 shadow-2xs font-bold"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                {/* Band Badges matching Figma screenshot */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-gray-500">Band:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBand(selectedBand === "Dream" ? "all" : "Dream")
                      }
                      className={`text-xs px-2.5 py-1 rounded-md border font-semibold transition-all cursor-pointer ${
                        selectedBand === "Dream"
                          ? "bg-purple-100 border-purple-400 text-purple-900 font-bold"
                          : "bg-slate-50 border-gray-200 text-gray-700 hover:bg-purple-50"
                      }`}
                    >
                      Dream (3)
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBand(selectedBand === "Target" ? "all" : "Target")
                      }
                      className={`text-xs px-2.5 py-1 rounded-md border font-semibold transition-all cursor-pointer ${
                        selectedBand === "Target"
                          ? "bg-blue-600 border-blue-600 text-white font-bold"
                          : "bg-blue-50/70 border-blue-200 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      Target (7)
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBand(selectedBand === "Safe" ? "all" : "Safe")
                      }
                      className={`text-xs px-2.5 py-1 rounded-md border font-semibold transition-all cursor-pointer ${
                        selectedBand === "Safe"
                          ? "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold"
                          : "bg-slate-50 border-gray-200 text-gray-700 hover:bg-emerald-50"
                      }`}
                    >
                      Safe (4)
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Funding Type Checkboxes & More Filters button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
                {/* Checkboxes */}
                <div className="flex items-center gap-4 flex-wrap text-xs text-gray-700 font-medium">
                  <span className="text-gray-500 text-xs">Funding Type:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={fundingFilters.fullRide}
                      onChange={(e) =>
                        setFundingFilters({ ...fundingFilters, fullRide: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Full Ride (GRA/GTA)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={fundingFilters.tuitionWaiver}
                      onChange={(e) =>
                        setFundingFilters({ ...fundingFilters, tuitionWaiver: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Tuition Waiver</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={fundingFilters.daadStipend}
                      onChange={(e) =>
                        setFundingFilters({ ...fundingFilters, daadStipend: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>DAAD Stipend</span>
                  </label>
                </div>

                {/* More Filters button matching Figma */}
                <button
                  type="button"
                  onClick={() => setShowMoreFiltersModal(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  <span>More Filters (GRE/IELTS Waived)</span>
                </button>
              </div>
            </div>

            {/* Result Header & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600 px-1">
              <div>
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {filteredUniversities.length} Highest Ranked Matches
                </span>{" "}
                based on Rahul&apos;s verified scores
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <span className="text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "match" | "rank" | "name")}
                  className="text-xs font-semibold text-blue-600 bg-transparent border-0 cursor-pointer focus:ring-0 p-0"
                >
                  <option value="match">Highest Match % ▾</option>
                  <option value="rank">QS World Rank ▾</option>
                  <option value="name">University Name ▾</option>
                </select>
              </div>
            </div>

            {/* University Cards List */}
            <div className="space-y-4">
              {filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni) => (
                  <UniversityMatchCard
                    key={uni.id}
                    university={uni}
                    isShortlisted={shortlistedIds.includes(uni.id)}
                    onToggleShortlist={handleToggleShortlist}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-3">
                  <p className="text-gray-600 font-medium">
                    No university matches found for your current filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("all");
                      setSelectedBand("all");
                      setFundingFilters({ fullRide: true, tuitionWaiver: true, daadStipend: false });
                      setSearchQuery("");
                    }}
                    className="text-xs font-bold text-blue-600 underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT 4 COLUMNS: Sidebar Widgets matching Figma UI */}
          <section className="lg:col-span-4">
            <SidebarWidgets
              alerts={sampleVerificationAlerts}
              checklist={sampleReadinessChecklist}
              exchangeRates={sampleExchangeRates}
            />
          </section>
        </div>
      </main>

      {/* 3. Footer matching Figma UI */}
      <DashboardFooter />

      {/* MORE FILTERS MODAL */}
      {showMoreFiltersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Advanced Verification Filters
              </h3>
              <button
                type="button"
                onClick={() => setShowMoreFiltersModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="space-y-1">
                <label className="font-bold text-gray-800">Standardized Testing Requirements</label>
                <div className="space-y-1.5 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    <span>GRE Waived or Not Required</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    <span>IELTS / TOEFL Score Met (7.5+ verified)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t">
                <label className="font-bold text-gray-800">Admissions Deadlines</label>
                <div className="space-y-1.5 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    <span>Open Fall 2026 Admissions Cycles</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" />
                    <span>Rolling Deadlines Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowMoreFiltersModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowMoreFiltersModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MILESTONES MODAL */}
      {showMilestonesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                All 8 Application Timeline Milestones
              </h3>
              <button
                type="button"
                onClick={() => setShowMilestonesModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 text-xs">
              {[
                { title: "Stanford Knight-Hennessy", days: "14 Days", sub: "Final Essay & Video Statement", urgent: true },
                { title: "TUM Informatics", days: "32 Days", sub: "VPD Uni-Assist Verification", urgent: false },
                { title: "Georgia Tech Computing Systems", days: "45 Days", sub: "GRA Priority Consideration Deadline", urgent: false },
                { title: "University of Michigan MSI", days: "60 Days", sub: "UMSI Merit Fellowship Consideration", urgent: false },
                { title: "WES Official Evaluation", days: "Completed", sub: "Credential audit verified", urgent: false, done: true },
                { title: "Mentor Sarah K. SOP Final Signoff", days: "Completed", sub: "Statement polished", urgent: false, done: true },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/70"
                >
                  <div>
                    <div className="font-bold text-gray-900">{m.title}</div>
                    <div className="text-[11px] text-gray-500">{m.sub}</div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      m.done
                        ? "bg-emerald-100 text-emerald-800"
                        : m.urgent
                        ? "bg-rose-600 text-white"
                        : "bg-slate-700 text-white"
                    }`}
                  >
                    {m.days}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowMilestonesModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
