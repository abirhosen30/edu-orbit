import type { Metadata } from "next";
import EligibilityDashboardClient from "@/components/EligibilityDashboardClient";
import UniversityAccessGate from "@/components/UniversityAccessGate";

export const metadata: Metadata = {
  title: "Eligibility Checker & Matched Universities | EduOrbit",
  description:
    "Review your verified university matches, funding breakdown, admissions readiness checklist, and upcoming critical deadlines.",
};

export default function EligibilityPage() {
  return (
    <UniversityAccessGate
      returnTo="/eligibility"
      title="Sign in to use the Eligibility Checker"
      description="Create an account or sign in to review your personalized university matches, funding, and application readiness."
    >
      <EligibilityDashboardClient />
    </UniversityAccessGate>
  );
}
