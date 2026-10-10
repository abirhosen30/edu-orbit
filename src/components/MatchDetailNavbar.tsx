'use client';

import { useState } from "react";
import Link from "next/link";

export default function MatchDetailNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Search */}
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-600 font-bold text-xl shrink-0"
              aria-label="EduOrbit Home"
            >
              <svg
                className="w-8 h-8"
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
              <span>EduOrbit</span>
            </Link>

            {/* Search Bar */}
            <div className="relative max-w-md w-full hidden sm:block">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                placeholder="Search programs, universities..."
                className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 text-gray-800"
              />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link
              href="/#scholarships"
              className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5"
            >
              Browse Scholarships
            </Link>
            <Link
              href="/universities"
              className="hover:text-blue-600 transition-colors"
            >
              Universities
            </Link>
            <Link
              href="/eligibility"
              className="hover:text-blue-600 transition-colors"
            >
              Eligibility Checker
            </Link>
          </nav>

          {/* Actions & Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Bookmark Icon */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
              aria-label="Saved Items"
            >
              <svg
                className="w-5 h-5"
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
            </button>

            {/* Shortlist Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200/60 px-3 py-1.5 rounded-lg text-xs font-semibold">
              <svg
                className="w-3.5 h-3.5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Shortlist (4)</span>
            </div>

            {/* Profile Avatar */}
            <div className="relative cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-100">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100 space-y-2">
            <input
              type="text"
              placeholder="Search programs, universities..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 mb-3"
            />
            <Link
              href="/#scholarships"
              className="block px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
            >
              Browse Scholarships
            </Link>
            <Link
              href="/universities"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Universities
            </Link>
            <Link
              href="/eligibility"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Eligibility Checker
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
