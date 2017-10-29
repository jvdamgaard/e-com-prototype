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

    <template v-else>

      <grid :class="$style.mobileTop">
        <grid-col mobile="7">
          <h2>{{itemsInBasket}} produkt{{itemsInBasket > 1 ? 'er' : ''}} total</h2>
          <h3>{{numberWithDots(totalPriceInBasket)}} kr.</h3>
        </grid-col>
        <grid-col mobile="5">
          <btn type="buy" shadow>Til kasses</btn>
        </grid-col>
      </grid>

      <grid>
        <grid-col mobile="0" desktop="2" />
        <grid-col laptop="7" desktop="5">
          <h2 :class="$style.header">{{itemsInBasket}} produkt{{itemsInBasket > 1 ? 'er' : ''}} i kurven</h2>
          <basket-item
            v-for="item in user.basket.items"
            :key="item.product.id"
            v-bind="item"
          />
        </grid-col>
        <grid-col laptop="5" desktop="3">
          <h2 :class="$style.header">Total</h2>
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
          <div :class="$style.cta">
            <btn type="buy" height="large" shadow>Til kasses</btn>
          </div>
          <div :class="$style.cta">
            <h3>Betalingsmuligheder</h3>
            <p :class="$style.paymentIcons">
              <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/dankort.png">
              <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/master-card.png">
              <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/mobilepay.png">
              <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/paypal.png">
              <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/visa-electron.png">
              <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/visa.png">
            </p>
          </div>
          <h3 :class="[$style.header, $style.marginTop]">Rabatkode eller gavekort?</h3>
        </grid-col>
        <grid-col mobile="0" desktop="2" />
      </grid>
    </template>

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

.marginTop { margin-top: 1rem; }

.padding { padding: 1rem; }

.empty {
  text-align: center;
  margin: 8rem 0;
}

.mobileTop {
  composes: hiddenOnLaptop from global;
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 0;
}

.header {
  composes: padding;
  background-color: white;
}

.calculation {
  composes: unstyledList from global;
  composes: padding;
  background-color: white;
  margin-top: 1px;
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

.cta {
  background-color: white;
  padding: 0 1rem 1rem;
}

.paymentIcons {
  margin-top: 1rem;
}

.paymentIcons img {
  display: inline-block;
  height: 1.5rem;
  margin-right: 1rem;
}

@media (min-width: 48rem) {
  .padding { padding: 2rem; }
  .cta {
    padding: 0 2rem 2rem;
  }
}

</style>
