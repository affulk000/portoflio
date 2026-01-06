<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrollProgress = ref(0);

const updateScrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollableHeight = documentHeight - windowHeight;
    const progress = (scrollTop / scrollableHeight) * 100;

    scrollProgress.value = Math.min(Math.max(progress, 0), 100);
};

// Throttle scroll updates for better performance
let rafId: number | null = null;
const handleScroll = () => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId = null;
    });
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
});
</script>

<template>
    <div
        class="fixed top-0 left-0 right-0 z-[1300] h-1 overflow-hidden pointer-events-none"
    >
        <!-- Background track -->
        <div class="absolute inset-0 bg-dark-300/20"></div>

        <!-- Animated progress bar -->
        <div
            class="absolute inset-0 origin-left transition-transform duration-100 ease-out"
            :style="{
                transform: `scaleX(${scrollProgress / 100})`,
                background:
                    'linear-gradient(90deg, var(--color-accent-500), var(--color-primary-500))',
                boxShadow: '0 0 20px var(--color-accent-500)',
            }"
        >
            <!-- Glow effect that follows the progress -->
            <div
                class="absolute right-0 top-0 bottom-0 w-8 blur-lg opacity-75"
                style="
                    background: linear-gradient(
                        90deg,
                        transparent,
                        var(--color-accent-400)
                    );
                "
            ></div>
        </div>
    </div>
</template>
