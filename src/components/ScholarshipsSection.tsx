'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { universitiesData } from "@/data/universities";
import {
  scholarshipFiltersEvent,
  type ScholarshipFilters,
} from "@/lib/scholarshipFilters";

type FundingBadge = "Fully Funded" | "Partial Funding";

interface Scholarship {
  id: number;
  name: string;
  university: string;
  universityId: string;
  officialUrl: string;
  country: string;
  flag: string;
  funding: string;
  badge: FundingBadge;
  badgeColor: string;
  tags: string[];
  deadline: string;
  daysLeft: number;
  level: "Masters" | "PhD" | "Bachelors";
  logoInitial: string;
  logoColor: string;
}

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: "Knight-Hennessy Scholars",
    university: "Stanford University",
    universityId: "stanford",
    officialUrl: "https://www.stanford.edu",
    country: "USA",
    flag: "🇺🇸",
    funding: "Full Tuition + $45,000/yr",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["STEM", "Arts", "Leadership"],
    deadline: "Nov 15, 2026",
    daysLeft: 41,
    level: "Masters",
    logoInitial: "SU",
    logoColor: "bg-red-800",
  },
  {
    id: 2,
    name: "Gates Cambridge Scholarship",
    university: "University of Cambridge",
    universityId: "cambridge",
    officialUrl: "https://www.cam.ac.uk",
    country: "UK",
    flag: "🇬🇧",
    funding: "Full Cost of Study (~£45k)",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Research", "Leadership", "Any Field"],
    deadline: "Dec 1, 2026",
    daysLeft: 56,
    level: "PhD",
    logoInitial: "CAM",
    logoColor: "bg-teal-700",
  },
  {
    id: 3,
    name: "Clarendon Fund Scholarship",
    university: "University of Oxford",
    universityId: "oxford",
    officialUrl: "https://www.ox.ac.uk",
    country: "UK",
    flag: "🇬🇧",
    funding: "Full Course Fees + £19,237/yr",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Humanities", "Sciences", "PPE"],
    deadline: "Jan 10, 2027",
    daysLeft: 95,
    level: "Masters",
    logoInitial: "OX",
    logoColor: "bg-blue-900",
  },
  {
    id: 4,
    name: "Harvard Presidential Fellowship",
    university: "Harvard University",
    universityId: "harvard",
    officialUrl: "https://www.harvard.edu",
    country: "USA",
    flag: "🇺🇸",
    funding: "Full Tuition + $43,000 Stipend",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Economics", "Policy", "Medicine"],
    deadline: "Dec 15, 2026",
    daysLeft: 70,
    level: "PhD",
    logoInitial: "HU",
    logoColor: "bg-rose-900",
  },
  {
    id: 5,
    name: "MIT Presidential Fellowship",
    university: "MIT",
    universityId: "mit",
    officialUrl: "https://www.mit.edu",
    country: "USA",
    flag: "🇺🇸",
    funding: "100% Tuition + $44,500/yr",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["AI", "Robotics", "Engineering"],
    deadline: "Dec 15, 2026",
    daysLeft: 70,
    level: "Masters",
    logoInitial: "MIT",
    logoColor: "bg-red-700",
  },
  {
    id: 6,
    name: "DAAD & TUM Merit Scholarship",
    university: "Technical University of Munich",
    universityId: "tum",
    officialUrl: "https://www.tum.de",
    country: "Germany",
    flag: "🇩🇪",
    funding: "€0 Tuition + €934/mo Living",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Automotive", "Informatics", "Energy"],
    deadline: "Nov 30, 2026",
    daysLeft: 55,
    level: "Masters",
    logoInitial: "TUM",
    logoColor: "bg-blue-600",
  },
  {
    id: 7,
    name: "ETH Zurich Excellence Scholarship (ESOP)",
    university: "ETH Zurich",
    universityId: "eth-zurich",
    officialUrl: "https://ethz.ch",
    country: "Switzerland",
    flag: "🇨🇭",
    funding: "Full Fee Waiver + CHF 24k/yr",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Quantum", "Architecture", "Math"],
    deadline: "Dec 15, 2026",
    daysLeft: 70,
    level: "Masters",
    logoInitial: "ETH",
    logoColor: "bg-sky-800",
  },
  {
    id: 8,
    name: "NUS Research Scholarship & SINGA",
    university: "National University of Singapore",
    universityId: "nus",
    officialUrl: "https://www.nus.edu.sg",
    country: "Singapore",
    flag: "🇸🇬",
    funding: "100% Tuition + S$3,200/mo",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Computing", "Data Science", "Bio"],
    deadline: "Jan 31, 2027",
    daysLeft: 116,
    level: "PhD",
    logoInitial: "NUS",
    logoColor: "bg-orange-600",
  },
  {
    id: 9,
    name: "Lester B. Pearson Scholarship",
    university: "University of Toronto",
    universityId: "utoronto",
    officialUrl: "https://www.utoronto.ca",
    country: "Canada",
    flag: "🇨🇦",
    funding: "Full Tuition + Books + 4-Yr Residence",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Deep Learning", "Sciences", "Health"],
    deadline: "Jan 15, 2027",
    daysLeft: 100,
    level: "Bachelors",
    logoInitial: "UofT",
    logoColor: "bg-indigo-900",
  },
  {
    id: 10,
    name: "Melbourne Graduate Research Scholarship",
    university: "University of Melbourne",
    universityId: "unimelb",
    officialUrl: "https://www.unimelb.edu.au",
    country: "Australia",
    flag: "🇦🇺",
    funding: "100% Fee Offset + AUD $37k/yr",
    badge: "Fully Funded",
    badgeColor: "bg-blue-100 text-blue-700",
    tags: ["Information Tech", "Law", "Commerce"],
    deadline: "Oct 31, 2026",
    daysLeft: 25,
    level: "PhD",
    logoInitial: "UoM",
    logoColor: "bg-blue-950",
  },
];

