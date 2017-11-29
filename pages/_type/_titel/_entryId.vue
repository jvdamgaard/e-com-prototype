<template>
  <main>
    <breadcrumb v-if="departments" :paths="departments" :current="titel" />
    <sections :sections="sections" />
  </main>
</template>

<script>
import Sections from '../../../components/Sections.vue';
import Breadcrumb from '../../../components/Breadcrumb.vue';
import { getPage } from '../../../utils/page';

export default {
  components: {
    Sections,
    Breadcrumb,
  },
  async asyncData({ params }) {
    const data = await getPage(params.entryId);
    return data;
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
  },
};
</script>

<style>
</style>
