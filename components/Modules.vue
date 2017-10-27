<template>
  <div>
    <section v-for="(module, i) in modules" :key="i" :id="module.id" :class="`section__${module.type}`">
      <component :is="module.type" v-bind="module.data" :key="i" />
    </section>
  </div>
</template>

<script>
export default {
  components: {
    ProductSlider: () => import('./ProductSlider.vue'),
    Banner: () => import('./Banner.vue'),
    UniqueSellingPoints: () => import('./UniqueSellingPoints.vue'),
    MainFooter: () => import('./MainFooter.vue'),
    ContentContainer: () => import('./ContentContainer.vue'),
    FrontpageTop: () => import('./FrontpageTop.vue'),
    ProductDetailPageSummary: () => import('./ProductDetailPageSummary.vue'),
    ProductDetailPageDescription: () => import('./ProductDetailPageDescription.vue'),
  },
  props: {
    modules: Array,
  },
};
</script>

<style></style>
