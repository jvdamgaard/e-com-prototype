<template>
  <!-- Modules -->
  <grid :class="$style.container">
    <grid-col desktop="2"/>
    <grid-col desktop="5">
      <checkout-personal-information :valid="personalInformationValid" />
      <div>
        <checkout-header-box :number="2" header="Levering" inactive/>
      </div>
      <div>
        <checkout-header-box :number="3" header="Betaling" inactive/>
      </div>
      <div>
        <checkout-box transparent inactive>
          <btn type="buy" height="large" shadow>Afsend bestilling og betal</btn>
          <div :class="$style.terms">Ved afgivelse af denne bestilling accepterer du <nuxt-link to="/">Brands databeskyttelse</nuxt-link> og <nuxt-link to="/">handelsbetingelser</nuxt-link>.</div>
        </checkout-box>
      </div>
    </grid-col>
    <grid-col dekstop="3">

    </grid-col>
    <grid-col desktop="2"/>
  </grid>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //eslint-disable-line
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import Btn from '../../components/Btn.vue';
import CheckoutPersonalInformation from '../../components/CheckoutPersonalInformation.vue';
import CheckoutHeaderBox from '../../components/CheckoutHeaderBox.vue';
import CheckoutBox from '../../components/CheckoutBox.vue';

export default {
  layout: 'checkout',
  components: {
    Grid,
    GridCol,
    Btn,
    CheckoutPersonalInformation,
    CheckoutHeaderBox,
    CheckoutBox,
  },
  computed: {
    ...mapState(['user']),
    personalInformationValid() {
      return !!(
        this.user.personalInformation.name &&
        this.user.personalInformation.email &&
        this.user.personalInformation.phone &&
        this.user.personalInformation.address
      );
    },
  },
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
    }),
  },
  fetch({ store, redirect }) {
    if (store.state.user.basket.items.length === 0) {
      return redirect('/kurv/');
    }
    return null;
  },
  mounted() {
    const initPos = (window.pageYOffset > 33) ? 33 : 0;
    window.scrollTo(0, initPos);
    this.closeMiniBasket();
  },
};
</script>

<style module>
.container {
  margin-top: 1rem;
}
.terms {
  composes: dimmed from global;
  composes: small from global;
  margin-top: 1rem;
  text-align: center;
}
.terms a {
  color: var(--color-grey-dark);
  text-decoration: underline;
}
</style>
