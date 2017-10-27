<template>
  <div>
    <p v-if="product.shortDescription">{{product.shortDescription.slice(0,250)}}... <nuxt-link to="#description">Læs mere</nuxt-link></p>
    <template v-if="product.keySpecifications && product.keySpecifications.length > 0">
      <h2 :class="$style.header">Nøglespecifikationer</h2>
      <ul :class="$style.list">
        <li v-for="keySpec in product.keySpecifications">
          <strong :class="$style.key">{{keySpec.key}}:</strong> {{keySpec.value}}
        </li>
      </ul>
      <p :class="$style.link"><a href="#specifications">Se alle specifikationer</a></p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.header { margin-top: 1rem; }
.list {
  composes: unstyledList from global;
  margin-top: 0.5rem;
}
.key { color: var(--color-grey-dark); }
.link { margin-top: 0.5rem; }
</style>
