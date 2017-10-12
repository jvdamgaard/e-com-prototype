<template>
  <!-- Modules -->
  <modules :modules="modules" />
</template>

<script>
import axios from 'axios';
import Modules from '../components/Modules.vue';

export default {
  components: {
    Modules,
  },
  asyncData() {
    return axios.get('http://localhost:3000/json/pages/home.json')
      .then(res => (Promise.all(res.data.modules.map((module) => {
        if (module.type === 'ProductSlider' && module.data.src) {
          return axios.get(module.data.src).then(sliderRes => ({
            ...module,
            data: {
              ...module.data,
              products: sliderRes.data.slice(0, 6),
            },
          }));
        }
        return module;
      }))))
      .then(modules => ({ modules }));
  },
};
</script>

<style>
</style>
