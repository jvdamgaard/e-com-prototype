<template>
  <product-slider
    :products="user.lastSeen"
    :header="header"
    key="last-seen"
  />
</template>

<script>
import { mapState } from 'vuex'; //eslint-disable-line

export default {
  components: {
    ProductSlider: () => import('../components/ProductSlider.vue'),
  },
  props: {
    header: String,
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style module>
@import '../assets/css/variables.css';
</style>
