<template>
  <div :class="$style[`${height}Container`]">
    <div :class="[$style.wrapper, { [$style.active]: quantityInBasket > 0 }]">
      <btn
        type="primary"
        :shadow="shadow"
        :height="height"
        :class="[$style.removeOneButton, { [$style.width25]: quantityInBasket > 0 }]"
        @click.stop.prevent.native="subtractInBasket(product)"
      >-</btn>
      <btn
        type="grey"
        :shadow="shadow"
        :height="height"
        :class="[$style.quantityButton, { [$style.left25]: quantityInBasket > 0 }]"
      >{{quantityInBasket}} {{quantityLabel}}</btn>
      <btn
        type="primary"
        :shadow="shadow"
        :height="height"
        :class="[$style.addOneButton, { [$style.width25]: quantityInBasket > 0 }]"
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
        :class="[$style.readMoreButton, { [$style.left25]: quantityInBasket > 0 }]"
      >Læs mere</btn>
      <btn
        type="buy"
        :shadow="shadow"
        :height="height"
        :class="[
          $style.addToBasketButton,
          {
            [$style.width25]: quantityInBasket > 0,
            [$style.width100]: hideReadMore && quantityInBasket === 0
          }
        ]"
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

.defaultContainer {
  position: relative;
  height: 3rem;
}
.largeContainer {
  position: relative;
  height: 4.5rem;
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
  width: 50%;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.width100 { width: 100% !important; }
.width25 { width: 25% !important; }
.left25 { left: 25% !important; }

.addToBasketButton {
  composes: button;
  right: 0;
}

.readMoreButton {
  composes: button;
  left: 0;
}

.removeOneButton {
  composes: button;
  left: 0;
  width: 0;
  z-index: 2;
}

.quantityButton {
  composes: button;
  left: 0;
}
.quantityButton:hover {
  z-index: 3;
}

.addOneButton {
  composes: button;
  right: 0;
  z-index: 2;
}
</style>
