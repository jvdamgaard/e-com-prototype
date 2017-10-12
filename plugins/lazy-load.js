import Vue from 'vue'; //eslint-disable-line
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  error: '',
  loading: 'https://jvdamgaard.github.io/e-com-prototype/icons/loading.svg',
});
