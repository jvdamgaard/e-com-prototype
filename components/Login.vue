<template>
  <grid>
    <grid-col>
      <grid inner :class="$style.login">
        <grid-col
          mobile="4"
          phablet="3"
          tablet="2"
        >
          <div
            :class="$style.icon"
            :style="{'background-image': `url('https://jvdamgaard.github.io/e-com-prototype/icons/login.svg')`}"
          />
        </grid-col>
        <grid-col
          mobile="8"
          phablet="9"
          tablet="10"
          verticalCenter
        >
          <p>{{ label }}</p>
          <p class="dimmed small">{{ sublabel }}</p>
        </grid-col>
      </grid>
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

.icon {
  composes: bgImage from global;
  composes: round from global;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 0;
}

@media (min-width: 48rem) {
  .icon {
    width: 4rem;
    padding-bottom: 4rem;
    margin-left: auto;
    margin-right: auto;
  }
}

.login {
  background-color: var(--color-white);
  padding: 2rem 1rem;
}
</style>
