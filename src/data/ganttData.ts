export interface GanttColumn {
  id: string;
  label: string;
  sublabel: string;
  isToday?: boolean;
}

export interface GanttMilestoneBar {
  id: string;
  name: string;
  badge: {
    text: string;
    color: "red" | "blue" | "green" | "yellow" | "slate";
  };
  startColIndex: number; // 0-based column index
  spanCols: number;      // how many columns wide
  barType: "hard-cutoff" | "fellowship-priority" | "document-vpd" | "completed" | "notification" | "window";
  barLabel: string;
  tagRight?: string;
  bufferTag?: string;
  hasDeadlineFlag?: boolean;
  category: "All Tracks" | "Fellowships & Grants" | "Portal Cutoffs" | "VPD / Verifications" | "Recommendations (LORs)";
}

export interface GanttUniversityGroup {
  id: string;
  name: string;
  subTag: string;
  iconInitial: string;
  iconBg: string;
  iconColor: string;
  milestones: GanttMilestoneBar[];
}

export interface ConflictRiskItem {
  id: string;
  severity: "warning" | "critical";
  title: string;
  dateRange: string;
  description: string;
  primaryAction: string;
  secondaryAction?: string;
}

export interface GanttSummaryProgress {
  percentage: number;
  completedCount: number;
  totalCount: number;
  inFlightCount: number;
  upcomingCount: number;
  earliestHardCutoff: {
    date: string;
    label: string;
  };
  targetFellowshipPool: {
    amount: string;
    sublabel: string;
  };
  vpdClearanceEta: {
    days: string;
    sublabel: string;
  };
  verifiedCredentials: {
    percentage: string;
    sublabel: string;
  };
  bufferScore: string;
  avgBuffer: string;
}

export const ganttColumnsData: GanttColumn[] = [
  { id: "col-oct", label: "Oct 2024", sublabel: "Closed" },
  { id: "col-nov-w1", label: "Nov W1", sublabel: "Nov 01-07" },
  { id: "col-nov-w2", label: "Nov W2", sublabel: "Nov 08 Active", isToday: true },
  { id: "col-nov-w3", label: "Nov W3", sublabel: "Nov 15 Deadline" },
  { id: "col-nov-w4", label: "Nov W4", sublabel: "Nov 22-30" },
  { id: "col-dec-w1", label: "Dec W1-2", sublabel: "Dec 01 DAAD" },
  { id: "col-dec-w3", label: "Dec W3-4", sublabel: "Dec 15 Gatech" },
  { id: "col-jan", label: "Jan 2025", sublabel: "Portal Opens" },
  { id: "col-feb", label: "Feb 2025", sublabel: "Final Interviews" },
  { id: "col-mar", label: "Mar 2025", sublabel: "Admissions Blast" },
  { id: "col-may", label: "May 2025", sublabel: "TUM Final Cutoff" },
];

