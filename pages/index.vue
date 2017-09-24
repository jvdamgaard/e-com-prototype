<template>
  <div>
    <!-- Mobile-tablet top -->
    <div class="is-hidden-on-laptop">
      <section>
        <Banner :banners="[{
          id: 87248725,
          image: {
            url: '/images/top-banner.jpg',
            width: 1800,
            height: 360,
          },
        }]" />
      </section>
      <section>
        <ProductSlider
          :products="user.lastSeen.slice(0,24)"
          header="Fortsæt hvor du slap"
        />
      </section>
    </div>

    <!-- Laptop-desktop top -->
    <div class="is-hidden-on-mobile is-visible-on-laptop">
      <Grid class="has-small-top-margin">
        <div class="is-3-col-on-laptop is-2-col-on-desktop is-3-row">
          <div class="has-white-background has-vertical-padding is-full-height">
            <NavigationItem titel="Velkommen" description="Log ind eller opret bruger" icon="/icons/login.svg" />
            <h4 class="has-padding">Afdelinger</h4>
            <NavigationItem titel="Elektronik" description="Bærbare, PC’er, Kabler" icon="/icons/electronic.png" />
            <NavigationItem titel="Mobil &amp; tablet" description="Smartphones, Power banks" icon="/icons/mobile.png" />
            <NavigationItem titel="Bøger, Film &amp; Musik" description="Literatur, Biografier" icon="/icons/books.png" />
            <NavigationItem titel="Dagligvarer" description="Skønhed, Helbred" icon="/icons/food.png" />
            <NavigationItem titel="Mode" description="Tøj, Sko, Ure, Smykker" icon="/icons/fashion.png" />
            <NavigationItem titel="Bolig &amp; indretning" description="Køkken, Møbler" icon="/icons/home.png" />
            <NavigationItem titel="Børn" description="Legetøj, Tøj, Spil, Sko" icon="/icons/children.png" />
            <NavigationItem titel="Køretøjer" description="Cykler, Biltilbehør" icon="/icons/vehicles.png" />
            <NavigationItem titel="Tilbud" description="I alle afdelinger" icon="/icons/offers.png" />
          </div>
        </div>
        <div class="is-9-col-on-laptop is-10-col-on-desktop">
          <nuxt-link to="/">
            <img src="https://images-na.ssl-images-amazon.com/images/G/01/img17/consumer-electronics/desktop/1067349_us_wireless-products_iphone-event_1800x360_desktop_r2.jpg" width="1800" height="360" class="is-full-width" />
          </nuxt-link>
        </div>
        <div class="is-5-col-on-laptop has-top-margin">
          <h2>Fortsæt hvor du slap</h2>
        </div>
        <div class="is-4-col-on-laptop is-5-col-on-desktop has-top-margin is-aligned-right">
          <nuxt-link to="/" class="is-grey is-small">vis hele historikken</nuxt-link>
        </div>
        <div v-for="(product, i) in user.lastSeen.slice(0,5)" :key="product.id" class="is-3-col-on-laptop is-2-col-on-desktop" :class="{
          'is-hidden-on-mobile': i>2,
          'is-visible-on-desktop': i>2,
        }">
          <ProductCard v-bind="product" />
        </div>
      </Grid>
    </div>

    <!-- Modules -->
    <section v-for="module in page.modules" :key="module.id">
      <ProductSlider v-if="module.type === 'ProductSlider'" v-bind="module.data" />
      <Banner v-if="module.type === 'Banner'" v-bind="module.data" />
      <UniqueSellingPoints v-if="module.type === 'UniqueSellingPoints'" />
    </section>

    <MainFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import Grid from '../components/Grid.vue';
import NavigationItem from '../components/NavigationItem.vue';
import ProductCard from '../components/ProductCard.vue';
import ProductSlider from '../components/ProductSlider.vue';
import Banner from '../components/Banner.vue';
import UniqueSellingPoints from '../components/UniqueSellingPoints.vue';
import MainFooter from '../components/MainFooter.vue';

export default {
  components: {
    Grid,
    NavigationItem,
    ProductCard,
    ProductSlider,
    Banner,
    UniqueSellingPoints,
    MainFooter,
  },
  computed: mapState(['user', 'page']),
};
</script>

<style>
</style>
