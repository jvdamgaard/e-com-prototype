<template>
  <div :class="$style.container">
    <div :class="$style.itemMenuIcon">&#8942;</div>
    <nuxt-link :to="url" :class="$style.image">
      <image-container
        :src="product.images[0]"
        :width="448"
        :height="448"
      />
    </nuxt-link>
    <div :class="$style.content">
      <h3 :class="$style.header"><nuxt-link :to="url" :class="$style.blackLink"><strong>{{product.titel}}</strong></nuxt-link></h3>
      <p v-if="product.stock.status" :class="$style.red">{{product.stock.status}}</p>
      <p><span :class="$style.dimmed">Antal:</span> {{quantity}}</p>
      <p v-if="quantity > 1">
        <span :class="$style.dimmed">Pr. stk.:</span> {{numberWithDots(product.price)}} kr
      </p>
      <div :class="$style.btns">
        <p><btn type="ghost-dimmed" height="small" @click.native="removeFromBasket(product)" :class="$style.btn">Fjern fra kurven</btn></p>
      </div>

      <div :class="$style.prices">
        <span v-if="product.beforePrice" :class="$style.beforePrice">{{numberWithDots(quantity * product.beforePrice)}} kr</span>
        <span class="" :class="[
          $style.price,
          { [$style.red]: product.beforePrice },
        ]">{{numberWithDots(quantity * product.price)}} kr</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import kebabCase from 'lodash/kebabCase';
import { numberWithDots } from '../utils';
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import ImageContainer from './Image.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    ImageContainer,
  },
  props: {
    product: Object,
    quantity: Number,
  },
  computed: {
    url() {
      return `/produkt/${kebabCase(this.product.titel)}/${this.product.id}/`;
    },
  },
  methods: {
    numberWithDots,
    ...mapActions({
      removeFromBasket: 'user/removeFromBasket',
    }),
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  composes: group from global;
  align-items: normal;
  background-color: var(--color-white);
  margin-top: 1px;
}

.blackLink { color: var(--color-black); }
.red { color: var(--color-red); }
.dimmed { color: var(--color-grey-dark); }

.itemMenuIcon {
  composes: h2 from global;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
}

.image {
  width: 8rem;
  height: 8rem;
  padding: 0.5rem;
}

.content {
  display: block;
  padding: 1rem;
  width: calc(100% - 8rem);
}

.header {
  width: calc(100% - 2.5rem);
}

.btns {
  composes: hiddenOnMobile from global;
  composes: visibleOnTablet from global;
  margin-top: 1rem;
}

.btn {
  display: inline-block;
}

.prices {
  margin-top: 1rem;
  text-align: right;
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

@media (min-width: 48rem) {
  .image {
    width: 14rem;
    height: 14rem;
    padding: 1rem;
  }
  .content {
    width: calc(100% - 14rem);
  }
  .header {
    width: 100%;
  }
  .prices {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
  .beforePrice {
    font-size: 1rem;
  }
  .price {
    composes: h2 from global;
    margin-left: 1rem;
  }
}
</style>
