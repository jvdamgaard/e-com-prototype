<template>
  <div :class="[
    $style.container,
    $style[height],
    {
      [$style.hideReadMore]: hideReadMore,
      [$style.inBasket]: quantityInBasket > 0,
    }
  ]">
    <div :class="[$style.wrapper, { [$style.active]: quantityInBasket > 0 }]">
      <btn
        type="primary"
        :shadow="shadow"
        :height="height"
        :class="$style.removeOneButton"
        @click.stop.prevent.native="subtractInBasket(product)"
      >-</btn>
      <btn
        type="grey"
        :shadow="shadow"
        :height="height"
        :class="$style.quantityButton"
      >{{quantityInBasket}} {{quantityLabel}}</btn>
      <btn
        type="primary"
        :shadow="shadow"
        :height="height"
        :class="$style.addOneButton"
        class="ProductCard__button--add-one"
        @click.stop.prevent.native="addToBasket(product)"
      >+</btn>
    </div>

    <div :class="[$style.wrapper, { [$style.active]: quantityInBasket === 0 }]">
      <btn
        v-if="!hideReadMore"
        type="grey"
        :shadow="shadow"
        :height="height"
        :class="$style.readMoreButton"
      >Læs mere</btn>
      <btn
        type="buy"
        :shadow="shadow"
        :height="height"
        :class="$style.addToBasketButton"
        @click.stop.prevent.native="addToBasket(product)"
      >Læg i kurv</btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import Btn from './Btn.vue';

export default {
  components: {
    Btn,
  },
  props: {
    product: Object,
    hideReadMore: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    quantityLabel: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'large'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    ...mapState(['user']),
    quantityInBasket() {
      const match = this.user.basket.items.find(item => item.product.id === this.product.id);
      if (!match) { return 0; }
      return match.quantity;
    },
  },
  methods: {
    ...mapActions({
      addToBasket: 'user/addToBasket',
      subtractInBasket: 'user/subtractInBasket',
    }),
  },
};
</script>


<style module>
@import '../assets/css/variables.css';

.container {
  position: relative;
  background-color: var(--color-grey-dark);
}

.container.hideReadMore {
  background-color: var(--color-buy);
}

.default {
  height: 3rem;
}
.large {
  height: 4rem;
}

.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s ease;
  opacity: 0;
  z-index: 1;
}

.active {
  opacity: 1 !important;
  z-index: 2 !important;
}

.button {
  position: absolute;
}

.readMoreButton { composes: button; left: 0; width: 50%; }
.hideReadMore .readMoreButton { display: none; }
.inBasket .readMoreButton { left: 25%; }

.addToBasketButton { composes: button; left: 50%; width: 50%; }
.hideReadMore .addToBasketButton { left: 0%; width: 100%; }
.inBasket .addToBasketButton { left: 75%; width: 25%; }

.removeOneButton { composes: button; left: 0; width: 0; z-index: 2; }
.inBasket .removeOneButton { width: 25%; }

.quantityButton { composes: button; left: 0; width: 50%; }
.quantityButton:hover { z-index: 3; }
.hideReadMore .quantityButton { width: 0; }
.inBasket .quantityButton { width: 50%; left: 25%; }

.addOneButton { composes: button; left: 50%; z-index: 2; width: 50%; }
.hideReadMore .addOneButton { left: 0; width: 100%; }
.inBasket .addOneButton { left: 75%; width: 25%; }
</style>
