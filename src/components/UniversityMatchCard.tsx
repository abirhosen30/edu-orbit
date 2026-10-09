'use client';

import Link from "next/link";
import { UniversityMatch } from "@/data/matchedUniversities";

interface UniversityMatchCardProps {
  university: UniversityMatch;
  isShortlisted?: boolean;
  onToggleShortlist?: (id: string) => void;
}

export default function UniversityMatchCard({
  university,
  isShortlisted = false,
  onToggleShortlist,
}: UniversityMatchCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all p-5 space-y-4">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* University Identity */}
        <div className="flex items-start gap-3">
          {/* Logo Box */}
          <div
            className={`w-11 h-11 rounded-lg ${university.logoBg} ${university.logoColor} border border-blue-100 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs`}
          >
            {university.logoInitial}
          </div>

          <div>
            {/* Band & QS Rank & Location */}
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${
                  university.band === "Dream"
                    ? "bg-purple-100 text-purple-800"
                    : university.band === "Target"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {university.band}
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                QS Rank #{university.qsRank} • {university.location}
              </span>
            </div>

            {/* University Name */}
            <h3 className="text-base font-extrabold text-gray-900 tracking-tight leading-snug">
              {university.name}
            </h3>

            {/* Degree Program */}
            <p className="text-xs font-semibold text-blue-600 mt-0.5">
              {university.program}
            </p>
          </div>
        </div>

        {/* Badges on right: Eligibility & Match % */}
        <div className="flex flex-row sm:flex-col items-end gap-1.5 shrink-0 self-start">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              university.eligibilityStatus === "Eligible"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                university.eligibilityStatus === "Eligible"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
            ></span>
            <span>{university.eligibilityStatus}</span>
          </span>

          <span className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-black px-2 py-0.5 rounded-md">
            {university.matchPercentage}% Match
          </span>
        </div>
      </div>

      {/* 2. Middle Funding Highlight Box */}
      <div className="bg-[#f0fbf5] border border-emerald-200/70 rounded-xl p-3.5 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* Funding program title */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900">
            <span className="text-blue-600 shrink-0">
              {university.funding.icon === "assistantship" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              )}
              {university.funding.icon === "tuition-free" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              {university.funding.icon === "fellowship" && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </span>
            <span>{university.funding.title}</span>
          </div>

          {/* Headline Amount */}
          <div className={`text-sm sm:text-base font-black ${university.funding.headlineColor || "text-emerald-700"}`}>
            {university.funding.headline}
          </div>
        </div>

        {/* Subtext description */}
        <p className="text-xs text-gray-600 leading-relaxed font-normal">
          {university.funding.details}
        </p>
      </div>

      {/* 3. Action Needed Warning Box (if applicable) */}
      {university.actionRequired && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-2.5 flex items-start gap-2 text-xs text-amber-900">
          <div className="text-amber-600 shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <span className="font-bold text-amber-900">{university.actionRequired.title} </span>
            <span className="text-amber-800">{university.actionRequired.description}</span>
          </div>
        </div>
      )}

      {/* 4. Rule Check Preview (Automated Verification) */}
      <div className="space-y-1.5 pt-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          RULE CHECK PREVIEW (AUTOMATED VERIFICATION)
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {university.ruleChecks.map((rule, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                rule.status === "pass"
                  ? "bg-slate-50 border-slate-200 text-gray-700"
                  : rule.status === "pending"
                  ? "bg-amber-50/60 border-amber-200/80 text-amber-900 font-semibold"
                  : "bg-slate-50 border-slate-200 text-gray-700"
              }`}
            >
              {rule.status === "pass" && (
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0">
                  ✓
                </span>
              )}
              {rule.status === "pending" && (
                <span className="w-3.5 h-3.5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-[10px] font-black shrink-0">
                  !
                </span>
              )}
              {rule.status === "optional" && (
                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black shrink-0">
                  ✓
                </span>
              )}
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
        {/* Verification stamp */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="truncate">{university.verifiedText}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleShortlist?.(university.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              isShortlisted
                ? "bg-blue-50 border-blue-400 text-blue-700"
                : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${isShortlisted ? "text-blue-600 fill-blue-600" : "text-gray-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>{isShortlisted ? "Saved in Shortlist" : "Save to Shortlist"}</span>
          </button>

          <Link
            href={`/match-detail?university=${university.id}`}
            className="flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-2xs"
          >
            <span>View Deep Breakdown</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
