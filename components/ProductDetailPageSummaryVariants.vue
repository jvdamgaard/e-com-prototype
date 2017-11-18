<template>
  <div :class="$style.variants">
    <template v-for="(variant, variantPos) of product.variants">
      <p>
        <strong :class="$style.header">{{variant.header}}:</strong>
        {{getActiveItem(variantPos).description}}
      </p>
      <ul class="inlineList" :class="{ [$style.variantWithPrice]: variant.changePrice }">
        <li
          v-for="(item, itemPos) in variant.items"
          :class="{
            [$style.activeVariant]: getActivePos(variantPos) === itemPos,
          }"
          @click="changeVariant(variantPos, itemPos)"
        >
          <template v-if="!item.images || item.images.length === 0">{{item.description}}</template>
          <template v-else>
            <div :class="$style.imageContainer"><img :src="`${item.images[0]}?w=200&fm=webp`" /></div>
          </template>
          <span v-if="!Number.isNaN(Number(item.price))">{{difference(variantPos, itemPos, item.price)}}</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { numberWithDots } from '../utils';

export default {
  props: {
    product: Object,
    changeVariant: Function,
    activeVariants: Array,
  },
  methods: {
    getActivePos(variantPos) {
      return this.activeVariants[variantPos];
    },
    getActiveItem(variantPos) {
      const activePos = this.getActivePos(variantPos);
      return this.product.variants[variantPos].items[activePos];
    },
    difference(variantPos, itemPos, price) {
      const activeItem = this.getActiveItem(variantPos);
      const priceDifference = price - activeItem.price;

      if (priceDifference === 0) {
        return '';
      }
      if (priceDifference > 0) {
        return `+ ${numberWithDots(priceDifference)},00 kr.`;
      }
      return `- ${numberWithDots(Math.abs(priceDifference))},00 kr.`;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.variants {
  margin-bottom: 2rem;
}
.variants ul {
  margin-bottom: 2rem;
}

.variants li {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-light);
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
  min-width: 3rem;
  text-align: center;
}
:global(.no-touch) .variants li:hover {
  border-color: var(--color-grey-dark);
}

.variants li.activeVariant {
  border-color: var(--color-primary) !important;
}

.header { color: var(--color-grey-dark); }

.imageContainer {
  position: relative;
  float: left;
  width: 5rem;
  padding-bottom: 5rem;
  margin: -0.375rem;
}

.imageContainer img {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.variantWithPrice li {
  width: 100%;
  text-align: left;
}
.variantWithPrice span {
  color: var(--color-grey-dark);
  float: right;
}
.variantWithPrice .imageContainer {
  width: 4rem;
  padding-bottom: 4rem;
}
</style>
