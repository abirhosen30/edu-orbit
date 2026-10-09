export interface UniversityMatch {
  id: string;
  name: string;
  shortName: string;
  logoInitial: string;
  logoBg: string;
  logoColor: string;
  band: "Dream" | "Target" | "Safe";
  qsRank: number;
  location: string;
  country: "USA" | "Germany" | "UK" | "Canada";
  program: string;
  eligibilityStatus: "Eligible" | "Partially Eligible" | "Not Eligible";
  matchPercentage: number;
  funding: {
    title: string;
    icon: "assistantship" | "tuition-free" | "fellowship";
    headline: string;
    headlineColor?: string;
    details: string;
  };
  actionRequired?: {
    title: string;
    description: string;
  };
  ruleChecks: {
    label: string;
    status: "pass" | "pending" | "optional";
  }[];
  verifiedText: string;
  fundingType: "full-ride" | "tuition-waiver" | "daad";
}

export interface MetricCardData {
  profileHealth: {
    score: number;
    badge: string;
    recommendation: string;
  };
  matchedFunding: {
    amount: string;
    inrEquivalent: string;
    breakdown: {
      label: string;
      value: string;
      color: string;
    }[];
  };
  criticalDeadlines: {
    items: {
      id: string;
      title: string;
      daysRemaining: number;
      action: string;
      colorTheme: "rose" | "slate";
    }[];
    totalMilestones: number;
  };
  applicationPipeline: {
    drafting: number;
    submitted: number;
    interview: number;
    nextInterview: {
      university: string;
      date: string;
    };
  };
}

export interface VerificationAlert {
  id: string;
  title: string;
  tag: string;
  tagColor: "blue" | "green";
  time: string;
  description: string;
}

export interface ReadinessItem {
  id: string;
  title: string;
  status: "Ready" | "Pending";
  description: string;
}

export interface ExchangeRateItem {
  currency: string;
  rateInr: string;
}

export const initialMetricData: MetricCardData = {
  profileHealth: {
    score: 92,
    badge: "Strong Profile",
    recommendation: "Add 1 quantitative LOR to unlock 3 more full-ride scholarships.",
  },
  matchedFunding: {
    amount: "$148,000",
    inrEquivalent: "≈ ₹1.24 Cr / 2-Semester Value",
    breakdown: [
      { label: "2 Fully Funded Programs", value: "100%", color: "bg-emerald-500" },
      { label: "4 Partial Waivers (50%+)", value: "50-75%", color: "bg-blue-500" },
      { label: "2 Research Assistantships", value: "Stipend", color: "bg-amber-500" },
    ],
  },
  criticalDeadlines: {
    items: [
      {
        id: "stanford",
        title: "Stanford Knight-Hennessy",
        daysRemaining: 14,
        action: "Final Essay & Video Statement",
        colorTheme: "rose",
      },
      {
        id: "tum",
        title: "TUM Informatics",
        daysRemaining: 32,
        action: "VPD Uni-Assist Verification",
        colorTheme: "slate",
      },
    ],
    totalMilestones: 8,
  },
  applicationPipeline: {
    drafting: 4,
    submitted: 2,
    interview: 1,
    nextInterview: {
      university: "Gatech Admissions",
      date: "Nov 28",
    },
  },
};

