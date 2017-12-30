<template>
  <div>
    <article class="theme-Grey">
      <section>
        <grid>
          <grid-col>
            Filtre
          </grid-col>
        </grid>
      </section>
    </article>
    <article class="theme-None">
      <section>
        <grid>
          <grid-col>
            <strong>{{products.length}}</strong> varer fundet ved søgning på <em>"{{query}}"</em>
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
    <article class="theme-Dark" key="last-seen-basket">
      <section>
        <last-seen-slider header="Du har senest kigget på" />
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //eslint-disable-line
import { searchProducts, url } from '../../utils/product';
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import ProductCard from '../../components/NewProductCard.vue';

export default {
  components: {
    Grid,
    GridCol,
    ProductCard,
    LastSeenSlider: () => import('../../components/LastSeenSlider.vue'),
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
    window.scrollTo(0, 0);
    this.closeMiniBasket();
    this.closeDepartmentNav();
  },
};
</script>

<style module>
@import '../../assets/css/variables.css';
</style>
