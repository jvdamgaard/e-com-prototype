<template>
  <div :class="$style.container">
    <overlay />
    <navigation />
    <nuxt/>
    <main-footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'; //eslint-disable-line
import { mapState } from 'vuex'; // eslint-disable-line
import Navigation from '../components/Navigation.vue';
import MainFooter from '../components/MainFooter.vue';
import Overlay from '../components/Overlay.vue';

export default {
  components: {
    Navigation,
    MainFooter,
    Overlay,
  },
  computed: {
    ...mapState(['state']),
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
    }),
  },
  head() {
    return {
      bodyAttrs: {
        class: this.state.overlayActive ? 'lock-scroll' : '',
      },
    };
  },
  created() {
    if (process.browser) {
      this.fetchUser();
    }
  },
};
</script>

<style module>
.container {
  position: relative;
}
</style>
