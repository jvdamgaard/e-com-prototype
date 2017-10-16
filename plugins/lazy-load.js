import Vue from 'vue'; //eslint-disable-line
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  error: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif',
  loading: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif',
});
