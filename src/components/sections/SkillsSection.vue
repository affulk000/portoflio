<script setup lang="ts">
import { ref } from "vue";
import { motion } from "motion-v";
import { Icon } from "@iconify/vue";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";

const skillsSectionRef = ref<HTMLElement | null>(null);

// Modern scroll animation with fade out
useModernScrollAnimation(skillsSectionRef, {
    parallaxSpeed: 0.3,
    enableParallax: true,
    enableFade: true,
});

const skills = [
    {
        category: "Backend",
        items: ["Go", "PostgreSQL", "Redis", "REST APIs", "GraphQL"],
        icon: "solar:server-bold",
        color: "accent",
    },
    {
        category: "DevOps",
        items: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Terraform"],
        icon: "solar:widget-5-bold",
        color: "primary",
    },
    {
        category: "Architecture",
        items: [
            "Clean Architecture",
            "DDD",
            "Microservices",
            "Multi-tenant SaaS",
        ],
        icon: "solar:code-bold",
        color: "orange",
    },
];
</script>

<template>
    <section
        ref="skillsSectionRef"
        id="skills"
        class="relative min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-32"
        style="
            background: linear-gradient(
                180deg,
                var(--color-dark-400) 0%,
                var(--color-dark-500) 100%
            );
        "
    >
        <div class="container-custom w-full">
            <!-- Section Header -->
            <motion.div
                :initial="{ opacity: 0, y: 30 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: 'easeOut' }"
                class="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            >
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-semibold mb-4"
                >
                    <Icon icon="solar:programming-bold" class="text-lg" />
                    <span>Skills</span>
                </div>
                <h2
                    class="text-4xl lg:text-5xl font-bold text-white mb-4 font-display"
                >
                    <span class="gradient-text-primary"
                        >Skills & Technologies</span
                    >
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto px-4">
                    Technologies and tools I work with
                </p>
            </motion.div>

            <!-- Skills Grid -->
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
            >
                <motion.div
                    v-for="(skill, index) in skills"
                    :key="skill.category"
                    :initial="{ opacity: 0, y: 50 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: 'easeOut',
                    }"
                    class="glass-morphism-dark p-6 rounded-xl card-hover group relative overflow-hidden"
                >
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-12 h-12 rounded-xl flex items-center justify-center"
                            :class="{
                                'bg-accent-500/10 border border-accent-500/20':
                                    skill.color === 'accent',
                                'bg-primary-500/10 border border-primary-500/20':
                                    skill.color === 'primary',
                                'bg-orange-500/10 border border-orange-500/20':
                                    skill.color === 'orange',
                            }"
                        >
                            <Icon
                                :icon="skill.icon"
                                class="text-2xl"
                                :class="{
                                    'text-accent-400': skill.color === 'accent',
                                    'text-primary-400':
                                        skill.color === 'primary',
                                    'text-orange-400': skill.color === 'orange',
                                }"
                            />
                        </div>
                        <h3 class="text-xl font-bold text-white font-display">
                            {{ skill.category }}
                        </h3>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="item in skill.items"
                            :key="item"
                            class="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                            :class="{
                                'bg-accent-500/10 text-accent-400 border-accent-500/20':
                                    skill.color === 'accent',
                                'bg-primary-500/10 text-primary-400 border-primary-500/20':
                                    skill.color === 'primary',
                                'bg-orange-500/10 text-orange-400 border-orange-500/20':
                                    skill.color === 'orange',
                            }"
                        >
                            {{ item }}
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
</template>
