<template>
  <!-- Modules -->
  <div>
    <modules :modules="modules" />
    <section>
      <product-slider
        :products="user.lastSeen"
        header="Du har senest kigget på"
        key="last-seen"
      />
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex'; //eslint-disable-line
import Modules from '../../components/Modules.vue';
import { resolveModulesData } from '../../utils';

export default {
  components: {
    Modules,
    ProductSlider: () => import('../../components/ProductSlider.vue'),
  },
  computed: {
    ...mapState(['user']),
  },
  asyncData() {
    // Fecth modules data
    return axios.get('https://jvdamgaard.github.io/e-com-prototype/json/pages/basket.json')
      .then(resolveModulesData)
      .then(modules => ({ modules }));
  },
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
    }),
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
    this.closeMiniBasket();
  },
};
</script>

<style>
</style>
