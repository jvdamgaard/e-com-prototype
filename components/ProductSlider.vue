<template>
  <div class="ProductSliderWrapper" @mouseover="setProductsInSlider">
    <Grid class="has-tiny-bottom-margin">
      <div class="is-12-col is-8-col-on-tablet">
        <h2 v-html="header" />
      </div>
      <div class="is-4-col is-hidden-on-mobile is-visible-on-tablet is-aligned-right">
        <div class="is-inline has-right-margin">
          <span v-if="slides > 1" v-for="n in slides" :key="n" class="ProductSlider__slider-indicator" :class="{
            'ProductSlider__slider-indicator--active': (n === position + 1),
          }">
            &#8211;
          </span>
        </div>
        <nuxt-link to="/" class="is-grey is-small">vis alle</nuxt-link>
      </div>
    </Grid>
    <div class="ProductSlider" @mousewheel="scrolled">
      <div class="ProductSlider__move ProductSlider__move--prev">
        <div v-if="position != 0" class="ProductSlider__move-inner" @click="prev">
          <Arrow  direction="left" class="ProductSlider__arrow" />
        </div>
      </div>
      <div class="ProductSlider__inner" :style="{
          'transform': `translate3d(-${position}00%, 0, 0)`,
        }">
        <div v-for="product in fetchedProducts" :key="product.id" class="ProductSlider__item">
          <product-card :product="product" @click.native="addToLastSeen(product)" />
        </div>
        <div class="ProductSlider__item ProductSlider__item--show-all">
          <Btn type="grey" shadow class="ProductSlider__show-all-btn">Vis alle</Btn>
        </div>
      </div>
      <div v-if="position + 1 < fetchedProducts.length / productsInSlider" class="ProductSlider__move ProductSlider__move--next">
        <div class="ProductSlider__move-inner" @click="next">
          <Arrow  direction="right" class="ProductSlider__arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import throttle from 'lodash/throttle';
import shuffle from 'lodash/shuffle';
import Grid from '../components/Grid.vue';
import Arrow from './Arrow.vue';
import Btn from './Btn.vue';
import ProductCard from './ProductCard.vue';
import { getDataFromCss } from '../utils';

export default {
  components: {
    Grid,
    Arrow,
    ProductCard,
    Btn,
  },
  props: {
    header: String,
    src: String,
    products: Array,
  },
  data() {
    return {
      position: 0,
      productsInSlider: 0,
      slides: 1,
      fetchedProducts: this.products || [],
    };
  },
  created() {
    if (!process.browser || !this.src) { return; }
    fetch(this.src).then(response => response.json()).then((products) => {
      this.fetchedProducts = shuffle(products).slice(0, 36);
    });
  },
  methods: {
    ...mapActions({
      addToLastSeen: 'user/addToLastSeen',
    }),
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
      this.slides = Math.ceil(this.fetchedProducts.length / this.productsInSlider);
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
};
</script>

<style>
@import '../assets/css/variables.css';

.ProductSlider {
  position: relative;
  padding: 0 0.5rem;
  overflow-x: hidden;
}
.touch .ProductSlider {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
  margin-bottom: -1rem;
}
.no-touch .ProductSlider {
  padding-top: 1rem;
  padding-bottom: 4rem;
  margin-top: -1rem;
  margin-bottom: -4rem;
}
.no-touch .ProductSlider:hover {
  z-index: 10;
}

.ProductSlider__slider-indicator {
  display: inline-block;
  opacity: 0;
  color: var(--color-grey);
  padding: 0 0.125rem;
  transition: color 0.5s ease, opacity 0.2s ease;
  margin-bottom: -0.25rem;
}
.ProductSlider__slider-indicator--active {
  color: var(--color-grey-darker);
}
.no-touch .ProductSliderWrapper:hover .ProductSlider__slider-indicator {
  opacity: 1;
}

.ProductSlider__inner {
  display: flex;
  transition: transform 0.5s ease;
}

.ProductSlider__move {
  position: absolute;
  top: 1rem;
  bottom: 4rem;
  width: 2.5rem;
  z-index: 10;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.no-touch .ProductSliderWrapper:hover .ProductSlider__move {
  opacity: 1;
}
.ProductSlider__move--prev {
  padding-right: 1rem;
  left: 0rem;
}
.ProductSlider__move--next {
  padding-left: 1rem;
  right: 0rem;
}
.ProductSlider__move-inner {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,0.85);
}

.ProductSlider__arrow {
  position: absolute;
  top: calc(50% - 0.75rem);
  left: calc(50% - 0.5rem);
}
.no-touch .ProductSlider__move--next .ProductSlider__move-inner:hover .ProductSlider__arrow {
  border-left-color: var(--color-primary);
}
.no-touch .ProductSlider__move--prev .ProductSlider__move-inner:hover .ProductSlider__arrow {
  border-right-color: var(--color-primary);
}

.ProductSlider__item {
  display: flex;
  flex: 0 0 58.3333%; /* 7 cols */
  padding: 0 0.5rem;
}

.ProductSlider__item--show-all {
  display: none;
}
.touch .ProductSlider__item--show-all {
  display: flex;
}
.ProductSlider__show-all-btn {
  width: 100%;
  height: 100%;
}

body:before {
  content: '{ "visibleProductsInSlider": 2 }';
  display: none;
}

@media (min-width: 30rem) {
  body:before { content: '{ "visibleProductsInSlider": 3 }'; }
  .ProductSlider__item {
    flex: 0 0 41.6667%; /* 5 cols */
  }
}
@media (min-width: 48rem) {
  .ProductSlider {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .ProductSlider__item {
    flex: 0 0 33.3333%; /* 4 cols */
  }
}
@media (min-width: 54rem) {
  body:before { content: '{ "visibleProductsInSlider": 4 }'; }
  .ProductSlider__item {
    flex: 0 0 25%; /* 3 cols */
  }
}
@media (min-width: 64rem) {
  .ProductSlider {
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }
  .ProductSlider__move {
    width: 4rem;
  }
}
@media (min-width: 80rem) {
  body:before { content: '{ "visibleProductsInSlider": 6 }'; }
  .ProductSlider__item {
    flex: 0 0 16.6667%; /* 2 cols */
  }
}
</style>
