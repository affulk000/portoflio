<script setup lang="ts">
import { ref } from "vue";
import { motion } from "motion-v";
import { Icon } from "@iconify/vue";

interface Props {
    // Common fields
    icon: string;
    title: string;
    date: string;
    description: string;
    tags?: string[];
    isLast?: boolean;

    // Experience fields
    company?: string;
    location?: string;
    employmentType?: string;
    responsibilities?: string[];
    achievements?: string[];

    // Education fields (these will map to company/location)
    institution?: string;

    // Certificate fields
    issuerLogo?: string;
    verifyUrl?: string;
    credentialId?: string;
}

const props = defineProps<Props>();

// Map institution to company for education items
const displayCompany = props.company || props.institution;

const showDetails = ref(false);
</script>

<template>
    <motion.div
        :initial="{ opacity: 0, x: -30 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="grid grid-cols-[auto_1fr] gap-4 lg:gap-6 relative mb-6 lg:mb-8"
    >
        <!-- Left Icon Section -->
        <div class="flex flex-col items-center relative">
            <!-- Icon Circle -->
            <div
                class="relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center shrink-0 z-10 transition-all duration-300 hover:scale-110"
                style="
                    background: linear-gradient(
                        135deg,
                        var(--color-accent-500),
                        var(--color-primary-600)
                    );
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                "
            >
                <Icon
                    :icon="icon || 'solar:briefcase-bold'"
                    class="text-2xl lg:text-3xl text-white"
                />
            </div>

            <!-- Connecting Line -->
            <div
                v-if="!isLast"
                class="w-[2px] flex-1 mt-3 min-h-[40px]"
                style="
                    background: linear-gradient(
                        to bottom,
                        var(--color-accent-500) 0%,
                        var(--color-primary-600) 50%,
                        transparent 100%
                    );
                "
            ></div>
        </div>

        <!-- Right Content Section -->
        <div
            class="group bg-dark-300/50 backdrop-blur-sm p-5 lg:p-7 rounded-2xl border border-white/5 transition-all duration-300 hover:border-accent-500/30 hover:bg-dark-300/70 hover:shadow-2xl hover:translate-x-1"
        >
            <!-- Header Section -->
            <div
                class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 mb-4"
            >
                <div class="flex-1 min-w-0">
                    <!-- Title -->
                    <h3
                        class="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight font-display"
                    >
                        {{ title }}
                    </h3>

                    <!-- Company/Institution with Logo -->
                    <div
                        v-if="displayCompany"
                        class="flex items-center gap-2 mb-2"
                    >
                        <img
                            v-if="issuerLogo"
                            :src="issuerLogo"
                            :alt="displayCompany"
                            class="w-5 h-5 rounded object-contain"
                        />
                        <p
                            class="text-base lg:text-lg font-semibold text-accent-400"
                        >
                            {{ displayCompany }}
                        </p>
                    </div>

                    <!-- Location & Employment Type -->
                    <div
                        v-if="location || employmentType"
                        class="flex flex-wrap items-center gap-3 text-sm text-gray-400"
                    >
                        <span v-if="location" class="flex items-center gap-1.5">
                            <Icon
                                icon="solar:map-point-bold"
                                class="text-base text-accent-400"
                            />
                            {{ location }}
                        </span>
                        <span
                            v-if="employmentType"
                            class="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-primary-500/20 text-primary-300 border border-primary-500/30"
                        >
                            {{ employmentType }}
                        </span>
                    </div>
                </div>

                <!-- Date Badge -->
                <div
                    class="self-start px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap bg-accent-500/10 text-accent-400 border border-accent-500/20"
                >
                    {{ date }}
                </div>
            </div>

            <!-- Description -->
            <p class="text-base text-gray-300 leading-relaxed mb-5">
                {{ description }}
            </p>

            <!-- Certificate Details -->
            <div
                v-if="credentialId || verifyUrl"
                class="mb-5 p-4 rounded-xl bg-dark-400/50 border border-white/5"
            >
                <div class="space-y-2 text-sm">
                    <div v-if="credentialId" class="flex items-start gap-2">
                        <span class="text-gray-400 font-semibold min-w-fit"
                            >Credential ID:</span
                        >
                        <span class="text-gray-300 font-mono break-all">
                            {{ credentialId }}
                        </span>
                    </div>
                    <div v-if="verifyUrl">
                        <a
                            :href="verifyUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors font-medium"
                        >
                            <Icon
                                icon="solar:verified-check-bold"
                                class="text-lg"
                            />
                            Verify Certificate
                            <Icon
                                icon="solar:arrow-right-up-bold"
                                class="text-sm"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <!-- Expandable Details (for Experience only) -->
            <div v-if="responsibilities || achievements">
                <button
                    @click="showDetails = !showDetails"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-all duration-300 mb-4 group/btn"
                >
                    <Icon
                        :icon="
                            showDetails
                                ? 'solar:alt-arrow-up-bold'
                                : 'solar:alt-arrow-down-bold'
                        "
                        class="text-lg transition-transform duration-300"
                        :class="{ 'rotate-180': showDetails }"
                    />
                    {{ showDetails ? "Hide" : "Show" }} Details
                </button>

                <motion.div
                    v-if="showDetails"
                    :initial="{ opacity: 0, height: 0 }"
                    :animate="{ opacity: 1, height: 'auto' }"
                    :transition="{ duration: 0.3, ease: 'easeOut' }"
                    class="space-y-5 overflow-hidden"
                >
                    <!-- Responsibilities -->
                    <div
                        v-if="responsibilities && responsibilities.length"
                        class="space-y-3"
                    >
                        <h4
                            class="text-sm font-bold uppercase tracking-wide text-primary-300 flex items-center gap-2"
                        >
                            <Icon
                                icon="solar:checklist-minimalistic-bold"
                                class="text-lg"
                            />
                            Key Responsibilities
                        </h4>
                        <ul class="space-y-2 ml-1">
                            <li
                                v-for="(item, idx) in responsibilities"
                                :key="idx"
                                class="text-sm text-gray-300 flex items-start gap-3 leading-relaxed"
                            >
                                <Icon
                                    icon="solar:check-circle-bold"
                                    class="text-accent-400 mt-0.5 flex-shrink-0 text-base"
                                />
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Achievements -->
                    <div
                        v-if="achievements && achievements.length"
                        class="space-y-3"
                    >
                        <h4
                            class="text-sm font-bold uppercase tracking-wide text-orange-400 flex items-center gap-2"
                        >
                            <Icon icon="solar:cup-star-bold" class="text-lg" />
                            Key Achievements
                        </h4>
                        <ul class="space-y-2 ml-1">
                            <li
                                v-for="(item, idx) in achievements"
                                :key="idx"
                                class="text-sm text-gray-300 flex items-start gap-3 leading-relaxed"
                            >
                                <Icon
                                    icon="solar:star-bold"
                                    class="text-orange-400 mt-0.5 flex-shrink-0 text-base"
                                />
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>

            <!-- Tags/Technologies -->
            <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mt-5">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary-500/10 text-primary-300 border border-primary-500/20 transition-all duration-300 hover:bg-primary-500/20 hover:border-primary-500/40 hover:scale-105"
                >
                    {{ tag }}
                </span>
            </div>
        </div>
    </motion.div>
</template>
