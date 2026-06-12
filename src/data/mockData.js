// Highly robust, enterprise-grade mock datasets powering the ScanJD SaaS platform.

export const initialJobDescriptions = [
  {
    id: "JD-UX2026-001",
    title: "Senior Frontend Developer (React/TS)",
    company: "TCS",
    experienceRequired: "5-7 Years",
    matchingResumesCount: 42,
    matchAccuracy: 94,
    recruiterAssigned: "Vikram Mehta",
    status: "Active",
    uploadDate: "May 10, 2026",
    progress: 78,
    badge: "High Match Rate",
    skillsRequired: ["React", "TypeScript", "Tailwind CSS", "Redux", "Next.js"],
    totalApplicants: 128,
    hiringManager: "Sarah Connor",
    department: "Core Engineering",
  },
  {
    id: "JD-ML2026-002",
    title: "Staff Machine Learning Engineer",
    company: "Wipro",
    experienceRequired: "8+ Years",
    matchingResumesCount: 18,
    matchAccuracy: 88,
    recruiterAssigned: "Priya Patel",
    status: "Active",
    uploadDate: "May 08, 2026",
    progress: 45,
    badge: "Urgent Need",
    skillsRequired: ["Python", "PyTorch", "LLMs", "Transformers", "CUDA"],
    totalApplicants: 64,
    hiringManager: "Ilya Sutskever",
    department: "Applied AI",
  },
  {
    id: "JD-CL2026-003",
    title: "Lead Cloud Infrastructure Architect",
    company: "Infosys",
    experienceRequired: "10+ Years",
    matchingResumesCount: 29,
    matchAccuracy: 91,
    recruiterAssigned: "Vikram Mehta",
    status: "Active",
    uploadDate: "May 05, 2026",
    progress: 60,
    badge: "Standard",
    skillsRequired: ["AWS", "Terraform", "Kubernetes", "Go", "Docker"],
    totalApplicants: 92,
    hiringManager: "Werner Vogels",
    department: "Cloud Infra",
  },
  {
    id: "JD-DE2026-004",
    title: "Principal DevOps Engineer",
    company: "HCLTech",
    experienceRequired: "7+ Years",
    matchingResumesCount: 35,
    matchAccuracy: 89,
    recruiterAssigned: "Pooja Sharma",
    status: "Reviewing",
    uploadDate: "Apr 28, 2026",
    progress: 90,
    badge: "Shortlist Ready",
    skillsRequired: ["CI/CD", "GitHub Actions", "Linux", "Ansible", "Python"],
    totalApplicants: 110,
    hiringManager: "Mitchell Hashimoto",
    department: "Platform Eng",
  },
  {
    id: "JD-PD2026-005",
    title: "VP of Product Management",
    company: "Tech Mahindra",
    experienceRequired: "12+ Years",
    matchingResumesCount: 12,
    matchAccuracy: 85,
    recruiterAssigned: "Priya Patel",
    status: "Interviewing",
    uploadDate: "Apr 20, 2026",
    progress: 30,
    badge: "Executive Search",
    skillsRequired: ["SaaS Strategy", "B2B", "GTM", "Roadmap Execution", "Team Leadership"],
    totalApplicants: 45,
    hiringManager: "Parker Conrad",
    department: "Product",
  },
  {
    id: "JD-FS2026-006",
    title: "Senior Full Stack Engineer",
    company: "LTIMindtree",
    experienceRequired: "4-6 Years",
    matchingResumesCount: 55,
    matchAccuracy: 96,
    recruiterAssigned: "Pooja Sharma",
    status: "Closed",
    uploadDate: "Apr 15, 2026",
    progress: 100,
    badge: "Hired",
    skillsRequired: ["React", "Node.js", "GraphQL", "PostgreSQL", "MobX"],
    totalApplicants: 210,
    hiringManager: "Karri Saarinen",
    department: "Product",
  }
];

