<template>
  <div class="ContentContainer has-white-background">
    <template v-for="module in modules">
      <content-images v-if="module.type === 'Images'" v-bind="module.data" />
      <content-text v-if="module.type === 'Text'" v-bind="module.data" />
    </template>
  </div>
</template>

<script>
import ContentImages from './ContentImages.vue';
import ContentText from './ContentText.vue';

export default {
  components: {
    ContentImages,
    ContentText,
  },
  props: {
    modules: Array,
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.ContentContainer > *:first-child { padding-top: 1rem; }
.ContentContainer > *:last-child { padding-bottom: 1rem; }

@media (min-width: 48rem) {
  .ContentContainer > *:first-child { padding-top: 2rem; }
  .ContentContainer > *:last-child { padding-bottom: 2rem; }
}

@media (min-width: 64rem) {
  .ContentContainer > *:first-child { padding-top: 3.5rem; }
  .ContentContainer > *:last-child { padding-bottom: 3.5rem; }
}
</style>
