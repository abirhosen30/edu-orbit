'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import EligibilityNavbar from "@/components/EligibilityNavbar";
import DashboardFooter from "@/components/DashboardFooter";
import MilestoneCards from "./MilestoneCards";
import UniversityDeadlineCard from "./UniversityDeadlineCard";
import DeadlinesSidebar from "./DeadlinesSidebar";
import { useBrowserStorage } from "@/lib/useBrowserStorage";
import { sampleMatchedUniversities } from "@/data/matchedUniversities";
import {
  trackerMetricsData,
  sampleUniversitiesDeadlines,
  MilestoneItem,
} from "@/data/deadlinesTracker";

const emptyShortlist: string[] = [];

export default function DeadlinesTrackerClient() {
  // Navigation & Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Categories: "all" | "Priority / Fellowships" | "University Portals" | "Document Audits"
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // View Mode: "board" | "gantt"
  const [viewMode, setViewMode] = useState<"board" | "gantt">("board");

  // Modals state
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);
  const [showCodesModal, setShowCodesModal] = useState(false);

  // Custom added milestones state
  const [universitiesData, setUniversitiesData, storageError] = useBrowserStorage(
    "eduorbit_deadline_milestones",
    sampleUniversitiesDeadlines
  );
  const [shortlistedIds, setShortlistedIds] = useBrowserStorage(
    "eduorbit_university_shortlist",
    emptyShortlist
  );
  const [mutationError, setMutationError] = useState("");
  const savedUniversities = sampleMatchedUniversities.filter((university) =>
    shortlistedIds.includes(university.id)
  );

  // New Milestone Form State
  const [newMilestoneUni, setNewMilestoneUni] = useState("stanford");
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneCategory, setNewMilestoneCategory] = useState<
    "Priority / Fellowships" | "University Portals" | "Document Audits"
  >("Document Audits");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;

    const newItem: MilestoneItem = {
      id: `custom-${Date.now()}`,
      type: "in-progress",
      title: newMilestoneTitle,
      statusBadge: { text: "Custom Added", color: "blue" },
      details: "Self-scheduled deadline step.",
      deadlineText: newMilestoneDate
        ? new Date(`${newMilestoneDate}T12:00:00`).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "TBD",
      deadlineDate: newMilestoneDate || undefined,
      isCustom: true,
      rightBadge: { text: newMilestoneDate ? "Scheduled" : "Upcoming" },
      category: newMilestoneCategory,
    };

      try {
        setUniversitiesData((prev) =>
          prev.map((uni) => {
            if (uni.id === newMilestoneUni) {
              return {
                ...uni,
                milestones: [newItem, ...uni.milestones],
              };
            }
            return uni;
          })
        );
        setMutationError("");
      } catch {
        setMutationError("Could not save the milestone in this browser. Check storage settings and try again.");
        return;
      }

    setNewMilestoneTitle("");
    setNewMilestoneDate("");
    setShowAddMilestoneModal(false);
  };

  const handleRemoveMilestone = (milestoneId: string) => {
    try {
      setUniversitiesData((current) =>
        current.map((university) => ({
          ...university,
          milestones: university.milestones.filter(
            (milestone) => milestone.id !== milestoneId
          ),
        }))
      );
      setMutationError("");
    } catch {
      setMutationError("Could not remove the milestone. Check browser storage settings and try again.");
    }
  };

  const handleRemoveShortlist = (id: string) => {
    try {
      setShortlistedIds((current) => current.filter((savedId) => savedId !== id));
    } catch {
      setMutationError("Could not update your university shortlist. Check browser storage settings and try again.");
    }
  };

  // Filter Universities and their milestones
  const filteredUniversities = useMemo(() => {
    return universitiesData
      .map((uni) => {
        // Filter milestones inside the university based on active category and search
        const matchedMilestones = uni.milestones.filter((m) => {
          // Category filter
          if (activeCategory !== "all" && m.category !== activeCategory) {
            return false;
          }

          // Search query
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const inTitle = m.title.toLowerCase().includes(q);
            const inDetails = m.details.toLowerCase().includes(q);
            const inUni = uni.name.toLowerCase().includes(q);
            if (!inTitle && !inDetails && !inUni) return false;
          }

          return true;
        });

        return {
          ...uni,
          milestones: matchedMilestones,
        };
      })
      .filter((uni) => uni.milestones.length > 0);
  }, [universitiesData, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans antialiased">
      {/* 1. Top Navbar matching Image 1 */}
      <EligibilityNavbar
        shortlistCount={shortlistedIds.length}
        savedUniversities={savedUniversities}
        onRemoveSavedUniversity={handleRemoveShortlist}
        activeSubTab="deadlines"
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* 2. Main Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-gray-500 font-medium"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/eligibility" className="hover:text-blue-600 transition-colors">
            Student Dashboard
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-bold">
            Application &amp; Deadline Tracker
          </span>
        </nav>

        {/* Page Title & Actions Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Application Deadlines &amp; Milestone Tracker
              </h1>

              {/* Verified badges beside title */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200">
                  <span>⏱</span>
                  <span>Synchronized to Target Timezones</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                  <span>✓</span>
                  <span>Official Fall 2025 Intake Verified</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 max-w-4xl leading-relaxed">
              Live tracked deadlines for your 4 shortlisted programs and linked fellowships. Automatic countdowns adjusted to EST, CET, and your local time (IST, UTC+5:30).
            </p>
          </div>

          {/* Top Right Action Buttons matching Figma */}
          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setShowCalendarModal(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-all shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Sync to Calendar</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddMilestoneModal(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-2xs cursor-pointer"
            >
              <span className="text-sm font-black">+</span>
              <span>Add Custom Milestone</span>
            </button>
          </div>
        </div>

        {/* Filter Pills & View Mode Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Left Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              All (11 Milestones)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("Priority / Fellowships")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCategory === "Priority / Fellowships"
                  ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Priority / Fellowships (4)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("University Portals")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCategory === "University Portals"
                  ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              University Portals (4)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("Document Audits")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCategory === "Document Audits"
                  ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Document Audits (3)
            </button>
          </div>

          {/* Right View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/80 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("board")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === "board"
                  ? "bg-white text-gray-900 shadow-2xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>⊟</span>
              <span>Board / List View</span>
            </button>

            <Link
              href="/deadlines/gantt"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-md text-gray-600 hover:text-gray-900 transition-all cursor-pointer"
            >
              <span>~</span>
              <span>Timeline Gantt</span>
            </Link>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <MilestoneCards
          metrics={trackerMetricsData}
          onViewCodes={() => setShowCodesModal(true)}
        />

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 8 COLUMNS: University Milestone Cards */}
          <section className="lg:col-span-8 space-y-4">
            {storageError || mutationError ? (
              <p
                role="alert"
                className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
              >
                {mutationError || storageError}
              </p>
            ) : null}

            {viewMode === "board" ? (
              filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni) => (
                  <UniversityDeadlineCard
                    key={uni.id}
                    item={uni}
                    onRemoveMilestone={handleRemoveMilestone}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-3">
                  <p className="text-gray-600 font-medium">
                    No milestones found matching the selected filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("all");
                      setSearchQuery("");
                    }}
                    className="text-xs font-bold text-blue-600 underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )
            ) : (
              /* Gantt Timeline View */
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 shadow-2xs">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-extrabold text-sm text-gray-900">
                    Chronological Timeline
                  </h3>
                  <span className="text-xs text-gray-500">
                    {universitiesData.reduce(
                      (total, university) =>
                        total +
                        university.milestones.filter(
                          (milestone) => milestone.deadlineDate || milestone.deadlineText
                        ).length,
                      0
                    )}{" "}
                    dated milestones
                  </span>
                </div>

                <div className="space-y-4">
                  {universitiesData
                    .flatMap((university) =>
                      university.milestones.flatMap((milestone) => {
                        const timestamp = milestone.deadlineDate
                          ? new Date(`${milestone.deadlineDate}T23:59:59`).getTime()
                          : milestone.deadlineText
                            ? Date.parse(milestone.deadlineText)
                            : Number.NaN;
                        return Number.isNaN(timestamp)
                          ? []
                          : [{ university, milestone, timestamp }];
                      })
                    )
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map(({ university, milestone, timestamp }) => {
                      const days = Math.ceil(
                        (timestamp - new Date().setHours(0, 0, 0, 0)) /
                          (1000 * 60 * 60 * 24)
                      );
                      const deadlineLabel = new Date(timestamp).toLocaleDateString(
                        undefined,
                        { month: "short", day: "numeric", year: "numeric" }
                      );
                      const statusLabel =
                        days < 0
                          ? `${Math.abs(days)} days overdue`
                          : days === 0
                            ? "Due today"
                            : `${days} days left`;
                      return (
                    <div key={milestone.id} className="flex items-center gap-4 text-xs">
                      <div className="w-28 font-bold text-gray-700 shrink-0">{deadlineLabel}</div>
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></div>
                      <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="font-semibold text-gray-900">
                          {milestone.title}
                          <span className="ml-1 font-normal text-gray-500">· {university.shortName}</span>
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded self-start sm:self-auto ${
                            days <= 7 ? "bg-rose-600 text-white" : days < 0 ? "bg-slate-200 text-gray-500" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                      );
                    })}
                  {universitiesData.every((university) =>
                    university.milestones.every(
                      (milestone) =>
                        !milestone.deadlineDate &&
                        (!milestone.deadlineText ||
                          Number.isNaN(Date.parse(milestone.deadlineText)))
                    )
                  ) ? (
                    <p className="py-6 text-center text-sm text-gray-500">
                      No dated milestones yet. Add a milestone with a deadline to see it here.
                    </p>
                  ) : null}
                </div>
              </div>
            )}
          </section>

          {/* RIGHT 4 COLUMNS: Sidebar */}
          <section className="lg:col-span-4">
            <DeadlinesSidebar />
          </section>
        </div>
      </main>

      {/* 3. Footer matching Image 3 */}
      <DashboardFooter />

      {/* CALENDAR SYNC MODAL */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Sync Deadlines to Calendar
              </h3>
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Export all 11 verified milestone deadlines with automatic timezone conversion into your preferred calendar app.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-slate-50 font-bold text-gray-800 transition-colors cursor-pointer"
              >
                <span>📅 Google Calendar Sync (.ics live feed)</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-slate-50 font-bold text-gray-800 transition-colors cursor-pointer"
              >
                <span>🍏 Apple Calendar (.ics file)</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-slate-50 font-bold text-gray-800 transition-colors cursor-pointer"
              >
                <span>📧 Microsoft Outlook Sync</span>
                <span>→</span>
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Close
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
                Add Custom Milestone Step
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMilestoneModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMilestoneSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Target University
                </label>
                <select
                  value={newMilestoneUni}
                  onChange={(e) => setNewMilestoneUni(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800 bg-white"
                >
                  <option value="stanford">Stanford University</option>
                  <option value="gatech">Georgia Institute of Technology</option>
                  <option value="tum">Technical University of Munich (TUM)</option>
                  <option value="umich">University of Michigan — Ann Arbor</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Milestone Task Title
                </label>
                <input
                  type="text"
                  required
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  placeholder="e.g. Schedule Interview Practice / Re-read SOP"
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Category
                </label>
                <select
                  value={newMilestoneCategory}
                  onChange={(e) =>
                    setNewMilestoneCategory(
                      e.target.value as "Priority / Fellowships" | "University Portals" | "Document Audits"
                    )
                  }
                  className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-800 bg-white"
                >
                  <option value="Priority / Fellowships">Priority / Fellowships</option>
                  <option value="University Portals">University Portals</option>
                  <option value="Document Audits">Document Audits</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Target Deadline Date
                </label>
                <input
                  type="date"
                  value={newMilestoneDate}
                  onChange={(e) => setNewMilestoneDate(e.target.value)}
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
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRIORITY APPLICATION CODES MODAL */}
      {showCodesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Institutional Fee Waiver Codes
              </h3>
              <button
                type="button"
                onClick={() => setShowCodesModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg">
                <div className="font-bold text-blue-900">Stanford University (KHS Dual Track)</div>
                <div className="text-gray-600 text-[11px] mt-0.5">Application fee automatic institutional waiver applied.</div>
                <div className="font-mono font-bold text-blue-700 text-xs mt-1">CODE: EDUORBIT-KHS-2025</div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg">
                <div className="font-bold text-blue-900">Georgia Institute of Technology</div>
                <div className="text-gray-600 text-[11px] mt-0.5">Graduate department research fee concession.</div>
                <div className="font-mono font-bold text-blue-700 text-xs mt-1">CODE: GT-MSCS-WAIVE-25</div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowCodesModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
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