export const extendedJDs = [
  ...initialJobDescriptions,
  {
    id: "JD-SE2026-004",
    title: "Principal Cloud Security Architect",
    company: "Cognizant India",
    experienceRequired: "8-12 Years",
    matchingResumesCount: 142,
    matchAccuracy: 96,
    recruiterAssigned: "Priya Patel",
    status: "Active",
    uploadDate: "2 hours ago",
    skillsRequired: ["AWS IAM", "Kubernetes Sec", "Zero Trust", "Terraform", "Go"],
    badge: "Urgent Priority"
  },
  {
    id: "JD-ML2026-005",
    title: "Lead AI/ML Research Scientist",
    company: "Tata Elxsi",
    experienceRequired: "5-8 Years",
    matchingResumesCount: 88,
    matchAccuracy: 94,
    recruiterAssigned: "Vikram Mehta",
    status: "Active",
    uploadDate: "Yesterday",
    skillsRequired: ["PyTorch", "LLM Fine-tuning", "Transformers", "Python", "CUDA"],
    badge: "High Fit"
  },
  {
    id: "JD-BE2026-006",
    title: "Staff Backend Systems Developer",
    company: "Reliance Jio",
    experienceRequired: "7+ Years",
    matchingResumesCount: 210,
    matchAccuracy: 89,
    recruiterAssigned: "Kiran Devi",
    status: "Reviewing",
    uploadDate: "3 days ago",
    skillsRequired: ["Rust", "Distributed Systems", "gRPC", "Kafka", "PostgreSQL"],
    badge: "Standard"
  },
  {
    id: "JD-OP2026-007",
    title: "VP of Engineering Operations",
    company: "Adani Enterprises",
    experienceRequired: "12+ Years",
    matchingResumesCount: 34,
    matchAccuracy: 91,
    recruiterAssigned: "Rahul Kumar",
    status: "Interviewing",
    uploadDate: "5 days ago",
    skillsRequired: ["Engineering Strategy", "Agile Scaling", "Budgeting", "Team Org"],
    badge: "Executive"
  },
  {
    id: "JD-MO2026-008",
    title: "Senior React Native Architect",
    company: "Airtel Digital",
    experienceRequired: "5-7 Years",
    matchingResumesCount: 165,
    matchAccuracy: 85,
    recruiterAssigned: "Priya Patel",
    status: "Active",
    uploadDate: "1 week ago",
    skillsRequired: ["React Native", "Redux Toolkit", "iOS/Android Native Modules", "Jest"],
    badge: "Standard"
  },
  {
    id: "JD-DE2026-009",
    title: "DevOps Infrastructure Manager",
    company: "Paytm",
    experienceRequired: "6-10 Years",
    matchingResumesCount: 95,
    matchAccuracy: 93,
    recruiterAssigned: "Vikram Mehta",
    status: "Active",
    uploadDate: "1 week ago",
    skillsRequired: ["Docker", "GitHub Actions", "ArgoCD", "AWS EKS", "Python"],
    badge: "High Fit"
  },
  {
    id: "JD-DA2026-010",
    title: "Senior Data Analytics Consultant",
    company: "Ola Cabs",
    experienceRequired: "4-6 Years",
    matchingResumesCount: 120,
    matchAccuracy: 88,
    recruiterAssigned: "Kiran Devi",
    status: "Reviewing",
    uploadDate: "2 weeks ago",
    skillsRequired: ["SQL", "Tableau", "Snowflake", "dbt", "ETL Pipelines"],
    badge: "Standard"
  },
  {
    id: "JD-UX2026-011",
    title: "Director of Product Design (UI/UX)",
    company: "Wipro Digital",
    experienceRequired: "8+ Years",
    matchingResumesCount: 75,
    matchAccuracy: 92,
    recruiterAssigned: "Rahul Kumar",
    status: "Interviewing",
    uploadDate: "2 weeks ago",
    skillsRequired: ["Figma Systems", "Design Strategy", "User Prototyping", "SaaS Aesthetics"],
    badge: "Executive"
  },
  {
    id: "JD-QA2026-012",
    title: "Lead QA Automation Engineer",
    company: "TCS Quality Labs",
    experienceRequired: "5-8 Years",
    matchingResumesCount: 110,
    matchAccuracy: 87,
    recruiterAssigned: "Priya Patel",
    status: "Closed",
    uploadDate: "3 weeks ago",
    skillsRequired: ["Cypress", "Selenium", "CI/CD Gates", "TypeScript", "API Testing"],
    badge: "Archived"
  },
  {
    id: "JD-CR2026-013",
    title: "Core Protocol Cryptographer",
    company: "Polygon Labs",
    experienceRequired: "6+ Years",
    matchingResumesCount: 18,
    matchAccuracy: 95,
    recruiterAssigned: "Vikram Mehta",
    status: "Active",
    uploadDate: "3 weeks ago",
    skillsRequired: ["Zero Knowledge Proofs", "Rust", "Cryptography", "Consensus Algos"],
    badge: "Urgent Priority"
  },
  {
    id: "JD-SA2026-014",
    title: "Enterprise Solutions Architect",
    company: "Infosys BPM",
    experienceRequired: "10+ Years",
    matchingResumesCount: 52,
    matchAccuracy: 90,
    recruiterAssigned: "Rahul Kumar",
    status: "Active",
    uploadDate: "1 month ago",
    skillsRequired: ["Cloud Migrations", "B2B Delivery", "System Topologies", "Client Facing"],
    badge: "High Fit"
  },
  {
    id: "JD-W32026-015",
    title: "Fullstack Web3 Developer",
    company: "Zomato",
    experienceRequired: "3-5 Years",
    matchingResumesCount: 180,
    matchAccuracy: 82,
    recruiterAssigned: "Kiran Devi",
    status: "Reviewing",
    uploadDate: "1 month ago",
    skillsRequired: ["Solidity", "Ethers.js", "Next.js", "Hardhat", "Node.js"],
    badge: "Standard"
  }
];

