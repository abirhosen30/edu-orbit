import Link from "next/link";
import MatchDetailNavbar from "@/components/MatchDetailNavbar";
import Footer from "@/components/Footer";
import UniversityAccessGate from "@/components/UniversityAccessGate";
import type { University } from "@/data/universities";

type UniversityMatchDetailsProps = {
  university: University;
};

export default function UniversityMatchDetails({
  university,
}: UniversityMatchDetailsProps) {
  const scholarship = university.flagshipScholarship;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col font-sans">
      <MatchDetailNavbar />

      <UniversityAccessGate
        returnTo={`/match-detail?university=${encodeURIComponent(university.id)}`}
      >
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-gray-500 pb-1"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <Link
            href="/universities"
            className="hover:text-blue-600 transition-colors"
          >
            Universities
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700">{university.name}</span>
          <span className="text-gray-400">›</span>
          <span className="text-blue-600 font-semibold">{scholarship.name}</span>
        </nav>

        <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div
                className={`w-14 h-14 rounded-xl ${university.logoBg} ${
                  university.logoTextColor || "text-white"
                } font-black text-xl flex items-center justify-center shrink-0 shadow-xs`}
              >
                {university.logoInitial}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    {university.name}
                  </h1>
                  <a
                    href={university.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    Official website
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {university.countryFlag} {university.city},{" "}
                  {university.country} ·{" "}
                  <span className="font-semibold text-gray-700">
                    QS World Rank #{university.qsRank}
                  </span>
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-medium self-start sm:self-center">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              {university.badge || university.type}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-blue-100/70 text-blue-800">
              {scholarship.type}
            </span>
            <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
              Flagship scholarship
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {scholarship.name}
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-4xl">
              {scholarship.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <MetricCard
              label="Scholarship Coverage"
              value={scholarship.coverage}
              detail={scholarship.type}
              icon="💰"
            />
            <MetricCard
              label="Listed Deadline"
              value={scholarship.deadline}
              detail="Confirm the current cycle with the official program"
              icon="⏳"
            />
            <MetricCard
              label="University Acceptance Rate"
              value={university.acceptanceRate}
              detail="University-level figure; not the scholarship award rate"
              icon="📈"
            />
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
                <span>Eligibility Review</span>
                <span>●</span>
              </div>
              <p className="text-lg font-black text-amber-900">
                Check requirements
              </p>
              <p className="text-[11px] text-amber-800 mt-1">
                Confirm program-specific criteria on the official portal.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-base">⚡</span>
                  <h3 className="text-base font-bold text-gray-900">
                    Scholarship &amp; Application Overview
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Review the published award details, then verify eligibility
                  and application steps with the university.
                </p>
              </div>

              <dl className="divide-y divide-gray-100">
                <DetailRow label="Scholarship" value={scholarship.name} />
                <DetailRow label="Award type" value={scholarship.type} />
                <DetailRow label="Published coverage" value={scholarship.coverage} />
                <DetailRow label="Listed deadline" value={scholarship.deadline} />
                <DetailRow label="Tuition / financial model" value={university.averageTuition} />
                <DetailRow label="Admissions portal" value={university.admissionsUrl} />
              </dl>

              <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                Scholarship eligibility, eligible degree levels, required
                documents, and deadlines can vary by program and application
                cycle. Confirm each item with the official admissions and
                scholarship portals before applying.
              </p>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-base">🎓</span>
                  <h3 className="text-base font-bold text-gray-900">
                    Popular Programs
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Areas listed in the university directory. Check the official
                  catalog for current courses and scholarship eligibility.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {university.popularPrograms.map((program) => (
                  <div
                    key={program}
                    className="flex items-start gap-2 rounded-xl border border-gray-100 bg-slate-50 p-3 text-sm text-gray-800"
                  >
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{program}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-5">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-base">🗺️</span>
                  <h3 className="text-base font-bold text-gray-900">
                    Application Roadmap
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  A practical checklist to follow; the exact process and dates
                  are set by the university and award provider.
                </p>
              </div>
              <ol className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                {[
                  {
                    title: "Choose an eligible degree program",
                    description:
                      "Review the official course catalog and confirm that the program and degree level are eligible for this award.",
                  },
                  {
                    title: "Confirm award requirements and deadline",
                    description:
                      "Check applicant criteria, funding conditions, required documents, and the current application-cycle deadline.",
                  },
                  {
                    title: "Prepare and submit your applications",
                    description:
                      "Follow the official instructions for the admissions application and scholarship application; some awards require separate submissions.",
                  },
                  {
                    title: "Track the application with the university",
                    description:
                      "Use the official portal for status updates, interview requests, decisions, and any follow-up documents.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="relative">
                    <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-white">
                      {index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-900">
                University Highlights
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {university.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {university.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2 rounded-xl bg-blue-50/60 border border-blue-100 p-3 text-xs text-blue-950"
                  >
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 tracking-wider uppercase">
                <span className="text-blue-600">⚡</span>
                <span>Application Resources</span>
              </div>
              <div className="space-y-3">
                <OfficialLink
                  href={university.admissionsUrl}
                  label="Admissions portal"
                  description="Review courses and application instructions"
                />
                <OfficialLink
                  href={university.officialWebsite}
                  label="University website"
                  description="Verify official university information"
                />
              </div>
              <a
                href={university.admissionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                Open Admissions Portal <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
              <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                Before You Apply
              </h3>
              <ul className="space-y-3 text-xs text-gray-600">
                {[
                  "Confirm the award is open for your intended intake.",
                  "Check degree-level, residency, and subject restrictions.",
                  "Verify whether the scholarship needs a separate application.",
                  "Confirm required tests, documents, and recommendation letters.",
                  "Check whether the funding covers tuition, living costs, or both.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">□</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-gray-800">
                Need another university?
              </h3>
              <p className="text-xs text-gray-500">
                Browse the directory to compare universities and their listed
                flagship scholarships.
              </p>
              <Link
                href="/universities"
                className="inline-flex text-xs font-semibold text-blue-600 hover:underline"
              >
                Back to Universities →
              </Link>
            </section>
          </aside>
        </div>
      </main>
      </UniversityAccessGate>

      <Footer />
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
}) {
  return (
    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-1">
        <span>{label}</span>
        <span className="text-blue-600 text-sm">{icon}</span>
      </div>
      <p className="text-base font-black text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-500 mt-1">{detail}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3 text-xs">
      <dt className="font-semibold text-gray-700">{label}</dt>
      <dd className="sm:col-span-2 text-gray-600 break-words">{value}</dd>
    </div>
  );
}

function OfficialLink({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
    >
      <span className="block text-xs font-bold text-gray-900">{label} ↗</span>
      <span className="block text-[11px] text-gray-500 mt-1">{description}</span>
    </a>
  );
}
