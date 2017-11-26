<template>
  <div>
    <article class="theme-None" :class="$style.basketContainer">
      <section>
        <basket />
      </section>
    </article>
    <article class="theme-Dark" key="last-seen-basket">
      <section>
        <last-seen-slider header="Du har senest kigget på" />
      </section>
    </article>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //eslint-disable-line

export default {
  components: {
    Basket: () => import('../../components/Basket.vue'),
    LastSeenSlider: () => import('../../components/LastSeenSlider.vue'),
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

<style module>
.basketContainer { margin-top: 1rem !important; }
</style>
