<template>
  <!-- Modules -->
  <modules :modules="modules" />
</template>

<script>
import axios from 'axios';
import Modules from '../components/Modules.vue';
import { resolveModulesData } from '../utils';

export default {
  components: {
    Modules,
  },
  asyncData() {
    // Fecth modules data
    return axios.get('https://jvdamgaard.github.io/e-com-prototype/json/pages/home.json')
      .then(resolveModulesData)
      .then(modules => ({ modules }));
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>
