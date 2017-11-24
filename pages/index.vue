<template>
  <sections :sections="sections" />
</template>

<script>
import Sections from '../components/Sections.vue';
import { getPageSections } from '../utils/page';

export default {
  components: {
    Sections,
  },
  async asyncData() {
    const sections = await getPageSections('53o6jmHL3GcsqSGOCEOQmu');
    return { sections };
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
  },
};
</script>

<style>
</style>
