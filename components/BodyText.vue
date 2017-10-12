<template>
  <grid class="BodyText has-white-background">
    <div class="is-hidden-on-mobile is-visible-on-laptop is-2-col-on-laptop is-3-col-on-desktop" />
    <div
      class="BodyText__content is-12-col is-8-col-on-laptop is-6-col-on-desktop"
      v-html="content"
    />
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue';

export default {
  components: {
    Grid,
  },
  props: {
    content: String,
  },
};
</script>

<style>
@import '../assets/css/variables.css';
.BodyText__content > * { margin: 1rem 0; }
.BodyText__content > *:first-child { margin-top: 0; }
.BodyText__content > *:last-child { margin-bottom: 0; }
</style>
