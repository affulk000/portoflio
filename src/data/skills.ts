// src/data/skills.ts
export interface Skill {
    uuid: string;
    name: string;
    category: 'programming' | 'database' | 'devops' | 'tools' | 'soft-skills';
    proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    yearsOfExperience: number;
    icon?: string;
    description?: string;
}

export interface SkillCategory {
    name: string;
    category: Skill['category'];
    skills: readonly Skill[];
}

export const skills: readonly Skill[] = [
    // Programming Languages
    {
        uuid: "skill-go",
        name: "Go (Golang)",
        category: "programming",
        proficiency: "advanced",
        yearsOfExperience: 4,
        icon: "devicon:go",
        description: "Primary backend language for building scalable APIs and microservices"
    },
    {
        uuid: "skill-typescript",
        name: "TypeScript",
        category: "programming",
        proficiency: "intermediate",
        yearsOfExperience: 2,
        icon: "devicon:typescript",
        description: "Type-safe JavaScript for frontend and backend development"
    },
    {
        uuid: "skill-javascript",
        name: "JavaScript",
        category: "programming",
        proficiency: "advanced",
        yearsOfExperience: 3,
        icon: "devicon:javascript",
        description: "Frontend development and Node.js backend applications"
    },
    {
        uuid: "skill-bash",
        name: "Bash/Shell",
        category: "programming",
        proficiency: "advanced",
        yearsOfExperience: 4,
        icon: "devicon:bash",
        description: "System administration and automation scripting"
    },

    // Databases
    {
        uuid: "skill-postgresql",
        name: "PostgreSQL",
        category: "database",
        proficiency: "advanced",
        yearsOfExperience: 4,
        icon: "devicon:postgresql",
        description: "Primary database with expertise in RLS, indexing, and optimization"
    },
    {
        uuid: "skill-redis",
        name: "Redis",
        category: "database",
        proficiency: "intermediate",
        yearsOfExperience: 2,
        icon: "devicon:redis",
        description: "Caching, session management, and pub/sub messaging"
    },

    // DevOps & Infrastructure
    {
        uuid: "skill-docker",
        name: "Docker",
        category: "devops",
        proficiency: "advanced",
        yearsOfExperience: 3,
        icon: "devicon:docker",
        description: "Containerization and multi-stage builds for applications"
    },
    {
        uuid: "skill-kubernetes",
        name: "Kubernetes",
        category: "devops",
        proficiency: "intermediate",
        yearsOfExperience: 2,
        icon: "devicon:kubernetes",
        description: "Container orchestration and deployment management"
    },
    {
        uuid: "skill-github-actions",
        name: "GitHub Actions",
        category: "devops",
        proficiency: "advanced",
        yearsOfExperience: 3,
        icon: "devicon:github",
        description: "CI/CD pipeline automation and deployment workflows"
    },
    {
        uuid: "skill-linux",
        name: "Linux",
        category: "devops",
        proficiency: "advanced",
        yearsOfExperience: 4,
        icon: "devicon:linux",
        description: "System administration, server management, and automation"
    },

    // Tools & Frameworks
    {
        uuid: "skill-gorm",
        name: "GORM",
        category: "tools",
        proficiency: "advanced",
        yearsOfExperience: 3,
        icon: "devicon:go",
        description: "Go ORM for database operations and migrations"
    },
    {
        uuid: "skill-vue",
        name: "Vue.js",
        category: "tools",
        proficiency: "intermediate",
        yearsOfExperience: 1,
        icon: "devicon:vuejs",
        description: "Frontend framework for building reactive user interfaces"
    },
    {
        uuid: "skill-git",
        name: "Git",
        category: "tools",
        proficiency: "advanced",
        yearsOfExperience: 4,
        icon: "devicon:git",
        description: "Version control and collaborative development workflows"
    },

    // Soft Skills
    {
        uuid: "skill-project-management",
        name: "Project Management",
        category: "soft-skills",
        proficiency: "advanced",
        yearsOfExperience: 3,
        icon: "solar:case-minimalistic-bold",
        description: "Agile methodologies, team leadership, and stakeholder management"
    },
    {
        uuid: "skill-problem-solving",
        name: "Problem Solving",
        category: "soft-skills",
        proficiency: "expert",
        yearsOfExperience: 5,
        icon: "solar:lightbulb-bolt-bold",
        description: "Analytical thinking and systematic approach to complex challenges"
    },
    {
        uuid: "skill-communication",
        name: "Technical Communication",
        category: "soft-skills",
        proficiency: "advanced",
        yearsOfExperience: 4,
        icon: "solar:chat-round-bold",
        description: "Clear documentation, code reviews, and cross-team collaboration"
    }
];

export const skillCategories: readonly SkillCategory[] = [
    {
        name: "Programming Languages",
        category: "programming",
        skills: skills.filter(skill => skill.category === "programming")
    },
    {
        name: "Databases",
        category: "database",
        skills: skills.filter(skill => skill.category === "database")
    },
    {
        name: "DevOps & Infrastructure",
        category: "devops",
        skills: skills.filter(skill => skill.category === "devops")
    },
    {
        name: "Tools & Frameworks",
        category: "tools",
        skills: skills.filter(skill => skill.category === "tools")
    },
    {
        name: "Soft Skills",
        category: "soft-skills",
        skills: skills.filter(skill => skill.category === "soft-skills")
    }
];

export const getSkillByUuid = (uuid: string): Skill | undefined => {
    return skills.find((skill) => skill.uuid === uuid);
};

export const getSkillsByCategory = (category: Skill['category']): readonly Skill[] => {
    return skills.filter((skill) => skill.category === category);
};

export const getSkillsByProficiency = (proficiency: Skill['proficiency']): readonly Skill[] => {
    return skills.filter((skill) => skill.proficiency === proficiency);
};