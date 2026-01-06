<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import type { BlogPost } from "@data/blog";

const props = defineProps<{
  post: BlogPost | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

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

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="post" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click="closeModal">
    <div class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl glass-morphism-dark border border-white/10" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <button @click="closeModal" class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <Icon icon="solar:arrow-left-bold" class="text-lg" />
          <span>Back</span>
        </button>
        <button @click="closeModal" class="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <Icon icon="solar:close-circle-bold" class="text-xl" />
        </button>
      </div>

      <!-- Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-80px)] p-6 lg:p-8">
        <!-- Meta -->
        <div class="flex items-center gap-4 mb-6">
          <span :class="['px-3 py-1 rounded-full text-xs font-semibold border', getCategoryColor(post.category)]">
            {{ post.category.replace('-', ' ') }}
          </span>
          <div class="flex items-center gap-1 text-gray-400 text-sm">
            <Icon icon="solar:clock-circle-bold" class="text-sm" />
            <span>{{ post.readTime }} min</span>
          </div>
          <span class="text-gray-500 text-sm">{{ formatDate(post.publishDate) }}</span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl lg:text-4xl font-bold text-white mb-6 font-display">{{ post.title }}</h1>

        <!-- Author -->
        <div class="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div class="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
            <span class="text-white font-semibold">{{ post.author.split(' ').map(n => n[0]).join('') }}</span>
          </div>
          <div>
            <p class="text-white font-medium">{{ post.author }}</p>
            <p class="text-gray-400 text-sm">Backend Engineer</p>
          </div>
        </div>

        <!-- Content -->
        <div class="prose prose-invert prose-lg max-w-none">
          <p class="text-xl text-gray-300 leading-relaxed mb-8">{{ post.excerpt }}</p>
          <div class="text-gray-300 leading-relaxed whitespace-pre-line">{{ post.content }}</div>
        </div>

        <!-- Tags -->
        <div class="mt-12 pt-6 border-t border-white/10">
          <h3 class="text-white font-semibold mb-4">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 rounded-md text-sm bg-dark-300/50 text-gray-400">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>