export const sampleMatchedUniversities: UniversityMatch[] = [
  {
    id: "gatech",
    name: "Georgia Institute of Technology",
    shortName: "Georgia Tech",
    logoInitial: "GT",
    logoBg: "bg-sky-50",
    logoColor: "text-blue-700",
    band: "Target",
    qsRank: 33,
    location: "Atlanta, USA",
    country: "USA",
    program: "M.S. in Computer Science • Computing Systems Track",
    eligibilityStatus: "Eligible",
    matchPercentage: 84,
    funding: {
      title: "Graduate Research Assistantship (GRA)",
      icon: "assistantship",
      headline: "100% Tuition Waiver + $2,400/mo",
      headlineColor: "text-emerald-700",
      details:
        "Includes full out-of-state tuition coverage, comprehensive health insurance subsidy, and bi-weekly research stipend in exchange for 20 hrs/week lab commitment.",
    },
    ruleChecks: [
      { label: "GPA 3.72 > 3.3 (Pass)", status: "pass" },
      { label: "GRE Quant 168 > 162 (Pass)", status: "pass" },
      { label: "IELTS 7.5 > 7.0 (Pass)", status: "pass" },
    ],
    verifiedText: "Verified 3 days ago from Gatech.edu official admissions portal",
    fundingType: "full-ride",
  },
  {
    id: "tum",
    name: "Technical University of Munich (TUM)",
    shortName: "TUM",
    logoInitial: "TUM",
    logoBg: "bg-sky-50",
    logoColor: "text-blue-700",
    band: "Dream",
    qsRank: 28,
    location: "Munich, Germany",
    country: "Germany",
    program: "M.Sc. Informatics (Computer Science)",
    eligibilityStatus: "Eligible",
    matchPercentage: 59,
    funding: {
      title: "Tuition-Free Public Education + DAAD Scholarship Match",
      icon: "tuition-free",
      headline: "€0 Tuition + €934/mo DAAD Eligible",
      headlineColor: "text-emerald-700",
      details:
        "Nominal semester contribution of €85 only. Student profile satisfies all DAAD Study Scholarship for Graduates criteria for monthly living allowance.",
    },
    ruleChecks: [
      { label: "Curricular Fit 84% (Pass)", status: "pass" },
      { label: "ECTS Equiv. > 120 (Pass)", status: "pass" },
      { label: "English C1 CEFR (Pass)", status: "pass" },
    ],
    verifiedText: "Verified 1 week ago from TUM International Department",
    fundingType: "tuition-waiver",
  },
  {
    id: "umich",
    name: "University of Michigan",
    shortName: "U-Michigan",
    logoInitial: "UM",
    logoBg: "bg-sky-50",
    logoColor: "text-blue-700",
    band: "Target",
    qsRank: 44,
    location: "Ann Arbor, USA",
    country: "USA",
    program: "Master of Science in Information (MSI)",
    eligibilityStatus: "Partially Eligible",
    matchPercentage: 66,
    funding: {
      title: "UMSI Merit Fellowship Award",
      icon: "fellowship",
      headline: "$20,000 / Year Award",
      headlineColor: "text-slate-900",
      details:
        "Direct department endowment scholarship applied automatically upon early admission deadline compliance.",
    },
    actionRequired: {
      title: "Action Needed for Eligibility:",
      description:
        "Requires 1 additional academic LOR focused on quantitative research to qualify for the full merit fellowship committee review.",
    },
    ruleChecks: [
      { label: "GPA 3.72 > 3.0 (Pass)", status: "pass" },
      { label: "GRE Waived (Optional)", status: "optional" },
      { label: "LOR Count: 2/3 (Pending)", status: "pending" },
    ],
    verifiedText: "Verified 5 days ago from UMSI Admissions",
    fundingType: "full-ride",
  },
];

export const sampleVerificationAlerts: VerificationAlert[] = [
  {
    id: "alert-1",
    title: "Fall 2026 Cycle Update",
    tag: "Just Now",
    tagColor: "blue",
    time: "Just Now",
    description:
      "US News & admissions policies updated. 3 of your shortlisted US universities now accept GRE At-Home score reports without addendum.",
  },
  {
    id: "alert-2",
    title: "DAAD Stipend Increment",
    tag: "Yesterday",
    tagColor: "green",
    time: "Yesterday",
    description:
      "German federal monthly stipend raised to €934/month for master candidates starting Winter 2026.",
  },
];

export const sampleReadinessChecklist: ReadinessItem[] = [
  {
    id: "sop",
    title: "SOP Statement Draft",
    status: "Ready",
    description: "Reviewed & marked complete by Mentor Sarah K.",
  },
  {
    id: "transcripts",
    title: "Transcripts Evaluation",
    status: "Ready",
    description: "WES Credential evaluation official report verified.",
  },
  {
    id: "financial",
    title: "Financial Affidavit",
    status: "Pending",
    description: "Awaiting bank solvency letter verification for I-20.",
  },
  {
    id: "lor",
    title: "3rd Academic LOR",
    status: "Pending",
    description: "Awaiting Prof. David's research endorsement.",
  },
];

export const sampleExchangeRates: ExchangeRateItem[] = [
  { currency: "1 USD", rateInr: "₹84.78 INR" },
  { currency: "1 EUR", rateInr: "₹91.40 INR" },
  { currency: "1 CAD", rateInr: "₹61.20 INR" },
];
