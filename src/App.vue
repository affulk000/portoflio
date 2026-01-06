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

// Default SEO for homepage
useSEO({
    structuredData: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Emmanuel Afful",
        url: "http://localhost:5173",
        jobTitle: "System Software Engineer",
        description:
            "Backend Engineer specializing in Go, PostgreSQL, and multi-tenant SaaS architecture",
        image: "http://localhost:5173/og-image.svg",
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
    <div class="relative">
        <!-- Loading Screen -->
        <transition
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-500"
            enter-from-class="opacity-100"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isLoading"
                class="fixed inset-0 flex items-center justify-center z-[9999] bg-dark-600"
            >
                <div class="text-center">
                    <!-- Spinner -->
                    <div class="relative w-16 h-16 mx-auto mb-6">
                        <div
                            class="absolute inset-0 rounded-full border-4 border-dark-300"
                        ></div>
                        <div
                            class="absolute inset-0 rounded-full border-4 border-t-accent-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"
                        ></div>
                    </div>

                    <!-- Loading Text -->
                    <div class="space-y-2">
                        <p
                            class="text-white text-lg font-semibold font-display"
                        >
                            Loading Portfolio
                        </p>
                        <div class="flex items-center justify-center gap-1">
                            <div
                                class="w-2 h-2 rounded-full bg-accent-500 animate-bounce"
                                style="animation-delay: 0ms"
                            ></div>
                            <div
                                class="w-2 h-2 rounded-full bg-accent-500 animate-bounce"
                                style="animation-delay: 150ms"
                            ></div>
                            <div
                                class="w-2 h-2 rounded-full bg-accent-500 animate-bounce"
                                style="animation-delay: 300ms"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Main Content -->
        <div v-show="!isLoading">
            <!-- Scroll Progress Bar -->
            <ScrollProgress />

            <!-- Navigation -->
            <NavBar />

            <!-- Main Sections -->
            <main class="relative">
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <ExperienceSection />
                <SkillsSection />
                <TestimonialsSection />
                <BlogSection />
                <CertificationsSection />
            </main>

            <!-- Footer -->
            <Footer />
        </div>
    </div>
</template>
