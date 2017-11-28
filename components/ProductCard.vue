<template>
  <nuxt-link
    :to="url"
    :class="[
      $style.container,
      {
        [$style.outOfStock]: product.stock && product.stock.level === 0,
        [$style.inBasket]: quantityInBasket > 0,
        [$style.static]: static,
        [$style.noStatic]: !static,
      },
    ]"
    @mouseover.native="hovering = true"
    @mouseleave.native="hovering = false"
  >
    <product-sticker v-if="!static" :product="product" :class="$style.sticker" />
    <product-image
      :images="static ? shownImages.slice(0, 1) : shownImages"
      :imagePosition="imagePosition"
      :changeImagePosiiton="setImagePosition"
      :lazy="lazy"
      :hovering="hovering"
      type="productCard"
      width="400"
      height="400"
      :crop="product.hasEnvironmentImage"
      :class="{ [$style.fullWidthImage]: product.hasEnvironmentImage }"
    />
    <p :class="$style.reviews">
      <star v-for="n in 5" :key="n" :rating="product.rating" :pos="n" />
      <small :class="$style.recommendationPercentage">{{recommendationPercentage}}% <span class="hiddenOnMobile inlineOnPhablet">anbefaler</span></small>
    </p>
    <p :class="$style.titel">
      {{product.titel}}<br>
      <span v-if="product.stock && product.stock.status" :class="$style.stockStatus">{{product.stock.status}}</span>
    </p>
    <p :class="$style.prices">
      <span v-if="product.beforePrice" :class="$style.beforePrice">{{numberWithDots(product.beforePrice)}},-</span>
      <span :class="[
        $style.price,
        { [$style.red]: product.beforePrice },
      ]">{{numberWithDots(product.price)}},-</span>
    </p>

    <add-to-cart :product="product" :hideReadMore="static" :class="$style.btnWrapper"/>

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
    static: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imagePosition: 0,
      hovering: false,
    };
  },
  computed: {
    ...mapState(['user']),
    recommendationPercentage() {
      return Math.ceil(this.product.recommendations * 100);
    },
    quantityInBasket() {
      const match = this.user.basket.items.find(item => item.product.id === this.product.id);
      if (!match) { return 0; }
      return match.quantity;
    },
    url() {
      return url(this.product);
    },
    shownImages() {
      return this.images ? this.images : this.product.images;
    },
  },
  methods: {
    ...mapActions({
      addToBasket: 'user/addToBasket',
      subtractInBasket: 'user/subtractInBasket',
    }),
    numberWithDots(x) {
      return numberWithDots(x);
    },
    setImagePosition(position) {
      this.imagePosition = position;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.5rem 0.5rem 3rem 0.5rem;
  transition: all 0.2s ease;
  color: var(--color-black);
  overflow: hidden;
  background-color: var(--color-white);
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0);
}
.container:hover {
  text-decoration: none!important;
}
:global(.no-touch) .noStatic:hover {
  margin: -0.5rem -0.5rem -3rem;
  height: calc(100% + 3.5rem);
  width: calc(100% + 1rem);
  padding: 1rem 1rem 5.5rem 1rem;
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.25);
  z-index: 20;
}
:global(.no-touch) .outOfStock.noStatic:hover {
  margin-bottom: -0.5rem;
  height: calc(100% + 1rem);
  padding-bottom: 3rem;
}
@media (min-width: 36rem) {
  .container {
    padding: 1rem 1rem 3rem 1rem;
  }
  :global(.no-touch) .noStatic:hover {
    padding: 1.5rem 1.5rem 6rem 1.5rem;
  }
  :global(.no-touch) .outOfStock.noStatic:hover {
    padding-bottom: 3.5rem;
  }
}

.fullWidthImage {
  margin-left: -2.5rem !important;
  margin-top: -2.5rem !important;
  width: calc(100% + 5rem) !important;
  padding-bottom: calc(100% + 3rem) !important;
}

.sticker {
  top: 0.5rem;
  left: 0;
}
:global(.no-touch) .container:hover .sticker {
  top: 1rem;
  padding-left: 1.5rem;
}
:global(.no-touch) .container:hover .sticker:after {
  left: 1.5rem;
}

.reviews { margin-top: 1rem; }
:global(.no-touch) .noStatic .reviews {
  opacity: 0;
  transition: opacity 0.2s ease;
}
:global(.no-touch) .noStatic:hover .reviews {
  opacity: 1;
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
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  transition: all 0.2s ease;
  text-align: right;
}
:global(.no-touch) .noStatic:hover .prices {
  bottom: 3.5rem;
  right: 1rem;
}
:global(.no-touch) .outOfStock.noStatic:hover .prices {
  bottom: 1rem;
}

@media (min-width: 36rem) {
  .prices {
    bottom: 1rem;
    right: 1rem;
  }
  :global(.no-touch) .noStatic:hover .prices {
    bottom: 4rem;
    right: 1.5rem;
  }
  :global(.no-touch) .outOfStock.noStatic:hover .prices {
    bottom: 1.5rem;
  }
}


.beforePrice {
  color: var(--color-grey);
  text-decoration: line-through;
}
.price {
  composes: h2 from global;
  margin-left: 0.5rem;
}
.red { color: var(--color-red); }

.btnWrapper {
  position: absolute !important;
  bottom: -3rem;
  width: calc(100% + 1rem);
  left: -0.5rem;
  background-color: var(--color-grey-dark);
  transition: all 0.2s ease;
}
:global(.no-touch) .noStatic:hover .btnWrapper,
.static .btnWrapper {
  bottom: 0;
  width: 100%;
  left: 0;
}
.outOfStock .btnWrapper {
  display: none;
}

.static {
  margin-bottom: -3.5rem;
  height: calc(100% + 3.5rem);
  padding-bottom: 5.5rem;
  cursor: default;
}
.static .prices {
  bottom: 3.5rem;
}
</style>
