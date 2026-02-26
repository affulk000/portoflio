<script setup lang="ts"></script>

<template>
    <!-- Contact Section Placeholder -->
    <section
        id="contact"
        class="section-padding relative overflow-hidden"
        style="
            background: linear-gradient(
                180deg,
                var(--color-dark-500) 0%,
                var(--color-dark-400) 100%
            );
        "
    >
        <div class="container-custom">
            <div class="text-center mb-12 sm:mb-16">
                <h2 class="text-h2 gradient-text-primary mb-4">
                    Let's Work Together
                </h2>
                <p class="text-body-lg text-gray-400 max-w-2xl mx-auto">
                    Have a project in mind or want to discuss opportunities? I'd
                    love to hear from you.
                </p>
            </div>

            <div
                class="max-w-2xl mx-auto glass-morphism-dark p-8 sm:p-12 rounded-2xl"
            >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div class="text-center sm:text-left">
                        <div
                            class="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                            style="background: var(--color-accent-600)"
                        >
                            <svg
                                class="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">
                            Email
                        </h3>
                        <a
                            href="mailto:emmanuel.afful@proton.me"
                            class="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            emmanuel.afful@proton.me
                        </a>
                    </div>

                    <div class="text-center sm:text-left">
                        <div
                            class="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                            style="background: var(--color-primary-600)"
                        >
                            <svg
                                class="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white mb-2">
                            Phone
                        </h3>
                        <a
                            href="tel:+233205455451"
                            class="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            +233 20 5455451
                        </a>
                    </div>
                </div>

                <div class="text-center">
                    <p class="text-gray-400 text-sm mb-6">
                        Available for freelance projects and full-time
                        opportunities
                    </p>
                    <a
                        href="mailto:emmanuel.afful@proton.me"
                        class="btn-accent"
                    >
                        Send Message
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
