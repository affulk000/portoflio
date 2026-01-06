import { useHead } from "@vueuse/head";
import { computed } from "vue";

interface SEOOptions {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string;
    structuredData?: Record<string, any>;
}

export const useSEO = (options: SEOOptions = {}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';
    const siteName = "Emmanuel Afful - Backend Engineer";

    const defaultTitle =
        "Emmanuel Afful | System Software Engineer & Backend Developer";
    const defaultDescription =
        "Backend Engineer specializing in Go, PostgreSQL, and multi-tenant SaaS architecture. Building scalable systems with clean architecture and modern DevOps practices.";
    const defaultImage = `${baseUrl}/og-image.svg`;
    const defaultKeywords =
        "Emmanuel Afful, Backend Engineer, Go Developer, GoLang, PostgreSQL, System Software Engineer, DevOps, Kubernetes, Docker, SaaS Architecture, Accra Ghana";

    const pageTitle = computed(() =>
        options.title ? `${options.title} | ${siteName}` : defaultTitle,
    );
    const pageDescription = computed(
        () => options.description || defaultDescription,
    );
    const pageImage = computed(() => options.image || defaultImage);
    const pageUrl = computed(() => options.url || baseUrl);
    const pageType = computed(() => options.type || "website");
    const pageKeywords = computed(() => options.keywords || defaultKeywords);

    useHead({
        title: pageTitle,
        meta: computed(() => [
            // Primary Meta Tags
            { name: "title", content: pageTitle.value },
            { name: "description", content: pageDescription.value },
            { name: "keywords", content: pageKeywords.value },
            { name: "author", content: "Emmanuel Afful" },
            { name: "robots", content: "index, follow" },
            { name: "language", content: "English" },
            { name: "revisit-after", content: "7 days" },

            // Open Graph / Facebook
            { property: "og:type", content: pageType.value },
            { property: "og:url", content: pageUrl.value },
            { property: "og:title", content: pageTitle.value },
            { property: "og:description", content: pageDescription.value },
            { property: "og:image", content: pageImage.value },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:site_name", content: siteName },
            { property: "og:locale", content: "en_US" },

            // Twitter
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:url", content: pageUrl.value },
            { name: "twitter:title", content: pageTitle.value },
            { name: "twitter:description", content: pageDescription.value },
            { name: "twitter:image", content: pageImage.value },
            { name: "twitter:creator", content: "@affulk000" }, // Update with your Twitter handle

            // Additional SEO
            { name: "theme-color", content: "#FF6B35" }, // Your accent color
            { name: "mobile-web-app-capable", content: "yes" },
            {
                name: "apple-mobile-web-app-status-bar-style",
                content: "black-translucent",
            },
        ]),
        link: computed(() => [
            { rel: "canonical", href: pageUrl.value },
            { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
            { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        ]),
        script: options.structuredData
            ? computed(() => [
                  {
                      type: "application/ld+json",
                      children: JSON.stringify(options.structuredData),
                  },
              ])
            : [],
    });
};
