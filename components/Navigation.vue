<template>
  <div>
    <nav class="Navigation"  :class="{
      'Navigation--collapsed': scrolled,
      'Navigation--scrollable': this.state.departmentNavActive,
    }">
      <eyebrow-navigation />
      <main-navigation />
    </nav>
    <mobile-navigation />
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import EyebrowNavigation from './EyebrowNavigation.vue';
import MainNavigation from './MainNavigation.vue';
import MobileNavigation from './MobileNavigation.vue';

export default {
  components: {
    EyebrowNavigation,
    MainNavigation,
    MobileNavigation,
  },
  data() {
    return {
      scrolled: false,
    };
  },
  computed: {
    ...mapState(['state']),
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
  max-height: calc(100vh + 10rem);
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
  padding-top: 10rem;
  transform: translate3d(0,0,0);
  transition: transform 0.25s ease;
}
.Navigation--scrollable {
  overflow-y: auto;
}
.Navigation--collapsed {
  max-height: calc(100vh + 12rem);
  transform: translate3d(0,-2rem,0);
}
</style>
