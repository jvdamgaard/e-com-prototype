<template>
  <div>
    <checkout-header-box :number="1" header="Dine oplysninger" :filled="valid && !edit" :edit="editForm"/>
    <checkout-form v-if="!valid || edit">
      <checkout-box>
        <p>
          <label for="name">Fulde navn</label>
          <input type="text" id="name" name="name" required autocomplete="name" v-model="personalInformation.name" ref="name">
        </p>
        <p>
          <label for="email">E-mail <span class="dimmed">(til ordrebekræftigelse)</span></label>
          <input type="email" id="email" name="email" required autocomplete="email" v-model="personalInformation.email" ref="email">
        </p>
        <p>
          <label for="phone">Mobilnummer <span class="dimmed">(til opdatering på levering)</span></label>
          <input type="tel" id="phone" name="phone" required autocomplete="tel" v-model="personalInformation.phone" ref="phone">
        </p>
        <p>
          <label for="address">Find din adresse <span class="dimmed">(til fakturering)</span></label>
          <input-address :changeValue="changeAddress" :value="personalInformation.address" />
        </p>
        <p>
          <label for="create-user">
            <input type="checkbox" id="create-user" name="create-user" value="true">
            Opret bruger <span class="dimmed">(tilgå nemt din ordre efter bestilling)</span>
          </label>
        </p>
      </checkout-box>
      <checkout-box>
        <btn type="primary" height="large" shadow :class="$style.cta" @click.native="save">Gem dine oplysninger</btn>
      </checkout-box>
    </checkout-form>
    <checkout-box v-if="valid && !edit" :inactive="inactive">
      <p><span class="dimmed">Fulde navn:</span> {{this.user.personalInformation.name}}</p>
      <p><span class="dimmed">E-mail:</span> {{this.user.personalInformation.email}}</p>
      <p><span class="dimmed">Mobilnummer:</span> {{this.user.personalInformation.phone}}</p>
      <p><span class="dimmed">Adresse:</span> {{this.user.personalInformation.address}}</p>
    </checkout-box>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; // eslint-disable-line
import CheckoutBox from './CheckoutBox.vue';
import CheckoutForm from './CheckoutForm.vue';
import CheckoutHeaderBox from './CheckoutHeaderBox.vue';
import InputAddress from './InputAddress.vue';
import Btn from './Btn.vue';

export default {
  components: {
    CheckoutBox,
    CheckoutForm,
    CheckoutHeaderBox,
    InputAddress,
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
      personalInformation: {
        name: null,
        email: null,
        address: null,
        phone: null,
      },
      edit: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions({
      savePersonalInformation: 'user/savePersonalInformation',
    }),
    save() {
      // Validate
      this.savePersonalInformation({ ...this.personalInformation });
      this.edit = false;
    },
    editForm() {
      this.edit = true;
    },
    changeAddress(address) {
      this.personalInformation.address = address;
    },
  },
  created() {
    this.personalInformation = { ...this.user.personalInformation };
  },
};
</script>

<style module>
@import '../assets/css/variables.css';
</style>
