<template>
  <nuxt-link
    :to="url"
    class="ProductCard has-white-background"
    :class="{
      'ProductCard--out-of-stock': product.stock.level === 0,
      'ProductCard--in-basket': quantityInBasket > 0,
    }"
    @mouseover.native="hovering = true"
    @mouseleave.native="hovering = false"
  >
    <div
      v-if="quantityInBasket > 0"
      class="ProductCard__sticker ProductCard__sticker--blue is-small"
    >
      {{quantityInBasket}} lagt i kurven
    </div>
    <div
      v-else-if="product.stock.level === 0"
      class="ProductCard__sticker ProductCard__sticker--red is-small"
    >
      {{product.stock.status}}
    </div>
    <div
      v-else-if="product.label"
      class="ProductCard__sticker is-small"
      :class="`ProductCard__sticker--${product.label.color}`"
    >
      {{product.label.text}}
    </div>
    <div
      v-else-if="product.beforePrice"
      class="ProductCard__sticker is-small"
    >
      Spar {{numberWithDots(product.beforePrice - product.price)}},-
    </div>

    <product-image
      :images="product.images"
      :imagePosition="imagePosition"
      :changeImagePosiiton="setImagePosition"
      :lazy="lazy"
      :hovering="hovering"
      type="productCard"
      width="400"
      height="300"
    />
    <p class="ProductCard__reviews has-small-top-margin">
      <star v-for="n in 5" :key="n" :rating="product.rating" :pos="n" />
      <small class="is-dimmed" style="float: right">{{recommendationPercentage}}% <span class="is-hidden-on-mobile is-inline-on-phablet">anbefaler</span></small>
    </p>
    <p class="ProductCard__titel is-small is-body-size-on-desktop">
      {{product.titel}}<br>
      <span v-if="product.stock.status" class="is-red is-small">{{product.stock.status}}</span>
    </p>
    <p class="ProductCard__prices is-aligned-right">
      <span v-if="product.beforePrice" class="ProductCard__before-price">{{numberWithDots(product.beforePrice)}},-</span>
      <span class="is-h2 has-tiny-left-margin" :class="{
        'is-red': product.beforePrice,
      }">{{numberWithDots(product.price)}},-</span>
    </p>

    <add-to-cart :product="product" class="ProductCard__btn-wrapper"/>

  </nuxt-link>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import kebabCase from 'lodash/kebabCase';
import { numberWithDots } from '../utils';
import Btn from './Btn.vue';
import Arrow from './Arrow.vue';
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';
import ProductImage from './ProductImage.vue';

export default {
  components: {
    Btn,
    Arrow,
    Star,
    AddToCart,
    ProductImage,
  },
  props: {
    product: Object,
    lazy: {
      type: Boolean,
      default: true,
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
      return `/produkt/${kebabCase(this.product.titel)}/${this.product.id}/`;
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

<style>
@import '../assets/css/variables.css';

.ProductCard {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.5rem 0.5rem 3rem 0.5rem;
  transition: all 0.2s ease;
  color: var(--color-black);
  overflow: hidden;
}
.no-touch .ProductCard:hover {
  margin: -0.5rem -0.5rem -3rem;
  height: calc(100% + 3.5rem);
  width: calc(100% + 1rem);
  padding: 1rem 1rem 5.5rem 1rem;
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
  text-decoration: none;
  z-index: 10;
}
.no-touch .ProductCard--out-of-stock:hover {
  margin-bottom: -0.5rem;
  height: calc(100% + 1rem);
  padding-bottom: 3rem;
}
@media (min-width: 36rem) {
  .ProductCard {
    padding: 1rem 1rem 3rem 1rem;
  }
  .no-touch .ProductCard:hover {
    padding: 1.5rem 1.5rem 6rem 1.5rem;
  }
  .no-touch .ProductCard--out-of-stock:hover {
    padding-bottom: 3.5rem;
  }
}

.ProductCard__sticker {
  position: absolute;
  top: 0.5rem;
  left: 0;
  background-color: var(--color-yellow);
  font-weight: bold;
  padding: 0 1rem;
  line-height: 1.5rem;
  transition: all 0.2s ease;
  z-index: 10;
}
.ProductCard__sticker:after {
  content: '';
  border-top: 0.5rem solid var(--color-yellow);
  border-right: 1px solid var(--color-yellow);
  border-left: 0.5rem solid transparent;
  bottom: -0.5rem;
  content: "";
  position: absolute;
  left: 1rem;
  width: 0;
  height: 0;
  transition: left 0.2s ease;
}
.no-touch .ProductCard:hover .ProductCard__sticker {
  top: 1rem;
  padding-left: 1.5rem;
}
.no-touch .ProductCard:hover .ProductCard__sticker:after {
  left: 1.5rem;
}
.ProductCard__sticker--red {
  color: var(--color-white);
  background-color: var(--color-red);
}
.ProductCard__sticker--red:after {
  border-top: 0.5rem solid var(--color-red);
  border-right: 1px solid var(--color-red);
}
.ProductCard__sticker--green {
  color: var(--color-white);
  background-color: var(--color-green);
}
.ProductCard__sticker--green:after {
  border-top: 0.5rem solid var(--color-green);
  border-right: 1px solid var(--color-green);
}
.ProductCard__sticker--blue {
  color: var(--color-white);
  background-color: var(--color-primary);
}
.ProductCard__sticker--blue:after {
  border-top: 0.5rem solid var(--color-primary);
  border-right: 1px solid var(--color-primary);
}

.ProductCard__image {
  position: relative;
  padding-bottom: 75%;
  width: 100%;
}
.ProductCard__image img {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  transition: opacity 0.5s ease;
}
.ProductCard__image img.loading {
  opacity: 0;
}
.ProductCard--out-of-stock .ProductCard__image img {
  filter: grayscale(100%);
  opacity: 0.5;
}

.ProductCard__arrow {
  opacity: 0;
  position: absolute;
  top: calc(50% - 0.375rem);
}
.no-touch .ProductCard:hover .ProductCard__arrow {
  opacity: 1;
}
.ProductCard__arrow--right {
  right: -1.25rem;
}
.ProductCard__arrow--left {
  left: -1.25rem;
}

.no-touch .ProductCard__reviews {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.no-touch .ProductCard:hover .ProductCard__reviews {
  opacity: 1;
}

.ProductCard__prices {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  transition: all 0.2s ease;
}
.no-touch .ProductCard:hover .ProductCard__prices {
  bottom: 4rem;
  right: 1.5rem;
}
.no-touch .ProductCard--out-of-stock:hover .ProductCard__prices {
  bottom: 1.5rem;
}
.ProductCard__before-price {
  color: var(--color-grey);
  text-decoration: line-through;
}

.ProductCard__btn-wrapper {
  position: absolute !important;
  bottom: -3rem;
  width: calc(100% + 1rem);
  left: -0.5rem;
  background-color: var(--color-grey-dark);
  transition: all 0.2s ease;
}
.no-touch .ProductCard:hover .ProductCard__btn-wrapper {
  bottom: 0;
  width: 100%;
  left: 0;
}
.ProductCard--out-of-stock .ProductCard__btn-wrapper {
  display: none;
}
</style>
