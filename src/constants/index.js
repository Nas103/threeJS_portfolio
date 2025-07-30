import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    alx,
    allied,
    xora,
    calorie,
    rpg,
    ibm,
    skillup,
    free, calorie_app,
    rpg_game,
    python,
    intelligai,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "certifications",
        title: "Certifications",
    },
    {
        id: "contact",
        title: "Contact",
    },
    {
        id: "chat",
        title: "AI Chat",
    },
];

const services = [
    {
        title: "Software Engineer",
        icon: web,
    },
    {
        title: "AI Developer",
        icon: mobile,
    },
    {
        title: "Full-Stack Developer",
        icon: backend,
    },
    {
        title: "AI Engineer",
        icon: creator,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Redux",
        icon: threejs,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Three JS",
        icon: python,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "Software Engineer Apprentice",
        company_name: "alx",
        icon: alx,
        iconBg: "#E6DEDD",
        date: "2023 - 2025",
        points: [
            "Developed software solutions using Agile methodology for alx, achieving a 30% reduction in maintenance costs by focusing on user requirements and delivering high-quality code.",
            "Collaborated with cross-functional teams to design and test scalable software systems, improving user satisfaction by 25% through enhanced user experiences and optimized workflows.",
            "Implemented DevOps practices to increase software reliability and efficiency, resulting in a 40% improvement in deployment speed and a 20% reduction in downtime.",
            "Developed a command-line shell in C to emulate popular Unix shells, streamlining interactive program management and increasing productivity by 35% for end-users.",
            "Worked with database structures such as SQL, MySQL, PostgreSQL, Redis, and ES6, improving database query performance by 30% through efficient schema design and indexing.",
            "Collaborated with team members to ensure seamless functionality and a user-friendly experience, contributing to a 25% boost in user engagement metrics.",
            "Implemented efficient coding practices that optimized performance and reduced load times by 40%, enhancing overall user experience.",
        ],
    },
    {
        title: "Machine Learning Engineer (Internship)",
        company_name: "HexSoftwares",
        icon: ibm,
        iconBg: "#E6DEDD",
        date: "2025 - 2025",
        points: [
            "Developed and optimized machine learning models, improving accuracy by 25% through data preprocessing and feature engineering.",
            "Implemented scalable AI pipelines, reducing training time by 30% using parallel computing and cloud resources.",
            "Collaborated with cross-functional teams to deploy ML solutions, enhancing system efficiency and user experience by 20%.",
        ],
    },
    {
        title: "Full-Stack Developer (Present)",
        company_name: "Heybash FZCO",
        icon: free,
        iconBg: "#383E56",
        date: "Present",
        points: [
            "Developing and maintaining web apps using HubSpot, WordPress, and APIs.",
            "Building custom modules and responsive UI components.",
            "Managing tasks via Teamwork and ensuring timely delivery.",
            "Attending daily stand-up meetings and collaborating with the team.",
            "Maintaining code quality standards, security, and best practices.",  
        ],
    },
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Rhulani proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Rhulani does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Rhulani optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [
    {
        name: "Xora AI app",
        description:
            "Xora AI App is a cutting-edge artificial intelligence-powered application designed to simplify and enhance everyday tasks through intelligent automation.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "openAI",
                color: "green-text-gradient",
            },
            {
                name: "tailwind",
                color: "pink-text-gradient",
            },
        ],
        image: xora,
        source_code_link: "https://github.com/Nas103/xora_app",
    },
    {
        name: "RPG Game",
        description:
            "Dragon Compeller is an engaging role-playing game (RPG) that immerses players in a vibrant fantasy world filled with dragons, quests, and epic battles.",
        tags: [
            {
                name: "JavaScript",
                color: "blue-text-gradient",
            },
            {
                name: "HTML",
                color: "green-text-gradient",
            },
            {
                name: "CSS",
                color: "pink-text-gradient",
            },
        ],
        image: rpg_game,
        source_code_link: "https://github.com/Nas103/rpgGame",
    },
    {
        name: "IntelliG AI",
        description:
            "IntelliG AI is an advanced artificial intelligence platform that leverages cutting-edge machine learning algorithms to provide intelligent solutions for various tasks. This powerful AI assistant can analyze data, generate content, answer questions, and assist users with complex problem-solving in real-time.",
        tags: [
            {
                name: "JavaScript",
                color: "blue-text-gradient",
            },
            {
                name: "NextJS",
                color: "green-text-gradient",
            },
            {
                name: "Python",
                color: "pink-text-gradient",
            },
            {
                name: "Tailwind",
                color: "blue-text-gradient",
            },
            {
                name: "OpenAI",
                color: "green-text-gradient",
            },
            {
                name: "TypeScript",
                color: "orange-text-gradient",
            },
            {
                name: "Redux Toolkit",
                color: "grey-text-gradient",
            },
            {
                name: "AWS/GCP",
                color: "yellow-text-gradient",
            },
            {
                name: "JWT Authentication",
                color: "red-text-gradient",
            },
            {
                name: "Redis",
                color: "purple-text-gradient",
            },
            {
                name: "PostgreSQL",
                color: "green-text-gradient",
            },
        ],
        image: intelligai,
        source_code_link: "https://github.com/Nas103/Calorie-counter",
    },
];

