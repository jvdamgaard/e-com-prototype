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
        v-if="images && images.length > 1 && imagePosition < images.length - 1"
        direction="right"
      />
    </div>
    <div :class="$style.leftArrow" @click.prevent.stop="prevImage">
      <arrow v-if="imagePosition > 0" direction="left" />
    </div>
    <img
      v-if="lazy && activeImagePosition0 === 0"
      v-lazy="getImagePath(activeImagePosition0)"
      :class="{
        [$style.loadingImage]: loadingImage0,
      }"
    />
    <img
      v-else
      :src="getImagePath(activeImagePosition0)"
      :class="{
        [$style.loadingImage]: loadingImage0,
      }"
    />
    <img
      :src="getImagePath(activeImagePosition1)"
      :class="{
        [$style.loadingImage]: loadingImage1,
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
      loading: false,
      activePosition: 0,
      activeImagePosition0: 0,
      activeImagePosition1: 0,
      loadingImage0: false,
      loadingImage1: true,
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
      if (!this.loading) {
        this.changeImagePosiiton(this.imagePosition + deltaPos);
      }
    },
    getImagePath(position) {
      if (!this.images) { return ''; }
      return `${this.images[position]}?fm=webp&w=${this.width}&h=${this.height}`;
    },
    loadImage(position) {
      this.loading = true;
      this[`loadingImage${this.activePosition}`] = true;

      // Make sure image has fade out
      loadImage(this.getImagePath(position))
        .then(() => {
          this.activePosition = this.activePosition === 0 ? 1 : 0;

          // Make sure this is the newest image
          if (this.imagePosition === position) {
            this[`activeImagePosition${this.activePosition}`] = position;
          }
          // Wait until image has bee painted
          requestAnimationFrame(() => {
            this[`loadingImage${this.activePosition}`] = false;
            this.loading = false;
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
  transition: opacity 0.5s ease;
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
