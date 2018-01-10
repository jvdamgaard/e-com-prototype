<template>
  <sections :sections="sections" />
</template>

<script>
import { mapActions } from 'vuex'; //eslint-disable-line
import axios from 'axios';
import { getProductSections } from '../../../utils/product';

export default {
  components: {
    Sections: () => import('../../../components/Sections.vue'),
  },
  async asyncData({ params }) {
    if (process.browser) {
      axios.post(`/.netlify/functions/update-product-views?id=${params.productId}`);
    }
    const sections = await getProductSections(params.productId);
    return { sections };
  },
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
    this.closeMiniBasket();
    this.closeDepartmentNav();
  },
};
</script>

<style>
</style>
