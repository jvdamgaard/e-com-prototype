<template>
  <nuxt-link
    to="/"
    :class="$style.promo"
    v-lazy:background-image="imageSrc"
  >
    <btn
      v-if="btnLabel"
      type="yellow"
      shadow
      :class="$style.promoBtn"
    >
      {{btnLabel}}
    </btn>
  </nuxt-link>
</template>

<script>
import Btn from './Btn.vue';

export default {
  components: {
    Btn,
  },
  props: {
    btnLabel: String,
    imageSrc: String,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.promo {
  composes: bgImage from global;
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  padding: 1rem;
}

.promoBtn {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}
</style>
