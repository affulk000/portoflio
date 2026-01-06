<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";
import { testimonials } from "@data/testimonials";
import TestimonialModal from "@/components/ui/TestimonialModal.vue";

const testimonialsRef = ref<HTMLElement | null>(null);
const isTestimonialModalOpen = ref(false);

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
        style="
            background: linear-gradient(
                180deg,
                var(--color-dark-500) 0%,
                var(--color-dark-400) 50%,
                var(--color-dark-500) 100%
            );
        "
    >
        <!-- Background Elements -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div
                class="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-accent-500),
                        transparent
                    );
                "
            ></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <!-- Section Header -->
            <div class="text-center mb-16 lg:mb-20">
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-semibold mb-6"
                >
                    <Icon icon="solar:star-bold" class="text-lg" />
                    <span>Testimonials</span>
                </div>
                <h2
                    class="text-4xl lg:text-5xl font-bold text-white mb-6 font-display"
                >
                    What People
                    <span class="gradient-text-primary block mt-2">Say About My Work</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Feedback from clients, colleagues, and project stakeholders
                </p>
            </div>

            <!-- Testimonials Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div
                    v-for="(testimonial, _index) in testimonials.slice(0, 6)"
                    :key="testimonial.uuid"
                    class="glass-morphism-dark p-6 rounded-xl border border-white/10 hover:border-accent-500/30 transition-all duration-300 group hover:scale-105"
                >
                    <!-- Rating -->
                    <div class="flex items-center gap-1 mb-4">
                        <Icon
                            v-for="star in testimonial.rating"
                            :key="star"
                            icon="solar:star-bold"
                            class="text-lg text-yellow-400"
                        />
                    </div>

                    <!-- Content -->
                    <blockquote class="text-gray-300 leading-relaxed mb-6 text-sm">
                        "{{ testimonial.content }}"
                    </blockquote>

                    <!-- Author -->
                    <div class="flex items-center gap-3">
                        <div
                            class="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center"
                        >
                            <span class="text-white font-bold text-lg">
                                {{ testimonial.name.charAt(0) }}
                            </span>
                        </div>
                        <div>
                            <div class="text-white font-semibold">{{ testimonial.name }}</div>
                            <div class="text-gray-400 text-sm">
                                {{ testimonial.role }} at {{ testimonial.company }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Testimonial Button -->
            <div class="text-center mt-12">
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

    <!-- Testimonial Modal -->
    <TestimonialModal
        :is-open="isTestimonialModalOpen"
        @close="isTestimonialModalOpen = false"
    />
</template>