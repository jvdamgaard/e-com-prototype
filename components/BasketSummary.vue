<template>
  <div>
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
      <btn type="buy" height="large" to="/kassen/" shadow>Til kassen</btn>
    </div>
    <div :class="$style.cta">
      <h3>Betalingsmuligheder</h3>
      <p :class="$style.paymentIcons">
        <img src="/icons/payment-methods/dankort.png">
        <img src="/icons/payment-methods/master-card.png">
        <img src="/icons/payment-methods/mobilepay.png">
        <img src="/icons/payment-methods/paypal.png">
        <img src="/icons/payment-methods/visa-electron.png">
        <img src="/icons/payment-methods/visa.png">
      </p>
    </div>
    <h3 :class="[$style.header, $style.marginTop]">Rabatkode eller gavekort?</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';
import Btn from './Btn.vue';

export default {
  components: {
    Btn,
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
.padding { padding: 2rem 1rem; }

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
  padding: 0 1rem 2rem;
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
