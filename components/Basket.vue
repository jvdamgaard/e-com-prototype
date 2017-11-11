<template>
  <div>
    <grid v-show="user.basket.items.length === 0" :class="$style.empty">
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

    <div v-show="user.basket.items.length > 0">
      <grid :class="$style.mobileTop">
        <grid-col mobile="7">
          <h2>{{itemsInBasket}} produkt{{itemsInBasket > 1 ? 'er' : ''}}</h2>
          <p>Total {{numberWithDots(totalPriceInBasket)}} kr.</p>
        </grid-col>
        <grid-col mobile="5">
          <btn type="buy" to="/kassen/" shadow>Til kassen</btn>
        </grid-col>
      </grid>

      <sticky-scroll-wrapper bottomSelector="#products" heightSelector="#summary" class="hiddenOnMobile visibleOnLaptop">
        <grid id="summary" :style="{ margin: 0 }">
          <grid-col mobile="0" laptop="7" />
          <grid-col laptop="5" desktop="3">
            <basket-summary />
          </grid-col>
          <grid-col mobile="0" desktop="2" />
        </grid>
      </sticky-scroll-wrapper>

      <grid id="products">
        <grid-col mobile="0" desktop="2" />
        <grid-col laptop="7" desktop="5">
          <h2 :class="$style.header">{{itemsInBasket}} produkt{{itemsInBasket > 1 ? 'er' : ''}} i kurven</h2>
          <basket-item
            v-for="item in user.basket.items"
            :key="item.product.id"
            v-bind="item"
          />
        </grid-col>
        <grid-col mobile="0" laptop="5" desktop="3" :class="$style.ghostBasket">
          <basket-summary />
        </grid-col>
      </grid>

      <grid class="hiddenOnLaptop">
        <grid-col>
          <basket-summary />
        </grid-col>
      </grid>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import BasketItem from './BasketItem.vue';
import BasketSummary from './BasketSummary.vue';
import StickyScrollWrapper from './StickyScrollWrapper.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    BasketItem,
    BasketSummary,
    StickyScrollWrapper,
  },
  data() {
    return {
      productsEl: null,
      summaryEl: null,
    };
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

.empty {
  text-align: center;
  margin: 8rem 0;
}

.mobileTop {
  composes: hiddenOnLaptop from global;
  background-color: white;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-top: 0;
}

.ghostBasket {
  opacity: 0;
  z-index: -100;
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
