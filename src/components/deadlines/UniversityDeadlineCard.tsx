'use client';

import { useState } from "react";
import Link from "next/link";
import { UniversityDeadline } from "@/data/deadlinesTracker";

interface UniversityDeadlineCardProps {
  item: UniversityDeadline;
  onSendReminder?: (milestoneId: string) => void;
  onUploadDraft?: (milestoneId: string) => void;
}

export default function UniversityDeadlineCard({
  item,
  onSendReminder,
  onUploadDraft,
}: UniversityDeadlineCardProps) {
  const [reminderSent, setReminderSent] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleReminderClick = (milestoneId: string) => {
    if (onSendReminder) {
      onSendReminder(milestoneId);
    } else {
      setReminderSent(true);
      setTimeout(() => setReminderSent(false), 3500);
    }
  };

  const handleUploadClick = (milestoneId: string) => {
    if (onUploadDraft) {
      onUploadDraft(milestoneId);
    } else {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs hover:shadow-xs transition-shadow p-5 space-y-4">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left: Identity */}
        <div className="flex items-start gap-3">
          {/* Logo initial */}
          <div
            className={`w-10 h-10 rounded-lg ${item.logoBg} ${item.logoColor} font-black text-sm flex items-center justify-center shrink-0 shadow-2xs`}
          >
            {item.logoInitial}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight leading-snug">
                {item.name}
              </h3>

              {/* Tier badge */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide ${
                  item.tier === "Dream Tier"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {item.tier}
              </span>

              {/* Sub tags */}
              {item.subTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <p className="text-xs text-gray-500 font-medium">
              📍 {item.location} • {item.program}
            </p>
          </div>
        </div>

        {/* Right: Urgency Badge */}
        <div className="self-start sm:self-auto shrink-0 text-right">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
              item.urgencyBadge.color === "red"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : item.urgencyBadge.color === "blue"
                ? "bg-sky-50 text-blue-700 border-blue-200"
                : item.urgencyBadge.color === "rose"
                ? "bg-rose-50/80 text-rose-800 border-rose-200"
                : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.urgencyBadge.color === "red" || item.urgencyBadge.color === "rose"
                  ? "bg-rose-600"
                  : "bg-blue-600"
              }`}
            ></span>
            <span>{item.urgencyBadge.text}</span>
          </span>

          {item.urgencyBadge.subtext && (
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">
              {item.urgencyBadge.subtext}
            </div>
          )}
        </div>
      </div>

      {/* 2. Optional Alert Banner (e.g. TUM Multi-Agency Requirement) */}
      {item.alertNotice && (
        <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-800">
          <div className="text-blue-600 font-bold shrink-0 mt-0.5">ℹ</div>
          <div>
            <span className="font-bold text-gray-900">{item.alertNotice.title} </span>
            <span className="text-gray-700 leading-relaxed">{item.alertNotice.text}</span>
          </div>
        </div>
      )}

      {/* 3. Milestones List */}
      <div className="space-y-3 pt-1">
        {item.milestones.map((milestone) => {
          // A: ACTION REQUIRED BANNER (e.g. Stanford Essay & Video)
          if (milestone.type === "action-required" && milestone.isActionRequired) {
            return (
              <div
                key={milestone.id}
                className="bg-rose-50/50 border border-rose-200/90 rounded-xl p-3.5 space-y-2.5"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                      !
                    </span>
                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wide">
                      {milestone.tag || "ACTION REQUIRED NOW"}
                    </span>
                  </div>

                  <div className="text-xs text-rose-900 font-bold">
                    <span>{milestone.deadlineText} </span>
                    <span className="text-rose-700 font-normal">
                      {milestone.secondaryDeadlineText}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug">
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {milestone.details}
                  </p>
                </div>

                {/* Actions & Warning */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-rose-100">
                  <div className="flex items-center gap-2">
                    {milestone.actionButtons?.map((btn, idx) =>
                      btn.actionType === "primary" ? (
                        <a
                          key={idx}
                          href={btn.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
                        >
                          <span>{btn.label}</span>
                          <span>↗</span>
                        </a>
                      ) : (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleUploadClick(milestone.id)}
                          className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors bg-white cursor-pointer"
                        >
                          <span>↑</span>
                          <span>{uploadSuccess ? "Uploaded!" : btn.label}</span>
                        </button>
                      )
                    )}
                  </div>

                  {milestone.warningNotice && (
                    <span className="text-[11px] text-gray-500 italic">
                      {milestone.warningNotice}
                    </span>
                  )}
                </div>
              </div>
            );
          }

          // B: BOTTLENECK ROW (e.g. Georgia Tech 3rd LOR)
          if (milestone.type === "bottleneck") {
            return (
              <div
                key={milestone.id}
                className="bg-rose-50/30 border border-rose-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    !
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide">
                        {milestone.tag || "BOTTLENECK"}
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {milestone.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {milestone.details}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleReminderClick(milestone.id)}
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 bg-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>✉</span>
                  <span>{reminderSent ? "Reminder Sent!" : "Send Reminder Email"}</span>
                </button>
              </div>
            );
          }

          // C: STANDARD MILESTONE ROW (Complete, In-Progress, or Upcoming)
          return (
            <div
              key={milestone.id}
              className="flex items-start justify-between gap-3 py-1 px-1"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {/* Status icon */}
                {milestone.type === "complete" ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </div>
                ) : milestone.type === "in-progress" ? (
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ●
                  </div>
                ) : milestone.type === "action-required" ? (
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    !
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300 text-gray-300 flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5">
                    ○
                  </div>
                )}

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-900">
                      {milestone.title}
                    </span>
                    {milestone.statusBadge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          milestone.statusBadge.color === "green"
                            ? "bg-emerald-100 text-emerald-800"
                            : milestone.statusBadge.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {milestone.statusBadge.text}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    {milestone.details}
                  </p>
                </div>
              </div>

              {/* Right side badge / status */}
              {milestone.rightBadge && (
                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-bold ${
                      milestone.rightBadge.color || "text-gray-800"
                    }`}
                  >
                    {milestone.rightBadge.text}
                  </div>
                  {milestone.rightBadge.subtext && (
                    <div className="text-[10px] text-gray-400 font-medium">
                      {milestone.rightBadge.subtext}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Footer Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-gray-100 text-xs">
        {/* Left Stats Pills */}
        <div className="flex items-center gap-3 flex-wrap text-gray-500 text-[11px]">
          {item.footerStats.leftItems.map((stat, idx) => (
            <span key={idx} className="flex items-center gap-1 font-medium">
              <span>{stat}</span>
              {idx < item.footerStats.leftItems.length - 1 && (
                <span className="text-gray-300 ml-2">|</span>
              )}
            </span>
          ))}
        </div>

        {/* Right Action Link */}
        <Link
          href={item.footerStats.actionLink.url}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
        >
          <span>{item.footerStats.actionLink.text}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
