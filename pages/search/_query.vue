<template>
  <article class="theme-None" :class="$style.container">
    <section>
      <grid>
        <grid-col
          mobile="0"
          laptop="3"
          desktop="2"
          :class="$style.filterContainer"
        >
          <div :class="$style.filters">
            Filtre
          </div>
        </grid-col>
        <grid-col
          v-for="product in products"
          :key="product.id"
          mobile="6"
          tablet="4"
          laptop="3"
          desktop="2"
        >
          <product-card :product="product" :lazy="true" />
        </grid-col>
      </grid>
    </section>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //eslint-disable-line
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
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
    this.closeMiniBasket();
    this.closeDepartmentNav();
  },
};
</script>

<style module>
@import '../../assets/css/variables.css';

.container { margin-top: 1rem; }

.filterContainer {
  grid-row: span 12;
}
.filters {
  background-color: var(--color-white);
  height: 100%;
}
</style>
