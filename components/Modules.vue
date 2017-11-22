<template>
  <div>
    <section v-for="(module, i) in modules" :key="module.id">
      <component :is="module.type" v-bind="module.data" :lazy="i > 2" />
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
    Basket: () => import('./Basket.vue'),
    Departments: () => import('./Departments.vue'),
    LastSeenSlider: () => import('./LastSeenSlider.vue'),
    Login: () => import('./Login.vue'),
  },
  props: {
    modules: Array,
  },
};
</script>

<style></style>
