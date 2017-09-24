<template>
  <footer class="MainFooter">
    <UniqueSellingPoints />
    <FooterHighlightedContent />
    <Grid class="Links has-white-background">
      <div class="is-2-col">
        <h3 class="has-small-bottom-margin">Bilka</h3>
        <p><nuxt-link to="/" class="is-grey">Om os</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Kerneværdier</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Karriere</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Blog</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Engineering</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Sitemap</nuxt-link></p>
      </div>
      <div class="is-2-col">
        <h3 class="has-small-bottom-margin">Brug for hjælp?</h3>
        <p><nuxt-link to="/" class="is-grey">Kundeservice</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Find din Bilka</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Sådan handler du på bilka.dk</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Levering</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Returnering</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Reklamation</nuxt-link></p>
      </div>
      <div class="is-2-col">
        <h3 class="has-small-bottom-margin">Inspiration og Tips</h3>
        <p><nuxt-link to="/" class="is-grey">Shopping inspiration</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Shopping guides</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Set i TV</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Mærker på bilka.dk</nuxt-link></p>
      </div>
      <div class="is-2-col">
        <h3 class="has-small-bottom-margin">Tjen penge sammen med os</h3>
        <p><nuxt-link to="/" class="is-grey">Online shopping</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Sælg på bilka.dk</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Annoncer på bilka.dk</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Medie forespørgsler</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Bliv en affiliate</nuxt-link></p>
      </div>
    </Grid>
  </footer>
</template>

<script>
import Grid from './Grid.vue';
import UniqueSellingPoints from './UniqueSellingPoints.vue';
import FooterHighlightedContent from './FooterHighlightedContent.vue';

export default {
  components: {
    Grid,
    UniqueSellingPoints,
    FooterHighlightedContent,
  },
};
</script>

<style>
  @import '../assets/css/variables.css';

  .MainFooter > * { margin-bottom: 1px; }
  .MainFooter > *:not(:first-child) { margin-top: 1px; }

  .Links {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }
  
</style>
