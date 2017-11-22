<template>
  <grid>
    <grid-col tablet="8">
        <h2 v-html="header" />
      </grid-col>
      <grid-col mobile="0" tablet="4" :class="$style.headerRight">
        <nuxt-link to="/" :class="$style.showAllLink">vis alle</nuxt-link>
      </grid-col>
    <grid-col
      v-for="department in departments"
      mobile="6"
      phablet="4"
      tablet="3"
      laptop="2"
      :key="department.titel"
    >
      <nuxt-link to="/" :class="$style.container">
        <image-container
          :src="department.iconSrc"
          :width="400"
          :height="400"
          :lazy="false"
        />
        <div :class="$style.text">
          {{ department.titel }}
        </div>
      </nuxt-link>
    </grid-col>
  </grid>
</template>

<script>
import { mapState } from 'vuex'; // eslint-disable-line
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import ImageContainer from './Image.vue';

export default {
  components: {
    Grid,
    GridCol,
    ImageContainer,
  },
  props: {
    header: String,
  },
  computed: mapState(['departments']),
};
</script>


<style module>
@import '../assets/css/variables.css';

.container {
  display: block;
  transition: all 0.2s ease;
  color: var(--color-black);
  background-color: var(--color-white);
  height: 100%;
  width: 100%;
}
.container:hover {
  text-decoration: none!important;
}
:global(.no-touch) .container:hover {
  margin: -0.5rem;
  height: calc(100% + 1rem);
  width: calc(100% + 1rem);
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
}

.headerRight { text-align: right; }
.showAllLink {
  composes: small from global;
  color: var(--color-grey-darker);
}

.text {
  composes: h3 from global;
  background-color: var(--color-white);
  padding: 1rem;
  text-align: center;
  transition: all 0.2s ease;
}
:global(.no-touch) .container:hover .text {
  padding: 1rem 1.5rem;
}

@media (min-width: 48rem) {
  .text {
    padding: 2rem 1rem;
  }
  :global(.no-touch) .container:hover .text {
    padding: 2rem 1.5rem;
  }
}
</style>
