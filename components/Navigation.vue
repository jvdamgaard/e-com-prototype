<template>
  <div>
    <grid :class="$style.eyebrow">
      <grid-col mobile="0" tablet="12">
        <div :class="$style.group">
          <div :class="$style.promotion">
            <nuxt-link to="/legetoej/lego/" :class="$style.promotionLink">
              <strong class="red">25% rabat</strong> på alt LEGO indtil lørdag
            </nuxt-link>
          </div>
          <ul :class="$style.links">
            <li>
              <nuxt-link to="/tilbudsaviden/" :class="$style.link">Tilbudsavis</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/kundeservice/" :class="$style.link">Find butik</nuxt-link>
            </li>
            <li :class="$style.customerService">
              <nuxt-link to="/kundeservice/" :class="$style.link">Kundeservice</nuxt-link>
            </li>
          </ul>
        </div>
      </grid-col>
    </grid>

    <grid :class="$style.main">
      <grid-col verticalCenter>
        <div :class="$style.group">
          <nuxt-link to="/">
            <span :class="$style.logo">market</span>
          </nuxt-link>
          <input type="search" placeholder="Søg efter produkter, brands, afdelinger eller inspiration" :class="$style.search">
          <nuxt-link to="/min-konto/" :class="$style.iconLink">
            <img src="/icons/profile-white.svg"/>
          </nuxt-link>
          <nuxt-link to="/favoritter/" :class="$style.iconLink">
            <img src="/icons/favourite-white.svg"/>
          </nuxt-link>
          <nuxt-link to="/kurv/" :class="$style.iconLink">
            <img src="/icons/bag-empty-white.svg"/>
          </nuxt-link>
        </div>
      </grid-col>
    </grid>

    <grid :class="$style.departments">
      <grid-col verticalCenter>
        <ul class="inlineList">
          <li>
            <nuxt-link to="/afde/">Elektronik</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/kundeservice/">Bolig</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Have</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Leg</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Fritid</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Spiritus</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Hvidevarer</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Byggemarked</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Brands</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/">Inspiration</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/" :class="$style.offers">Tilbud</nuxt-link>
          </li>
          <li :class="$style.customerService">
            <nuxt-link to="/kundeservice/" :class="$style.offers">Outlet</nuxt-link>
          </li>
        </ul>
      </grid-col>
    </grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';

export default {
  components: {
    Grid,
    GridCol,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['state']),
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.eyebrow {
  composes: small from global;
  line-height: 2rem;
  color: var(--color-grey-darker);
}

.eyebrow a { color: var(--color-grey-darker); }

.group {
  composes: group from global;
  white-space: nowrap;
}

.promotion {
  /*display: block;*/
  width: 100%;
}
.links {
  composes: inlineList from global;
  text-align: right;
}
.links li:not(:last-child) {
  margin: 0 1rem;
}

.main {
  background-color: var(--color-grey-darker);
  height: 3.5rem;
  color: var(--color-white);
}

.main a { color: var(--color-white); }
.main a:hover { text-decoration: none; }

.logo {
  font-size: 2rem;
  line-height: 3.35rem;
  font-weight: 700;
  margin-bottom: 0.15rem;
  margin-right: 1.5rem;
}

.search {
  border: 0 !important;
  border-radius: 1.25rem;
  margin: 0 1rem;
  padding: 0 2.5rem 0 1.25rem;
}

.iconLink {
  height: 3rem;
  width: 5rem;
  text-align: center;
  position: relative;
}

.iconLink img {
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}



.departments {
  background-color: var(--color-grey-dark);
  color: var(--color-white);
}

.departments a {
  display: inline-block;
  color: var(--color-white);
  line-height: 3rem;
  padding: 0 0.5rem;
}
.departments a:hover {
  text-decoration: none;
  background-color: var(--color-white);
  color: var(--color-grey-darker);
}

.offers {
  color: var(--color-yellow) !important;
}
.offers:hover {
  background-color: var(--color-yellow) !important;
  color: var(--color-grey-darker) !important;
}
</style>
