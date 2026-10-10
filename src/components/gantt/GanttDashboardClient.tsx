'use client';

import { useState } from "react";
import Link from "next/link";
import EligibilityNavbar from "@/components/EligibilityNavbar";
import DashboardFooter from "@/components/DashboardFooter";
import GanttTimelineChart from "./GanttTimelineChart";
import ConflictDetectorWidget from "./ConflictDetectorWidget";
import MilestoneProgressWidget from "./MilestoneProgressWidget";

export default function GanttDashboardClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeUnit, setTimeUnit] = useState<"Weeks" | "Months" | "Quarterly">("Weeks");
  const [activeTrackCategory, setActiveTrackCategory] = useState("All Tracks (4)");

  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);
  const [showSanityModal, setShowSanityModal] = useState(false);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  const trackCategories = [
    "All Tracks (4)",
    "Fellowships & Grants",
    "Portal Cutoffs",
    "VPD / Verifications",
    "Recommendations (LORs)",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans antialiased">
      {/* 1. Header with primary nav & secondary sub-tab bar */}
      <EligibilityNavbar
        shortlistCount={4}
        activeSubTab="deadlines"
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Breadcrumbs & Verified badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-gray-500 font-medium flex-wrap"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">›</span>
            <Link href="/eligibility" className="hover:text-blue-600 transition-colors">
              Student Dashboard
            </Link>
            <span className="text-gray-400">›</span>
            <Link href="/deadlines" className="hover:text-blue-600 transition-colors">
              Application &amp; Deadline Tracker
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-bold">Gantt Timeline</span>
          </nav>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200">
              <span>⏱</span>
              <span>Synced to Target Timezones (PST, EST, CET, IST)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
              <span>●</span>
              <span>Fall 2025 Intake Verified</span>
            </span>
          </div>
        </div>

        {/* Page Title & View Switch Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Admissions &amp; Fellowship Gantt Timeline
              </h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md">
                Interactive Grid
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-4xl leading-relaxed">
              Coordinate complex overlapping institutional cutoffs, fellowship early-action windows, and VPD credential evaluations.
            </p>
          </div>

          {/* Action Buttons matching Figma */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto flex-wrap">
            {/* View Switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/80">
              <Link
                href="/deadlines"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md text-gray-600 hover:text-gray-900 transition-all cursor-pointer"
              >
                <span>⊟</span>
                <span>Board / List View</span>
              </Link>
              <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md bg-white text-blue-600 shadow-2xs">
                <span>~</span>
                <span>Timeline Gantt</span>
              </div>
            </div>

            {/* Export Calendar (.ics) */}
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-all shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Export Calendar (.ics)</span>
            </button>

            {/* Add Custom Milestone */}
            <button
              type="button"
              onClick={() => setShowAddMilestoneModal(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-2xs cursor-pointer"
            >
              <span className="text-sm font-black">+</span>
              <span>Add Custom Milestone</span>
            </button>
          </div>
        </div>

        {/* Gantt Control Box & Legend */}
        <div className="bg-white rounded-xl border border-gray-200/90 p-3.5 space-y-3 shadow-2xs">
          {/* Top Row: Time Unit toggle + Date navigator + Color Legend */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Unit Toggle: Weeks | Months | Quarterly */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
                {(["Weeks", "Months", "Quarterly"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setTimeUnit(unit)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      timeUnit === unit
                        ? "bg-white text-blue-600 font-bold shadow-2xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>

              {/* Navigator */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700">
                <button type="button" className="text-gray-400 hover:text-gray-700 px-1">
                  ‹
                </button>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Today: Nov 2024</span>
                </span>
                <button type="button" className="text-gray-400 hover:text-gray-700 px-1">
                  ›
                </button>
              </div>
            </div>

            {/* Legend matching Figma */}
            <div className="flex items-center gap-3.5 text-[11px] font-semibold text-gray-600 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-rose-600"></span>
                <span>Hard Cutoff</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-blue-600"></span>
                <span>Fellowship Priority</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-400"></span>
                <span>Document / VPD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span className="text-rose-700 font-bold">Today: Nov 06</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Track Filter Pills */}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 flex-wrap">
            {trackCategories.map((cat) => {
              const isSelected = activeTrackCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTrackCategory(cat)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Gantt Timeline Matrix Chart */}
        <GanttTimelineChart
          selectedCategory={activeTrackCategory}
          onConfigureTimezones={() => setShowTimezoneModal(true)}
        />

        {/* Bottom 2-Column Section: Conflict Detector & Milestone Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 cols: Conflict Detector */}
          <section className="lg:col-span-7">
            <ConflictDetectorWidget
              onBookSanityCheck={() => setShowSanityModal(true)}
            />
          </section>

          {/* Right 5 cols: Milestone Progress */}
          <section className="lg:col-span-5">
            <MilestoneProgressWidget />
          </section>
        </div>
      </main>

      {/* 3. Footer matching Image 3 */}
      <DashboardFooter />

      {/* EXPORT CALENDAR MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Export Gantt Calendar (.ics)
              </h3>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Download the complete Fall 2025 timeline feed containing all 11 milestone events, deadline buffers, and institutional reminders.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Gantt schedule .ics calendar exported successfully!");
                  setShowExportModal(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-blue-50/50 hover:bg-blue-100/60 font-bold text-blue-900 transition-colors"
              >
                <span>📥 Download eduorbit-fall2025.ics</span>
                <span>Download</span>
              </a>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIMEZONE MODAL */}
      {showTimezoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Timezone Synchronization
              </h3>
              <button
                type="button"
                onClick={() => setShowTimezoneModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600">
              All cutoffs are converted against your primary location: <strong>India Standard Time (IST, UTC+05:30)</strong>.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-bold text-gray-800">Stanford University</span>
                <span className="text-gray-600">PST (UTC -08:00) • -13.5h</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-bold text-gray-800">Georgia Tech</span>
                <span className="text-gray-600">EST (UTC -05:00) • -10.5h</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-bold text-gray-800">Technical University of Munich</span>
                <span className="text-gray-600">CET (UTC +01:00) • -4.5h</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowTimezoneModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SANITY CHECK MODAL */}
      {showSanityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Book Sanity Check with Advisor
              </h3>
              <button
                type="button"
                onClick={() => setShowSanityModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600">
              A 20-minute live screen-share with a senior mentor to audit your overlapping Stanford KH and TUM VPD schedule.
            </p>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
              <div className="font-bold text-blue-900">Next Available Slot: Tomorrow, 11:30 AM IST</div>
              <div className="text-blue-700">Advisor: Mentor Sarah K. (Ivy League Admissions Coach)</div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowSanityModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Sanity check slot confirmed! An invitation has been sent to your email.");
                  setShowSanityModal(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Confirm Slot (Free)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM MILESTONE MODAL */}
      {showAddMilestoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Add Timeline Milestone Step
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMilestoneModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Milestone added to your Gantt timeline!");
                setShowAddMilestoneModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  University / Track
                </label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800 bg-white">
                  <option>Stanford University (MS CS + KH)</option>
                  <option>Georgia Tech (MS CS)</option>
                  <option>TU Munich (TUM) (M.Sc. Informatics)</option>
                  <option>University of Michigan (MSI)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Milestone Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Video Statement Final Cut"
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Category Track
                </label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800 bg-white">
                  <option>Fellowships &amp; Grants</option>
                  <option>Portal Cutoffs</option>
                  <option>VPD / Verifications</option>
                  <option>Recommendations (LORs)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Target Deadline Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddMilestoneModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
