export const profile = {
  name: "Ocean Uddin",
  roles: ["IT Professional", "Cybersecurity", "Full-Stack Developer", "IoT Builder"],
  location: "Orlando, FL",
  email: "contact@oceanuddin.com",
  links: {
    github: "https://github.com/oceanuddin",
    linkedin: "https://linkedin.com/in/oceanuddin",
    site: "https://oceanuddin.com",
  },
  resume: "/ocean-uddin-resume.pdf",
  tagline:
    "Recent UCF graduate blending technical depth with entrepreneurial drive — building real products while pursuing a career in IT and cybersecurity.",
};

export const about = {
  body: [
    "I'm a recent UCF graduate and self-starter based in Orlando, FL, with a background in IT support, Apple device repair, cybersecurity, and full-stack IoT development.",
    "I like working close to the metal and close to the user — diagnosing hardware one day, shipping a React Native app or wiring up a Shelly relay the next. I build things end to end and sweat the details.",
  ],
  lookingFor: {
    title: "What I'm looking for",
    roles: [
      "IT Support Analyst",
      "Help Desk Technician",
      "Junior Cybersecurity Analyst",
      "Systems Administrator",
    ],
    note: "Open to Orlando, FL & surrounding area; hybrid welcome.",
  },
};

export type Experience = {
  role: string;
  org: string;
  meta: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Apple Technical Specialist",
    org: "Apple Authorized Service Provider",
    meta: "~2 Years",
    points: [
      "Performed hardware diagnostics, repairs, and component-level troubleshooting on Mac, iPhone, and iPad.",
      "Managed device lifecycle: setup, data migration, asset tracking, and secure wipe workflows.",
      "Delivered clear technical explanations to non-technical customers, consistently achieving high satisfaction.",
      "Built strong proficiency with Apple Configurator, Apple Business Manager, and internal ticketing systems.",
    ],
  },
  {
    role: "Scheduling Coordinator",
    org: "Chevron & Shell Locations · Orlando, FL",
    meta: "Current",
    points: [
      "Coordinate staffing for two gas station sites — shift assignments, swaps, and coverage planning.",
      "Built a standalone HTML shift-scheduling web app to replace manual tracking with a digital, browser-based workflow.",
    ],
  },
];

export type Project = {
  name: string;
  status: string;
  blurb: string;
  points: string[];
  tags: string[];
  accent: "cyan" | "violet" | "ember" | "teal";
};

