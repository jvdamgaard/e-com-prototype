<template>
  <modules :modules="modules" />
</template>

<script>
import Modules from '../components/Modules.vue';
import { getPageModules } from '../utils/page';

export default {
  components: {
    Modules,
  },
  asyncData() {
    // Fecth modules data
    return getPageModules('53o6jmHL3GcsqSGOCEOQmu')
      .then(modules => ({ modules }));
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
  },
};
</script>

<style>
</style>
