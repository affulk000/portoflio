// src/data/projects.ts
export interface Project {
    uuid: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    category: 'web' | 'mobile' | 'backend' | 'fullstack' | 'devops';
    status: 'completed' | 'in-progress' | 'planned';
    featured: boolean;
    image?: string;
    demoUrl?: string;
    githubUrl?: string;
    startDate: string; // Format: YYYY-MM-DD
    endDate?: string; // Format: YYYY-MM-DD
    highlights: string[];
}

export const projects: readonly Project[] = [
    {
        uuid: "proj-kraftivibe-2024",
        title: "Krafti Vibe - Multi-tenant SaaS Platform",
        description: "A comprehensive SaaS platform for artisans with multi-tenant architecture, OAuth2 authentication, and PostgreSQL RLS.",
        longDescription: "Krafti Vibe is a modern SaaS platform designed specifically for artisans to manage their businesses. Built with Go and PostgreSQL, it features a robust multi-tenant architecture using Row-Level Security (RLS) for data isolation. The platform includes OAuth2/OIDC authentication via Zitadel, containerized deployment with Docker and Kubernetes, and comprehensive CI/CD pipelines.",
        technologies: ["Go", "GORM", "PostgreSQL", "Zitadel", "Docker", "Kubernetes", "GitHub Actions", "Redis", "OAuth2/OIDC"],
        category: "backend",
        status: "in-progress",
        featured: true,
        githubUrl: "https://github.com/affulk000/Krafti_Vibe",
        startDate: "2024-01-01",
        highlights: [
            "Multi-tenant architecture with PostgreSQL RLS",
            "OAuth2/OIDC authentication integration",
            "Clean architecture with dependency injection",
            "Automated CI/CD with GitHub Actions",
            "Container orchestration with Kubernetes",
            "Sub-100ms API response times",
            "Zero security vulnerabilities in production"
        ]
    },
    {
        uuid: "proj-portfolio-2024",
        title: "Personal Portfolio Website",
        description: "Modern, responsive portfolio built with Vue 3, TypeScript, and Vite featuring advanced animations and SEO optimization.",
        longDescription: "A modern portfolio website showcasing my skills and experience as a backend engineer. Built with Vue 3 Composition API, TypeScript for type safety, and Vite for fast development. Features include advanced scroll animations, SEO optimization, responsive design, and performance optimizations.",
        technologies: ["Vue 3", "TypeScript", "Vite", "Tailwind CSS", "PrimeVue", "Motion-V"],
        category: "web",
        status: "completed",
        featured: true,
        demoUrl: "https://afful-portfolio.deno.dev/",
        githubUrl: "https://github.com/affulk000/portfolio",
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        highlights: [
            "Vue 3 Composition API with TypeScript",
            "Advanced scroll animations and interactions",
            "SEO optimized with structured data",
            "Responsive design with Tailwind CSS",
            "Performance optimized with Vite",
            "Accessibility compliant"
        ]
    },
    {
        uuid: "proj-automation-tools-2021",
        title: "IT Infrastructure Automation",
        description: "Go-based automation tools for system monitoring, backup management, and infrastructure maintenance.",
        longDescription: "Developed a suite of automation tools using Go to streamline IT infrastructure management. The tools include automated system monitoring with alerting, backup management systems, and maintenance scripts that reduced manual intervention by 60% and improved system reliability.",
        technologies: ["Go", "Bash", "Linux", "PostgreSQL", "Docker", "Cron"],
        category: "devops",
        status: "completed",
        featured: false,
        startDate: "2020-06-01",
        endDate: "2021-12-31",
        highlights: [
            "60% reduction in system downtime",
            "Automated monitoring and alerting system",
            "Backup and disaster recovery automation",
            "Cross-platform compatibility",
            "Comprehensive logging and reporting"
        ]
    },
    {
        uuid: "proj-ecommerce-api-2023",
        title: "E-commerce Microservices API",
        description: "Scalable microservices architecture for e-commerce platform with Go, featuring payment processing, inventory management, and order fulfillment.",
        longDescription: "Built a comprehensive e-commerce backend using microservices architecture with Go. Implemented secure payment processing with Stripe, real-time inventory management, order processing workflows, and customer management systems. Used Docker containers with Kubernetes orchestration for high availability.",
        technologies: ["Go", "Gin", "PostgreSQL", "Redis", "Stripe API", "Docker", "Kubernetes", "RabbitMQ", "JWT"],
        category: "backend",
        status: "completed",
        featured: true,
        githubUrl: "https://github.com/affulk000/ecommerce-microservices",
        startDate: "2023-03-01",
        endDate: "2023-08-31",
        highlights: [
            "Processed 10,000+ transactions with 99.9% uptime",
            "Implemented secure payment gateway integration",
            "Built real-time inventory tracking system",
            "Achieved 50ms average API response time",
            "Designed fault-tolerant microservices architecture",
            "Implemented comprehensive API documentation"
        ]
    }
];

export const getProjectByUuid = (uuid: string): Project | undefined => {
    return projects.find((project) => project.uuid === uuid);
};

export const getFeaturedProjects = (): readonly Project[] => {
    return projects.filter((project) => project.featured);
};

export const getProjectsByCategory = (category: Project['category']): readonly Project[] => {
    return projects.filter((project) => project.category === category);
};

export const getProjectsByStatus = (status: Project['status']): readonly Project[] => {
    return projects.filter((project) => project.status === status);
};