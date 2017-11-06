<template>
  <ul :class="$style.calculation">
    <li :class="$style.calculationRow">
      Total før rabat
      <div :class="$style.calculationPrice">
        {{numberWithDots(totalBeforePriceInBasket)}} kr
      </div>
    </li>
    <li v-if="totalBeforePriceInBasket > totalPriceInBasket" :class="$style.discount">
      Rabat
      <div :class="$style.calculationPrice">
        {{numberWithDots(totalPriceInBasket - totalBeforePriceInBasket)}} kr
      </div>
    </li>
    <li :class="$style.calculationRow">
      Fragt
      <div :class="$style.calculationPrice">
        GRATIS
      </div>
    </li>
    <li :class="$style.calculationRow">
      Betalingsgebyr
      <div :class="$style.calculationPrice">
        fra 0 kr
      </div>
    </li>
    <li :class="$style.totalPrice">
      Totalt at betale
      <div :class="$style.calculationPrice">
        {{numberWithDots(totalPriceInBasket)}} kr
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';

export default {
  computed: {
    ...mapState(['user']),
    itemsInBasket() {
      return this.user.basket.items
        .reduce((accumulator, item) => (accumulator + item.quantity), 0);
    },
    totalPriceInBasket() {
      return this.user.basket.items
        .reduce((accumulator, item) => (accumulator + (item.quantity * item.product.price)), 0);
    },
    totalBeforePriceInBasket() {
      return this.user.basket.items
        .reduce((accumulator, item) => (
          accumulator + (item.quantity * (item.product.beforePrice || item.product.price))
        ), 0);
    },
  },
  methods: {
    numberWithDots,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.calculation {
  composes: unstyledList from global;
}

.calculationRow {
  composes: clearfix from global;
}

.discount {
  composes: calculationRow;
  color: var(--color-red);
}

.totalPrice {
  composes: calculationRow;
  font-weight: bold;
  margin-top: 1rem;
}

.calculationPrice {
  float: right;
}
</style>
