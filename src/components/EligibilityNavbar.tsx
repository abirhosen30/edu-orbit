'use client';

import { useState } from "react";
import Link from "next/link";

interface EligibilityNavbarProps {
  shortlistCount?: number;
  activeSubTab?: string;
  onSubTabChange?: (tab: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function EligibilityNavbar({
  shortlistCount = 6,
  activeSubTab = "overview",
  onSubTabChange,
  searchQuery = "",
  onSearchChange,
}: EligibilityNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const subTabs = [
    {
      id: "overview",
      label: "Overview",
      href: "/eligibility",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "universities",
      label: "Matched Universities (14)",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      id: "scholarships",
      label: "Matched Scholarships (8)",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: "compare",
      label: "Shortlist & Compare (4)",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: "deadlines",
      label: "Deadlines & Tasks (3)",
      href: "/deadlines",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* Primary Top Nav */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brand Logo & Search Bar */}
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-600 font-bold text-xl shrink-0"
                aria-label="EduOrbit Home"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="4" fill="#2563EB" />
                  <ellipse
                    cx="16"
                    cy="16"
                    rx="14"
                    ry="6"
                    stroke="#2563EB"
                    strokeWidth="2"
                    fill="none"
                    transform="rotate(-30 16 16)"
                  />
                  <ellipse
                    cx="16"
                    cy="16"
                    rx="14"
                    ry="6"
                    stroke="#93C5FD"
                    strokeWidth="1.5"
                    fill="none"
                    transform="rotate(30 16 16)"
                  />
                </svg>
                <span className="tracking-tight text-blue-600 font-extrabold text-xl">EduOrbit</span>
              </Link>

              {/* Search Bar matching Figma */}
              <div className="relative max-w-sm w-full hidden md:block">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search programs, universities..."
                  className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-gray-200 bg-gray-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-800"
                />
              </div>
            </div>

            {/* Middle Nav Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-gray-700">
              <Link
                href="/#scholarships"
                className="hover:text-blue-600 transition-colors py-2"
              >
                Browse Scholarships
              </Link>
              <Link
                href="/universities"
                className="hover:text-blue-600 transition-colors py-2"
              >
                Universities
              </Link>
              <Link
                href="/eligibility"
                className="text-blue-600 font-bold relative py-2 border-b-2 border-blue-600"
              >
                Eligibility Checker
              </Link>
            </nav>

            {/* Right Controls: Bell, Bookmark, Shortlist Pill, Avatar */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 text-xs">
                    <div className="font-bold text-gray-900 border-b pb-2 mb-2">Recent Alerts</div>
                    <div className="p-2 bg-blue-50 rounded text-blue-900 mb-1.5">
                      <p className="font-semibold">Fall 2026 Cycle Update</p>
                      <p className="text-[11px] text-blue-700">3 shortlisted universities now accept GRE At-Home.</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-green-900">
                      <p className="font-semibold">DAAD Stipend Increment</p>
                      <p className="text-[11px] text-green-700">Monthly stipend increased to €934/month.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bookmark Ribbon */}
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors hidden sm:flex"
                aria-label="Saved Bookmarks"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>

              {/* Shortlist Badge Pill Button matching Figma */}
              <Link
                href="/match-detail"
                className="flex items-center gap-1.5 bg-sky-50/80 hover:bg-sky-100 text-blue-700 border border-blue-200/80 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>Shortlist</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                  {shortlistCount}
                </span>
              </Link>

              {/* Profile Avatar */}
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden ring-1.5 ring-blue-500/30 flex items-center justify-center bg-slate-100">
                  {/* Styled avatar representing Rahul / user */}
                  <div className="w-full h-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white text-xs font-bold">
                    RS
                  </div>
                </div>
              </div>

              {/* Mobile hamburger menu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
                aria-label="Toggle Navigation"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
            <Link
              href="/#scholarships"
              className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Browse Scholarships
            </Link>
            <Link
              href="/universities"
              className="block py-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
            >
              Universities
            </Link>
            <Link
              href="/eligibility"
              className="block py-2 text-sm text-blue-600 font-bold"
            >
              Eligibility Checker
            </Link>
          </div>
        )}
      </div>

      {/* Secondary Sub-Nav Bar (Tabs + Verified Score Badges) */}
      <div className="border-b border-gray-200 bg-white overflow-x-auto no-scrollbar">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-w-max">
          {/* Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-6">
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              const content = (
                <>
                  <span className={isActive ? "text-blue-600" : "text-gray-400"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </>
              );

              const className = `flex items-center gap-2 py-3.5 px-1 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`;

              if (tab.href) {
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    onClick={() => onSubTabChange?.(tab.id)}
                    className={className}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => onSubTabChange?.(tab.id)}
                  className={className}
                >
                  {content}
                </button>
              );
            })}
          </div>

          {/* Right Verified Test Scores matching screenshot */}
          <div className="hidden md:flex items-center gap-4 py-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="font-semibold text-gray-800">GRE 324</span>
              <span className="text-gray-500 text-[11px]">(Q168, V156)</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span className="font-semibold text-gray-800">IELTS 7.5</span>
              <span className="text-gray-500 text-[11px]">Academic</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
