<template>
  <div>
    <p>{{product.shortDescription.slice(0,250)}}... <nuxt-link to="#description">Læs mere</nuxt-link></p>
    <h2 class="has-small-top-margin">Nøglespecifikationer</h2>
    <ul class="is-unstyled-list has-tiny-top-margin">
      <li v-for="keySpec in product.keySpecifications">
        <strong class="is-dimmed">{{keySpec.key}}:</strong> {{keySpec.value}}
      </li>
    </ul>
    <p class="has-tiny-top-margin"><a href="#specifications">Se alle specifikationer</a></p>
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
</style>
