<template>
  <grid :class="$style.container">
    <grid-col verticalCenter>
      <div :class="$style.group">
        <nuxt-link to="/" :class="$style.logo">Bilka</nuxt-link>
        <span :class="$style.tagline">
          Dit hypermarked
        </span>
        <div :class="$style.promotion">
          <nuxt-link to="/legetoej/lego/" :class="$style.promotionLink">
            <strong class="is-red">25% rabat</strong> på alt LEGO indtil lørdag
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
          <li :class="$style.login">
            <nuxt-link to="/log-ind/" :class="$style.link">Log ind</nuxt-link>
          </li>
        </ul>
      </div>
    </grid-col>
  </grid>
</template>

<script>
  import Grid from './Grid.vue';
  import GridCol from './GridCol.vue';

  export default {
    components: {
      Grid,
      GridCol,
    },
  };
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  background-color: var(--color-white);
  height: 2rem;
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
}
.group {
  composes: group from './styles.css';
  white-space: nowrap
}
.logo {
  composes: h2 from './styles.css';
  composes: hiddenOnTablet from './styles.css';
  text-decoration: none !important;
  font-weight: 900;
}
.tagline {
  composes: hiddenOnMobile from './styles.css';
  composes: inlineOnTablet from './styles.css';
  composes: small from './styles.css';
}
.promotion {
  composes: small from './styles.css';
  display: block;
  text-align: center;
  width: 100%;
}
.link { color: var(--color-grey-darker); }
.promotionLink {
  composes: hiddenOnMobile from './styles.css';
  composes: visibleOnLaptop from './styles.css';
  composes: link;
}
.links {
  composes: inlineList from './styles.css';
  composes: small from './styles.css';
  text-align: right;
  color: var(--color-grey-dark);
}
.links li {
  margin: 0 0.5rem;
}
.links li:last-child {
  margin-right: 0;
}

.customerService {
  composes: hiddenOnMobile from './styles.css';
  composes: inlineOnPhablet from './styles.css';
}
.login {
  composes: hiddenOnMobile from './styles.css';
  composes: inlineOnTablet from './styles.css';
}

</style>
