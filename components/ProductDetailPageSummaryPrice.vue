<template>
  <p class="is-aligned-right has-small-top-margin">
    <span
      v-if="product.beforePrice"
      class="has-tiny-right-margin"
      :class="$style.beforePrice"
    >
      {{numberWithDots(product.beforePrice)}},00 kr.
    </span>
    <span class="is-h1" :class="{
      'is-red': product.beforePrice,
    }">{{numberWithDots(product.price)}},00 kr.</span>
  </p>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.beforePrice {
  color: var(--color-grey);
  text-decoration: line-through;
}
</style>
