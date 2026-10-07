// Server Component — no interactivity needed

const steps = [
  {
    number: 1,
    icon: "👤",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
    title: "Profile Setup",
    target: "#profile-setup",
    description:
      "Tell us about your academic background, GPA, test scores, and field of study in under 2 minutes.",
    connectorColor: "bg-blue-200",
  },
  {
    number: 2,
    icon: "🔍",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    borderColor: "border-violet-200",
    accentColor: "text-violet-600",
    title: "Eligibility Sort",
    target: "#scholarships",
    description:
      "Our AI filters 48,500+ scholarships down to only those you genuinely qualify for — no wasted applications.",
    connectorColor: "bg-violet-200",
  },
  {
    number: 3,
    icon: "🎯",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
    title: "Scholarship Match",
    target: "#scholarships",
    description:
      "Each scholarship is ranked by your match score, funding amount, and success rate of similar applicants.",
    connectorColor: "bg-blue-200",
  },
  {
    number: 4,
    icon: "📋",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
    accentColor: "text-green-600",
    title: "Pick the List",
    target: "#scholarships",
    description:
      "Bookmark your favorites, compare funding packages side-by-side, and export your personalised shortlist.",
    connectorColor: "bg-green-200",
  },
  {
    number: 5,
    icon: "⏰",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200",
    accentColor: "text-orange-600",
    title: "Deadline Tracker",
    target: "#scholarships",
    description:
      "Get automated reminders before every deadline so you never miss a scholarship opportunity again.",
    connectorColor: "bg-orange-200",
  },
];

export default function JourneySection() {
  return (
    <section
      className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="journey-heading"
      id="journey"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-3">
            Our Process
          </span>
          <h2
            id="journey-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            The 5-Step Connected Journey
          </h2>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            From confusion to scholarship offer — a structured path only
            EduOrbit provides
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <article
              key={step.number}
              className={`relative flex flex-col bg-white rounded-2xl border ${step.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              {/* Connector line between cards on large screens */}
              {idx < steps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-12 left-full w-6 h-0.5 ${step.connectorColor} z-10`}
                  aria-hidden="true"
                />
              )}

              {/* Step Number */}
              <span
                className={`text-xs font-bold ${step.accentColor} uppercase tracking-widest mb-3`}
              >
                Step {step.number}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl ${step.iconBg} flex items-center justify-center text-2xl mb-4`}
                aria-hidden="true"
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className={`text-base font-bold text-gray-900 mb-2`}>
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {step.description}
              </p>

              {/* See How link */}
              <a
                href={step.target}
                className={`mt-4 text-sm font-semibold ${step.accentColor} hover:underline inline-flex items-center gap-1`}
              >
                See How
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
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
