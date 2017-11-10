<template>
  <div :class="$style.container">
    <navigation />
    <nuxt/>
    <main-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'; //eslint-disable-line
import Navigation from '../components/Navigation.vue';
import MainFooter from '../components/MainFooter.vue';

export default {
  components: {
    Navigation,
    MainFooter,
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
    }),
  },
  created() {
    if (process.browser) {
      this.fetchUser(window.localStorage.getItem('userId'));
    }
  },
};
</script>

<style module>
.container {
  padding-top: 5.5rem;
}
</style>