export const mockCandidates = [
  {
    id: "CAND-001",
    jdId: "JD-UX2026-001",
    name: "Shreya Joshi",
    initials: "SJ",
    email: "shreya.j@example.com",
    match: 98,
    skillsMatch: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    missingSkills: ["Redux"],
    experience: "6 Years",
    resumeScore: "9.6/10",
    status: "Shortlisted",
    phone: "+1 (555) 234-5678",
    currentRole: "Lead Frontend Engineer at DevCorp",
    aiRecommendation: "Highly Recommended. Shreya demonstrates exemplary expertise in modern component frameworks and custom design systems. Her direct enterprise SaaS track record aligns perfectly with TCS's scaling expectations.",
    skillGapText: "Lacks advanced Redux middleware experience, but possesses proficient state management expertise using Recoil and Zustand.",
    interviewQuestions: [
      "How would you approach migrating a legacy React app to Server Components without disrupting live customer traffic?",
      "Can you walk us through a time you implemented custom hooks to optimize bundle size and client hydration speeds?"
    ],
    timeline: [
      { date: "May 11, 2026", action: "AI Engine auto-shortlisted based on 98% skill coherence." },
      { date: "May 10, 2026", action: "Resume uploaded via bulk parsing utility." }
    ]
  },
  {
    id: "CAND-002",
    jdId: "JD-UX2026-001",
    name: "Devendra Chaudhary",
    initials: "DC",
    email: "devendra.c@example.com",
    match: 92,
    skillsMatch: ["React", "TypeScript", "Redux"],
    missingSkills: ["Tailwind CSS", "Next.js"],
    experience: "5 Years",
    resumeScore: "8.9/10",
    status: "Screening",
    phone: "+1 (555) 876-5432",
    currentRole: "UI Engineer at TechStart",
    aiRecommendation: "Strong technical candidate. Highly competent in TS types and Redux architectures. Will require brief ramp-up time for Tailwind CSS utility-first guidelines.",
    skillGapText: "Missing direct production utilization of Next.js SSR implementations.",
    interviewQuestions: [
      "Describe how you handle state sync across browser tabs using vanilla custom WebSockets."
    ],
    timeline: [
      { date: "May 10, 2026", action: "Parsed by ScanJD Core Engine with baseline ATS format verification." }
    ]
  },
  {
    id: "CAND-003",
    jdId: "JD-UX2026-001",
    name: "Aditi Yadav",
    initials: "AY",
    email: "aditi.y@example.com",
    match: 88,
    skillsMatch: ["React", "Tailwind CSS", "Next.js"],
    missingSkills: ["TypeScript", "Redux"],
    experience: "4 Years",
    resumeScore: "8.2/10",
    status: "Rejected",
    phone: "+1 (555) 345-6789",
    currentRole: "Frontend Developer at Webify",
    aiRecommendation: "Creative designer-developer. Excellent client styling metrics but lacks pure TypeScript typing rigor necessary for multi-team library consumption.",
    skillGapText: "Missing explicit TS generic interface implementation histories.",
    interviewQuestions: [],
    timeline: [
      { date: "May 10, 2026", action: "Rejected due to mismatch in typed language requirements." }
    ]
  },
  {
    id: "CAND-004",
    jdId: "JD-ML2026-002",
    name: "Dr. Amit Mishra",
    initials: "AM",
    email: "amit.m@example.com",
    match: 95,
    skillsMatch: ["Python", "PyTorch", "LLMs", "Transformers"],
    missingSkills: ["CUDA"],
    experience: "9 Years",
    resumeScore: "9.5/10",
    status: "Interview Scheduled",
    phone: "+1 (555) 999-8888",
    currentRole: "Research Scientist at DeepNet",
    aiRecommendation: "Exceptional candidate with direct LLM fine-tuning publication history. Fits Wipro staff requirement profile instantly.",
    skillGapText: "Low-level CUDA optimization experience is optional but advantageous.",
    interviewQuestions: [
      "Explain your strategy for implementing Speculative Decoding to improve inference latency for 70B parameter models."
    ],
    timeline: [
      { date: "May 09, 2026", action: "Technical interview scheduled directly by applied teams." }
    ]
  },
  {
    id: "CAND-005",
    jdId: "JD-UX2026-001",
    name: "Lakshay Verma",
    initials: "LV",
    email: "lakshay.v@example.com",
    match: 94,
    skillsMatch: ["React", "TypeScript", "Redux", "Next.js"],
    missingSkills: ["Tailwind CSS"],
    experience: "7 Years",
    resumeScore: "9.4/10",
    status: "Shortlisted",
    phone: "+1 (555) 543-2109",
    currentRole: "Senior Frontend Lead at BlockInc",
    aiRecommendation: "Superb analytical skills. Perfect alignment for large-scale Next.js structures, with detailed monorepo and micro-frontend setup track record.",
    skillGapText: "Prefers vanilla styling or styled-components; requires light ramp-up for Tailwind utility chains.",
    interviewQuestions: ["Explain custom React reconciler operations in web contexts."],
    timeline: [{ date: "May 12, 2026", action: "Imported via developer portfolio scanner." }]
  },
  {
    id: "CAND-006",
    jdId: "JD-UX2026-001",
    name: "Esha Reddy",
    initials: "ER",
    email: "esha.r@example.com",
    match: 91,
    skillsMatch: ["React", "TypeScript", "Tailwind CSS"],
    missingSkills: ["Next.js", "Redux"],
    experience: "5 Years",
    resumeScore: "9.1/10",
    status: "Screening",
    phone: "+1 (555) 432-1098",
    currentRole: "Software Engineer II at Figma",
    aiRecommendation: "Exceptional visual designer and UI engineer. Excels at complex responsive UI layouts and vector graphic layouts.",
    skillGapText: "Lacks robust next-gen serverside hydration histories, but is highly proficient in client-heavy app bundles.",
    interviewQuestions: ["How do you optimize canvas and SVG re-renders under React state cycles?"],
    timeline: [{ date: "May 12, 2026", action: "Sourced through dynamic Figma community referral." }]
  },
  {
    id: "CAND-007",
    jdId: "JD-UX2026-001",
    name: "Arjun Patel",
    initials: "AP",
    email: "arjun.p@example.com",
    match: 93,
    skillsMatch: ["React", "TypeScript", "Redux", "Next.js"],
    missingSkills: ["Tailwind CSS"],
    experience: "6 Years",
    resumeScore: "9.3/10",
    status: "Shortlisted",
    phone: "+1 (555) 123-4567",
    currentRole: "Staff UI Engineer at CamelotTech",
    aiRecommendation: "Impressive system architect. Leads the development of custom component suites consumed by over 40 distinct developer squads.",
    skillGapText: "Limited direct usage of utility CSS. Strong advocate for CSS modules.",
    interviewQuestions: ["Design a framework-agnostic design token compilation system."],
    timeline: [{ date: "May 13, 2026", action: "Direct candidate application parsed." }]
  },
  {
    id: "CAND-008",
    jdId: "JD-UX2026-001",
    name: "Gaurav Das",
    initials: "GD",
    email: "gaurav.d@example.com",
    match: 86,
    skillsMatch: ["React", "TypeScript", "Tailwind CSS"],
    missingSkills: ["Next.js", "Redux"],
    experience: "5 Years",
    resumeScore: "8.6/10",
    status: "Screening",
    phone: "+1 (555) 890-1234",
    currentRole: "Frontend Engineer at LakeSide",
    aiRecommendation: "Solid product-driven developer. Outstanding product empathy and high UX iteration metrics.",
    skillGapText: "Ramp up required for heavy serverside streaming systems.",
    interviewQuestions: ["How do you measure and report Core Web Vitals in a live product environment?"],
    timeline: [{ date: "May 14, 2026", action: "Screened and assigned to TCS frontend mandate pipeline." }]
  },
  {
    id: "CAND-009",
    jdId: "JD-UX2026-001",
    name: "Lalit Choudhury",
    initials: "LC",
    email: "lalit.c@example.com",
    match: 89,
    skillsMatch: ["React", "Tailwind CSS", "Redux", "Next.js"],
    missingSkills: ["TypeScript"],
    experience: "5 Years",
    resumeScore: "8.9/10",
    status: "Shortlisted",
    phone: "+1 (555) 765-4321",
    currentRole: "UI Specialist at RoundTable",
    aiRecommendation: "Highly dynamic developer. Outstanding speed of feature execution and robust integration capabilities.",
    skillGapText: "Needs pure typed language safety integration; strongly recommended to run brief TypeScript drills.",
    interviewQuestions: ["Describe your process for debugging heavy re-renders in a complex redux-connected layout."],
    timeline: [{ date: "May 14, 2026", action: "Scored by automated portfolio parsing engine." }]
  },
  {
    id: "CAND-010",
    jdId: "JD-UX2026-001",
    name: "Gopal Oza",
    initials: "GO",
    email: "gopal.o@example.com",
    match: 80,
    skillsMatch: ["React", "Tailwind CSS"],
    missingSkills: ["TypeScript", "Redux", "Next.js"],
    experience: "4 Years",
    resumeScore: "8.0/10",
    status: "Rejected",
    phone: "+1 (555) 654-3210",
    currentRole: "Web Developer at GreenChapel",
    aiRecommendation: "Solid base developer but lacks multi-layered frameworks and typing standards needed for TCS core systems.",
    skillGapText: "Exhibits significant gaps in TypeScript type validation paradigms.",
    interviewQuestions: [],
    timeline: [{ date: "May 15, 2026", action: "Flagged by AI pre-screener due to core parameter mismatch." }]
  },
  {
    id: "CAND-011",
    jdId: "JD-UX2026-001",
    name: "Girish Pandey",
    initials: "GP",
    email: "girish.p@example.com",
    match: 95,
    skillsMatch: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
    missingSkills: [],
    experience: "7 Years",
    resumeScore: "9.5/10",
    status: "Shortlisted",
    phone: "+1 (555) 987-6543",
    currentRole: "Senior Frontend Architect at GrailTech",
    aiRecommendation: "Perfect technical coherence. Shreya-tier match with zero skills missing. Exceptional lead capability and full-stack capabilities.",
    skillGapText: "None. Direct fit on all technology pillars.",
    interviewQuestions: ["How do you coordinate design system updates across decentralized micro-frontends?"],
    timeline: [{ date: "May 15, 2026", action: "Matched flawlessly at 95% threshold." }]
  },
  {
    id: "CAND-012",
    jdId: "JD-UX2026-001",
    name: "Tarun Lal",
    initials: "TL",
    email: "tarun.l@example.com",
    match: 87,
    skillsMatch: ["React", "TypeScript", "Next.js"],
    missingSkills: ["Tailwind CSS", "Redux"],
    experience: "5 Years",
    resumeScore: "8.7/10",
    status: "Screening",
    phone: "+1 (555) 210-9876",
    currentRole: "UI Engineer at CornwallWeb",
    aiRecommendation: "Reliable, performance-oriented developer. Demonstrates high rigor in client state flows and Next.js static generation pipelines.",
    skillGapText: "Lacks Tailwind style efficiency; prefers traditional preprocessors.",
    interviewQuestions: ["When do you prefer static site generation vs incremental static regeneration?"],
    timeline: [{ date: "May 16, 2026", action: "Assigned to recruitment pool by Vikram Mehta." }]
  }
];

