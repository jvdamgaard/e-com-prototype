<template>
  <grid fullWidthUntil="phablet" class="ProductDetailPageDescription">
    <grid-col
      laptop="9"
      desktop="10"
      :class="$style.container"
    >
      <h2 :class="$style.header">{{header}}</h2>
      <div v-for="(section, i) in sections" v-if="i === 0 || expanded" class="clearfix">
        <h2 v-if="section.header">{{section.header}}</h2>
        <div :class="$style.image">
          <image-container
            v-if="section.image"
            v-bind="section.image"
          />
        </div>
        <div v-if="section.text" v-html="section.text" />
      </div>
      <div :class="$style.expander" v-if="!expanded && sections.length > 1">
        <btn type="ghost" @click.native="expand">{{buttonText}}</btn>
      </div>
    </grid-col>
  </grid>
</template>

<script>
import Grid from './Grid.vue';
import GridCol from './GridCol.vue';
import Btn from './Btn.vue';
import ImageContainer from './Image.vue';

export default {
  components: {
    Grid,
    GridCol,
    Btn,
    ImageContainer,
  },
  props: {
    sections: Array,
    header: {
      type: String,
      default: 'Beskrivelse',
    },
    buttonText: {
      type: String,
      default: 'Læs mere',
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    expand() {
      this.expanded = true;
    },
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.container {
  padding: 2rem 1rem;
  background-color: var(--color-white);
}
.header {
  composes: h1 from global;
  margin-top: 0!important;
}
.image {
  max-width: 100%;
  margin: 0.5rem 0;
}
.container h2, .expander {
  margin: 2rem 0 1rem;
}
.container p, .container h3 {
  margin: 0.5rem 0;
}

@media (min-width: 25rem) {
  .image {
    float: right;
    width: 33%;
    margin: 0 0 1rem 1rem;
  }
  .expander {
    width: 50%;
    margin-left: auto!important;
    margin-right: auto!important;
  }
}

@media (min-width: 48rem) {
  .container { padding: 2rem; }
  .image { width: 25%; }
  .container h2, .expander { margin: 4rem 0 2rem; }
  .container p, .container h3 { margin: 1rem 0; }
}

@media (min-width: 96rem) {
  .container { padding: 6rem 20%; }
  .image { margin: 0 0 1rem 1rem; }
}

</style>
