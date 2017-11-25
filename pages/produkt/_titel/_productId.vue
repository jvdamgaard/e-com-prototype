<template>
  <sections :sections="sections" />
</template>

<script>
import { getProductSections } from '../../../utils/product';

export default {
  components: {
    Sections: () => import('../../../components/Sections.vue'),
  },
  async asyncData({ params }) {
    const sections = await getProductSections(params.productId);
    return { sections };
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
  },
};
</script>

<style>
</style>
