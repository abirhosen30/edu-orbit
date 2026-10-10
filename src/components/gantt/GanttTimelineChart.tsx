'use client';

import { useState } from "react";
import {
  ganttColumnsData,
  ganttUniversityGroupsData,
  GanttUniversityGroup,
} from "@/data/ganttData";

interface GanttTimelineChartProps {
  selectedCategory?: string;
  onEditMilestone?: (milestoneId: string) => void;
  onConfigureTimezones?: () => void;
}

export default function GanttTimelineChart({
  selectedCategory = "All Tracks",
  onEditMilestone,
  onConfigureTimezones,
}: GanttTimelineChartProps) {
  // Collapsed universities state
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (id: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter university groups & milestones based on active category
  const filteredGroups = ganttUniversityGroupsData.map((group) => {
    if (selectedCategory === "All Tracks (4)" || selectedCategory === "All Tracks") {
      return group;
    }
    const filteredMilestones = group.milestones.filter(
      (m) => m.category === selectedCategory
    );
    return {
      ...group,
      milestones: filteredMilestones,
    };
  }).filter((group) => group.milestones.length > 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
      {/* Scrollable Timeline Grid Container */}
      <div className="overflow-x-auto relative">
        <div className="min-w-[1100px] text-xs">
          {/* 1. HEADER ROW: Columns and Dates */}
          <div className="grid grid-cols-12 border-b border-gray-200 bg-slate-50/80 font-bold text-gray-700 select-none sticky top-0 z-20">
            {/* Left hierarchy header */}
            <div className="col-span-3 p-3 flex items-center justify-between border-r border-gray-200">
              <span className="text-gray-900 font-black">Program &amp; Milestone Hierarchy</span>
              <span className="text-[10px] font-bold bg-gray-200/80 text-gray-600 px-1.5 py-0.5 rounded">
                11 Items
              </span>
            </div>

            {/* 11 Date Columns */}
            <div className="col-span-9 grid grid-cols-11 text-center text-[10px]">
              {ganttColumnsData.map((col) => (
                <div
                  key={col.id}
                  className={`py-2 px-1 border-r border-gray-200 flex flex-col justify-center relative ${
                    col.isToday ? "bg-rose-50/40 text-rose-800" : ""
                  }`}
                >
                  <span className={`font-black ${col.isToday ? "text-rose-700" : "text-gray-900"}`}>
                    {col.label}
                  </span>
                  <span className={`text-[9px] ${col.isToday ? "text-rose-600 font-bold" : "text-gray-400"}`}>
                    {col.sublabel}
                  </span>

                  {/* Today marker label on header */}
                  {col.isToday && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
                      <span className="bg-rose-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
                        Today: Nov 06
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. BODY ROWS (With the continuous vertical red TODAY line overlay) */}
          <div className="relative divide-y divide-gray-100">
            {/* Red Vertical TODAY Line running down the entire grid */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-10"
              style={{
                left: "calc(25% + (75% / 11) * 2 - 1px)", // Aligned with Nov W2 column
                width: "2px",
                backgroundColor: "#E11D48",
              }}
            ></div>

            {filteredGroups.map((group) => {
              const isCollapsed = !!collapsedGroups[group.id];

              return (
                <div key={group.id} className="divide-y divide-gray-50">
                  {/* University Group Header Bar */}
                  <div
                    onClick={() => toggleGroup(group.id)}
                    className="grid grid-cols-12 bg-slate-50/60 hover:bg-slate-100/70 transition-colors cursor-pointer font-bold select-none py-2 px-3 items-center"
                  >
                    <div className="col-span-12 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded ${group.iconBg} ${group.iconColor} font-black text-[10px] flex items-center justify-center shrink-0`}
                        >
                          {group.iconInitial}
                        </div>
                        <span className="text-xs font-black text-gray-900">
                          {group.name}
                        </span>
                        <span className="text-[10px] font-semibold bg-gray-200/70 text-gray-700 px-2 py-0.5 rounded">
                          {group.subTag}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs transform transition-transform">
                        {isCollapsed ? "▸" : "▾"}
                      </span>
                    </div>
                  </div>

                  {/* Milestone Rows inside this University */}
                  {!isCollapsed &&
                    group.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="grid grid-cols-12 hover:bg-slate-50/50 transition-colors items-center min-h-[46px]"
                      >
                        {/* Left column: Milestone name & badge */}
                        <div className="col-span-3 p-2.5 border-r border-gray-100 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                m.badge.color === "red"
                                  ? "bg-rose-500"
                                  : m.badge.color === "green"
                                  ? "bg-emerald-500"
                                  : m.badge.color === "yellow"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                              }`}
                            ></span>
                            <span className="text-[11px] font-bold text-gray-800 truncate">
                              {m.name}
                            </span>
                          </div>

                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                              m.badge.color === "red"
                                ? "bg-rose-100 text-rose-800"
                                : m.badge.color === "green"
                                ? "bg-emerald-100 text-emerald-800"
                                : m.badge.color === "yellow"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {m.badge.text}
                          </span>
                        </div>

                        {/* Right 9 columns: Gantt Bar visualization */}
                        <div className="col-span-9 grid grid-cols-11 h-full items-center relative px-1">
                          {/* Background cell grid guidelines */}
                          <div className="absolute inset-0 grid grid-cols-11 pointer-events-none">
                            {ganttColumnsData.map((c) => (
                              <div
                                key={c.id}
                                className={`border-r border-gray-100/80 h-full ${
                                  c.isToday ? "bg-rose-50/20" : ""
                                }`}
                              ></div>
                            ))}
                          </div>

                          {/* Render the Milestone Bar based on startColIndex and spanCols */}
                          <div
                            className="relative z-10"
                            style={{
                              gridColumnStart: m.startColIndex + 1,
                              gridColumnEnd: `span ${m.spanCols}`,
                            }}
                          >
                            {/* CASE 1: Stanford Essay Double-Bar (Video Review + 9d left) */}
                            {m.id === "su-kh-essay" ? (
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="flex items-center rounded-md overflow-hidden shadow-2xs cursor-pointer hover:opacity-95 transition-opacity text-[10px]"
                              >
                                <div className="bg-blue-600 text-white font-bold py-1.5 px-2.5 flex items-center gap-1 shrink-0">
                                  <span>★</span>
                                  <span>Video Pitch Final Review</span>
                                </div>
                                <div className="bg-[#6B1724] text-rose-100 font-extrabold py-1.5 px-2 flex items-center gap-1 flex-1 justify-between">
                                  <span>9d left (Nov 15)</span>
                                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                                </div>
                              </div>
                            ) : m.barType === "completed" ? (
                              /* CASE 2: Completed green badge */
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold py-1 px-2.5 rounded-md shadow-2xs cursor-pointer"
                              >
                                <span>{m.barLabel}</span>
                              </div>
                            ) : m.barType === "document-vpd" ? (
                              /* CASE 3: Document / VPD Yellow/Amber buffer bar */
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-bold py-1.5 px-2 rounded-md flex items-center justify-between shadow-2xs cursor-pointer hover:bg-amber-100/60 transition-colors"
                              >
                                <span className="truncate pr-1">{m.barLabel}</span>
                                {m.tagRight && (
                                  <span className="bg-amber-200/80 text-amber-900 text-[9px] px-1.5 py-0.5 rounded font-black shrink-0">
                                    {m.tagRight}
                                  </span>
                                )}
                              </div>
                            ) : m.barType === "fellowship-priority" && m.id === "su-dept-app" ? (
                              /* CASE 4: Stanford SOP blue buffer bar */
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="bg-sky-50 border border-sky-300 text-blue-900 text-[10px] font-bold py-1.5 px-2 rounded-md flex items-center justify-between shadow-2xs cursor-pointer hover:bg-sky-100/60 transition-colors"
                              >
                                <span className="truncate pr-1">{m.barLabel}</span>
                                {m.bufferTag && (
                                  <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0">
                                    {m.bufferTag}
                                  </span>
                                )}
                              </div>
                            ) : m.barType === "fellowship-priority" ? (
                              /* CASE 5: Solid Royal Blue Priority Bar */
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="bg-blue-600 text-white text-[10px] font-bold py-1.5 px-2 rounded-md flex items-center justify-between shadow-2xs cursor-pointer hover:bg-blue-700 transition-colors"
                              >
                                <span className="truncate pr-1">{m.barLabel}</span>
                                {m.tagRight && (
                                  <span className="bg-blue-800/80 text-blue-100 text-[9px] px-1.5 py-0.5 rounded font-black shrink-0">
                                    {m.tagRight}
                                  </span>
                                )}
                              </div>
                            ) : m.barType === "notification" || m.barType === "window" ? (
                              /* CASE 6: Outline window / notification box */
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="bg-slate-50 border border-gray-300 text-gray-700 text-[10px] font-semibold py-1.5 px-2 rounded-md flex items-center justify-between shadow-2xs cursor-pointer hover:bg-slate-100 transition-colors"
                              >
                                <span className="truncate pr-1">{m.barLabel}</span>
                                {m.tagRight && (
                                  <span className="text-[9px] text-gray-500 font-bold shrink-0">
                                    {m.tagRight}
                                  </span>
                                )}
                              </div>
                            ) : (
                              /* Default Bar fallback */
                              <div
                                onClick={() => onEditMilestone?.(m.id)}
                                className="bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold py-1 px-2 rounded-md flex items-center justify-between shadow-2xs cursor-pointer"
                              >
                                <span className="truncate">{m.barLabel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Information Banner matching Figma */}
      <div className="bg-slate-50 border-t border-gray-200 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-gray-600">
        <div className="flex items-center gap-1.5">
          <span className="text-blue-600 font-bold">ℹ</span>
          <span>
            Bars reflect active prep windows, review queues, and external verification delays. Click any item to edit dates or adjust buffers.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto font-medium">
          <span>Timezone: UTC+05:30 (India Standard Time)</span>
          <button
            type="button"
            onClick={onConfigureTimezones}
            className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <span>Configure Timezones</span>
            <span>↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
