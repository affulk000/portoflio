<script setup lang="ts">
import { Icon } from "@iconify/vue";

const currentYear = new Date().getFullYear();

const socialLinks = [
    {
        name: "GitHub",
        icon: "mdi:github",
        url: "https://github.com/affulk000",
    },
    {
        name: "LinkedIn",
        icon: "mdi:linkedin",
        url: "https://www.linkedin.com/in/emmanuel-afful-74336517b",
    },
    {
        name: "Email",
        icon: "solar:letter-bold",
        url: "mailto:emmanuel.afful@proton.me",
    },
];

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
    <footer
        class="relative py-12 lg:py-16 border-t dark:border-white/10 light:border-gray-200 dark:bg-dark-600 light:bg-gray-50"
    >
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid md:grid-cols-3 gap-8 lg:gap-12 mb-8">
                <!-- Brand Section -->
                <div class="space-y-4">
                    <h3
                        class="text-2xl font-bold dark:text-white light:text-gray-900 font-display gradient-text-primary"
                    >
                        Emmanuel Afful
                    </h3>
                    <p
                        class="text-sm dark:text-gray-400 light:text-gray-600 leading-relaxed"
                    >
                        System Software Engineer specializing in backend
                        development, multi-tenant SaaS architecture, and DevOps
                        practices.
                    </p>
                </div>

                <!-- Quick Links -->
                <div class="space-y-4">
                    <h4
                        class="text-lg font-semibold dark:text-white light:text-gray-900 font-display"
                    >
                        Quick Links
                    </h4>
                    <ul class="space-y-2">
                        <li>
                            <a
                                href="#hero"
                                class="text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                                @click.prevent="scrollToTop"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                class="text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#project"
                                class="text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="#experience"
                                class="text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                            >
                                Experience
                            </a>
                        </li>
                        <li>
                            <a
                                href="#skills"
                                class="text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                            >
                                Skills
                            </a>
                        </li>
                        <li>
                            <a
                                href="#certificate"
                                class="text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                            >
                                Certifications
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contact & Social -->
                <div class="space-y-4">
                    <h4
                        class="text-lg font-semibold dark:text-white light:text-gray-900 font-display"
                    >
                        Connect
                    </h4>
                    <div class="space-y-3">
                        <a
                            href="mailto:emmanuelafful946@gmail.com"
                            class="flex items-center gap-2 text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                        >
                            <Icon icon="solar:letter-bold" class="text-lg" />
                            <span>emmanuelafful946@gmail.com</span>
                        </a>
                        <div
                            class="flex items-center gap-2 text-sm dark:text-gray-400 light:text-gray-600"
                        >
                            <Icon icon="solar:map-point-bold" class="text-lg" />
                            <span>Accra, Ghana</span>
                        </div>
                        <a
                            href="/cv.pdf"
                            download
                            class="flex items-center gap-2 text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                        >
                            <Icon icon="solar:download-bold" class="text-lg" />
                            <span>Download CV</span>
                        </a>
                    </div>
                    <div class="flex items-center gap-4 pt-2">
                        <a
                            v-for="social in socialLinks"
                            :key="social.name"
                            :href="social.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-xl dark:bg-white/5 light:bg-gray-100 border dark:border-white/10 light:border-gray-200 flex items-center justify-center dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-all duration-300 hover:scale-110"
                            :aria-label="social.name"
                        >
                            <Icon :icon="social.icon" class="text-xl" />
                        </a>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div
                class="pt-8 border-t dark:border-white/10 light:border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <p class="text-sm dark:text-gray-500 light:text-gray-500">
                    © {{ currentYear }} Emmanuel Afful. All rights reserved.
                </p>
                <button
                    @click="scrollToTop"
                    class="flex items-center gap-2 text-sm dark:text-gray-400 light:text-gray-600 dark:hover:text-accent-400 light:hover:text-primary-600 transition-colors"
                    aria-label="Scroll to top"
                >
                    <span>Back to top</span>
                    <Icon icon="solar:alt-arrow-up-bold" class="text-lg" />
                </button>
            </div>
        </div>
    </footer>
</template>
