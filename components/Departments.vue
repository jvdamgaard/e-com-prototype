<template>
  <grid>
    <grid-col tablet="8">
        <h2 v-html="header" />
      </grid-col>
      <grid-col mobile="0" tablet="4" :class="$style.headerRight">
        <nuxt-link to="/" :class="$style.showAllLink">vis alle</nuxt-link>
      </grid-col>
    <grid-col
      v-for="link in links"
      mobile="6"
      phablet="4"
      tablet="3"
      laptop="2"
      :key="link.titel"
    >
      <nuxt-link :to="link.url" :class="$style.container">
        <div :class="[
          $style.image,
          { [$style.fullWidthImage]: link.hasEnvironmentImage },
        ]">
          <image-container
            :src="link.image"
            :width="400"
            :height="400"
            :lazy="lazy"
            :crop="link.hasEnvironmentImage"
          />
        </div>
        <div :class="$style.text">
          {{ link.titel }}
        </div>
      </nuxt-link>
    </grid-col>
  </grid>
</template>

<script>
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
    lazy: Boolean,
    links: Array,
  },
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
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0);
  overflow: hidden;
}
.container:hover {
  text-decoration: none!important;
}
:global(.no-touch) .container:hover {
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
}

.image {
  padding: 15% 15% 0;
  transition: all 0.2s ease;
  width: 100%;
}

.fullWidthImage {
  margin-left: -15% !important;
  margin-top: -15% !important;
  width: calc(130%) !important;
}

.headerRight { text-align: right; }
.showAllLink {
  composes: small from global;
  color: var(--color-grey-darker);
}

.text {
  composes: small from global;
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
