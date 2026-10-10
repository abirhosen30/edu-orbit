'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import EligibilityNavbar from "@/components/EligibilityNavbar";
import { sampleMatchedUniversities } from "@/data/matchedUniversities";
import { universitiesData } from "@/data/universities";
import { useBrowserStorage } from "@/lib/useBrowserStorage";

const emptyShortlist: string[] = [];

interface ComparableUniversity {
  id: string;
  name: string;
  shortName: string;
  location: string;
  logoBg: string;
  logoColor: string;
  logoInitial: string;
  program: string;
  qsRank: number;
  matchPercentage: number | null;
  eligibilityStatus: string;
  fundingTitle: string;
  fundingHeadline: string;
  fundingDetails: string;
  verifiedText: string;
}

export default function ShortlistCompareClient() {
  const [savedIds, setSavedIds, storageError] = useBrowserStorage(
    "eduorbit_university_shortlist",
    emptyShortlist
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [writeError, setWriteError] = useState("");

  const savedUniversities = useMemo(
    () => savedIds.flatMap((id): ComparableUniversity[] => {
      const match = sampleMatchedUniversities.find((university) => university.id === id);
      if (match) {
        return [{
          id: match.id,
          name: match.name,
          shortName: match.shortName,
          location: match.location,
          logoBg: match.logoBg,
          logoColor: match.logoColor,
          logoInitial: match.logoInitial,
          program: match.program,
          qsRank: match.qsRank,
          matchPercentage: match.matchPercentage,
          eligibilityStatus: match.eligibilityStatus,
          fundingTitle: match.funding.title,
          fundingHeadline: match.funding.headline,
          fundingDetails: match.funding.details,
          verifiedText: match.verifiedText,
        }];
      }

      const university = universitiesData.find((item) => item.id === id);
      if (!university) return [];
      return [{
        id: university.id,
        name: university.name,
        shortName: university.shortName,
        location: `${university.city}, ${university.country}`,
        logoBg: university.logoBg,
        logoColor: university.logoTextColor ?? "text-gray-900",
        logoInitial: university.logoInitial,
        program: university.popularPrograms.join(", "),
        qsRank: university.qsRank,
        matchPercentage: null,
        eligibilityStatus: "Not assessed",
        fundingTitle: university.flagshipScholarship.name,
        fundingHeadline: university.flagshipScholarship.coverage,
        fundingDetails: university.flagshipScholarship.description,
        verifiedText: `Official website: ${university.officialWebsite}`,
      }];
    }),
    [savedIds]
  );

  const filteredUniversities = savedUniversities.filter((university) =>
    `${university.name} ${university.program} ${university.location}`
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );

  const removeUniversity = (id: string) => {
    try {
      setSavedIds((current) => current.filter((savedId) => savedId !== id));
      setWriteError("");
    } catch {
      setWriteError(
        "Could not update your shortlist. Check browser storage settings and try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans antialiased">
      <EligibilityNavbar
        shortlistCount={savedIds.length}
        savedUniversities={savedUniversities}
        onRemoveSavedUniversity={removeUniversity}
        activeSubTab="compare"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/eligibility" className="hover:text-blue-600">Student Dashboard</Link>
          <span aria-hidden="true">›</span>
          <span className="font-semibold text-blue-600">Shortlist &amp; Compare</span>
        </nav>

        <header className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Your saved options
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              Shortlist &amp; Compare
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              Compare saved universities side by side. Your shortlist stays in this browser.
            </p>
          </div>
          <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
            {savedUniversities.length}{" "}
            {savedUniversities.length === 1 ? "university" : "universities"} saved
          </div>
        </header>

        {storageError || writeError ? (
          <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {writeError || storageError}
          </p>
        ) : null}

        {savedUniversities.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
            <div aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              ☆
            </div>
            <h2 className="mt-4 text-lg font-bold text-gray-900">Your shortlist is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Save universities from the directory or your eligibility matches to compare their programs, funding, and match scores here.
            </p>
            <Link
              href="/universities"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              Browse universities
            </Link>
          </section>
        ) : filteredUniversities.length === 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center">
            <h2 className="text-base font-bold text-gray-900">No saved matches found</h2>
            <p className="mt-2 text-sm text-gray-600">
              Try a different university, program, or location search.
            </p>
          </section>
        ) : (
          <section aria-label="University comparison" className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th scope="col" className="sticky left-0 z-10 w-44 border-b border-r border-gray-200 bg-slate-50 p-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Compare
                    </th>
                    {filteredUniversities.map((university) => (
                      <th key={university.id} scope="col" className="min-w-64 border-b border-gray-200 p-4 align-top">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-start gap-3">
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${university.logoBg} ${university.logoColor} text-xs font-black`}>
                              {university.logoInitial}
                            </span>
                            <div className="min-w-0">
                              <h2 className="font-bold leading-snug text-gray-900">{university.name}</h2>
                              <p className="mt-1 text-xs font-medium text-gray-500">{university.location}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeUniversity(university.id)}
                            aria-label={`Remove ${university.name} from shortlist`}
                            className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                        <Link
                          href={`/match-detail?university=${university.id}`}
                          className="mt-3 inline-flex text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          View details →
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Program",
                      value: (university: (typeof savedUniversities)[number]) => university.program,
                    },
                    {
                      label: "QS rank",
                      value: (university: (typeof savedUniversities)[number]) => `#${university.qsRank}`,
                    },
                    {
                      label: "Match score",
                      value: (university: (typeof savedUniversities)[number]) =>
                        university.matchPercentage === null ? "Not assessed" : `${university.matchPercentage}%`,
                    },
                    {
                      label: "Eligibility",
                      value: (university: (typeof savedUniversities)[number]) => university.eligibilityStatus,
                    },
                    {
                      label: "Funding",
                      value: (university: (typeof savedUniversities)[number]) =>
                        `${university.fundingTitle}: ${university.fundingHeadline}`,
                    },
                    {
                      label: "Funding details",
                      value: (university: (typeof savedUniversities)[number]) => university.fundingDetails,
                    },
                    {
                      label: "Verification",
                      value: (university: (typeof savedUniversities)[number]) => university.verifiedText,
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-b-0">
                      <th scope="row" className="sticky left-0 z-10 border-r border-gray-100 bg-white p-4 text-xs font-bold text-gray-600">
                        {row.label}
                      </th>
                      {filteredUniversities.map((university) => (
                        <td key={university.id} className="min-w-64 p-4 align-top text-sm leading-relaxed text-gray-800">
                          {row.value(university)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {savedUniversities.length > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              {filteredUniversities.length} of {savedUniversities.length} saved universities shown
            </p>
            <Link href="/eligibility" className="text-sm font-bold text-blue-600 hover:underline">
              Add more matches →
            </Link>
          </div>
        ) : null}
      </main>
    </div>
  );
}
