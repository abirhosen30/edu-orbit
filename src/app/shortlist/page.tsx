import type { Metadata } from "next";
import ShortlistCompareClient from "@/components/ShortlistCompareClient";
import UniversityAccessGate from "@/components/UniversityAccessGate";

export const metadata: Metadata = {
  title: "Shortlist & Compare Universities | EduOrbit",
  description:
    "Compare saved university matches, programs, eligibility, funding, and verification details.",
};

export default function ShortlistPage() {
  return (
    <UniversityAccessGate
      returnTo="/shortlist"
      title="Sign in to open your shortlist"
      description="Create an account or sign in to save, compare, and manage your shortlisted universities."
    >
      <ShortlistCompareClient />
    </UniversityAccessGate>
  );
}
