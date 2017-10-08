<template>
  <div
    class="MiniBasket"
    :class="{ 'MiniBasket--active': state.miniBasketActive }"
    @click.self="close"
    >
    <Grid class="has-no-top-margin has-no-bottom-margin" @click.native.self="close">
      <div
        class="is-hidden-on-mobile is-visible-on-tablet is-5-col is-7-col-on-laptop is-9-col-on-desktop" @click="close" />
      <div
        class="is-12-col is-7-col-on-tablet is-5-col-on-laptop is-3-col-on-desktop has-shadow"
        @mouseover="enter"
        @mouseleave="leave">
        <div class="has-light-grey-background">
          <div class="MiniBasket__items">
            <mini-basket-item v-for="item in user.basket.items" :key="item.product.id" v-bind="item" />
          </div>
          <div class="MiniBasket__total is-h3 clearfix">
            {{itemsInBasket}} produkter total
            <div class="MiniBasket__total-price">
              <span v-if="totalBeforePriceInBasket > totalPriceInBasket" class="MiniBasket__before-price is-small">
                {{numberWithDots(totalBeforePriceInBasket)}} kr
              </span>
              <span class="is-h3 has-tiny-left-margin" :class="{
                'is-red': totalBeforePriceInBasket > totalPriceInBasket,
              }">{{numberWithDots(totalPriceInBasket)}} kr</span>
            </div>
          </div>
          <grid inner class="has-horizontal-padding">
            <div class="is-6-col">
              <btn type="grey">Se kurven</btn>
            </div>
            <div class="is-6-col">
              <btn type="buy" shadow>Til kassen</btn>
            </div>
          </grid>
          <div class="MiniBasket__selling-point is-aligned-center has-large-top-padding has-large-bottom-padding">
            Gratis fragt ved køb over 1.000 kr
          </div>
        </div>
      </div>
    </Grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import { numberWithDots } from '../utils';
import Grid from './Grid.vue';
import Btn from './Btn.vue';
import MiniBasketItem from './MiniBasketItem.vue';

export default {
  components: {
    Grid,
    Btn,
    MiniBasketItem,
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    ...mapState(['state', 'user']),
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
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
    }),
    numberWithDots,
    debounceClose: debounce((closeNav) => {
      closeNav();
    }, 500),
    close() {
      if (!this.hover) {
        this.closeMiniBasket();
      }
    },
    leave() { this.hover = false; this.debounceClose(this.close); },
    enter() { this.hover = true; this.debounceClose(this.close); },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.MiniBasket {
  background-color: var(--color-pop-over-background);
  min-height: calc(100vh - 3.5rem);
  display: none;
}
.MiniBasket--active {
  display: block;
}

.MiniBasket__items {
  max-height: calc(100vh - 20rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.MiniBasket__total {
  padding: 2rem 1rem;
}
.MiniBasket__before-price {
  color: var(--color-grey);
  text-decoration: line-through;
}
.MiniBasket__total-price {
  float: right;
}

@media (min-width: 48rem) {
}
</style>
