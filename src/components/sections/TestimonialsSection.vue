<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Icon } from "@iconify/vue";
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

const currentTestimonial = computed(() => testimonials[activeIndex.value]);

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
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div
                class="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float"
                style="background: radial-gradient(circle, var(--color-accent-500), transparent);"
            ></div>
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
                    <Transition name="fade" mode="out-in">
                        <blockquote :key="activeIndex" class="text-center text-2xl md:text-4xl font-semibold text-white leading-tight">
                            "{{ currentTestimonial.content }}"
                        </blockquote>
                    </Transition>
                </div>

                <div class="flex items-center justify-center gap-8 pt-8">
                    <Transition name="blur" mode="out-in">
                        <div :key="`author-${activeIndex}`" class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center">
                                <span class="text-white font-bold text-lg">{{ currentTestimonial.name.charAt(0) }}</span>
                            </div>
                            <div class="h-8 border-l border-gray-600 mx-4"></div>
                            <div class="text-left">
                                <div class="text-lg font-medium text-white italic">{{ currentTestimonial.name }}</div>
                                <div class="text-base text-gray-400">{{ currentTestimonial.role }} at {{ currentTestimonial.company }}</div>
                            </div>
                        </div>
                    </Transition>
                </div>

                <div class="flex justify-center gap-3 mt-8">
                    <span
                        v-for="(testimonial, i) in testimonials"
                        :key="`indicator-${testimonial.uuid}`"
                        class="relative overflow-hidden bg-white/10 transition-all duration-300"
                        :style="{
                            width: i === activeIndex ? `${BAR_WIDTH}px` : `${CIRCLE_SIZE}px`,
                            height: `${CIRCLE_SIZE}px`,
                            borderRadius: i === activeIndex ? '8px' : '999px'
                        }"
                    >
                        <Transition name="progress">
                            <div v-if="i === activeIndex" :key="`progress-${activeIndex}`" class="absolute top-0 left-0 h-full rounded-lg bg-accent-400 progress-bar" />
                        </Transition>
                    </span>
                </div>
            </div>

            <div class="text-center mt-16">
                <button
                    @click="isTestimonialModalOpen = true"
                    class="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
                >
                    <Icon icon="solar:star-bold" class="text-lg" />
                    <span>Share Your Experience</span>
                    <Icon icon="solar:add-circle-bold" class="text-lg" />
                </button>
            </div>
        </div>
    </section>

    <TestimonialModal :is-open="isTestimonialModalOpen" @close="isTestimonialModalOpen = false" />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.5s ease; }
.fade-enter-from { opacity: 0; transform: translateY(30px); }
.fade-leave-to { opacity: 0; transform: translateY(-30px); }

.blur-enter-active, .blur-leave-active { transition: all 0.5s ease; }
.blur-enter-from { opacity: 0; filter: blur(8px); }
.blur-leave-to { opacity: 0; filter: blur(8px); }

.progress-bar { animation: fillBar 5s linear; }
@keyframes fillBar { from { width: 0; } to { width: 100%; } }
</style>
