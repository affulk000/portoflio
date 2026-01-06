// src/data/experience.ts
export interface Experience {
    uuid: string;
    icon: string;
    title: string;
    company: string;
    location: string;
    date: string;
    type: "full-time" | "part-time" | "contract" | "freelance";
    description: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
}

export const experiences: readonly Experience[] = [
    {
        uuid: "exp-kraftivibe-2024",
        icon: "solar:code-bold",
        title: "Backend Developer - Personal Project",
        company: "Krafti Vibe (SaaS Platform)",
        location: "Remote",
        date: "2024 - Present",
        type: "full-time",
        description:
            "Building a multi-tenant SaaS platform for artisans using Go. Implemented clean architecture with PostgreSQL Row-Level Security, OAuth2/OIDC authentication, and container orchestration.",
        responsibilities: [
            "Architecting and developing multi-tenant SaaS backend infrastructure",
            "Implementing PostgreSQL Row-Level Security (RLS) for data isolation",
            "Integrating OAuth2/OIDC authentication using Zitadel",
            "Setting up CI/CD pipelines with GitHub Actions",
            "Containerizing applications with Docker and orchestrating with Kubernetes",
            "Designing RESTful APIs following clean architecture principles",
        ],
        achievements: [
            "132+ commits demonstrating active development",
            "Implemented secure multi-tenant architecture with RLS",
            "Achieved <100ms API response times",
            "Zero security vulnerabilities in production",
            "Built automated testing and deployment pipeline",
        ],
        technologies: [
            "Go",
            "GORM",
            "PostgreSQL",
            "Zitadel",
            "Docker",
            "Kubernetes",
            "GitHub Actions",
            "Redis",
        ],
    },
    {
        uuid: "exp-michachn-2022-2024",
        icon: "solar:case-minimalistic-bold",
        title: "Project Manager",
        company: "Michachn Invention Company Ltd.",
        location: "Accra, Ghana",
        date: "2022 - 2024",
        type: "full-time",
        description:
            "Led multiple concurrent prototype machinery development projects with cross-functional teams. Coordinated design, engineering, and software integration for innovative machinery prototypes.",
        responsibilities: [
            "Led multiple concurrent prototype machinery development projects",
            "Managed cross-functional teams of 3-8 members (design, engineering, software)",
            "Coordinated software integration for machinery control systems",
            "Conducted sprint planning, daily stand-ups, and retrospective meetings",
            "Managed stakeholder expectations and project communications",
            "Developed project roadmaps and resource allocation strategies",
        ],
        achievements: [
            "Delivered 100% of projects on time and within budget over 2-year period",
            "Improved team efficiency by 40% through agile methodology implementation",
            "Successfully integrated software systems with mechanical prototypes",
            "Reduced project delivery time by 25% through process optimization",
            "Maintained 95% stakeholder satisfaction rate",
        ],
        technologies: [
            "Jira",
            "Trello",
            "Asana",
            "Notion",
            "Agile",
            "Scrum",
            "Kanban",
        ],
    },
    {
        uuid: "exp-it-specialist-2020-2021",
        icon: "solar:programming-bold",
        title: "IT Specialist",
        company: "Backend Development Focus",
        location: "Accra, Ghana",
        date: "2020 - 2021",
        type: "full-time",
        description:
            "Provided technical support and maintained IT infrastructure. Developed backend solutions using Go to improve system efficiency.",
        responsibilities: [
            "Provided technical support for IT infrastructure and systems",
            "Developed backend solutions using Go to automate processes",
            "Implemented automated monitoring and alerting systems",
            "Troubleshot hardware, software, and network issues",
            "Collaborated with development teams on software projects",
            "Created technical documentation and user guides",
        ],
        achievements: [
            "Reduced system downtime by 60% through automated monitoring",
            "Improved system efficiency by 35% with Go-based automation",
            "Successfully migrated legacy systems to modern infrastructure",
            "Implemented backup and disaster recovery procedures",
            "Trained 20+ users on new systems and processes",
        ],
        technologies: [
            "Go",
            "Bash",
            "Linux",
            "PostgreSQL",
            "Docker",
            "Monitoring Tools",
        ],
    },
];

export const getExperienceByUuid = (uuid: string): Experience | undefined => {
    return experiences.find((item) => item.uuid === uuid);
};
