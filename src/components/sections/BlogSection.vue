<script setup lang="ts">
import { ref } from "vue";
import { motion } from "motion-v";
import { Icon } from "@iconify/vue";
import { getRecentBlogPosts, type BlogPost } from "@data/blog";
import BlogModal from "@/components/ui/BlogModal.vue";

const recentPosts = getRecentBlogPosts(3);
const selectedPost = ref<BlogPost | null>(null);

const openPost = (post: BlogPost) => {
    selectedPost.value = post;
};

const closeModal = () => {
    selectedPost.value = null;
};

const getCategoryColor = (category: string) => {
    const colors = {
        tutorial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        architecture: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        devops: "bg-green-500/10 text-green-400 border-green-500/20",
        "best-practices": "bg-orange-500/10 text-orange-400 border-orange-500/20",
        "case-study": "bg-pink-500/10 text-pink-400 border-pink-500/20",
    };
    return colors[category as keyof typeof colors] || colors.tutorial;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

<template>
    <motion.section
        id="blog"
        :initial="{ opacity: 0 }"
        :whileInView="{ opacity: 1 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true, amount: 0.2 }"
        class="relative py-24 lg:py-32 overflow-hidden"
    >
        <!-- Background Elements -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div
                class="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl animate-float-delayed"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-primary-500),
                        transparent
                    );
                "
            ></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <!-- Section Header -->
            <motion.div
                :initial="{ opacity: 0, y: 30 }"
                :whileInView="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6 }"
                :viewport="{ once: true, amount: 0.3 }"
                class="text-center mb-16 lg:mb-20"
            >
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold mb-6"
                >
                    <Icon icon="solar:document-text-bold" class="text-lg" />
                    <span>Latest Articles</span>
                </div>
                <h2
                    class="text-4xl lg:text-5xl font-bold text-white mb-6 font-display"
                >
                    Technical
                    <span class="gradient-text-primary block mt-2">Insights & Tutorials</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Sharing knowledge about backend development, architecture patterns, and best practices
                </p>
            </motion.div>

            <!-- Blog Posts Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.article
                    v-for="(post, index) in recentPosts"
                    :key="post.uuid"
                    :initial="{ opacity: 0, y: 40 }"
                    :whileInView="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.5, delay: index * 0.15 }"
                    :viewport="{ once: true, amount: 0.2 }"
                    class="glass-morphism-dark rounded-xl border border-white/10 overflow-hidden hover:border-primary-500/30 transition-all duration-300 group hover:scale-105"
                >
                    <!-- Post Header -->
                    <div class="p-6 pb-4">
                        <div class="flex items-center justify-between mb-4">
                            <span
                                :class="[
                                    'px-3 py-1 rounded-full text-xs font-semibold border',
                                    getCategoryColor(post.category)
                                ]"
                            >
                                {{ post.category.replace('-', ' ') }}
                            </span>
                            <div class="flex items-center gap-1 text-gray-400 text-sm">
                                <Icon icon="solar:clock-circle-bold" class="text-sm" />
                                <span>{{ post.readTime }} min</span>
                            </div>
                        </div>

                        <h3 class="text-xl font-bold text-white mb-3 font-display group-hover:text-primary-400 transition-colors">
                            {{ post.title }}
                        </h3>

                        <p class="text-gray-400 text-sm leading-relaxed mb-4">
                            {{ post.excerpt }}
                        </p>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span
                                v-for="tag in post.tags.slice(0, 3)"
                                :key="tag"
                                class="px-2 py-1 rounded-md text-xs bg-dark-300/50 text-gray-400"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>

                    <!-- Post Footer -->
                    <div class="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                        <div class="text-gray-500 text-sm">
                            {{ formatDate(post.publishDate) }}
                        </div>
                        <button @click="openPost(post)" class="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-sm font-medium">
                            <span>Read More</span>
                            <Icon icon="solar:arrow-right-bold" class="text-sm" />
                        </button>
                    </div>
                </motion.article>
            </div>

            <!-- View All Button -->
            <div class="text-center mt-12">
                <button class="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
                    <Icon icon="solar:document-text-bold" class="text-lg" />
                    <span>View All Articles</span>
                    <Icon icon="solar:arrow-right-bold" class="text-lg" />
                </button>
            </div>
        </div>

        <!-- Blog Modal -->
        <BlogModal :post="selectedPost" @close="closeModal" />
    </motion.section>
</template>