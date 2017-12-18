<template>
  <article class="theme-None" :class="$style.container">
    <section>
      <grid>
        <grid-col>
          <h1>Resultater for <em>"{{query}}"</em></h1>
        </grid-col>
      </grid>
    </section>
    <section :class="$style.filterContainer">
      <grid>
        <grid-col>
          Filtre
        </grid-col>
      </grid>
    </section>
    <section>
      <grid>
        <grid-col>
          <strong>{{products.length}}</strong> varer fundet
        </grid-col>
      </grid>
    </section>
    <section>
      <grid>
        <grid-col
          v-for="product in products"
          :key="product.id"
          mobile="6"
          tablet="4"
          desktop="3"
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
        return { products, query: params.query };
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
  background-color: var(--color-grey-light);
}
</style>
