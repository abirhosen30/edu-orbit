export interface MilestoneItem {
  id: string;
  type: "complete" | "action-required" | "in-progress" | "bottleneck" | "upcoming";
  title: string;
  statusBadge?: {
    text: string;
    color: "green" | "blue" | "red" | "amber";
  };
  details: string;
  deadlineText?: string;
  secondaryDeadlineText?: string;
  tag?: string;
  isActionRequired?: boolean;
  actionButtons?: {
    label: string;
    actionType: "primary" | "secondary";
    url?: string;
  }[];
  warningNotice?: string;
  rightBadge?: {
    text: string;
    subtext?: string;
    color?: string;
  };
  category: "Priority / Fellowships" | "University Portals" | "Document Audits";
}

export interface UniversityDeadline {
  id: string;
  name: string;
  shortName: string;
  logoInitial: string;
  logoBg: string;
  logoColor: string;
  tier: "Dream Tier" | "Target Tier" | "Safe Tier";
  subTags: string[];
  location: string;
  program: string;
  urgencyBadge: {
    text: string;
    subtext?: string;
    color: "red" | "blue" | "rose" | "slate";
  };
  alertNotice?: {
    title: string;
    text: string;
  };
  milestones: MilestoneItem[];
  footerStats: {
    leftItems: string[];
    actionLink: {
      text: string;
      url: string;
    };
  };
}

export interface TrackerSummaryMetrics {
  nextCriticalDeadline: {
    university: string;
    action: string;
    daysLeft: number;
    dates: {
      pst: string;
      ist: string;
    };
  };
  dossierReadiness: {
    percentage: number;
    readyCount: number;
    totalCount: number;
    description: string;
    pendingNote: string;
    badge: string;
  };
  milestoneHealth: {
    totalSteps: number;
    description: string;
    completed: number;
    inProgress: number;
    upcoming: number;
  };
  priorityApplicationCodes: {
    amountSavedUsd: number;
    amountSavedInr: string;
    description: string;
    perk: string;
  };
}

export interface TimezoneClock {
  city: string;
  code: string;
  isLocal?: boolean;
  time: string;
  subtext: string;
  offset: string;
}

export interface DossierDocument {
  id: string;
  title: string;
  description: string;
  badge: {
    text: string;
    color: "green" | "blue" | "red";
  };
}

export interface DataVerificationEntry {
  portal: string;
  timestamp: string;
}

export const trackerMetricsData: TrackerSummaryMetrics = {
  nextCriticalDeadline: {
    university: "Stanford Knight-Hennessy",
    action: "Final Leadership Essay & Video Statement",
    daysLeft: 18,
    dates: {
      pst: "Nov 15, 23:59 PST",
      ist: "Nov 16, 13:29 IST",
    },
  },
  dossierReadiness: {
    percentage: 78,
    readyCount: 7,
    totalCount: 9,
    description: "Transcripts & standardized scores fully validated.",
    pendingNote: "2 Pending items: LOR 3 & Solvency",
    badge: "Audit Passed",
  },
  milestoneHealth: {
    totalSteps: 11,
    description: "4 Completed across 4 universities",
    completed: 4,
    inProgress: 3,
    upcoming: 4,
  },
  priorityApplicationCodes: {
    amountSavedUsd: 245,
    amountSavedInr: "≈ ₹20,580 INR",
    description: "Applied via EduOrbit Institutional partnership waivers",
    perk: "Stanford KHS 100% Free",
  },
};

export const timezoneClocksData: TimezoneClock[] = [
  {
    city: "New Delhi",
    code: "IST",
    isLocal: true,
    time: "18:45",
    subtext: "UTC +5:30",
    offset: "LOCAL",
  },
  {
    city: "Stanford",
    code: "PST",
    time: "05:15",
    subtext: "Pacific Time",
    offset: "-13.5h",
  },
  {
    city: "Atlanta",
    code: "EST",
    time: "08:15",
    subtext: "Eastern Time",
    offset: "-10.5h",
  },
  {
    city: "Munich",
    code: "CET",
    time: "14:15",
    subtext: "Central European",
    offset: "-4.5h",
  },
];

export const masterDossierDocuments: DossierDocument[] = [
  {
    id: "doc-1",
    title: "Undergrad Transcript",
    description: "B.Tech CSE (3.72 GPA) • WES verified",
    badge: { text: "WES Ready", color: "green" },
  },
  {
    id: "doc-2",
    title: "Official IELTS TRF",
    description: "7.5 Academic (R:8.5, L:8.0, W:7.0, S:7.0)",
    badge: { text: "EIP Push", color: "green" },
  },
  {
    id: "doc-3",
    title: "GRE Score Report",
    description: "324 (Quant 168 / Verbal 156 / AWA 4.5)",
    badge: { text: "ETS Code", color: "green" },
  },
  {
    id: "doc-4",
    title: "SOP Master Version",
    description: "Reviewed by Senior Counselor Sarah K.",
    badge: { text: "v3 Approved", color: "blue" },
  },
  {
    id: "doc-5",
    title: "Academic LOR 1",
    description: "Prof. Sharma (CS Dept) • Submitted",
    badge: { text: "Oct 18", color: "green" },
  },
  {
    id: "doc-6",
    title: "Academic LOR 2",
    description: "Prof. Kulkarni (AI Lab) • Submitted",
    badge: { text: "Oct 24", color: "green" },
  },
  {
    id: "doc-7",
    title: "Academic LOR 3",
    description: "Prof. David R. • Link Unread (Action!)",
    badge: { text: "Nudge", color: "red" },
  },
  {
    id: "doc-8",
    title: "Bank Solvency Certificate",
    description: "SBI Bank Statement ₹35L / For I-20",
    badge: { text: "In Branch", color: "blue" },
  },
  {
    id: "doc-9",
    title: "Academic CV",
    description: "2-Page Ivy / Top-10 Layout Formatted",
    badge: { text: "Ready", color: "green" },
  },
];

