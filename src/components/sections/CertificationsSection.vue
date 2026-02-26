<script setup lang="ts">
import { ref } from "vue";
import { motion } from "motion-v";
import { Icon } from "@iconify/vue";
import { certifications } from "@data/certification";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";

const certificationsSectionRef = ref<HTMLElement | null>(null);

// Modern scroll animation with fade out
useModernScrollAnimation(certificationsSectionRef, {
    parallaxSpeed: 0.25,
    enableParallax: true,
    enableFade: true,
});
</script>

<template>
    <section
        ref="certificationsSectionRef"
        id="certificate"
        class="relative min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-32"
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
                    <Icon icon="mdi:certificate" class="text-lg" />
                    <span>Certifications</span>
                </div>
                <h2
                    class="text-4xl lg:text-5xl font-bold text-white mb-4 font-display"
                >
                    <span class="gradient-text-primary"
                        >Professional Certifications</span
                    >
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto px-4">
                    Verified credentials and achievements from trusted
                    institutions
                </p>
            </motion.div>

            <!-- Certifications Grid -->
            <div
                class="flex flex-wrap justify-center items-start gap-6 md:gap-8 max-w-6xl mx-auto"
            >
                <motion.div
                    v-for="(cert, index) in certifications"
                    :key="cert.uuid"
                    :initial="{ opacity: 0, y: 50 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: 'easeOut',
                    }"
                    class="glass-morphism-dark p-5 sm:p-6 rounded-xl sm:rounded-2xl card-hover group relative overflow-hidden w-full max-w-sm md:max-w-md lg:max-w-sm"
                >
                    <!-- Certificate Icon/Logo -->
                    <div class="flex items-center justify-center mb-4">
                        <div
                            class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center p-3 relative"
                            style="
                                background: linear-gradient(
                                    135deg,
                                    var(--color-accent-600),
                                    var(--color-primary-600)
                                );
                            "
                        >
                            <img
                                v-if="cert.issuerLogo"
                                :src="cert.issuerLogo"
                                :alt="cert.issuer"
                                class="w-full h-full object-contain"
                            />
                            <Icon
                                v-else
                                icon="mdi:certificate"
                                class="text-3xl sm:text-4xl text-white"
                            />
                        </div>
                    </div>

                    <!-- Certificate Title -->
                    <h3
                        class="text-lg sm:text-xl font-semibold text-white text-center mb-2 leading-tight"
                        style="font-family: var(--font-display)"
                    >
                        {{ cert.title }}
                    </h3>

                    <!-- Issuer -->
                    <p
                        class="text-sm sm:text-base text-center mb-3"
                        style="color: var(--color-accent-400)"
                    >
                        {{ cert.issuer }}
                    </p>

                    <!-- Date -->
                    <div
                        class="flex items-center justify-center gap-2 mb-4 text-xs sm:text-sm text-gray-400"
                    >
                        <Icon icon="mdi:calendar" />
                        <span>{{ cert.date }}</span>
                    </div>

                    <!-- Description -->
                    <p
                        class="text-xs sm:text-sm text-gray-300 text-center mb-4 leading-relaxed"
                    >
                        {{ cert.description }}
                    </p>

                    <!-- Credential Details -->
                    <div
                        v-if="cert.credentialId || cert.verifyUrl"
                        class="mb-4 p-3 rounded-lg  bg-dark-300/50"

                    >
                        <div class="space-y-2 text-xs">
                            <div
                                v-if="cert.credentialId"
                                class="flex flex-col gap-1"
                            >
                                <span class="text-gray-400 font-medium"
                                    >Credential ID:</span
                                >
                                <span
                                    class="text-gray-300 font-mono text-xs break-all"
                                    >{{ cert.credentialId }}</span
                                >
                            </div>
                            <div v-if="cert.verifyUrl">
                                <a
                                    :href="cert.verifyUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-[var(--color-accent-400)] hover:text-[var(--color-accent-300)] transition-colors flex items-center justify-center gap-1 font-medium"
                                >
                                    <Icon icon="mdi:certificate" />
                                    Verify Certificate
                                    <Icon
                                        icon="mdi:open-in-new"
                                        class="text-xs"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Skills Tags -->
                    <div class="flex flex-wrap gap-1.5 justify-center">
                        <span
                            v-for="skill in cert.skills.slice(0, 4)"
                            :key="skill"
                            class="px-2 py-0.5 rounded-full text-xs font-medium border bg-dark-300/50 border-white/10"
                        >
                            {{ skill }}
                        </span>
                        <span
                            v-if="cert.skills.length > 4"
                            class="px-2 py-0.5 rounded-full text-xs font-medium"
                            style="color: var(--color-accent-400)"
                        >
                            +{{ cert.skills.length - 4 }} more
                        </span>
                    </div>

                    <!-- Background Glow Effect -->
                    <div
                        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    >
                        <div
                            class="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
                            style="
                                background: var(--color-primary-500);
                                opacity: 0.15;
                            "
                        ></div>
                    </div>
                </motion.div>
            </div>

            <!-- Empty State -->
            <div v-if="certifications.length === 0" class="text-center py-12">
                <Icon
                    icon="mdi:certificate-outline"
                    class="text-6xl mb-4"
                    style="color: var(--color-dark-300)"
                />
                <p class="text-body text-gray-400">No certifications yet</p>
            </div>
        </div>
    </section>
</template>