export const mockRecruiters = [
  {
    id: "REC-001",
    name: "Vikram Mehta",
    email: "vikram.m@scanjd.com",
    role: "Senior Tech Recruiter",
    activeJDs: 4,
    shortlistedTotal: 84,
    placementRate: "92%",
    efficiencyScore: 96,
    avatar: "VM",
    status: "Active",
    monthlyTrend: [4, 8, 12, 18, 22, 29]
  },
  {
    id: "REC-002",
    name: "Priya Patel",
    email: "priya.p@scanjd.com",
    role: "Executive Talent Partner",
    activeJDs: 3,
    shortlistedTotal: 32,
    placementRate: "88%",
    efficiencyScore: 91,
    avatar: "PP",
    status: "Active",
    monthlyTrend: [2, 5, 8, 14, 19, 24]
  },
  {
    id: "REC-003",
    name: "Pooja Sharma",
    email: "pooja.s@scanjd.com",
    role: "Technical Sourcing Specialist",
    activeJDs: 5,
    shortlistedTotal: 112,
    placementRate: "95%",
    efficiencyScore: 98,
    avatar: "PS",
    status: "Active",
    monthlyTrend: [10, 20, 35, 55, 80, 112]
  }
];

export const mockAnalytics = {
  Q1: {
    funnelData: [
      { stage: "Total Uploaded Resumes", count: 1800, percentage: 100, color: "bg-brand-blue" },
      { stage: "AI Screened & Validated", count: 1350, percentage: 75, color: "bg-brand-blue/80" },
      { stage: "Matched Candidates (>80%)", count: 450, percentage: 25, color: "bg-brand-blue/60" },
      { stage: "Shortlisted by Recruiters", count: 162, percentage: 9, color: "bg-brand-purple" },
      { stage: "Offers Extended", count: 31, percentage: 1.7, color: "bg-brand-red" }
    ],
    processingTimes: {
      avgParsing: "1.5 Seconds",
      aiMatchSpeed: "0.5 Seconds",
      timeSaved: "220 Hours"
    },
    monthlyScreening: [
      { month: "Jan", processed: 1200, matches: 300 },
      { month: "Feb", processed: 1450, matches: 380 },
      { month: "Mar", processed: 1800, matches: 450 }
    ],
    productivityData: [
      { dept: "Core Engineering", speed: "92% Velocity", parsed: "840 Resumes parsed", trend: "bg-brand-blue" },
      { dept: "Applied AI Research", speed: "88% Velocity", parsed: "210 Resumes parsed", trend: "bg-brand-purple" },
      { dept: "Cloud Infra Systems", speed: "90% Velocity", parsed: "180 Resumes parsed", trend: "bg-emerald-500" }
    ]
  },
  Q2: {
    funnelData: [
      { stage: "Total Uploaded Resumes", count: 650, percentage: 100, color: "bg-brand-blue" },
      { stage: "AI Screened & Validated", count: 490, percentage: 75, color: "bg-brand-blue/80" },
      { stage: "Matched Candidates (>80%)", count: 170, percentage: 26, color: "bg-brand-blue/60" },
      { stage: "Shortlisted by Recruiters", count: 66, percentage: 10, color: "bg-brand-purple" },
      { stage: "Offers Extended", count: 11, percentage: 1.7, color: "bg-brand-red" }
    ],
    processingTimes: {
      avgParsing: "1.0 Seconds",
      aiMatchSpeed: "0.3 Seconds",
      timeSaved: "120 Hours"
    },
    monthlyScreening: [
      { month: "Apr", processed: 2100, matches: 520 },
      { month: "May", processed: 2450, matches: 620 }
    ],
    productivityData: [
      { dept: "Core Engineering", speed: "98% Velocity", parsed: "400 Resumes parsed", trend: "bg-brand-blue" },
      { dept: "Applied AI Research", speed: "93% Velocity", parsed: "110 Resumes parsed", trend: "bg-brand-purple" },
      { dept: "Cloud Infra Systems", speed: "95% Velocity", parsed: "100 Resumes parsed", trend: "bg-emerald-500" }
    ]
  },
  YTD: {
    funnelData: [
      { stage: "Total Uploaded Resumes", count: 2450, percentage: 100, color: "bg-brand-blue" },
      { stage: "AI Screened & Validated", count: 1840, percentage: 75, color: "bg-brand-blue/80" },
      { stage: "Matched Candidates (>80%)", count: 620, percentage: 25, color: "bg-brand-blue/60" },
      { stage: "Shortlisted by Recruiters", count: 228, percentage: 9, color: "bg-brand-purple" },
      { stage: "Offers Extended", count: 42, percentage: 1.7, color: "bg-brand-red" }
    ],
    processingTimes: {
      avgParsing: "1.2 Seconds",
      aiMatchSpeed: "0.4 Seconds",
      timeSaved: "340 Hours/Mo"
    },
    monthlyScreening: [
      { month: "Jan", processed: 1200, matches: 300 },
      { month: "Feb", processed: 1450, matches: 380 },
      { month: "Mar", processed: 1800, matches: 450 },
      { month: "Apr", processed: 2100, matches: 520 },
      { month: "May", processed: 2450, matches: 620 }
    ],
    productivityData: [
      { dept: "Core Engineering", speed: "96% Velocity", parsed: "1,240 Resumes parsed", trend: "bg-brand-blue" },
      { dept: "Applied AI Research", speed: "91% Velocity", parsed: "320 Resumes parsed", trend: "bg-brand-purple" },
      { dept: "Cloud Infra Systems", speed: "94% Velocity", parsed: "280 Resumes parsed", trend: "bg-emerald-500" }
    ]
  },
  ALL: {
    funnelData: [
      { stage: "Total Uploaded Resumes", count: 4820, percentage: 100, color: "bg-brand-blue" },
      { stage: "AI Screened & Validated", count: 3615, percentage: 75, color: "bg-brand-blue/80" },
      { stage: "Matched Candidates (>80%)", count: 1205, percentage: 25, color: "bg-brand-blue/60" },
      { stage: "Shortlisted by Recruiters", count: 433, percentage: 9, color: "bg-brand-purple" },
      { stage: "Offers Extended", count: 82, percentage: 1.7, color: "bg-brand-red" }
    ],
    processingTimes: {
      avgParsing: "1.3 Seconds",
      aiMatchSpeed: "0.4 Seconds",
      timeSaved: "680 Hours"
    },
    monthlyScreening: [
      { month: "Oct", processed: 800, matches: 200 },
      { month: "Nov", processed: 950, matches: 240 },
      { month: "Dec", processed: 1100, matches: 280 },
      { month: "Jan", processed: 1200, matches: 300 },
      { month: "Feb", processed: 1450, matches: 380 },
      { month: "Mar", processed: 1800, matches: 450 },
      { month: "Apr", processed: 2100, matches: 520 },
      { month: "May", processed: 2450, matches: 620 }
    ],
    productivityData: [
      { dept: "Core Engineering", speed: "95% Velocity", parsed: "2,540 Resumes parsed", trend: "bg-brand-blue" },
      { dept: "Applied AI Research", speed: "90% Velocity", parsed: "720 Resumes parsed", trend: "bg-brand-purple" },
      { dept: "Cloud Infra Systems", speed: "93% Velocity", parsed: "640 Resumes parsed", trend: "bg-emerald-500" }
    ]
  }
};
