'use client';

import { TrackerSummaryMetrics } from "@/data/deadlinesTracker";

interface MilestoneCardsProps {
  metrics: TrackerSummaryMetrics;
  onViewCodes?: () => void;
}

export default function MilestoneCards({
  metrics,
  onViewCodes,
}: MilestoneCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* CARD 1: Next Critical Deadline */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Next Critical Deadline</span>
            </div>
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {metrics.nextCriticalDeadline.daysLeft} Days Left
            </span>
          </div>

          {/* Title & Subtitle */}
          <h4 className="text-sm font-extrabold text-gray-900 leading-tight">
            {metrics.nextCriticalDeadline.university}
          </h4>
          <p className="text-xs text-gray-600 font-medium mt-0.5 leading-snug">
            {metrics.nextCriticalDeadline.action}
          </p>
        </div>

        {/* Date Row */}
        <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <span>📅</span>
            <span>{metrics.nextCriticalDeadline.dates.pst}</span>
          </span>
          <span className="text-gray-400">|</span>
          <span>{metrics.nextCriticalDeadline.dates.ist}</span>
        </div>
      </div>

      {/* CARD 2: Dossier Readiness */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Dossier Readiness
            </span>
            <span className="text-lg font-black text-blue-600">
              {metrics.dossierReadiness.percentage}%
            </span>
          </div>

          {/* Title & Subtitle */}
          <h4 className="text-sm font-extrabold text-gray-900 leading-tight">
            {metrics.dossierReadiness.readyCount} of {metrics.dossierReadiness.totalCount} Materials Ready
          </h4>
          <p className="text-xs text-gray-500 leading-snug mt-0.5">
            {metrics.dossierReadiness.description}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2 mb-1">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${metrics.dossierReadiness.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <span className="text-gray-500 truncate pr-1">
            {metrics.dossierReadiness.pendingNote}
          </span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
            {metrics.dossierReadiness.badge}
          </span>
        </div>
      </div>

      {/* CARD 3: Shortlist Milestone Health */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Shortlist Milestone Health
          </div>

          {/* Title & Subtitle */}
          <h4 className="text-sm font-extrabold text-gray-900 leading-tight">
            {metrics.milestoneHealth.totalSteps} Total Tracked Steps
          </h4>
          <p className="text-xs text-gray-500 leading-snug mt-0.5 mb-2">
            {metrics.milestoneHealth.description}
          </p>
        </div>

        {/* 3 mini stats */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-gray-100">
          <div className="bg-slate-50/80 rounded p-1 border border-slate-100">
            <div className="text-sm font-black text-emerald-600 leading-none">
              {metrics.milestoneHealth.completed}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Completed</div>
          </div>
          <div className="bg-slate-50/80 rounded p-1 border border-slate-100">
            <div className="text-sm font-black text-blue-600 leading-none">
              {metrics.milestoneHealth.inProgress}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">In Progress</div>
          </div>
          <div className="bg-slate-50/80 rounded p-1 border border-slate-100">
            <div className="text-sm font-black text-gray-700 leading-none">
              {metrics.milestoneHealth.upcoming}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Upcoming</div>
          </div>
        </div>
      </div>

      {/* CARD 4: Priority Application Codes */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
        <div>
          {/* Header */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Priority Application Codes
          </div>

          {/* Title & Subtitle */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-black text-emerald-700 leading-tight">
              ${metrics.priorityApplicationCodes.amountSavedUsd} Saved
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {metrics.priorityApplicationCodes.amountSavedInr}
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-snug mt-0.5">
            {metrics.priorityApplicationCodes.description}
          </p>
        </div>

        {/* Bottom row */}
        <div className="pt-2.5 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-semibold text-gray-800 flex items-center gap-1">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>{metrics.priorityApplicationCodes.perk}</span>
          </span>
          <button
            type="button"
            onClick={onViewCodes}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            View Codes →
          </button>
        </div>
      </div>
    </div>
  );
}
