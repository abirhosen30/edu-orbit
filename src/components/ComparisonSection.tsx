// Server Component — pure static comparison table

interface CriteriaRow {
  label: string;
  eduOrbit: string;
  competitor: string;
  eduOrbitPositive: boolean;
  competitorPositive: boolean;
}

const criteria: CriteriaRow[] = [
  {
    label: "Application Login",
    eduOrbit: "Instant sign-up, guided onboarding",
    competitor: "Complex forms, slow approval",
    eduOrbitPositive: true,
    competitorPositive: false,
  },
  {
    label: "Scholarship Database",
    eduOrbit: "48,500+ verified, updated daily",
    competitor: "Generic web results, unverified",
    eduOrbitPositive: true,
    competitorPositive: false,
  },
  {
    label: "Eligibility Matching",
    eduOrbit: "AI-powered, 95.6% accuracy",
    competitor: "Manual search, hit-or-miss",
    eduOrbitPositive: true,
    competitorPositive: false,
  },
  {
    label: "Supports Community",
    eduOrbit: "Peer forums + mentor network",
    competitor: "No community support",
    eduOrbitPositive: true,
    competitorPositive: false,
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-500 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="w-5 h-5 text-red-400 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function ComparisonSection() {
  return (
    <section
      className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="comparison-heading"
      id="comparison"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-3">
            Why Choose Us
          </span>
          <h2
            id="comparison-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            Why EduOrbit vs Generic AI / Traditional Agencies
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            See exactly how EduOrbit outperforms generic AI tools and old-school
            education agencies.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm" role="table">
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  scope="col"
                  className="py-4 px-6 font-semibold text-gray-600 bg-gray-50 w-1/3"
                >
                  Criteria
                </th>
                <th
                  scope="col"
                  className="py-4 px-6 font-semibold text-white bg-blue-600 text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    {/* Orbit mini icon */}
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle cx="16" cy="16" r="4" fill="white" />
                      <ellipse
                        cx="16"
                        cy="16"
                        rx="13"
                        ry="5.5"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        transform="rotate(-30 16 16)"
                      />
                    </svg>
                    EduOrbit Platform
                  </span>
                </th>
                <th
                  scope="col"
                  className="py-4 px-6 font-semibold text-gray-600 bg-gray-50 text-center"
                >
                  Generic AI / Old School Agents
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((row, idx) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 last:border-0 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {/* Criteria Label */}
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {row.label}
                  </td>

                  {/* EduOrbit Column */}
                  <td className="py-4 px-6 bg-blue-50/40">
                    <div className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-gray-700">{row.eduOrbit}</span>
                    </div>
                  </td>

                  {/* Competitor Column */}
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-2">
                      <CrossIcon />
                      <span className="text-gray-500">{row.competitor}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            Try EduOrbit Free →
          </a>
        </div>
      </div>
    </section>
  );
}
