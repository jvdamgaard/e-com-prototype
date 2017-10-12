<template>
  <!-- Modules -->
  <div>
    <modules :modules="modules" />
    <section>
      <product-slider
        :products="user.lastSeen"
        header="Du har senest kigget på"
      />
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'; //eslint-disable-line
import Modules from '../../../components/Modules.vue';
import ProductSlider from '../../../components/ProductSlider.vue';
import { resolveModulesData } from '../../../utils';

export default {
  components: {
    Modules,
    ProductSlider,
  },
  computed: {
    ...mapState(['user']),
  },
  asyncData({ params }) {
    return axios.get(`https://raw.githubusercontent.com/jvdamgaard/e-com-prototype/master/static/json/products/${params.productId}.json`)
      .then(resolveModulesData)
      .then(modules => ({ modules }));
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>
