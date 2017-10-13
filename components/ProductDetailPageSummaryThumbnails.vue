<template>
  <ul
    class="is-unstyled-list has-large-top-padding has-large-left-padding"
    :class="$style.thumbnailList"
  >
    <li v-for="(image, i) in images" :class="{
      [$style.active]: imagePosition === i,
    }">
      <img
        :src="`${image}?w=200&auto=format&fm=jpg`"
        class="is-full-width"
        :class="$style.thumbnailImage"
        @click="changeImagePosiiton(i)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    images: Array,
    changeImagePosiiton: Function,
    imagePosition: Number,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.thumbnailList li {
  padding: 0.25rem;
  border: 1px solid var(--color-grey-lighter);
  transition: border-color 0.2s ease;
}

.thumbnailList li.active {
  border: 1px solid var(--color-primary);
}
.thumbnailList li:not(:first-child) {
  margin-top: 1rem;
}

.thumbnailImage {
  display: block;
  cursor: pointer;
}
</style>
