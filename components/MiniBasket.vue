<template>
  <div
    :class="[
      $style.container,
      { [$style.active]: state.miniBasketActive }
    ]"
    @click.self="close"
  >
    <grid :class="$style.grid" @click.native.self="close">
      <grid-col
        mobile="0"
        tablet="5"
        laptop="7"
        desktop="9"
        @click="close"
      />
      <grid-col
        tablet="7"
        laptop="5"
        desktop="3"
        class="shadow"
        @mouseover.native="enter"
        @mouseleave.native="leave"
      >
        <div :class="$style.background">
          <div :class="$style.items">
            <mini-basket-item
              v-for="item in user.basket.items"
              :key="item.product.id"
              v-bind="item"
            />
          </div>
          <div :class="$style.total">
            {{itemsInBasket}} produkter total
            <div :class="$style.totalPrice">
              <span v-if="totalBeforePriceInBasket > totalPriceInBasket" :class="$style.beforePrice">
                {{numberWithDots(totalBeforePriceInBasket)}} kr
              </span>
              <span class="" :class="[
                $style.price,
                { [$style.red]: totalBeforePriceInBasket > totalPriceInBasket }
              ]">{{numberWithDots(totalPriceInBasket)}} kr</span>
            </div>
          </div>
          <grid inner :class="$style.bottom">
            <grid-col mobile="6">
              <btn type="grey" to="/kurv/">Se kurven</btn>
            </grid-col>
            <grid-col mobile="6">
              <btn type="buy" to="/kurv/" shadow>Til kassen</btn>
            </grid-col>
          </grid>
          <div :class="$style.sellingPoint">
            Gratis fragt ved køb over 1.000 kr
          </div>
        </div>
      </grid-col>
    </grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import debounce from 'lodash/debounce';
import { numberWithDots } from '../utils';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import MiniBasketItem from './MiniBasketItem.vue';

export default {
  components: {
    Grid,
    GridCol,
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

<style module>
@import '../assets/css/variables.css';

.container {
  background-color: var(--color-pop-over-background);
  min-height: calc(100vh - 3.5rem);
  display: none;
}
.active { display: block; }

.grid {
  margin-top: 0;
  margin-bottom: 0;
}

.background { background-color: var(--color-grey-lighter); }

.items {
  max-height: calc(100vh - 28rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.total {
  composes: h3 from global;
  composes: clearfix from global;
  padding: 2rem 1rem;
}
.totalPrice { float: right; }
.beforePrice {
  composes: small from global;
  color: var(--color-grey);
  text-decoration: line-through;
}
.price {
  composes: h3 from global;
  margin-left: 0.5rem;
}
.red { color: var(--color-red); }

.bottom {
  padding-left: 1rem;
  padding-right: 1rem;
}

.sellingPoint {
  text-align: center;
  padding: 2rem 0;
}
</style>
