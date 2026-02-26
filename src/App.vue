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
            "http://linkedin.com/in/emmanuel-afful-74336517b",
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
  <div class="fixed inset-0 -z-10 bg-white dark:bg-gray-950">
    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0); background-size: 20px 20px" />
    <div class="absolute inset-0 hidden dark:block" style="background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0); background-size: 20px 20px" />
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute rounded-full blur-3xl opacity-30 bg-primary-300" style="top: 10%; left: 20%; width: 500px; height: 500px; animation: float 20s ease-in-out infinite" />
      <div class="absolute rounded-full blur-3xl opacity-30 bg-accent-300" style="top: 60%; right: 10%; width: 600px; height: 600px; animation: float 20s ease-in-out infinite 2s" />
      <div class="absolute rounded-full blur-3xl opacity-30 bg-primary-400" style="top: 40%; left: 50%; width: 450px; height: 450px; animation: float 20s ease-in-out infinite 4s" />
    </div>
  </div>
  <div v-if="!isLoading">
    <ScrollProgress />
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <BlogSection />
      <CertificationsSection />
    </main>
    <Footer />
  </div>
</template>

<style>
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
</style>