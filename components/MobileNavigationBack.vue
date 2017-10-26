<template>
  <div :class="$style.container" @click="back(null)">
    <div v-if="titel" :class="$style.back">
      <p :class="$style.buttonInner">&#8249;</p>
    </div>
    <div v-if="titel" :class="$style.text">
      <div :class="$style.textInner">
        <strong>{{titel}}</strong>
      </div>
    </div>
    <div :class="$style.close" @click="close" @touchstart="close">
      <p :class="$style.buttonInner">&#215;</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      close: Function,
      back: Function,
      titel: String,
    },
  };
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  height: 3.5rem;
  margin-bottom: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-grey-lighter);
}

.button {
  width: 3.5rem;
  text-align: center;
  height: 3.5rem;
  font-size: 2.5rem;
  line-height: 3rem;
  color: var(--color-grey-dark);
  font-weight: 200;
  position: absolute;
  top: 0;
}
.buttonInner {
  width: 100%;
  text-align: center;
}
.back {
  composes: button;
  left: 0;
}
.close {
  composes: button;
  right: 0;
}

.text {
  width: calc(100% - 7rem);
  height: 3.5rem;
  line-height: 3.5rem;
  margin-left: 3.5rem;
}
.textInner {
  composes: small from global;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
</style>
