<template>
  <grid :class="$style.container">
    <grid-col
      laptop="2"
      desktop="3"
      :class="$style.margin"
    />
    <grid-col
      laptop="8"
      dekstop="6"
      :class="$style.content"
    >
      <div v-html="content" />
    </grid-col>
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue';
import GridCol from '../components/GridCol.vue';

export default {
  components: {
    Grid,
    GridCol,
  },
  props: {
    content: String,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';
.container { background-color: var(--color-white); }

.margin {
  composes: hiddenOnMobile from './styles.css';
  composes: visibleOnLaptop from './styles.css';
}

.content > * { margin: 1rem 0; }
.content > *:first-child { margin-top: 0; }
.content > *:last-child { margin-bottom: 0; }
</style>
