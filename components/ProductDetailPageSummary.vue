<template>
  <div>
    <grid class="has-small-vertical-margin">
      <ul class="is-12-col is-inline-list is-small">
        <li v-for="department in departments"><nuxt-link to="/" class="is-grey">{{department}}</nuxt-link><span class="is-dimmed has-tiny-horizontal-padding">/</span></li>
        <li><span class="is-dimmed">{{product.titel}}</span></li>
      </ul>
    </grid>
    <grid class="has-no-top-margin">
      <div class="is-12-col has-white-background">
        <grid inner>
          <div class="is-1-col">
            <ul
              class="is-unstyled-list has-large-top-padding has-large-left-padding"
              :class="$style.thumbnailList"
            >
              <li v-for="(image, i) in product.images">
                <img
                  :src="`${image}?w=200&auto=format&fm=jpg`"
                  class="is-full-width"
                  :class="$style[`thumbnailImage${nextImagePos === i ? 'Active' : ''}`]"
                  @click="setActiveImage(i)"
                />
              </li>
            </ul>
          </div>
          <div class="is-6-col has-large-vertical-padding">
            <div :class="$style.image">
              <img
                :src="`${product.images[activeImagePos]}?w=1000&auto=format&fm=jpg`"
                :class="{
                  [$style.loadingImage]: loadingImage,
                }"
              />
            </div>
          </div>
          <div class="is-5-col" :class="$style.summaryBox">
            <div :class="$style.summaryBoxInner">
              <h1>{{product.titel}}</h1>
              <ul class="is-inline-list has-tiny-top-padding">
                <li>
                  <star v-for="n in 5" :key="n" :rating="product.rating" :pos="n" />
                  &nbsp;&nbsp;{{product.rating.toFixed(1).replace('.', ',')}}
                </li>
                <li class="is-dimmed has-tiny-horizontal-padding">/</li>
                <li>{{recommendationPercentage}}% anbefaler</li>
                <li class="is-dimmed has-tiny-horizontal-padding">/</li>
                <li><a href="#reviews">54 anmeldelser</a></li>
                <li class="is-dimmed has-tiny-horizontal-padding">/</li>
                <li><a href="#reviews">23 brugerbilleder</a></li>
              </ul>
            </div>
            <div :class="$style.summaryBoxInner">
              <p>{{product.shortDescription.slice(0,250)}}... <a href="#description">Læs mere</a></p>
              <h2 class="has-small-top-margin">Nøglespecifikationer</h2>
              <ul class="is-unstyled-list has-tiny-top-margin">
                <li v-for="keySpec in product.keySpecifications">
                  <strong class="is-dimmed">{{keySpec.key}}:</strong> {{keySpec.value}}
                </li>
              </ul>
              <p class="has-tiny-top-margin"><a href="#specifications">Se alle specifikationer</a></p>
              <p class="is-aligned-right has-small-top-margin">
                <span
                  v-if="product.beforePrice"
                  class="has-tiny-right-margin"
                  :class="$style.beforePrice"
                >
                  {{numberWithDots(product.beforePrice)}},00 kr.
                </span>
                <span class="is-h1" :class="{
                  'is-red': product.beforePrice,
                }">{{numberWithDots(product.price)}},00 kr.</span>
              </p>
            </div>
            <div :class="$style.summaryBoxInner">
              <add-to-cart
                shadow
                hideReadMore
                height="large"
                quantityLabel="lagt i kurven"
                :product="product"
              />
              <p class="has-top-margin"><strong class="is-green">På lager.</strong> Kan også afhentes i 9 butikker. <a href="#">Se hvilke butikker</a></p>
              <p class="has-tiny-top-margin"><strong>3-5 dages til 29,-</strong> Eller få den allerede i morgen ved valg af hurtigere leveringsmulighed. <a href="#">Se alle leveringsmuligheder</a></p>
            </div>
          </div>
        </grid>
      </div>
    </grid>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import { loadImage, numberWithDots } from '../utils';
import Grid from './Grid.vue';
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';

export default {
  components: {
    Grid,
    Star,
    AddToCart,
  },
  props: {
    product: Object,
    departments: Array,
  },
  data() {
    return {
      activeImagePos: 0,
      nextImagePos: 0,
      loadingImage: false,
    };
  },
  computed: {
    recommendationPercentage() {
      return Math.ceil(this.product.recommendations * 100);
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
    setActiveImage(position) {
      this.loadingImage = true;
      this.nextImagePos = position;
      loadImage(this.product.images[position]).then(() => {
        // Make sure this is the newest image
        if (this.nextImagePos === position) {
          this.activeImagePos = position;
          this.loadingImage = false;
        }
      });
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.thumbnailList li:not(:first-child) {
  margin-top: 1rem;
}

.thumbnailImage {
  display: block;
  border: 1px solid var(--color-grey-lighter);
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.thumbnailImageActive {
  composes: thumbnailImage;
  border-color: var(--color-grey);
}

.image {
  position: relative;
  padding-bottom: 100%;
  width: 100%;
}
.image img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  transition: opacity 0.5s ease;
}
.loadingImage {
  opacity: 0;
}

.summaryBox {
  border-left: 1px solid var(--color-grey-lighter);
}

.summaryBoxInner {
  padding: 2rem;
}
.summaryBoxInner:not(:last-child) {
  border-bottom: 1px solid var(--color-grey-lighter);
}

.beforePrice {
  color: var(--color-grey);
  text-decoration: line-through;
}
</style>
