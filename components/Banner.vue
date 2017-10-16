<template>
  <grid>
    <div
      v-for="banner in banners"
      :key="banner.id"
      class="is-12-col"
      :class="`is-${12 / banners.length}-col-on-tablet`"
    >
      <nuxt-link
        to="/"
        class="Banner"
        :style="{ 'padding-bottom': `${banner.image.height / banner.image.width * 100}%` }"
      >
        <img
          v-if="lazy"
          v-lazy="banner.image.url"
          :width="banner.image.width"
          :height="banner.image.height"
        />
        <img
          v-if="!lazy"
          :src="banner.image.url"
          :width="banner.image.width"
          :height="banner.image.height"
        />
      </nuxt-link>
    </div>
  </grid>
</template>

<script>
import Grid from '../components/Grid.vue';

export default {
  components: {
    Grid,
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

<style>
@import '../assets/css/variables.css';

.Banner {
  display: block;
  transition: box-shadow 0.2s ease;
  background-color: var(--color-white);
}
.no-touch .Banner:hover {
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
}
.Banner img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
</style>
