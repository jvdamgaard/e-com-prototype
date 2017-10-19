<template>
  <div :class="$style.container">
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

<style module>
@import '../assets/css/variables.css';

.container { background-color: var(--color-white); }
.container > *:first-child { padding-top: 1rem; }
.container > *:last-child { padding-bottom: 1rem; }

@media (min-width: 48rem) {
  .container > *:first-child { padding-top: 2rem; }
  .container > *:last-child { padding-bottom: 2rem; }
}

@media (min-width: 64rem) {
  .container > *:first-child { padding-top: 3.5rem; }
  .container > *:last-child { padding-bottom: 3.5rem; }
}
</style>
