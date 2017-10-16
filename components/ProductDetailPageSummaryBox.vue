<template>
  <div :class="$style.summaryBox">
    <div :class="$style.summaryBoxInner">
      <h1>{{product.titel}}</h1>
      <ul class="is-inline-list has-tiny-top-padding">
        <li>
          <star v-for="n in 5" :key="n" :rating="product.rating" :pos="n" />
          &nbsp;&nbsp;{{product.rating.toFixed(1).replace('.', ',')}}
        </li>
        <li class="is-dimmed has-tiny-horizontal-padding">/</li>
        <li>{{recommendationPercentage}}% anbefaler</li>
        <li class="is-dimmed has-tiny-horizontal-padding">/</li>
        <li><a href="#reviews">54 anmeldelser</a></li>
        <li class="is-dimmed has-tiny-horizontal-padding">/</li>
        <li><a href="#reviews">23 brugerbilleder</a></li>
      </ul>
    </div>
    <div :class="$style.summaryBoxInner" class="is-hidden-on-mobile is-visible-on-tablet">
      <description :product="product" />
    </div>
    <div :class="$style.summaryBoxInner" class="is-hidden-on-mobile is-visible-on-laptop">
      <variants :product="product" />
      <price :product="product" class="has-bottom-margin" />
      <add-to-cart
        shadow
        hideReadMore
        height="large"
        quantityLabel="lagt i kurven"
        :product="product"
        class="has-bottom-margin"
      />
      <stock :product="product" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';
import ProductDetailPageSummaryStock from './ProductDetailPageSummaryStock.vue';
import ProductDetailPageSummaryDescription from './ProductDetailPageSummaryDescription.vue';
import ProductDetailPageSummaryPrice from './ProductDetailPageSummaryPrice.vue';
import ProductDetailPageSummaryVariants from './ProductDetailPageSummaryVariants.vue';

export default {
  components: {
    Star,
    AddToCart,
    Stock: ProductDetailPageSummaryStock,
    Description: ProductDetailPageSummaryDescription,
    Price: ProductDetailPageSummaryPrice,
    Variants: ProductDetailPageSummaryVariants,
  },
  props: {
    product: Object,
  },
  computed: {
    recommendationPercentage() {
      return Math.ceil(this.product.recommendations * 100);
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.summaryBox {
  height: 100%;
  border-left: 1px solid var(--color-grey-lighter);
}

.summaryBoxInner { padding: 1rem; }

@media (min-width: 64rem) {
  .summaryBoxInner { padding: 2rem; }
}

.summaryBoxInner:not(:first-child) {
  border-top: 1px solid var(--color-grey-lighter);
}
</style>
