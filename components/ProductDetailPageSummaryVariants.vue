<template>
  <div :class="$style.variants">
    <template v-for="(variant, variantPos) of product.variants">
      <p>
        <strong class="is-dimmed">{{variant.header}}:</strong>
        {{getActiveItem(variantPos).description}}
      </p>
      <ul class="is-inline-list" :class="{ [$style.variantWithPrice]: variant.changePrice }">
        <li
          v-for="(item, itemPos) in variant.items"
          :class="{
            [$style.activeVariant]: getActivePos(variantPos) === itemPos,
          }"
          @click="changeVariant(variantPos, itemPos)"
        >
          {{item.description}} <span>{{difference(variantPos, itemPos, item.price)}}</span>
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

.variantWithPrice li {
  width: 100%;
}
.variantWithPrice span {
  color: var(--color-grey-dark);
  float: right;
}

.variants li {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-grey-light);
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.variants li:hover {
  border-color: var(--color-grey-dark);
}

.variants li.activeVariant {
  border-color: var(--color-primary);
}
</style>
