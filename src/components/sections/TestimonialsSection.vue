<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import { motion, AnimatePresence } from "motion-v";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";
import { testimonials } from "@data/testimonials";
import TestimonialModal from "@/components/ui/TestimonialModal.vue";

const DURATION = 5000;
const BAR_WIDTH = 50;
const CIRCLE_SIZE = 12;

const testimonialsRef = ref<HTMLElement | null>(null);
const isTestimonialModalOpen = ref(false);
const activeIndex = ref(0);
let timeoutId: number | null = null;

const currentTestimonial = computed(() => testimonials[activeIndex.value] || testimonials[0]);

const startTimer = () => {
    timeoutId = window.setTimeout(() => {
        activeIndex.value = (activeIndex.value + 1) % testimonials.length;
        startTimer();
    }, DURATION);
};

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
});

useModernScrollAnimation(testimonialsRef, {
    parallaxSpeed: 0.2,
    enableParallax: true,
    enableFade: true,
});
</script>

<template>
    <section
        ref="testimonialsRef"
        id="testimonials"
        class="relative py-24 lg:py-32 overflow-hidden"
    >
        <!-- Noise Texture -->
        <div class="absolute inset-0 opacity-50" style="background-image: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0); background-size: 20px 20px" />
        <div class="absolute inset-0 opacity-50 hidden dark:block" style="background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0); background-size: 20px 20px" />
        
        <!-- Glass Blur Blobs -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 bg-accent-400 dark:bg-accent-500" style="animation: float 20s ease-in-out infinite" />
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div class="text-center mb-16 lg:mb-20">
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-semibold mb-6">
                    <Icon icon="solar:star-bold" class="text-lg" />
                    <span>Testimonials</span>
                </div>
                <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6 font-display">
                    What People
                    <span class="gradient-text-primary block mt-2">Say About My Work</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Feedback from clients, colleagues, and project stakeholders
                </p>
            </div>

            <div class="flex flex-col items-center max-w-5xl mx-auto">
                <div class="min-h-[120px] w-full mb-8">
                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            v-if="currentTestimonial"
                            :key="activeIndex"
                            :initial="{ opacity: 0, y: 30 }"
                            :animate="{ opacity: 1, y: 0 }"
                            :exit="{ opacity: 0, y: -30 }"
                            :transition="{ type: 'spring', duration: 0.5 }"
                            class="text-center text-2xl md:text-4xl font-semibold text-white leading-tight"
                        >
                            "{{ currentTestimonial.content }}"
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                <div class="flex items-center justify-center gap-8 pt-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            v-if="currentTestimonial"
                            :key="`author-${activeIndex}`"
                            :initial="{ opacity: 0, filter: 'blur(8px)' }"
                            :animate="{ opacity: 1, filter: 'blur(0px)' }"
                            :exit="{ opacity: 0, filter: 'blur(8px)' }"
                            :transition="{ type: 'spring', duration: 0.5 }"
                            class="flex items-center gap-4"
                        >
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center">
                                <span class="text-white font-bold text-lg">{{ currentTestimonial.name.charAt(0) }}</span>
                            </div>
                            <div class="h-8 border-l border-gray-600 mx-4"></div>
                            <div class="text-left">
                                <div class="text-lg font-medium text-white italic">{{ currentTestimonial.name }}</div>
                                <div class="text-base text-gray-400">{{ currentTestimonial.role }} at {{ currentTestimonial.company }}</div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div class="flex justify-center gap-3 mt-8">
                    <motion.span
                        v-for="(testimonial, i) in testimonials"
                        :key="`indicator-${testimonial.uuid}`"
                        :animate="{
                            width: i === activeIndex ? BAR_WIDTH : CIRCLE_SIZE,
                            height: CIRCLE_SIZE,
                            borderRadius: i === activeIndex ? 8 : 999
                        }"
                        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
                        class="relative overflow-hidden bg-white/10"
                    >
                        <AnimatePresence>
                            <motion.div
                                v-if="i === activeIndex"
                                :key="`progress-${activeIndex}`"
                                :initial="{ width: 0 }"
                                :animate="{ width: '100%' }"
                                :exit="{ width: 0 }"
                                :transition="{ duration: DURATION / 1000, ease: 'linear' }"
                                class="absolute top-0 left-0 h-full rounded-lg bg-accent-400"
                            />
                        </AnimatePresence>
                    </motion.span>
                </div>
            </div>

            <div class="text-center mt-16">
                <button
                    @click="isTestimonialModalOpen = true"
                    class="group px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-glow-accent flex items-center gap-3 mx-auto relative overflow-hidden"
                    style="background: linear-gradient(135deg, var(--color-orange-500), var(--color-accent-600));"
                >
                    <span class="relative z-10">Share Your Experience</span>
                    <Icon icon="solar:add-circle-bold" class="text-lg relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <span class="absolute inset-0 bg-gradient-to-r from-orange-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
            </div>
        </div>
    </section>

    <TestimonialModal :is-open="isTestimonialModalOpen" @close="isTestimonialModalOpen = false" />
</template>
