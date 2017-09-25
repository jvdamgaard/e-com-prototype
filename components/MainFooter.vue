<template>
  <footer class="MainFooter">
    <UniqueSellingPoints />
    <FooterHighlightedContent />
    <Grid row-gap="large" class="Links has-white-background">
      <div class="is-12-col is-6-col-on-phablet is-4-col-on-tablet is-2-col-on-desktop">
        <h3 class="has-small-bottom-margin">Bilka</h3>
        <p><nuxt-link to="/" class="is-grey">Om os</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Kerneværdier</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Karriere</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Blog</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Engineering</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Sitemap</nuxt-link></p>
      </div>
      <div class="is-12-col is-6-col-on-phablet is-4-col-on-tablet is-2-col-on-desktop">
        <h3 class="has-small-bottom-margin">Brug for hjælp?</h3>
        <p><nuxt-link to="/" class="is-grey">Kundeservice</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Find din Bilka</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Sådan handler du på bilka.dk</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Levering</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Returnering</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Reklamation</nuxt-link></p>
      </div>
      <div class="is-12-col is-6-col-on-phablet is-4-col-on-tablet is-2-col-on-desktop">
        <h3 class="has-small-bottom-margin">Inspiration og Tips</h3>
        <p><nuxt-link to="/" class="is-grey">Shopping inspiration</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Shopping guides</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Set i TV</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Mærker på bilka.dk</nuxt-link></p>
      </div>
      <div class="is-12-col is-6-col-on-phablet is-4-col-on-tablet is-2-col-on-desktop">
        <h3 class="has-small-bottom-margin">Tjen penge sammen med os</h3>
        <p><nuxt-link to="/" class="is-grey">Online shopping</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Sælg på bilka.dk</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Annoncer på bilka.dk</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Medie forespørgsler</nuxt-link></p>
        <p><nuxt-link to="/" class="is-grey">Bliv en affiliate</nuxt-link></p>
      </div>
      <div class="is-12-col is-8-col-on-tablet is-4-col-on-desktop">
        <h3 class="has-small-bottom-margin">Tilmeld nyhedsbrev</h3>
        <div class="is-group">
          <input type="text" placeholder="Din e-mail adresse" class="has-light-grey-background no-border">
          <Btn type="grey" height="small">Tilmeld</Btn>
        </div>
        <p class="is-small is-dimmed">
          Tilmeld dig Bilkas nyhedsbrev og få ugens tilbudsavis samt gode tilbud, information om spændende kampagner og konkurrencer.<br>
          Hver måned trækkes en vinder af tre måneders forbrug af Nivea produkter til dame eller herre blandt alle modtagere af nyhedsmailen.
        </p>
      </div>
    </Grid>
  </footer>
</template>

<script>
import Grid from './Grid.vue';
import Btn from './Btn.vue';
import UniqueSellingPoints from './UniqueSellingPoints.vue';
import FooterHighlightedContent from './FooterHighlightedContent.vue';

export default {
  components: {
    Grid,
    UniqueSellingPoints,
    FooterHighlightedContent,
    Btn,
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
