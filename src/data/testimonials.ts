// src/data/testimonials.ts
export interface Testimonial {
    uuid: string;
    name: string;
    role: string;
    company: string;
    avatar?: string;
    content: string;
    rating: number; // 1-5
    date: string; // Format: YYYY-MM-DD
    projectRelated?: string; // Project UUID if related to specific project
    linkedinUrl?: string;
}

export const testimonials: readonly Testimonial[] = [
    {
        uuid: "test-project-manager-2024",
        name: "Sarah Johnson",
        role: "Senior Project Manager",
        company: "TechFlow Solutions",
        content: "Emmanuel delivered exceptional results on our e-commerce platform. His expertise in Go microservices and attention to detail resulted in a system that handles 10,000+ daily transactions flawlessly. His proactive communication and problem-solving skills made the entire project smooth.",
        rating: 5,
        date: "2024-09-15",
        projectRelated: "proj-ecommerce-api-2023",
        linkedinUrl: "https://linkedin.com/in/sarah-johnson-pm"
    },
    {
        uuid: "test-cto-2024",
        name: "Michael Chen",
        role: "Chief Technology Officer",
        company: "InnovateLabs",
        content: "Working with Emmanuel was a game-changer for our infrastructure. His Go-based automation tools reduced our system downtime by 60% and significantly improved our operational efficiency. He's a rare combination of technical excellence and business understanding.",
        rating: 5,
        date: "2024-07-22",
        projectRelated: "proj-automation-tools-2021"
    },
    {
        uuid: "test-lead-dev-2023",
        name: "Priya Patel",
        role: "Lead Developer",
        company: "CloudScale Inc",
        content: "Emmanuel's expertise in multi-tenant SaaS architecture is outstanding. He implemented PostgreSQL RLS and OAuth2 integration that exceeded our security requirements. His code quality and documentation standards are exemplary.",
        rating: 5,
        date: "2023-11-30",
        projectRelated: "proj-kraftivibe-2024"
    },
    {
        uuid: "test-startup-founder-2023",
        name: "David Osei",
        role: "Founder & CEO",
        company: "StartupGH",
        content: "Emmanuel built our real-time chat system from scratch. The WebSocket implementation handles 1000+ concurrent users seamlessly. His ability to deliver complex features on tight deadlines while maintaining code quality is impressive.",
        rating: 5,
        date: "2023-12-10",
        projectRelated: "proj-chat-system-2023"
    },
    {
        uuid: "test-colleague-2022",
        name: "Kwame Asante",
        role: "Senior Software Engineer",
        company: "Michachn Invention Company Ltd.",
        content: "Emmanuel's project management skills transformed our development process. He improved our team efficiency by 40% through agile methodologies and delivered every project on time. His technical leadership and mentoring abilities are exceptional.",
        rating: 5,
        date: "2022-12-15"
    }
];

export const getTestimonialByUuid = (uuid: string): Testimonial | undefined => {
    return testimonials.find((testimonial) => testimonial.uuid === uuid);
};

export const getTestimonialsByProject = (projectUuid: string): readonly Testimonial[] => {
    return testimonials.filter((testimonial) => testimonial.projectRelated === projectUuid);
};

export const getFeaturedTestimonials = (limit: number = 3): readonly Testimonial[] => {
    return testimonials.slice(0, limit);
};