<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";
import { useStaggeredAnimation } from "@composables/useStaggeredAnimation";

const aboutSectionRef = ref<HTMLElement | null>(null);
const expertiseElementsRef = ref<HTMLElement[]>([]);
const highlightElementsRef = ref<HTMLElement[]>([]);

// Modern scroll animations with fade out
useModernScrollAnimation(aboutSectionRef, {
    parallaxSpeed: 0.4,
    enableParallax: true,
    enableFade: true,
});

// Staggered animations for expertise cards
useStaggeredAnimation(expertiseElementsRef, {
    staggerDelay: 200,
    animationType: 'fadeLeft',
    threshold: 0.15,
});

// Staggered animations for highlights
useStaggeredAnimation(highlightElementsRef, {
    staggerDelay: 100,
    animationType: 'scale',
    threshold: 0.2,
});

const expertise = [
    {
        icon: "solar:server-bold",
        title: "Backend Architecture",
        description:
            "Expert in building scalable, multi-tenant SaaS platforms using Go with clean architecture principles and domain-driven design.",
        color: "accent",
    },
    {
        icon: "solar:shield-check-bold",
        title: "Security & Authentication",
        description:
            "Implementing robust security measures including OAuth2/OIDC, JWT, PostgreSQL RLS, and comprehensive input validation.",
        color: "primary",
    },
    {
        icon: "solar:chart-bold",
        title: "Performance Optimization",
        description:
            "Delivering high-performance APIs with <100ms response times through efficient query optimization and caching strategies.",
        color: "orange",
    },
    {
        icon: "solar:widget-5-bold",
        title: "DevOps & Infrastructure",
        description:
            "Proficient in containerization with Docker, orchestration with Kubernetes, and CI/CD automation using GitHub Actions.",
        color: "accent",
    },
];

const highlights = [
    {
        icon: "solar:code-bold",
        label: "Primary Language",
        value: "Go (GoLang)",
        detail: "2+ years production experience",
    },
    {
        icon: "solar:database-bold",
        label: "Database Expertise",
        value: "PostgreSQL",
        detail: "Advanced features & RLS",
    },
    {
        icon: "solar:programming-bold",
        label: "Architecture",
        value: "Clean Architecture",
        detail: "DDD & Microservices",
    },
    {
        icon: "solar:case-minimalistic-bold",
        label: "Project Management",
        value: "Certified PM",
        detail: "Google Professional Certificate",
    },
];

const getColorClasses = (color: string) => {
    const colors = {
        accent: "bg-accent-500/10 border-accent-500/20 text-accent-400",
        primary: "bg-primary-500/10 border-primary-500/20 text-primary-400",
        orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    };
    return colors[color as keyof typeof colors] || colors.accent;
};

// Intersection Observer for scroll animations
onMounted(() => {
    // Modern animations are handled by composables
});
</script>

