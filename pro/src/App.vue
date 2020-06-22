<template>
  <div id="app">
      <Footer />
    <router-view />
  </div>
</template>

<script>
import '@/css/index';
import Footer from './component/footer';
export default {
    name: 'App',
    components: {
        Footer
    }
};
</script>

<style>
</style>
