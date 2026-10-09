import type { Metadata } from "next";
import GanttDashboardClient from "@/components/gantt/GanttDashboardClient";

export const metadata: Metadata = {
  title: "Admissions & Fellowship Gantt Timeline | EduOrbit",
  description:
    "Coordinate complex overlapping institutional cutoffs, fellowship early-action windows, and VPD credential evaluations with interactive Gantt tracking.",
};

export default function GanttTimelinePage() {
  return <GanttDashboardClient />;
}
