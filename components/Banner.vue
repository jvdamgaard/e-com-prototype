<template>
  <grid>
    <template v-for="banner in banners">
      <grid-col
        mobile="12"
        :tablet="`${12 / banners.length}`"
      >
        <nuxt-link
          to="/"
          :class="$style.banner"
        >
          <image-container
            :lazy="lazy"
            :src="banner.image.url"
            :width="banner.image.width"
            :height="banner.image.height"
          />
        </nuxt-link>
      </grid-col>
    </template>
  </grid>
</template>

<script>
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import ImageContainer from './Image.vue';

export default {
  components: {
    Grid,
    GridCol,
    ImageContainer,
  },
  props: {
    banners: Array,
    lazy: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.banner {
  display: block;
  transition: box-shadow 0.2s ease;
  background-color: var(--color-white);
}
:global(.no-touch) .banner:hover {
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
}
</style>
