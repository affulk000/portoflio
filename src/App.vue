<template>
  <div>
    <!-- App content goes here -->
  </div>
</template>

<script>
export default {
  // Fixing duplicate baseUrl declaration
  data() {
    return {
      baseUrl: 'https://example.com', // Only one baseUrl declared
      // ... other properties
    };
  },
  computed: {
    sameAs() {
      // Remove duplicate URLs from sameAs
      return [
        'https://twitter.com/example',
        'https://facebook.com/example',
        'https://linkedin.com/in/example'
      ];
    }
  }
};
</script>

<style>
/* Add component styles here */
</style>