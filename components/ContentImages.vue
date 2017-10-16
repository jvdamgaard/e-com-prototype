<template>
  <grid class="Images has-white-background">
    <div :class="marginClasses" />
    <div
      v-for="(image, i) in images"
      :key="image.url"
      :class="imageClasses(i)"
    >
      <image-container
        :lazy="lazy"
        :src="image.url"
        :width="image.width"
        :height="image.height"
      />
    </div>
    <div :class="marginClasses" />
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue';
import ImageContainer from '../components/Image.vue';

export default {
  components: {
    Grid,
    ImageContainer,
  },
  props: {
    fullWidth: Boolean,
    images: Array,
    lazy: {
      type: Boolean,
      default: true,
    },
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
</style>
