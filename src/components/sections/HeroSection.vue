<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";
import { useStaggeredAnimation } from "@composables/useStaggeredAnimation";
import ContactModal from "@/components/ui/ContactModal.vue";

const heroSectionRef = ref<HTMLElement | null>(null);
const isContactModalOpen = ref(false);
const statsElementsRef = ref<HTMLElement[]>([]);

// Modern scroll animations
useModernScrollAnimation(heroSectionRef, {
    parallaxSpeed: 0.3,
    enableParallax: true,
    enableFade: true,
});

// Staggered animations for stats
useStaggeredAnimation(statsElementsRef, {
    staggerDelay: 150,
    animationType: "fadeUp",
    threshold: 0.2,
});

const roles = [
    "System Software Engineer",
    "Backend Developer",
    "Infrastructure Specialist",
];

const currentRoleIndex = ref(0);
const displayedText = ref("");
const isDeleting = ref(false);
const typingSpeed = ref(100);

// Typing animation
const typeWriter = () => {
    const currentRole = roles[currentRoleIndex.value];

    if (!currentRole) return; // Safety check

    if (!isDeleting.value) {
        // Typing
        if (displayedText.value.length < currentRole.length) {
            displayedText.value = currentRole.substring(
                0,
                displayedText.value.length + 1,
            );
            typingSpeed.value = 150; // Slower typing
        } else {
            // Wait before deleting
            typingSpeed.value = 3000; // Longer pause
            isDeleting.value = true;
        }
    } else {
        // Deleting
        if (displayedText.value.length > 0) {
            displayedText.value = currentRole.substring(
                0,
                displayedText.value.length - 1,
            );
            typingSpeed.value = 80; // Slower deleting
        } else {
            // Move to next role
            isDeleting.value = false;
            currentRoleIndex.value =
                (currentRoleIndex.value + 1) % roles.length;
            typingSpeed.value = 800; // Longer pause before next
        }
    }

    setTimeout(typeWriter, typingSpeed.value);
};

onMounted(() => {
    // Wait for loading screen (800ms) + buffer time
    const loadingDelay = 1200;

    setTimeout(() => {
        leftContentVisible.value = true;
    }, loadingDelay);

    setTimeout(() => {
        rightContentVisible.value = true;
    }, loadingDelay + 400);

    setTimeout(() => {
        statsVisible.value = true;
    }, loadingDelay + 800);

    setTimeout(() => {
        typingStarted.value = true;
        typeWriter();
    }, loadingDelay + 500);
});

const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const socialLinks = [
    {
        name: "GitHub",
        icon: "mdi:github",
        url: "https://github.com/affulk000",
        color: "hover:text-white",
    },
    {
        name: "LinkedIn",
        icon: "mdi:linkedin",
        url: "www.linkedin.com/in/emmanuel-afful-74336517b",
        color: "hover:text-blue-400",
    },
    {
        name: "Email",
        icon: "solar:letter-bold",
        url: "mailto:emmanuelafful946@gmail.com",
        color: "hover:text-accent-400",
    },
];

const stats = [
    {
        label: "Years Experience",
        value: "4+",
        icon: "solar:case-minimalistic-bold",
    },
    { label: "Projects Completed", value: "15+", icon: "solar:code-bold" },
    { label: "Technologies", value: "20+", icon: "solar:programming-bold" },
];

// Animation states
const leftContentVisible = ref(false);
const rightContentVisible = ref(false);
const statsVisible = ref(false);
const typingStarted = ref(false);

onMounted(() => {
    // Wait for loading screen (800ms) + buffer time
    const loadingDelay = 1200;

    setTimeout(() => {
        leftContentVisible.value = true;
    }, loadingDelay);

    setTimeout(() => {
        rightContentVisible.value = true;
    }, loadingDelay + 400);

    setTimeout(() => {
        statsVisible.value = true;
    }, loadingDelay + 800);

    setTimeout(() => {
        typingStarted.value = true;
        typeWriter();
    }, loadingDelay + 500);
});
</script>

