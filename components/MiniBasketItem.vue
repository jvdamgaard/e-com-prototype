<template>
  <div class="MiniBasketItem clearfix" :class="{
    'MiniBasketItem--added': added,
  }">
    <nuxt-link :to="url" class="MiniBasketItem__image">
      <img :src="product.images[0]" />
    </nuxt-link>
    <p class="MiniBasketItem__titel is-small">
      <nuxt-link :to="url" class="is-black"><strong>{{product.titel}}</strong></nuxt-link>
      <span v-if="product.stock.status" class="is-red"><br>{{product.stock.status}}</span>
      <br><span class="is-dimmed">Antal:</span> {{quantity}}
      <span v-if="quantity > 1"><br>
        <span class="is-dimmed">Pr. stk.:</span> {{numberWithDots(product.price)}} kr
      </span>
      <br><a href="#" class="is-black" @click.prevent="removeFromBasket(product)">Fjern fra kurven</a>
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
import kebabCase from 'lodash/kebabCase';

export default {
  components: {},
  props: {
    quantity: Number,
    product: Object,
  },
  data() {
    return {
      added: false,
    };
  },
  computed: {
    url() {
      return `/produkt/${kebabCase(this.product.titel)}/${this.product.id}/`;
    },
  },
  methods: {
    ...mapActions({
      removeFromBasket: 'user/removeFromBasket',
    }),
    numberWithDots(x) {
      return x.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
  mounted() {
    window.setTimeout(() => { this.added = true; }, 500);
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.MiniBasketItem {
  padding: 0.5rem;
  margin-bottom: 1px;
  background-color: var(--color-white);
  transition: opacity 1s ease;
  opacity: 0;
}

.MiniBasketItem--added {
  opacity: 1;
}

.MiniBasketItem__image {
  position: absolute;
  width: 7rem;
  padding-bottom: 5.25rem;
  z-index: 10;
  top: 0.5rem;
  left: 0.5rem;
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
  padding: 0.5rem 0.5rem 2rem 8.5rem;
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
