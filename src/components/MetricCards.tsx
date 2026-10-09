'use client';

import { MetricCardData } from "@/data/matchedUniversities";

interface MetricCardsProps {
  data: MetricCardData;
  onOpenMilestones?: () => void;
}

export default function MetricCards({ data, onOpenMilestones }: MetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* CARD 1: Profile Health & Readiness */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-2">
            <span>Profile Health &amp; Readiness</span>
            <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Metric */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-black text-gray-900 tracking-tight">
              {data.profileHealth.score}%
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {data.profileHealth.badge}
            </span>
          </div>
        </div>

        {/* Action Prompt Callout */}
        <div className="bg-sky-50/70 border border-sky-200/60 rounded-lg p-2.5 flex items-start gap-2 text-xs text-slate-700">
          <div className="text-blue-600 shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <p className="text-[11px] leading-tight text-gray-700">
            Add 1 quantitative LOR to unlock{" "}
            <span className="font-bold text-gray-900">3 more full-ride scholarships</span>.
          </p>
        </div>
      </div>

      {/* CARD 2: Total Matched Funding */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-2">
            <span>Total Matched Funding</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Metric */}
          <div className="mb-2">
            <div className="text-3xl font-black text-gray-900 tracking-tight">
              {data.matchedFunding.amount}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">
              {data.matchedFunding.inrEquivalent}
            </div>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-1.5 pt-2 border-t border-gray-100 text-[11px]">
          {data.matchedFunding.breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${item.color}`}></span>
                <span>{item.label}</span>
              </div>
              <span className="font-bold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 3: Upcoming Critical Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-2">
            <span>Upcoming Critical Deadlines</span>
            <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Deadlines List */}
          <div className="space-y-2 mb-2">
            {data.criticalDeadlines.items.map((item) => (
              <div
                key={item.id}
                className={`p-2 rounded-lg border flex items-center justify-between ${
                  item.colorTheme === "rose"
                    ? "bg-rose-50/60 border-rose-200/70"
                    : "bg-slate-50 border-slate-200/70"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-gray-900 truncate">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {item.action}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.colorTheme === "rose"
                      ? "bg-rose-600 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {item.daysRemaining} Days
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone link */}
        <button
          type="button"
          onClick={onOpenMilestones}
          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer pt-1"
        >
          <span>View all {data.criticalDeadlines.totalMilestones} timeline milestones</span>
          <span>→</span>
        </button>
      </div>

      {/* CARD 4: Application Pipeline */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-semibold mb-2">
            <span>Application Pipeline</span>
            <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {/* 3 Metric Columns */}
          <div className="grid grid-cols-3 gap-2 text-center py-1 mb-2">
            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-1.5">
              <div className="text-xl font-black text-gray-900 leading-none">
                {data.applicationPipeline.drafting}
              </div>
              <div className="text-[10px] text-gray-500 font-medium mt-1">Drafting</div>
            </div>
            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-1.5">
              <div className="text-xl font-black text-gray-900 leading-none">
                {data.applicationPipeline.submitted}
              </div>
              <div className="text-[10px] text-gray-500 font-medium mt-1">Submitted</div>
            </div>
            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-1.5">
              <div className="text-xl font-black text-gray-900 leading-none">
                {data.applicationPipeline.interview}
              </div>
              <div className="text-[10px] text-gray-500 font-medium mt-1">Interview</div>
            </div>
          </div>
        </div>

        {/* Next Interview Highlight Box */}
        <div className="bg-sky-50/70 border border-sky-200/60 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
          <span className="text-[11px] font-medium text-gray-700 truncate pr-1">
            Next Interview: {data.applicationPipeline.nextInterview.university}
          </span>
          <span className="text-[11px] font-bold text-blue-600 shrink-0">
            {data.applicationPipeline.nextInterview.date}
          </span>
        </div>
      </div>
    </div>
  );
}
