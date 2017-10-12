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
    return axios.get('https://raw.githubusercontent.com/jvdamgaard/e-com-prototype/master/static/json/pages/home.json')
      .then(resolveModulesData)
      .then(modules => ({ modules }));
  },
};
</script>

<style>
</style>
