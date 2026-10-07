import type { Metadata } from "next";
import Link from "next/link";
import MatchDetailNavbar from "@/components/MatchDetailNavbar";
import Footer from "@/components/Footer";
import { universitiesData } from "@/data/universities";
import UniversityMatchDetails from "./UniversityMatchDetails";

export const metadata: Metadata = {
  title: "University Scholarship Match Detail | EduOrbit",
  description:
    "Review university scholarship details, funding coverage, and official admissions links.",
};

type MatchDetailPageProps = {
  searchParams: Promise<{ university?: string | string[] }>;
};

export default async function MatchDetailPage({
  searchParams,
}: MatchDetailPageProps) {
  const requestedUniversity = (await searchParams).university;
  const universityId = Array.isArray(requestedUniversity)
    ? requestedUniversity[0]
    : requestedUniversity;
  const university = universitiesData.find((item) => item.id === universityId);

  if (university && university.id !== "stanford") {
    return <UniversityMatchDetails university={university} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans">
      <MatchDetailNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-gray-500 pb-1"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link href="/#scholarships" className="hover:text-blue-600 transition-colors">
            Matched Scholarships
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700">Stanford University</span>
          <span className="text-gray-400">›</span>
          <span className="text-blue-600 font-semibold">Knight-Hennessy Scholars</span>
        </nav>

        {/* TOP HEADER CARD: University & Program Overview */}
        <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Row 1: University Identity + Official Verification Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* University Logo Box */}
              <div className="w-14 h-14 rounded-xl bg-red-800 text-white font-serif font-black text-xl flex items-center justify-center shrink-0 shadow-xs">
                SU
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-gray-900">
                    Stanford University
                  </h2>
                  <a
                    href="https://stanford.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5 font-medium underline"
                  >
                    stanford.edu
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Palo Alto, California, United States • <span className="font-semibold text-gray-700">QS World Rank #3</span>
                </p>
              </div>
            </div>

            {/* Official Verification Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-medium self-start sm:self-center">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>
                Official Verification Badge — <strong>Verified October 18, 2024</strong> by EduOrbit Research Team
              </span>
            </div>
          </div>

          {/* Row 2: Tag Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-blue-100/70 text-blue-800">
              FLAGSHIP FELLOWSHIP
            </span>
            <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
              Concurrent M.S. Track
            </span>
          </div>

          {/* Row 3: Program Title & Description */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Knight-Hennessy Scholars Program (Graduate Fellowship)
            </h1>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-4xl">
              In conjunction with the Master of Science in Computer Science at Stanford School of Engineering. Full endowment covering degree tuition, living stipends, academic travel, and multidisciplinary global leadership coaching.
            </p>
          </div>

          {/* Row 4: Key Metrics 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Metric 1 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
                <span>Total Financial Award</span>
                <span className="text-blue-600 text-sm">💰</span>
              </div>
              <p className="text-lg font-black text-gray-900">
                Full Tuition + $45k/yr
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Living stipend + annual roundtrip airfare
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
                <span>Submission Deadline</span>
                <span className="text-red-500 text-sm">⏳</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-black text-gray-900">Nov 15, 2024</span>
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  41 Days Left
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                23:59 Pacific Standard Time (PST)
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
                <span>Selectivity Index</span>
                <span className="text-purple-600 text-sm">📈</span>
              </div>
              <p className="text-lg font-black text-gray-900">
                Dream Tier
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Historical Admit Rate: 1.6% of global pool
              </p>
            </div>

            {/* Metric 4 */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                <span>Fit & Match Engine</span>
                <span className="text-emerald-600">●</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-emerald-900">Eligible</span>
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                  98% Fit
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                5 of 5 core academic rules satisfied
              </p>
            </div>
          </div>
        </section>

        {/* MAIN 2-COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN (8 Cols) ================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* CARD 1: Non-Black-Box Match Validation */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold text-base">⚡</span>
                    <h3 className="text-base font-bold text-gray-900">
                      Non-Black-Box Match Validation
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Audited against Knight-Hennessy 2024/2025 cohort specifications and Stanford CS Admissions guidelines.
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    System Confidence: High (Deterministic)
                  </span>
                </div>
              </div>

              {/* Validation Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-3">University Criteria</th>
                      <th className="py-2.5 px-3">Your Verified Profile</th>
                      <th className="py-2.5 px-3 text-right">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-800">
                        Bachelor&apos;s degree earned within past 4 years (Jan 2021 or later)
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        B.Tech / B.E. Confirmed June 2023
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          ✓ Passed
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-800">
                        Minimum Cumulative Undergrad GPA 3.50+ (or equivalent: 85%+)
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        3.72 / 4.00 US Equiv. Transcript
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          ✓ Passed
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-800">
                        English Proficiency: TOEFL 100+ (iBT) or Academic IELTS 7.5+
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        IELTS Academic 7.5 (L:8.5, R:8.0, W:7.0, S:7.0)
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          ✓ Passed
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-800">
                        Demonstrated Civic Mindset &amp; Independent Leadership
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        Co-Founder, Open-Source Rural EdTech Initiative
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          ★ Flagged High Fit
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-800">
                        Dual Application: Stanford MS Computer Science department filing
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        Draft initiated; departmental deadline Dec 3, 2024
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          ⚠ Action Needed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Admissions Counselor Note Callout */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
                <span className="text-blue-600 text-sm mt-0.5">ℹ</span>
                <div>
                  <strong className="font-semibold text-blue-950">Admissions Counselor Note:</strong>{" "}
                  Knight-Hennessy does not evaluate applicants in isolation from their target degree. Ensure your MS CS department statement of purpose explicitly mirrors the visionary leadership principles outlined in your KH fellowship essays.
                </div>
              </div>
            </section>

            {/* CARD 2: Official Financials & Living Cost Analysis */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-base">💵</span>
                    <h3 className="text-base font-bold text-gray-900">
                      Official Financials &amp; Living Cost Analysis
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Full fellowship appraisal calibrated with Stanford Palo Alto on-campus housing indexes.
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                    TOTAL PACKAGE VALUE
                  </span>
                  <span className="text-lg font-black text-gray-900">
                    $94,200 <span className="text-xs font-normal text-gray-500">/ year</span>
                  </span>
                </div>
              </div>

              {/* 4 Financial Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block mb-0.5">Tuition &amp; Fees</span>
                  <span className="text-base font-extrabold text-gray-900 block">$58,500</span>
                  <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    100% Waived directly
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block mb-0.5">Living Stipend</span>
                  <span className="text-base font-extrabold text-gray-900 block">$31,500</span>
                  <span className="mt-1 inline-block text-[10px] text-gray-500">
                    $2,625 / monthly disb.
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block mb-0.5">Cardinal Care Health</span>
                  <span className="text-base font-extrabold text-gray-900 block">$4,200</span>
                  <span className="mt-1 inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Fully covered premium
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
                  <span className="text-[11px] text-gray-500 block mb-0.5">Travel Stipend</span>
                  <span className="text-base font-extrabold text-gray-900 block">$2,000</span>
                  <span className="mt-1 inline-block text-[10px] text-gray-500">
                    Annual roundtrip travel
                  </span>
                </div>
              </div>

              {/* Monthly Purchasing Power & Surplus Budget */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Monthly Purchasing Power &amp; Surplus Budget (Palo Alto, CA)
                </h4>

                {/* Progress Bar 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                      Knight-Hennessy Monthly Fellowship Disbursal
                    </span>
                    <span className="text-blue-700 font-bold">$2,625 / mo</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-full"></div>
                  </div>
                </div>

                {/* Progress Bar 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block"></span>
                      Stanford Graduate Housing &amp; Bay Area Baseline Cost
                    </span>
                    <span className="text-gray-900 font-bold">$2,450 / mo</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 rounded-full" style={{ width: "93.3%" }}></div>
                  </div>
                </div>

                {/* Surplus Callout */}
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                    <span>🌱</span>
                    <span>Estimated Net Monthly Surplus (Academic Discretionary Reserves):</span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-700">
                    +$175 / mo
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 text-center sm:text-left pt-1">
                  Reference valuation: Approx. ~₹78.5 Lakhs INR / ₨2.6 Crore PKR total program equivalent value.
                </p>
              </div>
            </section>

            {/* CARD 3: Step-by-Step Admissions Pipeline */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-base">🗺️</span>
                  <h3 className="text-base font-bold text-gray-900">
                    Step-by-Step Admissions Pipeline
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Dual-stage timeline requirements. Missing the concurrent department cutoff nullifies the fellowship.
                </p>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                {/* Stage 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-gray-900">
                        Stage 1: Knight-Hennessy Online Application
                      </h4>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Active Priority
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Submission of central online portal: 3 short essay prompts, 1 video statement, resume, and 2 designated recommendation letters.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                      <span className="font-semibold text-red-600">📅 Cutoff: November 15, 2024</span>
                      <span>•</span>
                      <span>Fee: $0 (No fellowship fee)</span>
                    </div>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-gray-900">
                        Stage 2: Stanford MS CS Department Application
                      </h4>
                      <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        Concurrent Filing
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Official Stanford Graduate Admissions portal submission directly to the Department of Computer Science. Includes GRE scores (optional) and departmental SOP.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                      <span className="font-semibold text-gray-800">📅 Cutoff: December 3, 2024</span>
                      <span>•</span>
                      <span>Fee: $125 (Eligible for fee waiver)</span>
                    </div>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-slate-700 text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">
                      Stage 3: Immersion Weekend Finalist Selection
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Invitations extended to top ~140 candidates worldwide for individual interviews, group problem solving, and faculty interaction at Stanford campus.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                      <span>📅 Schedule: February 7-8, 2025 (All airfare &amp; lodging covered by KH)</span>
                    </div>
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="relative">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-300 text-slate-700 text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900">
                      Stage 4: Final Award Notification
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Formal announcement of 85-90 global Knight-Hennessy Scholars for the 2025 cohort.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                      <span>📅 Notification Date: Mid-March 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ================= RIGHT COLUMN (4 Cols) ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* CANDIDATE WORKFLOW ACTION CARD */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 tracking-wider uppercase">
                <span className="text-blue-600">⚡</span>
                <span>CANDIDATE WORKFLOW</span>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add to Active Tracker</span>
                </button>

                <a
                  href="https://knight-hennessy.stanford.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] text-gray-700 font-semibold text-xs transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Open Stanford KH Portal</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <p className="text-[11px] text-gray-500 leading-normal text-center">
                Application synchronization active. EduOrbit alerts will trigger 72h prior to the deadline.
              </p>
            </section>

            {/* REQUIRED DOSSIER CARD */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900">
                  Required Dossier
                </h3>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  3 of 5 Prepared
                </span>
              </div>

              <div className="space-y-3">
                {/* Dossier Item 1 */}
                <div className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 leading-snug">
                      Undergraduate Official Transcripts
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Uploaded &amp; Verified (3.72 GPA)
                    </p>
                  </div>
                </div>

                {/* Dossier Item 2 */}
                <div className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 leading-snug">
                      IELTS Test Report Form (TRF)
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Electronic scores verified (7.5)
                    </p>
                  </div>
                </div>

                {/* Dossier Item 3 */}
                <div className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 leading-snug">
                      Academic Curriculum Vitae (CV)
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Formatted to 2-page KH guidelines
                    </p>
                  </div>
                </div>

                {/* Dossier Item 4 */}
                <div className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ○
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 leading-snug">
                        Knight-Hennessy Core Essays
                      </p>
                      <button type="button" className="text-blue-600 hover:underline font-semibold text-[11px]">
                        AI Guide
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Prompt 1 &amp; 2 Drafts in review
                    </p>
                  </div>
                </div>

                {/* Dossier Item 5 */}
                <div className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ○
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 leading-snug">
                        Two Recommendation Letters
                      </p>
                      <button type="button" className="text-blue-600 hover:underline font-semibold text-[11px]">
                        Nudge
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      1 of 2 professors submitted
                    </p>
                  </div>
                </div>
              </div>

              {/* Free Templates */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500 flex-wrap">
                <span className="font-medium text-gray-600">Free Templates:</span>
                <a href="#sop-guide" className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
                  📄 KH SOP Guide
                </a>
                <a href="#resume-spec" className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
                  📄 Resume Spec
                </a>
              </div>
            </section>

            {/* SIMILAR HIGH-MATCH FELLOWSHIPS CARD */}
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                Similar High-Match Fellowships
              </h3>

              <div className="space-y-3">
                {/* Match 1 */}
                <Link
                  href="/match-detail"
                  className="p-2.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Gates Cambridge
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                        96% Fit
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      University of Cambridge • Full Ride
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition-colors text-xs font-bold pl-2">
                    ›
                  </span>
                </Link>

                {/* Match 2 */}
                <Link
                  href="/match-detail"
                  className="p-2.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Schwarzman Scholars
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                        92% Fit
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Tsinghua University • Global Leadership
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition-colors text-xs font-bold pl-2">
                    ›
                  </span>
                </Link>

                {/* Match 3 */}
                <Link
                  href="/match-detail"
                  className="p-2.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Erasmus Mundus Joint Masters
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        89% Fit
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      European Consortium • Multi-country
                    </p>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition-colors text-xs font-bold pl-2">
                    ›
                  </span>
                </Link>
              </div>
            </section>

            {/* REPORT DISCREPANCY LINK */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center">
              <a
                href="#report"
                className="text-[11px] text-gray-500 hover:text-gray-800 transition-colors inline-flex items-center gap-1.5"
              >
                <span>🚩</span>
                <span>Spotted an outdated rule?</span>
                <span className="underline font-semibold text-blue-600">Report Data Discrepancy</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
