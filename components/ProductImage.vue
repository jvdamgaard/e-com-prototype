<template>
  <div :class="[
    $style.image,
    $style[type],
    {
      [$style.hovering]: hovering,
    },
  ]">
    <div :class="$style.rightArrow" @click.prevent.stop="nextImage">
      <arrow
        v-if="images.length > 1 && imagePosition < images.length - 1"
        direction="right"
      />
    </div>
    <div :class="$style.leftArrow" @click.prevent.stop="prevImage">
      <arrow v-if="imagePosition > 0" direction="left" />
    </div>
    <img
      v-if="lazy"
      v-lazy="`${images[activeImagePosition]}?w=${width}&h=${height}&auto=format&fm=jpg`"
      :class="{
        [$style.loadingImage]: loadingImage,
      }"
    />
    <img
      v-if="!lazy"
      :src="`${images[activeImagePosition]}?w=${width}&h=${height}&auto=format&fm=jpg`"
      :class="{
        [$style.loadingImage]: loadingImage,
      }"
    />
  </div>
</template>

<script>
import { loadImage } from '../utils';
import Arrow from './Arrow.vue';

export default {
  components: {
    Arrow,
  },
  props: {
    images: Array,
    imagePosition: Number,
    changeImagePosiiton: Function,
    lazy: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    hovering: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '1000',
    },
    height: {
      type: String,
      default: '1000',
    },
  },
  data() {
    return {
      activeImagePosition: 0,
      loadingImage: false,
    };
  },
  methods: {
    nextImage() {
      this.changeImage(1);
    },
    prevImage() {
      this.changeImage(-1);
    },
    changeImage(deltaPos) {
      if (!this.loadingImage) {
        this.changeImagePosiiton(this.imagePosition + deltaPos);
      }
    },
    loadImage(position) {
      this.loadingImage = true;
      loadImage(this.images[position]).then(() => {
        // Make sure this is the newest image
        if (this.imagePosition === position) {
          this.activeImagePosition = position;
          this.loadingImage = false;
        }
      });
    },
  },
  watch: {
    imagePosition(position) {
      this.loadImage(position);
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.image {
  position: relative;
  padding-bottom: 100%;
  width: 100%;
}

@media (min-width: 48rem) {
  .image {
    padding-bottom: 100%;
  }
}

.productCard {
  padding-bottom: 75%;
}

.image img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  transition: opacity 0.5s ease;
}

.loadingImage {
  opacity: 0;
}

.arrow {
  opacity: 0;
  position: absolute;
  top: calc(50% - 0.375rem);
  transition: opacity 0.2s ease;
  z-index: 2;
}
:global(.no-touch) .image:hover .arrow, .hovering .arrow {
  opacity: 1;
}

.rightArrow {
  composes: arrow;
  right: 1rem;
}
@media (min-width: 64rem) {
  .rightArrow { right: 2rem; }
}
.productCard .rightArrow { right: -1.25rem; }

.leftArrow {
  composes: arrow;
  left: 1rem;
}
@media (min-width: 64rem) {
  .leftArrow { left: 2rem; }
}
.productCard .leftArrow { left: -1.25rem; }
</style>
