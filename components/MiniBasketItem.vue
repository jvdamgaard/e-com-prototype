<template>
  <div class="MiniBasketItem has-white-background clearfix">
    <div class="MiniBasketItem__close" @click="removeFromBasket(product)">
      <p class="is-full-width is-center-aligned">&#215;</p>
    </div>
    <nuxt-link to="/" class="MiniBasketItem__image">
      <img :src="product.images[0]" />
    </nuxt-link>
    <p class="MiniBasketItem__titel is-small">
      <nuxt-link to="/" class="is-black">{{product.titel}}</nuxt-link>
      <span v-if="product.stock.status" class="is-red"><br>{{product.stock.status}}</span>
      <br><span class="is-dimmed">Antal:</span> {{quantity}}
      <span v-if="quantity > 1"><br>
        <span class="is-dimmed">Pr. stk.:</span> {{numberWithDots(product.price)}} kr
      </span>
    </p>
    <p class="MiniBasketItem__prices is-aligned-right">
      <span v-if="product.beforePrice" class="MiniBasketItem__before-price is-small">{{numberWithDots(quantity * product.beforePrice)}} kr</span>
      <span class="is-h3 has-tiny-left-margin" :class="{
        'is-red': product.beforePrice,
      }">{{numberWithDots(quantity * product.price)}} kr</span>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line

export default {
  components: {},
  props: {
    quantity: Number,
    product: Object,
  },
  methods: {
    ...mapActions({
      removeFromBasket: 'user/removeFromBasket',
    }),
    numberWithDots(x) {
      return x.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.MiniBasketItem {
  padding: 0.5rem;
  margin-bottom: 1px;
}

.MiniBasketItem__close {
  width: 2rem;
  text-align: center;
  height: 2rem;
  font-size: 2rem;
  line-height: 2rem;
  color: var(--color-grey-dark);
  font-weight: 200;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 10;
}

.MiniBasketItem__image {
  position: relative;
  float: left;
  width: 7rem;
  padding-bottom: 5.5rem;
  margin-right: 1rem;
  z-index: 10;
}
.MiniBasketItem__image img {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}

.MiniBasketItem__titel {
  padding: 0.5rem 1.5rem 2rem 0rem;
}

.MiniBasketItem__prices {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  transition: all 0.2s ease;
}
.MiniBasketItem__before-price {
  color: var(--color-grey);
  text-decoration: line-through;
}
</style>