export const verificationLogData: DataVerificationEntry[] = [
  { portal: "Gatech CS Graduate Portal", timestamp: "2 hrs ago" },
  { portal: "TUM Admissions Office / VPD", timestamp: "Yesterday" },
  { portal: "Stanford KHS Scholar Office", timestamp: "3 hrs ago" },
  { portal: "ETS Data Feed", timestamp: "Real-time" },
];

export const sampleUniversitiesDeadlines: UniversityDeadline[] = [
  {
    id: "stanford",
    name: "Stanford University",
    shortName: "Stanford",
    logoInitial: "SU",
    logoBg: "bg-[#8C1515]",
    logoColor: "text-white",
    tier: "Dream Tier",
    subTags: ["Dual Track: KH + MS CS"],
    location: "Palo Alto, CA, USA",
    program: "MS in Computer Science (Fall 2025)",
    urgencyBadge: {
      text: "18 Days Left (Critical)",
      color: "red",
    },
    milestones: [
      {
        id: "su-1",
        type: "complete",
        title: "Online Profile & Transcripts Upload",
        statusBadge: { text: "Verified Oct 14", color: "green" },
        details: "B.Tech 6-Semester official sealed transcript accepted by portal.",
        rightBadge: { text: "Complete", color: "text-emerald-600" },
        category: "Document Audits",
      },
      {
        id: "su-2",
        type: "action-required",
        tag: "ACTION REQUIRED NOW",
        title: "Knight-Hennessy Final Leadership Essay & Video Statement",
        details:
          "Three prompt responses (max 250 words each) + 2-minute unedited prompt video response hosted inside portal.",
        deadlineText: "Nov 15, 2024",
        secondaryDeadlineText: "23:59 PST (Nov 16, 13:29 IST)",
        isActionRequired: true,
        actionButtons: [
          { label: "Open Stanford Portal", actionType: "primary", url: "https://gradadmissions.stanford.edu" },
          { label: "Upload Draft for Review", actionType: "secondary" },
        ],
        warningNotice: "Automated warning: KHS strictly disallows late submissions.",
        category: "Priority / Fellowships",
      },
      {
        id: "su-3",
        type: "in-progress",
        title: "Stanford MS CS Departmental Application & GRE Reporting",
        statusBadge: { text: "Draft Initiated", color: "blue" },
        details:
          "Departmental separate application code (ETS Code: 4704, Quant requirement verified).",
        deadlineText: "Dec 03, 2024",
        rightBadge: { text: "Dec 03, 2024", subtext: "28 Days remaining" },
        category: "University Portals",
      },
      {
        id: "su-4",
        type: "upcoming",
        title: "Immersion Weekend Finalist Notification",
        details: "Final round interview invitations dispatched for selected cohort.",
        deadlineText: "Feb 07, 2025",
        rightBadge: { text: "Feb 07, 2025" },
        category: "Priority / Fellowships",
      },
    ],
    footerStats: {
      leftItems: [
        "LORs 2/2 Received",
        "Transcripts Approved",
        "App Fee: $140 / $125 Off",
      ],
      actionLink: {
        text: "View Detailed Instructions",
        url: "/match-detail?university=stanford",
      },
    },
  },
  {
    id: "gatech",
    name: "Georgia Institute of Technology",
    shortName: "Georgia Tech",
    logoInitial: "GT",
    logoBg: "bg-[#B3A369]",
    logoColor: "text-white",
    tier: "Target Tier",
    subTags: ["GRA Priority Funding Eligible"],
    location: "Atlanta, GA, USA",
    program: "M.S. Computer Science (Machine Learning Specialization)",
    urgencyBadge: {
      text: "48 Days Left (Dec 15, 23:59 EST)",
      color: "blue",
    },
    milestones: [
      {
        id: "gt-1",
        type: "complete",
        title: "Official GRE Quant Score Sent (168)",
        statusBadge: { text: "Verified: ETS Oct 22", color: "green" },
        details: "Score delivered under Institute Code: 5248. Matched with Slate dossier.",
        rightBadge: { text: "ETS Received", color: "text-emerald-600" },
        category: "Document Audits",
      },
      {
        id: "gt-2",
        type: "in-progress",
        title: "Statement of Purpose & Faculty Research Alignment",
        statusBadge: { text: "Draft v2 in progress", color: "blue" },
        details:
          "Aligning ML systems experience with Prof. Santosh Vempala and Prof. Polo Chau's lab publications.",
        rightBadge: { text: "Target: Nov 20" },
        category: "Document Audits",
      },
      {
        id: "gt-3",
        type: "bottleneck",
        tag: "BOTTLENECK",
        title: "3rd Academic LOR (Prof. David R., Research Supervisor)",
        details: "Invite sent Oct 05. Link unaccessed for 14 days.",
        actionButtons: [
          { label: "Send Reminder Email", actionType: "secondary" },
        ],
        category: "Document Audits",
      },
      {
        id: "gt-4",
        type: "upcoming",
        title: "Priority Departmental Fellowship & GRA Filing",
        details:
          "Submission before Dec 15 guarantees consideration for full tuition remission + $2,400/mo stipend.",
        rightBadge: { text: "Dec 15, 2024", subtext: "Main Application Portal" },
        category: "Priority / Fellowships",
      },
    ],
    footerStats: {
      leftItems: [
        "Portal: Georgia Tech Slate",
        "App Fee: $105 (Fee waiver pending check)",
      ],
      actionLink: {
        text: "Check Slate Status",
        url: "https://grad.gatech.edu/apply",
      },
    },
  },
  {
    id: "tum",
    name: "Technical University of Munich (TUM)",
    shortName: "TUM",
    logoInitial: "TUM",
    logoBg: "bg-[#0066CC]",
    logoColor: "text-white",
    tier: "Dream Tier",
    subTags: ["DAAD Stipend & €0 Tuition Public University"],
    location: "Munich, Bavaria, Germany",
    program: "M.Sc. Informatics (English Track)",
    urgencyBadge: {
      text: "52 Days Left for Uni-Assist VPD",
      subtext: "Main TUMonline Closes: May 31, 2025",
      color: "rose",
    },
    alertNotice: {
      title: "Special German Multi-Agency Requirement:",
      text: "International applicants must first obtain the Vorprüfungsdokumentation (VPD) certificate from Uni-Assist Berlin before the TUMonline portal will accept bachelor degree credits. VPD processing takes 4 to 6 weeks.",
    },
    milestones: [
      {
        id: "tum-1",
        type: "action-required",
        title: "Uni-Assist VPD Application & Certified Notarization",
        statusBadge: { text: "Under Review", color: "green" },
        details:
          "Fee €75 paid. Indian grading formula conversion requested. Expected certificate date: Nov 28, 2024.",
        rightBadge: { text: "Recommended: Dec 01", subtext: "Uni-Assist ID: 2024-DE-8184" },
        category: "University Portals",
      },
      {
        id: "tum-2",
        type: "in-progress",
        title: "DAAD Master Studies Scholarship Dossier Filing",
        statusBadge: { text: "Draft 65% Completed", color: "blue" },
        details:
          "Includes €934/month living stipend + comprehensive German health insurance allowance.",
        rightBadge: { text: "Dec 01, 2024", subtext: "23:59 CET (Dec 02, 04:29 IST)" },
        category: "Priority / Fellowships",
      },
      {
        id: "tum-3",
        type: "upcoming",
        title: "TUMonline Direct Application Submission",
        details:
          "Submit curricular analysis with 120 ECTS equivalency matrix once VPD is issued.",
        rightBadge: { text: "Window: Jan 01 - May 31, 2025" },
        category: "University Portals",
      },
    ],
    footerStats: {
      leftItems: [
        "Tuition: €0 (Semester Ticket ~ €85)",
        "APS Certificate: Not required for Fall 2025 batch",
      ],
      actionLink: {
        text: "Open Uni-Assist Portal",
        url: "https://www.uni-assist.de",
      },
    },
  },
  {
    id: "umich",
    name: "University of Michigan — Ann Arbor",
    shortName: "U-Michigan",
    logoInitial: "UM",
    logoBg: "bg-[#00274C]",
    logoColor: "text-[#FFCB05]",
    tier: "Target Tier",
    subTags: ["UMSI Merit Fellowship Priority"],
    location: "Ann Arbor, MI, USA",
    program: "Master of Science in Information (MSI)",
    urgencyBadge: {
      text: "79 Days Left (Jan 15, 23:59 EST)",
      color: "slate",
    },
    milestones: [
      {
        id: "um-1",
        type: "upcoming",
        title: "UMSI Merit Scholarship Round 1 Filing",
        details: "Requires supplemental 500-word diversity statement.",
        rightBadge: { text: "Jan 15, 2025" },
        category: "Priority / Fellowships",
      },
      {
        id: "um-2",
        type: "complete",
        title: "IELTS 7.5 Academic Electronic Score Push",
        details: "TRF verified and listed through EIP portal.",
        rightBadge: { text: "Verified", color: "text-emerald-600" },
        category: "Document Audits",
      },
    ],
    footerStats: {
      leftItems: [
        "WES Evaluation: Not required (Official Indian transcript accepted directly)",
      ],
      actionLink: {
        text: "View Requirements",
        url: "https://si.umich.edu",
      },
    },
  },
];
