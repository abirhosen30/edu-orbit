export interface University {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  officialWebsite: string;
  admissionsUrl: string;
  country: string;
  city: string;
  countryFlag: string;
  qsRank: number;
  acceptanceRate: string;
  averageTuition: string;
  type: string;
  logoInitial: string;
  logoBg: string;
  logoTextColor?: string;
  flagshipScholarship: {
    name: string;
    coverage: string;
    type: "Fully Funded" | "Partial Funding" | "Tuition Waiver";
    deadline: string;
    description: string;
  };
  popularPrograms: string[];
  description: string;
  badge?: string;
  features: string[];
}

export const universitiesData: University[] = [
  {
    id: "stanford",
    name: "Stanford University",
    shortName: "Stanford",
    slug: "stanford-university",
    officialWebsite: "https://www.stanford.edu",
    admissionsUrl: "https://gradadmissions.stanford.edu",
    country: "United States",
    city: "Palo Alto, California",
    countryFlag: "🇺🇸",
    qsRank: 3,
    acceptanceRate: "3.9%",
    averageTuition: "$58,500 / yr (Fully Covered via Fellowship)",
    type: "Private Research University",
    logoInitial: "SU",
    logoBg: "bg-red-800",
    logoTextColor: "text-white",
    badge: "QS World #3 · Silicon Valley Hub",
    flagshipScholarship: {
      name: "Knight-Hennessy Scholars Program",
      coverage: "Full Tuition + $45,000/yr Living Stipend",
      type: "Fully Funded",
      deadline: "Nov 15, 2026",
      description: "Full endowment covering tuition, living expenses, academic travel, and multidisciplinary global leadership coaching."
    },
    popularPrograms: ["Computer Science", "Artificial Intelligence", "Electrical Engineering", "MBA", "Bioengineering"],
    description: "Located in the heart of Silicon Valley, Stanford is one of the world's leading research and teaching institutions, famed for entrepreneurial spirit and cutting-edge research.",
    features: ["100% Demonstrated Need Met", "Top AI & Tech Labs", "Vibrant Startup Ecosystem"]
  },
  {
    id: "harvard",
    name: "Harvard University",
    shortName: "Harvard",
    slug: "harvard-university",
    officialWebsite: "https://www.harvard.edu",
    admissionsUrl: "https://www.gsas.harvard.edu",
    country: "United States",
    city: "Cambridge, Massachusetts",
    countryFlag: "🇺🇸",
    qsRank: 4,
    acceptanceRate: "3.4%",
    averageTuition: "$54,269 / yr (Need-blind aid available)",
    type: "Private Ivy League University",
    logoInitial: "HU",
    logoBg: "bg-[#A51C30]",
    logoTextColor: "text-white",
    badge: "Ivy League · Oldest US University",
    flagshipScholarship: {
      name: "Harvard Presidential Fellowship",
      coverage: "Full Tuition + Health Fee + $43,000 Stipend",
      type: "Fully Funded",
      deadline: "Dec 15, 2026",
      description: "Full doctoral and master's fellowship for outstanding international researchers across sciences and humanities."
    },
    popularPrograms: ["Data Science", "Public Policy", "Economics", "Biomedical Sciences", "Law"],
    description: "Founded in 1636, Harvard University is the oldest institution of higher learning in the United States and globally synonymous with academic excellence.",
    features: ["Largest Academic Endowment ($50B+)", "100+ Research Centers", "Global Alumni Network"]
  },
  {
    id: "oxford",
    name: "University of Oxford",
    shortName: "Oxford",
    slug: "university-of-oxford",
    officialWebsite: "https://www.ox.ac.uk",
    admissionsUrl: "https://www.ox.ac.uk/admissions/graduate",
    country: "United Kingdom",
    city: "Oxford, Oxfordshire",
    countryFlag: "🇬🇧",
    qsRank: 3,
    acceptanceRate: "13.7%",
    averageTuition: "£33,050 - £48,620 / yr",
    type: "Collegiate Public Research University",
    logoInitial: "OX",
    logoBg: "bg-[#002147]",
    logoTextColor: "text-white",
    badge: "Oldest English University",
    flagshipScholarship: {
      name: "Clarendon Fund Scholarship",
      coverage: "Full Course Fees + £19,237/yr Living Grant",
      type: "Fully Funded",
      deadline: "Jan 10, 2027",
      description: "Over 140 full scholarships awarded annually to outstanding graduate scholars from all over the world based on academic merit."
    },
    popularPrograms: ["Philosophy, Politics & Economics", "Machine Learning", "Medicine", "Modern History", "Law"],
    description: "Oxford is a world-class collegiate university with over 900 years of history, pioneering tutorials and groundbreaking multidisciplinary research.",
    features: ["Tutorial Teaching System", "Bodleian Library Collection", "Historic 38 Colleges"]
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    shortName: "Cambridge",
    slug: "university-of-cambridge",
    officialWebsite: "https://www.cam.ac.uk",
    admissionsUrl: "https://www.postgraduate.study.cam.ac.uk",
    country: "United Kingdom",
    city: "Cambridge, Cambridgeshire",
    countryFlag: "🇬🇧",
    qsRank: 2,
    acceptanceRate: "15.7%",
    averageTuition: "£35,000 - £50,000 / yr",
    type: "Collegiate Public Research University",
    logoInitial: "CAM",
    logoBg: "bg-[#A3C1AD]",
    logoTextColor: "text-gray-900",
    badge: "QS World #2 · 121 Nobel Laureates",
    flagshipScholarship: {
      name: "Gates Cambridge Scholarship",
      coverage: "Full Cost of Study (~£45,000/yr)",
      type: "Fully Funded",
      deadline: "Dec 1, 2026",
      description: "Established by the Bill and Melinda Gates Foundation to build a global network of future leaders dedicated to improving the lives of others."
    },
    popularPrograms: ["Advanced Computer Science", "Engineering", "Mathematics", "Natural Sciences", "Biotechnology"],
    description: "Consistently ranked among the top universities globally, Cambridge is famous for scientific breakthroughs from gravity to the discovery of DNA.",
    features: ["Silicon Fen Tech Cluster", "Collegiate Life", "World-Leading STEM Labs"]
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology (MIT)",
    shortName: "MIT",
    slug: "massachusetts-institute-of-technology",
    officialWebsite: "https://www.mit.edu",
    admissionsUrl: "https://gradadmissions.mit.edu",
    country: "United States",
    city: "Cambridge, Massachusetts",
    countryFlag: "🇺🇸",
    qsRank: 1,
    acceptanceRate: "4.1%",
    averageTuition: "$61,990 / yr (All PhD/Research MS funded)",
    type: "Private Research University",
    logoInitial: "MIT",
    logoBg: "bg-[#8A1B29]",
    logoTextColor: "text-white",
    badge: "QS World #1 Globally",
    flagshipScholarship: {
      name: "MIT Presidential Fellowship",
      coverage: "100% Tuition Waiver + $44,500 Annual Stipend",
      type: "Fully Funded",
      deadline: "Dec 15, 2026",
      description: "Recruits the most outstanding graduate students from worldwide to pursue research degrees across engineering and science schools."
    },
    popularPrograms: ["EECS (Electrical & Computer Science)", "Artificial Intelligence", "Robotics", "Physics", "Mechanical Engineering"],
    description: "MIT leads the world in science, engineering, and technology innovation. Its faculty and alumni have pioneered countless modern technologies.",
    features: ["Ranked #1 Worldwide by QS", "Media Lab & CSAIL", "Hands-on Mens et Manus Philosophy"]
  },
  {
    id: "tum",
    name: "Technical University of Munich (TUM)",
    shortName: "TUM",
    slug: "technical-university-of-munich",
    officialWebsite: "https://www.tum.de",
    admissionsUrl: "https://www.tum.de/en/studies/application",
    country: "Germany",
    city: "Munich, Bavaria",
    countryFlag: "🇩🇪",
    qsRank: 28,
    acceptanceRate: "8%",
    averageTuition: "€0 Tuition (Nominal administrative fee: €150/semester)",
    type: "Public Technical University",
    logoInitial: "TUM",
    logoBg: "bg-[#0065BD]",
    logoTextColor: "text-white",
    badge: "Germany #1 · Free Tuition Model",
    flagshipScholarship: {
      name: "DAAD & Deutschlandstipendium at TUM",
      coverage: "€934/mo Living Grant + Health Coverage",
      type: "Fully Funded",
      deadline: "Nov 30, 2026",
      description: "Government and industrial scholarship programs providing international candidates with complete living cost stipends and research support."
    },
    popularPrograms: ["Informatics & Software Engineering", "Automotive & Mobility", "Robotics", "Data Science", "Renewable Energy"],
    description: "TUM is Germany's top university of excellence, collaborating closely with BMW, Siemens, and high-tech industry leaders across Europe.",
    features: ["Zero Tuition Fees", "Close Ties to German Tech Giants", "English-Taught Master's Programs"]
  },
  {
    id: "eth-zurich",
    name: "ETH Zurich (Swiss Federal Institute of Technology)",
    shortName: "ETH Zurich",
    slug: "eth-zurich",
    officialWebsite: "https://ethz.ch",
    admissionsUrl: "https://ethz.ch/en/studies/master/application.html",
    country: "Switzerland",
    city: "Zurich",
    countryFlag: "🇨🇭",
    qsRank: 7,
    acceptanceRate: "27%",
    averageTuition: "CHF 730 / semester (~$850/sem)",
    type: "Public Research University",
    logoInitial: "ETH",
    logoBg: "bg-[#215A8B]",
    logoTextColor: "text-white",
    badge: "Continental Europe #1 · Albert Einstein Alma Mater",
    flagshipScholarship: {
      name: "Excellence Scholarship & Opportunity Programme (ESOP)",
      coverage: "Full Study Fee Waiver + CHF 24,000/yr Living Allowance",
      type: "Fully Funded",
      deadline: "Dec 15, 2026",
      description: "ETH Zurich supports incoming master's students with outstanding academic records with complete cost-of-living funding."
    },
    popularPrograms: ["Quantum Engineering", "Computer Science", "Mechanical Engineering", "Architecture", "Biotechnology"],
    description: "Ranked as Continental Europe's highest-rated university, ETH Zurich is world-renowned for cutting-edge engineering and natural sciences.",
    features: ["22 Nobel Prize Winners", "Ultra-low Swiss Public Tuition", "Global Top 10 Engineering Rank"]
  },
  {
    id: "nus",
    name: "National University of Singapore (NUS)",
    shortName: "NUS",
    slug: "national-university-of-singapore",
    officialWebsite: "https://www.nus.edu.sg",
    admissionsUrl: "https://nusgs.nus.edu.sg",
    country: "Singapore",
    city: "Singapore",
    countryFlag: "🇸🇬",
    qsRank: 8,
    acceptanceRate: "5.8%",
    averageTuition: "S$22,000 - S$38,000 / yr (Subsidized options)",
    type: "National Research University",
    logoInitial: "NUS",
    logoBg: "bg-[#EF7C00]",
    logoTextColor: "text-white",
    badge: "Asia #1 · Global Top 10",
    flagshipScholarship: {
      name: "NUS Research Scholarship & SINGA Award",
      coverage: "100% Tuition Fees + S$3,200/mo Stipend + S$1,000 Airfare",
      type: "Fully Funded",
      deadline: "Jan 31, 2027",
      description: "Premier Singapore government & university awards for top international talents pursuing research master's and PhD programs."
    },
    popularPrograms: ["Computer Science & AI", "Civil Engineering", "Business Analytics", "Public Health", "Supply Chain Management"],
    description: "Consistently recognized as Asia's top university, NUS offers a transformative Asian and global education experience with world-leading research hubs.",
    features: ["Ranked Asia #1", "Gateway to Southeast Asian Economies", "State-of-the-Art Research Facilities"]
  },
  {
    id: "utoronto",
    name: "University of Toronto",
    shortName: "U of T",
    slug: "university-of-toronto",
    officialWebsite: "https://www.utoronto.ca",
    admissionsUrl: "https://www.sgs.utoronto.ca/admissions",
    country: "Canada",
    city: "Toronto, Ontario",
    countryFlag: "🇨🇦",
    qsRank: 21,
    acceptanceRate: "43% (Grad: 12%)",
    averageTuition: "CAD $30,000 - $60,000 / yr",
    type: "Public Research University",
    logoInitial: "UofT",
    logoBg: "bg-[#002A5C]",
    logoTextColor: "text-white",
    badge: "Canada #1 · AI Birthplace",
    flagshipScholarship: {
      name: "Lester B. Pearson & Connaught International Fellowship",
      coverage: "Full Tuition + Books + Incidental Fees + 4-Yr Residence",
      type: "Fully Funded",
      deadline: "Jan 15, 2027",
      description: "Recognizes international students who demonstrate exceptional academic achievement and creativity with full cost funding."
    },
    popularPrograms: ["Deep Learning & Computer Science", "Medicine", "Mechanical Engineering", "Biomedical Communications", "Finance"],
    description: "Canada's top research powerhouse, celebrated as the birthplace of modern Deep Learning and insulin discovery, situated in diverse Toronto.",
    features: ["Vector Institute for AI", "Favorable Canadian Post-Grad Work Visas", "World-Ranked Research Faculty"]
  },
  {
    id: "unimelb",
    name: "University of Melbourne",
    shortName: "UniMelb",
    slug: "university-of-melbourne",
    officialWebsite: "https://www.unimelb.edu.au",
    admissionsUrl: "https://study.unimelb.edu.au/how-to-apply",
    country: "Australia",
    city: "Melbourne, Victoria",
    countryFlag: "🇦🇺",
    qsRank: 13,
    acceptanceRate: "18%",
    averageTuition: "AUD $44,000 - $54,000 / yr",
    type: "Public Research University",
    logoInitial: "UoM",
    logoBg: "bg-[#094183]",
    logoTextColor: "text-white",
    badge: "Australia #1 · Group of Eight",
    flagshipScholarship: {
      name: "Melbourne Graduate Research Scholarship",
      coverage: "100% Full Fee Offset + AUD $37,000/yr Living Allowance",
      type: "Fully Funded",
      deadline: "Oct 31, 2026",
      description: "Awards 600 scholarships annually covering total tuition fees, living allowances, relocation grants, and overseas health cover."
    },
    popularPrograms: ["Information Technology", "Biomedical Science", "Law", "Environmental Engineering", "Commerce"],
    description: "Australia's top-ranked higher education institution, situated in one of the world's most liveable cities, leading in global scientific discovery.",
    features: ["Ranked Australia #1", "Post-Study Work Rights in Australia", "Comprehensive Health & Housing Cover"]
  },
  {
    id: "gatech",
    name: "Georgia Institute of Technology",
    shortName: "Georgia Tech",
    slug: "georgia-institute-of-technology",
    officialWebsite: "https://www.gatech.edu",
    admissionsUrl: "https://grad.gatech.edu/apply",
    country: "United States",
    city: "Atlanta, Georgia",
    countryFlag: "🇺🇸",
    qsRank: 33,
    acceptanceRate: "16%",
    averageTuition: "$31,370 / yr (Fully Covered via GRA/GTA)",
    type: "Public Research University",
    logoInitial: "GT",
    logoBg: "bg-[#003057]",
    logoTextColor: "text-white",
    badge: "QS World #33 · Top 5 Engineering",
    flagshipScholarship: {
      name: "Graduate Research Assistantship (GRA)",
      coverage: "100% Tuition Waiver + $2,400/mo Living Stipend",
      type: "Fully Funded",
      deadline: "Jan 15, 2027",
      description: "Includes full out-of-state tuition coverage, comprehensive health insurance subsidy, and bi-weekly research stipend."
    },
    popularPrograms: ["Computer Science", "Computing Systems", "Machine Learning", "Robotics", "Aerospace Engineering"],
    description: "Georgia Tech is a top-tier public research university in Atlanta, world-renowned for computing, technology leadership, and engineering excellence.",
    features: ["Top 5 Ranked CS Program", "100% Tuition Waiver for GRA/GTA", "Atlanta Tech Hub Connectivity"]
  },
  {
    id: "umich",
    name: "University of Michigan",
    shortName: "U-Michigan",
    slug: "university-of-michigan",
    officialWebsite: "https://umich.edu",
    admissionsUrl: "https://rackham.umich.edu/admissions",
    country: "United States",
    city: "Ann Arbor, Michigan",
    countryFlag: "🇺🇸",
    qsRank: 44,
    acceptanceRate: "18%",
    averageTuition: "$53,200 / yr (Merit Aid Eligible)",
    type: "Public Research University",
    logoInitial: "UM",
    logoBg: "bg-[#00274C]",
    logoTextColor: "text-[#FFCB05]",
    badge: "QS World #44 · Top Public Ivy",
    flagshipScholarship: {
      name: "UMSI Merit Fellowship Award",
      coverage: "$20,000 / Year Award + Departmental Endowment",
      type: "Partial Funding",
      deadline: "Jan 15, 2027",
      description: "Direct department endowment scholarship applied automatically upon early admission deadline compliance."
    },
    popularPrograms: ["Master of Science in Information (MSI)", "Data Science", "Computer Science", "Human-Computer Interaction"],
    description: "The University of Michigan is a preeminent public research university recognized globally for academic rigor and research impact.",
    features: ["Top 5 Information School", "Massive Research Spending ($1.8B+)", "Extensive Global Alumni Base"]
  }
];

