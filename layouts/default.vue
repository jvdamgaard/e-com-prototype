<template>
  <div :class="$style.container">
    <navigation />
    <nuxt/>
    <main-footer />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import MainFooter from '../components/MainFooter.vue';

export default {
  components: {
    Navigation,
    MainFooter,
  },
};
</script>

<style module>
.container {
  padding-top: 5.5rem;
}
</style>
