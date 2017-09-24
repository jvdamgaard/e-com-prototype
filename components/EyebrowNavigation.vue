<template>
  <nav class="EyebrowNavigation">
    <Grid class="EyebrowNavigation__grid is-aligned-vertical-center has-no-top-margin has-no-bottom-margin">
      <div class="is-3-col is-2-col-on-phablet is-hidden-on-laptop">
        <nuxt-link to="/" class="EyebrowNavigation__logo is-h2 has-no-underline">Bilka</nuxt-link>
      </div>
      <div class="is-hidden-on-mobile is-visible-on-laptop is-2-col-on-laptop is-4-col-on-desktop is-small">
        Dit hypermarked
      </div>
      <div class="is-hidden-on-mobile is-visible-on-laptop is-5-col-on-laptop is-4-col-on-desktop  is-small is-aligned-center">
        <nuxt-link to="/legetoej/lego/" class="is-grey"><strong class="is-red">25% rabat</strong> på alt LEGO indtil lørdag</nuxt-link>
      </div>
      <div class="is-9-col is-10-col-on-phablet is-5-col-on-laptop is-4-col-on-desktop">
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
    </Grid>
  </nav>
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
  
  .EyebrowNavigation__grid {
    height: 2rem;
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
