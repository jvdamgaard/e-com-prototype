<template>
  <div>
    <grid v-if="user.basket.items.length === 0" :class="$style.empty">
      <grid-col>
        <p><img src="https://jvdamgaard.github.io/e-com-prototype/icons/basket-grey-darker.svg" height="64" width="64" /></p>
        <p class="h1">Din kurv er tom</p>
        <p>Log ind for at se din gemte kurv.</p>
      </grid-col>
      <grid-col mobile="2" phablet="3" laptop="4" desktop="5" />
      <grid-col mobile="8" phablet="6" laptop="4" desktop="2">
        <btn type="buy">Log ind</btn>
      </grid-col>
    </grid>

    <grid v-else>
      <grid-col mobile="0" desktop="2" />
      <grid-col desktop="5">
        <h2 :class="$style.header">{{itemsInBasket}} produkt{{itemsInBasket > 1 ? 'er' : ''}} i kurven</h2>
        <basket-item
          v-for="item in user.basket.items"
          :key="item.product.id"
          v-bind="item"
        />
      </grid-col>
    </grid>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import BasketItem from './BasketItem.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    BasketItem,
  },
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

.empty {
  text-align: center;
  margin: 8rem 0;
}

.header {
  background-color: white;
  padding: 2rem;
}

</style>
