<script setup lang="ts">
import { motion } from "motion-v";

defineProps({
    title: String,
    subtitle: String,
});
</script>

<template>
    <div class="w-full">
        <motion.div
            v-if="title || subtitle"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="text-center mb-12 lg:mb-16 px-4"
        >
            <h3
                v-if="title"
                class="text-3xl lg:text-4xl font-bold mb-3 font-display gradient-text-accent"
            >
                {{ title }}
            </h3>
            <p
                v-if="subtitle"
                class="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
                {{ subtitle }}
            </p>
        </motion.div>

        <div class="max-w-4xl mx-auto px-4 lg:px-6 relative">
            <slot />
        </div>
    </div>
</template>
