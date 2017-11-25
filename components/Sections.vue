<template>
  <main>
    <article
      v-for="(section, i) in sections"
      :key="section.id"
      :class="`theme-${section.theme}`"
    >
      <section
        v-for="module in section.modules"
        :key="module.id"
      >
        <component
          :is="module.type"
          v-bind="module.data"
          :lazy="i > 1"
        />
      </section>
    </article>
  </main>

</template>

<script>
export default {
  components: {
    ProductSlider: () => import('./ProductSlider.vue'),
    Banner: () => import('./Banner.vue'),
    UniqueSellingPoints: () => import('./UniqueSellingPoints.vue'),
    MainFooter: () => import('./MainFooter.vue'),
    ContentImages: () => import('./ContentImages.vue'),
    ContentText: () => import('./ContentText.vue'),
    FrontpageTop: () => import('./FrontpageTop.vue'),
    ProductDetailPageSummary: () => import('./ProductDetailPageSummary.vue'),
    ProductDetailPageDescription: () => import('./ProductDetailPageDescription.vue'),
    Basket: () => import('./Basket.vue'),
    Departments: () => import('./Departments.vue'),
    LastSeenSlider: () => import('./LastSeenSlider.vue'),
    Login: () => import('./Login.vue'),
  },
  props: {
    sections: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style module>
</style>
