<template>
  <checkout-box
    :class="{ [$style.inactive]: inactive, [$style.filled]: filled }"
    :inactive="inactive"
  >
    <div v-if="number" :class="$style.number">{{number}}</div>
    <btn
      v-if="filled"
      type="grey-light"
      height="small"
      :class="$style.change"
      @click.native="edit"
    >
      Rediger
    </btn>
    <h2 :class="$style.header">{{header}}</h2>
  </checkout-box>
</template>

<script>
import CheckoutBox from './CheckoutBox.vue';
import Btn from './Btn.vue';

export default {
  components: {
    CheckoutBox,
    Btn,
  },
  props: {
    number: Number,
    header: String,
    inactive: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.number {
  composes: h2 from global;
  float: left;
  background-color: var(--color-primary);
  color: var(--color-white);
  height: 2.5rem;
  width: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  border-radius: 100%;
  margin-right: 1rem;
}
.header {
  line-height: 2.5rem;
}

.filled .number {
  background-color: var(--color-black);
}

.inactive {
  color: var(--color-grey);
}
.inactive .number {
  background-color: var(--color-grey);
}

.change {
  width: auto;
  float: right;
}
</style>
