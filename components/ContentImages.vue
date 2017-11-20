<template>
  <grid :class="$style.container">
    <grid-col
      v-if="!this.fullWidth && this.images.length <= 2"
      mobile="0"
      laptop="2"
      desktop="3"
    />
    <grid-col
      v-for="(image, i) in images"
      :key="image.url"
      v-bind="imageCols(i)"
    >
      <image-container
        :lazy="lazy"
        :src="image.url"
        :width="size.width"
        :height="size.height"
      />
    </grid-col>
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue';
import GridCol from '../components/GridCol.vue';
import ImageContainer from '../components/Image.vue';

export default {
  components: {
    Grid,
    GridCol,
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
    size() {
      if (this.images.length === 1 && this.fullWidth) {
        return { width: 2400, height: 800 };
      }

      if (this.images.length === 1 || (this.images.length === 2 && this.fullWidth)) {
        return { width: 1600, height: 800 };
      }

      if (this.images.length === 2 || this.images.length === 4) {
        return { width: 800, height: 600 };
      }

      // Three images
      return { width: 1000, height: 600 };
    },
  },
  methods: {
    imageCols(position) {
      const cols = {};

      cols.xs = '12';

      // Full width
      if (this.fullWidth || this.images.length > 2) {
        // Make first image in phablet view full width when three images
        if (this.images.length === 3 && position === 0) {
          cols.phablet = '12';
        } else if (this.images.length > 1) {
          cols.phablet = '6';
        }

        cols.tablet = `${12 / this.images.length}`;

      // Content width
      } else {
        cols.laptop = `${8 / this.images.length}`;
        cols.desktop = `${6 / this.images.length}`;
      }

      return cols;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container { justify-content: center; }
</style>
