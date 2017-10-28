<template>
  <div :class="$style.summaryBox">
    <div :class="$style.summaryBoxInner">
      <h1>{{product.titel}}</h1>
      <ul :class="$style.ratingList">
        <li>
          <star v-for="n in 5" :key="n" :rating="product.rating" :pos="n" />
          &nbsp;&nbsp;{{product.rating.toFixed(1).replace('.', ',')}}
        </li>
        <li>/</li>
        <li>{{recommendationPercentage}}% anbefaler</li>
        <li>/</li>
        <li><a href="#reviews">54 anmeldelser</a></li>
        <li>/</li>
        <li><a href="#reviews">23 brugerbilleder</a></li>
      </ul>
    </div>
    <div :class="$style.summaryBoxInner" class="hiddenOnMobile visibleOnTablet">
      <description :product="product" />
    </div>
    <div :class="$style.summaryBoxInner" class="hiddenOnMobile visibleOnLaptop">
      <variants
        v-if="product.variants"
        :product="product"
        :activeVariants="activeVariants"
        :changeVariant="changeVariant"
      />
      <price
        :product="product"
        :activeVariants="activeVariants"
        :class="$style.price"
      />
      <add-to-cart
        shadow
        hideReadMore
        height="large"
        quantityLabel="lagt i kurven"
        :product="product"
        :class="$style.addToCart"
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
    activeVariants: Array,
    changeVariant: Function,
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

.ratingList {
  composes: inlineList from global;
  padding-top: 0.5rem;
}
.ratingList li:nth-child(2n) {
  padding: 0 0.5rem;
  color: var(--color-grey-dark);
}
.price, .addToCart { margin-bottom: 2rem; }

@media (min-width: 64rem) {
  .summaryBoxInner { padding: 2rem; }
}

.summaryBoxInner:not(:first-child) {
  border-top: 1px solid var(--color-grey-lighter);
}
</style>
