<template>
  <sections :sections="sections" />
</template>

<script>
import { mapActions } from 'vuex'; //eslint-disable-line
import { getProductSections } from '../../../utils/product';

export default {
  components: {
    Sections: () => import('../../../components/Sections.vue'),
  },
  async asyncData({ params }) {
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
