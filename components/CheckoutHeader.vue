<template>
  <div>
    <grid :class="$style.container">
      <grid-col mobile="6" tablet="4">
        <nuxt-link to="/" :class="$style.logo">
          <img src="https://jvdamgaard.github.io/e-com-prototype/images/logo-primary.svg" width="84" height="24" />
        </nuxt-link>
      </grid-col>
      <grid-col mobile="6" tablet="4">
        <h1 :class="$style.header">Kassen</h1>
      </grid-col>
      <grid-col mobile="0" tablet="4" :class="$style.secure">
        &#128274; 100% sikker betaling
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
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  margin-top: 0;
  margin-bottom: 0;
}

.logo {
  text-decoration: none;
  display: block;
  height: 4rem;
  vertical-align: middle;
  margin-right: 1rem;
}

.logo img {
  height: 4rem;
  width: auto;
  padding: 1.25rem 0;
}

.header {
  composes: h2 from global;
  text-align: right;
  line-height: 4rem;
}
@media (min-width: 48rem) {
  .header {
    text-align: center;
  }
}

.secure {
  composes: h3 from global;
  text-align: right;
  line-height: 4rem;
}
</style>
