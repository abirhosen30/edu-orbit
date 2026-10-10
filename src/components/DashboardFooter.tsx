import Link from "next/link";

export default function DashboardFooter() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 py-5 text-xs text-gray-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left copyright */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <Link
            href="/"
            className="text-blue-600 font-extrabold text-base tracking-tight hover:opacity-90"
          >
            EduOrbit
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="text-gray-500 text-[11px] sm:text-xs">
            © 2026 EduOrbit Global Inc. All official data verified and accredited.
          </span>
        </div>

        {/* Right footer links matching screenshot */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-[11px] sm:text-xs text-gray-600">
          <Link href="/#resources" className="hover:text-blue-600 transition-colors">
            Data Verification Pledge
          </Link>
          <Link href="/#resources" className="hover:text-blue-600 transition-colors">
            Student Resources
          </Link>
          <Link href="/#accreditation" className="hover:text-blue-600 transition-colors">
            Accreditation
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