<template>
    <section
        ref="aboutSectionRef"
        id="about"
        class="relative py-24 lg:py-32 overflow-hidden"
        style="
            background: linear-gradient(
                180deg,
                var(--color-dark-400) 0%,
                var(--color-dark-500) 50%,
                var(--color-dark-400) 100%
            );
        "
    >
        <!-- Enhanced Background Decorations -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div
                class="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-primary-500),
                        transparent
                    );
                "
            ></div>
            <div
                class="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl animate-float-delayed"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-accent-500),
                        transparent
                    );
                "
            ></div>
            <div
                class="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl animate-pulse-slow"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-orange-500),
                        transparent
                    );
                    transform: translate(-50%, -50%);
                "
            ></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <!-- Section Header -->
            <div class="text-center mb-16 lg:mb-20">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-semibold mb-6"
                >
                    <Icon icon="solar:user-bold" class="text-lg" />
                    <span>About Me</span>
                </div>
                <h2
                    class="text-4xl lg:text-5xl font-bold text-white mb-6 font-display"
                >
                    Building Robust
                    <span class="gradient-text-primary block mt-2"
                        >Backend Systems</span
                    >
                </h2>
                <p
                    class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                    I'm a System Software Engineer from Accra, Ghana,
                    specializing in backend development with Go. With over 4
                    years of experience, I focus on creating scalable, secure
                    infrastructure and leading teams to deliver high-quality
                    software solutions.
                </p>
            </div>

            <div
                class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 lg:mb-20"
            >
                <!-- Left: Profile & Story -->
                <div class="space-y-8">
                    <!-- Profile Card -->
                    <div
                        class="glass-morphism-dark p-8 rounded-2xl border border-white/10 space-y-6"
                    >
                        <div class="flex items-center gap-4 mb-6">
                            <div
                                class="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center"
                            >
                                <Icon
                                    icon="solar:user-bold"
                                    class="text-3xl text-white"
                                />
                            </div>
                            <div>
                                <h3
                                    class="text-2xl font-bold text-white font-display"
                                >
                                    Emmanuel Afful
                                </h3>
                                <p class="text-accent-400 font-semibold">
                                    System Software Engineer
                                </p>
                            </div>
                        </div>

                        <div class="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                As a passionate backend developer, I specialize
                                in building multi-tenant SaaS platforms with a
                                strong focus on security, performance, and
                                scalability. My expertise lies in Go
                                programming, PostgreSQL database design, and
                                modern DevOps practices.
                            </p>
                            <p>
                                My journey in tech started with IT support,
                                evolved through project management at Michachn
                                Invention Company Ltd., and now I'm focused on
                                backend engineering. I'm currently building
                                <span class="text-accent-400 font-semibold"
                                    >Krafti Vibe</span
                                >, a comprehensive SaaS platform for artisans.
                            </p>
                            <p>
                                I'm constantly learning and exploring new
                                technologies, currently diving deeper into Rust
                                for systems programming and expanding my
                                knowledge in Kubernetes orchestration.
                            </p>
                        </div>

                        <!-- Quick Stats -->
                        <div
                            class="grid grid-cols-2 gap-4 pt-6 border-t border-white/10"
                        >
                            <div class="text-center">
                                <div
                                    class="text-3xl font-bold text-accent-400 mb-1 font-display"
                                >
                                    2+
                                </div>
                                <div class="text-sm text-gray-400">
                                    Years with Go
                                </div>
                            </div>
                            <div class="text-center">
                                <div
                                    class="text-3xl font-bold text-primary-400 mb-1 font-display"
                                >
                                    100%
                                </div>
                                <div class="text-sm text-gray-400">
                                    On-Time Delivery
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Highlights Grid -->
                    <div class="grid grid-cols-2 gap-4">
                        <div
                            v-for="(highlight, index) in highlights"
                            :key="highlight.label"
                            :ref="el => { if (el) highlightElementsRef[index] = el as HTMLElement }"
                            class="glass-morphism-dark p-5 rounded-xl border border-white/10 hover:border-accent-500/30 transition-all duration-300 hover:scale-105 group"
                        >
                            <Icon
                                :icon="highlight.icon"
                                class="text-3xl text-accent-400 mb-3 group-hover:rotate-12 transition-transform duration-300"
                            />
                            <div class="text-xs text-gray-400 mb-1">
                                {{ highlight.label }}
                            </div>
                            <div class="text-base font-bold text-white mb-1">
                                {{ highlight.value }}
                            </div>
                            <div class="text-xs text-gray-500">
                                {{ highlight.detail }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Expertise Cards -->
                <div class="space-y-6">
                    <div
                        v-for="(item, index) in expertise"
                        :key="item.title"
                        :ref="el => { if (el) expertiseElementsRef[index] = el as HTMLElement }"
                        class="glass-morphism-dark p-6 rounded-xl border border-white/10 hover:border-accent-500/30 transition-all duration-300 group hover:scale-105 hover:shadow-glow-accent"
                    >
                        <div class="flex items-start gap-4">
                            <!-- Icon -->
                            <div
                                :class="[
                                    'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6',
                                    getColorClasses(item.color),
                                ]"
                            >
                                <Icon :icon="item.icon" class="text-2xl" />
                            </div>

                            <!-- Content -->
                            <div class="flex-1">
                                <h3
                                    class="text-xl font-bold text-white mb-2 font-display group-hover:text-accent-400 transition-colors duration-300"
                                >
                                    {{ item.title }}
                                </h3>
                                <p
                                    class="text-gray-400 leading-relaxed text-sm"
                                >
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- What I'm Currently Doing -->
            <div
                class="glass-morphism p-8 lg:p-10 rounded-2xl border border-white/10"
            >
                <div class="flex items-center gap-3 mb-6">
                    <Icon
                        icon="solar:rocket-bold"
                        class="text-3xl text-accent-400"
                    />
                    <h3 class="text-2xl font-bold text-white font-display">
                        Currently Working On
                    </h3>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Krafti Vibe Project -->
                    <div class="space-y-3">
                        <div class="flex items-center gap-2">
                            <div
                                class="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                            ></div>
                            <h4 class="text-lg font-semibold text-white">
                                Krafti Vibe SaaS Platform
                            </h4>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed">
                            Building a comprehensive multi-tenant SaaS solution
                            for artisans with advanced features like PostgreSQL
                            RLS, OAuth2 authentication, and Kubernetes
                            orchestration.
                            <span class="text-accent-400 font-semibold"
                                >132+ active commits</span
                            >
                            and counting.
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                class="px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/10 text-accent-400 border border-accent-500/20"
                            >
                                Go
                            </span>
                            <span
                                class="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20"
                            >
                                PostgreSQL
                            </span>
                            <span
                                class="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20"
                            >
                                K8s
                            </span>
                        </div>
                    </div>

                    <!-- Learning -->
                    <div class="space-y-3">
                        <div class="flex items-center gap-2">
                            <Icon
                                icon="solar:book-bold"
                                class="text-xl text-primary-400"
                            />
                            <h4 class="text-lg font-semibold text-white">
                                Continuous Learning
                            </h4>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed">
                            Expanding my skill set with Rust programming
                            (ownership model, memory safety), advanced
                            Kubernetes patterns, Terraform for IaC, and
                            Prometheus/Grafana for comprehensive observability.
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <span
                                class="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20"
                            >
                                Rust
                            </span>
                            <span
                                class="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20"
                            >
                                Terraform
                            </span>
                            <span
                                class="px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/10 text-accent-400 border border-accent-500/20"
                            >
                                Prometheus
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Enhanced Animations */
@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    33% {
        transform: translateY(-20px) rotate(1deg);
    }
    66% {
        transform: translateY(10px) rotate(-1deg);
    }
}

@keyframes float-delayed {
    0%, 100% {
        transform: translateY(0px) rotate(0deg) scale(1);
    }
    25% {
        transform: translateY(15px) rotate(-0.5deg) scale(1.05);
    }
    75% {
        transform: translateY(-10px) rotate(0.5deg) scale(0.95);
    }
}

@keyframes pulse-slow {
    0%, 100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

/* Animation Classes */
.animate-float {
    animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 10s ease-in-out infinite;
    animation-delay: 2s;
}

.animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
}

/* Enhanced hover effects */
.group:hover .group-hover\:rotate-6 {
    transform: rotate(6deg);
}

.group:hover .group-hover\:rotate-12 {
    transform: rotate(12deg);
}
</style>
