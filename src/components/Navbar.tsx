'use client'

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Scholarships", href: "/#scholarships" },
  { label: "Universities", href: "/universities" },
  { label: "Student Resources", href: "/#resources" },
  { label: "Success Stories", href: "/#stories" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Announcement Bar */}
      <div
        className="w-full text-white text-sm text-center py-2 px-4"
        style={{ backgroundColor: "#1E3A5F" }}
      >
        <span>
          🎓 138 Verified Scholarships found this week. Apply before deadlines:{" "}
          <strong>2 days left</strong>
        </span>{" "}
        <Link
          href="#scholarships"
          className="underline font-semibold ml-1 hover:text-blue-200 transition-colors"
        >
          View Now →
        </Link>
      </div>

      {/* Main Nav */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-xl shrink-0"
          aria-label="EduOrbit home"
        >
          {/* Orbit icon SVG */}
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

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/eligibility"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Check My Eligibility
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-100 bg-white px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 mt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 mt-4">
            <Link
              href="/sign-in"
              className="text-center py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/eligibility"
              className="text-center py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Check My Eligibility
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
