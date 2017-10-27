<template>
  <p :class="$style.container">
    <span
      v-if="product.beforePrice"
      :class="$style.beforePrice"
    >
      {{numberWithDots(calculated('beforePrice'))}},00 kr.
    </span>
    <span class="h1" :class="{
      'red': product.beforePrice,
    }">{{numberWithDots(calculated('price'))}},00 kr.</span>
  </p>
</template>

<script>
import { numberWithDots } from '../utils';

export default {
  props: {
    product: Object,
    activeVariants: Array,
  },
  methods: {
    numberWithDots(x) {
      return numberWithDots(x);
    },
    calculated(key) {
      if (!this.product[key]) {
        return 0;
      }
      if (!this.product.variants) {
        return this.product[key];
      }
      return this.activeVariants.reduce((accumulator, activeItemPos, variantPos) => {
        const activeVariant = this.product.variants[variantPos].items[activeItemPos];
        if (activeVariant.price) {
          return accumulator + activeVariant.price;
        }
        return accumulator;
      }, this.product[key]);
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  text-align: right;
  margin-top: 1rem;
}

.beforePrice {
  color: var(--color-grey);
  text-decoration: line-through;
  margin-right: 0.5rem;
}
.red { color: var(--color-red); }
</style>
