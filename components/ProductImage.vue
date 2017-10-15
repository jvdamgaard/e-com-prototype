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
      v-if="lazy && activeImagePosition === 0"
      v-lazy="getImagePath(activeImagePosition)"
      :class="{
        [$style.loadingImage]: loadingImage,
      }"
    />
    <img
      v-else
      :src="getImagePath(activeImagePosition)"
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
    getImagePath(position) {
      return `${this.images[position]}?w=${this.width}&h=${this.height}&auto=format&fm=jpg`;
    },
    loadImage(position) {
      this.loadingImage = true;
      const imageLoaded = loadImage(this.getImagePath(position));

      // Make sure image has fade out
      new Promise(resolve => setTimeout(resolve, 250))
        .then(() => imageLoaded)
        .then(() => {
          // Make sure this is the newest image
          if (this.imagePosition === position) {
            this.activeImagePosition = position;
          }
          // Wait until image has bee painted
          requestAnimationFrame(() => {
            this.loadingImage = false;
          });
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
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  transition: opacity 0.25s ease;
}

.loadingImage {
  opacity: 0 !important;
}

.arrow {
  opacity: 0;
  position: absolute;
  top: calc(50% - 0.375rem);
  transition: opacity 0.2s ease;
  z-index: 2;
}
:global(.no-touch) .image:hover .arrow, :global(.no-touch) .hovering .arrow {
  opacity: 1;
}

.rightArrow {
  composes: arrow;
  right: 0.5rem;
}

.leftArrow {
  composes: arrow;
  left: 0.5rem;
}

@media (min-width: 48rem) {
  .rightArrow { right: -1.5rem; }
  .leftArrow { left: -1.5rem; }
}

.productCard .rightArrow { right: -1.25rem; }
.productCard .leftArrow { left: -1.25rem; }
</style>
