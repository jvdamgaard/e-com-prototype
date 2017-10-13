<template>
  <div :class="$style.summaryBox">
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
      <p class="is-aligned-right has-small-top-margin is-hidden-on-tablet">
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
    <div :class="$style.summaryBoxInner" class="is-hidden-on-mobile is-visible-on-tablet">
      <p>{{product.shortDescription.slice(0,250)}}... <a href="#description">Læs mere</a></p>
      <h2 class="has-small-top-margin">Nøglespecifikationer</h2>
      <ul class="is-unstyled-list has-tiny-top-margin">
        <li v-for="keySpec in product.keySpecifications">
          <strong class="is-dimmed">{{keySpec.key}}:</strong> {{keySpec.value}}
        </li>
      </ul>
      <p class="has-tiny-top-margin"><a href="#specifications">Se alle specifikationer</a></p>
      <p class="is-aligned-right has-small-top-margin is-hidden-on-mobile is-visible-on-tablet">
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
    <div :class="$style.summaryBoxInner" class="is-hidden-on-mobile is-visible-on-laptop">
      <add-to-cart
        shadow
        hideReadMore
        height="large"
        quantityLabel="lagt i kurven"
        :product="product"
      />
      <p class="has-tiny-top-margin"><strong class="is-green">På lager.</strong> Kan også afhentes i 9 butikker. <a href="#">Se hvilke butikker</a></p>
      <p class="has-tiny-top-margin"><strong>3-5 dages til 29,-</strong> Eller få den allerede i morgen ved valg af hurtigere leveringsmulighed. <a href="#">Se alle leveringsmuligheder</a></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; // eslint-disable-line
import { numberWithDots } from '../utils';
import Star from './Star.vue';
import AddToCart from './AddToCart.vue';

export default {
  components: {
    Star,
    AddToCart,
  },
  props: {
    product: Object,
  },
  computed: {
    recommendationPercentage() {
      return Math.ceil(this.product.recommendations * 100);
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

.summaryBox {
  height: 100%;
  border-left: 1px solid var(--color-grey-lighter);
}

.summaryBoxInner { padding: 1rem; }

@media (min-width: 64rem) {
  .summaryBoxInner { padding: 2rem; }
}

.summaryBoxInner:not(:first-child) {
  border-top: 1px solid var(--color-grey-lighter);
}

.beforePrice {
  color: var(--color-grey);
  text-decoration: line-through;
}
</style>
