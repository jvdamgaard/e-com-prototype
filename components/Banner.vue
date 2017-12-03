<template>
  <div>
    <grid v-if="header" :class="$style.header">
      <grid-col>
        <h2>{{ header }}</h2>
      </grid-col>
    </grid>
    <grid :fullWidthUntil="banners.length === 1 ? 'desktop' : undefined">
      <template v-for="banner in banners">
        <grid-col
          mobile="12"
          :tablet="`${12 / banners.length}`"
        >
          <image-container
            :lazy="lazy"
            :src="banner.image.url"
            :width="size.width"
            :height="size.height"
          />
          <div v-if="text" class="h1" :class="$style.text">{{ text }}</div>
          <btn v-if="buttonLabel && link" type="black" :to="link" :class="$style.btn">
            {{ buttonLabel }}
          </btn>
        </grid-col>
      </template>
    </grid>
  </div>
</template>

<script>
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
    banners: Array,
    text: String,
    buttonLabel: String,
    link: String,
    header: String,
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    size() {
      if (this.banners.length === 1) {
        return { width: 2400, height: 800 };
      }
      return { width: 1600, height: 800 };
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.header {
  margin-bottom: 1rem;
}

.text {
  text-align: center;
  position: absolute;
  bottom: 6rem;
  width: 100%;
  padding: 0 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.btn {
  width: auto;
  position: absolute;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
}
</style>
