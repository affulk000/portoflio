<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
    isOpen: boolean;
}

interface Emits {
    (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = ref({
    name: '',
    email: '',
    role: '',
    company: '',
    rating: 5,
    content: '',
    projectWorked: '',
    linkedinUrl: ''
});

const hoverRating = ref(0);

const setRating = (rating: number) => {
    form.value.rating = rating;
};

const setHoverRating = (rating: number) => {
    hoverRating.value = rating;
};

const clearHoverRating = () => {
    hoverRating.value = 0;
};

const isSubmitting = ref(false);
const isSubmitted = ref(false);

const closeModal = () => {
    emit('close');
    setTimeout(() => {
        form.value = {
            name: '',
            email: '',
            role: '',
            company: '',
            rating: 5,
            content: '',
            projectWorked: '',
            linkedinUrl: ''
        };
        isSubmitted.value = false;
    }, 300);
};

const submitTestimonial = async () => {
    isSubmitting.value = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    isSubmitting.value = false;
    isSubmitted.value = true;
    
    setTimeout(() => {
        closeModal();
    }, 3000);
};

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        document.addEventListener('keydown', handleEscape);
    } else {
        document.removeEventListener('keydown', handleEscape);
    }
});

const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        closeModal();
    }
};
</script>

<template>
    <teleport to="body">
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                @click.self="closeModal"
            >
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                
                <div
                    class="relative w-full max-w-2xl glass-morphism rounded-3xl border border-white/30 shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto"
                    style="background: rgba(15, 15, 25, 0.8);"
                >
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg">
                                <Icon icon="solar:star-bold" class="text-2xl text-white" />
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white font-display">Share Your Experience</h3>
                                <p class="text-sm text-gray-400">Help others by sharing your testimonial</p>
                            </div>
                        </div>
                        <button
                            @click="closeModal"
                            class="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                        >
                            <Icon icon="solar:close-square-bold" class="text-xl" />
                        </button>
                    </div>

                    <!-- Success State -->
                    <div v-if="isSubmitted" class="p-8 text-center">
                        <div class="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                            <Icon icon="solar:check-circle-bold" class="text-3xl text-green-400" />
                        </div>
                        <h4 class="text-xl font-bold text-white mb-2">Thank You!</h4>
                        <p class="text-gray-400">Your testimonial has been submitted for review. It will appear on the portfolio once approved.</p>
                    </div>

                    <!-- Form -->
                    <form v-else @submit.prevent="submitTestimonial" class="p-6 space-y-4">
                        <!-- Personal Info Row -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                                <input
                                    v-model="form.email"
                                    type="email"
                                    required
                                    class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <!-- Professional Info Row -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                                <input
                                    v-model="form.role"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                    placeholder="e.g. Senior Developer"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                                <input
                                    v-model="form.company"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                    placeholder="Company name"
                                />
                            </div>
                        </div>

                        <!-- Interactive Rating -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-3">Rating *</label>
                            <div class="flex items-center gap-1 mb-2">
                                <button
                                    v-for="star in 5"
                                    :key="star"
                                    type="button"
                                    @click="setRating(star)"
                                    @mouseenter="setHoverRating(star)"
                                    @mouseleave="clearHoverRating"
                                    class="text-3xl transition-all duration-200 hover:scale-110 focus:outline-none focus:scale-110"
                                    :class="{
                                        'text-yellow-400 drop-shadow-lg': star <= (hoverRating || form.rating),
                                        'text-gray-600 hover:text-yellow-300': star > (hoverRating || form.rating)
                                    }"
                                >
                                    <Icon icon="solar:star-bold" />
                                </button>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-400 text-sm">{{ form.rating }}/5 stars</span>
                                <span class="text-xs text-gray-500">
                                    {{ form.rating === 5 ? 'Excellent!' : form.rating === 4 ? 'Very Good' : form.rating === 3 ? 'Good' : form.rating === 2 ? 'Fair' : 'Poor' }}
                                </span>
                            </div>
                        </div>

                        <!-- Project Worked On -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Project/Work Context</label>
                            <input
                                v-model="form.projectWorked"
                                type="text"
                                class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                placeholder="e.g. Krafti Vibe SaaS Platform, E-commerce API"
                            />
                        </div>

                        <!-- Testimonial Content -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Your Testimonial *</label>
                            <textarea
                                v-model="form.content"
                                required
                                rows="4"
                                class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors resize-none"
                                placeholder="Share your experience working with Emmanuel. What made the collaboration successful? What results were achieved?"
                            ></textarea>
                        </div>

                        <!-- LinkedIn URL -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile (Optional)</label>
                            <input
                                v-model="form.linkedinUrl"
                                type="url"
                                class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                placeholder="https://linkedin.com/in/yourprofile"
                            />
                        </div>

                        <!-- Submit Button -->
                        <div class="flex gap-3 pt-4">
                            <button
                                type="button"
                                @click="closeModal"
                                class="flex-1 px-6 py-3 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                class="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                <Icon
                                    v-if="isSubmitting"
                                    icon="solar:loading-bold"
                                    class="text-lg animate-spin"
                                />
                                <Icon
                                    v-else
                                    icon="solar:star-bold"
                                    class="text-lg"
                                />
                                {{ isSubmitting ? 'Submitting...' : 'Submit Testimonial' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </teleport>
</template>