<template>
  <div>
    <checkout-header-box :number="2" header="Levering" :inactive="inactive" :filled="valid && !edit" :edit="editForm"/>
    <checkout-form v-if="!inactive && (!valid || edit)">
      <checkout-box>
        <h3>Leveringsmetode</h3>
        <p>
          <label for="delivery-method-cheap">
            <input type="radio" id="delivery-method-cheap" name="delivery-method" value="Indenfor 7 arbejdsdage" v-model="delivery.method">
            Indenfor 7 arbejdsdage
            <div>15,00 kr.</div>
          </label>
        </p>
        <p>
          <label for="delivery-method-standard">
            <input type="radio" id="delivery-method-standard" name="delivery-method" value="1-3 arbejdsdage" v-model="delivery.method">
            1-3 arbejdsdage
            <div>30,00 kr.</div>
          </label>
        </p>
        <p>
          <label for="delivery-method-express">
            <input type="radio" id="delivery-method-express" name="delivery-method" value="Indenfor 24 timer" v-model="delivery.method">
            Indenfor 24 timer
            <div>45,00 kr.</div>
          </label>
        </p>
      </checkout-box>
      <checkout-box>
        <h3>Leveringsadresse</h3>
        <p>
          <label for="delivery-address-home">
            <input type="radio" id="delivery-address-home" name="delivery-address" :value="user.personalInformation.address" v-model="delivery.address">
            Din hjemmeadresse <span class="dimmed">({{user.personalInformation.address}})</span>
          </label>
        </p>
        <p>
          <label for="delivery-address-other">
            <input type="radio" id="delivery-address-other" name="delivery-address" value="other" v-model="delivery.address">
            Brug en anden adresse
          </label>
        </p>
      </checkout-box>
      <checkout-box>
        <btn type="primary" height="large" shadow :class="$style.cta" @click.native="save">Gem levering</btn>
      </checkout-box>
    </checkout-form>
    <checkout-box v-if="!inactive && valid && !edit">
      <p><span class="dimmed">Leveringsmetode:</span> {{this.user.checkout.delivery.method}}</p>
      <p><span class="dimmed">Leveringsadresse:</span> {{this.user.checkout.delivery.address}}</p>
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
      delivery: {
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
      this.saveCheckoutDelivery({ ...this.delivery });
      this.edit = false;
    },
    editForm() {
      this.edit = true;
    },
  },
  created() {
    this.delivery = { ...this.user.checkout.delivery };
  },
};
</script>

<style module>
@import '../assets/css/variables.css';
</style>
