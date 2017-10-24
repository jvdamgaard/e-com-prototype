<template>
  <div :class="[
    $style.container,
    { [$style.added]: added }
  ]">
    <nuxt-link :to="url" :class="$style.image">
      <img :src="product.images[0]" />
    </nuxt-link>
    <p :class="$style.titel">
      <nuxt-link :to="url" :class="$style.blackLink"><strong>{{product.titel}}</strong></nuxt-link>
      <span v-if="product.stock.status" :class="$style.red"><br>{{product.stock.status}}</span>
      <br><span :class="$style.dimmed">Antal:</span> {{quantity}}
      <span v-if="quantity > 1"><br>
        <span :class="$style.dimmed">Pr. stk.:</span> {{numberWithDots(product.price)}} kr
      </span>
      <br><a href="#" :class="$style.blackLink" @click.prevent="removeFromBasket(product)">Fjern fra kurven</a>
    </p>
    <p :class="$style.prices">
      <span v-if="product.beforePrice" :class="$style.beforePrice">{{numberWithDots(quantity * product.beforePrice)}} kr</span>
      <span class="" :class="[
        $style.price,
        { [$style.red]: product.beforePrice },
      ]">{{numberWithDots(quantity * product.price)}} kr</span>
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

<style module>
@import '../assets/css/variables.css';

.container {
  composes: clearfix from global;
  padding: 0.5rem;
  margin-bottom: 1px;
  background-color: var(--color-white);
  transition: opacity 1s ease;
  opacity: 0;
}

.added {
  opacity: 1;
}

.image {
  position: absolute;
  width: 7rem;
  padding-bottom: 5.25rem;
  z-index: 10;
  top: 0.5rem;
  left: 0.5rem;
}
.image img {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}

.titel {
  composes: small from global;
  padding: 0.5rem 0.5rem 2rem 8.5rem;
}

.blackLink { color: var(--color-black); }
.red { color: var(--color-red); }
.dimmed { color: var(--color-grey-dark); }

.prices {
  text-align: right;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  transition: all 0.2s ease;
}
.beforePrice {
  composes: small from global;
  color: var(--color-grey);
  text-decoration: line-through;
}
.price {
  composes: h3 from global;
  margin-left: 0.5rem;
}
</style>
