<template>
  <product-slider
    :initProducts="user.lastSeen"
    :header="header"
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
