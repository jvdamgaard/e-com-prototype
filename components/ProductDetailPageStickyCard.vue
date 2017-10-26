<template>
  <div
    :class="[
      $style.container,
      { [$style.active]: active },
    ]"
  >
    <div>
      <add-to-cart :product="product" hideReadMore height="small" />
    </div>
    <grid :class="$style.grid">
      <grid-col>
        <div class="group small">
          <div>
            <product-image
              :images="shownImages.slice(0, 1)"
              :imagePosition="0"
              :lazy="true"
              width="96"
              height="96"
              :class="$style.image"
            />
          </div>
          <div :class="$style.header">
            {{product.titel}}
          </div>
          <div :class="$style.prices">
            <span v-if="product.beforePrice">
              {{numberWithDots(product.beforePrice)}},-
            </span>
            <span :class="[
              $style.price,
              { [$style.red]: product.beforePrice },
            ]"><strong>{{numberWithDots(product.price)}},-</strong></span>
          </div>
        </div>
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
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';
import ProductImage from './ProductImage.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    Star,
    AddToCart,
    ProductImage,
  },
  props: {
    product: Object,
    images: Array,
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    shownImages() {
      return this.images ? this.images : this.product.images;
    },
  },
  methods: {
    numberWithDots(x) {
      return numberWithDots(x);
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  composes: shadow from global;
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: var(--color-white);
  z-index: 10;
  transform: translate3d(0, 5.5rem, 0);
  transition: transform 0.5s ease;
}
.active { transform: translate3d(0, 0, 0); }

.grid {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.header {
  margin-left: 0.5rem;
  width: 100%;
}

.prices {
  text-align: right;
  margin-left: 0.5rem;
}
.beforePrice {
  color: var(--color-grey-dark);
  text-decoration: line-through;
}
.price { margin-left: 0.5rem; }
.red { color: var(--color-red); }

.image {
  height: 3rem;
  width: 3rem;
}
</style>
