<template>
  <div class="fixed inset-0 -z-10 bg-white dark:bg-gray-950">
    <!-- Noise Texture -->
    <div
      class="absolute inset-0"
      :style="{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }"
    />
    <div
      class="absolute inset-0 hidden dark:block"
      :style="{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }"
    />
    
    <!-- Liquid Glass Blobs -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="i in 3"
        :key="i"
        class="absolute rounded-full blur-3xl opacity-30 animate-float"
        :class="getBlobClass(i)"
        :style="getBlobStyle(i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const getBlobClass = (i: number) => {
  const colors = ['bg-primary-300', 'bg-accent-300', 'bg-primary-400'];
  return colors[i - 1];
};

const getBlobStyle = (i: number) => {
  const positions = [
    { top: '10%', left: '20%', width: '500px', height: '500px', animationDelay: '0s' },
    { top: '60%', right: '10%', width: '600px', height: '600px', animationDelay: '2s' },
    { top: '40%', left: '50%', width: '450px', height: '450px', animationDelay: '4s' }
  ];
  return positions[i - 1];
};
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}
</style>
