<template>
  <div :class="$style.container">
    <image-container
      :src="imgSrc"
      :lazy="lazy"
      :width="1000"
      :height="1000"
    />
    <div :class="$style.content">
      <h2>{{ header }}</h2>
      <p>{{ text }}</p>
      <btn to="link" type="ghost" :class="$style.btn">{{ buttonLabel }}</btn>
    </div>
  </div>
</template>

<script>
import Btn from './Btn.vue';
import ImageContainer from './Image.vue';

export default {
  components: {
    Btn,
    ImageContainer,
  },
  props: {
    header: String,
    text: String,
    buttonLabel: String,
    link: String,
    imgSrc: String,
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
  background-color: var(--color-white);
}

.content {
  padding: 2rem;
  text-align: center;
}

.content > *:not(:last-child) {
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  width: auto;
}
</style>
