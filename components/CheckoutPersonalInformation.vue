<template>
  <div>
    <checkout-header-box :number="1" header="Dine oplysninger" :filled="valid" :edit="edit"/>
    <checkout-box v-if="!valid">
      <form :class="$style.form">
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
          <input type="search" id="address" name="address" required autocomplete="shipping street-address" v-model="personalInformation.address" ref="address">
        </p>
        <p>
          <label for="music">
            <input type="checkbox" id="create-user" name="create-user" value="true">
            Opret bruger <span class="dimmed">(tilgå nemt din ordre efter bestilling)</span>
          </label>
        </p>
        <p>
          <btn type="primary" height="large" shadow :class="$style.cta" @click.native="save">Gem dine oplysninger</btn>
        </p>
      </form>
    </checkout-box>
    <checkout-box v-if="valid">
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
import CheckoutHeaderBox from './CheckoutHeaderBox.vue';
import Btn from './Btn.vue';

export default {
  components: {
    CheckoutBox,
    CheckoutHeaderBox,
    Btn,
  },
  props: {
    valid: {
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
    },
    edit() {
      this.savePersonalInformation({
        name: null,
        email: null,
        address: null,
        phone: null,
      });
    },
  },
  created() {
    this.personalInformation = { ...this.user.personalInformation };
  },
};
</script>

<style module>
@import '../assets/css/variables.css';

.number {
  composes: h2 from global;
  float: left;
  background-color: var(--color-primary);
  color: var(--color-white);
  height: 2rem;
  width: 2rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 100%;
  margin-right: 1rem;
}
.header {
  line-height: 2rem;
}
.form p:not(:first-child) {
  margin-top: 1rem;
}
.form input[type="checkbox"] {
  display: inline-block;
  width: auto;
  height: auto;
  margin-right: 0.5rem;
}
.cta {
  margin-top: 2rem;
}
</style>
