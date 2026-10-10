import type { Metadata } from "next";
import EligibilityDashboardClient from "@/components/EligibilityDashboardClient";

export const metadata: Metadata = {
  title: "Eligibility Checker & Matched Universities | EduOrbit",
  description:
    "Review your verified university matches, funding breakdown, admissions readiness checklist, and upcoming critical deadlines.",
};

export default function EligibilityPage() {
  return <EligibilityDashboardClient />;
}