<template>
    <section
        ref="heroSectionRef"
        id="hero"
        class="relative h-screen flex items-center justify-center overflow-hidden pt-48"
        style="
            background: linear-gradient(
                180deg,
                var(--color-dark-600) 0%,
                var(--color-dark-500) 50%,
                var(--color-dark-400) 100%
            );
        "
    >
        <!-- Enhanced Animated Background Elements -->
        <div
            class="absolute inset-0 opacity-20 pointer-events-none overflow-hidden"
            ref="el => { if (el) backgroundElementsRef[0] = el as HTMLElement }"
        >
            <!-- Floating Gradient Orbs with Enhanced Animation -->
            <div
                class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-accent-500),
                        transparent
                    );
                "
            ></div>
            <div
                class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-float-delayed"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-primary-500),
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

            <!-- Animated Grid Pattern -->
            <div
                class="absolute inset-0 opacity-10 animate-grid-move"
                style="
                    background-image:
                        linear-gradient(
                            var(--color-primary-500) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            var(--color-primary-500) 1px,
                            transparent 1px
                        );
                    background-size: 50px 50px;
                "
            ></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <!-- Left Content with Animation -->
                <div
                    class="space-y-8 transition-all duration-1000 ease-out"
                    :class="
                        leftContentVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-12'
                    "
                >
                    <!-- Greeting Badge -->
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-semibold backdrop-blur-sm"
                    >
                        <Icon
                            icon="solar:hand-shake-bold"
                            class="text-lg animate-pulse"
                        />
                        <span>Welcome to my portfolio</span>
                    </div>

                    <!-- Main Heading -->
                    <div class="space-y-4">
                        <h1
                            class="text-5xl lg:text-7xl font-bold text-white font-display leading-tight"
                        >
                            Hi, I'm
                            <span class="gradient-text-primary block mt-2"
                                >Emmanuel Afful</span
                            >
                        </h1>

                        <!-- Typing Animation Role -->
                        <div
                            class="flex items-center gap-3 text-2xl lg:text-3xl font-semibold text-gray-300 min-h-[3rem]"
                        >
                            <Icon
                                icon="solar:code-bold"
                                class="text-accent-400 text-3xl flex-shrink-0"
                            />
                            <div class="text-accent-400 font-mono">
                                {{ displayedText }}
                                <span class="animate-blink">|</span>
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-lg text-gray-400 leading-relaxed max-w-xl">
                        Specializing in
                        <span class="text-accent-400 font-semibold"
                            >Go backend development</span
                        >,
                        <span class="text-primary-400 font-semibold"
                            >multi-tenant SaaS architecture</span
                        >, and
                        <span class="text-orange-400 font-semibold"
                            >DevOps practices</span
                        >. Building scalable, secure systems with clean
                        architecture and modern infrastructure.
                    </p>

                    <!-- Location & Availability -->
                    <div
                        class="flex flex-wrap items-center gap-4 text-sm text-gray-400"
                    >
                        <div class="flex items-center gap-2">
                            <Icon
                                icon="solar:map-point-bold"
                                class="text-accent-400 text-lg"
                            />
                            <span>Accra, Ghana (GMT+0)</span>
                        </div>
                        <div
                            class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400"
                        >
                            <span
                                class="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                            ></span>
                            <span>Open to relocation</span>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-4">
                        <button
                            @click="scrollToSection('#project')"
                            class="group px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-glow-accent flex items-center gap-3 relative overflow-hidden"
                            style="
                                background: linear-gradient(
                                    135deg,
                                    var(--color-accent-500),
                                    var(--color-primary-600)
                                );
                            "
                        >
                            <span class="relative z-10">View Projects</span>
                            <Icon
                                icon="solar:arrow-right-bold"
                                class="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                            />
                            <span
                                class="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></span>
                        </button>

                        <button
                            @click="isContactModalOpen = true"
                            class="px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/20 hover:border-accent-400 transition-all duration-300 hover:bg-white/5 flex items-center gap-3"
                        >
                            <Icon icon="solar:letter-bold" class="text-lg" />
                            <span>Contact Me</span>
                        </button>
                    </div>

                    <!-- Social Links -->
                    <div class="flex items-center gap-4">
                        <a
                            v-for="social in socialLinks"
                            :key="social.name"
                            :href="social.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :class="[
                                'w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 hover:border-accent-400',
                                social.color,
                            ]"
                            :aria-label="social.name"
                        >
                            <Icon :icon="social.icon" class="text-xl" />
                        </a>
                    </div>
                </div>

                <!-- Right Content with Animation -->
                <div
                    class="relative hidden lg:block transition-all duration-1000 ease-out"
                    :class="
                        rightContentVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-12'
                    "
                >
                    <!-- Code Window Mockup -->
                    <div class="relative">
                        <!-- Main Card -->
                        <div
                            class="glass-morphism rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-glow-accent transition-shadow duration-500"
                        >
                            <!-- Window Header -->
                            <div
                                class="flex items-center gap-2 mb-4 pb-4 border-b border-white/10"
                            >
                                <div class="flex gap-2">
                                    <div
                                        class="w-3 h-3 rounded-full bg-red-500"
                                    ></div>
                                    <div
                                        class="w-3 h-3 rounded-full bg-yellow-500"
                                    ></div>
                                    <div
                                        class="w-3 h-3 rounded-full bg-green-500"
                                    ></div>
                                </div>
                                <span
                                    class="text-sm text-gray-400 ml-4 font-mono"
                                    >~/backend-engineer</span
                                >
                            </div>

                            <!-- Code Content -->
                            <div class="space-y-3 font-mono text-sm">
                                <div class="flex items-start gap-3">
                                    <span class="text-gray-500">1</span>
                                    <span class="text-primary-400">type</span>
                                    <span class="text-accent-400"
                                        >Engineer</span
                                    >
                                    <span class="text-gray-400">struct {</span>
                                </div>
                                <div class="flex items-start gap-3 ml-8">
                                    <span class="text-gray-500">2</span>
                                    <span class="text-orange-400">Name</span>
                                    <span class="text-gray-400">string</span>
                                    <span class="text-gray-500"
                                        >// "Emmanuel Afful"</span
                                    >
                                </div>
                                <div class="flex items-start gap-3 ml-8">
                                    <span class="text-gray-500">3</span>
                                    <span class="text-orange-400">Role</span>
                                    <span class="text-gray-400">string</span>
                                    <span class="text-gray-500"
                                        >// "Backend Dev"</span
                                    >
                                </div>
                                <div class="flex items-start gap-3 ml-8">
                                    <span class="text-gray-500">4</span>
                                    <span class="text-orange-400">Skills</span>
                                    <span class="text-gray-400">[]string</span>
                                </div>
                                <div class="flex items-start gap-3 ml-8">
                                    <span class="text-gray-500">5</span>
                                    <span class="text-orange-400"
                                        >Location</span
                                    >
                                    <span class="text-gray-400">string</span>
                                    <span class="text-gray-500"
                                        >// "Accra, Ghana"</span
                                    >
                                </div>
                                <div class="flex items-start gap-3">
                                    <span class="text-gray-500">6</span>
                                    <span class="text-gray-400">}</span>
                                </div>
                            </div>

                            <!-- Tech Stack Icons -->
                            <div class="mt-6 pt-6 border-t border-white/10">
                                <div class="flex flex-wrap gap-4">
                                    <div
                                        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 hover:border-accent-400/50 transition-colors duration-300"
                                    >
                                        <Icon
                                            icon="simple-icons:go"
                                            class="text-accent-400 text-xl"
                                        />
                                        <span
                                            class="text-sm font-semibold text-gray-300"
                                            >Go</span
                                        >
                                    </div>
                                    <div
                                        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 hover:border-blue-400/50 transition-colors duration-300"
                                    >
                                        <Icon
                                            icon="simple-icons:postgresql"
                                            class="text-blue-400 text-xl"
                                        />
                                        <span
                                            class="text-sm font-semibold text-gray-300"
                                            >PostgreSQL</span
                                        >
                                    </div>
                                    <div
                                        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 hover:border-blue-400/50 transition-colors duration-300"
                                    >
                                        <Icon
                                            icon="simple-icons:docker"
                                            class="text-blue-400 text-xl"
                                        />
                                        <span
                                            class="text-sm font-semibold text-gray-300"
                                            >Docker</span
                                        >
                                    </div>
                                    <div
                                        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 hover:border-blue-400/50 transition-colors duration-300"
                                    >
                                        <Icon
                                            icon="simple-icons:kubernetes"
                                            class="text-blue-500 text-xl"
                                        />
                                        <span
                                            class="text-sm font-semibold text-gray-300"
                                            >K8s</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Stats Cards -->
                        <div
                            class="absolute -bottom-8 -left-8 w-48 glass-morphism rounded-xl p-4 border border-white/10 shadow-xl hover:scale-105 transition-transform duration-300"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center"
                                >
                                    <Icon
                                        icon="solar:check-circle-bold"
                                        class="text-green-400 text-xl"
                                    />
                                </div>
                                <div>
                                    <div class="text-xs text-gray-400">
                                        Success Rate
                                    </div>
                                    <div class="text-lg font-bold text-white">
                                        100%
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="absolute -top-8 -right-8 w-48 glass-morphism rounded-xl p-4 border border-white/10 shadow-xl hover:scale-105 transition-transform duration-300"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center"
                                >
                                    <Icon
                                        icon="solar:bolt-bold"
                                        class="text-accent-400 text-xl"
                                    />
                                </div>
                                <div>
                                    <div class="text-xs text-gray-400">
                                        API Response
                                    </div>
                                    <div class="text-lg font-bold text-white">
                                        &lt;100ms
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats Section with Modern Animation -->
            <div class="grid grid-cols-3 gap-6 mt-20 lg:mt-32">
                <div
                    v-for="(stat, index) in stats"
                    :key="stat.label"
                    :ref="
                        (el) => {
                            if (el) statsElementsRef[index] = el as HTMLElement;
                        }
                    "
                    class="glass-morphism-dark p-6 rounded-xl border border-white/10 text-center transition-all duration-300 hover:border-accent-500/30 hover:scale-105 hover:shadow-glow-accent group"
                >
                    <Icon
                        :icon="stat.icon"
                        class="text-4xl text-accent-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div
                        class="text-3xl font-bold text-white mb-1 font-display"
                    >
                        {{ stat.value }}
                    </div>
                    <div class="text-sm text-gray-400">{{ stat.label }}</div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div
            class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0 animate-fade-in-delayed"
            @click="scrollToSection('#about')"
        >
            <span class="text-sm text-gray-400">Scroll to explore</span>
            <div
                class="w-6 h-10 rounded-full border-2 border-accent-400/50 flex items-start justify-center p-2"
            >
                <div
                    class="w-1.5 h-3 rounded-full bg-accent-400 animate-bounce"
                ></div>
            </div>
        </div>
    </section>

    <!-- Contact Modal -->
    <ContactModal
        :is-open="isContactModalOpen"
        @close="isContactModalOpen = false"
    />
</template>

<style scoped>
/* Enhanced Animations */
@keyframes float {
    0%,
    100% {
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
    0%,
    100% {
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
    0%,
    100% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

@keyframes grid-move {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 50px 50px;
    }
}

@keyframes blink {
    0%,
    50% {
        opacity: 1;
    }
    51%,
    100% {
        opacity: 0;
    }
}

@keyframes fadeInDelayed {
    0%,
    80% {
        opacity: 0;
    }
    100% {
        opacity: 1;
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

.animate-grid-move {
    animation: grid-move 20s linear infinite;
}

.animate-blink {
    animation: blink 1s infinite;
}

.animate-fade-in-delayed {
    animation: fadeInDelayed 2s ease-out forwards;
}

/* Interactive Hover Effects */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

/* Smooth transitions for all interactive elements */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced glass morphism with better backdrop effects */
.glass-morphism {
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.glass-morphism-dark {
    backdrop-filter: blur(16px) saturate(150%);
    -webkit-backdrop-filter: blur(16px) saturate(150%);
}
</style>
