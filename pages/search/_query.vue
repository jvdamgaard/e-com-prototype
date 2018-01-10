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
          <ais-index
            :search-store="searchStore"
            :class="$style.indexContainer"
          >
            <ais-results :class="$style.innerGrid">
              <grid-col
                mobile="6"
                tablet="4"
                desktop="3"
                slot-scope="{ result }"
              >
                <product-card :product="Product(result)" :lazy="true" />
              </grid-col>
            </ais-results>
          </ais-index>
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
import { createFromAlgoliaCredentials, createFromSerialized } from 'vue-instantsearch';
import { Product } from '../../utils/product';
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import ProductCard from '../../components/NewProductCard.vue';

const searchStore = createFromAlgoliaCredentials('IKBKHO1MME', 'b405042bbaca18408e300b64a4a911e3');
searchStore.indexName = 'products';

export default {
  components: {
    Grid,
    GridCol,
    ProductCard,
    LastSeenSlider: () => import('../../components/LastSeenSlider.vue'),
  },
  data() {
    return {
      searchStore: null,
      query: null,
    };
  },
  async asyncData({ params }) {
    if (process.browser) {
      axios.post(`/.netlify/functions/upload-search-query?query=${params.query}`);
    }
    searchStore.query = params.query;
    searchStore.start();
    await searchStore.waitUntilInSync();

    return {
      serializedSearchStore: searchStore.serialize(),
      query: params.query,
    };
  },
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
    Product,
  },
  created() {
    this.searchStore = createFromSerialized(this.serializedSearchStore);
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