export const projects: Project[] = [
  {
    name: "GrillPass",
    status: "~80% · Active Development",
    blurb:
      "IoT-powered smart grill access control for luxury apartment communities. Keyless, authenticated grill access via a mobile app; analytics and remote control for property managers.",
    points: [
      "BLE proximity detection for frictionless, hands-free unlock",
      "AI image verification to confirm legitimate grill use",
      "Shelly relay + solenoid valve hardware for physical lock/unlock",
      "React Native app + Next.js admin dashboard, Supabase backend",
      "~$300/mo per-property SaaS targeting Greystar-managed communities",
    ],
    tags: ["React Native", "Next.js", "Supabase", "AWS S3", "BLE", "Shelly", "IoT", "AI"],
    accent: "ember",
  },
  {
    name: "Attaché.cv",
    status: "In Development · Brand Complete",
    blurb:
      "AI-powered job application platform that helps candidates craft tailored materials, track submissions, and optimize their search — with evidence-validated resumes and cover letters.",
    points: [
      "AI-assisted resume tailoring, cover-letter generation, and ATS optimization",
      "Evidence validation layer — every claim traced to the verified profile",
      "Comprehensive design system: color tokens, typography, component specs",
      "Next.js + Firebase + Claude API",
    ],
    tags: ["Next.js", "Firebase", "Claude API", "AI", "SaaS"],
    accent: "violet",
  },
  {
    name: "ScreenWhisper",
    status: "Shipped · Personal Tool",
    blurb:
      "A macOS menu-bar app that uses the Claude API to analyze on-screen content on demand. A global hotkey opens an overlay and returns contextual AI analysis of whatever you're looking at.",
    points: [
      "Native-feeling macOS menu-bar app built with Electron",
      "Global hotkey overlay — answers without switching context",
      "Claude API for screen interpretation and contextual assistance",
    ],
    tags: ["Electron", "macOS", "JavaScript", "Claude API", "AI"],
    accent: "cyan",
  },
  {
    name: "Shift Scheduling App",
    status: "Shipped · In Active Use",
    blurb:
      "A single-file HTML/JS web app for managing shift schedules across two gas station locations. Replaces spreadsheet-based scheduling with a clean, digital interface.",
    points: [
      "Single-file app — no backend, no install, runs in any browser",
      "Add, edit, and remove shifts across employees and locations",
      "Built for a non-technical end user — simple and reliable",
    ],
    tags: ["HTML", "JavaScript", "CSS"],
    accent: "teal",
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["JavaScript", "Python", "SQL", "HTML", "CSS", "Bash"] },
  { label: "Frontend", items: ["React Native", "Next.js", "Tailwind CSS", "Electron"] },
  { label: "Backend", items: ["Node.js", "Supabase", "PostgreSQL", "AWS S3", "REST APIs"] },
  {
    label: "IoT / Hardware",
    items: ["Shelly Relays", "Solenoid Valves", "BLE", "ESPHome", "Home Assistant"],
  },
  {
    label: "AI / LLM",
    items: ["Claude API", "Ollama", "Open WebUI", "Local LLM Lab (M1 Max, 64GB)", "Prompt Engineering"],
  },
  {
    label: "Cybersecurity",
    items: ["CompTIA Security+", "Threat Analysis", "Network Security", "Endpoint Hardening"],
  },
  {
    label: "Apple Ecosystem",
    items: ["macOS", "iOS", "Apple Configurator", "Apple Business Manager", "HW Diagnostics"],
  },
  { label: "DevOps / Tools", items: ["Git", "GitHub", "VS Code", "LaTeX", "Docker", "Linux"] },
  { label: "Design", items: ["Brand/Design Systems", "Figma", "UI Component Libraries"] },
];

export const education = {
  school: "University of Central Florida (UCF)",
  degree: "B.S. in Information Technology",
  meta: "Graduated May 2026 · GPA 3.5",
  note: "Coursework spanning networking, systems administration, cybersecurity, and software development.",
};

export type Cert = { name: string; issuer: string; desc: string };

export const certifications: Cert[] = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    desc: "Industry-standard credential covering threat analysis, cryptography, network security, and compliance.",
  },
  {
    name: "IT Fundamentals Pro",
    issuer: "TestOut",
    desc: "Validates broad foundational IT knowledge across hardware, software, networking, and security.",
  },
  {
    name: "Apple Certified Technician",
    issuer: "Apple",
    desc: "Authorized to diagnose and repair Apple hardware and software; deep macOS/iOS proficiency.",
  },
];

export type Interest = { title: string; body: string; glyph: string };

export const interests: Interest[] = [
  {
    title: "Acoustic Guitar",
    glyph: "♪",
    body: "I play acoustic guitar. (Try `strum` in the terminal.)",
  },
  {
    title: "Salt & Shadow Photography",
    glyph: "◎",
    body: "Founder of a portrait & lifestyle photography side business — informs my visual design sensibility.",
  },
  {
    title: "Fitness",
    glyph: "△",
    body: "Cutting phase, PPL split at Crunch Fitness, paired with high-protein globally-inspired meal prep.",
  },
  {
    title: "Home Automation & Local AI Lab",
    glyph: "⌬",
    body: "Shelly relays, ESPHome, and Home Assistant at home. Local LLM lab on an M1 Max (64GB) with Ollama + Open WebUI.",
  },
  {
    title: "Global Cooking",
    glyph: "✦",
    body: "Sous-vide and high-protein cooking across Thai, Korean, and Peruvian cuisines. (Try `recipe`.)",
  },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
] as const;

export const CTF_FLAG = "OU{cur10s1ty_g3ts_th3_1nt3rv13w}";
