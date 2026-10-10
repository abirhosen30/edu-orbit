import type { Metadata } from "next";
import DeadlinesTrackerClient from "@/components/deadlines/DeadlinesTrackerClient";

export const metadata: Metadata = {
  title: "Application Deadlines & Milestone Tracker | EduOrbit",
  description:
    "Live tracked deadlines for your shortlisted programs and linked fellowships with automatic countdowns adjusted to EST, CET, and local time (IST).",
};

export default function DeadlinesPage() {
  return <DeadlinesTrackerClient />;
}
