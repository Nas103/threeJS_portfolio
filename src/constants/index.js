import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  xora,
  threejs,
  python,
  nextjs,
  sql,
  shell,
  rpg_game,
  intelAi,
  investmentIntel,
  NaSO,
  aiCoder,
  portfolioPreview,
  github,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "certifications", title: "Credentials" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "Software Engineer",
    icon: web,
    description: "Designing maintainable, scalable systems end-to-end with Python, TS and modern engineering practices.",
  },
  {
    title: "AI Voice Agent Engineer",
    icon: creator,
    description: "Building voice-agent solutions wired into real business workflows via APIs, webhooks and AI services.",
  },
  {
    title: "Full-Stack Developer",
    icon: backend,
    description: "Shipping responsive frontends and robust backends with React, Next.js and Node.js.",
  },
  {
    title: "Machine Learning Engineer",
    icon: mobile,
    description: "Turning data into products with ML pipelines, model evaluation and optimization.",
  },
];

const technologies = [
  { name: "Python", icon: python },
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript },
  { name: "React", icon: reactjs },
  { name: "Next.js", icon: nextjs },
  { name: "Node.js", icon: nodejs },
  { name: "SQL", icon: sql },
  { name: "MongoDB", icon: mongodb },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Three.js", icon: threejs },
  { name: "Docker", icon: docker },
  { name: "Git", icon: git },
  { name: "Shell / Linux", icon: shell },
  { name: "REST APIs", icon: figma },
];

