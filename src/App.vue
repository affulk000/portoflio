<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import ExperienceSection from "@/components/sections/ExperienceSection.vue";
import SkillsSection from "@/components/sections/SkillsSection.vue";
import TestimonialsSection from "@/components/sections/TestimonialsSection.vue";
import BlogSection from "@/components/sections/BlogSection.vue";
import CertificationsSection from "@/components/sections/CertificationsSection.vue";
import ScrollProgress from "@/components/layout/ScrollProgress.vue";
import NavBar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

const _unusedComponents = {
    HeroSection,
    AboutSection,
    ProjectsSection,
    ExperienceSection,
    SkillsSection,
    TestimonialsSection,
    BlogSection,
    CertificationsSection,
    ScrollProgress,
    NavBar,
    Footer,
};
void _unusedComponents;

// Default SEO for homepage
const baseUrl = import.meta.env.VITE_BASE_URL || "https://www.peridev.org";

useSEO({
    structuredData: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Emmanuel Afful",
        url: baseUrl,
        jobTitle: "System Software Engineer",
        description:
            "Backend Engineer specializing in Go, PostgreSQL, and multi-tenant SaaS architecture",
        image: `${baseUrl}/og-image.svg`,
        alumniOf: {
            "@type": "Organization",
            name: "Ghana Communication Technology University",
        },
        worksFor: {
            "@type": "Organization",
            name: "Michachn Invention Company Ltd.",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Accra",
            addressCountry: "Ghana",
        },
        sameAs: [
            "https://www.peridev.org/",
            "https://afful-portfolio.deno.dev/",
            "https://github.com/affulk000",
            "http://linkedin.com/in/emmanuel-afful-6ba505260", // Update
            "https://twitter.com/affulk000", // Update if applicable
        ],
        knowsAbout: [
            "Go Programming",
            "Backend Development",
            "PostgreSQL",
            "Docker",
            "Kubernetes",
            "DevOps",
            "SaaS Architecture",
            "System Software Engineering",
        ],
    },
});

const isLoading = ref(true);

onMounted(() => {
    // Remove loading delay for better SEO
    isLoading.value = false;
});
</script>

<template>
  <div>
    <!-- App content goes here -->
  </div>
</template>

<script>
export default {
  // Fixing duplicate baseUrl declaration
  data() {
    return {
      baseUrl: 'https://example.com', // Only one baseUrl declared
      // ... other properties
    };
  },
  computed: {
    sameAs() {
      // Remove duplicate URLs from sameAs
      return [
        'https://twitter.com/example',
        'https://facebook.com/example',
        'https://linkedin.com/in/example'
      ];
    }
  }
};
</script>

<style>
/* Add component styles here */
</style>