const tabs = ["All", "Masters", "PhD", "Bachelors"] as const;
type Tab = (typeof tabs)[number];

const sortOptions = [
  "Deadline (Soonest)",
  "Funding Amount",
  "Match Score",
  "Most Recent",
];

const levelMap: Record<string, Scholarship["level"] | undefined> = {
  "Bachelor's": "Bachelors",
  "Master's": "Masters",
  PhD: "PhD",
};

const majorKeywords: Record<string, string[]> = {
  "Computer Science & IT": [
    "computer",
    "cs",
    "ai",
    "robot",
    "data",
    "comput",
    "informatics",
    "information tech",
    "deep learning",
    "quantum",
  ],
  Engineering: [
    "engineer",
    "robot",
    "automotive",
    "energy",
    "stem",
    "quantum",
    "architecture",
  ],
  "Business & Management": [
    "business",
    "management",
    "leadership",
    "economics",
    "policy",
    "commerce",
    "mba",
  ],
  "Medicine & Health": ["medicine", "health", "bio", "biomedical"],
  "Arts & Humanities": ["arts", "humanities", "ppe", "law", "history"],
  Law: ["law"],
  "Natural Sciences": [
    "science",
    "physics",
    "biology",
    "bio",
    "math",
    "quantum",
    "research",
    "stem",
  ],
  "Social Sciences": [
    "social",
    "policy",
    "economics",
    "leadership",
    "humanities",
    "ppe",
  ],
};

