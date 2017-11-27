<template>
  <ul :class="$style.thumbnailList">
    <li
      v-for="(image, i) in images.slice(0, limit)"
      :class="{
        [$style.active]: imagePosition === i,
        [$style.more]: (i === limit - 1 && images.length > limit),
      }"
      @click="changeImagePosiiton(i)"
    >
      <span
        v-if="i === limit - 1 && images.length > limit"
        :class="$style.inner"
      >
        +{{images.length - limit + 1}}
      </span>
      <img
        :src="`${image}?w=200&fm=jpg`"
        :class="$style.thumbnailImage"
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
    limit: {
      type: Number,
      default: 10,
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.thumbnailList {
  composes: unstyledList from global;
  composes: clearfix from global;
}
.thumbnailList li {
  position: relative;
  border: 1px solid var(--color-grey-light);
  transition: border-color 0.2s ease;
  display: block;
  float: left;
  cursor: pointer;
  width: 3rem;
  padding-bottom: 3rem;
  margin-bottom: 0.5rem;
}
.thumbnailList li:not(:last-child) {
  margin-right: 0.5rem;
}
.thumbnailList li.active {
  border: 1px solid var(--color-primary);
}

.more:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
}

.more span {
  z-index: 10;
}

.thumbnailImage {
  display: block;
  width: 100%;
  height: auto;
  color: var(--color-white);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: auto;
  height: auto;
  max-width: calc(100% - 0.25rem);
  max-height: calc(100% - 0.25rem);
}

.inner {
  composes: h2 from global;
  display: block;
  color: var(--color-white);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (min-width: 64rem) {
  .thumbnailList li {
    width: 4rem;
    padding-bottom: 4rem;
  }
}

@media (min-width: 96rem) {
  .thumbnailList {
    display: block;
    padding: 2rem 0 0 2rem;
  }
  .thumbnailList li {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-left: 0;
    padding-bottom: 75%;
  }
  .thumbnailImage {
    max-width: calc(100% - 1rem);
    max-height: calc(100% - 1rem);
  }
}
</style>
