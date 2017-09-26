<template>
  <Grid class="Images has-white-background">
    <div v-for="image in images" :key="image.url" :class="`is-${12 / images.length}-col`">
      <img
        :src="image.url"
        :width="image.width"
        :height="image.height"
        class="is-full-width" />
    </div>
  </Grid>
</template>

<script>
import Grid from '../components/Grid.vue';

export default {
  components: {
    Grid,
  },
  props: {
    fullWidth: Boolean,
    images: Array,
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.Images {
  justify-content: center;
}
.Images img {
  display: block;
}
</style>
