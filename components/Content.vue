<template>
  <div class="Content has-white-background">
    <template v-for="module in modules">
      <Images v-if="module.type === 'Images'" v-bind="module.data" />
      <BodyText v-if="module.type === 'BodyText'" v-bind="module.data" />
    </template>
  </div>
</template>

<script>
import Images from './Images.vue';
import BodyText from './BodyText.vue';

export default {
  components: {
    Images,
    BodyText,
  },
  props: {
    modules: Array,
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.Content > *:first-child { padding-top: 1rem; }
.Content > *:last-child { padding-bottom: 1rem; }

@media (min-width: 48rem) {
  .Content > *:first-child { padding-top: 2rem; }
  .Content > *:last-child { padding-bottom: 2rem; }
}

@media (min-width: 64rem) {
  .Content > *:first-child { padding-top: 3.5rem; }
  .Content > *:last-child { padding-bottom: 3.5rem; }
}
</style>
