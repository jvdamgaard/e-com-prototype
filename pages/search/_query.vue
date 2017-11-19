<template>
  <grid>
    <grid-col v-for="product in products" :key="product.id" desktop="2">
      <product-card :product="product" :lazy="true" />
    </grid-col>
  </grid>
</template>

<script>
import { mapState } from 'vuex'; //eslint-disable-line
import { searchProducts, url } from '../../utils/product';
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import ProductCard from '../../components/ProductCard.vue';

export default {
  components: {
    Grid,
    GridCol,
    ProductCard,
  },
  asyncData({ params, redirect }) {
    return searchProducts(params.query)
      .then((products) => {
        if (products.length === 1) {
          redirect(url(products[0]));
        }
        return { products };
      });
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
  },
};
</script>

<style>
</style>
