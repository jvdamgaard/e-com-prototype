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
            <strong>{{10}}</strong> varer fundet ved søgning på <em>"{{query}}"</em>
          </grid-col>
        </grid>
      </section>
      <section>
        <grid>
          <grid-col
            mobile="6"
            tablet="4"
            desktop="3"
            v-for="product in products"
            :key="product.id"
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
import algoliasearch from 'algoliasearch';
import { Product } from '../../utils/product';
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import ProductCard from '../../components/NewProductCard.vue';

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_SEARCH_KEY,
);
const index = client.initIndex('products');

function search(query) {
  return new Promise((resolve, reject) => {
    index.search({
      query,
      hitsPerPage: 72,
    }, (err, content) => {
      if (err) return reject(err);
      return resolve(content);
    });
  });
}

export default {
  components: {
    Grid,
    GridCol,
    ProductCard,
    LastSeenSlider: () => import('../../components/LastSeenSlider.vue'),
  },
  data() {
    return {
      query: null,
    };
  },
  asyncData({ params }) {
    if (process.browser) {
      axios.post(`/.netlify/functions/upload-search-query?query=${params.query}`);
    }
    return search(params.query)
      .then(content => ({
        products: content.hits.map(Product),
      }));
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

.indexContainer {
  grid-column: span 12;
}

.innerGrid {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
}

:global(.ais-highlight) {
  font-weight: bold;
}
:global(.ais-highlight) em {
  font-weight: normal;
  font-style: normal;
}
</style>
