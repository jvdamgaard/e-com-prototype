<template>
  <Grid class="Images has-white-background">
    <div :class="marginClasses" />
    <div v-for="(image, i) in images" :key="image.url" :class="imageClasses(i)">
      <img
        :src="image.url"
        :width="image.width"
        :height="image.height"
        class="is-full-width" />
    </div>
    <div :class="marginClasses" />
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
  computed: {
    marginClasses() {
      const classes = ['is-hidden-on-mobile'];
      if (!this.fullWidth && this.images.length <= 2) {
        classes.push('is-visible-on-laptop');
        classes.push('is-2-col-on-laptop');
        classes.push('is-3-col-on-desktop');
      }
      return classes.join(' ');
    },
  },
  methods: {
    imageClasses(position) {
      const classes = ['is-12-col'];

      // Full width
      if (this.fullWidth || this.images.length > 2) {
        // Make first image in phablet view full width when three images
        if (this.images.length === 3 && position === 0) {
          classes.push('is-12-col-on-phablet');
        } else if (this.images.length > 1) {
          classes.push('is-6-col-on-phablet');
        }

        classes.push(`is-${12 / this.images.length}-col-on-tablet`);

      // Content width
      } else {
        classes.push(`is-${8 / this.images.length}-col-on-laptop`);
        classes.push(`is-${6 / this.images.length}-col-on-desktop`);
      }
      return classes.join(' ');
    },
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
