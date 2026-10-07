import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="w-full py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#0F2A4A" }}
      aria-labelledby="cta-heading"
      id="get-started"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider bg-blue-900/50 px-4 py-1.5 rounded-full mb-6">
          <span
            className="w-2 h-2 rounded-full bg-blue-400 inline-block"
            style={{ animation: "pulse 2s infinite" }}
          />
          Free to Start · No Credit Card Required
        </span>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
        >
          Calculate Your Real Chance in{" "}
          <span className="text-blue-400">3 Minutes</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-5 text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
          Stop losing time on scholarships you&apos;re not eligible for. Let
          EduOrbit&apos;s AI match your exact profile against 48,500+ verified
          opportunities — and show you your real chances before you apply.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#scholarships"
            className="px-10 py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95"
            aria-label="Start your scholarship match now"
          >
            🚀 Start Your Match Now
          </Link>
          <Link
            href="/universities"
            className="px-8 py-4 rounded-xl border border-blue-400/40 text-blue-200 font-medium text-base hover:bg-white/5 transition-colors"
          >
            Browse Scholarships First
          </Link>
        </div>

        {/* Sub-text */}
        <p className="mt-6 text-sm text-blue-300/70">
          Access{" "}
          <strong className="text-blue-300 font-semibold">
            1,100+ Scholarships
          </strong>{" "}
          instantly · No application fee · Trusted by 3,200+ students worldwide
        </p>

        {/* Trust Logos Placeholder */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-50">
          {["Stanford", "MIT", "Cambridge", "DAAD", "Chevening", "Gates"].map(
            (brand) => (
              <span
                key={brand}
                className="text-sm font-semibold text-blue-200 tracking-wide"
              >
                {brand}
              </span>
            )
          )}
        </div>
        <p className="mt-2 text-xs text-blue-400/50">
          Scholarships from institutions trusted worldwide
        </p>
      </div>
    </section>
  );
}
