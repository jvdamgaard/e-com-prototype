<template>
  <grid>
    <grid-col mobile="0" tablet="2" laptop="3" />
    <grid-col tablet="8" laptop="6">
      <nuxt-link to="/login/" :class="$style.login">
        <div
          :class="$style.icon"
          :style="{'background-image': `url('/icons/login.svg')`}"
        />
        <p>{{ label }}</p>
        <p class="dimmed small">{{ sublabel }}</p>
      </nuxt-link>
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
  display: block;
  transition: all 0.2s ease;
  color: var(--color-black);
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0);
}
.login:hover {
  text-decoration: none!important;
}
:global(.no-touch) .login:hover {
  /*margin: -0.5rem;
  height: calc(100% + 1rem);
  width: calc(100% + 1rem);*/
  box-shadow: 0 0.25rem 1.5rem rgba(0,0,0,0.15);
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
