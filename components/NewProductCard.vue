<template>
  <nuxt-link
    :to="url"
    :class="[
      $style.container,
      {
        [$style.outOfStock]: product.stock && product.stock.level === 0,
      },
    ]"
  >
    <product-sticker :product="product" :class="$style.sticker" />
    <product-image
      :images="shownImages.slice(0, 1)"
      :lazy="lazy"
      type="productCard"
      width="500"
      height="500"
      :crop="product.hasEnvironmentImage"
      :class="{ [$style.stockImage]: !product.hasEnvironmentImage }"
    />
    <div :class="$style.content">
      <p :class="$style.titel">
        {{product.titel}}
      </p>
      <p :class="$style.prices">
        <span v-if="product.beforePrice" :class="$style.beforePrice">{{numberWithDots(product.beforePrice)}},-</span>
        <span :class="[
          $style.price,
          { [$style.red]: product.beforePrice },
        ]">{{numberWithDots(product.price)}},-</span>
      </p>
      <div :class="$style.extra">
        <p v-if="product.stock && product.stock.status" :class="$style.stockStatus">
          {{product.stock.status}}
        </p>
        <p :class="$style.reviews">
          <star v-for="n in 5" :key="n" :rating="product.rating" :pos="n" />
          <small :class="$style.recommendationPercentage">{{recommendationPercentage}}% <span class="hiddenOnMobile inlineOnPhablet">anbefaler</span></small>
        </p>
        <!-- <add-to-cart :product="product" :class="$style.btnWrapper"/> -->
      </div>
    </div>

  </nuxt-link>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';
import { url } from '../utils/product';
import Btn from './Btn.vue';
import Arrow from './Arrow.vue';
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';
import ProductImage from './ProductImage.vue';
import ProductSticker from './ProductSticker.vue';

export default {
  components: {
    Btn,
    Arrow,
    Star,
    AddToCart,
    ProductImage,
    ProductSticker,
  },
  props: {
    product: Object,
    images: Array,
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState(['user']),
    recommendationPercentage() {
      return Math.ceil(this.product.recommendations * 100);
    },
    url() {
      return url(this.product);
    },
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
  display: block;
  position: relative;
  height: 0;
  width: 100%;
  color: var(--color-black);
  overflow: hidden;
  background-color: var(--color-white);
  padding-bottom: calc(100% + 5rem);
}
.container:hover {
  text-decoration: none!important;
}

.stockImage {
  width: 70% !important;
  padding-bottom: 70% !important;
  margin: 15% !important;
}

.sticker {
  top: 0.5rem;
  left: 0;
}

.content {
  position: absolute;
  top: 100%;
  padding: 1rem;
  width: 100%;
  background-color: var(--color-white);
  transition: all 0.2s ease;
  transform: translate3d(0, -5rem, 0);
}

:global(.no-touch) .container:hover .content {
  transform: translate3d(0, -100%, 0);
}

.extra {
  opacity: 0;
  transition: opacity 0.2s ease;
}

:global(.no-touch) .container:hover .extra {
  opacity: 1;
}

.reviews {
  margin-top: 0.5rem;
}

.recommendationPercentage {
  color: var(--color-grey-dark);
  float: right;
}

.titel {
  composes: small from global;
  composes: bodySizeOnDesktop from global;
}

.stockStatus {
  composes: small from global;
  color: var(--color-red);
}

.prices {
  /*text-align: center;*/
}

.beforePrice {
  composes: small from global;
  color: var(--color-grey);
  text-decoration: line-through;
  margin-right: 0.5rem;
}
.price {
  composes: h3 from global;
}
.red { color: var(--color-red); }
.btnWrapper {
  margin: 0.5rem -1rem -1rem -1rem;
}
</style>
