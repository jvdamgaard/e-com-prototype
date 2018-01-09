<template>
  <div>
    <article class="theme-None">
      <section>
        <grid>
          <grid-col>
            <ais-index
              app-id="IKBKHO1MME"
              api-key="b405042bbaca18408e300b64a4a911e3"
              index-name="products"
            >
              <ais-search-box></ais-search-box>
              <ais-results>
                <template slot-scope="{ result }">
                  <p>
                    <!-- {{ result.fields.titel }} -->
                    <ais-highlight :result="result" attribute-name="titel"></ais-highlight>
                  </p>
                </template>
              </ais-results>
            </ais-index>
          </grid-col>
        </grid>
      </section>
    </article>
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
import axios from 'axios';
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
    axios.post(`/.netlify/functions/upload-search-query?query=${params.query}`);
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

:global(.ais-highlight) {
  font-weight: bold;
}
:global(.ais-highlight) em {
  font-weight: normal;
  font-style: normal;
}
</style>
