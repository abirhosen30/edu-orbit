'use client';

import { useState } from "react";
import {
  timezoneClocksData,
  masterDossierDocuments,
  verificationLogData,
} from "@/data/deadlinesTracker";

interface DeadlinesSidebarProps {
  onReserveSlot?: () => void;
  onDownloadDossier?: () => void;
}

export default function DeadlinesSidebar({
  onReserveSlot,
  onDownloadDossier,
}: DeadlinesSidebarProps) {
  const [synced, setSynced] = useState(false);
  const [slotReserved, setSlotReserved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleSync = () => {
    setSynced(true);
    setTimeout(() => setSynced(false), 3000);
  };

  const handleReserve = () => {
    if (onReserveSlot) {
      onReserveSlot();
    } else {
      setSlotReserved(true);
      setTimeout(() => setSlotReserved(false), 4000);
    }
  };

  const handleDownload = () => {
    if (onDownloadDossier) {
      onDownloadDossier();
    } else {
      setDownloading(true);
      setTimeout(() => setDownloading(false), 3000);
    }
  };

  return (
    <aside className="w-full space-y-4">
      {/* 1. Timezone Radar */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <span className="text-blue-600">🌐</span>
            <span>Timezone Radar</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Clocks</span>
          </div>
        </div>

        {/* 2x2 Clocks Grid */}
        <div className="grid grid-cols-2 gap-2">
          {timezoneClocksData.map((clock, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-lg border ${
                clock.isLocal
                  ? "bg-blue-50/60 border-blue-200/80"
                  : "bg-slate-50 border-slate-200/80"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className={clock.isLocal ? "text-blue-700" : "text-gray-700"}>
                  {clock.city} ({clock.code})
                </span>
                <span
                  className={`px-1 py-0.2 rounded text-[9px] ${
                    clock.isLocal
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {clock.offset}
                </span>
              </div>
              <div className="text-base font-black text-gray-900 mt-1 leading-none">
                {clock.time}
              </div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">
                {clock.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Portal Freeze Warning */}
        <div className="bg-rose-50/60 border border-rose-200/80 rounded-lg p-2.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
            <span>⚠️</span>
            <span>Portal Freeze Warning:</span>
          </div>
          <p className="text-[11px] text-rose-900/90 leading-relaxed">
            Stanford Slate maintenance scheduled <strong>Nov 10, 02:00–06:00 PST</strong>. High server load typical in last 48 hours.
          </p>
        </div>
      </div>

      {/* 2. Master Dossier (9) */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <span>📁</span>
            <span>Master Dossier (9)</span>
          </div>
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            7 / 9 Ready
          </span>
        </div>

        {/* 9 Materials List */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
          {masterDossierDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start justify-between gap-2 p-1.5 rounded hover:bg-slate-50 transition-colors"
            >
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-900 leading-tight">
                  {doc.title}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">
                  {doc.description}
                </div>
              </div>

              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                  doc.badge.color === "green"
                    ? "bg-emerald-100 text-emerald-800"
                    : doc.badge.color === "blue"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-rose-100 text-rose-800"
                }`}
              >
                {doc.badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          className="w-full bg-slate-50 hover:bg-slate-100 text-gray-700 border border-gray-200 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>↓</span>
          <span>{downloading ? "Preparing Archive (.zip)..." : "Download Complete Dossier Archive (.zip)"}</span>
        </button>
      </div>

      {/* 3. Data Verification Log */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
            <span>🛡️</span>
            <span>Data Verification Log</span>
          </div>
          <span className="text-[10px] font-medium text-gray-400">
            EduOrbit Guarantee
          </span>
        </div>

        {/* Log Entries */}
        <div className="space-y-2 text-xs">
          {verificationLogData.map((log, idx) => (
            <div key={idx} className="flex items-center justify-between text-gray-600">
              <span className="truncate pr-1 text-[11px]">{log.portal}</span>
              <span className="text-[11px] font-semibold text-emerald-600 shrink-0">
                ✓ {log.timestamp}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Next auto-sync at 21:00 IST</span>
          <button
            type="button"
            onClick={handleSync}
            className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>↻</span>
            <span>{synced ? "Synced!" : "Sync Now"}</span>
          </button>
        </div>
      </div>

      {/* 4. Expert Assistance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-5 space-y-3 shadow-sm relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-blue-200">
            <span>🎓</span>
            <span>Expert Assistance</span>
          </div>
          <h4 className="text-base font-extrabold text-white leading-snug mt-1.5">
            Need a Sanity Check?
          </h4>
          <p className="text-xs text-blue-100/90 leading-relaxed font-normal mt-1">
            Admissions Counselor review slot open tomorrow at <strong>11:30 AM IST</strong>. 20-min live review of Stanford essays and VPD status.
          </p>
        </div>

        {slotReserved ? (
          <div className="w-full bg-emerald-500 text-white font-bold text-xs py-2 px-3 rounded-lg text-center">
            ✓ Slot Reserved! Link sent to email.
          </div>
        ) : (
          <button
            type="button"
            onClick={handleReserve}
            className="w-full bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <span>Reserve Sanity Check Slot (Free)</span>
          </button>
        )}
      </div>
    </aside>
  );
}
