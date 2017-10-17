<template>
  <div
    :class="[
      $style.container,
      { [$style.active]: active },
    ]"
    class="has-shadow"
  >
    <div>
      <add-to-cart :product="product" hideReadMore height="small" />
    </div>
    <grid class="has-no-vertical-margin">
      <div class="is-12-col">
        <div class="is-group is-small">
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
          <div class="has-tiny-left-margin is-full-width">
            {{product.titel}}
          </div>
          <div class="is-aligned-right has-tiny-left-margin">
            <span v-if="product.beforePrice" class="is-dimmed is-strike-through">
              {{numberWithDots(product.beforePrice)}},-
            </span>
            <span class="has-tiny-left-margin" :class="{
              'is-red': product.beforePrice,
            }"><strong>{{numberWithDots(product.price)}},-</strong></span>
          </div>
        </div>
      </div>
    </grid>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';
import Grid from './Grid.vue';
import Btn from './Btn.vue';
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';
import ProductImage from './ProductImage.vue';

export default {
  components: {
    Grid,
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
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: var(--color-white);
  z-index: 10;
  transform: translate3d(0, 5.5rem, 0);
  transition: transform 0.5s ease;
}
.active { transform: translate3d(0, 0, 0); }
.floatLeft { float: left; margin-right: 0.5rem; }
.floatRight { float: right; }

.image {
  height: 3rem;
  width: 3rem;
}
</style>
