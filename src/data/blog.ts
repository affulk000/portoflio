// src/data/blog.ts
export interface BlogPost {
    uuid: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    publishDate: string; // Format: YYYY-MM-DD
    lastModified?: string; // Format: YYYY-MM-DD
    tags: string[];
    category: 'tutorial' | 'architecture' | 'devops' | 'best-practices' | 'case-study';
    readTime: number; // minutes
    featured: boolean;
    image?: string;
    status: 'published' | 'draft';
}

export const blogPosts: readonly BlogPost[] = [
    {
        uuid: "blog-multi-tenant-saas-2024",
        title: "Building Multi-Tenant SaaS with PostgreSQL Row-Level Security",
        slug: "multi-tenant-saas-postgresql-rls",
        excerpt: "Learn how to implement secure multi-tenant architecture using PostgreSQL Row-Level Security (RLS) for complete data isolation in SaaS applications.",
        content: "In this comprehensive guide, we'll explore how to build a secure multi-tenant SaaS application using PostgreSQL's Row-Level Security feature...",
        author: "Emmanuel Afful",
        publishDate: "2024-11-15",
        tags: ["PostgreSQL", "Multi-tenant", "SaaS", "Security", "Go"],
        category: "architecture",
        readTime: 12,
        featured: true,
        status: "published"
    },
    {
        uuid: "blog-go-microservices-2024",
        title: "Microservices Architecture with Go: Best Practices and Patterns",
        slug: "go-microservices-best-practices",
        excerpt: "Discover proven patterns and best practices for building scalable microservices with Go, including service communication, error handling, and deployment strategies.",
        content: "Microservices architecture has become the go-to approach for building scalable, maintainable applications. In this article, we'll dive deep into implementing microservices with Go...",
        author: "Emmanuel Afful",
        publishDate: "2024-10-22",
        tags: ["Go", "Microservices", "Architecture", "Docker", "Kubernetes"],
        category: "architecture",
        readTime: 15,
        featured: true,
        status: "published"
    },
    {
        uuid: "blog-kubernetes-deployment-2024",
        title: "Zero-Downtime Deployments with Kubernetes and Go Applications",
        slug: "kubernetes-zero-downtime-deployments",
        excerpt: "Master the art of zero-downtime deployments for Go applications using Kubernetes rolling updates, health checks, and graceful shutdowns.",
        content: "Achieving zero-downtime deployments is crucial for production applications. This guide covers everything you need to know about deploying Go applications with Kubernetes...",
        author: "Emmanuel Afful",
        publishDate: "2024-09-18",
        tags: ["Kubernetes", "DevOps", "Go", "Deployment", "CI/CD"],
        category: "devops",
        readTime: 10,
        featured: false,
        status: "published"
    },
    {
        uuid: "blog-api-security-2024",
        title: "Securing REST APIs: JWT, OAuth2, and Rate Limiting in Go",
        slug: "securing-rest-apis-go",
        excerpt: "Comprehensive guide to implementing robust security measures for REST APIs including JWT authentication, OAuth2 integration, and rate limiting strategies.",
        content: "API security is paramount in today's interconnected world. This article covers essential security practices for REST APIs built with Go...",
        author: "Emmanuel Afful",
        publishDate: "2024-08-25",
        tags: ["Security", "JWT", "OAuth2", "API", "Go"],
        category: "best-practices",
        readTime: 8,
        featured: true,
        status: "published"
    },
    {
        uuid: "blog-database-optimization-2024",
        title: "PostgreSQL Performance Optimization for High-Traffic Applications",
        slug: "postgresql-performance-optimization",
        excerpt: "Learn advanced PostgreSQL optimization techniques including indexing strategies, query optimization, and connection pooling for high-performance applications.",
        content: "Database performance is often the bottleneck in high-traffic applications. This guide explores advanced PostgreSQL optimization techniques...",
        author: "Emmanuel Afful",
        publishDate: "2024-07-30",
        tags: ["PostgreSQL", "Performance", "Database", "Optimization"],
        category: "tutorial",
        readTime: 14,
        featured: false,
        status: "published"
    }
];

export const getBlogPostByUuid = (uuid: string): BlogPost | undefined => {
    return blogPosts.find((post) => post.uuid === uuid);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find((post) => post.slug === slug);
};

export const getFeaturedBlogPosts = (): readonly BlogPost[] => {
    return blogPosts.filter((post) => post.featured && post.status === 'published');
};

export const getBlogPostsByCategory = (category: BlogPost['category']): readonly BlogPost[] => {
    return blogPosts.filter((post) => post.category === category && post.status === 'published');
};

export const getBlogPostsByTag = (tag: string): readonly BlogPost[] => {
    return blogPosts.filter((post) => 
        post.tags.includes(tag) && post.status === 'published'
    );
};

export const getRecentBlogPosts = (limit: number = 3): readonly BlogPost[] => {
    return blogPosts
        .filter((post) => post.status === 'published')
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, limit);
};