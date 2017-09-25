<template>
  <Grid class="HighlightedContent has-white-background">
    <nuxt-link 
      v-for="item in items" 
      v-html="item.html" 
      :key="item.id" 
      to="/" 
      class="HighlightedContent__item is-12-col has-no-underline" 
      :class="[
        `is-${colWidth}-col-on-tablet`,
        { 
          'is-6-col-on-phablet': items.length % 2 === 0,
        }
      ]" />
  </Grid>
</template>

<script>
import Grid from '../components/Grid.vue';

export default {
  components: {
    Grid,
  },
  props: {
    items: Array,
  },
  computed: {
    colWidth() {
      return 12 / this.items.length;
    },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.HighlightedContent {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.HighlightedContent__item {
  padding: 0.75rem 1rem;
  margin: -0.5rem -1rem;
  color: var(--color-black);
  background-color: var(--color-white);
  text-align: center;
  transition: all 0.2s ease;
}
.HighlightedContent__item img {
  height: 3rem;
}
.no-touch .HighlightedContent__item:hover {
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
  z-index: 10;
}

@media (min-width: 48rem) {
  .HighlightedContent {
    padding-top: 0;
    padding-bottom: 0;
  }
  .HighlightedContent p {
    margin: 1rem 0;
  }
  .HighlightedContent__item {
    padding: 3rem 1rem;
    margin: 0 -0.5rem;
  }
  .HighlightedContent__item img {
    height: 4rem;
    width: auto
  }
  .no-touch .HighlightedContent__item:hover {
    margin: -0.5rem -1rem;
    padding: 3.5rem 1.5rem;
    box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
  }
}
</style>
