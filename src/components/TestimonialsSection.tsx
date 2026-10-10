// Server Component — static testimonial cards

interface Testimonial {
  name: string;
  country: string;
  flag: string;
  university: string;
  scholarship: string;
  quote: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
  amount: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Anh Tran Ha",
    country: "Vietnam",
    flag: "🇻🇳",
    university: "TU Delft, Netherlands",
    scholarship: "Holland Scholarship",
    quote:
      "EduOrbit matched me to 12 scholarships I had never heard of. Within 3 months, I had a full offer from TU Delft. The deadline tracker alone saved my application — I almost missed it!",
    avatarInitials: "AT",
    avatarBg: "bg-pink-500",
    rating: 5,
    amount: "€5,000 + Full Admission",
  },
  {
    name: "Fatima Zahry",
    country: "Morocco",
    flag: "🇲🇦",
    university: "Sciences Po, France",
    scholarship: "Eiffel Excellence Scholarship",
    quote:
      "I spent 6 months searching on my own with zero results. EduOrbit showed me exactly which scholarships matched my GPA and field. I got the Eiffel scholarship in my first attempt!",
    avatarInitials: "FZ",
    avatarBg: "bg-violet-500",
    rating: 5,
    amount: "€1,181/mo + Tuition",
  },
  {
    name: "Karan Ahmad",
    country: "India",
    flag: "🇮🇳",
    university: "University of Toronto",
    scholarship: "Vanier CGS",
    quote:
      "The AI matching was surprisingly accurate. It told me my profile had a 91% match with the Vanier scholarship. I applied, and I got it. The community forum also helped me write a stronger statement.",
    avatarInitials: "KA",
    avatarBg: "bg-blue-500",
    rating: 5,
    amount: "CAD $50,000/yr",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="w-full scroll-mt-28 bg-white py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="testimonials-heading"
      id="stories"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full mb-3">
            ✅ Real Students, Real Results
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            Verified Student Stories
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Over 3,200 students have found their scholarship through EduOrbit.
            Here are a few of their journeys.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Quote */}
              <blockquote className="mt-4 text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Award Badge */}
              <div className="mt-4 mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                🏆 {t.scholarship} · {t.amount}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div
                  className={`w-11 h-11 rounded-full ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  aria-hidden="true"
                >
                  {t.avatarInitials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t.name}{" "}
                    <span aria-label={`from ${t.country}`}>{t.flag}</span>
                  </p>
                  <p className="text-xs text-gray-500">{t.university}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {[
            { value: "3,200+", label: "Success Stories" },
            { value: "97%", label: "Would Recommend" },
            { value: "4.9/5", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-extrabold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
