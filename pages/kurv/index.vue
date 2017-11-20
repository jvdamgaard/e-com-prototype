<template>
  <!-- Modules -->
  <div>
    <section>
      <basket />
    </section>
    <section>
      <product-slider
        :initProducts="user.lastSeen"
        header="Du har senest kigget på"
        key="last-seen"
      />
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //eslint-disable-line

export default {
  components: {
    ProductSlider: () => import('../../components/ProductSlider.vue'),
    Basket: () => import('../../components/Basket.vue'),
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
    }),
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
    this.closeMiniBasket();
  },
};
</script>

<style>
</style>
