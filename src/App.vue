<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    baseUrl() {
      return import.meta.env.VITE_BASE_URL ||
             'https://www.peridev.org' ||
             'https://afful-portfolio.deno.dev' ||
             'http://localhost';
    },
    sameAs() {
      const urls = new Set([
        'https://www.peridev.org',
        'https://afful-portfolio.deno.dev',
        'http://localhost'
      ]);
      return Array.from(urls);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>