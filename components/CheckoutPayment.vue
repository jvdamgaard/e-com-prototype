<template>
  <div>
    <checkout-header-box :number="3" header="Betaling" :inactive="inactive" :filled="valid && !edit && !inactive" :edit="editForm"/>
    <checkout-form v-if="!inactive && (!valid || edit)">
      <checkout-box>
        <h3>Faktureringsadresse</h3>
        <p>
          <label for="payment-address-home">
            <input type="radio" id="payment-address-home" name="payment-address" value="home" v-model="payment.address">
            Din hjemmeadresse <span class="dimmed">({{user.personalInformation.address}})</span>
          </label>
        </p>
        <p>
          <label for="payment-address-other">
            <input type="radio" id="payment-address-other" name="payment-address" value="other" v-model="payment.address">
            Brug en anden adresse
          </label>
        </p>
      </checkout-box>
      <checkout-box>
        <h3>Betalingsmetode</h3>
        <p>
          <label for="payment-method-credit-card">
            <input type="radio" id="payment-method-credit-card" name="payment-method" value="Betalingskort (0,00 kr.)" v-model="payment.method">
            Betalingskort
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/dankort.png">
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/master-card.png">
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/visa-electron.png">
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/visa.png">
            <div>0,00 kr.</div></span>
          </label>
        </p>
        <p>
          <label for="payment-method-mobilepay">
            <input type="radio" id="payment-method-mobilepay" name="payment-method" value="MobilePay (0,00 kr.)" v-model="payment.method">
            MobilePay
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/mobilepay.png">
            <div>0,00 kr.</div></span>
          </label>
        </p>
        <p>
          <label for="payment-method-paypal">
            <input type="radio" id="payment-method-paypal" name="payment-method" value="PayPal (0,00 kr.)" v-model="payment.method">
            PayPal
            <img src="https://jvdamgaard.github.io/e-com-prototype/icons/payment-methods/paypal.png">
            <div>0,00 kr.</div></span>
          </label>
        </p>
      </checkout-box>
      <checkout-box>
        <p>
          <label for="save-credit-card">
            <input type="checkbox" id="save-credit-card" name="save-credit-card" value="true">
            Gem kort <span class="dimmed">(slip for at indtaste kortoplysninger næste gang)</span>
          </label>
        </p>
      </checkout-box>
    </checkout-form>
    <checkout-box :inactive="inactive" transparent>
      <btn type="buy" height="large" shadow>Afsend bestilling og betal</btn>
      <div :class="$style.terms">Ved afgivelse af denne bestilling accepterer du <nuxt-link to="/">Brands databeskyttelse</nuxt-link> og <nuxt-link to="/">handelsbetingelser</nuxt-link>.</div>
    </checkout-box>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import CheckoutBox from './CheckoutBox.vue';
import CheckoutForm from './CheckoutForm.vue';
import CheckoutHeaderBox from './CheckoutHeaderBox.vue';
import Btn from './Btn.vue';

export default {
  components: {
    CheckoutBox,
    CheckoutForm,
    CheckoutHeaderBox,
    Btn,
  },
  props: {
    valid: {
      type: Boolean,
      default: false,
    },
    inactive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      payment: {
        method: null,
        address: null,
      },
      edit: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions({
      saveCheckoutDelivery: 'user/saveCheckoutDelivery',
    }),
    save() {
      // Validate
      this.saveCheckoutDelivery({
        ...this.payment,
        address: this.payment.address === 'home' ? this.user.personalInformation.address : '',
      });
      this.edit = false;
    },
    editForm() {
      this.edit = true;
    },
  },
  created() {
    this.payment = { ...this.user.checkout.payment };
    if (!this.payment.address || this.payment.address === this.user.personalInformation.address) {
      this.payment.address = 'home';
    }
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

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
