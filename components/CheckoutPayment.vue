<template>
  <div>
    <checkout-header-box :number="3" header="Betaling" :inactive="inactive" :filled="valid && !edit && !inactive" :edit="editForm"/>
    <checkout-form v-if="!inactive && (!valid || edit)" id="payment">
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
            <img src="/icons/payment-methods/dankort.png">
            <img src="/icons/payment-methods/master-card.png">
            <img src="/icons/payment-methods/visa-electron.png">
            <img src="/icons/payment-methods/visa.png">
            <div>0,00 kr.</div></span>
          </label>
        </p>
        <p>
          <label for="payment-method-mobilepay">
            <input type="radio" id="payment-method-mobilepay" name="payment-method" value="MobilePay (0,00 kr.)" v-model="payment.method">
            MobilePay
            <img src="/icons/payment-methods/mobilepay.png">
            <div>0,00 kr.</div></span>
          </label>
        </p>
        <p>
          <label for="payment-method-paypal">
            <input type="radio" id="payment-method-paypal" name="payment-method" value="PayPal (0,00 kr.)" v-model="payment.method">
            PayPal
            <img src="/icons/payment-methods/paypal.png">
            <div>0,00 kr.</div></span>
          </label>
        </p>
      </checkout-box>
      <checkout-box v-if="payment.method === 'Betalingskort (0,00 kr.)'">
        <p>
          <label for="save-credit-card">
            <input type="checkbox" id="save-credit-card" name="save-credit-card" value="true">
            Gem kort <span class="dimmed">(slip for at indtaste kortoplysninger næste gang)</span>
          </label>
        </p>
      </checkout-box>
    </checkout-form>
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
</style>
