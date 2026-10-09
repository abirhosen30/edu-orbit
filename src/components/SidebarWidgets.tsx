'use client';

import { useState } from "react";
import {
  VerificationAlert,
  ReadinessItem,
  ExchangeRateItem,
} from "@/data/matchedUniversities";

interface SidebarWidgetsProps {
  alerts: VerificationAlert[];
  checklist: ReadinessItem[];
  exchangeRates: ExchangeRateItem[];
  onBookSession?: () => void;
}

export default function SidebarWidgets({
  alerts,
  checklist,
  exchangeRates,
  onBookSession,
}: SidebarWidgetsProps) {
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = () => {
    if (onBookSession) {
      onBookSession();
    } else {
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 4000);
    }
  };

  const readyCount = checklist.filter((item) => item.status === "Ready").length;

  return (
    <aside className="w-full space-y-4">
      {/* 1. Upcoming Verification Alerts */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3 shadow-2xs">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
          <div className="text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span>Upcoming Verification Alerts</span>
        </div>

        {/* Alerts list */}
        <div className="space-y-2.5">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-2.5 rounded-lg border space-y-1 ${
                alert.tagColor === "blue"
                  ? "bg-blue-50/50 border-blue-100"
                  : "bg-emerald-50/50 border-emerald-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    alert.tagColor === "blue" ? "text-blue-700" : "text-emerald-800"
                  }`}
                >
                  {alert.title}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    alert.tagColor === "blue"
                      ? "text-blue-600 bg-blue-100/70"
                      : "text-gray-500"
                  }`}
                >
                  {alert.time}
                </span>
              </div>
              <p className="text-[11px] text-gray-600 leading-snug">
                {alert.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Readiness Checklist */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900">Readiness Checklist</span>
          <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            {readyCount} of {checklist.length} Ready
          </span>
        </div>

        {/* List */}
        <div className="space-y-2.5">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 min-w-0">
                {/* Icon */}
                {item.status === "Ready" ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    ✓
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    !
                  </div>
                )}

                {/* Text */}
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
                    {item.description}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-[11px] font-bold shrink-0 ${
                  item.status === "Ready" ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. EduOrbit Pro CTA Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-5 space-y-3 shadow-sm relative overflow-hidden">
        {/* Decorative circle glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div>
          <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            Included in EduOrbit Pro
          </span>
          <h4 className="text-base font-extrabold leading-snug mt-2 text-white">
            Schedule Free 1-on-1 Profile Strategy Call
          </h4>
          <p className="text-xs text-blue-100/90 leading-relaxed font-normal mt-1">
            Get an Ivy League counselor to review your shortlisted university tiering and scholarship essay prompts.
          </p>
        </div>

        {bookingSuccess ? (
          <div className="w-full bg-emerald-500 text-white font-bold text-xs py-2 px-3 rounded-lg text-center">
            ✓ Session Booked! Check your email.
          </div>
        ) : (
          <button
            type="button"
            onClick={handleBooking}
            className="w-full bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Book Strategy Session (30 Min)</span>
          </button>
        )}
      </div>

      {/* 4. Reference Exchange Rates */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-4 space-y-3 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-800">Reference Exchange Rates</span>
          <span className="text-[10px] font-medium text-gray-400">Real-time</span>
        </div>

        {/* Rates in a 3-col grid */}
        <div className="grid grid-cols-3 gap-2">
          {exchangeRates.map((rate, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 text-center"
            >
              <div className="text-[10px] font-bold text-gray-600">{rate.currency}</div>
              <div className="text-xs font-black text-gray-900 mt-0.5">{rate.rateInr}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
