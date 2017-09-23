<template>
  <Grid>
    <div v-for="banner in banners" :key="banner.id" class="is-12-col" :class="`is-${12 / banners.length}-col-on-tablet`">
      <nuxt-link to="/" class="Banner" >
        <img 
          :src="banner.image.url"
          :width="banner.image.width"
          :height="banner.image.height"
          class="is-full-width" />
      </nuxt-link>
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
    banners: Array,
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
}
</style>
