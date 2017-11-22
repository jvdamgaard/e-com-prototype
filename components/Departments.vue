<template>
  <grid :class="$style.container">
    <grid-col><h2>{{ header }}</h2></grid-col>
    <grid-col
      v-for="department in departments"
      mobile="3"
      phablet="2"
      :class="$style.item"
      :key="department.titel"
    >
      <div
        :class="$style.icon"
        :style="{'background-image': `url('${department.iconSrc}')`,}"
      />
      {{ department.titel }}
    </grid-col>
  </grid>
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
  props: {
    header: String,
  },
  computed: mapState(['departments']),
};
</script>


<style module>
@import '../assets/css/variables.css';

.container {
  background-color: var(--color-white);
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.item {
  composes: small from global;
  text-align: center;
}
.icon {
  composes: bgImage from global;
  composes: round from global;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 0.5rem;
}

@media (min-width: 48rem) {
  .icon {
    width: 80%;
    padding-bottom: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (min-width: 64rem) {
  .icon {
    width: 60%;
    padding-bottom: 60%;
    margin-bottom: 1rem;
  }
  .item {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