const certifications = [
  {
    title: "Computer Science Career Path",
    organization: "Codecademy",
    date: "2023",
    description: "Comprehensive program covering computer science fundamentals, algorithms, and software development principles."
  },
  {
    title: "IBM AI Engineer Professional Certificate",
    organization: "IBM",
    date: "2024",
    description: "Advanced certification in AI engineering, covering machine learning, deep learning, and AI application development."
  },
  {
    title: "IBM AI Developer Professional Certificate",
    organization: "IBM",
    date: "2024",
    description: "Specialized training in AI development, focusing on building and deploying AI-powered applications."
  },
  {
    title: "Meta Backend Developer Professional Certificate",
    organization: "Meta",
    date: "2024",
    description: "Comprehensive backend development training from Meta, covering server-side technologies and database management."
  },
  {
    title: "Google IT Support Technician Specialist Professional Certificate",
    organization: "Google",
    date: "2023",
    description: "Technical certification in IT support, covering troubleshooting, system administration, and customer service."
  },
  {
    title: "Certified AWS Cloud Practitioner Essentials",
    organization: "Amazon Web Services",
    date: "2024",
    description: "Foundational certification in AWS cloud services, architecture, and best practices."
  },
  {
    title: "Certified AWS AI Practitioner",
    organization: "Amazon Web Services",
    date: "2024",
    description: "Specialized certification in AWS AI and machine learning services and implementations."
  },
  {
    title: "iOS and Android Mobile App Developer Professional Certificate",
    organization: "Coursera",
    date: "2024",
    description: "Comprehensive training in mobile app development for both iOS and Android platforms."
  },
  {
    title: "Data Science Professional Certificate",
    organization: "IBM",
    date: "2023",
    description: "Advanced certification in data science methodologies, tools, and applications."
  },
  {
    title: "Responsive Web Design Professional Certificate",
    organization: "freeCodeCamp",
    date: "2023",
    description: "Certification in creating responsive and adaptive web designs for various devices and screen sizes."
  },
  {
    title: "JavaScript Algorithms and Data Structures Professional Certificate",
    organization: "freeCodeCamp",
    date: "2023",
    description: "Advanced training in JavaScript programming, focusing on algorithms and data structures."
  },
  {
    title: "Python Developer Professional Certificate",
    organization: "JetBrains",
    date: "2024",
    description: "Comprehensive certification in Python development, covering core concepts and advanced applications."
  },
  {
    title: "Certified Python Data Scientist Associate",
    organization: "DataCamp",
    date: "2024",
    description: "Specialized certification in data science using Python, focusing on data analysis and visualization."
  }
];

export { services, technologies, experiences, testimonials, projects, certifications };
