<template>
  <div
    :class="$style.container"
    :style="{ 'padding-bottom': `${height / width * 100}%` }"
  >
    <img
      v-if="lazy"
      v-lazy="url"
      :width="width"
      :height="height"
      :alt="alt"
      :class="$style.image"
    />
    <img
      v-if="!lazy"
      :src="url"
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
  computed: {
    url() {
      return `${this.src}?w=${this.width}&h=${this.height}&fm=webp&fit=fill&f=face`;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  width: 100%;
  position: relative;
}
.image {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
