<template>
  <div @mouseover="setProductsInSlider" @mousewheel="scrolled" :class="$style.container">
    <grid :class="$style.headerGrid">
      <grid-col tablet="8">
        <h2 v-html="header" />
      </grid-col>
      <grid-col mobile="0" tablet="4" :class="$style.headerRight">
        <div :class="$style.stepIndicatorWrapper">
          <span v-if="slides > 1" v-for="n in slides" :key="n" :class="[
            $style.stepIndicator,
            { [$style.stepIndicatorActive]: (n === position + 1) }
          ]">
            &#8211;
          </span>
        </div>
        <nuxt-link to="/" :class="$style.showAllLink">vis alle</nuxt-link>
      </grid-col>
    </grid>
    <div :class="$style.slider">
      <div :class="[$style.move, $style.prev]">
        <div v-if="position != 0" :class="$style.moveInner" @click="prev">
          <arrow  direction="left" :class="$style.arrow" />
        </div>
      </div>
      <div :class="$style.sliderInner" :style="{
          'transform': `translate3d(${position === 0 ? '0' : `-${position}00%`}, 0, 0)`,
        }">
        <div v-for="(product, i) in shownProducts" :key="product.id" :class="$style.item">
          <template v-if="i<=5">
            <product-card :product="product" :lazy="lazy" />
          </template>
          <no-ssr v-else>
            <product-card :product="product" :lazy="true" />
          </no-ssr>
        </div>
        <div :class="[$style.item, $style.showAll]">
          <btn type="grey" shadow :class="$style.showAllBtn">Vis alle</btn>
        </div>
      </div>
      <div
        v-if="position + 1 < shownProducts.length / productsInSlider"
        :class="[$style.move, $style.next]"
      >
        <div :class="$style.moveInner" @click="next">
          <arrow  direction="right" :class="$style.arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import throttle from 'lodash/throttle';
import Grid from '../components/Grid.vue';
import GridCol from '../components/GridCol.vue';
import Arrow from './Arrow.vue';
import Btn from './Btn.vue';
import ProductCard from './ProductCard.vue';
import { getDataFromCss } from '../utils';
import { getProducts, Product } from '../utils/product';

const emptyProduct = {
  images: ['https://images.contentful.com/n8ckv2qtuzei/3ukzEElRAkO08o0owQA28K/d2385d4d79c93a0b8842aa2aa05eeb12/Bars.gif'],
};

export default {
  components: {
    Grid,
    GridCol,
    Arrow,
    ProductCard,
    Btn,
  },
  props: {
    header: String,
    query: Object,
    initProducts: Array,
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      position: 0,
      productsInSlider: 0,
      slides: 1,
      fetchedProducts: null,
      products: [
        emptyProduct,
        emptyProduct,
        emptyProduct,
        emptyProduct,
        emptyProduct,
        emptyProduct,
      ],
    };
  },
  computed: {
    shownProducts() {
      if (this.fetchedProducts) {
        return this.fetchedProducts;
      }
      return this.products;
    },
  },
  methods: {
    next() {
      if (this.position < this.slides - 1) {
        this.position += 1;
      }
    },
    prev() {
      if (this.position > 0) {
        this.position -= 1;
      }
    },
    setProductsInSlider() {
      this.productsInSlider = getDataFromCss('visibleProductsInSlider', 0);
      this.slides = Math.ceil(this.shownProducts.length / this.productsInSlider);
    },
    slide: throttle((delta, next, prev) => {
      if (delta < 0) {
        next();
      } else if (delta > 0) {
        prev();
      }
    }, 1000, { trailing: false, leading: true }),
    scrolled(event) {
      if (event.wheelDeltaY === 0 && (event.wheelDeltaX < -10 || event.wheelDeltaX > 10)) {
        this.slide(event.wheelDeltaX, this.next, this.prev);
      }
    },
  },
  mounted() {
    if (this.initProducts) {
      this.products = this.initProducts;
      return;
    }
    if (this.query) {
      getProducts({ ...this.query, limit: 36 })
        .then((data) => {
          this.products = data.items.map(Product);
        });
    }
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.slider {
  position: relative;
  padding: 0 0.5rem;
  overflow-x: hidden;
}
:global(.touch) .slider {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  margin-bottom: -1rem;
}
:global(.no-touch) .slider {
  padding-top: 1rem;
  padding-bottom: 4rem;
  margin-top: -1rem;
  margin-bottom: -4rem;
}
:global(.no-touch) .slider:hover {
  z-index: 10;
}

.headerGrid { margin-bottom: 1rem; }
.headerRight { text-align: right; }

.stepIndicatorWrapper {
  display: inline-block;
  margin-right: 2rem;
}

.stepIndicator {
  display: inline-block;
  opacity: 0;
  color: var(--color-grey);
  padding: 0 0.125rem;
  transition: color 0.5s ease, opacity 0.2s ease;
  margin-bottom: -0.25rem;
}
.stepIndicatorActive {
  color: var(--color-grey-darker);
}
:global(.no-touch) .container:hover .stepIndicator {
  opacity: 1;
}

.showAllLink {
  composes: small from global;
  color: var(--color-grey-darker);
}

.slider { position: relative; }
.sliderInner {
  display: flex;
  transition: transform 0.5s ease;
}

.move {
  position: absolute;
  top: 1rem;
  bottom: 4rem;
  width: 2.5rem;
  z-index: 10;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}
:global(.no-touch) .container:hover .move {
  opacity: 1;
}
.prev {
  padding-right: 1rem;
  left: 0rem;
}
.next {
  padding-left: 1rem;
  right: 0rem;
}
.moveInner {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.85);
}

.arrow {
  position: absolute;
  top: calc(50% - 0.75rem);
  left: calc(50% - 0.5rem);
}
:global(.no-touch) .move:hover .arrow {
  border-left-color: var(--color-primary);
}

.item {
  display: flex;
  flex: 0 0 58.3333%; /* 7 cols */
  padding: 0 0.5rem;
}

.showAll {
  display: none;
}
:global(.touch) .showAll {
  display: flex;
}
.showAllBtn {
  width: 100%;
  height: 100%;
}

body:before {
  content: '{ "visibleProductsInSlider": 2 }';
  display: none;
}

@media (min-width: 30rem) {
  body:before { content: '{ "visibleProductsInSlider": 3 }'; }
  .item {
    flex: 0 0 41.6667%; /* 5 cols */
  }
}
@media (min-width: 48rem) {
  .slider {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .item {
    flex: 0 0 33.3333%; /* 4 cols */
  }
}
@media (min-width: 54rem) {
  body:before { content: '{ "visibleProductsInSlider": 4 }'; }
  .item {
    flex: 0 0 25%; /* 3 cols */
  }
}
@media (min-width: 64rem) {
  .slider {
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }
  .move {
    width: 4rem;
  }
}
@media (min-width: 80rem) {
  body:before { content: '{ "visibleProductsInSlider": 6 }'; }
  .item {
    flex: 0 0 16.6667%; /* 2 cols */
  }
}
</style>
