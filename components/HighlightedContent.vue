<template>
  <grid :class="$style[theme]">
    <grid-col
      v-for="item in items"
      :key="item.id"
      mobile="12"
      :phablet="items.length % 2 === 0 ? '6' : '12'"
      :tablet="`${colWidth}`"
      :class="$style.itemWrapper"
    >
      <nuxt-link to="/" :class="$style.item">
        <p v-if="item.icon"><img v-lazy="item.icon" /></p>
        <div v-if="item.html" v-html="item.html" />
      </nuxt-link>
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
    items: Array,
    theme: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    colWidth() {
      return 12 / this.items.length;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.default {
  composes: container;
  background-color: var(--color-white);
}
.primary {
  composes: container;
  background-color: var(--color-primary);
}
.container p {
  margin: 0.5rem 0;
}

.itemWrapper:hover {
  z-index: 10;
}

.item {
  display: block;
  height: 100%;
  padding: 0.75rem 1rem;
  margin: -0.5rem -1rem;
  text-align: center;
  transition: all 0.2s ease;
  text-decoration: none !important;
}
.default .item {
  background-color: var(--color-white);
  color: var(--color-black);
}
.primary .item {
  background-color: var(--color-primary);
  color: var(--color-white);
}
.item img {
  height: 3rem;
}
:global(.no-touch) .item:hover {
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
}

@media (min-width: 48rem) {
  .container {
    padding-top: 0;
    padding-bottom: 0;
  }
  .item {
    padding: 3rem 1rem;
    margin: 0 -0.5rem;
  }
  .item img {
    height: 4rem;
    width: auto
  }
  :global(.no-touch) .item:hover {
    height: calc(100% + 1rem);
    margin: -0.5rem -1rem;
    padding: 3.5rem 1.5rem;
  }
}
</style>
