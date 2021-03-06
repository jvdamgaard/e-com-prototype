<template>
  <div>
    <sticky-scroll-wrapper
      :offsetTop="16"
      :offsetBottom="-16"
      bottomSelector="#payment"
      heightSelector="#summary"
      class="hiddenOnMobile visibleOnLaptop"
    >
      <grid id="summary" :style="{ margin: 0 }">
        <grid-col mobile="0" laptop="7" />
        <grid-col laptop="5" desktop="3">
          <div>
            <checkout-header-box :header="`${user.basket.items.length} produkt${user.basket.items.length > 1 ? 'er' : ''}`" filled small :edit="editBasket"/>
            <div :class="$style.basket">
              <mini-basket-item
                v-for="item in user.basket.items"
                :key="item.product.id"
                v-bind="item"
                :interactive="false"
                :class="$style.basketItem"
              />
            </div>
          </div>
          <div>
            <checkout-box>
              <basket-calculation />
            </checkout-box>
          </div>
          <div>
            <checkout-discount />
          </div>
        </grid-col>
        <grid-col mobile="0" desktop="2" />
      </grid>
    </sticky-scroll-wrapper>
    <grid :class="$style.container" full-width-until="mobile">
      <grid-col mobile="0" desktop="2"/>
      <grid-col laptop="7" desktop="5">
        <checkout-personal-information :valid="personalInformationValid" />
        <checkout-delivery :valid="deliveryValid" :inactive="!personalInformationValid" />
        <checkout-payment :valid="paymentValid" :inactive="!personalInformationValid || !deliveryValid" id="payment" />
        <checkout-box :inactive="!personalInformationValid || !deliveryValid" transparent>
          <btn type="buy" height="large" shadow>Afsend bestilling og betal</btn>
          <div :class="$style.terms">Ved afgivelse af denne bestilling accepterer du <nuxt-link to="/">Brands databeskyttelse</nuxt-link> og <nuxt-link to="/">handelsbetingelser</nuxt-link>.</div>
        </checkout-box>
      </grid-col>
    </grid>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //eslint-disable-line
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import Btn from '../../components/Btn.vue';
import CheckoutPersonalInformation from '../../components/CheckoutPersonalInformation.vue';
import CheckoutDelivery from '../../components/CheckoutDelivery.vue';
import CheckoutPayment from '../../components/CheckoutPayment.vue';
import CheckoutHeaderBox from '../../components/CheckoutHeaderBox.vue';
import CheckoutBox from '../../components/CheckoutBox.vue';
import StickyScrollWrapper from '../../components/StickyScrollWrapper.vue';
import MiniBasketItem from '../../components/MiniBasketItem.vue';
import BasketCalculation from '../../components/BasketCalculation.vue';
import CheckoutDiscount from '../../components/CheckoutDiscount.vue';

export default {
  layout: 'checkout',
  components: {
    Grid,
    GridCol,
    Btn,
    CheckoutPersonalInformation,
    CheckoutDelivery,
    CheckoutPayment,
    CheckoutHeaderBox,
    CheckoutBox,
    StickyScrollWrapper,
    MiniBasketItem,
    BasketCalculation,
    CheckoutDiscount,
  },
  computed: {
    ...mapState(['user']),
    personalInformationValid() {
      return !!(
        this.user.personalInformation.full_name &&
        this.user.personalInformation.email &&
        this.user.personalInformation.phone &&
        this.user.personalInformation.address &&
        this.user.personalInformation.city &&
        this.user.personalInformation.postal_code
      );
    },
    deliveryValid() {
      return !!(
        this.user.checkout.delivery.method &&
        this.user.checkout.delivery.address
      );
    },
    paymentValid() {
      return !!(
        this.user.checkout.payment.method &&
        this.user.checkout.payment.address
      );
    },
  },
  methods: {
    ...mapActions({
      closeMiniBasket: 'state/closeMiniBasket',
    }),
    editBasket() {
      this.$router.push('/kurv/');
    },
  },
  fetch({ store, redirect }) {
    if (store.state.user.basket.items.length === 0) {
      return redirect('/kurv/');
    }
    return null;
  },
  mounted() {
    window.scrollTo(0, 0);
    this.closeMiniBasket();
  },
};
</script>

<style module>
.container {
  margin-top: 1rem;
}

.basket {
  margin-bottom: 1px;
  max-height: 16rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.basketItem:not(:last-child) {
  margin-bottom: 1px;
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