export const ganttUniversityGroupsData: GanttUniversityGroup[] = [
  {
    id: "stanford",
    name: "Stanford University",
    subTag: "MS CS + KH",
    iconInitial: "SU",
    iconBg: "bg-[#8C1515]",
    iconColor: "text-white",
    milestones: [
      {
        id: "su-kh-essay",
        name: "Knight-Hennessy Final Essay & Video",
        badge: { text: "Critical", color: "red" },
        startColIndex: 1, // Nov W1
        spanCols: 3,      // Nov W1 to Nov W3
        barType: "hard-cutoff",
        barLabel: "★ Video Pitch Final Review",
        tagRight: "9d left (Nov 15)",
        hasDeadlineFlag: true,
        category: "Fellowships & Grants",
      },
      {
        id: "su-dept-app",
        name: "Stanford CS Departmental Application",
        badge: { text: "Dec 03", color: "slate" },
        startColIndex: 2, // Nov W2
        spanCols: 4,      // Nov W2 to Dec W1-2
        barType: "fellowship-priority",
        barLabel: "📄 Faculty Matching SOP Submission",
        bufferTag: "27d buffer",
        category: "Portal Cutoffs",
      },
      {
        id: "su-immersion",
        name: "Immersion Weekend Finalist Notice",
        badge: { text: "Late Jan", color: "slate" },
        startColIndex: 7, // Jan 2025
        spanCols: 2,      // Jan to Feb
        barType: "notification",
        barLabel: "✉ Institutional Decision Notification",
        category: "Fellowships & Grants",
      },
    ],
  },
  {
    id: "gatech",
    name: "Georgia Tech",
    subTag: "MS CS (GRA Priority)",
    iconInitial: "GT",
    iconBg: "bg-[#B3A369]",
    iconColor: "text-white",
    milestones: [
      {
        id: "gt-gre",
        name: "Official GRE Quant (168) Push",
        badge: { text: "ETS Verified", color: "green" },
        startColIndex: 1,
        spanCols: 1,
        barType: "completed",
        barLabel: "✓ Delivered",
        category: "Portal Cutoffs",
      },
      {
        id: "gt-lor3",
        name: "3rd Academic LOR (Prof. David R.)",
        badge: { text: "⚠️ Blocked", color: "yellow" },
        startColIndex: 2,
        spanCols: 3,
        barType: "document-vpd",
        barLabel: "⏳ Pending Reference Submission (Link Unread)",
        tagRight: "Gatech Hard Risk",
        category: "Recommendations (LORs)",
      },
      {
        id: "gt-gra-deadline",
        name: "Priority GRA Remission Deadline",
        badge: { text: "Dec 15 Hard", color: "red" },
        startColIndex: 6,
        spanCols: 1,
        barType: "fellowship-priority",
        barLabel: "🪙 100% Tuition Waiver Filing",
        tagRight: "Dec 15",
        category: "Fellowships & Grants",
      },
    ],
  },
  {
    id: "tum",
    name: "TU Munich (TUM)",
    subTag: "M.Sc. Informatics",
    iconInitial: "TUM",
    iconBg: "bg-[#0066CC]",
    iconColor: "text-white",
    milestones: [
      {
        id: "tum-vpd",
        name: "Uni-Assist VPD & Translation",
        badge: { text: "4-6 Wks Buffer", color: "yellow" },
        startColIndex: 2,
        spanCols: 4,
        barType: "document-vpd",
        barLabel: "📄 Certified Notary Translation & VPD Audit",
        tagRight: "Crucial Pre-requisite",
        category: "VPD / Verifications",
      },
      {
        id: "tum-daad",
        name: "DAAD Master Scholarship Filing",
        badge: { text: "Dec 01", color: "blue" },
        startColIndex: 3,
        spanCols: 3,
        barType: "fellowship-priority",
        barLabel: "💶 €934/mo Full Living Allowance Application",
        tagRight: "Dec 01 Hard",
        category: "Fellowships & Grants",
      },
      {
        id: "tum-portal",
        name: "TUMonline Portal Direct Window",
        badge: { text: "Jan 01 - May 31", color: "slate" },
        startColIndex: 7,
        spanCols: 4,
        barType: "window",
        barLabel: "Portal Submission Window (Requires Approved VPD)",
        tagRight: "May 31 Final",
        category: "Portal Cutoffs",
      },
    ],
  },
  {
    id: "umich",
    name: "University of Michigan",
    subTag: "UMSI MS Information",
    iconInitial: "UM",
    iconBg: "bg-[#00274C]",
    iconColor: "text-[#FFCB05]",
    milestones: [
      {
        id: "um-ielts",
        name: "IELTS Academic 7.5 TRF Dispatch",
        badge: { text: "Delivered", color: "green" },
        startColIndex: 1,
        spanCols: 1,
        barType: "completed",
        barLabel: "✓ Verified by UMSI Admissions",
        category: "Portal Cutoffs",
      },
      {
        id: "um-fellowship",
        name: "UMSI Merit Fellowship Round 1",
        badge: { text: "Jan 15 Priority", color: "blue" },
        startColIndex: 5,
        spanCols: 3,
        barType: "fellowship-priority",
        barLabel: "Early Consideration for 50-100% Tuition Waiver",
        tagRight: "Jan 15 Hard",
        category: "Fellowships & Grants",
      },
    ],
  },
];

export const conflictRiskItemsData: ConflictRiskItem[] = [
  {
    id: "risk-1",
    severity: "warning",
    title: "Overlap Risk: Stanford KH & TUM VPD Document Assembly",
    dateRange: "Nov 12 – Nov 15",
    description:
      "Stanford KH fellowship requires your final video portfolio recording on the same week your German notarized transcripts must be couriered to uni-assist in Berlin.",
    primaryAction: "Auto-Reschedule Buffer (+3 Days)",
    secondaryAction: "Mark Notary Completed",
  },
  {
    id: "risk-2",
    severity: "critical",
    title: "Critical Bottleneck: Prof. David R. LOR Link Inactive",
    dateRange: "Gatech in 39 Days",
    description:
      "Prof. David R. has not opened the recommendation portal link (dispatched 14 days ago). Georgia Tech GRA consideration requires all 3 LORs filed simultaneously.",
    primaryAction: "Send LOR Nudge Email",
    secondaryAction: "Switch to Backup Recommender",
  },
];

export const ganttProgressSummaryData: GanttSummaryProgress = {
  percentage: 36,
  completedCount: 4,
  totalCount: 11,
  inFlightCount: 3,
  upcomingCount: 4,
  earliestHardCutoff: {
    date: "Nov 15",
    label: "Stanford KH Video",
  },
  targetFellowshipPool: {
    amount: "$184,000",
    sublabel: "4 Programs Active",
  },
  vpdClearanceEta: {
    days: "24 Days",
    sublabel: "uni-assist Berlin",
  },
  verifiedCredentials: {
    percentage: "100%",
    sublabel: "GRE + IELTS Synced",
  },
  bufferScore: "Good",
  avgBuffer: "Avg. 12d before cutoffs",
};
