<template>
  <div>
    <checkout-header-box :number="1" header="Dine oplysninger" :filled="valid && !edit" :edit="editForm"/>
    <checkout-form v-if="!valid || edit">
      <checkout-box>
        <p>
          <label for="name">Fulde navn</label>
          <input type="text" id="name" name="name" required autocomplete="name" v-model="personalInformation.full_name" ref="name">
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
          <label for="address">Din hjemmeadresse</label>
          <input-address
            :changeValue="changeAddress"
            :value="fullAddress"
          />
        </p>
        <p v-if="!isLoggedIn">
          <label for="create-user">
            <input type="checkbox" id="create-user" name="create-user" v-model="createUserFlag">
            Opret bruger <span class="dimmed">(tilgå nemt din ordre efter bestilling)</span>
          </label>
        </p>
        <template v-if="createUserFlag">
          <p>
            <div :class="$style.password">
              <label for="password">Kodeord <span class="dimmed">(mindst 6 tegn)</span></label>
              <div :class="$style.showPassword" @click="togglePassword">{{showPassword ? 'skjul' : 'vis'}}</div>
              <input v-if="!showPassword" type="password" id="password" name="password" required autocomplete="new-password" v-model="password">
              <input v-if="showPassword" type="text" id="password" name="password" required autocomplete="new-password" v-model="password">
            </div>
            <span class="small dimmed">Ved oprettelse laver vi et <nuxt-link to="/">Dansk Supermarked Login</nuxt-link>, som kan bruges på tværs af alle <nuxt-link to="/">vores kæder</nuxt-link> og du accepterer <nuxt-link to="/">profilbetingelserne</nuxt-link> (herunder samtykke, jf. pkt. 9.1) samt <nuxt-link to="/">persondatapolitikken</nuxt-link>.</span>
          </p>
        </template>
      </checkout-box>
      <checkout-box>
        <btn
          type="primary"
          height="large"
          :loading="saving"
          :done="saved"
          shadow
          :class="$style.cta"
          @click.native="save"
        >Gem dine oplysninger</btn>
      </checkout-box>
    </checkout-form>
    <checkout-box v-if="valid && !edit" :inactive="inactive">
      <div>
        <p><span class="dimmed">Fulde navn:</span> {{this.personalInformation.full_name}}</p>
        <p><span class="dimmed">E-mail:</span> {{this.personalInformation.email}}</p>
        <p><span class="dimmed">Mobilnummer:</span> {{this.personalInformation.phone}}</p>
        <p><span class="dimmed">Adresse:</span> {{this.fullAddress}}</p>
      </div>
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

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
        full_name: null,
        email: null,
        address: null,
        city: null,
        postal_code: null,
        phone: null,
      },
      edit: false,
      createUserFlag: false,
      showPassword: false,
      password: null,
      saving: false,
      saved: false,
    };
  },
  computed: {
    ...mapState(['user']),
    fullAddress() {
      if (!this.user.personalInformation.address) {
        return '';
      }
      return `${this.user.personalInformation.address}, ${this.user.personalInformation.postal_code} ${this.user.personalInformation.city}`;
    },
    isLoggedIn() {
      if (!process.browser) {
        return false;
      }
      return (window.auth.currentUser());
    },
  },
  methods: {
    ...mapActions({
      savePersonalInformation: 'user/savePersonalInformation',
      createUser: 'user/createUser',
      updateUserMetadata: 'user/updateUserMetadata',
    }),
    async save() {
      this.saving = true;
      this.edit = true;

      if (this.isLoggedIn) {
        await Promise.all([
          this.updateUserMetadata(this.personalInformation),
          sleep(1500),
        ]);
        this.saved = true;
        await sleep(1500);
        this.edit = false;
        this.saving = false;
        this.saved = false;
        return;
      }

      if (this.createUserFlag) {
        await Promise.all([
          this.createUser(this.personalInformation),
          sleep(1500),
        ]);
        this.saved = true;
        await sleep(1500);
        this.edit = false;
        this.saving = false;
        this.saved = false;
        this.isLoggedIn = true;
        return;
      }

      await sleep(1500);
      this.saved = true;
      await sleep(1500);
      this.savePersonalInformation({
        email: this.personalInformation.email,
        user_metadata: {
          full_name: this.personalInformation.full_name,
          phone: this.personalInformation.phone,
          address: this.personalInformation.address,
          city: this.personalInformation.city,
          postal_code: this.personalInformation.postal_code,
        },
      });
      this.edit = false;
      this.saving = false;
      this.saved = false;
    },
    editForm() {
      this.edit = true;
    },
    changeAddress(val) {
      this.personalInformation.address = val.address;
      this.personalInformation.city = val.city;
      this.personalInformation.postal_code = val.postal_code;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
  created() {
    this.personalInformation = { ...this.user.personalInformation };
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.password {
  position: relative;
}

.showPassword {
  composes: small from global;
  position: absolute;
  right: 0;
  line-height: 2.5rem;
  padding: 0 1rem;
  cursor: pointer;
}
</style>
