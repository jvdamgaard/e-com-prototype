<template>
  <grid :class="$style.container">
    <grid-col mobile="12">
      <ul :class="$style.list">
        <li v-for="path in paths">
          <nuxt-link :to="path.url" :class="$style.link">{{path.titel}}</nuxt-link>
          <span :class="$style.seperator">/</span>
        </li>
        <li>
          <span :class="$style.current">{{current}}</span>
        </li>
      </ul>
    </grid-col>
  </grid>
</template>

<script>
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';

export default {
  components: {
    Grid,
    GridCol,
  },
  props: {
    paths: Array,
    current: String,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  margin: 1rem 0;
}

.list {
  composes: inlineList from './styles.css';
  composes: small from './styles.css';
}

.link {
  color: var(--color-grey-darker);
}

.seperator {
  color: var(--color-grey);
  padding: 0 0.5rem;
}

.current {
  color: var(--color-grey-dark);
}

</style>
