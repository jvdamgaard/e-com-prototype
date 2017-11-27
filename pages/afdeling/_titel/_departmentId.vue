<template>
  <sections :sections="sections" />
</template>

<script>
import Sections from '../../../components/Sections.vue';
import { getPageSections } from '../../../utils/page';

export default {
  components: {
    Sections,
  },
  async asyncData({ params }) {
    const sections = await getPageSections(params.departmentId);
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
