<template>
  <div>
    <checkout-header />
    <nuxt/>
  </div>
</template>

<script>
import CheckoutHeader from '../components/CheckoutHeader.vue';
import MainFooter from '../components/MainFooter.vue';

export default {
  components: {
    CheckoutHeader,
    MainFooter,
  },
};
</script>

<style>
body {
  padding-top: 0;
}
</style>
