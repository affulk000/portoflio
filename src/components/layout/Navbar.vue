<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import ContactModal from "@/components/ui/ContactModal.vue";
import { useTheme } from "@/composables/useTheme";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const { theme, isDark, toggleTheme } = useTheme();

const navLinks = [
    { name: "Home", href: "#hero", icon: "solar:home-2-bold" },
    { name: "About", href: "#about", icon: "solar:user-bold" },
    { name: "Projects", href: "#project", icon: "solar:programming-bold" },
    {
        name: "Experience",
        href: "#experience",
        icon: "solar:case-minimalistic-bold",
    },
    { name: "Skills", href: "#skills", icon: "solar:code-bold" },
    { name: "Testimonials", href: "#testimonials", icon: "solar:star-bold" },
    { name: "Blog", href: "#blog", icon: "solar:document-text-bold" },
    {
        name: "Certificates",
        href: "#certificate",
        icon: "solar:diploma-verified-bold",
    },
];

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

const scrollToSection = (href: string) => {
    isMobileMenuOpen.value = false;
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
        const navbarHeight = 80;
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
        });
    }
};

const isContactModalOpen = ref(false);

const handleContactClick = () => {
    isMobileMenuOpen.value = false;
    isContactModalOpen.value = true;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <nav
        :class="[
            'fixed top-0 left-0 right-0 z-[1200] transition-all duration-500',
            isScrolled
                ? 'bg-dark-600/80 backdrop-blur-xl shadow-2xl border-b border-white/10'
                : 'bg-dark-600/40 backdrop-blur-md',
        ]"
    >
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                <!-- Logo/Brand -->
                <a
                    href="#hero"
                    @click.prevent="scrollToSection('#hero')"
                    class="flex items-center gap-3 group cursor-pointer flex-shrink-0 z-10"
                >
                    <div
                        class="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg overflow-hidden"
                    >
                        <img
                            src="/src/assets/logo.png"
                            alt="Emmanuel Afful Logo"
                            class="w-full h-full object-cover"
                        />
                    </div>
                </a>

                <!-- Desktop Navigation - Centered -->
                <div
                    class="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2"
                >
                    <a
                        v-for="link in navLinks"
                        :key="link.name"
                        :href="link.href"
                        @click.prevent="scrollToSection(link.href)"
                        class="group relative px-1.5 py-2 rounded-lg text-[15px] font-medium text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-1"
                    >
                        <Icon
                            :icon="link.icon"
                            class="text-lg transition-transform duration-300 group-hover:scale-110"
                        />
                        <span>{{ link.name }}</span>
                        <span
                            class="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                        ></span>
                    </a>
                </div>

                <!-- Theme Toggle & Contact Button (Desktop) -->
                <div class="hidden lg:flex items-center gap-3">
                    <button
                        @click="toggleTheme"
                        class="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-105"
                        :title="theme === 'system' ? 'System theme' : theme === 'dark' ? 'Dark mode' : 'Light mode'"
                    >
                        <Icon 
                            :icon="theme === 'system' ? 'solar:monitor-bold' : isDark ? 'solar:sun-bold' : 'solar:moon-bold'" 
                            class="text-lg" 
                        />
                    </button>
                    <button
                        @click="handleContactClick"
                        class="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-semibold text-[15px] transition-all duration-300 hover:scale-105 hover:shadow-glow-accent"
                    >
                        <Icon icon="solar:letter-bold" class="text-lg" />
                        <span>Contact</span>
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <button
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                    class="lg:hidden p-2.5 rounded-lg text-white hover:bg-white/10 transition-colors flex-shrink-0 z-10"
                    :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
                >
                    <Icon
                        :icon="
                            isMobileMenuOpen
                                ? 'solar:close-square-bold'
                                : 'solar:hamburger-menu-bold'
                        "
                        class="text-2xl"
                    />
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
        >
            <div
                v-if="isMobileMenuOpen"
                class="lg:hidden bg-dark-600/95 backdrop-blur-xl border-t border-white/10"
            >
                <div class="max-w-7xl mx-auto px-4 py-4">
                    <div class="flex flex-col gap-1">
                        <a
                            v-for="link in navLinks"
                            :key="link.name"
                            :href="link.href"
                            @click.prevent="scrollToSection(link.href)"
                            class="px-4 py-3.5 rounded-xl text-base font-medium text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-3 active:scale-95"
                        >
                            <Icon :icon="link.icon" class="text-xl" />
                            <span>{{ link.name }}</span>
                        </a>

                        <!-- Theme Toggle (Mobile) -->
                        <button
                            @click="toggleTheme"
                            class="px-4 py-3.5 rounded-xl text-base font-medium text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 flex items-center gap-3 active:scale-95"
                        >
                            <Icon 
                                :icon="theme === 'system' ? 'solar:monitor-bold' : isDark ? 'solar:sun-bold' : 'solar:moon-bold'" 
                                class="text-xl" 
                            />
                            <span>{{ theme === 'system' ? 'System Theme' : isDark ? 'Light Mode' : 'Dark Mode' }}</span>
                        </button>

                        <!-- Contact Button (Mobile) -->
                        <button
                            @click="handleContactClick"
                            class="mt-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-semibold transition-all duration-300 flex items-center gap-3 justify-center active:scale-95 shadow-lg"
                        >
                            <Icon icon="solar:letter-bold" class="text-xl" />
                            <span>Contact</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </nav>

    <!-- Contact Modal -->
    <ContactModal
        :is-open="isContactModalOpen"
        @close="isContactModalOpen = false"
    />

    <!-- Spacer to prevent content from going under fixed navbar -->
    <div class="h-20"></div>
</template>
