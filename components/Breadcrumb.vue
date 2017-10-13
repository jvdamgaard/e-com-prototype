<template>
  <grid class="has-small-vertical-margin">
    <ul class="is-12-col is-inline-list is-small">
      <li v-for="path in paths"><nuxt-link :to="path.url" class="is-grey">{{path.titel}}</nuxt-link><span class="is-dimmed has-tiny-horizontal-padding">/</span></li>
      <li><span class="is-dimmed">{{current}}</span></li>
    </ul>
  </grid>
</template>

<script>
import Grid from './Grid.vue';

export default {
  components: {
    Grid,
  },
  props: {
    paths: Array,
    current: String,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';
</style>
