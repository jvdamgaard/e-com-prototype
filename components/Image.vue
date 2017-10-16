<template>
  <div
    :class="$style.container"
    :style="{ 'padding-bottom': `${height / width * 100}%` }"
  >
    <img
      v-if="lazy"
      v-lazy="src"
      :width="width"
      :height="height"
      :alt="alt"
      :class="$style.image"
    />
    <img
      v-if="!lazy"
      :src="src"
      :width="width"
      :height="height"
      :alt="alt"
      :class="$style.image"
    />
  </div>
</template>

<script>

export default {
  props: {
    width: Number,
    height: Number,
    src: String,
    alt: String,
    lazy: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  position: relative;
}
.image {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}
</style>
