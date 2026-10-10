import Link from "next/link";

const resources = [
  {
    title: "Eligibility dashboard",
    description: "Review matched universities and scholarship opportunities for your study plans.",
    href: "/eligibility",
    label: "Open eligibility dashboard",
    icon: "🎯",
    iconClass: "bg-blue-50 text-blue-700",
  },
  {
    title: "Deadline tracker",
    description: "Keep application milestones and important dates organized in one place.",
    href: "/deadlines",
    label: "Open deadline tracker",
    icon: "📅",
    iconClass: "bg-amber-50 text-amber-700",
  },
  {
    title: "Shortlist & compare",
    description: "Compare saved universities and scholarship options side by side.",
    href: "/shortlist",
    label: "Open shortlist and compare",
    icon: "⚖️",
    iconClass: "bg-violet-50 text-violet-700",
  },
  {
    title: "Application timeline",
    description: "Plan application tasks and milestones across your university choices.",
    href: "/gantt",
    label: "Open application timeline",
    icon: "📈",
    iconClass: "bg-emerald-50 text-emerald-700",
  },
];

export default function StudentResourcesSection() {
  return (
    <section
      id="resources"
      aria-labelledby="student-resources-heading"
      className="scroll-mt-28 border-t border-slate-100 bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            Student toolkit
          </span>
          <h2
            id="student-resources-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl"
          >
            Resources for your study journey
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Move from finding opportunities to planning applications with tools built for each step.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <article
              key={resource.href}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${resource.iconClass}`}
              >
                {resource.icon}
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{resource.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {resource.description}
              </p>
              <Link
                href={resource.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
              >
                {resource.label}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
