<template>
  <div class="has-white-background">
    <Grid class="USP">
      <nuxt-link to="/" class="USP__item is-12-col is-4-col-on-tablet">
        <p><img src="https://www.bilka.dk/medias/sys_master/images/9108814921758/KHlogo_174x87.png" /></p>
        <p>Altid <strong>fri fragt</strong> til Bilka, føtex eller NETTO</p>
      </nuxt-link>
      <nuxt-link to="/" class="USP__item is-12-col is-4-col-on-tablet">
        <p><img src="https://bilkadk.imgix.net/medias/sys_master/root/h11/h69/9250093432862.png" /></p>
        <p><strong>30 dages returret</strong></p>
      </nuxt-link>
      <nuxt-link to="/" class="USP__item is-12-col is-4-col-on-tablet">
        <p><img src="https://bilkadk.imgix.net/medias/sys_master/root/h0e/h69/9250093334558/Fragt.png" /></p>
        <p><strong>Fri fragt</strong> på ordre over 1000,-</p>
      </nuxt-link>
    </Grid>
  </div>
</template>

<script>
import Grid from '../components/Grid.vue';

export default {
  components: {
    Grid,
  },
};
</script>

<style>
@import '../assets/css/variables.css';

.USP {
  padding: 2rem 0;
}
.USP__item {
  padding: 0.25rem 0;
  color: var(--color-black);
  text-align: center;
}
.USP__item img {
  height: 3rem;
}

@media (min-width: 48rem) {
  .USP__item {
    padding: 2rem 0;
  }
  .USP__item img {
    height: 5rem;
  }
}
</style>
