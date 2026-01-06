<script setup lang="ts">
import { ref, computed } from "vue";
import { motion } from "motion-v";
import { Icon } from "@iconify/vue";
import TimelineFeed from "../ui/TimelineFeed.vue";
import TimelineItem from "../ui/TimelineItem.vue";
import { experiences } from "@data/experience.ts";
import { education } from "@data/education.ts";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";

const experienceSectionRef = ref<HTMLElement | null>(null);

// Modern scroll animation with fade out
useModernScrollAnimation(experienceSectionRef, {
    parallaxSpeed: 0.2,
    enableParallax: true,
    enableFade: true,
});

const activeTab = ref<"experience" | "education">("experience");

const formattedEducation = computed(() => {
    return education.map((edu) => {
        // Extract years from dates
        const startYear = edu.startDate.split("-")[0];
        const endYear = edu.endDate.split("-")[0];

        return {
            uuid: edu.uuid,
            icon: "solar:diploma-verified-bold",
            title: edu.title,
            institution: edu.institution,
            location: edu.location,
            date: `${startYear} - ${endYear}`,
            description: edu.description,
            tags: edu.tags || [],
        };
    });
});
</script>

<template>
    <section
        ref="experienceSectionRef"
        id="experience"
        class="relative overflow-hidden py-24 lg:py-32"
        style="
            background: linear-gradient(
                180deg,
                var(--color-dark-500) 0%,
                var(--color-dark-400) 50%,
                var(--color-dark-500) 100%
            );
        "
    >
        <!-- Animated Background Elements -->
        <div class="absolute inset-0 opacity-30 pointer-events-none">
            <div
                class="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-accent-500),
                        transparent
                    );
                "
            ></div>
            <div
                class="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-primary-500),
                        transparent
                    );
                "
            ></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <!-- Section Header -->
            <motion.div
                :initial="{ opacity: 0, y: 30 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: 'easeOut' }"
                class="text-center mb-12 lg:mb-16"
            >
                <h2
                    class="text-4xl lg:text-5xl font-bold mb-4 font-display gradient-text-primary"
                >
                    Experience & Education
                </h2>
                <p
                    class="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                    My professional journey and academic background
                </p>
            </motion.div>

            <!-- Modern Tab Switcher -->
            <motion.div
                :initial="{ opacity: 0, scale: 0.95 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 0.5, delay: 0.2 }"
                class="flex justify-center mb-12 lg:mb-16"
            >
                <div
                    class="inline-flex gap-2 p-2 rounded-2xl bg-dark-300/50 backdrop-blur-sm border border-white/10"
                >
                    <button
                        @click="activeTab = 'experience'"
                        :class="[
                            'relative px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300',
                            activeTab === 'experience'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-200',
                        ]"
                    >
                        <!-- Active Background -->
                        <span
                            v-if="activeTab === 'experience'"
                            class="absolute inset-0 rounded-xl transition-all duration-300 shadow"
                            style="
                                background: linear-gradient(
                                    135deg,
                                    var(--color-accent-500),
                                    var(--color-primary-600)
                                );
                            "
                        ></span>

                        <span class="relative flex items-center gap-2.5">
                            <Icon
                                icon="solar:case-minimalistic-bold"
                                class="text-lg lg:text-xl"
                            />
                            <span>Experience</span>
                        </span>
                    </button>

                    <button
                        @click="activeTab = 'education'"
                        :class="[
                            'relative px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300',
                            activeTab === 'education'
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-200',
                        ]"
                    >
                        <!-- Active Background -->
                        <span
                            v-if="activeTab === 'education'"
                            class="absolute inset-0 rounded-xl transition-all duration-300"
                            style="
                                background: linear-gradient(
                                    135deg,
                                    var(--color-accent-500),
                                    var(--color-primary-600)
                                );
                                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                            "
                        ></span>

                        <span class="relative flex items-center gap-2.5">
                            <Icon
                                icon="solar:diploma-verified-bold"
                                class="text-lg lg:text-xl"
                            />
                            <span>Education</span>
                        </span>
                    </button>
                </div>
            </motion.div>

            <!-- Experience Timeline -->
            <motion.div
                v-show="activeTab === 'experience'"
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, ease: 'easeOut' }"
            >
                <TimelineFeed>
                    <TimelineItem
                        v-for="(item, index) in experiences"
                        :key="item.uuid"
                        :icon="item.icon"
                        :title="item.title"
                        :company="item.company"
                        :location="item.location"
                        :employment-type="item.type"
                        :date="item.date"
                        :description="item.description"
                        :responsibilities="item.responsibilities"
                        :achievements="item.achievements"
                        :tags="item.technologies"
                        :is-last="index === experiences.length - 1"
                    />
                </TimelineFeed>
            </motion.div>

            <!-- Education Timeline -->
            <motion.div
                v-show="activeTab === 'education'"
                :initial="{ opacity: 0, x: -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.4, ease: 'easeOut' }"
            >
                <TimelineFeed>
                    <TimelineItem
                        v-for="(item, index) in formattedEducation"
                        :key="item.uuid"
                        :icon="item.icon"
                        :title="item.title"
                        :institution="item.institution"
                        :location="item.location"
                        :date="item.date"
                        :description="item.description"
                        :tags="item.tags"
                        :is-last="index === formattedEducation.length - 1"
                    />
                </TimelineFeed>
            </motion.div>
        </div>
    </section>
</template>
