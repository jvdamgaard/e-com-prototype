<template>
  <div>
    <section v-for="module in modules" :key="module.id">
      <product-slider v-if="module.type === 'ProductSlider'" v-bind="module.data" />
      <banner v-if="module.type === 'Banner'" v-bind="module.data" />
      <unique-selling-points v-if="module.type === 'UniqueSellingPoints'" />
      <content-container v-if="module.type === 'ContentContainer'" v-bind="module.data" />
      <frontpage-top v-if="module.type === 'FrontpageTop'" v-bind="module.data" />
      <product-detail-page-summary v-if="module.type === 'ProductDetailPageSummary'" v-bind="module.data" />
      <product-detail-page-description v-if="module.type === 'ProductDetailPageDescription'" v-bind="module.data" />
    </section>
  </div>
</template>

<script>
import ProductSlider from './ProductSlider.vue';
import Banner from './Banner.vue';
import UniqueSellingPoints from './UniqueSellingPoints.vue';
import MainFooter from './MainFooter.vue';
import ContentContainer from './ContentContainer.vue';
import FrontpageTop from './FrontpageTop.vue';
import ProductDetailPageSummary from './ProductDetailPageSummary.vue';
import ProductDetailPageDescription from './ProductDetailPageDescription.vue';

export default {
  components: {
    ProductSlider,
    Banner,
    UniqueSellingPoints,
    MainFooter,
    ContentContainer,
    FrontpageTop,
    ProductDetailPageSummary,
    ProductDetailPageDescription,
  },
  props: {
    modules: Array,
  },
};
</script>

<style></style>
