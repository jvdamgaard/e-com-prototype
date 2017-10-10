import Vue from 'vue'; //eslint-disable-line
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  error: null,
  loading: null,
  preLoad: 1.5,
});
