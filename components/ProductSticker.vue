<template>
  <div v-if="label" :class="[$style.sticker, $style[label.color]]" class="is-small">
    {{label.text}}
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line

export default {
  props: {
    product: Object,
  },
  computed: {
    ...mapState(['user']),
    quantityInBasket() {
      const match = this.user.basket.items.find(item => item.product.id === this.product.id);
      if (!match) { return 0; }
      return match.quantity;
    },
    label() {
      if (this.product.stock.level === 0) {
        return {
          color: 'red',
          text: this.product.stock.status,
        };
      }
      if (this.quantityInBasket > 0) {
        return {
          color: 'blue',
          text: `${this.quantityInBasket} lagt i kurven`,
        };
      }
      if (this.product.label) {
        return this.product.label;
      }
      return null;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.sticker {
  position: absolute;
  background-color: var(--color-yellow);
  font-weight: bold;
  padding: 0 1rem;
  line-height: 1.5rem;
  transition: all 0.2s ease;
  z-index: 10;
}
.sticker:after {
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

.red {
  color: var(--color-white);
  background-color: var(--color-red);
}
.red:after {
  border-top: 0.5rem solid var(--color-red);
  border-right: 1px solid var(--color-red);
}
.green {
  color: var(--color-white);
  background-color: var(--color-green);
}
.green:after {
  border-top: 0.5rem solid var(--color-green);
  border-right: 1px solid var(--color-green);
}
.blue {
  color: var(--color-white);
  background-color: var(--color-primary);
}
.blue:after {
  border-top: 0.5rem solid var(--color-primary);
  border-right: 1px solid var(--color-primary);
}
</style>
