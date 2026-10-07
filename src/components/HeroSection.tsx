'use client'

import { useState } from "react";
import Link from "next/link";
import {
  scholarshipFiltersEvent,
  type ScholarshipFilters,
} from "@/lib/scholarshipFilters";

const studyLevels = ["All Levels", "Bachelor's", "Master's", "PhD", "Postdoc"];
const majors = [
  "All Fields",
  "Computer Science & IT",
  "Engineering",
  "Business & Management",
  "Medicine & Health",
  "Arts & Humanities",
  "Law",
  "Natural Sciences",
  "Social Sciences",
];
const countries = [
  "Any Country",
  "USA",
  "UK",
  "Germany",
  "Canada",
  "Australia",
  "Netherlands",
  "France",
  "Japan",
  "Sweden",
];
const scholarshipTypes = [
  "All Types",
  "Fully Funded",
  "Partial Funding",
  "Tuition Only",
  "Living Stipend",
  "Research Grant",
];

const stats = [
  { value: "48,500+", label: "Scholarships Tracked" },
  { value: "$36.4M+", label: "Total Funding Verified" },
  { value: "95.6%", label: "Match Accuracy" },
  { value: "⚙️ AI-Powered", label: "Matching Engine" },
];

export default function HeroSection() {
  const [studyLevel, setStudyLevel] = useState(studyLevels[0]);
  const [major, setMajor] = useState(majors[0]);
  const [country, setCountry] = useState(countries[0]);
  const [scholarshipType, setScholarshipType] = useState(scholarshipTypes[0]);

  const selectClass =
    "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none pr-8 shadow-sm";

  return (
    <section
      className="relative w-full"
      style={{
        background:
          "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 30%, #ffffff 100%)",
      }}
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        {/* Eyebrow badge */}
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-pulse" />
          138 new scholarships verified this week
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl mx-auto">
          Stop Guessing.{" "}
          <span className="text-blue-600">
            Discover International Master&apos;s Scholarships
          </span>{" "}
          Matched to Your Exact Profile.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Answer 5 questions. Get a ranked list of scholarships you&apos;re
          actually eligible for, with verified funding details, and real
          deadlines.
        </p>

        {/* Filter Row */}
        <div
          id="profile-setup"
          className="mt-10 w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Study Level */}
            <div className="relative">
              <label htmlFor="study-level" className="sr-only">
                Study Level
              </label>
              <select
                id="study-level"
                className={selectClass}
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
              >
                {studyLevels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
              <span className="absolute left-3 -top-2.5 text-xs font-medium text-gray-500 bg-white px-1">
                Study Level
              </span>
            </div>

            {/* Intended Major */}
            <div className="relative">
              <label htmlFor="major" className="sr-only">
                Intended Major / Field
              </label>
              <select
                id="major"
                className={selectClass}
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              >
                {majors.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
              <span className="absolute left-3 -top-2.5 text-xs font-medium text-gray-500 bg-white px-1">
                Intended Major / Field
              </span>
            </div>

            {/* Country of Interest */}
            <div className="relative">
              <label htmlFor="country" className="sr-only">
                Country of Interest
              </label>
              <select
                id="country"
                className={selectClass}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
              <span className="absolute left-3 -top-2.5 text-xs font-medium text-gray-500 bg-white px-1">
                Country of Interest
              </span>
            </div>

            {/* Scholarship Type */}
            <div className="relative">
              <label htmlFor="scholarship-type" className="sr-only">
                Scholarship Type
              </label>
              <select
                id="scholarship-type"
                className={selectClass}
                value={scholarshipType}
                onChange={(e) => setScholarshipType(e.target.value)}
              >
                {scholarshipTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                ▼
              </span>
              <span className="absolute left-3 -top-2.5 text-xs font-medium text-gray-500 bg-white px-1">
                Scholarship Type
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-4 flex justify-center">
            <Link
              href="/#scholarships"
              onClick={() => {
                const filters: ScholarshipFilters = {
                  studyLevel,
                  major,
                  country,
                  scholarshipType,
                };
                window.dispatchEvent(
                  new CustomEvent(scholarshipFiltersEvent, { detail: filters })
                );
              }}
              className="w-full sm:w-auto sm:min-w-64 px-8 sm:px-10 py-3.5 bg-blue-600 text-white font-semibold text-base rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md inline-flex items-center justify-center gap-2"
              aria-label={`Find scholarships for ${studyLevel}, ${major}, ${country}, ${scholarshipType}`}
            >
              🔍 Find My Scholarships
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
