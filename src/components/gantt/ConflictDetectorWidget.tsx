'use client';

import { useState } from "react";
import { conflictRiskItemsData } from "@/data/ganttData";

interface ConflictDetectorWidgetProps {
  onBookSanityCheck?: () => void;
}

export default function ConflictDetectorWidget({
  onBookSanityCheck,
}: ConflictDetectorWidgetProps) {
  const [rescheduled, setRescheduled] = useState(false);
  const [notaryCompleted, setNotaryCompleted] = useState(false);
  const [nudgeSent, setNudgeSent] = useState(false);
  const [backupSwitched, setBackupSwitched] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-black">
            ⚡
          </span>
          <h3 className="font-extrabold text-sm text-gray-900">
            Timeline Conflict &amp; Risk Detector
          </h3>
        </div>

        <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
          2 Action Items Required
        </span>
      </div>

      {/* Conflicts List */}
      <div className="space-y-3">
        {/* Item 1: Overlap Risk */}
        <div className="bg-amber-50/50 border border-amber-200/90 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <span className="text-amber-600 font-black">!</span>
              <span>{conflictRiskItemsData[0].title}</span>
            </div>
            <span className="text-[11px] font-bold text-amber-800">
              {conflictRiskItemsData[0].dateRange}
            </span>
          </div>

          <p className="text-xs text-amber-900/90 leading-relaxed font-normal">
            {conflictRiskItemsData[0].description}
          </p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setRescheduled(true);
                setTimeout(() => setRescheduled(false), 3000);
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              {rescheduled ? "✓ Buffer Extended (+3d)" : conflictRiskItemsData[0].primaryAction}
            </button>

            <button
              type="button"
              onClick={() => {
                setNotaryCompleted(true);
                setTimeout(() => setNotaryCompleted(false), 3000);
              }}
              className="bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {notaryCompleted ? "✓ Marked Complete" : conflictRiskItemsData[0].secondaryAction}
            </button>
          </div>
        </div>

        {/* Item 2: Critical Bottleneck */}
        <div className="bg-rose-50/50 border border-rose-200/90 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-rose-950">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                !
              </span>
              <span>{conflictRiskItemsData[1].title}</span>
            </div>
            <span className="text-[11px] font-bold text-rose-700">
              {conflictRiskItemsData[1].dateRange}
            </span>
          </div>

          <p className="text-xs text-rose-900/90 leading-relaxed font-normal">
            {conflictRiskItemsData[1].description}
          </p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setNudgeSent(true);
                setTimeout(() => setNudgeSent(false), 3000);
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span>✉</span>
              <span>{nudgeSent ? "Nudge Dispatched!" : conflictRiskItemsData[1].primaryAction}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setBackupSwitched(true);
                setTimeout(() => setBackupSwitched(false), 3000);
              }}
              className="bg-white border border-rose-300 text-rose-900 hover:bg-rose-100 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {backupSwitched ? "✓ Backup Selected" : conflictRiskItemsData[1].secondaryAction}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-500">
        <span>AI Conflict Engine checked 18 minutes ago against institutional portal changes.</span>
        <button
          type="button"
          onClick={onBookSanityCheck}
          className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span>📞</span>
          <span>Book Sanity Check with Advisor</span>
        </button>
      </div>
    </div>
  );
}
