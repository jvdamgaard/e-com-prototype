<template>
  <div :class="$style.container">
    <h3>Top brands</h3>
    <p>
      <nuxt-link v-for="brand in brands" to="/" :key="brand.imgSrc">
        <img v-lazy="brand.imgSrc" :class="$style.brandIcon"/>
      </nuxt-link>
    </p>
  </div>
</template>

<script>

export default {
  props: {
    brands: Array,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container { padding-bottom: 2rem; }

.brandIcon {
  height: 2rem;
  margin-right: 1rem;
  margin-top: 1rem;
  transition: transform 0.2s ease;
}
:global(.no-touch) .brandIcon:hover {
  transform: scale(1.2);
  z-index: 10;
}
</style>
