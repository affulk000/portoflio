<!-- src/components/ui/ContactModal.vue -->
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
    subject: '',
    message: ''
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);

const closeModal = () => {
    emit('close');
    // Reset form after modal closes
    setTimeout(() => {
        form.value = { name: '', email: '', subject: '', message: '' };
        isSubmitted.value = false;
    }, 300);
};

const submitForm = async () => {
    isSubmitting.value = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    isSubmitting.value = false;
    isSubmitted.value = true;
    
    // Auto close after success
    setTimeout(() => {
        closeModal();
    }, 2000);
};

// Close on escape key
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
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                
                <!-- Modal -->
                <div
                    class="relative w-full max-w-lg glass-morphism rounded-2xl border border-white/20 shadow-2xl transform transition-all duration-300"
                    :class="isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'"
                >
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b border-white/10">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center">
                                <Icon icon="solar:letter-bold" class="text-xl text-white" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-white font-display">Get In Touch</h3>
                                <p class="text-sm text-gray-400">Let's discuss your project</p>
                            </div>
                        </div>
                        <button
                            @click="closeModal"
                            class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <Icon icon="solar:close-square-bold" class="text-xl" />
                        </button>
                    </div>

                    <!-- Success State -->
                    <div v-if="isSubmitted" class="p-8 text-center">
                        <div class="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                            <Icon icon="solar:check-circle-bold" class="text-3xl text-green-400" />
                        </div>
                        <h4 class="text-xl font-bold text-white mb-2">Message Sent!</h4>
                        <p class="text-gray-400">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>

                    <!-- Form -->
                    <form v-else @submit.prevent="submitForm" class="p-6 space-y-4">
                        <!-- Name & Email Row -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    required
                                    class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors"
                                    placeholder="Your name"
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

                        <!-- Subject -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                            <select
                                v-model="form.subject"
                                required
                                class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white focus:border-accent-400 focus:outline-none transition-colors"
                            >
                                <option value="">Select a subject</option>
                                <option value="project">Project Collaboration</option>
                                <option value="job">Job Opportunity</option>
                                <option value="consultation">Technical Consultation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <!-- Message -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                            <textarea
                                v-model="form.message"
                                required
                                rows="4"
                                class="w-full px-4 py-3 rounded-xl bg-dark-400/50 border border-white/10 text-white placeholder-gray-500 focus:border-accent-400 focus:outline-none transition-colors resize-none"
                                placeholder="Tell me about your project or opportunity..."
                            ></textarea>
                        </div>

                        <!-- Submit Button -->
                        <div class="flex gap-3 pt-2">
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
                                class="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                <Icon
                                    v-if="isSubmitting"
                                    icon="solar:loading-bold"
                                    class="text-lg animate-spin"
                                />
                                <Icon
                                    v-else
                                    icon="solar:paper-plane-bold"
                                    class="text-lg"
                                />
                                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </teleport>
</template>