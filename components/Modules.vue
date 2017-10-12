<template>
  <div>
    <section v-for="module in modules" :key="module.id">
      <product-slider v-if="module.type === 'ProductSlider'" v-bind="module.data" />
      <banner v-if="module.type === 'Banner'" v-bind="module.data" />
      <unique-selling-points v-if="module.type === 'UniqueSellingPoints'" />
      <content-container v-if="module.type === 'ContentContainer'" v-bind="module.data" />
      <frontpage-top v-if="module.type === 'FrontpageTop'" v-bind="module.data" />
    </section>
  </div>
</template>

<script>
import ProductSlider from '../components/ProductSlider.vue';
import Banner from '../components/Banner.vue';
import UniqueSellingPoints from '../components/UniqueSellingPoints.vue';
import MainFooter from '../components/MainFooter.vue';
import ContentContainer from '../components/ContentContainer.vue';
import FrontpageTop from '../components/FrontpageTop.vue';

export default {
  components: {
    ProductSlider,
    Banner,
    UniqueSellingPoints,
    MainFooter,
    ContentContainer,
    FrontpageTop,
  },
  props: {
    modules: Array,
  },
};
</script>

<style></style>
