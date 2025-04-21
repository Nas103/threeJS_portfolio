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
        title: "Software Engineering",
        company_name: "ALX Bootcamp",
        icon: alx,
        iconBg: "#E6DEDD",
        date: "October 2023 - January 2025",
        points: [
            "Engineered scalable web applications, emphasizing performance and usability.",
            "Collaborated with multidisciplinary teams to transform requirements into deliverable features.",
            "Applied innovative approaches to ensure mobile-first design and seamless functionality.",
            "Championed best coding practices through active participation in peer reviews.",
        ],
    },
    {
        title: "IBM iOS & Android Developer",
        company_name: "SkillUp EdTech",
        icon: skillup,
        iconBg: "#E6DEDD",
        date: "Jan 2024 - Dec 2024",
        points: [
            "Developed native and cross-platform mobile applications for iOS and Android using Swift, Kotlin, and Flutter.",
            "Integrated mobile-specific features such as GPS, notifications, and biometric authentication for enhanced functionality.",
            "Collaborated with UI/UX teams to design seamless and intuitive user experiences tailored to mobile platforms.",
            "Conducted performance optimizations, reducing app load times and improving overall responsiveness.",
        ],
    },
    {
        title: "Web Development",
        company_name: "freeCodeCamp",
        icon: free,
        iconBg: "#383E56",
        date: "Aug 2024 - Nov 2024",
        points: [
            "Delivered engaging, high-performance web interfaces optimized for user experience.",
            "Coordinated with stakeholders to integrate client feedback into development cycles.",
            "Leveraged modern frameworks to craft responsive and accessible designs.",
            "Diagnosed and resolved technical issues, ensuring seamless project delivery.",
        ],
    },
    {
        title: "AI Developer | AI Engineer",
        company_name: "IBM",
        icon: ibm,
        iconBg: "#E6DEDD",
        date: "October 2023 - Dec 2024",
        points: [
            "Designed and implemented AI-driven solutions to address complex business challenges.",
            "Developed machine learning models and deployed them in scalable production environments.",
            "Collaborated with cross-functional teams to integrate AI functionalities into applications and services.",
            "Ensured the ethical use of AI by adhering to data privacy and security best practices.",
        ],
    },
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
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
        name: "Calorie Counter",
        description:
            "Calorie Counter Web App is a user-friendly tool designed to help users track their daily calorie intake and achieve their fitness goals. This responsive web application allows users to input, monitor, and analyze their meals and calorie consumption in real-time.",
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
        image: calorie_app,
        source_code_link: "https://github.com/Nas103/Calorie-counter",
    },
];

export { services, technologies, experiences, testimonials, projects };