function matchesScholarshipType(
  scholarship: Scholarship,
  selectedType: string
) {
  if (selectedType === "All Types") return true;
  if (selectedType === "Fully Funded" || selectedType === "Partial Funding") {
    return scholarship.badge === selectedType;
  }

  const details = `${scholarship.name} ${scholarship.funding} ${scholarship.tags.join(" ")}`.toLowerCase();
  if (selectedType === "Tuition Only") {
    return /tuition|fee|waiver|course fees/.test(details);
  }
  if (selectedType === "Living Stipend") {
    return /stipend|living|\/mo|monthly/.test(details);
  }
  if (selectedType === "Research Grant") {
    return /research|grant/.test(details);
  }
  return true;
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-colors ${
        filled ? "text-blue-600 fill-blue-600" : "text-gray-400"
      }`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
}

export default function ScholarshipsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [heroFilters, setHeroFilters] = useState<ScholarshipFilters | null>(
    null
  );

  useEffect(() => {
    const handleFilterSelection = (event: Event) => {
      const filters = (event as CustomEvent<ScholarshipFilters>).detail;
      setHeroFilters(filters);
      setActiveTab("All");
    };

    window.addEventListener(scholarshipFiltersEvent, handleFilterSelection);
    return () =>
      window.removeEventListener(scholarshipFiltersEvent, handleFilterSelection);
  }, []);

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filtered = scholarships.filter((scholarship) => {
    const matchesTab = activeTab === "All" || scholarship.level === activeTab;
    if (!matchesTab || !heroFilters) return matchesTab;

    const requestedLevel = levelMap[heroFilters.studyLevel];
    const matchesLevel =
      !requestedLevel || scholarship.level === requestedLevel;
    const matchesCountry =
      heroFilters.country === "Any Country" ||
      scholarship.country === heroFilters.country;
    const searchableDetails =
      `${scholarship.name} ${scholarship.tags.join(" ")}`.toLowerCase();
    const keywords = majorKeywords[heroFilters.major];
    const matchesMajor =
      heroFilters.major === "All Fields" ||
      searchableDetails.includes("any field") ||
      !keywords ||
      keywords.some((keyword) => searchableDetails.includes(keyword));
    const matchesType = matchesScholarshipType(
      scholarship,
      heroFilters.scholarshipType
    );

    return matchesLevel && matchesCountry && matchesMajor && matchesType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Deadline (Soonest)") return a.daysLeft - b.daysLeft;
    return 0;
  });

  const displayed = heroFilters ? sorted : sorted.slice(0, 3);

  return (
    <section
      className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="scholarships-heading"
      id="scholarships"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-green-600 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full mb-3">
            ✅ Verified &amp; Updated Daily
          </span>
          <h2
            id="scholarships-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            Live Verified Scholarship Opportunities
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Every scholarship is manually verified by our research team.
            Funding amounts, deadlines, and eligibility are confirmed before
            listing.
          </p>
        </div>

        {/* Filter Tabs + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Tabs */}
          <div
            className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit"
            role="tablist"
            aria-label="Filter scholarships by level"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-gray-500 shrink-0">
              Sort By:
            </label>
            <select
              id="sort-by"
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {heroFilters && (
          <p className="mb-5 text-sm text-gray-600" role="status">
            {filtered.length > 0
              ? `${filtered.length} scholarship${filtered.length === 1 ? "" : "s"} match your selected filters.`
              : "No scholarships match those filters. Try changing your selections."}
          </p>
        )}

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((scholarship) => {
            const university = universitiesData.find(
              (item) => item.id === scholarship.universityId
            );
            const detailHref = `/match-detail?university=${scholarship.universityId}`;

            return (
              <article
                key={scholarship.id}
                className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
              {/* Card Header */}
              <div className="flex items-start justify-between p-5 pb-3">
                <div className="flex items-center gap-3">
                  {/* Logo Placeholder */}
                  <div
                    className={`w-12 h-12 rounded-xl ${scholarship.logoColor} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                    aria-hidden="true"
                  >
                    {scholarship.logoInitial}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight hover:text-blue-600 transition-colors">
                      <Link href={detailHref}>
                        {scholarship.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>{scholarship.flag}</span>
                      <span>{scholarship.university}</span>
                      <span>·</span>
                      <a
                        href={scholarship.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium inline-flex items-center gap-0.5"
                        title={`Visit official ${scholarship.university} website`}
                      >
                        portal ↗
                      </a>
                    </p>
                  </div>
                </div>
                {/* Bookmark */}
                <button
                  onClick={() => toggleBookmark(scholarship.id)}
                  aria-label={
                    bookmarked.has(scholarship.id)
                      ? `Remove ${scholarship.name} from bookmarks`
                      : `Bookmark ${scholarship.name}`
                  }
                  className="shrink-0 ml-2 p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <BookmarkIcon filled={bookmarked.has(scholarship.id)} />
                </button>
              </div>

              <div className="px-5 pb-5 flex flex-col flex-1">
                {/* Funding Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-bold text-gray-900">
                    {scholarship.funding}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${scholarship.badgeColor}`}
                  >
                    {scholarship.badge}
                  </span>
                </div>

                {/* Eligibility Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {scholarship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-5 mt-auto">
                  <svg
                    className="w-4 h-4 shrink-0 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    Deadline:{" "}
                    <strong className="text-gray-700">
                      {scholarship.deadline}
                    </strong>{" "}
                    ·{" "}
                    <span
                      className={
                        scholarship.daysLeft <= 14
                          ? "text-red-500 font-semibold"
                          : "text-gray-500"
                      }
                    >
                      {scholarship.daysLeft} days left
                    </span>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={university?.admissionsUrl || scholarship.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                    aria-label={`Apply for ${scholarship.name}`}
                  >
                    Apply Now
                  </a>
                  <Link
                    href={detailHref}
                    className="flex-1 text-center py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    aria-label={`Learn more about ${scholarship.name}`}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              </article>
            );
          })}
        </div>

        {heroFilters && filtered.length === 0 && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-sm text-gray-600">
              No matches found in the currently listed scholarships. Try
              another study level, field, country, or funding type.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xs"
          >
            Explore All 10 Featured Universities
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
