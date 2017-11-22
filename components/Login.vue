<template>
  <grid>
    <grid-col mobile="0" tablet="2" laptop="3" />
    <grid-col tablet="8" laptop="6">
      <div :class="$style.login">
        <div
          :class="$style.icon"
          :style="{'background-image': `url('https://jvdamgaard.github.io/e-com-prototype/icons/login.svg')`}"
        />
        <p>{{ label }}</p>
        <p class="dimmed small">{{ sublabel }}</p>
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
  props: {
    label: String,
    sublabel: String,
  },
};
</script>


<style module>
@import '../assets/css/variables.css';

.login {
  composes: clearfix from global;
  background-color: var(--color-white);
  padding: 2rem 1rem;
}

.icon {
  composes: bgImage from global;
  composes: round from global;
  width: 4rem;
  padding-bottom: 4rem;
  margin-bottom: 0;
  margin-right: 1rem;
  float: left;
}
</style>
