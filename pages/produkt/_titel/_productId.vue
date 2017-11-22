<template>
  <!-- Modules -->
  <div>
    <modules :modules="modules" />
    <section>
      <product-slider
        :initProducts="user.lastSeen"
        header="Du har senest kigget på"
        key="last-seen"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'; //eslint-disable-line
import { getProductModules } from '../../../utils/product';
import Modules from '../../../components/Modules.vue';

export default {
  components: {
    Modules,
    ProductSlider: () => import('../../../components/ProductSlider.vue'),
  },
  computed: {
    ...mapState(['user']),
  },
  asyncData({ params }) {
    return getProductModules(params.productId)
      .then(modules => ({ modules }));
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
  },
};
</script>

<style>
</style>
