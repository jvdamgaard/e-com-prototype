<template>
  <grid class="EyebrowNavigation is-aligned-vertical-center has-no-top-margin has-no-bottom-margin">
    <div class="is-12-col">
      <div class="is-group" style="white-space: nowrap">
        <nuxt-link to="/" class="EyebrowNavigation__logo is-h2 has-no-underline is-hidden-on-tablet">Bilka</nuxt-link>
        <span class="is-hidden-on-mobile is-inline-on-laptop is-small">
          Dit hypermarked
        </span>
        <div class="is-hidden-on-mobile is-visible-on-laptop is-small is-aligned-center is-full-width">
          <nuxt-link to="/legetoej/lego/" class="is-grey"><strong class="is-red">25% rabat</strong> på alt LEGO indtil lørdag</nuxt-link>
        </div>
        <ul class="EyebrowNavigation__links is-inline-list is-aligned-right is-small is-grey">
          <li>
            <nuxt-link to="/tilbudsaviden/" class="is-grey">Tilbudsavis</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/kundeservice/" class="is-grey">Find butik</nuxt-link>
          </li>
          <li class="is-hidden-on-mobile is-inline-on-phablet">
            <nuxt-link to="/kundeservice/" class="is-grey">Kundeservice</nuxt-link>
          </li>
          <li class="is-hidden-on-mobile is-inline-on-tablet">
            <nuxt-link to="/log-ind/" class="is-grey">Log ind</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </grid>
</template>

<script>
  import Grid from './Grid.vue';

  export default {
    components: {
      Grid,
    },
  };
</script>

<style>
  @import '../assets/css/variables.css';

  .EyebrowNavigation {
    background-color: var(--color-white);
    height: 2rem;;
  }
  .EyebrowNavigation__links li {
    margin: 0 0.5rem;
  }
  .EyebrowNavigation__links li:last-child {
    margin-right: 0;
  }

  .EyebrowNavigation__logo {
    font-weight: 900;
  }
</style>
