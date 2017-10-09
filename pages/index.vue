<template>
  <div>
    <!-- Mobile-tablet top -->
    <div class="is-hidden-on-laptop">
      <section>
        <Banner :banners="[{
          id: 87248725,
          image: {
            url: 'https://jvdamgaard.github.io/e-com-prototype/images/top-banner.jpg',
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
          <div class="has-white-background has-vertical-padding has-small-bottom-margin">
            <NavigationItem titel="Log ind" description="Log ind eller opret bruger" icon="https://jvdamgaard.github.io/e-com-prototype/icons/login.svg" />
          </div>
          <div class="has-white-background has-vertical-padding">
            <h3 class="has-padding">Afdelinger</h3>
            <NavigationItem
              v-for="department in departments"
              :titel="department.titel"
              :description="department.description"
              :icon="department.iconSrc"
              :key="department.titel" />
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
          <product-card :product="product" />
        </div>
      </Grid>
    </div>

    <!-- Modules -->
    <section v-for="module in page.modules" :key="module.id">
      <ProductSlider v-if="module.type === 'ProductSlider'" v-bind="module.data" />
      <Banner v-if="module.type === 'Banner'" v-bind="module.data" />
      <UniqueSellingPoints v-if="module.type === 'UniqueSellingPoints'" />
      <ContentContainer v-if="module.type === 'ContentContainer'" v-bind="module.data" />
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
import ContentContainer from '../components/ContentContainer.vue';

export default {
  components: {
    Grid,
    NavigationItem,
    ProductCard,
    ProductSlider,
    Banner,
    UniqueSellingPoints,
    MainFooter,
    ContentContainer,
  },
  data() {
    return {
      departments: [],
    };
  },
  computed: mapState(['user', 'page']),
  created() {
    if (!process.browser) { return; }
    fetch('/json/departments.json').then(response => response.json()).then((departments) => {
      this.departments = departments;
    });
  },
};
</script>

<style>
</style>
