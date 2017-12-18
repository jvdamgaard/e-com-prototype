<template>
  <main>
    <breadcrumb v-if="departments" :paths="departments" :current="titel" />
    <sections :sections="sections" />
  </main>
</template>

<script>
import { mapActions } from 'vuex'; //eslint-disable-line
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
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
      closeDepartmentNav: 'state/closeDepartmentNav',
    }),
  },
  mounted() {
    window.scrollTo(0, 0);
    this.closeMiniBasket();
    this.closeDepartmentNav();
  },
};
</script>

<style>
</style>