const experiences = [
  {
    title: "AI Voice Agent Engineer",
    company_name: "Nexus AI Systems",
    iconBg: "#6d28d9",
    date: "May 2026 — Present",
    points: [
      "Developing AI voice-agent solutions for real business workflows, combining software engineering, APIs, automation and AI services.",
      "Building and integrating backend services, REST APIs, webhooks and third-party systems to connect AI agents with business applications.",
      "Designing practical application workflows and troubleshooting integration, API and runtime issues to deliver reliable client solutions.",
      "Using Python, JavaScript/TypeScript, Node.js and modern AI development tools to prototype, implement and refine software features.",
      "Working independently from technical investigation through implementation, testing and delivery against client requirements.",
      "Using AI coding assistants productively while reviewing generated code for correctness, maintainability and production suitability.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Heybash",
    iconBg: "#383e56",
    date: "Mar 2023 — Jan 2026",
    points: [
      "Developed full-stack web applications and software features using JavaScript, modern frontend technologies and APIs.",
      "Built and integrated application functionality across frontend and backend components with attention to maintainability and responsive user experiences.",
      "Investigated bugs and implementation issues, identified root causes and delivered fixes through collaborative development workflows.",
      "Worked with Git and modern software development practices while translating requirements into working application features.",
      "Contributed to API integrations and production-oriented web development in a professional engineering environment.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company_name: "HexSoftwares",
    iconBg: "#0f766e",
    date: "Jan 2023 — Mar 2023",
    points: [
      "Built and experimented with Python-based machine learning solutions and AI pipelines.",
      "Worked through data preparation, model development, evaluation and iterative optimization.",
      "Applied analytical problem solving and Python programming to practical machine learning tasks.",
    ],
  },
];

const projects = [
  {
    name: "NaSO",
    description:
      "A complex AI-powered retail web application with an embedded mobile app, blending e-commerce workflows with intelligent recommendations and automation.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "AI", color: "pink-text-gradient" },
      { name: "mobile", color: "green-text-gradient" },
      { name: "nextjs", color: "grey-text-gradient" },
    ],
    image: NaSO,
    source_code_link: "https://lily-s.vercel.app",
  },
  {
    name: "INTELIG-AI",
    description:
      "A large AI / SaaS application project spanning application workflows, AI functionality and user-facing product features built for real users.",
    tags: [
      { name: "nextjs", color: "grey-text-gradient" },
      { name: "typescript", color: "blue-text-gradient" },
      { name: "openAI", color: "green-text-gradient" },
      { name: "aws", color: "yellow-text-gradient" },
    ],
    image: intelAi,
    source_code_link: "https://intel-ai-phi.vercel.app/",
  },
  {
    name: "Investment Intel",
    description:
      "An AI-powered investment intelligence platform that surfaces market insights and data-driven analysis to support smarter portfolio decisions.",
    tags: [
      { name: "nextjs", color: "grey-text-gradient" },
      { name: "typescript", color: "blue-text-gradient" },
      { name: "AI", color: "pink-text-gradient" },
      { name: "finance", color: "green-text-gradient" },
    ],
    image: investmentIntel,
    source_code_link: "https://investment-intel.vercel.app/",
  },
  {
    name: "AI-Coding-Tutor",
    description:
      "An AI-focused coding project built in Python, demonstrating software engineering practice and AI-assisted development.",
    tags: [
      { name: "python", color: "green-text-gradient" },
      { name: "AI", color: "purple-text-gradient" },
      { name: "LLM", color: "blue-text-gradient" },
    ],
    image: aiCoder,
    source_code_link: "https://github.com/Nas103",
  },
  {
    name: "Xora AI app",
    description:
      "A cutting-edge AI-powered SaaS application designed to simplify and enhance everyday tasks through intelligent automation.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "openAI", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: xora,
    source_code_link: "https://github.com/Nas103/xora_app",
  },
  {
    name: "Dragon Compeller",
    description:
      "An engaging RPG that immerses players in a vibrant fantasy world filled with dragons, quests and epic battles.",
    tags: [
      { name: "javascript", color: "blue-text-gradient" },
      { name: "html", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: rpg_game,
    source_code_link: "https://github.com/Nas103/rpgGame",
  },
  {
    name: "threeJS_portfolio",
    description:
      "This interactive 3D portfolio — a modern Three.js / WebGL presentation demonstrating immersive, interactive front-end engineering.",
    tags: [
      { name: "three.js", color: "blue-text-gradient" },
      { name: "react", color: "green-text-gradient" },
      { name: "webgl", color: "pink-text-gradient" },
      { name: "tailwind", color: "grey-text-gradient" },
    ],
    image: portfolioPreview,
    source_code_link: "https://github.com/Nas103/threeJS_portfolio",
  },
];

const certifications = [
  {
    title: "IBM AI Engineer Professional Certificate",
    organization: "IBM",
    date: "2024",
    description: "AI engineering covering machine learning, deep learning and AI application development.",
  },
  {
    title: "IBM AI Developer Professional Certificate",
    organization: "IBM",
    date: "2024",
    description: "Building and deploying AI-powered applications at scale.",
  },
  {
    title: "AWS AI Practitioner",
    organization: "Amazon Web Services",
    date: "2024",
    description: "AWS AI and machine learning services, architectures and implementations.",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    organization: "Amazon Web Services",
    date: "2023",
    description: "Foundational AWS cloud services, architecture and best practices.",
  },
  {
    title: "Google IT Support Technician Specialist",
    organization: "Google",
    date: "2023",
    description: "Troubleshooting, system administration, networking and customer support.",
  },
  {
    title: "Meta Back-End Development Professional Certificate",
    organization: "Meta",
    date: "2024",
    description: "Server-side technologies, databases and backend engineering from Meta.",
  },
];

const education = [
  {
    title: "MSc Computer Science",
    organization: "Heriot-Watt University",
    date: "Paused — finance",
    description: "Postgraduate computer science study, currently paused due to a funding gap; aiming to resume.",
  },
  {
    title: "Software Engineering Bootcamp (Backend Specialization)",
    organization: "ALX / Holberton School",
    date: "Nov 2023 — Sep 2024",
    description: "Intensive backend engineering program covering Python, C, Linux, systems engineering and Git-based workflows.",
  },
  {
    title: "N4 Systems & Web Development",
    organization: "ATTI College",
    date: "Credential completed",
    description: "Systems and web development qualification.",
  },
  {
    title: "Diploma in Accounting Sciences",
    organization: "UNISA",
    date: "In Progress",
    description: "Blending technology skills with business and accounting fundamentals.",
  },
];

export const stats = [
  { value: "3+", label: "Years experience" },
  { value: "10+", label: "Projects shipped" },
  { value: "8+", label: "Certifications" },
  { value: "2", label: "AI agent stack live" },
];

export const githubProfile = github;

export {
  services,
  technologies,
  experiences,
  projects,
  certifications,
  education,
};