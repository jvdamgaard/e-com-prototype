<template>
  <div :class="$style.container">
    <article class="theme-None">
      <section>
        <grid full-width-until="mobile">
          <grid-col mobile="0" tablet="2" laptop="3" desktop="4"/>
          <grid-col tablet="8" laptop="6" desktop="4">
            <checkout-header-box
              header="Opret bruger"
              :filled="true"
              editLabel="Log ind"
              :edit="gotoLogin"
            />
            <checkout-form>
              <checkout-box>
                <div>
                  <label for="email">E-mail <span class="dimmed">(bruges til log ind)</span></label>
                  <input type="email" id="email" name="email" required autocomplete="email" v-model="email" ref="email">
                </div>
                <div :class="$style.password">
                  <label for="password">Kodeord <span class="dimmed">(mindst 6 tegn)</span></label>
                  <div :class="$style.showPassword" @click="togglePassword">{{showPassword ? 'skjul' : 'vis'}}</div>
                  <input v-if="!showPassword" type="password" id="password" name="password" required autocomplete="new-password" v-model="password">
                  <input v-if="showPassword" type="text" id="password" name="password" required autocomplete="new-password" v-model="password">
                </div>
                <div>
                  <label for="name">Fulde navn</label>
                  <input type="text" id="name" name="name" required autocomplete="name" v-model="full_name" ref="name">
                </div>
                <div>
                  <label for="address">Din hjemmeadresse</label>
                  <input-address :changeValue="changeAddress" />
                </div>
                <div>
                  <label for="phone">Mobilnummer <span class="dimmed">(til opdatering på levering)</span></label>
                  <input type="tel" id="phone" name="phone" required autocomplete="tel" v-model="phone" ref="phone">
                </div>
                <btn
                  type="black"
                  height="large"
                  :loading="creating"
                  :done="created"
                  @click.native="create"
                >Opret bruger</btn>
                <p class="dimmed" :class="$style.forgotPassword">
                  Betingelser...
                </p>
              </checkout-box>
            </checkout-form>
          </grid-col>
        </grid>
      </section>
    </article>
  </div>
</template>

<script>
import Grid from '../../components/Grid.vue';
import GridCol from '../../components/GridCol.vue';
import CheckoutHeaderBox from '../../components/CheckoutHeaderBox.vue';
import CheckoutBox from '../../components/CheckoutBox.vue';
import CheckoutForm from '../../components/CheckoutForm.vue';
import Btn from '../../components/Btn.vue';
import InputAddress from '../../components/InputAddress.vue';

function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  components: {
    Grid,
    GridCol,
    CheckoutHeaderBox,
    CheckoutBox,
    CheckoutForm,
    Btn,
    InputAddress,
  },
  data() {
    return {
      email: '',
      password: '',
      full_name: '',
      address: '',
      city: '',
      postal_code: '',
      phone: '',
      creating: false,
      created: false,
      showPassword: false,
    };
  },
  computed: {},
  methods: {
    gotoLogin() {
      this.$router.push('/log-ind/');
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    changeAddress(val) {
      let address = `${val.data.vejnavn} ${val.data.husnr}`;
      if (val.data.etage || val.data.dør) { address += ','; }
      if (val.data.etage) { address += ` ${val.data.etage}.`; }
      if (val.data.dør) { address += ` ${val.data.dør}.`; }
      if (val.data.supplerendebynavn) { address += `, ${val.data.supplerendebynavn}`; }
      this.address = address;
      this.city = val.data.postnrnavn;
      this.postal_code = val.data.postnr;
    },
    async create() {
      if (this.creating) {
        return;
      }
      this.creating = true;
      try {
        const data = {
          address: this.address,
          postal_code: this.postal_code,
          city: this.city,
          full_name: this.full_name,
          phone: this.phone,
        };
        await window.auth.signup(this.email, this.password, data);
        await window.auth.login(this.email, this.password, true);
        this.created = true;
        await sleep(1500);

        // TODO: redirect

        this.creating = false;
        this.created = false;
      } catch (e) {
        console.error(e);
        this.creating = false;
        this.created = false;
      }
    },
  },
};
</script>

<style module>
.container {
  margin: 5rem 0;
}

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

.forgotPassword {
  text-align: center;
}
</style>
