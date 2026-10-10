'use client';

import { ganttProgressSummaryData } from "@/data/ganttData";

export default function MilestoneProgressWidget() {
  const data = ganttProgressSummaryData;

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-sm text-gray-900">
          Milestone Progress
        </h3>
        <span className="text-2xl font-black text-blue-600 tracking-tight">
          {data.percentage}%
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-800">Overall Intake Readiness</span>
          <span className="text-gray-500 font-medium">
            {data.completedCount} of {data.totalCount} Completed
          </span>
        </div>

        {/* Stacked Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all"
            style={{ width: `${(data.completedCount / data.totalCount) * 100}%` }}
          ></div>
          <div
            className="bg-blue-600 h-full transition-all"
            style={{ width: `${(data.inFlightCount / data.totalCount) * 100}%` }}
          ></div>
          <div
            className="bg-gray-200 h-full transition-all"
            style={{ width: `${(data.upcomingCount / data.totalCount) * 100}%` }}
          ></div>
        </div>

        {/* Labels under progress bar */}
        <div className="flex items-center justify-between text-[11px] pt-0.5">
          <span className="font-bold text-emerald-700">{data.completedCount} Done</span>
          <span className="font-bold text-blue-700">{data.inFlightCount} In Flight</span>
          <span className="text-gray-500 font-medium">{data.upcomingCount} Upcoming</span>
        </div>
      </div>

      {/* 2x2 Micro-Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {/* Card 1 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Earliest Hard Cutoff
          </div>
          <div className="text-base font-black text-rose-600 leading-tight mt-1">
            {data.earliestHardCutoff.date}
          </div>
          <div className="text-[11px] text-gray-600 font-medium mt-0.5">
            {data.earliestHardCutoff.label}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Target Fellowship Pool
          </div>
          <div className="text-base font-black text-blue-600 leading-tight mt-1">
            {data.targetFellowshipPool.amount}
          </div>
          <div className="text-[11px] text-gray-600 font-medium mt-0.5">
            {data.targetFellowshipPool.sublabel}
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            VPD Clearance ETA
          </div>
          <div className="text-base font-black text-gray-900 leading-tight mt-1">
            {data.vpdClearanceEta.days}
          </div>
          <div className="text-[11px] text-gray-600 font-medium mt-0.5">
            {data.vpdClearanceEta.sublabel}
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Verified Credentials
          </div>
          <div className="text-base font-black text-gray-900 leading-tight mt-1">
            {data.verifiedCredentials.percentage}
          </div>
          <div className="text-[11px] text-gray-600 font-medium mt-0.5">
            {data.verifiedCredentials.sublabel}
          </div>
        </div>
      </div>

      {/* Footer Indicator */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Buffer Score: {data.bufferScore}</span>
        </div>
        <span className="text-gray-500 text-[11px]">{data.avgBuffer}</span>
      </div>
    </div>
  );
}
