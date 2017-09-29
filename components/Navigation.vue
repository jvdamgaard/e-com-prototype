<template>
  <nav class="Navigation"  :class="{ 'Navigation--collapsed': scrolled }">
    <EyebrowNavigation></EyebrowNavigation>
    <MainNavigation></MainNavigation>
  </nav>
</template>

<script>
  import EyebrowNavigation from './EyebrowNavigation.vue';
  import MainNavigation from './MainNavigation.vue';

  export default {
    components: {
      EyebrowNavigation,
      MainNavigation,
    },
    data() {
      return {
        scrolled: false,
      };
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY > 32;
      },
    },
    mounted() {
      if (process.browser) {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
      }
    },
    destroyed() {
      if (process.browser) {
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
  };
</script>

<style>
  @import '../assets/css/variables.css';

  .Navigation {
    position: fixed;
    z-index: 100;
    top: -10rem;
    left: 0;
    right: 0;
    padding-top: 10rem;
    transform: translate3d(0,0,0);
    transition: transform 0.25s ease;
  }
  .Navigation--collapsed {
    transform: translate3d(0,-2rem,0);
  }
</style>
