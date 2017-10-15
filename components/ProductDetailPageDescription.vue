<template>
  <grid fullWidthUntil="phablet" id="description">
    <div
      class="is-12-col is-9-col-on-laptop is-10-col-on-desktop has-white-background"
      :class="$style.container"
    >
      <h2 class="is-h1 has-no-top-margin">Beskrivelse</h2>
      <div v-for="(section, i) in sections" v-if="i === 0 || expanded" class="clearfix">
        <h2 v-if="section.header">{{section.header}}</h2>
        <img v-if="section.imgSrc" v-lazy="section.imgSrc" />
        <div v-if="section.text" v-html="section.text" />
      </div>
      <div :class="$style.expander">
        <btn v-if="!expanded && sections.length > 1" type="ghost" @click.native="expand">Læs mere</btn>
      </div>
    </div>
  </grid>
</template>

<script>
import Grid from './Grid.vue';
import Btn from './Btn.vue';

export default {
  components: {
    Grid,
    Btn,
  },
  props: {
    sections: Array,
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
}
.container img {
  max-width: 100%;
  margin: 0.5rem 0;
}
.container h2, .expander {
  margin: 2rem 0 1rem;
}
.container p, .container h3 {
  margin: 0.5rem 0;
}

.expander {
  width: 50%;
  margin-left: auto!important;
  margin-right: auto!important;
}

@media (min-width: 25rem) {
  .container img {
    float: right;
    width: 33%;
    margin: 0 0 1rem 1rem;
  }
}

@media (min-width: 48rem) {
  .container { padding: 2rem; }
  .container img { width: 25%; }
  .container h2, .expander { margin: 4rem 0 2rem; }
  .container p, .container h3 { margin: 1rem 0; }
}

@media (min-width: 96rem) {
  .container { padding: 6rem 20%; }
  .container img { margin: 0 0 1rem 1rem; }
}

</style>
