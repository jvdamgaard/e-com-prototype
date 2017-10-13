<template>
  <ul
    class="is-unstyled-list"
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

.thumbnailList {
  text-align: center;
  margin-top: 1rem;
}

.thumbnailList li {
  padding: 0.25rem;
  border: 1px solid var(--color-grey-light);
  transition: border-color 0.2s ease;
  display: inline-block;
  border-radius: 50%;
}
.thumbnailList li:not(:first-child) {
  margin-left: 0.5rem;
}
.thumbnailList li.active {
  border: 1px solid var(--color-primary);
  background-color: var(--color-primary);
}

.thumbnailImage {
  display: none;
  cursor: pointer;
  height: 3rem;
  width: auto;
}

@media (min-width: 64rem) {
  .thumbnailList {
    margin-top: 0;
    text-align: left;
  }
  .thumbnailList li {
    border-radius: 0;
    border: 1px solid var(--color-grey-lighter);
  }
  .thumbnailList li.active {
    background-color: transparent;
  }
  .thumbnailList li:not(:first-child) {
    margin-left: 1rem;
  }
  .thumbnailImage {
    display: block;
  }
}

@media (min-width: 96rem) {
  .thumbnailList {
    padding: 2rem 0 0 2rem;
  }
  .thumbnailList li:not(:first-child) {
    margin-top: 1rem;
    margin-left: 0;
  }
  .thumbnailImage {
    height: auto;
    width: 100%;
  }
}
</style>
